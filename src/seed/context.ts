import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

export type SeedContext = {
  payload: Payload
  /** Media-ID van een bestand uit seed-assets/images (uploadt het als het nog niet bestaat). */
  img: (file: string) => Promise<number>
  /** Document-ID van een pdf uit seed-assets/documents (uploadt het als het nog niet bestaat). */
  pdf: (file: string, title: string) => Promise<number>
  /** Maakt of werkt bij op een uniek veld (standaard `slug`) en publiceert. */
  upsert: (collection: string, key: string, data: Record<string, unknown>, field?: string) => Promise<number>
}

type ManifestItem = { file: string; alt: string; focus?: string; bron?: string }

export function createContext(payload: Payload): SeedContext {
  const dir = path.resolve(process.cwd(), 'seed-assets/images')
  const docDir = path.resolve(process.cwd(), 'seed-assets/documents')
  const manifest: ManifestItem[] = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'))
  const cache = new Map<string, number>()

  const img = async (file: string) => {
    if (cache.has(file)) return cache.get(file)!
    const existing = await payload.find({ collection: 'media', where: { filename: { equals: file } }, limit: 1 })
    let id: number
    if (existing.docs[0]) id = existing.docs[0].id as number
    else {
      const meta = manifest.find((m) => m.file === file)
      if (!meta) throw new Error(`Onbekend seed-beeld: ${file}`)
      const doc = await payload.create({
        collection: 'media',
        data: { alt: meta.alt, focus: meta.focus },
        filePath: path.join(dir, file),
      })
      id = doc.id as number
    }
    cache.set(file, id)
    return id
  }

  const pdf = async (file: string, title: string) => {
    const existing = await payload.find({ collection: 'documenten', where: { filename: { equals: file } }, limit: 1 })
    if (existing.docs[0]) return existing.docs[0].id as number
    const doc = await payload.create({ collection: 'documenten', data: { title }, filePath: path.join(docDir, file) })
    return doc.id as number
  }

  const upsert = async (collection: string, key: string, data: Record<string, unknown>, field = 'slug') => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = collection as any
    const found = await payload.find({ collection: c, where: { [field]: { equals: key } }, limit: 1, draft: true })
    const body = { ...data, [field]: key, _status: 'published' }
    if (found.docs[0]) {
      const doc = await payload.update({ collection: c, id: found.docs[0].id, data: body })
      return doc.id as number
    }
    const doc = await payload.create({ collection: c, data: body })
    return doc.id as number
  }

  return { payload, img, pdf, upsert }
}
