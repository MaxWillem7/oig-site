# Pagina's bouwen (voor hulpagenten)

Next.js 16 (App Router) + Payload 3.93 in één app. Frontend: `src/app/(frontend)/`. CMS: `/admin`.
Lees eerst `AGENTS.md` (Next.js 16 wijkt af van wat je kent), `docs/STIJL.md` en dit bestand.

De site van de Onderwijs Inkoop Groep (OIG) wordt opnieuw opgebouwd, weg van WordPress. De huisstijl en de inhoud
blijven van OIG; de opbouw volgt het Paper-ontwerp "OIG — Website opgepoetst (oktober 2026)".

## Bronnen (alleen lezen)

Map `V` = `/Users/maxkoelewijn/Library/CloudStorage/GoogleDrive-max@digitaldudes.nl/Mijn Drive/Max agent/Max/digital-dudes/docs/plans/`

- **Inventaris van de live site**, letterlijke tekst per pagina: `V/2026-10-16-dd-oig-site-inventaris.md` (2977 regels).
  Zoek je pagina met `grep -n "^### " <bestand>` en lees alleen jouw secties plus sectie 2 (bevindingen).
- **Paginaverslag per pagina** (wat er verandert, SEO, open punten): `V/2026-10-16-dd-oig-paginaverslagen/oig-pagina-<naam>.md`.
- **Bouwplan met alle besluiten**: `V/2026-11-12-dd-oig-nieuwe-site-bouwplan.md`. Leidend bij twijfel.
- **Ontwerp**: Paper-bestand met fileId `01M526Y7P1NXYFPMWF2T3K22VD`. Paper MCP alleen lezen: eerst
  `get_guide({topic:"paper-mcp-instructions"})`, dan `get_basic_info` met de `pageId` van jouw pagina, dan `get_jsx`
  (`includeNodeIds: false`) per artboard voor exacte teksten, volgorde en maten. Elke pagina heeft ook een artboard
  "dev-notities" (SEO, alt-teksten, wat OIG moet aanleveren). `docs/paper/home-desktop.jsx` is de home als voorbeeld.
  Wijzig niets in Paper.
- **Live site**: https://www.onderwijsinkoopgroep.nl (alleen GET met curl, zonder extra headers).
- **Beeld**: klantmap `K` =
  `/Users/maxkoelewijn/Library/CloudStorage/GoogleDrive-max@digitaldudes.nl/Gedeelde drives/Projecten/Onderwijs Inkoop Groep/`.
  Fotoshoot: `K/OIG Traject 2024/photos (2)/Kleine afbeeldingen/` (125 jpg, bestandsnaam eindigt op `-001.jpg` tot
  `-125.jpg`; de live site gebruikt dezelfde nummers, bijv. `oig-086.jpg` is foto 086). Portretten:
  `.../photos (2)/Voorkeursfotos/`. Schoollogo's en overig: `K/OIG Traject 2024/Afbeeldingen/`. Open de map
  `Wachtwoorden` niet.

## Regels voor inhoud

1. **Niets verzinnen.** Elke zin en elk cijfer is terug te vinden in de inventaris (live site) of in een stuk van OIG.
   Herschrijven, inkorten, ordenen en verhelderen mag. Nieuwe claims, cijfers, namen, percentages of diensten niet.
   De teksten in het Paper-ontwerp zijn het uitgangspunt, maar controleer ze opnieuw tegen de inventaris: wat je
   daar niet terugvindt, laat je weg en meld je in je rapport.
2. **Brontabel per pagina**: `docs/bronnen/<pagina>.md` met per sectie: de tekst (of de eerste woorden), de bron
   (inventaris met regelnummer, live URL, of klantmap-bestand) en of de tekst letterlijk, ingekort of herschreven is.
   Plus een lijstje "Open voor OIG" (wat bevestigd of aangeleverd moet worden).
3. **Geen placeholders op de site.** Ontbreekt iets (bijv. een foto of het KvK-nummer), dan verbergt het onderdeel
   zich. Geen "[aanleveren door OIG]", geen "binnenkort". Zet het in "Open voor OIG".
4. **Kerncijfers komen uit het CMS**: `const { figures, contact } = await getSettings()` geeft `figures.boards`
   (400+), `figures.schools` (2.700+), `figures.saving` (37%), `figures.years` (16 jaar),
   `figures.insuranceDiscount` (tot 16%) en de contactgegevens. Typ deze cijfers en het telefoonnummer nooit zelf.
5. Aanspreekvorm **u** (vacatures: je). Nederlands. Geen em-dashes, geen emoji, geen Engelse teksten.
   Citaten van klanten mag je inkorten, niet herschrijven.
