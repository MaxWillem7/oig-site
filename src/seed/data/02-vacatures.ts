import type { SeedContext } from '../context'

/**
 * Vier vacatures, tekst van de live site (12 november 2026), in je-vorm. Slugs gelijk aan de
 * huidige adressen. Alleen aantoonbare typfouten zijn verbeterd; zie docs/bronnen/cms-inhoud.md.
 * datePosted = publicatiedatum van de pagina in WordPress (/wp-json/wp/v2/pages?slug=...).
 */
type Bullets = { intro?: string; items: string[] }

type Vacancy = {
  slug: string
  title: string
  teaser: string
  hours: string
  education: string
  intro: string
  about?: string
  seeking: Bullets
  profile: Bullets
  tasks: Bullets
  offer: Bullets
  salary?: { min: number; max: number }
  photos: string[]
  datePosted: string
}

const VACANCIES: Vacancy[] = [
  {
    slug: 'inkoopadviseur-relatiebeheerder',
    title: 'Inkoopadviseur / Accountmanager',
    teaser:
      'Ben jij een verbinder? En lijkt het je interessant om mee te bouwen aan slimme, eerlijke en duurzame inkoop binnen het onderwijs? Dan zoeken wij jou!',
    hours: '32-40 uur',
    education: 'HBO',
    intro:
      'Ben jij een verbinder? En lijkt het je interessant om mee te bouwen aan slimme, eerlijke en duurzame inkoop binnen het onderwijs? Dan zoeken wij jou!',
    about:
      'De Onderwijs Inkoop Groep (OIG) is een groeiend collectief dat schoolbesturen door heel Nederland ondersteunt bij transparante en scherpe inkoop. Met een super enthousiast team van 20 betrokken collega’s zorgen we ervoor dat scholen zich kunnen richten op wat er echt toe doet: goed onderwijs geven. Wij regelen de rest, van aanbestedingen tot contractbeheer. Wij zoeken een commercieel sterke inkoopprofessional die als vast aanspreekpunt de schoolbesturen echt kent, graag aanpakt en verantwoordelijkheid neemt, en zich thuis voelt in een team dat successen samen viert.',
    seeking: {
      items: [
        'Uitgesproken teamplayers zijn',
        'Een analytische inslag hebben en goed kunnen rekenen',
        'HBO werk- en denkniveau',
        'In een straal van 40 kilometer rond Zeewolde wonen',
      ],
    },
    profile: {
      items: [
        'Je hebt minimaal HBO werk- en denkniveau',
        'Je hebt interesse in of ervaring met publieke inkoop en aanbestedingen',
        'Je bent van nature relatiegericht en communiceert makkelijk op verschillende niveaus',
        'Je hebt goede mondelinge en schriftelijke vaardigheden',
        'Je beschikt over een gezonde dosis lef, humor en gogme',
        'Je bent analytisch sterk en denkt commercieel mee',
        'Je bent een uitgesproken teamplayer',
        'Je bent bereid om regelmatig op locatie bij schoolbesturen te zijn',
      ],
    },
    tasks: {
      intro:
        'Als Inkoopadviseur / Accountmanager ben jij het gezicht van OIG richting onze opdrachtgevers. Je bouwt en onderhoudt duurzame relaties met schoolbesturen en bent hun vaste vraagbaak op inkoopgebied. Concreet ga je:',
      items: [
        'het eerste aanspreekpunt zijn voor een eigen portefeuille aan schoolbesturen',
        'proactief signaleren welke inkoopvragen en -kansen er bij jouw relaties spelen',
        'adviseren over inkoopvraagstukken en meedenken in oplossingen op maat',
        'samenwerken met collega’s uit verschillende teams binnen de OIG',
      ],
    },
    offer: {
      items: [
        'Een super enthousiast team van 20 betrokken collega’s',
        'Een functie voor 32-40 uur per week',
        'Een leaseauto, zodat je moeiteloos bij jouw relaties komt',
        'Een MacBook en iPhone om je werk slim en overal te kunnen doen',
        'Premievrij pensioen en een bonusregeling',
        'Begeleiding van ervaren collega’s en volop ruimte om door te groeien',
        'Een groeiende organisatie met impact op het Nederlandse onderwijs',
        'Een team waarin successen samen gevierd worden en fouten mogen, zolang we ervan leren',
        'Een salarishuis met voldoende doorgroeimogelijkheden',
        'Een startsalaris tussen de € 3.484,- en € 4.728,- op basis van een fulltime dienstverband',
      ],
    },
    salary: { min: 3484, max: 4728 },
    photos: ['vacature-oig-085.jpg', 'vacature-oig-078.jpg', 'vacature-oig-107.jpg'],
    datePosted: '2025-07-10',
  },
  {
    slug: 'junior-inkoopadviseur-aanbestedingsdesk',
    title: 'Junior Inkoopadviseur Aanbestedingsdesk',
    teaser:
      'Aanbesteden, van uitvraag tot gunning, jij houdt overzicht waar anderen het kwijtraken. Hou je van structuur, scherpe deadlines en het gevoel dat een dossier klopt, dan vind je hier je plek.',
    hours: '24-32 uur',
    education: 'MBO+ / HBO',
    intro:
      'Wil jij werk doen dat er echt toe doet? En lijkt het je interessant om mee te bouwen aan slimme, eerlijke en duurzame inkoop binnen het onderwijs? Dan is dit misschien wel jouw volgende stap.\n\nBij de Onderwijs Inkoop Groep zoeken we een Junior Inkoopadviseur die energie krijgt van organiseren, adviseren en het begeleiden van aanbestedingen. Je hoeft nog niet alles te kunnen - als je nieuwsgierig bent, graag leert en zin hebt om je te ontwikkelen in het inkoopvak, dan pas je waarschijnlijk al goed bij ons.',
    seeking: {
      items: [
        'Uitgesproken teamplayers zijn',
        'Een analytische inslag hebben en goed kunnen rekenen',
        'HBO werk- en denkniveau',
        'In een straal van 40 kilometer rond Zeewolde wonen',
      ],
    },
    profile: {
      items: [
        'Je hebt een afgeronde hbo-opleiding, bijvoorbeeld in de richting van rechten, bestuurskunde, bedrijfskunde, economie of facility/inkoop',
        'Je hebt interesse in of ervaring met publieke inkoop en aanbestedingen',
        'Je hebt kennis van aanbestedingswetgeving, of de motivatie om je daarin verder te ontwikkelen',
        'Je hebt een proactieve en resultaatgerichte instelling',
        'Je beschikt over goede mondelinge en schriftelijke vaardigheden',
        'Je bent bereid om op kantoor in Zeewolde te werken',
        'Affiniteit met onderwijs is mooi meegenomen, maar zeker geen vereiste',
      ],
    },
    tasks: {
      intro:
        'Als Junior Inkoopadviseur ondersteun en adviseer je opdrachtgevers bij aanbestedingstrajecten. Je werkt samen met collega’s uit verschillende teams en helpt onderwijsorganisaties om inkooptrajecten professioneel, zorgvuldig en toekomstgericht aan te pakken.\n\nAfhankelijk van jouw ervaring pak je steeds meer zelfstandig op, of werk je intensief samen met ervaren collega’s die je begeleiden in het vak.\n\nConcreet houd je je onder andere bezig met:',
      items: [
        'het begeleiden van enkelvoudige en meervoudig onderhandse aanbestedingen en, afhankelijk van je ervaring, ook Europese aanbestedingen',
        'het adviseren van opdrachtgevers over inkoopvragen',
        'het opstellen en beoordelen van aanbestedingsdocumenten',
        'het bewaken van wet- en regelgeving rondom inkoop en aanbesteden',
        'het signaleren van kansen om processen slimmer en beter in te richten',
        'het beheren en borgen van contracten na afronding van een traject',
      ],
    },
    offer: {
      items: [
        'Een super enthousiast team van 18 betrokken collega’s',
        'Begeleiding van ervaren collega’s en ruimte om door te groeien',
        '100% pensioenbijdrage, bonusregeling',
        'Uitstekend digitaal gereedschap om je werk slim te doen',
        'Een groeiende organisatie met impact op het Nederlandse onderwijs',
        'Een functie voor 24-32 uur per week',
        'Een team waarin successen samen gevierd worden en fouten mogen, zolang we ervan leren',
        'Ruimte voor jouw kwaliteiten en eigen inbreng binnen je dossier',
        'Een salaris passend bij jouw kennis en ervaring',
      ],
    },
    photos: ['vacature-oig-085.jpg', 'vacature-oig-098.jpg', 'vacature-oig-097.jpg'],
    datePosted: '2026-09-24',
  },
  {
    slug: 'medior-inkoopadviseur-aanbestedingsdesk',
    title: 'Medior Inkoopadviseur Aanbestedingsdesk',
    teaser:
      'Heb jij reeds ervaring als inkoper binnen de publieke sector en ben jij op zoek naar een nieuwe uitdaging binnen een groeiend bedrijf? Dan hebben wij een prachtige positie voor jou.',
    hours: '24-32 uur',
    education: 'HBO',
    intro:
      'Wil jij werk doen dat er echt toe doet? En lijkt het je interessant om mee te bouwen aan slimme, eerlijke en duurzame inkoop binnen het onderwijs? Dan is dit misschien wel jouw volgende stap.\n\nBij de Onderwijs Inkoop Groep zoeken we een Medior Inkoopadviseur die energie krijgt van organiseren, adviseren en het begeleiden van aanbestedingen.',
    about:
      'Onderwijs Inkoop Groep (OIG) is een organisatie die zich richt op het optimaliseren van inkoopprocessen binnen het onderwijs. Onze missie is om kwaliteit en continuïteit te waarborgen in de samenwerking met scholen en leveranciers.',
    seeking: {
      items: [
        'Uitgesproken teamplayers zijn',
        'Een analytische inslag hebben en goed kunnen rekenen',
        'HBO werk- en denkniveau',
        'In een straal van 40 kilometer rond Zeewolde wonen',
      ],
    },
    profile: {
      intro:
        'Jij bent iemand die graag dingen goed regelt, scherp kan denken en makkelijk schakelt tussen verschillende mensen en belangen. Je houdt overzicht, werkt gestructureerd en vindt het leuk om inhoudelijk mee te denken.\n\nDaarnaast breng je het volgende mee:',
      items: [
        'een afgeronde hbo-opleiding, bij voorkeur aangevuld met Nevi, Conducto of aanbestedingsrecht',
        'Minimaal 2 jaar relevante werkervaring als inkoper binnen de publieke sector',
        'Ervaring met Mercell en TenderNed is een pre',
        'kennis van aanbestedingswetgeving',
        'een proactieve en resultaatgerichte instelling',
        'goede mondelinge en schriftelijke vaardigheden',
        'bereidheid om op kantoor in Zeewolde te werken',
        'Affiniteit met onderwijs is mooi meegenomen, maar zeker geen vereiste',
      ],
    },
    tasks: {
      intro:
        'Als Medior Inkoopadviseur ondersteun en adviseer je opdrachtgevers bij aanbestedingstrajecten. Je werkt samen met collega’s uit verschillende teams en helpt onderwijsorganisaties om inkooptrajecten professioneel, zorgvuldig en toekomstgericht aan te pakken.\n\nConcreet houd je je onder andere bezig met:',
      items: [
        'het begeleiden van Europese en meervoudig onderhandse aanbestedingen',
        'het adviseren van opdrachtgevers over inkoopvragen',
        'het opstellen en beoordelen van aanbestedingsdocumenten',
        'het bewaken van wet- en regelgeving rondom inkoop en aanbesteden',
        'het signaleren van kansen om processen slimmer en beter in te richten',
        'het beheren en borgen van contracten na afronding van een traject',
      ],
    },
    offer: {
      intro:
        'Werken bij de Onderwijs Inkoop Groep betekent werken in een organisatie waar je de ruimte krijgt om te leren, initiatief te nemen en echt impact te maken. Je komt terecht in een betrokken team dat samenwerkt, kennis deelt en successen samen viert.\n\nDit kun je van ons verwachten:',
      items: [
        'een enthousiast team van 20 betrokken collega’s',
        'een afwisselende en uitdagende functie binnen een ambitieuze en groeiende organisatie',
        'veel ruimte voor eigen verantwoordelijkheid en ontwikkeling',
        'mogelijkheid om je verder te ontwikkelen binnen het inkoopvak door het volgen van relevante opleidingen',
        'begeleiding van ervaren collega’s en ruimte om door te groeien naar Senior inkoopadviseur',
        '100% pensioenbijdrage en een bonusregeling',
        'uitstekend digitaal gereedschap om je werk slim en efficiënt te doen',
        'een organisatie met zichtbare impact op het Nederlandse onderwijs',
        'een functie voor 24-32 uur per week',
        'een team waarin fouten maken mag, zolang we ervan leren',
        'volop ruimte voor jouw kwaliteiten, ideeën en eigen inbreng',
        'Marktconform salaris afhankelijk van kennis en ervaring',
      ],
    },
    photos: ['vacature-oig-089.jpg', 'vacature-oig-099.jpg', 'vacature-oig-081.jpg'],
    datePosted: '2024-11-08',
  },
  {
    slug: 'specialist-inkoopdossier',
    title: 'Commercieel medewerker binnendienst',
    teaser:
      'Hou je van structuur, contact met leveranciers, scherp onderhandelen en een dossier dat klopt tot op de laatste komma, dan is dit jouw plek.',
    hours: '24-32 uur',
    education: 'MBO+ / HBO',
    intro:
      'Als commercieel medewerker binnendienst ben jij het vaste aanspreekpunt voor één of meerdere inkoopdossiers. Je voert kennis en regie over je dossier: je onderhandelt en contracteert met leveranciers, bewaakt de kwaliteit van de afspraken en signaleert tijdig wanneer contracten aflopen of verbeterd kunnen worden.\n\nJe werkt nauw samen met de accountmanagers: vraagt gegevens op bij leveranciers, je maakt besparingsanalyses, controleert nieuwe contracten op de juiste inhoud en zorgt dat afspraken correct en op tijd worden vastgelegd. Zo zorg je dat inkoop voor onze scholen niet alleen geregeld is, maar ook strategisch klopt.',
    seeking: {
      items: [
        'Uitgesproken teamplayers zijn',
        'Een analytische inslag hebben en goed kunnen rekenen',
        'MBO+ / HBO denk- en werkniveau',
        'In een straal van 40 kilometer rond Zeewolde wonen',
      ],
    },
    profile: {
      items: [
        'Je werkt nauwkeurig en gestructureerd, en toont eigenaarschap over je dossier',
        'Je denkt proactief mee over verbeteringen en signaleert kansen in de markt',
        'Je bouwt en onderhoudt makkelijk relaties met leveranciers en collega’s',
        'Je communiceert open en duidelijk, en durft anderen ook aan te spreken',
        'Je voelt je thuis in een hecht team waarin verantwoordelijkheid voor elkaar net zo belangrijk is als verantwoordelijkheid voor je eigen taak',
        'Je beschikt over MBO+ / HBO werk- en denkniveau',
      ],
    },
    tasks: {
      // De live pagina heeft drie tussenkoppen; het CMS kent één lijst. De koppen staan in de inleiding.
      intro: 'Dossierregie, afspraken & kwaliteit en samenwerking:',
      items: [
        'Verantwoordelijk voor één of meerdere inkoopdossiers',
        'Centraal aanspreekpunt voor leveranciers en scholen binnen je domein',
        'Tarief- en marktontwikkelingen volgen',
        'Onderhandelen en contracteren met leveranciers',
        'Benchmarken en optimaliseren van afspraken',
        'Borgen van kwaliteit en continuïteit binnen het dossier',
        'Behoeften ophalen via accountmanagers en sales',
        'Afstemmen met sales- en accountmanagers over klantvragen',
        'Input leveren aan marketing en sales bij campagnes',
        'Overleg met Office Support over verwerking en opvolging',
        'Deelname aan interne evaluaties en verbetertrajecten',
      ],
    },
    offer: {
      items: [
        'Een super enthousiast team van 18 betrokken collega’s',
        '100% pensioenbijdrage',
        'Uitstekend digitaal gereedschap om je werk slim te doen',
        'Een groeiende organisatie met impact op het Nederlandse onderwijs',
        'Een functie voor 24-32 uur per week',
        'Een team waarin successen samen gevierd worden en fouten mogen, zolang we ervan leren',
        'Ruimte voor jouw kwaliteiten en eigen inbreng binnen je dossier',
        'Een startsalaris tussen de € 3.084,- en € 4.187,- op basis van een fulltime dienstverband',
      ],
    },
    salary: { min: 3084, max: 4187 },
    photos: ['vacature-oig-124.jpg', 'vacature-oig-109.jpg', 'vacature-oig-083.jpg'],
    datePosted: '2025-07-10',
  },
]

const bullets = (b: Bullets) => ({ intro: b.intro ?? null, items: b.items.map((text) => ({ text })) })

export default async function seedVacancies(ctx: SeedContext) {
  let order = 0
  for (const v of VACANCIES) {
    order += 10
    const photos: number[] = []
    for (const file of v.photos) photos.push(await ctx.img(file))
    await ctx.upsert('vacatures', v.slug, {
      title: v.title,
      teaser: v.teaser,
      hours: v.hours,
      education: v.education,
      location: 'Zeewolde',
      intro: v.intro,
      about: v.about ?? null,
      seeking: bullets(v.seeking),
      profile: bullets(v.profile),
      tasks: bullets(v.tasks),
      offer: bullets(v.offer),
      salary: { min: v.salary?.min ?? null, max: v.salary?.max ?? null },
      photos,
      datePosted: `${v.datePosted}T12:00:00.000Z`,
      order,
    })
  }
}
