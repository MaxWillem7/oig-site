/**
 * Vult de database met de startinhoud. Veilig om vaker te draaien (werkt bij op slug of naam),
 * maar overschrijft daarbij wat in het CMS is gewijzigd. Alleen lokaal gebruiken: npm run seed
 */
import config from '@payload-config'
import { getPayload } from 'payload'
import { ensureAdmin, runSeed } from './run'

const payload = await getPayload({ config })
await runSeed(payload)
await ensureAdmin(payload)
payload.logger.info('Seed klaar')
process.exit(0)