6. Knopteksten: primair "Plan een kennismaking" naar `/contact/`, links "Meer over <dienst>".
7. **Handschriftlabels terug** (besluit Max, 12 november): boven de H1 en boven sectiekoppen staat het label in
   I Love Glitter (`.kicker`). In het Paper-ontwerp zijn dat nog kleine hoofdletterlabels; vervang die door een
   kort `.kicker`-label van één tot drie woorden.

## Techniek

- Alle adressen eindigen op een schuine streep (`trailingSlash`). Interne links via `next/link` met de slash erbij.
- **Metadata**: `export const generateMetadata = () => pageMetadata('/pad/')` (pad uit `src/lib/pages.ts`).
  Voor pagina's uit het CMS (vacature): `buildMetadata(path, { title, description })`.
- **Vaste paginatekst staat in de code** van de pagina zelf (of een `content.ts` ernaast). Wat OIG zelf beheert komt
  uit het CMS via `src/lib/cms.ts`: `getSettings`, `getTeam`, `getVacancies`, `getVacancy(slug)`,
  `getPremiumTables()`, `getFaqs(page)`, `getWhitepapers`, `getWhitepaper(slug)`, `getDocument(title)`,
  `media(veld, 'portret'|'kaart'|'breed')`. Deze geven een lege lijst of null als er niets is: toon dan niets.
- **Vragen en antwoorden** staan in het CMS (collectie `vragen`, per pagina). Gebruik `<FaqSection page="..." />`;
  de seed-agent vult ze. Typ geen vragen in je pagina.
- **Pagina-opbouw**: server components. `export const revalidate = 300`. Geen `generateStaticParams`, geen
  `force-static` (de database is er niet bij de build). Client components alleen waar interactie nodig is.
- **Afbeeldingen** die bij de vaste opbouw van jouw pagina horen: kopieer ze naar `public/beeld/<pagina>/` (jpg,
  hoogstens 2000px breed, verklein met `sips -Z 2000 <bestand>`), toon ze met
  `<Photo img={{ url: '/beeld/...', alt: '...' }} />` of `next/image`. Schrijf een echte alt-tekst (wie of wat is te
  zien; geen "Oig Shoot"). Portretten van teamleden en vacaturefoto's komen uit het CMS, niet uit `public/`.
- **Gestructureerde gegevens**: `<JsonLd data={service({...})} />` op dienstpagina's. `PageHero` met `crumbs` zet
  het kruimelpad en BreadcrumbList. `FaqSection` zet FAQPage.
- **Toegankelijk**: één h1, kloppende koppenstructuur, alt-teksten, zichtbare focus, contrast (oranje tekst altijd
  `--oranje-tekst`, nooit `--oranje` op wit), tabellen met `<th scope>`, niets beweegt vanzelf.
- **Mobiel en desktop**: bekijk elke pagina op 1440 en 390. Geen horizontale scroll. Mobiele artboards bestaan maar
  voor een paar pagina's; leid de rest af (kolommen onder elkaar, knoppen op volle breedte, tabellen als kaarten of
  schuifbaar).

## Jouw bestanden

- Routes: `src/app/(frontend)/<pad>/page.tsx` (plus eigen componenten en CSS-modules in dezelfde map of in
  `src/components/<pagina>/`), beeld in `public/beeld/<pagina>/`, brontabel in `docs/bronnen/<pagina>.md`.
- **Raak gedeelde bestanden niet aan**: `src/styles/*`, `src/components/*.tsx` en `*.module.css` in de hoofdmap van
  components, `src/components/forms/*`, `src/lib/*`, `src/collections/*`, `src/globals/*`, `src/payload.config.ts`,
  `next.config.ts`, `redirects.ts`, `package.json`, `src/app/(frontend)/layout.tsx`. Mist er iets in een gedeeld
  onderdeel, maak dan een eigen variant in je eigen map en meld het in je rapport.
- Installeer geen pakketten. `lucide-react` is er al.

## Werken

- De devserver draait al op http://localhost:3100. Start er geen tweede en verwijder `.next` niet.
- Screenshot: `node scripts/shot.mjs /pad/ 1440 <uitvoer.png> --full` (en `390`). Sla ze op in je scratchpad, niet
  in de repo. Bekijk ze zelf (Read) en vergelijk met het Paper-ontwerp (`get_screenshot`).
- Klaar = `npx tsc --noEmit` schoon voor jouw bestanden, `npx eslint <jouw bestanden>` schoon, pagina's geven 200 en
  zien er goed uit op 1440 en 390, brontabel compleet. Commit en push niet; dat doet de hoofdsessie.

## Rapport

Sluit af met: welke pagina's en bestanden je maakte, wat je wegliet omdat het niet te verifiëren was, wat open
staat voor OIG, en wat je mist in gedeelde onderdelen. Kort en feitelijk.
