/**
 * Ervaringen van schoolbesturen, letterlijk van de live site (/referenties/). Citaten zijn alleen ingekort door
 * hele zinnen weg te laten; er is niets herschreven. Naam, functie en organisatie staan zoals op de live site.
 * Welke citaten zijn ingekort staat in docs/bronnen/referenties.md.
 */
export type Referentie = {
  kop: string
  citaat: string
  naam: string
  functie: string
  organisatie: string
  /** Bestand in /public/beeld/referenties/ en de naam die in het logo staat. */
  logo: string
  logoNaam: string
}

const r = (
  kop: string,
  citaat: string,
  naam: string,
  functie: string,
  organisatie: string,
  logo: string,
  logoNaam: string = organisatie,
): Referentie => ({ kop, citaat, naam, functie, organisatie, logo: `/beeld/referenties/${logo}`, logoNaam })

export const UITGELICHT: Referentie = r(
  'Door de samenwerking kunnen we nu het juiste gesprek met de accountant voeren',
  'Zij hebben ons in meerdere dossiers op een zeer professionele en adequate wijze kunnen ondersteunen bij de inkoop. Dit heeft niet alleen geleid tot scherpe prijzen, maar ook zijn goede afspraken gemaakt met leveranciers. Bovendien is door deze samenwerking ons inkoop- en aanbestedingsbeleid aangescherpt, waardoor we op het terrein van aanbestedingen nu het juiste gesprek met de accountant kunnen voeren.',
  'Alfred Vos',
  'Directeur bestuurder',
  'Stichting de Tjongerwerven CPO',
  'tjongerwerven.png',
)

