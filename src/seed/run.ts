import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'
import { createContext } from './context'
import { seedCore } from './core'

/** Draait de hele seed: instellingen, SEO per pagina en alle inhoud uit src/seed/data. */
export async function runSeed(payload: Payload) {
  const ctx = createContext(payload)
  await seedCore(ctx)
  payload.logger.info('Instellingen en SEO klaar')

  const dir = path.resolve(process.cwd(), 'src/seed/data')
  for (const file of fs.readdirSync(dir).filter((f) => /\.ts$/.test(f)).sort()) {
    const mod = await import(path.join(dir, file))
    await mod.default(ctx)
    payload.logger.info(`Inhoud ${file} klaar`)
  }
}

/** Eerste beheerder, alleen als SEED_ADMIN_EMAIL en SEED_ADMIN_PASSWORD zijn meegegeven en er nog niemand is. */
export async function ensureAdmin(payload: Payload) {
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (!email || !password) return
  const exists = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (!exists.docs[0]) {
    await payload.create({ collection: 'users', data: { email, password, naam: 'Beheer', role: 'beheerder' } })
    payload.logger.info(`Beheerder ${email} aangemaakt`)
  }
}
