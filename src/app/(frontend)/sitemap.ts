import type { MetadataRoute } from 'next'
import { getPayloadClient, SITE_URL } from '@/lib/cms'
import { PAGES, type PageInfo } from '@/lib/pages'

// De database is er niet bij de build: dan staan alleen de vaste pagina's erin en vult de lijst zich daarna aan.
export const revalidate = 300

type Vacancy = { slug: string; updatedAt?: Date }

/** Gepubliceerde vacatures. Zonder database (of bij een fout) een lege lijst. */
const publishedVacancies = async (): Promise<Vacancy[]> => {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'vacatures',
      where: { _status: { equals: 'published' } },
      draft: false,
      sort: 'order',
      limit: 500,
      depth: 0,
      select: { slug: true, updatedAt: true },
    })
    return docs.flatMap((doc) => {
      if (!doc.slug) return []
      const updatedAt = doc.updatedAt ? new Date(doc.updatedAt) : undefined
      return [{ slug: doc.slug, updatedAt: updatedAt && !Number.isNaN(updatedAt.getTime()) ? updatedAt : undefined }]
    })
  } catch (e) {
    console.error('Sitemap: vacatures niet geladen', e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vacancies = await publishedVacancies()

  // Het vacature-overzicht verandert als er een vacature bij komt of wijzigt
  const latestVacancy = vacancies.reduce<Date | undefined>(
    (latest, v) => (v.updatedAt && (!latest || v.updatedAt > latest) ? v.updatedAt : latest),
    undefined,
  )

  const fixed: MetadataRoute.Sitemap = (Object.entries(PAGES) as [string, PageInfo][])
    .filter(([, info]) => !info.noindex)
    .map(([path]) => ({
      url: `${SITE_URL}${path}`,
      ...(path === '/vacatures/' && latestVacancy ? { lastModified: latestVacancy } : {}),
    }))

  const fromCms: MetadataRoute.Sitemap = vacancies.map((v) => ({
    url: `${SITE_URL}/vacatures/${v.slug}/`,
    ...(v.updatedAt ? { lastModified: v.updatedAt } : {}),
  }))

  return [...fixed, ...fromCms]
}
