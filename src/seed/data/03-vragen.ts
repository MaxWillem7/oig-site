import type { SeedContext } from '../context'

/**
 * Vragen en antwoorden per pagina. Bron: de veelgestelde vragen van de live site (inventaris),
 * met de keuzes uit het Paper-ontwerp: alleen vragen over de dienst zelf, in u-vorm, ingekort.
 * Per vraag de bron in docs/bronnen/cms-inhoud.md. Werkwijze en vacatures hebben op de live
 * site en in het ontwerp geen vragen en blijven dus leeg.
 */
type Page =
  | 'aanbesteden'
  | 'subsidiedesk'
  | 'ondersteuning-inkoop'
  | 'inkoopsegmenten'
  | 'premiedesk'
  | 'verzekeringen'
  | 'inkoopbeleid'
  | 'fietsplan-onderwijs'

const FAQS: Record<Page, [question: string, answer: string][]> = {
  aanbesteden: [
    [
      'Wat is aanbesteden?',
      'Aanbesteden is het proces waarbij een opdrachtgever een opdracht openbaar maakt en diverse partijen uitnodigt om een offerte in te dienen. Het doel is eerlijke concurrentie te bevorderen en de geschiktste partij voor de opdracht te selecteren.',
    ],
    [
      'Valt een school onder de Aanbestedingswet?',
      'Ja. De Aanbestedingswet is bedoeld om eerlijke concurrentie te waarborgen bij opdrachten boven een bepaald drempelbedrag. Scholen vallen onder deze wet en zijn daarom verplicht om opdrachten boven die drempel op een transparante en rechtmatige manier aan te besteden.',
    ],
    [
      'Wanneer moet een school Europees aanbesteden?',
      'Dat hangt af van de omvang en het soort opdracht. De OIG helpt u dit correct te beoordelen. Is Europees aanbesteden niet strikt noodzakelijk, dan adviseren en begeleiden wij u bij een meervoudig onderhands traject.',
    ],
    [
      'Waarom is aanbesteden belangrijk?',
      'Aanbesteden bevordert transparantie en biedt gelijke kansen voor alle potentiële opdrachtnemers. Het draagt ook bij aan een hogere kwaliteit en efficiëntie van de opdrachten.',
    ],
    [
      'Welke regels gelden er bij aanbesteden?',
      'Bij aanbesteden gelden diverse regels, waaronder de Europese aanbestedingsrichtlijnen en nationale wetgeving. Deze regels waarborgen eerlijke concurrentie en transparantie.',
    ],
    [
      'Kan ik hulp krijgen bij een aanbesteding van leermiddelen?',
      'Ja. De OIG begeleidt schoolbesturen bij aanbestedingen, ook voor leermiddelen, zoals het Onderwijs Leermiddelen Pakket. Neem contact met ons op voor meer informatie.',
    ],
  ],

  subsidiedesk: [
    [
      'Wat doet een subsidiedesk voor schoolbesturen?',
      'Een subsidiedesk biedt gespecialiseerde ondersteuning bij het vinden, aanvragen en verantwoorden van subsidies. Dit omvat advies over geschikte subsidies, het begeleiden van de aanvraag en het bewaken van deadlines en rapportages.',
    ],
    [
      'Welke subsidies zijn er voor scholen?',
      'Scholen kunnen aanspraak maken op diverse subsidies, zoals voor digitalisering, duurzaamheid, schoolinrichting en personeel. Het aanbod varieert per regio en type instelling. Er zijn regionale, nationale en Europese subsidies.',
    ],
    [
      'Hoe werkt het aanvragen via de Subsidiedesk?',
      'Wij nemen het aanvraagproces uit handen. Wij zoeken eerst geschikte subsidies, verzamelen de benodigde documenten, dienen de aanvraag in en volgen deze op. Dat bespaart tijd en verhoogt de kans op succes.',
    ],
    [
      'Wat betekent no cure, no pay?',
      'U betaalt alleen als de subsidie wordt toegekend. Zo is de aanvraag voor uw organisatie zonder risico en zonder voorafgaande kosten.',
    ],
    [
      'Wat heeft u nodig voor een subsidieaanvraag?',
      'Voor de meeste subsidies zijn een projectplan, een begroting en bewijs van de benodigde activiteiten vereist. Wij helpen bij het verzamelen en opstellen van deze documenten.',
    ],
    [
      'Hoe bespaart de Subsidiedesk tijd?',
      'Wij nemen het volledige subsidieproces over, zodat uw scholen zich kunnen richten op hun kerntaken. Dat bespaart administratieve tijd en verkleint de kans op fouten in aanvragen.',
    ],
    [
      'Waarom een subsidiedesk inschakelen?',
      'Een subsidiedesk heeft gespecialiseerde kennis van wet- en regelgeving rondom subsidies en weet welke subsidies relevant zijn. Dat verhoogt de kans op een succesvolle aanvraag en zorgt ervoor dat scholen optimaal profiteren van beschikbare middelen.',
    ],
  ],

  'ondersteuning-inkoop': [
    [
      'Wat is een dynamisch aankoopsysteem?',
      'Een dynamisch aankoopsysteem (DAS) werkt als een marktplaats voor aanbestedingen. De OIG heeft een eigen DAS voor schoonmaakdiensten en voor meubilair. Bij schoonmaak geeft elke school haar eigen behoeften aan; de OIG verzamelt en verwerkt de specificaties en publiceert de uitvraag na goedkeuring. Via het DAS voor meubilair koopt u rechtmatig en efficiënt in en voldoet u aan de regels van Europees aanbesteden.',
    ],
    [
      'Ik heb al een offerte voor hardware. Kan de OIG helpen?',
      'Ja. Stuur de offerte naar ons door, dan onderhandelen wij deze verder voor u uit. Heeft u nog geen offerte, dan helpen wij u graag de beste offerte te krijgen voor de producten die u nodig heeft.',
    ],
    [
      'Hoe houd ik zicht op mijn contracten?',
      'Alle overeenkomsten worden veilig geborgd in Mijn OIG, met heldere rapportages en tijdige updates voor het bestuur. Zo houdt u overzicht en grip op uw contracten.',
    ],
    [
      'Op welke inkoopsegmenten ondersteunt de OIG?',
      'Onder meer op kopieerapparatuur, schoonmaak, leermiddelen, afval, sanitair, energie, brandbeveiliging, beveiliging, arbodienstverlening en ICT. Wij breiden onze dienstverlening voortdurend uit, geheel naar uw behoefte.',
    ],
  ],

  inkoopsegmenten: [
    [
      'Moet ik schoolmeubilair Europees aanbesteden?',
      'Dat hangt af van de omvang en het soort opdracht. De OIG helpt u om dit correct te beoordelen. Koopt u in via ons dynamisch aankoopsysteem voor meubilair, dan voldoet u aan de regels van Europees aanbesteden.',
    ],
    [
      'Hoe begint een meubilairtraject bij de OIG?',
      'Wij stellen vooraf samen met u een grondig meubilairplan op. Wij volgen de branche op de voet en nemen de meest recente ontwikkelingen mee in de inventarisatiefase. In onze whitepaper leest u de zeven stappen naar nieuw meubilair.',
    ],
  ],

  premiedesk: [
    [
      'Wat is de Whk-premie?',
      'Als onderwijsorganisatie betaalt u jaarlijks een premie voor de Werkhervattingskas (Whk). Die bestaat uit de WGA-premie en de ZW-premie. De WGA-premie is het grootste en vaak meest complexe deel: het gaat om de kosten van (ex-)werknemers die na twee jaar ziekte recht hebben op een WGA-uitkering.',
    ],
    [
      'Hoe werkt de WGA-scan?',
      'Wij analyseren uw huidige Whk-beschikking en de kennisgevingen van het UWV. Onze geaccrediteerde professionals beoordelen de onderliggende dossiers op fouten die uw premielast onnodig verhogen. Binnen 24 uur na ontvangst van uw documenten ontvangt u een advies op maat over mogelijke besparingen.',
    ],
    [
      'Wat is WIA, WGA en IVA?',
      'De WIA (Wet werk en inkomen naar arbeidsvermogen) is de opvolger van de WAO en geldt na 104 weken ziekte. Het is een verzamelnaam voor WGA en IVA. De WGA (Werkhervatting Gedeeltelijk Arbeidsgeschikten) is voor werknemers die 35% tot 80% arbeidsongeschikt zijn, of tijdelijk meer dan 80%. Die uitkering wordt betaald uit de Werkhervattingskas. De IVA (Inkomensvoorziening Volledig Arbeidsongeschikten) is voor werknemers die 20% of minder van hun oude loon kunnen verdienen en weinig kans op herstel hebben.',
    ],
    [
      'Hoe ontstaat de hoge opslag op de ZW-premie?',
      'Vallen (ex-)medewerkers binnen vier weken ziek uit, vaak nadat hun tijdelijke contract is afgelopen, dan neemt het UWV de uitkering over. Twee jaar later ziet uw schoolbestuur dat terug in een fors hogere ZW-premie. Die premie is niet alleen een terugbetaling van de uitkering, maar kan daarbovenop oplopen tot een opslag van 40% tot 75%.',
    ],
    [
      'Hoe werkt de collectieve aanpak van de OIG?',
      'Via de Onderwijs Inkoop Groep krijgt u grip op dit proces en bespaart u structureel op uw ZW-premie. U voorkomt onnodige opslagen, krijgt beter inzicht in de kosten en risico’s en profiteert van schaalvoordelen en deskundige begeleiding. Zo houdt u financiële ruimte over voor goed onderwijs.',
    ],
  ],

  verzekeringen: [
    [
      'Ik ben al verzekerd bij een van de zes verzekeraars. Hoe krijg ik de korting?',
      'Log bij voorkeur in bij uw verzekeraar en voeg het collectiviteitsnummer toe aan uw polis. Bij VGZ en Menzis is dit de enige manier. Bij CZ, ONVZ en Nationale Nederlanden kunt u ook het wijzigingsformulier invullen en mailen naar zorg.debilt@fidus.nl. Fidus zorgt ervoor dat de korting op uw polis wordt doorgevoerd. Verzekerd bij De Christelijke Zorgverzekeraar? Mail dan uw relatienummer naar info@jabesverzekeringen.nl en vermeld dat u wilt meeliften op het collectief van de Onderwijs Inkoop Groep.',
    ],
    [
      'Waarom zou ik meedoen?',
      'U ontvangt korting op uw premie, ook als u al bij een van deze verzekeraars verzekerd bent. De dekking is op veel plekken beter dan wanneer u zelf individueel afsluit. U heeft er geen werk van: Fidus regelt alles. Deelname is vrijblijvend en u bent de OIG geen vergoeding verschuldigd. Nog vragen? Bel Fidus op 085 860 00 00.',
    ],
  ],

  inkoopbeleid: [
    [
      'Wat is inkoopbeleid voor scholen precies?',
      'Inkoopbeleid is een richtlijn die bepaalt hoe een school of bestuur omgaat met het inkopen van producten en diensten. Het zorgt voor structuur, rechtmatigheid en overzicht, zodat u weloverwogen keuzes kunt maken en voldoet aan wet- en regelgeving.',
    ],
    [
      'Waarom moet een school voldoen aan de Aanbestedingswet?',
      'De Aanbestedingswet is bedoeld om eerlijke concurrentie te waarborgen bij opdrachten boven een bepaald drempelbedrag. Scholen vallen onder deze wet en zijn daarom verplicht om opdrachten boven die drempel op een transparante en rechtmatige manier aan te besteden.',
    ],
    [
      'Begeleidt de OIG ook onderhandse aanbestedingen?',
      'Ja. De OIG begeleidt zowel Europese als onderhandse aanbestedingen. Is Europees aanbesteden niet strikt noodzakelijk, dan adviseren en begeleiden wij u bij een meervoudig onderhands traject.',
    ],
    [
      'Wanneer moet ik Europees aanbesteden?',
      'Dat hangt af van de omvang en het soort opdracht. De OIG helpt u om dit correct te beoordelen en zorgt voor een rechtmatige uitvoering van het aanbestedingstraject.',
    ],
    [
      'Wat is het verschil tussen centrale en decentrale inkoop?',
      'Bij centrale inkoop worden producten of diensten voor meerdere scholen of locaties tegelijk ingekocht, vaak via een bestuur of bovenschoolse organisatie. Bij decentrale inkoop beslist elke school of locatie zelfstandig. De OIG adviseert welke vorm het best past bij uw organisatie en hoe u optimaal profiteert van schaalvoordeel.',
    ],
    [
      'Hoe weet ik of mijn school rechtmatig inkoopt?',
      'De OIG maakt dit inzichtelijk met een inkoopscan. Wij toetsen uw inkoopprocessen en bestaande contracten aan de geldende wet- en regelgeving en brengen eventuele risico’s of verbeterpunten in kaart.',
    ],
  ],

  'fietsplan-onderwijs': [
    [
      'Wat is een leasefiets?',
      'Voor veel mensen is de hoge aanschafprijs van een fiets een obstakel. Met een leasefiets valt dat weg, omdat de fiets geleaset wordt in plaats van gekocht. Er wordt maandelijks een leasebedrag betaald en de fiets is te gebruiken voor de dagelijkse ritten.',
    ],
    [
      'Hoe werkt het leasefietsprogramma?',
      'Als werkgever mag u een medewerker een fiets ter beschikking stellen. Dat kan elk type fiets zijn, van e-bike tot bakfiets. De medewerker betaalt gedurende 36 maanden een eigen bijdrage van het brutoloon. Als werkgever kunt u overwegen een deel bij te dragen.',
    ],
    [
      'Wat zijn de voordelen van een leasefiets?',
      'Een leasefiets biedt diverse voordelen, zoals kostenbesparing, gezondheidsvoordelen en milieuvriendelijkheid. Daarnaast kunt u profiteren van fiscale voordelen.',
    ],
    [
      'Wat gebeurt er als een medewerker van baan verandert?',
      'Daarover kunt u zelf afspraken maken, bijvoorbeeld over het betalen van eventuele resterende bedragen door de medewerker.',
    ],
  ],
}

export default async function seedFaqs(ctx: SeedContext) {
  const seen = new Set<string>()
  for (const [page, items] of Object.entries(FAQS)) {
    let order = 0
    for (const [question, answer] of items) {
      if (seen.has(question)) throw new Error(`Vraag staat dubbel in de seed: ${question}`)
      seen.add(question)
      order += 10
      await ctx.upsert('vragen', question, { answer, page, order }, 'question')
    }
  }
}
