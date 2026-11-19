import type { SeedContext } from '../context'

/**
 * Premietabellen 2027, letterlijk overgenomen uit twee stukken die OIG op 18 november 2026 aanleverde
 * (klantmap "Zorgverzekering 2027"):
 * - "Premie overzicht collectieve zorgverzekering OIG 2027" van Zicht Adviseurs (CZ, VGZ, ONVZ, Menzis,
 *   Nationale Nederlanden). De verzekeraar per kolom is afgelezen aan de logo's boven de tabellen.
 * - "Premie DCZ Onderwijs Inkoop Groep" (De Christelijke Zorgverzekeraar, collectief 205504273).
 *
 * Bewust weggelaten: de natura-tabel onder het ONVZ-logo op pagina 3 van het premieoverzicht. Die heeft
 * dezelfde pakketnamen en exact dezelfde bedragen als VGZ ("Bewuste Keuze", "Ruime Keuze"); vermoedelijk een
 * kopieerfout. Navragen bij Zicht Adviseurs; zie docs/bronnen/verzekeringen.md.
 *
 * Volgorde: zoals de vergelijkingstabel op de pagina (hoogste korting eerst).
 */
export type PremiumTableData = {
  title: string
  insurer: string
  columns: string[]
  rows: [label: string, ...values: string[]][]
  note?: string
}

const YEAR = 2027

const ER = ['Vrijwillig € 0', 'Vrijwillig € 100', 'Vrijwillig € 200', 'Vrijwillig € 300', 'Vrijwillig € 400', 'Vrijwillig € 500']

const BASIS_NOOT =
  'Maandpremie per verzekerde van 18 jaar en ouder, per hoogte van het vrijwillig eigen risico. Het verplichte eigen risico voor 2027 bedraagt € 400; u kunt ervoor kiezen dit vrijwillig te verhogen voor een extra premiekorting. Natura: gedeeltelijke zorgsturing. Combinatie: gedeeltelijke zorgsturing met meer keuzevrijheid.'

const AANVULLEND_NOOT = 'Maandpremie. De collectiviteitskorting is al verwerkt.'

const vooruit = (insurer: string, korting: string) =>
  `Betaalt u de premie vooruit, dan ontvangt u op alle premies van ${insurer} extra korting: ${korting}.`

const PREMIE = ['Premie per maand']

