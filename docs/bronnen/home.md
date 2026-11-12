# Brontabel: Home (`/`)

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers). Ontwerp = Paper "01 Home", artboard "Home · desktop"
(`docs/paper/home-desktop.jsx`). Kerncijfers, premiejaar en telefoonnummer komen uit `getSettings()`, niet uit de code.

| Sectie | Tekst (begin) | Bron | Vorm |
|---|---|---|---|
| Metadata | Title en description | `src/lib/pages.ts` (`pageMetadata('/')`), gelijk aan dev-notities en paginaverslag | ongewijzigd |
| Hero, label | "Inkoopcollectief" | Ontwerp ("Inkoopcollectief voor het primair onderwijs"), ingekort tot handschriftlabel | ingekort |
| Hero, H1 | "Meer budget voor het onderwijs" | Inventaris r. 252 en 308 | letterlijk |
| Hero, intro | "De Onderwijs Inkoop Groep neemt schoolbesturen het inkoopwerk uit handen..." | Inventaris r. 309 (inkoopscan, begeleiding, (Europese) aanbestedingen), r. 248 (title: contractbeheer), r. 347 (meer budget voor leerkrachten, boeken) | herschreven |
| Hero, knoppen | "Plan een kennismaking", "Bekijk onze diensten" | BOUWEN.md regel 6, ontwerp | n.v.t. |
| Hero, cijfers | schoolbesturen, scholen, ervaring | `figures.boards`, `figures.schools`, `figures.years`; labels inventaris r. 348-355 | cijfers uit CMS |
| Hero, tegels | "Aanbesteden / Rechtmatig en zonder zorgen" enz. | Ondertitels gelijk aan `src/components/navigation.ts` (DIENSTEN); "Slim inkopen" uit ontwerp en paginaverslag | ingekort |
| Diensten, kop | "Alles wat uw bestuur inkoopt, onder één dak" / "Van inkoopscan tot contractbeheer. U kiest zelf welke diensten u inzet." | Ontwerp; "geheel naar uw behoefte" inventaris r. 1427 | herschreven |
| Diensten, Aanbesteden | "Wij begeleiden uw Europese of meervoudig onderhandse aanbesteding..." | Inventaris r. 1256, 1264, 1275 (inschrijvingen beoordelen, uit handen nemen), r. 329 (voldoet aan regelgeving) | herschreven |
| Diensten, Ondersteuning bij inkoop | "Een inkoopscan laat zien hoe u ervoor staat..." | Inventaris r. 337 (van analyse tot implementatie, kosten besparen), r. 1412, werkwijze stap 2 ("weet u precies hoe u ervoor staat") | herschreven |
| Diensten, Premiedesk | "Structureel besparen op de WGA- en ZW-premie..." | Inventaris r. 1655, r. 321 ("Wij scannen vrijblijvend op kansen.") | ingekort |
| Diensten, Subsidiedesk | "Wij ondersteunen u bij het vinden, aanvragen en verantwoorden..." | Inventaris r. 333 | ingekort ("nationaal" werd "landelijk") |
| Diensten, Inkoopbeleid | "Bespaar kosten, voldoe aan wet- en regelgeving..." | Inventaris r. 2231 | vrijwel letterlijk |
| Diensten, Verzekeringen | "Laat uw personeel meeliften op de collectieve zorgverzekering..." | Inventaris r. 1742-1743 | ingekort |
| Het collectief, kop | "Krachtig inkopen, meer budget voor het onderwijs" | Inventaris r. 346 ("Krachtig inkopen = meer budget voor het onderwijs") | vrijwel letterlijk |
| Het collectief, tekst | "Al 16 jaar helpt de Onderwijs Inkoop Groep scholen..." | Inventaris r. 347; "meer dan 15 jaar" vervangen door `figures.years`, "basisonderwijs" door "primair onderwijs" | ingekort |
| Het collectief, cijfers | vier cijfers met label | `figures.*`; labels inventaris r. 348-355 | cijfers uit CMS |
| Werkwijze, kop | "Beter inkopen in zeven stappen" | Inventaris, sectie Werkwijze ("Beter inkopen in 7 stappen") | letterlijk |
| Werkwijze, stappen | 01 Kennismaking t/m 07 Borging, elk één regel | Inventaris, sectie Werkwijze (r. 1834 e.v.), stappen 1 t/m 7 | ingekort |
| Ervaringen, kop | "{scholen} scholen gingen u voor" | Inventaris r. 430 ("2700+ scholen gingen u voor"), cijfer uit `figures.schools` | letterlijk |
| Ervaringen, citaat 1 | "De OIG is onze partner voor een aantal inkooptrajecten..." Martijn van Dijk, Stichting Prisma Almere | Inventaris, citaat Prisma Almere (zin 2 en 3; "19 basisscholen" uit zin 1) | ingekort (hele zinnen weggelaten) |
| Ervaringen, citaat 2 | "Door de collectieve inkoopkracht van de OIG..." Marc Verleun, Stichting Alterius | Inventaris, citaat Alterius (zin 3 en 6, weglating gemarkeerd met (...)) | ingekort |
| Ervaringen, citaat 3 | "Een samenwerking met de OIG kan ik aanraden, omdat we daardoor..." Henk Hoek | Inventaris, citaat Scholen met de Bijbel Staphorst (zin 2, volledig) | ingekort |
| Ervaringen, logo | `public/beeld/home/logo-stichting-prisma-almere.svg` | Live: `/wp-content/uploads/prisma-almere_logo.svg` | alt "Logo Stichting Prisma Almere" (dev-notities) |
| Direct voordeel, kop | "Voordeel voor uw scholen en medewerkers" | Ontwerp en paginaverslag (vervangt de actieslider) | herschreven |
| Direct voordeel, zorgverzekering | "Tot 16% korting op de aanvullende verzekering. In veel gevallen is overstappen niet nodig." | `figures.insuranceDiscount`; inventaris r. 1743 en r. 1750-1751; jaartal in de link uit `insurance.year` | ingekort |
| Direct voordeel, fietsplan | "Een fiets van de zaak voor uw medewerkers: een duurzaam en gezond alternatief voor woon-werkverkeer." | Inventaris r. 2317 en 2319 | ingekort |
| Direct voordeel, Onderwijspapier | "Bestel voordelig en eenvoudig papier voor uw scholen op onderwijspapier.nl." | Inventaris r. 315 (je-vorm naar u-vorm) | vrijwel letterlijk |
| Team | "Wie wij zijn", label "Team", functies | Inventaris r. 358-359 en de functies in de teamlijst (r. 361 e.v.); portretten uit het CMS (`getTeam()`, `onHome`) | ingekort |
| Werken bij | Label "Solliciteer", "Werken bij de OIG", "Bekijk onze openstaande vacatures." | Inventaris r. 423-426; zin verschijnt alleen als `getVacancies()` iets teruggeeft; geen aantal | ingekort |
| Afsluiter | `<CtaBand />` | Gedeeld onderdeel | n.v.t. |

