/**
 * Vult de database met de startinhoud. Veilig om vaker te draaien (werkt bij op slug of naam).
 * Gebruik: npm run seed
 */
import fs from 'fs'
import path from 'path'
import config from '@payload-config'
import { getPayload } from 'payload'
import { createContext } from './context'
import { seedCore } from './core'

const payload = await getPayload({ config })
const ctx = createContext(payload)

await seedCore(ctx)
payload.logger.info('Instellingen en SEO klaar')

const dir = path.resolve(process.cwd(), 'src/seed/data')
if (fs.existsSync(dir)) {
  for (const file of fs.readdirSync(dir).filter((f) => /\.ts$/.test(f)).sort()) {
    const mod = await import(path.join(dir, file))
    await mod.default(ctx)
    payload.logger.info(`Inhoud ${file} klaar`)
  }
}

// Eerste beheerder alleen als SEED_ADMIN_EMAIL en SEED_ADMIN_PASSWORD zijn meegegeven
const email = process.env.SEED_ADMIN_EMAIL
const password = process.env.SEED_ADMIN_PASSWORD
if (email && password) {
  const exists = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (!exists.docs[0]) {
    await payload.create({ collection: 'users', data: { email, password, naam: 'Beheer', role: 'beheerder' } })
  }
}

payload.logger.info('Seed klaar')
process.exit(0)
