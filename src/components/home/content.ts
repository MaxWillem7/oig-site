// Vaste tekst van de homepage. Herkomst per regel: docs/bronnen/home.md.

export const HERO_TILES = [
  {
    key: 'aanbesteden',
    title: 'Aanbesteden',
    text: 'Rechtmatig en zonder zorgen',
    href: '/dienst/aanbesteden/',
    tone: 'groen',
  },
  {
    key: 'inkoop',
    title: 'Slim inkopen',
    text: 'Collectieve contracten, scherpe prijzen',
    href: '/dienst/ondersteuning-inkoop/',
    tone: 'creme',
  },
  {
    key: 'premiedesk',
    title: 'Premiedesk',
    text: 'Grip op uw Whk-premie',
    href: '/dienst/premiedesk/',
    tone: 'blauwLicht',
  },
  {
    key: 'subsidiedesk',
    title: 'Subsidiedesk',
    text: 'Vinden, aanvragen, verantwoorden',
    href: '/dienst/subsidiedesk/',
    tone: 'blauw',
  },
] as const

export const SERVICES = [
  {
    key: 'aanbesteden',
    title: 'Aanbesteden',
    text: 'Wij begeleiden uw Europese of meervoudig onderhandse aanbesteding, van de inventarisatie per school tot het beoordelen van de inschrijvingen. U voldoet aan de regelgeving en wij nemen het werk uit handen.',
    link: 'Meer over aanbesteden',
    href: '/dienst/aanbesteden/',
    tone: 'groen',
  },
  {
    key: 'inkoop',
    title: 'Ondersteuning bij inkoop',
    text: 'Een inkoopscan laat zien hoe u ervoor staat. Daarna helpen wij u kosten te besparen per inkoopsegment, van analyse tot volledige implementatie.',
    link: 'Meer over inkoop',
    href: '/dienst/ondersteuning-inkoop/',
    tone: 'creme',
  },
  {
    key: 'premiedesk',
    title: 'Premiedesk',
    text: 'Structureel besparen op de WGA- en ZW-premie van de Werkhervattingskas (Whk). Wij scannen vrijblijvend op kansen.',
    link: 'Meer over de Premiedesk',
    href: '/dienst/premiedesk/',
    tone: 'blauw',
  },
  {
    key: 'subsidiedesk',
    title: 'Subsidiedesk',
    text: 'Wij ondersteunen u bij het vinden, aanvragen en verantwoorden van subsidies, zowel lokaal als landelijk.',
    link: 'Meer over de Subsidiedesk',
    href: '/dienst/subsidiedesk/',
    tone: 'blauw',
  },
  {
    key: 'inkoopbeleid',
    title: 'Inkoopbeleid',
    text: 'Bespaar kosten, voldoe aan wet- en regelgeving en creëer rust en overzicht. Wij helpen u bij het opstellen en uitvoeren van effectief inkoopbeleid.',
    link: 'Meer over inkoopbeleid',
    href: '/inkoopbeleid/',
    tone: 'groen',
  },
  {
    key: 'verzekeringen',
    title: 'Verzekeringen',
    text: 'Laat uw personeel meeliften op de collectieve zorgverzekering. Deelname is vrijblijvend en kost u niets.',
    link: 'Meer over verzekeringen',
    href: '/dienst/verzekeringen/',
    tone: 'creme',
  },
] as const

export const STEPS = [
  { title: 'Kennismaking', text: 'Persoonlijk, met alle betrokkenen' },
  { title: 'Inkoopscan', text: 'Uw inkoop per segment in kaart' },
  { title: 'Analyse en benchmark', text: 'Vergeleken met wat gangbaar is in de markt' },
  { title: 'Onderhandeling', text: 'Wij gaan voor u in gesprek met leveranciers' },
  { title: 'Rapportage', text: 'Kort en bondig, met een voorstel' },
  { title: 'Implementatie', text: 'Na uw goedkeuring verzorgen wij alles' },
  { title: 'Borging', text: 'Contracten, indexatie en einddata in de gaten' },
] as const

// Citaten van de live site: alleen ingekort (hele zinnen weggelaten), niet herschreven.
export const MAIN_QUOTE = {
  text: 'De OIG is onze partner voor een aantal inkooptrajecten zoals ICT devices via een Dynamisch Aankoop Systeem en het Onderwijs Leermiddelen Pakket via een aanbesteding. Met de kennis van de markt en het brede aanbod aan diensten neemt de OIG ons veel werk uit handen.',
  name: 'Martijn van Dijk',
  role: 'Coördinator contracten, Stichting Prisma Almere (19 basisscholen)',
  logo: {
    url: '/beeld/home/logo-stichting-prisma-almere.svg',
    alt: 'Logo Stichting Prisma Almere',
  },
}

export const SIDE_QUOTES = [
  {
    text: 'Door de collectieve inkoopkracht van de OIG worden steeds gunstige voorwaarden en lagere prijzen gerealiseerd. (...) Op grond van hun adviezen kunnen we uiteindelijk zelf goede keuzes maken.',
    by: 'Marc Verleun, beleidsadviseur, Stichting Alterius',
  },
  {
    text: 'Een samenwerking met de OIG kan ik aanraden, omdat we daardoor meer tijd en financiën overhouden om gestalte te geven aan de primaire taak van onze organisatie en dat is lesgeven!',
    by: 'Henk Hoek, Vereniging Scholen met de Bijbel Staphorst',
  },
] as const
