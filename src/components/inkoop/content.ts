/**
 * Vaste inhoud van de pagina's Ondersteuning bij inkoop en Inkoopsegmenten.
 * Bronnen per regel: docs/bronnen/ondersteuning-inkoop.md en docs/bronnen/inkoopsegmenten.md.
 */

export const INKOOP_PATH = '/dienst/ondersteuning-inkoop/'
export const SEGMENTEN_PATH = '/dienst/ondersteuning-inkoop/inkoopsegmenten/'

export type Segment = {
  /** Anker op de pagina Inkoopsegmenten */
  id: string
  name: string
  text: string
  link?: { href: string; label: string }
}

/** De segmenten die de live site toont, in dezelfde volgorde. */
export const segments: Segment[] = [
  {
    id: 'kopieerapparatuur',
    name: 'Kopieerapparatuur',
    text: 'Wij delen graag onze inzichten op het gebied van kopieercontracten, zodat u verborgen kosten voorkomt.',
    link: { href: '/lp/kopieerapparaat/', label: 'Whitepaper kopieerapparatuur' },
  },
  {
    id: 'schoonmaak',
    name: 'Schoonmaak',
    text: 'Een schone school is een visitekaartje voor bezoekers. Wij geven u inzicht in de kosten en weten de weg naar kwalitatief goede bedrijven.',
    link: { href: '/lp/schoonmaak/', label: 'Whitepaper schoonmaak' },
  },
  {
    id: 'leermiddelen',
    name: 'Leermiddelen',
    text: 'Wij hebben veel expertise en een netwerk opgebouwd in de inkoop van het onderwijsleerpakket. Ook bij de grote leveranciers ontvangt u via de OIG de scherpste tarieven.',
  },
  {
    id: 'afval',
    name: 'Afval',
    text: 'Wij hebben afspraken met de grote afvalverwerkers van Nederland. Of u nu rolcontainers of ondergrondse afvalcontainers gebruikt, wij helpen u bij het afsluiten van de scherpste deal.',
  },
  {
    id: 'sanitair',
    name: 'Sanitair',
    text: 'Hygiënisch en fris sanitair is voor veel ouders belangrijk. Wij helpen u aan schone toiletruimtes tegen een laag tarief.',
  },
  {
    id: 'ledverlichting',
    name: 'Ledverlichting',
    text: 'Met ledverlichting kunt u tot 70% besparen op uw energieverbruik, met een terugverdientijd van gemiddeld 3 jaar.',
  },
  {
    id: 'energie',
    name: 'Energie',
    text: '"Geef Scholen Energie" is ons inkoopcollectief voor energie: een zeer scherp tarief, zonder dat u zich voor meerdere jaren hoeft vast te leggen.',
  },
  {
    id: 'brandbeveiliging',
    name: 'Brandbeveiliging',
    text: 'De controle van uw blusmiddelen komt elk jaar terug. Wij hebben contacten met meerdere landelijke en lokale bedrijven.',
  },
  {
    id: 'payroll',
    name: 'Payroll',
    text: 'Maakt u al gebruik van payrolling of overweegt u een payrollbedrijf in te schakelen? Wij denken graag met u mee.',
  },
  {
    id: 'beveiliging',
    name: 'Beveiliging en alarmcentrale',
    text: 'Beveiliging van uw gebouwen kan ongemerkt onnodig hoge kosten met zich meebrengen. Een scan geeft inzicht in uw situatie.',
  },
  {
    id: 'speelpleinen',
    name: 'Controle speelpleinen, gym- en speellokalen',
    text: 'Veilige speeltoestellen en gymmaterialen zijn een voorwaarde om zorgeloos te spelen. Onze partners voeren vakkundige inspecties uit en adviseren over onderhoud en reparaties.',
  },
  {
    id: 'arbodienstverlening',
    name: 'Arbodienstverlening',
    text: 'Een arbodienst kan een belangrijke bijdrage leveren aan een veiligere en gezondere werkomgeving. Wij helpen u graag bij het vinden van de juiste partij.',
  },
  {
    id: 'administratiekantoor',
    name: 'Administratiekantoor',
    text: 'Een administratiekantoor is meer dan een leverancier: het is een partner die u ondersteunt en begeleidt. Dienstverlening en kosten gaan daarbij hand in hand.',
  },
  {
    id: 'automatisering',
    name: 'Automatisering',
    text: 'Nieuwe hardware voor uw school nodig? Wij helpen u aan de beste offerte. Heeft u al een offerte? Stuur hem door, dan onderhandelen wij hem verder voor u uit.',
  },
  {
    id: 'ict',
    name: 'ICT',
    text: 'Wij helpen u graag met de inkoop van al uw ICT-diensten.',
  },
]

/**
 * Gemiddelde besparing per segment, letterlijk overgenomen uit de afbeelding
 * screenshot-2025-05-12-at-14.00.45.png op de live pagina /inkoopbeleid/.
 */
export const savings: { name: string; pct: number }[] = [
  { name: 'Kopieerapparaten', pct: 59 },
  { name: 'Sanitair', pct: 46 },
  { name: 'BHV', pct: 41 },
  { name: 'Afvalverwijdering', pct: 39 },
  { name: 'Controle speellokaal / gymzaal', pct: 37 },
  { name: 'Controle speeltoestellen plein', pct: 35 },
  { name: 'Beveiliging gebouw', pct: 33 },
  { name: 'Koffie', pct: 32 },
  { name: 'Papier', pct: 25 },
  { name: 'Brandbeveiliging', pct: 24 },
  { name: 'Energie', pct: 20 },
  { name: 'Schoonmaak', pct: 19 },
  { name: 'Arbodienst', pct: 16 },
  { name: 'Administratiekantoor', pct: 14 },
  { name: 'ICT en automatisering', pct: 11 },
  { name: 'Onderwijs leerpakket', pct: 9 },
]
