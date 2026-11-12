/**
 * Vaste inhoud van /fietsplan-onderwijs/. Bron: de whitepaper "Zet heel onderwijs Nederland op de fiets"
 * (whitepaper-leasefiets-def.pdf, 27 mei 2025, 12 pagina's) en de oude landingspagina /lp/leasefiets/.
 * Bron per regel: docs/bronnen/fietsplan-onderwijs.md.
 */

export const STEPS = [
  {
    title: 'U stelt een fiets ter beschikking',
    text: 'Als werkgever mag u een medewerker een fiets ter beschikking stellen. Dat kan elk type fiets zijn, van e-bike tot bakfiets.',
  },
  {
    title: 'De leasemaatschappij financiert',
    text: 'De fietsen worden gefinancierd door de leasemaatschappij. Lease a Bike neemt ook het onderhoud, de verzekering en alle administratie over.',
  },
  {
    title: 'Eigen bijdrage uit het brutoloon',
    text: 'De medewerker betaalt 36 maanden een eigen bijdrage uit het brutoloon. U kunt overwegen een deel bij te dragen. Omdat de medewerker de fiets ook privé gebruikt, geldt een fiscale bijtelling van 7%.',
  },
  {
    title: 'Overnemen na 36 maanden',
    text: 'Na 36 maanden heeft de medewerker het recht om de fiets over te nemen van de leasemaatschappij. Dat is optioneel.',
  },
  {
    title: 'Alles geautomatiseerd',
    text: 'Het hele proces is maximaal geautomatiseerd.',
  },
  {
    title: 'Maandelijks overzicht',
    text: 'U ontvangt van de leasemaatschappij elke maand een overzicht voor de salarisadministratie.',
  },
]

export const SCOPE = [
  {
    icon: 'fiets',
    title: 'Alle typen fietsen',
    text: 'Stadsfietsen, e-bikes, mountainbikes, racefietsen, bakfietsen en speed-pedelecs, zolang de medewerker zelf (deels) moet trappen.',
  },
  {
    icon: 'organisatie',
    title: 'Alle typen organisaties',
    text: 'Rechtspersonen zoals een stichting, vereniging, bv of nv, en natuurlijke personen als zzp’er of een vof.',
  },
  {
    icon: 'medewerkers',
    title: 'Alle medewerkers in dienst',
    text: 'Medewerkers die in dienstbetrekking zijn volgens de Wet op de loonbelasting. Uitgezonderd zijn tijdelijke krachten zoals uitzendkrachten en ingehuurde zzp’ers.',
  },
] as const

/** Tabel "De evolutie van de fietsenregelingen" (whitepaper, pagina 5), letterlijk overgenomen. */
export const EVOLUTION = {
  columns: ['Fietsplan', 'WKR-regeling', 'Leasefiets'],
  rows: [
    { label: 'Mogelijkheid', cells: ['Tot 2014', 'Na 2014', 'Vanaf 2020'] },
    { label: 'Type fiets', cells: ['Alle', 'Alle', 'Alle'] },
    { label: 'Model', cells: ['Koop', 'Koop', 'Lease, optie tot koop'] },
    {
      label: 'Maximumbedrag',
      cells: ['Tot € 749', 'Geen maximum, overschrijding van de WKR is 80% belast', 'Geen maximum'],
    },
    { label: 'Bijdrage werkgever', cells: ['Niet', 'Vanuit de WKR', 'Optioneel'] },
    {
      label: 'Bijdrage medewerker',
      cells: ['Uit brutoloon', 'Optioneel uit brutoloon', '7% bijtelling'],
    },
    {
      label: 'Betaling',
      cells: ['Eenmalig het hele bedrag', 'Eenmalig het hele bedrag', 'Maandelijks'],
    },
  ],
}

export const FISCAL = [
  {
    title: 'Werkkostenregeling',
    text: [
      'Een belangrijk voordeel van dit fietsplan is dat het niet ten koste gaat van de werkkostenregeling. De fiets wordt niet geschonken aan de medewerker, maar ter beschikking gesteld.',
    ],
  },
  {
    title: 'Bijdrage van de werkgever',
    text: [
      'In principe betaalt de medewerker de fiets in 36 termijnen via het brutoloon. Het brutoloon daalt, waardoor u als werkgever ongeveer 20% sociale lasten bespaart.',
      'Het is dan ook logisch om dat voordeel door te geven aan de medewerker, met een bijdrage van 20% in de maandelijkse lasten.',
    ],
  },
  {
    title: 'Bijtelling',
    text: [
      'Omdat u de fiets ter beschikking stelt, geldt een forfaitaire bijtelling, net als bij een leaseauto. Het bijtellingspercentage is 7% van de consumentenadviesprijs, voor alle typen fietsen. Anders dan bij de auto vervalt de bijtelling niet als de fiets alleen voor woon-werkverkeer wordt gebruikt.',
      'Voor een e-bike van € 2.500 is de bijtelling € 175 per jaar, ofwel € 14,58 per maand. Wat dat de medewerker netto kost, hangt af van de belastingschaal.',
    ],
  },
  {
    title: 'Reiskostenvergoeding',
    text: [
      'De medewerker ontvangt geen reiskostenvergoeding voor de dagen waarop hij of zij met de fiets naar het werk komt. Voor de dagen met ander vervoer (eigen auto, ov) blijft de reiskostenvergoeding gelden.',
      'Wij adviseren om vooraf met de medewerker vast te leggen hoeveel dagen hij of zij met de leasefiets komt en hoeveel dagen met ander vervoer.',
    ],
  },
  {
    title: 'Uitruilregeling',
    text: [
      'De reiskostenvergoeding in het onderwijs is relatief laag. Veel onderwijsbesturen bieden medewerkers daarom een uitruilregeling: brutoloon wordt geruild tegen aanvullende netto reiskostenvergoeding.',
      'Die uitruilregeling blijft van toepassing op alle dagen dat de medewerker niet met de leasefiets naar het werk gaat.',
    ],
  },
]

