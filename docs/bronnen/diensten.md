# Brontabel /diensten/

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers). Ontwerp = Paper "Diensten · desktop".
Kerncijfers en contactgegevens komen uit het CMS (`getSettings`).

| Sectie | Tekst (eerste woorden) | Bron | Vorm |
|---|---|---|---|
| Hero, label | Diensten | Inventaris 1167 (title "Diensten") | letterlijk |
| Hero, H1 | Alle diensten voor uw schoolbestuur | Paginaverslag oig-pagina-diensten.md (SEO) | nieuw H1 volgens verslag |
| Hero, intro | De Onderwijs Inkoop Groep ondersteunt schoolbesturen in het volledige inkoopproces. Naast deelname... | Inventaris 1182 en 1190 | herschreven |
| Hero, knoppen | Plan een kennismaking / Bekijk alle diensten (#diensten) | BOUWEN.md regel 6; inventaris 1183 (knop "Onze diensten") | herschreven |
| Hero, foto's | oig-120.jpg, oig-119.jpg | Inventaris 1184 en 1185; fotoshoot klantmap, foto 120 en 119 | alt-tekst nieuw, op het beeld gecontroleerd |
| Diensten, kop | Zes diensten, u kiest wat u nodig heeft | Ontwerp; de zes diensten uit het menu (inventaris 121 e.v.) | nieuw kopje |
| Diensten, intro | Van inkoopscan en aanbesteding tot subsidie en premie. Voor schoolbesturen in het primair onderwijs. | Inventaris 1190; doelgroep volgens bouwplan en `pages.ts` | herschreven |
| Kaart Aanbesteden | Wij begeleiden Europese en meervoudig onderhandse aanbestedingen. Via het aanbestedingscollectief... | Inventaris 1256 en 1182 | herschreven |
| Kaart Ondersteuning bij inkoop | Met een inkoopscan brengen wij uw inkoop in kaart. Door samen te werken met landelijke en regionale partnerleveranciers... | Inventaris 1418 en 1481 | ingekort |
| Kaart Ondersteuning, tweede link | Bekijk de inkoopsegmenten | `navigation.ts` (Inkoopsegmenten) | nieuw linklabel |
| Kaart Premiedesk | Grip op uw Whk-premie. Met de WGA-scan worden fouten in uitkeringsdossiers hersteld... | Inventaris 1662 en 1664 | ingekort |
| Kaart Subsidiedesk | Wij helpen u bij het vinden, aanvragen en verantwoorden van subsidies, lokaal en nationaal. Wordt een subsidie... | Inventaris 1195 en 1356 | herschreven |
| Kaart Inkoopbeleid | Wij helpen u bij het opstellen en uitvoeren van inkoopbeleid. Met grip op kosten en processen... | Inventaris 2231 en 2240 tot 2242 | ingekort |
| Kaart Verzekeringen | Collectiviteitskorting (cijfer uit CMS) op de zorgverzekering voor uw medewerkers. In veel gevallen is overstappen niet nodig... | Inventaris 1742 en 1743; cijfer `figures.insuranceDiscount` | ingekort |
| Uitgelicht, kop | Twee onderwerpen uitgelicht | Ontwerp | nieuw kopje |
| Uitgelicht, fietsplan | Bied uw medewerkers een fiets van de zaak: een duurzaam en gezond alternatief voor woon-werkverkeer... | Inventaris 2308, 2319 en 2326 | herschreven, u-vorm |
| Uitgelicht, kopieerapparatuur | Zeven inzichten die u helpen verborgen kosten van printers en kopieerapparatuur te voorkomen. Zo bent u goed voorbereid. | Inventaris 2395 | ingekort |
| Verwijsbalk | Elke samenwerking begint met een kennismaking en een inkoopscan. Zo werken wij, in zeven stappen. | Inventaris 1478 tot 1481 | herschreven |
| Ervaringen, intro | Wat schoolbesturen zeggen over de samenwerking. | Ontwerp; inventaris 462 (label "Ervaringen") | nieuw zinnetje |
| Ervaringen, citaat | "Medewerkers van OIG zijn kundig en zoeken steeds opnieuw naar organisatievoordelen..." | Inventaris 1933 tot 1936 (Albert Sluiter, Directeur bestuurder, Essentius) | ingekort, niet herschreven |
| Ervaringen, logo | essentius-logo.png | Live site `/wp-content/uploads/essentius-logo-zwarte-tekst-2.png` (inventaris 1934) | alt "Logo Essentius" |
| CTA-band | Benieuwd wat uw bestuur kan besparen? | Gedeeld onderdeel `CtaBand` | gedeeld |

## Afwijkingen van het ontwerp

- Volgorde van de kaarten volgt `navigation.ts` (Aanbesteden, Ondersteuning bij inkoop, Premiedesk, Subsidiedesk,
  Inkoopbeleid, Verzekeringen). Inkoopsegmenten is een tweede link in de kaart Ondersteuning bij inkoop, zodat alle
  zeven adressen gelinkt zijn en de kop "Zes diensten" klopt.
- Leasefiets linkt naar `/fietsplan-onderwijs/` (bouwplan), niet naar `/lp/leasefiets/`.
- Kaart Premiedesk: "fouten in uw beschikking" stond niet in de inventaris en is "fouten in uitkeringsdossiers" geworden.
- Kaart Ondersteuning: "scherpe voorwaarden per inkoopsegment" en kaart Inkoopbeleid: "overzicht over uw contracten"
  zijn vervangen door zinnen van de live site.
- "gratis whitepaper" (fietsplan) en "Handig voordat u een nieuw contract afsluit" (kopieerapparatuur) weggelaten.
- Gestructureerde gegevens: ItemList met de zeven adressen uit `navigation.ts`.

## Open voor OIG

- Kerncijfers bevestigen (400+, 2.700+, 37%, 16 jaar, korting tot 16%).
- Bevestigen dat leasefiets en kopieerapparatuur de twee uitgelichte onderwerpen zijn.
- Citaat Essentius is ingekort: akkoord van Essentius voor gebruik op deze pagina.
