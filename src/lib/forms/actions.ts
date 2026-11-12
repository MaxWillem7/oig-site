'use server'

import { createHash } from 'crypto'
import { headers } from 'next/headers'
import { getPayloadClient, getSettings } from '../cms'
import { FORMS, type FormState, type FormType } from './definitions'
import { readFiles } from './files'
import { sendNotification, splitRecipients } from './mail'
import { parseForm, summarize } from './validate'

const MIN_FILL_MS = 2500
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

const generic = 'Er ging iets mis bij het versturen. Probeer het later nog eens of bel 036 820 10 00.'

/**
 * Eén server action voor alle formulieren. Het formulier stuurt verborgen velden mee:
 * `_form` (type), `_page` (pad), `_t` (starttijd) en de honeypot `website`.
 */
export async function submitForm(_prev: FormState, fd: FormData): Promise<FormState> {
  const type = String(fd.get('_form') ?? '') as FormType
  const spec = FORMS[type]
  if (!spec) return { status: 'error', message: generic }

  // Honeypot en tijdscheck: doe alsof het gelukt is, sla niets op.
  const started = Number(fd.get('_t') ?? 0)
  if (String(fd.get('website') ?? '') !== '' || !started || Date.now() - started < MIN_FILL_MS) {
    return { status: 'success', message: spec.success }
  }

  const { values, errors } = parseForm(type, fd)
  const upload = spec.fileField ? await readFiles(fd, spec.fileField) : { files: [] }
  if (spec.fileField && upload.error) errors[spec.fileField] = upload.error
  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Controleer de gemarkeerde velden.', fieldErrors: errors }
  }

  const h = await headers()
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'onbekend'
  const ipHash = createHash('sha256').update(`${ip}:${process.env.PAYLOAD_SECRET ?? ''}`).digest('hex').slice(0, 32)
  const page = String(fd.get('_page') ?? '').slice(0, 200)

  try {
    const payload = await getPayloadClient()
    const since = new Date(Date.now() - WINDOW_MS).toISOString()
    const recent = await payload.count({
      collection: 'inzendingen',
      where: { and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: since } }] },
      overrideAccess: true,
    })
    if (recent.totalDocs >= MAX_PER_WINDOW) {
      return { status: 'error', message: 'Er zijn net al een paar berichten verstuurd. Probeer het over een kwartier nog eens.' }
    }

    // Whitepaper: de download moet bestaan, anders heeft het formulier geen zin
    let downloadUrl: string | undefined
    if (type === 'whitepaper') {
      const found = await payload.find({
        collection: 'whitepapers',
        where: { slug: { equals: String(values.whitepaper) } },
        limit: 1,
        depth: 1,
        overrideAccess: true,
      })
      const file = found.docs[0]?.file
      downloadUrl = typeof file === 'object' && file?.url ? file.url : undefined
      if (!found.docs[0]) return { status: 'error', message: generic }
      values.whitepaper = found.docs[0].title
    }

    const fileIds: number[] = []
    for (const f of upload.files) {
      const doc = await payload.create({ collection: 'cv-bestanden', data: {}, file: f, overrideAccess: true })
      fileIds.push(doc.id as number)
    }

    const first = spec.nameField ? String(values[spec.nameField] ?? '') : ''
    const name = [first, typeof values.achternaam === 'string' ? values.achternaam : ''].filter(Boolean).join(' ')
    const email = spec.emailField ? String(values[spec.emailField] ?? '') : ''
    const text = summarize(type, values)

    const doc = await payload.create({
      collection: 'inzendingen',
      overrideAccess: true,
      data: {
        title: name || email || spec.label,
        formType: type,
        email,
        samenvatting: text,
        data: values,
        pagina: page,
        ipHash,
        bestanden: fileIds,
      },
    })

    const settings = await getSettings()
    const to = splitRecipients(settings.recipients?.[type])
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? ''
    const mailStatus = await sendNotification({
      to,
      subject: `${spec.label}${name ? ` van ${name}` : ''} via onderwijsinkoopgroep.nl`,
      text: [
        text,
        fileIds.length ? `\nBijlagen: ${fileIds.length} bestand(en), te openen in het CMS (inloggen nodig).` : '',
        `\nVerstuurd vanaf: ${page || 'onbekend'}`,
        `Bekijk in het CMS: ${base}/admin/collections/inzendingen/${doc.id}`,
      ].join('\n'),
      replyTo: /@/.test(email) ? email : undefined,
    })
    await payload.update({ collection: 'inzendingen', id: doc.id, data: { mailStatus }, overrideAccess: true })

    return { status: 'success', message: spec.success, downloadUrl }
  } catch (e) {
    console.error('Formulier mislukt', type, e)
    return { status: 'error', message: generic }
  }
}