/** Tabel met drie verdelingen (whitepaper, pagina 6), bij een fiets van € 2.900. */
export const SCENARIOS = {
  columns: [
    'Fiets die de medewerker kiest',
    'Bijdrage werkgever per maand',
    'Netto bijdrage medewerker per maand',
  ],
  rows: [
    { label: 'Werkgever investeert', cells: ['€ 2.900', '€ 108,68', '€ 8,51'] },
    { label: 'Gedeelde investering', cells: ['€ 2.900', '€ 50,00', '€ 40,38'] },
    { label: 'Werkgever faciliteert', cells: ['€ 2.900', '€ 0,00', '€ 69,60'] },
  ],
}

export const PRACTICAL = [
  {
    title: 'Welke fietsendealer?',
    text: 'Vrijwel alle fietsendealers in Nederland zijn aangesloten. Bij al die dealers kan een fiets worden uitgezocht. Er is ook geen beperking in merken: elke fiets kan worden gekozen.',
  },
  {
    title: 'Service, onderhoud en verzekering',
    text: 'Er zijn vier service- en onderhoudspakketten en er wordt een allriskverzekering afgesloten. Welk pakket er ook wordt gekozen, de kosten zitten in de leaseprijs en zijn dus te verrekenen met het brutoloon. Voor u als werkgever is alle rompslomp rond onderhoud en verzekering uit handen genomen.',
  },
  {
    title: 'Wat kost deelname?',
    text: 'Deelname is kosteloos. Lease a Bike en de Onderwijs Inkoop Groep rekenen geen kosten door. Voor de Onderwijs Inkoop Groep is het fietsplan onderdeel van het brede dienstenpakket waarmee wij onze klanten ondersteunen bij inkoop.',
  },
  {
    title: 'Als een medewerker uit dienst gaat',
    text: 'U kunt vooraf afspreken dat de medewerker dan zelf de resterende bedragen voldoet.',
  },
  {
    title: 'Promotiemateriaal',
    text: 'Er is een flyer beschikbaar voor medewerkers en voor werkgevers. Medewerkers krijgen ook toegang tot een platform waar alle informatie staat.',
  },
  {
    title: 'Geen BKR-registratie',
    text: 'De fietsen worden geleaset door de werkgever. De medewerker gaat geen lening aan en wordt dus ook niet geregistreerd bij het BKR.',
  },
]

/** Rekenvoorbeeld "meester Henk" (whitepaper, pagina 11). */
export const EXAMPLE = {
  points: [
    'Meester Henk werkt bij een stichting die de btw van de leasemaatschappij niet kan verrekenen.',
    'Hij verdient € 3.600 bruto per maand (schaal L10, tien jaar in dienst) en woont 10 kilometer van zijn school.',
    'Hij gaat één dag per week met de fiets naar school en kiest een e-bike van € 2.900.',
    'Hij betaalt 7% bijtelling over € 2.900.',
    'Zijn bestuur geeft het voordeel van de lagere sociale lasten aan hem door en draagt 20% van de e-bike bij: € 580 over 36 maanden, ofwel € 16,11 per maand.',
    'Hij maakt gebruik van de uitruilregeling. Die loopt hij nu voor één dag mis.',
  ],
  lease: {
    title: 'Leasen',
    rows: [
      ['Leasebijdrage', '€ 2.506'],
      ['Uitruilvergoeding 1 dag', '€ 47'],
      ['Reiskostenvergoeding', '€ 3'],
      ['Overname fiets', '€ 580'],
    ],
    total: '€ 3.136',
  },
  buy: {
    title: 'Zelf kopen',
    rows: [
      ['Fiets', '€ 2.900'],
      ['Service en verzekering', '€ 893'],
    ],
    total: '€ 3.793',
  },
  saving: '€ 657',
  percent: '21%',
}

export const START = [
  'Er wordt een kredietcheck gestart, omdat er sprake is van lease.',
  'U ontvangt de contracten digitaal ter ondertekening.',
  'Na ondertekening wordt het digitale platform ingericht.',
  'Samen met u start de promotie richting uw medewerkers.',
  'Uw medewerkers geven online aan dat ze mee willen doen.',
  'Na uw goedkeuring ontvangen ze een pincode waarmee ze de fiets kunnen uitzoeken.',
  'U verwerkt de maandelijkse leasebijdragen in uw salarisadministratie.',
]

export const CALCULATOR_URL = 'https://www.lease-a-bike.nl/calculator/'