export const REFERENTIES: Referentie[] = [
  r(
    'De accountmanager is onze inkoper geworden en die hadden we hiervoor niet',
    'Wat ons positief verrast is de accuratesse, vriendelijkheid en snelheid van hun handelen. Inkopen, zeker als het Europees moet, blijft een taaie klus, maar OIG loodst ons er doorheen!',
    'Paul Schollaardt',
    'College van Bestuur',
    'Stichting Elan',
    'elan.png',
  ),
  r(
    'Ook na 10 jaar is de OIG blijvend op zoek naar nieuwe kansen',
    'Onze organisatie is er één van het eerste uur, wij zijn inmiddels meer dan 10 jaar aangesloten bij OIG en dat naar volle tevredenheid. OIG is accuraat en integer, zij werken altijd in dienst van onze organisatie, wat ons betreft gaan we nog jaren door.',
    'Albert Sluiter',
    'Directeur bestuurder',
    'Essentius',
    'essentius.png',
  ),
  r(
    'De OIG inspireert en heeft passie voor het vak',
    'Een prettige en goede samenwerking. Een samenwerking waarin aandacht is voor, en geluisterd wordt naar, de wensen van de VCO. De OIG inspireert en heeft passie voor het vak.',
    'Martin van den Bor',
    'Directeur bedrijfsvoering en Organisatie',
    'VCO Harderwijk-Hierden',
    'vco.svg',
  ),
  r(
    'Kennis van de markt en breed aanbod van diensten neemt veel werk uit handen',
    'De OIG is onze partner voor een aantal inkooptrajecten zoals ICT devices via een Dynamisch Aankoop Systeem en het Onderwijs Leermiddelen Pakket via een aanbesteding. Met de kennis van de markt en het brede aanbod aan diensten neemt de OIG ons veel werk uit handen.',
    'Martijn van Dijk',
    'Coördinator contracten',
    'Stichting Prisma Almere',
    'prisma.svg',
  ),
  r(
    'De persoonlijke maar professionele en adequate aanpak zorgen voor het behalen van gezamenlijke doelen',
    'De OIG is voor mij een betrouwbare partner die goed begrijpt wat er speelt in het onderwijs en zich inzet voor de beste oplossingen. De transparantie en persoonlijke benadering maken het verschil.',
    'Irene Verbeet',
    'Directeur-Bestuurder',
    'De Oversteek',
    'oversteek.png',
  ),
  r(
    'Zowel gevraagd als ongevraagde adviezen leiden tot significant voordeel',
    'Ik zie de OIG als een partner in het gehele inkoopbeleid van onze organisatie waarbij ik altijd met mijn vragen en opmerkingen terecht kan. Ook krijg ik gevraagd en ongevraagd advies.',
    'Edward van der Beek',
    'Beleidsmedewerker',
    'Stichting Ommeriek',
    'ommeriek.png',
  ),
  r(
    'Meedenkend, vakkundig en snel',
    'Ze nemen de tijd om mee te denken en zorgen voor goed advies. Wanneer er vragen zijn, dan zijn deze altijd snel beantwoord. De bereikbaarheid is erg goed.',
    'Dirk Jansen',
    'Bovenschools ICT-er',
    'IKC De Wijssel – Essentius',
    'essentius.png',
    'Essentius',
  ),
  r(
    'Transparant, klantgericht en meedenkend',
    'Door de collectieve inkoopkracht van de OIG worden steeds gunstige voorwaarden en lagere prijzen gerealiseerd. De samenwerking is goed en transparant. We worden goed meegenomen in de processen.',
    'Marc Verleun',
    'Beleidsadviseur',
    'Stichting Alterius',
    'alterius.png',
  ),
  r(
    'Dankzij OIG kunnen wij nu verder bouwen.',
    'De onderwijsinkoopgroep heeft ons ondersteund en ontzorgd in een fase waarin AURO nog niet kon leunen op een eigen solide basis. Dankzij OIG kunnen wij nu verder bouwen.',
    'Christian van den Brink',
    'Bestuurder',
    'Stichting Auro',
    'auro.png',
  ),
  r(
    'Meer tijd en middelen voor onze primaire taak',
    'Een samenwerking met de OIG kan ik aanraden, omdat we daardoor meer tijd en financiën overhouden om gestalte te geven aan de primaire taak van onze organisatie en dat is lesgeven!',
    'Henk Hoek',
    'Administratie en secretariaat',
    'Vereniging Scholen met de Bijbel Staphorst',
    'staphorst.webp',
  ),
  r(
    'Contractueel ontzorgt',
    'De korte lijntjes, prettige contacten en mooie deals maken het geheel tot een goede samenwerking. Ik zie de OIG als de ideale contractuele ontzorger.',
    'Jozias de Koeijer',
    'Directeur-bestuurder',
    'Goede Herderschool Ermelo',
    'goede-herderschool.webp',
  ),
  r(
    'Ook voor éénpitters een absolute aanvulling',
    'Als éénpitter werken wij samen met de OIG. Op deze manier worden wij voor een groot deel ontzorgt m.b.t. inkoop- of offertetrajecten en kunnen wij profiteren van scherpere inkoopprijzen.',
    'Guido Vink',
    'Directeur',
    'Zeister Schoolvereeniging',
    'zsv.jpg',
  ),
  r(
    'Door de inzet van de OIG kunnen wij ons focussen op het onderwijs',
    'Door de samenwerking kunnen we als stichting profiteren van scherpe prijzen, terwijl we zelf kunnen blijven focussen op wat het onderwijs vraagt. Een mooie combinatie!',
    'Reinout Wissenburg',
    'Bestuurder',
    'Samenwerkende Vrijescholen Zuid-Holland',
    'svzh.webp',
  ),
  r(
    'Denkt pro-actief met je mee',
    'Inmiddels heeft onze samenwerking al heel wat bespaard en ontzorgt in de afgelopen jaren. Het contact is goed en zeer laagdrempelig, daarnaast denken ze pro-actief met ons mee en zijn altijd goed bereikbaar bij vragen.',
    'Karin Leurink',
    'Stafmedewerker',
    'Vrije Scholen Athena',
    'athena.png',
  ),
  r(
    'OIG: Een organisatie met korte lijnen en duidelijke adviezen die direct toepasbaar zijn',
    'De OIG denkt direct mee met de wens van de klant. Scholengroep Hannah (voorheen: De Oosthoek) heeft hiervan veel profijt gehad. De adviezen zijn helder en vragen en onduidelijkheden worden direct opgepakt.',
    'Ben Rouhof',
    'Controller',
    'Scholengroep Hannah',
    'hannah.png',
  ),
  r(
    'Ontzorgen, effectief, prettig en vlot',
    'Ik zie de OIG als een partij die meedenkt, het voortouw neemt, veel regelt en je zelfs in contact brengt met partijen. Een samenwerking met de OIG leidt tot kostenbesparing en ontzorgt.',
    'Frank van Arkel',
    'Schooldirecteur',
    'CBS de Violier – Procon Vaassen',
    'procon.png',
    'Procon',
  ),
  r(
    'Onze inkoop is in goede handen',
    'Ze schakelen snel, zijn klantgericht en weten onderhandelingen voor ons scherp te voeren. Ze hebben een goed inzicht in de markt. We zijn heel blij dat we in 2019 de samenwerking met hen zijn ingegaan.',
    'Diana Lorier-Kooi',
    'Voorzitter College van Bestuur',
    'De Vier Windstreken',
    'vier-windstreken.png',
  ),
  r(
    'Goed geholpen door OIG',
    'De OIG heeft voor ons vooral in het aanscherpen van de contracten met crediteuren goed geholpen.',
    'Martijn Stormmesand',
    'Controller',
    'Stichting Openbaar Onderwijs aan de Amstel',
    'amstel.png',
  ),
  r(
    'OIG levert maatwerk',
    'Het is dus voor ons efficiënt om met betrouwbare externe partners samenwerkingen aan te gaan. De contacten zijn plezierig, open, accuraat en met korte lijntjes. Het werken met een vaste contactpersoon zien wij als een pré!',
    'Annelies Smits-Verwijst',
    'Voorzitter College van Bestuur',
    'Openbaar Onderwijs Houten',
    'houten.jpg',
  ),
  r(
    'Een adviseur die meedenkt. Al met al zeer tevreden',
    'Door de samenwerking hebben wij al flink kunnen besparen op de lasten. Daarbij zorgt de samenwerking ervoor dat het beheren van de inkoopcontracten minder tijd in beslag neemt.',
    'Chantal Martens',
    'Controller',
    'Stichting Educare',
    'educare.jpg',
  ),
]
