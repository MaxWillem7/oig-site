import { getSettings, SITE_NAME, SITE_URL } from '@/lib/cms'
import { PAGES, type PagePath } from '@/lib/pages'

export const revalidate = 300

/** Secties van /llms.txt. Naam en omschrijving van elke link komen uit `PAGES`. */
const SECTIONS: { title: string; paths: PagePath[] }[] = [
  {
    title: 'Diensten',
    paths: [
      '/diensten/',
      '/dienst/aanbesteden/',
      '/dienst/ondersteuning-inkoop/',
      '/dienst/ondersteuning-inkoop/inkoopsegmenten/',
      '/inkoopbeleid/',
      '/dienst/subsidiedesk/',
      '/dienst/premiedesk/',
      '/dienst/verzekeringen/',
    ],
  },
  {
    title: 'Kennis',
    paths: [
      '/whitepapers/',
      '/lp/schoonmaak/',
      '/lp/meubilair/',
      '/lp/kopieerapparaat/',
      '/fietsplan-onderwijs/',
      '/dienst/verzekeringen/',
    ],
  },
  {
    title: 'Organisatie',
    paths: ['/over-ons/', '/ons-team/', '/referenties/', '/werkwijze/', '/partners/', '/vacatures/'],
  },
  { title: 'Contact', paths: ['/contact/'] },
  {
    // Vaste naam uit de llms.txt-conventie: links die een taalmodel mag overslaan
    title: 'Optional',
    paths: ['/juridisch/privacy-beleid/', '/juridisch/cookiebeleid/', '/juridisch/algemene-voorwaarden/'],
  },
]

const link = (path: PagePath) => {
  const { name, description } = PAGES[path]
  return `- [${name}](${SITE_URL}${path}): ${description}`
}

export async function GET() {
  const { figures, contact } = await getSettings()

  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> De ${SITE_NAME} (OIG) is een inkoopcollectief voor ${figures.boards} schoolbesturen en ${figures.schools} scholen in het primair onderwijs. De OIG ondersteunt schoolbesturen bij aanbesteden, inkoop, inkoopbeleid, subsidies, de Whk-premie en verzekeringen, met ${figures.years} ervaring in onderwijsinkoop en ${figures.saving} gemiddelde besparing bij klanten. Medewerkers in het onderwijs krijgen via de OIG ${figures.insuranceDiscount} collectiviteitskorting op de aanvullende zorgverzekering.`,
    '',
    `De site is in het Nederlands. Website: ${SITE_URL}/ Klantportaal Mijn OIG: ${contact.portalUrl}`,
    '',
  ]

  for (const section of SECTIONS) {
    lines.push(`## ${section.title}`, '')
    lines.push(...section.paths.map(link))
    if (section.title === 'Contact') {
      lines.push(
        `- Telefoon: ${contact.phone}`,
        `- E-mail: ${contact.email}`,
        `- Adres: ${contact.street}, ${contact.postalCode} ${contact.city}`,
      )
    }
    lines.push('')
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
