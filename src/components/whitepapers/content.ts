/**
 * Vaste inhoud van de whitepaperpagina's. Bronnen per regel: docs/bronnen/whitepapers.md en
 * docs/bronnen/lp-*.md. Kerncijfers en contactgegevens komen uit het CMS, niet uit dit bestand.
 */

export type LandingContent = {
  /** Slug van de whitepaper in het CMS; het formulier zoekt hiermee de PDF op. */
  slug: 'kopieerapparaat' | 'meubilair' | 'schoonmaak'
  path: '/lp/kopieerapparaat/' | '/lp/meubilair/' | '/lp/schoonmaak/'
  /** Naam in het kruimelpad */
  crumb: string
  /** H1 in drie delen: voor het woordblok, het woordblok, erna */
  title: [string, string, string]
  lead: string
  cover: { url: string; alt: string }
  contents: {
    title: string
    aside: string
    cards: [Card, Card, Card]
  }
  summary: {
    title: string
    paragraphs: string[]
    photo: { url: string; alt: string; focus?: string }
  }
  audience: { title: string; points: string[] }
  /** Hoofdstukken van de whitepaper, in de volgorde van de PDF */
  chapters: string[]
  form: { title: string }
  quote: {
    text: string
    name: string
    role: string
    logo: { url: string; alt: string; width: number; height: number }
  }
}

type Card = { title: string; text: string }

