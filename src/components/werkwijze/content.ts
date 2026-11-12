/** Vaste inhoud van /werkwijze/. Bronnen per regel: docs/bronnen/werkwijze.md. */

export type Step = {
  title: string
  text: string
  photo: { url: string; alt: string; focus?: string }
  /** Alleen stap 7: link naar het klantportaal */
  portal?: boolean
}

const foto = (nr: string) => `/beeld/werkwijze/oig-${nr}.jpg`

export const STEPS: Step[] = [
  {
    title: 'Kennismaking met alle betrokkenen',
    text: 'Relatie en vertrouwen zijn de basis van onze samenwerking. Voordat we aan de slag gaan, maken we persoonlijk kennis met alle betrokkenen binnen uw organisatie. Die stap is volgens ons essentieel voor een succesvolle samenwerking.',
    photo: { url: foto('110'), alt: 'Adviseur van de Onderwijs Inkoop Groep belt lachend in een overlegruimte', focus: '70% 40%' },
  },
  {
    title: 'Scan van de inkoop',
    text: 'Na de kennismaking gaan we concreet aan de slag. Met een inkoopscan brengen we de inkoop van uw organisatie per inkoopsegment in kaart. Na de scan weet u precies hoe u ervoor staat.',
    photo: { url: foto('121'), alt: 'Twee adviseurs bekijken gegevens op een groot scherm in de vergaderruimte', focus: '40% 50%' },
  },
  {
    title: 'Analyse en benchmark',
    text: 'Na de scan voeren we een analyse uit en zetten we de uitkomsten in een benchmark. Zo ziet u hoe uw voorwaarden zich verhouden tot wat gangbaar is in de markt.',
    photo: { url: foto('060'), alt: 'Adviseur werkt achter een laptop in een vergaderruimte met glazen wand', focus: '50% 55%' },
  },
  {
    title: 'Onderhandelingen',
    text: 'Als alle gegevens bekend zijn, gaan we voor u in gesprek met de leveranciers. We bespreken de uitkomst van de benchmark en onderzoeken welke ruimte er is.',
    photo: { url: foto('120'), alt: 'Twee adviseurs in gesprek aan de vergadertafel met een laptop', focus: '50% 45%' },
  },
  {
    title: 'Rapportage',
    text: 'U ontvangt een korte en bondige rapportage van de analyse en benchmark, met een voorstel voor de implementatie van de mogelijke besparingen.',
    photo: { url: foto('090'), alt: 'Presentatie voor het team van de Onderwijs Inkoop Groep', focus: '50% 50%' },
  },
  {
    title: 'Implementatie',
    text: 'Na goedkeuring door de bestuurder worden de besparingen geïmplementeerd. Wij verzorgen de volledige implementatie, zodat u volledig ontzorgd wordt. Per inkoopsegment leggen we de inkoopafspraken, inclusief bonussen en looptijden, waar mogelijk opnieuw vast. Pas met uw handtekening onder de nieuwe overeenkomsten liggen deze definitief vast.',
    photo: { url: foto('079'), alt: "Collega's maken aantekeningen tijdens een bijeenkomst op kantoor", focus: '50% 45%' },
  },
  {
    title: 'Borging',
    text: 'De nieuwe inkoopafspraken worden vastgelegd. Wij leveren de nieuwe contracten of addenda aan en houden zicht op de ondertekening. De overeenkomsten worden opgeslagen in ons systeem, waar u met uw eigen inloggegevens altijd de actuele contracten inziet. De jaarlijkse indexatie en de einddata houden wij voor u in de gaten, zodat we op tijd kunnen inspelen op ontwikkelingen.',
    photo: { url: foto('116'), alt: "Drie collega's overleggen bij een bureau met beeldschermen", focus: '60% 45%' },
    portal: true,
  },
]

export const HERO_PHOTOS = [
  { url: foto('077'), alt: 'Medewerker van de Onderwijs Inkoop Groep loopt door een glazen deur het kantoor in', focus: '50% 35%' },
  { url: foto('082'), alt: "Collega's van de Onderwijs Inkoop Groep luisteren naar een presentatie", focus: '60% 40%' },
  { url: foto('107'), alt: "Drie collega's in overleg, een van hen schrijft op een whiteboard", focus: '60% 40%' },
]

/** Citaten zijn ingekort, niet herschreven. "(...)" markeert een weggelaten deel tussen twee zinnen. */
export const MAIN_QUOTE = {
  text: 'Inkopen, zeker als het Europees moet, blijft een taaie klus, maar OIG loodst ons er doorheen! De accountmanager is onze inkoper geworden en die hadden we hiervoor niet, dat is zeer waardevol.',
  name: 'Paul Schollaardt',
  role: 'College van Bestuur, Stichting Elan',
  logo: { url: '/beeld/werkwijze/logo-elan.png', alt: 'Logo Stichting Elan', width: 204, height: 83 },
}

export const SHORT_QUOTES = [
  {
    text: 'Medewerkers van OIG zijn kundig en zoeken steeds opnieuw naar organisatievoordelen, ondersteunen bij (Europese) aanbestedingen en kennen de wensen en uitdagingen voor onze organisatie soms beter dan wijzelf.',
    by: 'Albert Sluiter, directeur bestuurder, Essentius',
  },
  {
    text: 'Ook krijg ik gevraagd en ongevraagd advies. (...) Tevens zie je bij ieder voorstel duidelijk welk voordeel je als organisatie hebt bij welke keuze je ook maakt.',
    by: 'Edward van der Beek, beleidsmedewerker, Stichting Ommeriek',
  },
]
