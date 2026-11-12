import 'server-only'
import config from '@payload-config'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload, type Payload, type Where } from 'payload'
import { cache } from 'react'
import type { Instellingen, Media } from '@/payload-types'
import { PAGES, type PagePath } from './pages'

export const getPayloadClient = (): Promise<Payload> => getPayload({ config })

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.onderwijsinkoopgroep.nl').replace(/\/$/, '')
export const SITE_NAME = 'Onderwijs Inkoop Groep'

/** Staat de bezoeker in de voorvertoning (concepten zichtbaar)? Buiten een verzoek altijd nee. */
const isPreview = async () => {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

/** Filter en draft-vlag voor collecties met concepten. */
const visible = async (extra?: Where): Promise<{ draft: boolean; where: Where }> => {
  const draft = await isPreview()
  const published: Where = { _status: { equals: 'published' } }
  if (draft) return { draft, where: extra ?? {} }
  return { draft, where: extra ? { and: [published, extra] } : published }
}

export type SiteSettings = {
  figures: { boards: string; schools: string; saving: string; years: string; insuranceDiscount: string }
  contact: {
    phone: string
    email: string
    street: string
    postalCode: string
    city: string
    kvk?: string
    linkedin?: string
    portalUrl: string
  }
  insurance: { year: number; notice: string }
  recipients: Record<string, string | null | undefined>
}

const FALLBACK: SiteSettings = {
  figures: { boards: '400+', schools: '2.700+', saving: '37%', years: '16 jaar', insuranceDiscount: 'tot 16%' },
  contact: {
    phone: '036 820 10 00',
    email: 'info@onderwijsinkoopgroep.nl',
    street: 'Gildenveld 3',
    postalCode: '3892 DC',
    city: 'Zeewolde',
    portalUrl: 'https://mijnoig.onderwijsinkoopgroep.nl/',
  },
  insurance: {
    year: 2027,
    notice:
      'De premies voor 2027 volgen zodra de verzekeraars ze bekend hebben gemaakt. Zodra ze er zijn, staan ze op deze pagina.',
  },
  recipients: {},
}

const filled = <T extends object>(obj: unknown, fallback: T): T => {
  const out = { ...fallback } as Record<string, unknown>
  for (const [k, v] of Object.entries((obj ?? {}) as Record<string, unknown>)) {
    if (v !== null && v !== undefined && v !== '') out[k] = v
  }
  return out as T
}

/** Instellingen uit het CMS, met veilige standaardwaarden als de database (nog) leeg is. */
export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const payload = await getPayloadClient()
    const s = (await payload.findGlobal({ slug: 'instellingen', depth: 0 })) as Instellingen
    return {
      figures: filled(s.figures, FALLBACK.figures),
      contact: filled(s.contact, FALLBACK.contact),
      insurance: filled(s.insurance, FALLBACK.insurance),
      recipients: (s.recipients ?? {}) as Record<string, string>,
    }
  } catch (e) {
    console.error('Instellingen niet geladen', e)
    return FALLBACK
  }
})

/** Telefoonnummer als tel:-link (036 820 10 00 wordt +31368201000). */
export const telHref = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, '')
  return `tel:${digits.startsWith('0') ? `+31${digits.slice(1)}` : digits}`
}

const safe = async <T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn()
  } catch (e) {
    console.error(`${label} niet geladen`, e)
    return fallback
  }
}

export const getTeam = cache(async () =>
  safe('Team', async () => {
    const payload = await getPayloadClient()
    const { draft, where } = await visible()
    return (await payload.find({ collection: 'team', where, draft, sort: 'order', limit: 200, depth: 1 })).docs
  }, []),
)

export const getVacancies = cache(async () =>
  safe('Vacatures', async () => {
    const payload = await getPayloadClient()
    const { draft, where } = await visible()
    return (await payload.find({ collection: 'vacatures', where, draft, sort: 'order', limit: 100, depth: 1 })).docs
  }, []),
)

export const getVacancy = cache(async (slug: string) =>
  safe('Vacature', async () => {
    const payload = await getPayloadClient()
    const { draft, where } = await visible({ slug: { equals: slug } })
    return (await payload.find({ collection: 'vacatures', where, draft, limit: 1, depth: 1 })).docs[0] ?? null
  }, null),
)

