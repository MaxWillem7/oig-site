import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { createContext } from '../seed/context'
import { VACANCIES, vacancyDoc } from '../seed/data/02-vacatures'
import { FAQS } from '../seed/data/03-vragen'
import { ZORG_DOCUMENTS_2026, ZORG_DOCUMENTS_2027 } from '../seed/data/05-documenten'
import { premiumTableDocs } from '../seed/data/06-premies'
import { setPrivacyIfEmpty } from '../seed/data/07-juridisch'

/**
 * Datamigratie 19 november 2026 (geen schemawijziging). Werkt de online inhoud bij naar dezelfde stand als de seed:
 * 1. Zorgverzekering: documenten 2027 erin, die van 2026 eruit; premietabellen 2027 (alleen als er voor 2027 nog
 *    geen tabellen zijn); de twee vragen over de verzekeringen van Fidus naar Zicht Adviseurs (alleen als ze
 *    Fidus nog noemen).
 * 2. Vacatures: titels "Junior inkoper" en "Medior inkoper", het AI-punt onder "Wat ga je doen?" en de nieuwe
 *    vacature Medewerker Aanbestedingsdesk (alleen als die er nog niet is).
 * 3. Privacyverklaring: het voorstel van Digital Dudes, alleen als het veld nog leeg is.
 * Elke stap kijkt eerst wat er al staat, dus nog een keer draaien verandert niets.
 */
const AI_PUNT =
  'werken met AI: je leert hoe je AI verantwoord en effectief inzet in inkoop- en aanbestedingstrajecten. Ook als je hier nog weinig ervaring mee hebt, helpen we je op weg.'

const TITELS: Record<string, { oud: string; nieuw: string }> = {
  'junior-inkoopadviseur-aanbestedingsdesk': { oud: 'Junior Inkoopadviseur Aanbestedingsdesk', nieuw: 'Junior inkoper' },
  'medior-inkoopadviseur-aanbestedingsdesk': { oud: 'Medior Inkoopadviseur Aanbestedingsdesk', nieuw: 'Medior inkoper' },
}

const NIEUWE_VACATURE = 'medewerker-aanbestedingsdesk'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const ctx = createContext(payload, req)
  const log = (msg: string) => payload.logger.info(`[inhoud 19 nov] ${msg}`)

  // 1a. Documenten
  for (const [file, title] of ZORG_DOCUMENTS_2027) await ctx.pdf(file, title)
  const oud = await payload.delete({
    collection: 'documenten',
    where: { filename: { in: ZORG_DOCUMENTS_2026 } },
    req,
  })
  log(`documenten 2027 staan erin, ${oud.docs.length} document(en) van 2026 verwijderd`)

  // 1b. Premietabellen 2027
  const bestaand = await payload.count({ collection: 'premies', where: { year: { equals: 2027 } }, req })
  if (bestaand.totalDocs === 0) {
    const docs = premiumTableDocs()
    for (const doc of docs) await ctx.upsert('premies', doc.title, doc, 'title')
    log(`${docs.length} premietabellen 2027 toegevoegd`)
  } else log(`premietabellen 2027 overgeslagen: er staan er al ${bestaand.totalDocs}`)

  // 1c. Vragen over de zorgverzekering
  for (const [question, answer] of FAQS.verzekeringen) {
    const found = await payload.find({
      collection: 'vragen',
      where: { question: { equals: question } },
      limit: 1,
      draft: true,
      req,
    })
    const doc = found.docs[0]
    if (doc && /fidus/i.test(doc.answer ?? '') && !/zicht/i.test(doc.answer ?? '')) {
      await payload.update({ collection: 'vragen', id: doc.id, data: { answer, _status: 'published' }, req })
      log(`vraag bijgewerkt: ${question}`)
    }
  }

  // 2a. Titels en AI-punt bij junior en medior
  for (const [slug, titel] of Object.entries(TITELS)) {
    const found = await payload.find({ collection: 'vacatures', where: { slug: { equals: slug } }, limit: 1, draft: true, req })
    const doc = found.docs[0]
    if (!doc) continue
    const items = doc.tasks?.items ?? []
    const heeftAi = items.some((i) => /werken met AI/i.test(i.text ?? ''))
    const nieuweTitel = doc.title === titel.oud
    if (!heeftAi || nieuweTitel) {
      await payload.update({
        collection: 'vacatures',
        id: doc.id,
        data: {
          // Adres expliciet meegeven: het slugveld zou zich anders uit de nieuwe titel kunnen vullen
          slug,
          ...(nieuweTitel ? { title: titel.nieuw } : {}),
          ...(heeftAi ? {} : { tasks: { intro: doc.tasks?.intro ?? null, items: [...items, { text: AI_PUNT }] } }),
          _status: 'published',
        },
        req,
      })
      log(`vacature ${slug} bijgewerkt`)
    }
  }

  // 2b. Nieuwe vacature
  const v = VACANCIES.find((x) => x.slug === NIEUWE_VACATURE)
  const al = await payload.count({ collection: 'vacatures', where: { slug: { equals: NIEUWE_VACATURE } }, req })
  if (v && al.totalDocs === 0) {
    const photos: number[] = []
    for (const file of v.photos) photos.push(await ctx.img(file))
    // Tussen Medior inkoper (30) en Commercieel medewerker binnendienst (40), zoals op de oude site
    await ctx.upsert('vacatures', v.slug, { ...vacancyDoc(v), photos, order: 35 })
    log('vacature Medewerker Aanbestedingsdesk toegevoegd')
  }

  // 3. Privacyverklaring
  log((await setPrivacyIfEmpty(ctx, req)) ? 'privacyverklaring gezet' : 'privacyverklaring stond er al, niet gewijzigd')
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Inhoud terugzetten gebeurt in het CMS; deze migratie verandert geen schema.
  payload.logger.info('[inhoud 19 nov] niets terug te draaien')
}