export const LANDINGS: Record<LandingContent['slug'], LandingContent> = {
  kopieerapparaat: {
    slug: 'kopieerapparaat',
    path: '/lp/kopieerapparaat/',
    crumb: 'Kopieerapparatuur',
    title: ['Slim printers en', 'kopieerapparatuur', 'aanschaffen'],
    lead: 'In deze whitepaper deelt de Onderwijs Inkoop Groep zeven inzichten die u helpen om verborgen kosten van printers en kopieerapparatuur te voorkomen. Zo bent u goed voorbereid op uw volgende contract.',
    cover: {
      url: '/beeld/whitepapers/cover-kopieerapparaat.jpg',
      alt: 'Voorkant whitepaper printers en kopieerapparatuur',
    },
    contents: {
      title: 'Zeven inzichten voor betere print- en kopieercontracten',
      aside:
        "Voorkom dat uw organisatie duizenden euro's te veel betaalt. De whitepaper zet de belangrijkste punten op een rij.",
      cards: [
        {
          title: 'Veelvoorkomende valkuilen',
          text: 'Van een vastgelegd contractvolume tot een automatische verlenging: u leest waar de verborgen kosten in printer- en kopieercontracten zitten, zodat u ze herkent voordat u tekent.',
        },
        {
          title: 'Besparing op lange termijn',
          text: 'Een contract loopt in de regel 60 of 72 maanden. De whitepaper laat zien wat indexering, kleurenafdrukken en afkoopsommen in die tijd met uw kosten doen.',
        },
        {
          title: 'Praktische tips voor betere contracten',
          text: 'Bij elk inzicht staat wat u kunt doen, zoals een contract zonder vooraf vastgelegd volume en een pro forma opzegging bij de start van de overeenkomst.',
        },
      ],
    },
    summary: {
      title: 'Slimme keuzes bij een complexe aanschaf',
      paragraphs: [
        'Het aanschaffen van printers en kopieerapparatuur kan complex zijn. De kosten lopen snel op en in de praktijk blijkt het lastig om er goed regie over te voeren. In deze whitepaper deelt de Onderwijs Inkoop Groep de inzichten die zij sinds 2011 heeft opgedaan.',
        'U leest waar de verborgen kosten zitten, waar u op let bij een nieuw contract en hoe u voorkomt dat uw organisatie jarenlang vastzit aan een te duur contract.',
      ],
      photo: {
        url: '/beeld/whitepapers/oig-096.jpg',
        alt: 'Team van de Onderwijs Inkoop Groep luistert naar een presentatie op kantoor',
        focus: '50% 40%',
      },
    },
    audience: {
      title: 'Voor schoolbesturen in het primair onderwijs die een print- of kopieercontract afsluiten of verlengen',
      points: [
        'U staat op het punt een nieuwe overeenkomst af te sluiten',
        'Uw huidige contract loopt af en u wilt op tijd opzeggen',
        'Een leverancier stelt voor uw lopende contract aan te passen of over te nemen',
      ],
    },
    chapters: [
      'Vastgelegd contractvolume',
      'Automatische verlenging door niet tijdig opzeggen',
      'Extra softwareoplossingen',
      'Betalen voor scannen',
      'Indexering over leasetarieven',
      'Kleurenafdrukken',
      'Afkoop over afkoop',
    ],
    form: { title: 'Ontvang de whitepaper over kopieerapparatuur' },
    quote: {
      text: 'Ze nemen de tijd om mee te denken en zorgen voor goed advies. (...) Ze maken goede overwegingen in prijs/kwaliteit en bieden zo mooie oplossingen aan.',
      name: 'Dirk Jansen',
      role: 'Bovenschools ICT-er, IKC De Wijssel (Essentius)',
      logo: { url: '/beeld/whitepapers/logo-essentius.png', alt: 'Logo Essentius', width: 396, height: 130 },
    },
  },

  meubilair: {
    slug: 'meubilair',
    path: '/lp/meubilair/',
    crumb: 'Schoolmeubilair',
    title: ['In zeven stappen', 'schoolmeubilair', 'aanschaffen'],
    lead: 'Deze whitepaper begeleidt u bij de aanschaf van schoolmeubilair. U leest hoe het Dynamisch Aankoopsysteem (DAS) voor meubilair werkt, welke zeven stappen u doorloopt en wat samenwerken met de Onderwijs Inkoop Groep oplevert.',
    cover: {
      url: '/beeld/whitepapers/cover-meubilair.jpg',
      alt: 'Voorkant whitepaper schoolmeubilair aanschaffen',
    },
    contents: {
      title: 'Rechtmatig en efficiënt nieuw meubilair inkopen',
      aside:
        'Als schoolbestuur kunt u niet overal aan denken bij de aanschaf van nieuw meubilair. De whitepaper zet het voor u op een rij.',
      cards: [
        {
          title: 'Het Dynamisch Aankoopsysteem',
          text: 'Hoe het Dynamisch Aankoopsysteem (DAS) voor meubilair werkt: per school een eigen uitvraag, waarop meubilairleveranciers een offerte kunnen uitbrengen.',
        },
        {
          title: 'Zeven stappen voor de aankoop',
          text: 'Van het vaststellen van het budget en het meubilairplan tot de controle van de levering: de zeven stappen die u doorloopt bij de aankoop van nieuw meubilair.',
        },
        {
          title: 'Voordelen van samenwerken met de OIG',
          text: 'Vijf redenen om het Dynamisch Aankoopsysteem via de Onderwijs Inkoop Groep te doen, waaronder een rechtmatige inkoop volgens de regels van Europees aanbesteden.',
        },
      ],
    },
    summary: {
      title: 'Een Dynamisch Aankoopsysteem voor meubilair',
      paragraphs: [
        'Bij de Onderwijs Inkoop Groep begrijpen we dat u als schoolbestuur niet overal aan kunt denken als het gaat om nieuw meubilair. Daarom hebben wij een Dynamisch Aankoopsysteem (DAS) ontwikkeld voor een rechtmatige en efficiënte inkoop van meubilair.',
        'Kwaliteit staat voorop: vooraf stellen we samen met u een grondig meubilairplan op. En we volgen de branche op de voet, zodat de meest recente ontwikkelingen meegaan in de inventarisatiefase.',
      ],
      photo: {
        url: '/beeld/whitepapers/meubilair-opgeleverd.jpg',
        alt: 'Ingerichte leerruimte met groene werkplekken, witte stoelen en een overlegnis',
        focus: '50% 62%',
      },
    },
    audience: {
      title: 'Voor schoolbesturen in het primair onderwijs die nieuw schoolmeubilair willen aanschaffen',
      points: [
        'U vraagt zich af of u de aanschaf Europees moet aanbesteden',
        'U wilt weten wat er bij een aanbesteding komt kijken en waar u begint',
        'U wilt per school een eigen uitvraag kunnen doen',
      ],
    },
    chapters: [
      'De Onderwijs Inkoop Groep',
      'In zeven stappen naar nieuw meubilair',
      'Vijf redenen voor een Dynamisch Aankoopsysteem via de OIG',
      'De valkuilen bij inkoop van meubilair',
      'Veelgestelde vragen',
    ],
    form: { title: 'Ontvang de whitepaper over schoolmeubilair' },
    quote: {
      text: 'De OIG is onze partner voor een aantal inkooptrajecten zoals ICT devices via een Dynamisch Aankoop Systeem (...). Met de kennis van de markt en het brede aanbod aan diensten neemt de OIG ons veel werk uit handen.',
      name: 'Martijn van Dijk',
      role: 'Coördinator contracten, Stichting Prisma Almere',
      logo: {
        url: '/beeld/whitepapers/logo-prisma-almere.svg',
        alt: 'Logo Stichting Prisma Almere',
        width: 192,
        height: 95,
      },
    },
  },

  schoonmaak: {
    slug: 'schoonmaak',
    path: '/lp/schoonmaak/',
    crumb: 'Schoonmaak',
    title: ['Schoonmaak', 'aanbesteden', 'voor uw scholen'],
    lead: 'Een schone school is het beste visitekaartje. In deze whitepaper leest u hoe het eigen Dynamisch Aankoopsysteem (DAS) van de Onderwijs Inkoop Groep voor schoonmaak werkt.',
    cover: {
      url: '/beeld/whitepapers/cover-schoonmaak.jpg',
      alt: 'Voorkant whitepaper schoonmaak aanbesteden',
    },
    contents: {
      title: 'Inzicht, kwaliteit en gelijke kansen',
      aside:
        'De Onderwijs Inkoop Groep geeft u eenvoudig inzicht in de kosten van schoonmaak en toegang tot kwalitatief uitstekende bedrijven.',
      cards: [
        {
          title: 'Inzicht in kosten',
          text: 'Wat een uitvraag via een Dynamisch Aankoopsysteem kost en wie wat betaalt. De totale kosten zijn vooraf duidelijk, zonder verborgen kosten achteraf.',
        },
        {
          title: 'Kwaliteit',
          text: 'Elke school maakt haar eigen eisen en wensen kenbaar. De optionele schoonmaakmonitor controleert facturen en meet twee keer per jaar de kwaliteit.',
        },
        {
          title: 'Kans voor lokale en landelijke schoonmakers',
          text: 'Zowel lokale als landelijke schoonmakers kunnen opdrachten aannemen. Zo krijgen lokale leveranciers een eerlijke kans.',
        },
      ],
    },
    summary: {
      title: 'Een soort marktplaats voor schoonmaakklussen',
      paragraphs: [
        'Een Dynamisch Aankoopsysteem werkt als een marktplaats voor aanbestedingen. Elke school geeft haar eigen schoonmaakbehoeften aan. De Onderwijs Inkoop Groep verzamelt en verwerkt alle specificaties en publiceert de uitvraag na goedkeuring.',
        'Zowel lokale als landelijke schoonmakers en leveranciers kunnen via het systeem opdrachten aannemen. Zo hebben alle schoonmaakbedrijven gelijke kansen bij uw aanvraag.',
      ],
      photo: {
        url: '/beeld/whitepapers/oig-081.jpg',
        alt: 'Team van de Onderwijs Inkoop Groep in een presentatie',
        focus: '60% 50%',
      },
    },
    audience: {
      title: 'Voor schoolbesturen in het primair onderwijs die hun schoonmaak (opnieuw) willen aanbesteden',
      points: [
        'U wilt zaken doen met lokale schoonmaakbedrijven, maar moet Europees aanbesteden',
        'U wilt dat elke school inspraak heeft in de keuze van het schoonmaakbedrijf',
        'U wilt vooraf weten wat een traject kost en hoe lang het duurt',
      ],
    },
    chapters: [
      'Wat is het Dynamisch Aankoopsysteem (DAS)?',
      'Het concept in negen stappen',
      'Voordelen van dynamisch aanbesteden',
      'De OIG-schoonmaakmonitor',
      'VSR-schoonmaakcontrole',
      'Wat zijn de kosten?',
      'Looptijd van een aanbestedingstraject',
      'Wat wordt er van u verwacht?',
      'Overname personeel',
      'Veelgestelde vragen',
    ],
    form: { title: 'Ontvang de whitepaper over schoonmaak' },
    quote: {
      text: 'Door de collectieve inkoopkracht van de OIG worden steeds gunstige voorwaarden en lagere prijzen gerealiseerd. De samenwerking is goed en transparant.',
      name: 'Marc Verleun',
      role: 'Beleidsadviseur, Stichting Alterius',
      logo: { url: '/beeld/whitepapers/logo-alterius.png', alt: 'Logo Stichting Alterius', width: 205, height: 85 },
    },
  },
}