/** Premietabellen van één jaar (standaard het actuele premiejaar uit Instellingen). */
export const getPremiumTables = cache(async (year?: number) =>
  safe('Premies', async () => {
    const payload = await getPayloadClient()
    const y = year ?? (await getSettings()).insurance.year
    const { draft, where } = await visible({ year: { equals: y } })
    return (await payload.find({ collection: 'premies', where, draft, sort: 'order', limit: 50, depth: 0 })).docs
  }, []),
)

/** Vragen en antwoorden bij één pagina (waarde uit PAGE_OPTIONS, bijv. 'aanbesteden'). */
export const getFaqs = cache(async (page: string) =>
  safe('Vragen', async () => {
    const payload = await getPayloadClient()
    const { draft, where } = await visible({ page: { equals: page } })
    return (await payload.find({ collection: 'vragen', where, draft, sort: 'order', limit: 50, depth: 0 })).docs
  }, []),
)

export const getWhitepapers = cache(async () =>
  safe('Whitepapers', async () => {
    const payload = await getPayloadClient()
    const { draft, where } = await visible()
    return (await payload.find({ collection: 'whitepapers', where, draft, sort: 'order', limit: 50, depth: 1 })).docs
  }, []),
)

export const getWhitepaper = cache(async (slug: string) =>
  safe('Whitepaper', async () => {
    const payload = await getPayloadClient()
    const { draft, where } = await visible({ slug: { equals: slug } })
    return (await payload.find({ collection: 'whitepapers', where, draft, limit: 1, depth: 1 })).docs[0] ?? null
  }, null),
)

/** Openbaar document op titel (bijv. 'Algemene voorwaarden'). */
export const getDocument = cache(async (title: string) =>
  safe('Document', async () => {
    const payload = await getPayloadClient()
    return (await payload.find({ collection: 'documenten', where: { title: { equals: title } }, limit: 1 })).docs[0] ?? null
  }, null),
)

/**
 * Maakt een bestandsadres uit het CMS bruikbaar: adressen van de eigen site worden relatief
 * (next/image staat alleen eigen paden en de Blob-opslag toe) en een schuine streep aan het eind gaat eraf.
 */
export const fileUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined
  const clean = url.replace(/\/$/, '')
  const own = clean.match(/^https?:\/\/[^/]+(\/api\/[^/]+\/file\/.+)$/)
  return own ? own[1] : clean
}

export type Img = { url: string; alt: string; width: number; height: number; focus?: string }

/** Zet een upload-veld om naar wat next/image nodig heeft. Geeft null als er geen beeld is. */
export const media = (value: unknown, size?: 'portret' | 'kaart' | 'breed'): Img | null => {
  if (!value || typeof value !== 'object') return null
  const m = value as Media
  const sized = size ? m.sizes?.[size] : undefined
  const url = fileUrl(sized?.url || m.url)
  if (!url) return null
  return {
    url,
    alt: m.alt || '',
    width: sized?.width || m.width || 1200,
    height: sized?.height || m.height || 800,
    focus: m.focus || undefined,
  }
}

const seoFor = cache(async (path: string) =>
  safe('SEO', async () => {
    const payload = await getPayloadClient()
    return (await payload.find({ collection: 'paginas', where: { path: { equals: path } }, limit: 1, depth: 0 })).docs[0] ?? null
  }, null),
)

/**
 * Metadata van een vaste pagina uit `PAGES` (src/lib/pages.ts). Titel en omschrijving kunnen in het CMS
 * (Pagina's (SEO)) worden overschreven. Gebruik: `export const generateMetadata = () => pageMetadata('/werkwijze/')`.
 */
export async function pageMetadata(path: PagePath): Promise<Metadata> {
  const info: { title: string; description: string; noindex?: boolean } = PAGES[path]
  const seo = await seoFor(path)
  return buildMetadata(path, {
    title: seo?.seoTitle || info.title,
    description: seo?.seoDescription || info.description,
    noindex: info.noindex,
  })
}

/** Metadata voor een pagina die niet in `PAGES` staat (bijv. een vacature uit het CMS). */
export function buildMetadata(
  path: string,
  m: { title: string; description: string; image?: string; noindex?: boolean },
): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: url },
    robots: m.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: SITE_NAME,
      locale: 'nl_NL',
      type: 'website',
      images: [{ url: m.image || `${SITE_URL}/og.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description },
  }
}
