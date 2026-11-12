# Brontabel /whitepapers/

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers). Paper = pagina "07 Whitepapers en LP's", artboard "Whitepapers · desktop".

| Sectie | Tekst (eerste woorden) | Bron | Vorm |
|---|---|---|---|
| Hero, label | "Kennis" | Paper (label "Kennis voor schoolbesturen"), menugroep "Kennis" | ingekort tot handschriftlabel |
| Hero, H1 | "Gratis whitepapers over inkoop in het onderwijs" | Paginaverslag oig-pagina-whitepapers.md (SEO); live pagina had geen H1 (inventaris 2137) | nieuw volgens paginaverslag |
| Hero, intro | "Praktische kennis voor schoolbesturen over schoonmaak, schoolmeubilair, kopieerapparatuur en de leasefiets..." | Inventaris 2146-2155 (vier whitepapers), Paper | herschreven |
| Hero, blokje | "Liever direct advies? Bel ... of plan een kennismaking" | Paper; telefoonnummer uit CMS (`getSettings`) | letterlijk uit Paper |
| Kaart schoonmaak | "Schoonmaakdiensten aanbesteden" / "Inzicht in de kosten, toegang tot kwalitatief uitstekende bedrijven en het eigen Dynamisch Aankoopsysteem (DAS)..." | Inventaris 2158-2159 | ingekort; schrijfwijze DAS gelijkgetrokken |
| Kaart meubilair | "In zeven stappen schoolmeubilair aanschaffen" / "Een Dynamisch Aankoopsysteem voor rechtmatige en efficiënte inkoop van meubilair. Alle toonaangevende leveranciers zijn aangesloten." | Inventaris 2166-2167, 2438 | ingekort |
| Kaart leasefiets | "Leasefiets: duurzaam vervoer voor uw medewerkers" / "Met de leasefietsregeling leaset u eenvoudig en voordelig fietsen... U bepaalt zelf de looptijd." | Inventaris 2172-2176 | ingekort |
| Kaart kopieerapparatuur | "Slim printers en kopieerapparatuur aanschaffen" / "Zeven inzichten om verborgen kosten van printers en kopieerapparatuur te voorkomen, met praktische tips..." | Inventaris 2180-2183, 2395 | ingekort |
| Covers | cover-schoonmaak.jpg, cover-meubilair.jpg, cover-leasefiets.jpg, cover-kopieerapparaat.jpg | Eerste pagina van de vier PDF's op de live site (`wp-content/uploads/whitepaper-*-def.pdf`) | beeld |
| Oranje band | standaard `CtaBand` | gedeeld onderdeel | - |

Het CMS (`getWhitepapers()`) bepaalt welke whitepapers er staan, hun volgorde en de omschrijving. Voor de vier bekende
pagina's blijven kaarttitel, label, linktekst en cover uit het ontwerp staan (de titel in het CMS is de titel van de PDF,
bijv. "Een schone school is het beste visitekaartje"). Een nieuwe whitepaper komt volledig uit het CMS. Is het CMS leeg,
dan geldt de tabel hierboven. De omschrijvingen die nu in het CMS staan (seed) komen van de live site (inventaris 2173,
2395, 2449, 2499, 2506).

Vervallen ten opzichte van de live pagina: de vier lange blokken (dubbel met Inkoopsegmenten), het dienstenblok, de ankerlinks.

## Open voor OIG
- Zijn alle vier whitepapers nog actueel (geüpload maart en mei 2025)? Komen er nieuwe bij?
- Klopt "alle toonaangevende leveranciers zijn aangesloten" (meubilair) nog?
- Akkoord met het verbergen van de PDF's voor Google (dat regelt de hoofdsessie, niet deze pagina).
