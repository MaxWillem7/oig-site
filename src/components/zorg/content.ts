/**
 * Vaste inhoud van /dienst/verzekeringen/. Bron per regel: docs/bronnen/verzekeringen.md.
 * Kortingen, collectiviteitsnummers, aanmeldlinks en de gegevens van Zicht Adviseurs komen uit het premieoverzicht 2027
 * en het wijzigingsformulier 2027 (aangeleverd 18 november 2026); Jabes uit de inventaris van de live pagina.
 */

export type Insurer = {
  name: string
  /** Maximale korting op de aanvullende verzekering, zoals in het premieoverzicht 2027 ("Max. 16%"). */
  discount: string
  number: string
  /** Aanmeldlink. Alleen gevuld als de link is gecontroleerd (12 en 19 november 2026) en bij de verzekeraar uitkomt. */
  link: { href: string; label: string } | null
  via: 'Zicht Adviseurs' | 'Jabes verzekeringen'
}

/** Gesorteerd op korting, zoals in het ontwerp. */
export const INSURERS: Insurer[] = [
  {
    name: 'CZ',
    discount: 'tot 16%',
    number: '3886964',
    // Live link had Mailchimp-parameters uit 2016 (ct, mc_cid, mc_eid); die zijn weggehaald.
    link: { href: 'https://aanmelden.cz.nl/collectiviteit/3886964', label: 'Aanmelden bij CZ' },
    via: 'Zicht Adviseurs',
  },
  {
    name: 'VGZ',
    discount: 'tot 15%',
    number: '87711967',
    link: { href: 'https://www.vgz.nl/87711967', label: 'Aanmelden bij VGZ' },
    via: 'Zicht Adviseurs',
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
    number: '87737812',
    // Link uit het premieoverzicht 2027; op 19 november 2026 gecontroleerd: 200, pagina noemt de Onderwijs Inkoop Groep.
    link: {
      href: 'https://www.onvz.nl/zorgverzekering/collectief?coll-nummer=87737812',
      label: 'Aanmelden bij ONVZ',
    },
    via: 'Zicht Adviseurs',
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
    via: 'Zicht Adviseurs',
  },
  {
    name: 'Nationale Nederlanden',
    discount: 'tot 5%',
    number: 'ditiszorg2240',
    // Premieoverzicht 2027: "Max. 5%" (de oude pagina zei 10%). De link in de pdf is een Outlook Safe Links-adres
    // met een e-mailadres erin; dit is de echte bestemming, zoals ook als tekst in de pdf staat.
    link: { href: 'https://www.ditiszorg.nl/fidus', label: 'Aanmelden via ditiszorg.nl' },
    via: 'Zicht Adviseurs',
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
    text: 'De korting wordt op uw polis doorgevoerd. Vragen handelt Zicht Adviseurs (voorheen Fidus) af, voor De Christelijke Zorgverzekeraar is dat Jabes verzekeringen.',
  },
]

/** Zicht Adviseurs, tot 1 oktober 2026 Fidus. Gegevens uit het premieoverzicht en wijzigingsformulier 2027. */
export const ZICHT = {
  name: 'Zicht Adviseurs',
  formerly: 'voorheen Fidus',
  insurers: 'CZ, VGZ, ONVZ, Nationale Nederlanden en Menzis',
  phone: '020 30 20 091',
  email: 'zorg.debilt@zichtadviseurs.nl',
  site: { href: 'https://www.zichtadviseurs.nl/', label: 'www.zichtadviseurs.nl' },
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
  form: 'Wijzigingsformulier 2027',
  overview: 'Premieoverzicht collectieve zorgverzekering 2027',
  dcz: 'Premietabel De Christelijke Zorgverzekeraar 2027',
}
