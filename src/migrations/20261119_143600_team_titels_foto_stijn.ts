import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { createContext } from '../seed/context'

/**
 * Datamigratie 19 november 2026 (geen schemawijziging), na feedback van OIG. Zet de online inhoud gelijk aan de seed:
 * 1. Functietitels zoals OIG ze die week op de live site zette: Larissa Benning "Aanbestedingsspecialist", Mika Valk
 *    "Aanbestedingsdesk". Alleen als de oude titel er nog staat; ook de alt-tekst van hun foto.
 * 2. Foto van Stijn Achterveld (OIG bevestigt dat het zijn echte foto is). Alleen als hij nog geen foto heeft.
 * Elke stap kijkt eerst wat er al staat, dus nog een keer draaien verandert niets.
 */
const TITELS = [
  {
    email: 'l.benning@onderwijsinkoopgroep.nl',
    oud: 'Senior Inkoopadviseur Aanbestedingsdesk',
    nieuw: 'Aanbestedingsspecialist',
  },
  {
    email: 'm.valk@onderwijsinkoopgroep.nl',
    oud: 'Junior Inkoopadviseur Aanbestedingsdesk',
    nieuw: 'Aanbestedingsdesk',
  },
]

const STIJN = { email: 's.achterveld@onderwijsinkoopgroep.nl', foto: 'team-stijn-achterveld.jpg' }

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const ctx = createContext(payload, req)
  const log = (msg: string) => payload.logger.info(`[team 19 nov] ${msg}`)

  // 1. Functietitels
  for (const t of TITELS) {
    const found = await payload.find({ collection: 'team', where: { email: { equals: t.email } }, limit: 1, depth: 1, req })
    const doc = found.docs[0]
    if (!doc) {
      log(`${t.email} niet gevonden, overgeslagen`)
      continue
    }
    if (doc.role === t.oud) {
      await payload.update({ collection: 'team', id: doc.id, data: { role: t.nieuw }, req })
      log(`${doc.name}: titel ${t.nieuw}`)
    } else log(`${doc.name}: titel is "${doc.role}", niet gewijzigd`)

    const photo = typeof doc.photo === 'object' ? doc.photo : null
    if (photo?.alt?.includes(t.oud)) {
      await payload.update({ collection: 'media', id: photo.id, data: { alt: photo.alt.replace(t.oud, t.nieuw) }, req })
      log(`${doc.name}: alt-tekst foto bijgewerkt`)
    }
  }

  // 2. Foto van Stijn Achterveld
  const found = await payload.find({ collection: 'team', where: { email: { equals: STIJN.email } }, limit: 1, depth: 0, req })
  const stijn = found.docs[0]
  if (!stijn) log('Stijn Achterveld niet gevonden, overgeslagen')
  else if (stijn.photo) log('Stijn Achterveld heeft al een foto, niet gewijzigd')
  else {
    await payload.update({ collection: 'team', id: stijn.id, data: { photo: await ctx.img(STIJN.foto) }, req })
    log('Stijn Achterveld: foto gekoppeld')
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Inhoud terugzetten gebeurt in het CMS; deze migratie verandert geen schema.
  payload.logger.info('[team 19 nov] niets terug te draaien')
}
