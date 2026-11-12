export type NavItem = { label: string; href: string; description?: string }
export type NavGroup = { label: string; href?: string; items?: NavItem[] }

export const DIENSTEN: NavItem[] = [
  { label: 'Aanbesteden', href: '/dienst/aanbesteden/', description: 'Rechtmatig en zonder zorgen' },
  { label: 'Ondersteuning bij inkoop', href: '/dienst/ondersteuning-inkoop/', description: 'Collectieve contracten, scherpe prijzen' },
  { label: 'Inkoopsegmenten', href: '/dienst/ondersteuning-inkoop/inkoopsegmenten/', description: 'Van ICT en meubilair tot schoonmaak' },
  { label: 'Premiedesk', href: '/dienst/premiedesk/', description: 'Grip op uw Whk-premie' },
  { label: 'Subsidiedesk', href: '/dienst/subsidiedesk/', description: 'Vinden, aanvragen, verantwoorden' },
  { label: 'Inkoopbeleid', href: '/inkoopbeleid/', description: 'Beleid dat past bij uw bestuur' },
  { label: 'Verzekeringen', href: '/dienst/verzekeringen/', description: 'Collectiviteitskorting op de zorgverzekering' },
]

export const MAIN_NAV: NavGroup[] = [
  { label: 'Diensten', href: '/diensten/', items: DIENSTEN },
  { label: 'Werkwijze', href: '/werkwijze/' },
  { label: 'Referenties', href: '/referenties/' },
  {
    label: 'Kennis',
    items: [
      { label: 'Whitepapers', href: '/whitepapers/' },
      { label: 'Fietsplan onderwijs', href: '/fietsplan-onderwijs/' },
      { label: 'Premieoverzicht zorgverzekering', href: '/dienst/verzekeringen/#premies' },
    ],
  },
  {
    label: 'Over ons',
    href: '/over-ons/',
    items: [
      { label: 'Over ons', href: '/over-ons/' },
      { label: 'Ons team', href: '/ons-team/' },
      { label: 'Partners', href: '/partners/' },
      { label: 'Vacatures', href: '/vacatures/' },
    ],
  },
]

export const FOOTER_NAV: { label: string; items: NavItem[] }[] = [
  { label: 'Diensten', items: DIENSTEN.map(({ label, href }) => ({ label, href })) },
  {
    label: 'Organisatie',
    items: [
      { label: 'Over ons', href: '/over-ons/' },
      { label: 'Ons team', href: '/ons-team/' },
      { label: 'Werkwijze', href: '/werkwijze/' },
      { label: 'Referenties', href: '/referenties/' },
      { label: 'Partners', href: '/partners/' },
      { label: 'Vacatures', href: '/vacatures/' },
    ],
  },
  {
    label: 'Kennis',
    items: [
      { label: 'Whitepapers', href: '/whitepapers/' },
      { label: 'Fietsplan', href: '/fietsplan-onderwijs/' },
      { label: 'Premieoverzicht', href: '/dienst/verzekeringen/#premies' },
    ],
  },
]

export const LEGAL_NAV: NavItem[] = [
  { label: 'Privacyverklaring', href: '/juridisch/privacy-beleid/' },
  { label: 'Cookiebeleid', href: '/juridisch/cookiebeleid/' },
  { label: 'Algemene voorwaarden', href: '/juridisch/algemene-voorwaarden/' },
]