export type OverviewCard = {
  path: string
  label: string
  title: string
  text: string
  linkLabel: string
  cover: { url: string; alt: string }
}

/** Volgorde en teksten uit het ontwerp; ook de terugval als het CMS (nog) leeg is. */
export const OVERVIEW: OverviewCard[] = [
  {
    path: '/lp/schoonmaak/',
    label: 'Schoonmaak',
    title: 'Schoonmaakdiensten aanbesteden',
    text: 'Inzicht in de kosten, toegang tot kwalitatief uitstekende bedrijven en het eigen Dynamisch Aankoopsysteem (DAS) voor schoonmaak.',
    linkLabel: 'Naar de whitepaper schoonmaak',
    cover: { url: '/beeld/whitepapers/cover-schoonmaak.jpg', alt: 'Voorkant whitepaper schoonmaak aanbesteden' },
  },
  {
    path: '/lp/meubilair/',
    label: 'Schoolmeubilair',
    title: 'In zeven stappen schoolmeubilair aanschaffen',
    text: 'Een Dynamisch Aankoopsysteem voor rechtmatige en efficiënte inkoop van meubilair. Alle toonaangevende leveranciers zijn aangesloten.',
    linkLabel: 'Naar de whitepaper meubilair',
    cover: { url: '/beeld/whitepapers/cover-meubilair.jpg', alt: 'Voorkant whitepaper schoolmeubilair aanschaffen' },
  },
  {
    path: '/fietsplan-onderwijs/',
    label: 'Leasefiets',
    title: 'Leasefiets: duurzaam vervoer voor uw medewerkers',
    text: 'Met de leasefietsregeling leaset u eenvoudig en voordelig fietsen voor uw medewerkers. U bepaalt zelf de looptijd.',
    linkLabel: 'Naar de whitepaper leasefiets',
    cover: { url: '/beeld/whitepapers/cover-leasefiets.jpg', alt: 'Voorkant whitepaper leasefiets' },
  },
  {
    path: '/lp/kopieerapparaat/',
    label: 'Kopieerapparatuur',
    title: 'Slim printers en kopieerapparatuur aanschaffen',
    text: 'Zeven inzichten om verborgen kosten van printers en kopieerapparatuur te voorkomen, met praktische tips voor betere contracten.',
    linkLabel: 'Naar de whitepaper kopieerapparatuur',
    cover: {
      url: '/beeld/whitepapers/cover-kopieerapparaat.jpg',
      alt: 'Voorkant whitepaper printers en kopieerapparatuur',
    },
  },
]