export const PREMIUM_TABLES_2027: PremiumTableData[] = [
  // ── CZ ── premieoverzicht p. 2 (natura), p. 4 (combinatie), p. 5 (aanvullend), p. 6 (tand), p. 7 (vooruitbetalen)
  {
    title: 'CZ basisverzekering 2027',
    insurer: 'CZ',
    columns: ER,
    rows: [
      ['Zorgbewust (natura)', '€ 176,25', '-', '-', '-', '-', '€ 161,25'],
      ['Zorgopmaat (natura)', '€ 177,25', '€ 174,25', '€ 171,25', '€ 168,25', '€ 165,25', '€ 162,25'],
      ['Zorgvariatiepolis (combinatie)', '€ 202,50', '€ 199,50', '€ 196,50', '€ 193,50', '€ 190,50', '€ 187,50'],
    ],
    note: `${BASIS_NOOT}\n${vooruit('CZ', 'bij jaarbetaling 2%')}`,
  },
  {
    title: 'CZ aanvullende verzekeringen 2027',
    insurer: 'CZ',
    columns: PREMIE,
    rows: [
      ['Start', '€ 1,81'],
      ['Compact', '€ 7,73'],
      ['Basis', '€ 11,72'],
      ['50+', '€ 19,78'],
      ['Jongeren', '€ 24,23'],
      ['Plus', '€ 31,88'],
      ['Top', '€ 48,59'],
    ],
    note: AANVULLEND_NOOT,
  },
  {
    title: 'CZ tandartsverzekeringen 2027',
    insurer: 'CZ',
    columns: PREMIE,
    rows: [
      ['Compact tandarts', '€ 16,02'],
      ['Tandarts Collectief tandarts', '€ 35,14'],
      ['Uitgebreide tandarts', '€ 56,38'],
    ],
    note: AANVULLEND_NOOT,
  },

  // ── VGZ ──
  {
    title: 'VGZ basisverzekering 2027',
    insurer: 'VGZ',
    columns: ER,
    rows: [
      ['Basis Keuze (natura)', '€ 167,40', '€ 164,40', '€ 161,40', '€ 158,40', '€ 155,40', '€ 150,40'],
      ['Ruime Keuze (natura)', '€ 170,75', '€ 167,75', '€ 164,75', '€ 161,75', '€ 158,75', '€ 155,75'],
      ['VGZ Eigen Keuze (combinatie)', '€ 188,15', '€ 185,15', '€ 182,15', '€ 179,15', '€ 176,15', '€ 173,15'],
    ],
    note: `${BASIS_NOOT}\n${vooruit('VGZ', 'bij jaarbetaling 1%')}`,
  },
  {
    title: 'VGZ aanvullende verzekeringen 2027',
    insurer: 'VGZ',
    columns: PREMIE,
    rows: [
      ['Werkt Basis', '€ 2,12'],
      ['Werkt Instap', '€ 5,65'],
      ['Werkt Goed', '€ 11,26'],
      ['Werkt Beter', '€ 28,77'],
      ['Werkt Best', '€ 46,92'],
    ],
    note: AANVULLEND_NOOT,
  },
  {
    title: 'VGZ tandartsverzekeringen 2027',
    insurer: 'VGZ',
    columns: PREMIE,
    rows: [
      ['Werkt Tand Instap', '€ 8,77'],
      ['Werkt Tand Goed', '€ 15,03'],
      ['Werkt Tand Beter', '€ 32,53'],
      ['Werkt Tand Best', '€ 59,35'],
    ],
    note: AANVULLEND_NOOT,
  },

  // ── De Christelijke Zorgverzekeraar ── eigen premietabel (Premie DCZ Onderwijs Inkoop Groep)
  {
    title: 'De Christelijke Zorgverzekeraar basisverzekering 2027',
    insurer: 'De Christelijke Zorgverzekeraar',
    columns: ER,
    rows: [['Principe Polis', '€ 160,95', '€ 157,45', '€ 153,95', '€ 150,45', '€ 146,95', '€ 143,45']],
    note: 'Maandpremie per hoogte van het vrijwillig eigen risico. Voor de basisverzekering geldt een wettelijk verplicht eigen risico van € 400. Met het eigen risico betaalt u een deel van de zorgkosten zelf. Dit geldt alleen voor de basisverzekering.\nPremiebetaling voor het hele jaar vooruit: 1% korting, voor een half jaar vooruit: 0,5% korting. De Christelijke Zorgverzekeraar houdt zich het recht voor om deze betalingskorting jaarlijks per 1 januari aan te passen.',
  },
  {
    title: 'De Christelijke Zorgverzekeraar aanvullende verzekeringen 2027',
    insurer: 'De Christelijke Zorgverzekeraar',
    columns: ['18 jaar en ouder'],
    rows: [
      ['Smallpolis', '€ 9,31'],
      ['Mediumpolis', '€ 23,16'],
      ['Largepolis', '€ 46,71'],
      ['Extra Largepolis', '€ 67,96'],
      ['Aanvullend Zorgpakket (extra aanvullende verzekering)', 'Gratis'],
    ],
    note: 'Maandpremie, inclusief 15% korting. Kinderen tot 18 jaar krijgen de hoogst gekozen aanvullende verzekering van één van de ouders als er een aanvullende verzekering is gesloten. Zij betalen geen premie en geen eigen risico. Uit het Aanvullend Zorgpakket krijgen kinderen tot 18 jaar vergoeding als één van de ouders deze verzekering heeft gekozen.',
  },
  {
    title: 'De Christelijke Zorgverzekeraar tandverzekeringen 2027',
    insurer: 'De Christelijke Zorgverzekeraar',
    columns: ['18 jaar en ouder'],
    rows: [
      ['Tand Small', '€ 12,96'],
      ['Tand Medium', '€ 23,59'],
      ['Tand Large', '€ 41,86'],
    ],
    note: 'Maandpremie, inclusief 15% korting. Kinderen tot 18 jaar kunnen geen tandartsverzekering afsluiten. Ze krijgen de meeste tandartskosten vergoed vanuit de basisverzekering en vanuit de hoogste aanvullende verzekering van één van de ouders als de ouders een aanvullende verzekering hebben gesloten.',
  },

  // ── ONVZ ── natura-tabel bewust weggelaten (zie boven)
  {
    title: 'ONVZ basisverzekering 2027',
    insurer: 'ONVZ',
    columns: ER,
    rows: [['ONVZ Vrije Keuze (combinatie)', '€ 183,60', '€ 180,60', '€ 177,60', '€ 174,60', '€ 171,60', '€ 161,60']],
    note: `${BASIS_NOOT}\n${vooruit('ONVZ', 'per kwartaal 0,5%, per halfjaar 1% en per jaar 2%')}`,
  },
  {
    title: 'ONVZ aanvullende verzekeringen 2027',
    insurer: 'ONVZ',
    columns: ['Vanaf 18 jaar', 'Tot 18 jaar'],
    rows: [
      ['Introfit', '€ 6,75', 'Gratis'],
      ['Startfit', '€ 8,86', 'Gratis'],
      ['Benfit', '€ 22,01', 'Gratis'],
      ['Optifit', '€ 45,43', 'Gratis'],
      ['Topfit', '€ 72,00', '€ 22,01'],
      ['OntzorgPlus', '€ 4,36', 'Gratis'],
      ['Wereldfit', '€ 3,38', 'Gratis'],
    ],
    note: AANVULLEND_NOOT,
  },
  {
    title: 'ONVZ tandartsverzekeringen 2027',
    insurer: 'ONVZ',
    columns: ['Vanaf 18 jaar'],
    rows: [
      ['Tandfit Preventief', '€ 34,60'],
      ['Tandfit A', '€ 13,45'],
      ['Tandfit B', '€ 32,17'],
      ['Tandfit C', '€ 44,51'],
    ],
    note: AANVULLEND_NOOT,
  },

  // ── Menzis ──
  {
    title: 'Menzis basisverzekering 2027',
    insurer: 'Menzis',
    columns: ER,
    rows: [
      ['Basis Voordelig (natura)', '€ 160,75', '€ 157,25', '€ 153,75', '€ 150,25', '€ 146,75', '€ 143,25'],
      ['Basis (natura)', '€ 165,75', '€ 162,25', '€ 158,75', '€ 155,25', '€ 151,75', '€ 148,25'],
      ['Basis Vrij (combinatie)', '€ 188,25', '€ 184,75', '€ 181,25', '€ 177,75', '€ 174,25', '€ 170,75'],
    ],
    note: `${BASIS_NOOT}\n${vooruit('Menzis', 'bij jaarbetaling 1%')}`,
  },
  {
    title: 'Menzis aanvullende verzekeringen 2027',
    insurer: 'Menzis',
    columns: PREMIE,
    rows: [
      ['Buitenland en Tandongeval', '€ 1,99'],
      ['Aanvullend', '€ 18,00'],
      ['Extra Aanvullend', '€ 31,90'],
      ['Extra Verzorgd 1', '€ 7,83'],
      ['Extra Verzorgd 2', '€ 22,75'],
      ['Extra Verzorgd 3', '€ 41,68'],
      ['Jongeren Verzorgd', '€ 19,25'],
    ],
    note: AANVULLEND_NOOT,
  },
  {
    title: 'Menzis tandartsverzekeringen 2027',
    insurer: 'Menzis',
    columns: PREMIE,
    rows: [
      ['TandVerzorgd € 250', '€ 13,29'],
      ['TandVerzorgd € 500', '€ 21,52'],
      ['TandVerzorgd € 750', '€ 34,58'],
    ],
    note: AANVULLEND_NOOT,
  },

  // ── Nationale Nederlanden ──
  {
    title: 'Nationale Nederlanden basisverzekering 2027',
    insurer: 'Nationale Nederlanden',
    columns: ER,
    rows: [
      ['Zorg Voordelig (natura)', '€ 164,45', '-', '€ 162,45', '-', '-', '€ 159,45'],
      ['Combinatiepolis Zorg Vrij (combinatie)', '€ 178,85', '€ 175,85', '€ 172,85', '€ 169,85', '€ 166,85', '€ 163,85'],
    ],
    note: `${BASIS_NOOT}\n${vooruit('Nationale Nederlanden', 'bij jaarbetaling 2%')}`,
  },
  {
    title: 'Nationale Nederlanden aanvullend op Zorg Vrij 2027',
    insurer: 'Nationale Nederlanden',
    columns: PREMIE,
    rows: [
      ['Instap', '€ 8,05'],
      ['Start', '€ 11,96'],
      ['Extra', '€ 28,06'],
      ['Compleet', '€ 48,71'],
      ['Jij en Compact', '€ 16,10'],
      ['Jij en Gemak', '€ 32,06'],
      ['Jij en Vitaal', '€ 42,70'],
    ],
    note: AANVULLEND_NOOT,
  },
  {
    title: 'Nationale Nederlanden aanvullend op Zorg Voordelig 2027',
    insurer: 'Nationale Nederlanden',
    columns: PREMIE,
    rows: [
      ['Zorg Basis', '€ 2,00'],
      ['Zorg Zeker', '€ 4,95'],
      ['Zorg Zeker Plus', '€ 14,95'],
      ['Zorg Zeker&Tand', '€ 19,60'],
    ],
    note: AANVULLEND_NOOT,
  },
  {
    title: 'Nationale Nederlanden tandartsverzekeringen 2027',
    insurer: 'Nationale Nederlanden',
    columns: PREMIE,
    rows: [
      ['TandenGaaf € 250 (75%), aanvullend op Zorg Vrij', '€ 14,96'],
      ['TandenGaaf € 500 (75%), aanvullend op Zorg Vrij', '€ 25,60'],
      ['TandenGaaf € 1.000 (100%), aanvullend op Zorg Vrij', '€ 54,97'],
      ['TandenGaaf € 1.500 (100%), aanvullend op Zorg Vrij', '€ 77,97'],
      ['Zorg Tand € 250 (75%), aanvullend op Zorg Voordelig', '€ 9,95'],
    ],
    note: AANVULLEND_NOOT,
  },
]

/** Zet de tabellen om naar de velden van de collectie Premietabellen. */
export const premiumTableDocs = (tables: PremiumTableData[] = PREMIUM_TABLES_2027) =>
  tables.map((t, i) => ({
    title: t.title,
    year: YEAR,
    insurer: t.insurer,
    note: t.note ?? null,
    columns: t.columns.map((label) => ({ label })),
    rows: t.rows.map(([label, ...values]) => ({ label, cells: values.map((value) => ({ value })) })),
    order: (i + 1) * 10,
  }))

export default async function seedPremiums(ctx: SeedContext) {
  for (const doc of premiumTableDocs()) await ctx.upsert('premies', doc.title, doc, 'title')
}
