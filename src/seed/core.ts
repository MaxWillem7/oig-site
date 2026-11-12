import { PAGES } from '../lib/pages'
import type { SeedContext } from './context'

/** Instellingen en de SEO-regel per pagina. Inhoud (team, vacatures, vragen) staat in src/seed/data/. */
export async function seedCore({ payload }: SeedContext) {
  // Bestaande waarden blijven staan: de seed vult alleen wat nog leeg is.
  const current = await payload.findGlobal({ slug: 'instellingen', depth: 0 })
  await payload.updateGlobal({
    slug: 'instellingen',
    data: {
      contact: {
        ...current.contact,
        // Bron: footer van de live site (bedrijfspagina op LinkedIn)
        linkedin: current.contact?.linkedin || 'https://www.linkedin.com/company/onderwijs-inkoop-groep/',
      },
    },
  })

  for (const [path, info] of Object.entries(PAGES)) {
    const found = await payload.find({ collection: 'paginas', where: { path: { equals: path } }, limit: 1 })
    if (!found.docs[0]) {
      await payload.create({
        collection: 'paginas',
        data: { name: info.name, path, seoTitle: info.title, seoDescription: info.description },
      })
    }
  }
}
