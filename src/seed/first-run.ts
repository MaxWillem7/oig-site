/**
 * Draait bij elke build op Vercel (na de migraties). Vult de database alleen de eerste keer,
 * als er nog geen teamleden en geen vacatures zijn. Daarna blijft de inhoud van het CMS ongemoeid.
 */
import config from '@payload-config'
import { getPayload } from 'payload'
import { ensureAdmin, runSeed } from './run'

// Zonder Blob-opslag zouden de foto's bij de build op een schijf belanden die daarna verdwijnt.
if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
  throw new Error('Geen Blob-opslag gevonden: koppel eerst een Blob-opslag aan het project in Vercel.')
}

const payload = await getPayload({ config })
const [team, vacancies] = await Promise.all([
  payload.count({ collection: 'team' }),
  payload.count({ collection: 'vacatures' }),
])

if (team.totalDocs === 0 && vacancies.totalDocs === 0) {
  payload.logger.info('Lege database: startinhoud laden')
  await runSeed(payload)
} else {
  payload.logger.info('Database heeft al inhoud: startinhoud overgeslagen')
}
await ensureAdmin(payload)
process.exit(0)