## Weggelaten of aangepast ten opzichte van het ontwerp (niet te verifiëren)

- "Samen inkopen geeft schoolbesturen een sterkere positie" (kop blauwe sectie) en "sterkere positie richting leveranciers": niet op de live site. Vervangen door de live kop.
- "van behoefte tot gunning", "collectieve contracten per inkoopsegment, van ICT en meubilair tot schoonmaak", "Wij controleren uw Whk-beschikking", "bij zes zorgverzekeraars", "Een extra arbeidsvoorwaarde die uw bestuur niets kost": vervangen door formuleringen van de live site.
- "Zonder extra kosten" (intro direct voordeel), "voordelig geregeld via het collectief" (fietsplan), "in de eigen webshop" (Onderwijspapier): weggelaten.
- "Vaste gezichten voor uw bestuur" en "U weet altijd wie u kunt bellen" (team): vervangen door de live kop "Wie wij zijn".
- "Werk dat het onderwijs vooruit helpt" en "vacatures in Zeewolde": vervangen door de live kop; geen plaats en geen aantal.
- Citaten Prisma en Staphorst: het ontwerp haalde woorden uit het midden van een zin of zette de zin om. Hier staan de volledige zinnen.

## Open voor OIG

- Kerncijfers bevestigen: 400+ besturen, 2.700+ scholen, 37% besparing, 16 jaar (de live site noemt ook 3.000+, 29%, 15 jaar).
- Korting zorgverzekering: live homepage zegt "tot wel 15%", de verzekeringenpagina "max. 16%" (CZ). Nu `figures.insuranceDiscount`.
- Welke vier teamleden op de homepage staan (vinkje "onHome" in het CMS); anders de eerste vier op volgorde.
- Toestemming voor het gebruik van de drie citaten en het logo van Stichting Prisma Almere in deze ingekorte vorm.
- og:image voor de homepage.
