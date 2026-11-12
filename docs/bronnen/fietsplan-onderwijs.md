# Brontabel: Fietsplan onderwijs (`/fietsplan-onderwijs/`)

Whitepaper = "Zet heel onderwijs Nederland op de fiets" (`whitepaper-leasefiets-def.pdf`, 27 mei 2025, 12 pagina's,
https://www.onderwijsinkoopgroep.nl/wp-content/uploads/whitepaper-leasefiets-def.pdf). Inventaris =
`2026-10-16-dd-oig-site-inventaris.md` (regelnummers). Ontwerp = Paper "06 Fietsplan" (desktop, dev-notities).
Overal: je-vorm werd u-vorm, "werknemer" werd "medewerker". Vragen komen uit het CMS, de pdf en de cover via
`getWhitepaper('leasefiets')`.

| Sectie | Tekst (begin) | Bron | Vorm |
|---|---|---|---|
| Metadata | Title en description | `src/lib/pages.ts`, gelijk aan dev-notities | ongewijzigd |
| Hero, label | "Kennis" | Ontwerp ("Kennis · Voor werkgevers in het onderwijs") | ingekort tot handschriftlabel |
| Hero, H1 | "Fietsplan in het onderwijs" | Ontwerp en paginaverslag (zoekwoord) | letterlijk |
| Hero, intro | "Met een fietsplan biedt u uw medewerkers een fiets van de zaak..." | Inventaris r. 2301 e.v. (duurzaam en gezond alternatief voor woon-werkverkeer), r. 1603 ("leaset u eenvoudig en voordelig fietsen voor uw medewerkers") | herschreven |
| Hero, paneel | "Whitepaper leasefiets" / "Zet heel onderwijs Nederland op de fiets" | Whitepaper p. 1 (titel); cover uit het CMS | letterlijk |
| Zo werkt het, inleiding | "Meer dan de helft van werkend Nederland woont binnen 15 kilometer..." | Whitepaper p. 3 | ingekort |
| Zo werkt het, zes stappen | "U stelt een fiets ter beschikking" t/m "Maandelijks overzicht" | Whitepaper p. 4 (Hoe werkt het?) | vrijwel letterlijk; kopjes nieuw |
| Voordelen, milieu | "Een duurzaam alternatief voor autovervoer..." | Inventaris LP leasefiets (H3's: duurzaam alternatief, luchtkwaliteit, CO2-uitstoot) | herschreven |
| Voordelen, fit | "Fietsen bevordert lichamelijke activiteit..." | Inventaris LP (H3) en whitepaper p. 3 ("fitte, vitale en loyale collega's") | samengevoegd |
| Voordelen, financieel | "Het voordeel voor de medewerker ligt rond de 30%..." | Whitepaper p. 8 (Wat is het voordeel?), met de calculatorlink uit de whitepaper | ingekort |
| Voor wie, drie kaarten | "Alle typen fietsen", "Alle typen organisaties", "Alle medewerkers in dienst" | Whitepaper p. 5 (Waarop is de regeling van toepassing?) | vrijwel letterlijk; afkortingen uitgeschreven |
| Voor wie, tabel | "Van fietsplan naar leasefiets" | Whitepaper p. 5 (De evolutie van de fietsenregelingen) | cijfers letterlijk |
| Voor wie, onder de tabel | "De regeling 'fiets van de zaak' uit 1995..." | Whitepaper p. 10, vraag 4 | ingekort (naam staatssecretaris weggelaten) |
| Kosten, werkkostenregeling | "Een belangrijk voordeel van dit fietsplan..." | Whitepaper p. 6, punt 1 | ingekort (overnamepercentage weggelaten) |
| Kosten, bijdrage werkgever | "In principe betaalt de medewerker de fiets in 36 termijnen..." | Whitepaper p. 6, punt 2 | vrijwel letterlijk |
| Kosten, bijtelling | "Omdat u de fiets ter beschikking stelt..." / "Voor een e-bike van € 2.500..." | Whitepaper p. 6, punt 3 | ingekort (netto bedrag en belastingschaal weggelaten) |
| Kosten, reiskostenvergoeding | "De medewerker ontvangt geen reiskostenvergoeding..." | Whitepaper p. 7, punt 4 | vrijwel letterlijk |
| Kosten, uitruilregeling | "De reiskostenvergoeding in het onderwijs is relatief laag..." | Whitepaper p. 7, punt 5 | ingekort (bedrag per kilometer weggelaten) |
| Kosten, tabel | "Drie manieren om de kosten van een fiets van € 2.900 te verdelen" | Whitepaper p. 6 (tabel onderaan) | cijfers letterlijk |
| Praktisch, zes kaarten | fietsendealer, service, deelname, uit dienst, promotiemateriaal, BKR | Whitepaper p. 7 (punt 6), p. 8 (punten 7 en 9), p. 10 (vragen 1 t/m 3) | vrijwel letterlijk |
| Rekenvoorbeeld | "21% voordeel voor meester Henk" | Whitepaper p. 11 | ingekort; bedragen letterlijk; "stichting Boaz" werd "zijn bestuur" |
| Hoe verder | zeven stappen, "kan binnen een week afgerond zijn" | Whitepaper p. 9 | vrijwel letterlijk ("we" werd lijdende vorm) |
| Whitepaper (blauw) | "De hele whitepaper als pdf", "pdf, 12 pagina's" | Ontwerp; aantal pagina's geteld in de pdf | herschreven |
| Vragen | kop "Vragen over het fietsplan" | Ontwerp; vragen uit het CMS | CMS |
| Contact en CTA | standaard | Gedeelde onderdelen | n.v.t. |

## Uitgaande links (gecontroleerd op 12 november 2026)

| Link | Uitkomst |
|---|---|
| `https://www.lease-a-bike.nl/calculator/` | Werkt (200), "Bereken hoeveel je bespaart". Staat in de whitepaper op p. 8. |
| Pdf van de whitepaper | Uit het CMS (`/api/documenten/file/whitepaper-leasefiets-def.pdf`), 200. |

## Weggelaten omdat het niet eenduidig of mogelijk verouderd is

- **Overnameprijs na 36 maanden**: de whitepaper noemt 20% (p. 4, en € 580 in het rekenvoorbeeld) en 15% (p. 6). Op de pagina staat alleen dat overnemen kan en optioneel is.
- **Maximumbedrag**: p. 4 noemt € 18.000, de tabel op p. 5 en vraag 4 op p. 10 zeggen "geen maximum". De pagina volgt de tabel en noemt de € 18.000 niet.
- **19 cent per kilometer** (p. 7): bedrag uit mei 2025, niet te verifiëren voor nu.
- **Netto bijtelling "circa € 7 per maand bij belastingschaal 38,10%"** (p. 6) en het belastingpercentage van 17,49% in het rekenvoorbeeld: tarieven van 2025.
- **"Ruim 600.000 medewerkers rijden op hun droomfiets"** (p. 9): onduidelijk van wie dit cijfer is (Lease a Bike of OIG).
- **"5 stappen"** (p. 9): de whitepaper somt er zeven op; de pagina zegt zeven.
- **Blok "Fietsplan en de cao po"** uit het ontwerp: geen bevestigde tekst.
- **Namen en mobiele nummers van adviseurs** (p. 12) en de algemene tekst over de OIG: contact loopt via het contactblok.
- Testimonials, stockfoto's en het whitepaperformulier van de oude LP (dev-notities).

## Open voor OIG

- Overnameprijs na 36 maanden: 15% of 20%?
- Geldt er een maximumbedrag (€ 18.000) of niet?
- Is de whitepaper van mei 2025 nog actueel (bijtelling 7%, de bedragen in de tabellen, het rekenvoorbeeld van meester Henk)?
- Wat de cao po zegt over een fietsplan, met bron; tot dan staat dat blok er niet.
- Mag Lease a Bike bij naam genoemd worden (nu wel, zoals in de whitepaper)?
- Akkoord met directe download zonder formulier.
