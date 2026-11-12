import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type { Adapter, CollectionOptions } from '@payloadcms/plugin-cloud-storage/types'
import { BlobNotFoundError, del, get, put } from '@vercel/blob'
import type { Config, Plugin } from 'payload'

/**
 * Opslag van uploads in Vercel Blob, voor een afgeschermde (private) store met de inlog van Vercel zelf
 * (OIDC plus BLOB_STORE_ID) of met een klassiek BLOB_READ_WRITE_TOKEN. Het pakket van Payload kent alleen
 * het klassieke token, vandaar deze eigen, kleine koppeling.
 *
 * Bestanden zijn nooit rechtstreeks op te vragen: Payload serveert ze via /api/<collectie>/file/<naam>
 * en controleert daarbij de leesrechten van de collectie. Cv's blijven zo achter de inlog.
 */
export const blobEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID)

const access = process.env.BLOB_ACCESS === 'public' ? 'public' : 'private'

const key = (filename: string, prefix?: string) => (prefix ? `${prefix}/${filename}` : filename)

const adapter =
  (cacheControl: string): Adapter =>
  ({ prefix }) => ({
    name: 'vercel-blob-oig',
    handleUpload: async ({ file, storageFilePath }) => {
      await put(storageFilePath, file.buffer, {
        access,
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: file.mimeType,
      })
    },
    handleDelete: async ({ storageFilePath }) => {
      await del(storageFilePath)
    },
    staticHandler: async (req, { headers: incoming, params }) => {
      try {
        const result = await get(key(params.filename, params.prefix ?? prefix), { access })
        if (!result) return new Response(null, { status: 404, statusText: 'Not Found' })

        const headers = new Headers(incoming)
        headers.set('Cache-Control', cacheControl)
        headers.set('ETag', result.blob.etag)
        if (result.statusCode !== 200 || req.headers.get('if-none-match') === result.blob.etag) {
          return new Response(null, { status: 304, headers })
        }
        headers.set('Content-Type', result.blob.contentType)
        headers.set('Content-Length', String(result.blob.size))
        headers.set('Last-Modified', result.blob.uploadedAt.toUTCString())
        headers.set('X-Content-Type-Options', 'nosniff')
        return new Response(result.stream, { status: 200, headers })
      } catch (err) {
        if (err instanceof BlobNotFoundError) return new Response(null, { status: 404, statusText: 'Not Found' })
        req.payload.logger.error({ err, msg: 'Bestand uit Blob-opslag niet geladen' })
        return new Response('Bestand niet beschikbaar', { status: 500 })
      }
    },
  })

/**
 * `collections`: per collectie of het bestand openbaar is (een uur in de browsercache) of afgeschermd
 * (nooit in een cache). Zonder Blob-gegevens doet de plugin niets en bewaart Payload de bestanden lokaal.
 */
export const oigBlobStorage =
  (collections: Record<string, 'openbaar' | 'afgeschermd'>): Plugin =>
  (incoming: Config): Config => {
    // Zonder Blob-gegevens (lokaal): geen opslagkoppeling, maar wel dezelfde velden, zodat de database
    // lokaal en op Vercel hetzelfde schema heeft.
    if (!blobEnabled) {
      const off: Record<string, CollectionOptions> = Object.fromEntries(
        Object.keys(collections).map((slug) => [slug, { adapter: null }]),
      )
      return cloudStoragePlugin({ alwaysInsertFields: true, collections: off, enabled: false })(incoming)
    }

    const options: Record<string, CollectionOptions> = Object.fromEntries(
      Object.entries(collections).map(([slug, kind]) => [
        slug,
        { adapter: adapter(kind === 'afgeschermd' ? 'private, no-store' : 'public, max-age=3600') },
      ]),
    )
    const config: Config = {
      ...incoming,
      collections: (incoming.collections ?? []).map((c) =>
        options[c.slug]
          ? { ...c, upload: { ...(typeof c.upload === 'object' ? c.upload : {}), disableLocalStorage: true } }
          : c,
      ),
    }
    return cloudStoragePlugin({ alwaysInsertFields: true, collections: options })(config)
  }
