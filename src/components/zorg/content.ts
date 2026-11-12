/**
 * Vaste inhoud van /dienst/verzekeringen/. Bron per regel: docs/bronnen/verzekeringen.md.
 * Kortingen, collectiviteitsnummers en contactgegevens komen letterlijk uit de inventaris van de live pagina.
 */

export type Insurer = {
  name: string
  /** Maximale korting op de aanvullende verzekering, zoals op de live pagina ("max. 16% korting"). */
  discount: string
  number: string
  /** Aanmeldlink. Alleen gevuld als de link op 12 november 2026 is gecontroleerd en bij de verzekeraar uitkomt. */
  link: { href: string; label: string } | null
  via: 'Fidus' | 'Jabes verzekeringen'
}

/** Gesorteerd op korting, zoals in het ontwerp. */
export const INSURERS: Insurer[] = [
  {
    name: 'CZ',
    discount: 'tot 16%',
    number: '3886964',
    // Live link had Mailchimp-parameters uit 2016 (ct, mc_cid, mc_eid); die zijn weggehaald.
    link: { href: 'https://aanmelden.cz.nl/collectiviteit/3886964', label: 'Aanmelden bij CZ' },
    via: 'Fidus',
  },
  {
    name: 'VGZ',
    discount: 'tot 15%',
    number: '87711967',
    link: { href: 'https://www.vgz.nl/87711967', label: 'Aanmelden bij VGZ' },
    via: 'Fidus',
  },
  {
    name: 'De Christelijke Zorgverzekeraar',
    discount: 'tot 15%',
    number: '205504273',
    link: {
      href: 'https://www.dechristelijkezorgverzekeraar.nl/zorgverzekering/premie-berekenen?cn=205504273',
      label: 'Premie berekenen',
    },
    via: 'Jabes verzekeringen',
  },
  {
    name: 'ONVZ',
    discount: 'tot 10%',
    number: '9461',
    // https://www.onvz.nl/collectiviteiten?coll-nummer=9461 gaf op 12 november 2026 een 503 (onderhoud bij ONVZ).
    // Niet te controleren, dus geen link. Na controle hier invullen.
    link: null,
    via: 'Fidus',
  },
  {
    name: 'Nationale Nederlanden',
    discount: 'tot 10%',
    number: 'ditiszorg2240',
    // Live link was een Outlook Safe Links-adres met een e-mailadres erin; dit is de echte bestemming.
    link: { href: 'https://www.ditiszorg.nl/fidus', label: 'Aanmelden via ditiszorg.nl' },
    via: 'Fidus',
  },
  {
    name: 'Menzis',
    discount: 'tot 9%',
    number: '57805',
    // De parameter verdwijnt uit de adresbalk, maar het collectief 57805 staat daarna ingevuld (gecontroleerd in de browser).
    link: {
      href: 'https://www.menzis.nl/premie-berekenen-en-aanvragen?collectiefId=57805',
      label: 'Aanmelden bij Menzis',
    },
    via: 'Fidus',
  },
]

export const STEPS = [
  {
    title: 'Kies uw verzekeraar',
    text: 'Vergelijk hieronder de korting bij de zes aangesloten zorgverzekeraars en noteer het collectiviteitsnummer.',
  },
  {
    title: 'Voeg het nummer toe',
    text: 'Al verzekerd? Log in bij uw verzekeraar en voeg het collectiviteitsnummer toe aan uw polis. Nieuw? Meld u aan via de link in de tabel.',
  },
  {
    title: 'Korting op uw polis',
    text: 'De korting wordt op uw polis doorgevoerd. Vragen handelt Fidus af, voor De Christelijke Zorgverzekeraar is dat Jabes verzekeringen.',
  },
]

export const FIDUS = {
  name: 'Fidus',
  insurers: 'CZ, VGZ, ONVZ, Nationale Nederlanden en Menzis',
  phone: '085 860 00 00',
  email: 'zorg.debilt@fidus.nl',
  site: { href: 'https://www.fidus.nl/', label: 'www.fidus.nl' },
}

export const JABES = {
  name: 'Jabes verzekeringen',
  insurers: 'De Christelijke Zorgverzekeraar',
  phone: '0341 270 575',
  email: 'info@jabesverzekeringen.nl',
  site: { href: 'https://jabesverzekeringen.nl/contact/', label: 'jabesverzekeringen.nl' },
}

/** Titels van de documenten in het CMS (collectie Documenten). */
export const DOCS = {
  form: 'Wijzigingsformulier 2026',
  overview2026: 'Premieoverzicht collectieve zorgverzekering 2026',
  dcz2026: 'Premietabel De Christelijke Zorgverzekeraar 2026',
}
