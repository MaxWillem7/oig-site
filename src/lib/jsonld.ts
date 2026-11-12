import type { SiteSettings } from './cms'

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.onderwijsinkoopgroep.nl').replace(/\/$/, '')
const ORG_ID = `${BASE}/#organisatie`

const tel = (phone: string) => {
  const d = phone.replace(/[^\d+]/g, '')
  return d.startsWith('0') ? `+31${d.slice(1)}` : d
}

/** Organisatie: één keer, in de layout. */
export const organization = (c: SiteSettings['contact']) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Onderwijs Inkoop Groep',
  alternateName: 'OIG',
  url: `${BASE}/`,
  logo: `${BASE}/logo.svg`,
  description: 'Inkoopcollectief voor schoolbesturen in het primair onderwijs.',
  telephone: tel(c.phone),
  email: c.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: c.street,
    postalCode: c.postalCode,
    addressLocality: c.city,
    addressCountry: 'NL',
  },
  ...(c.linkedin ? { sameAs: [c.linkedin] } : {}),
})

export const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE}/#website`,
  url: `${BASE}/`,
  name: 'Onderwijs Inkoop Groep',
  inLanguage: 'nl-NL',
  publisher: { '@id': ORG_ID },
})

/** Kruimelpad. Geef de stappen na Home, bijv. [{ name: 'Diensten', path: '/diensten/' }, ...]. */
export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((i, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: i.name,
    item: `${BASE}${i.path}`,
  })),
})

export const faqPage = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
})

export const service = (s: { name: string; description: string; path: string; audience?: string; serviceType?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  ...(s.serviceType ? { serviceType: s.serviceType } : {}),
  description: s.description,
  url: `${BASE}${s.path}`,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'Nederland' },
  audience: { '@type': 'Audience', audienceType: s.audience ?? 'Schoolbesturen in het primair onderwijs' },
})

export const jobPosting = (
  v: {
    title: string
    description: string
    path: string
    datePosted?: string | null
    validThrough?: string | null
    hours?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
  },
  c: SiteSettings['contact'],
) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: v.title,
  description: v.description,
  url: `${BASE}${v.path}`,
  datePosted: (v.datePosted ?? new Date().toISOString()).slice(0, 10),
  ...(v.validThrough ? { validThrough: v.validThrough } : {}),
  employmentType: v.hours && /40/.test(v.hours) ? ['FULL_TIME', 'PART_TIME'] : 'PART_TIME',
  directApply: true,
  hiringOrganization: {
    '@type': 'Organization',
    name: 'Onderwijs Inkoop Groep',
    sameAs: `${BASE}/`,
    logo: `${BASE}/logo.svg`,
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.street,
      postalCode: c.postalCode,
      addressLocality: c.city,
      addressCountry: 'NL',
    },
  },
  ...(v.salaryMin
    ? {
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'EUR',
          value: {
            '@type': 'QuantitativeValue',
            minValue: v.salaryMin,
            ...(v.salaryMax ? { maxValue: v.salaryMax } : {}),
            unitText: 'MONTH',
          },
        },
      }
    : {}),
})
