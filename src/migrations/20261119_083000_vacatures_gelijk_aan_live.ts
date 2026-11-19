import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { createContext } from '../seed/context'
import { REMOVED_VACANCIES, VACANCIES, vacancyDoc } from '../seed/data/02-vacatures'

/**
 * Datamigratie 19 november 2026: vacatures gelijk aan de live WordPress-site (besluit Max: live is de enige bron).
 * - De vier vacatures krijgen alle tekst uit src/seed/data/02-vacatures.ts (letterlijk live), in de volgorde
 *   van het live overzicht. Foto's blijven zoals ze in het CMS staan.
 * - Inkoopadviseur / Accountmanager (live 404) gaat terug naar concept; het oude adres verwijst naar /vacatures/.
 * Nog een keer draaien geeft dezelfde uitkomst.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const ctx = createContext(payload, req)
  const log = (msg: string) => payload.logger.info(`[vacatures live] ${msg}`)

  let order = 0
  for (const v of VACANCIES) {
    order += 10
    const found = await payload.find({ collection: 'vacatures', where: { slug: { equals: v.slug } }, limit: 1, draft: true, req })
    const doc = found.docs[0]
    if (doc) {
      await payload.update({
        collection: 'vacatures',
        id: doc.id,
        // Adres expliciet meegeven: het slugveld zou zich anders uit de titel kunnen vullen
        data: { ...vacancyDoc(v), slug: v.slug, order, _status: 'published' },
        req,
      })
      log(`${v.slug} gelijk aan live`)
    } else {
      const photos: number[] = []
      for (const file of v.photos) photos.push(await ctx.img(file))
      await ctx.upsert('vacatures', v.slug, { ...vacancyDoc(v), photos, order })
      log(`${v.slug} toegevoegd`)
    }
  }

  for (const slug of REMOVED_VACANCIES) {
    const found = await payload.find({ collection: 'vacatures', where: { slug: { equals: slug } }, limit: 1, req })
    const doc = found.docs[0]
    if (doc && doc._status === 'published') {
      await payload.update({ collection: 'vacatures', id: doc.id, data: { slug, _status: 'draft' }, req })
      log(`${slug} teruggezet naar concept`)
    }
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('[vacatures live] niets terug te draaien')
}
