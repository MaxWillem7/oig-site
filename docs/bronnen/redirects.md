# Redirects: oud adres naar nieuw adres

Stand: 12 november 2026. Regels staan in `redirects.ts` (hoofdmap), tests in `tests/seo.spec.ts`.
Alle redirects zijn permanent (308) en gaan in één stap naar een pagina die 200 geeft.

Bronnen:

- **Inventaris**: `digital-dudes/docs/plans/2026-10-16-dd-oig-site-inventaris.md`, sectie 1 (tabel met 34 pagina's,
  "Overige URL's", "Gelinkte en geüploade PDF's") en sectie 5 (technisch).
- **Live site** (https://www.onderwijsinkoopgroep.nl, opgevraagd op 12 november 2026): `sitemap.xml` met vier
  deelsitemaps, de REST API (`/wp-json/wp/v2/media?mime_type=application/pdf`, `/wp-json/wp/v2/team`,
  `/wp-json/wp/v2/review`, `/wp-json/wp/v2/types`) en losse adressen met `curl -sI`.
- **Paginaverslagen**: `digital-dudes/docs/plans/2026-10-16-dd-oig-paginaverslagen/` (verzekeringen, 404).
- **Bouwplan**: `digital-dudes/docs/plans/2026-11-12-dd-oig-nieuwe-site-bouwplan.md` (regel 88 en 126).

## 1. Pagina's uit de inventaris (34)

| Oud adres | Status live | Nieuw | Bron |
|---|---|---|---|
| `/` | 200 | blijft | inventaris §1 |
| `/over-ons/` | 200 | blijft | inventaris §1 |
| `/ons-team/` | 200 | blijft | inventaris §1 |
| `/vacatures/` | 200 | blijft | inventaris §1 |
| `/vacatures/inkoopadviseur-relatiebeheerder/` | 200 | blijft, zodra de vacature met deze slug gepubliceerd is in het CMS | inventaris §1 |
| `/vacatures/junior-inkoopadviseur-aanbestedingsdesk/` | 200 | blijft, idem | inventaris §1 |
| `/vacatures/medior-inkoopadviseur-aanbestedingsdesk/` | 200 | blijft, idem | inventaris §1 |
| `/vacatures/specialist-inkoopdossier/` | 200 | blijft, idem | inventaris §1 |
| `/diensten/` | 200 | blijft | inventaris §1 |
| `/dienst/aanbesteden/` | 200 | blijft | inventaris §1 |
| `/dienst/subsidiedesk/` | 200 | blijft | inventaris §1 |
| `/dienst/ondersteuning-inkoop/` | 200 | blijft | inventaris §1 |
| `/dienst/ondersteuning-inkoop/inkoopsegmenten/` | 200 | blijft | inventaris §1 |
| `/dienst/premiedesk/` | 200 | blijft | inventaris §1 |
| `/dienst/verzekeringen/` | 200 | blijft | inventaris §1 |
| `/werkwijze/` | 200 | blijft | inventaris §1 |
| `/referenties/` | 200 | blijft | inventaris §1 |
| `/partners/` | 200 | blijft | inventaris §1 |
| `/whitepapers/` | 200 | blijft | inventaris §1 |
| `/inkoopbeleid/` | 200 | blijft | inventaris §1 |
| `/lp/leasefiets/` | 200 | **`/fietsplan-onderwijs/`** | inventaris §1; bouwplan (leasefiets wordt fietsplan) |
| `/lp/kopieerapparaat/` | 200 | blijft | inventaris §1 |
| `/lp/meubilair/` | 200 | blijft | inventaris §1 |
| `/lp/schoonmaak/` | 200 | blijft | inventaris §1 |
| `/contact/` | 200 | blijft | inventaris §1 |
| `/blog/` (en alles eronder) | 200, leeg en noindex | **`/`** | inventaris §1 en §2 punt 8 |
| `/juridisch/` | 200 | blijft | inventaris §1 |
| `/juridisch/algemene-voorwaarden/` | 200 | blijft | inventaris §1 |
| `/juridisch/privacy-beleid/` | 200 | blijft | inventaris §1 |
| `/juridisch/cookiebeleid/` | 200 | blijft | inventaris §1 |
| `/bedankt/` | 200 | blijft (noindex) | inventaris §1 |
| `/login/` | 200 (WordPress-login) | **`/`** | inventaris §1 en §5 |
| `/ui/` | 200 (stijlgids) | **`/`** | inventaris §1 en §5 |
| `/bestaat-niet-xyz/` | 404 | blijft 404 (eigen 404-pagina) | inventaris §1 |

Nieuw adres zonder oud adres: `/fietsplan-onderwijs/`.

## 2. Overige adressen

| Oud adres | Status live | Nieuw | Bron |
|---|---|---|---|
| `/whitepaper-leasefiets-def/` | 301 naar de PDF | `/fietsplan-onderwijs/` | inventaris §1 "Overige URL's" |
| `/feed/`, `/feed/...` | 200 (RSS) | `/` | inventaris §1 "Overige URL's" |
| `/comments/feed/` | 200 | `/` | live site, curl |
| `/blog/feed/`, `/<pagina>/feed/` | 200 | `/` | live site, curl |
| `/author/admin/`, `/author/...` | 404 | `/` | inventaris §1 "Overige URL's" |
| `/category/...` (o.a. `/category/uncategorized/`) | 200 | `/` | live site, curl |
| `/tag/...` | 404 | `/` | WordPress-standaard, vangnet |
| `/page/2/` enz. | 200 | `/` | live site, curl |
| `/search/...` | 200 | `/` | live site, curl; robots.txt van de live site |
| `/team/<slug>/` (21 adressen, o.a. `/team/dick-goedhart/`, `/team/2493/`) | 301 naar `/` | `/ons-team/` | live site, REST API `team` |
| `/team/` | 404 | `/ons-team/` | vangnet |
| `/review/<slug>/` (21 adressen, o.a. `/review/henk-hoek/`) | 200 | `/referenties/` | live site, REST API `review` |
| `/dienst/` | 301 naar `/diensten/` | `/diensten/` | live site, curl |
| `/wp-login.php` | 302 naar `/login/` | `/` | live site, curl |
| `/wp-admin/`, `/wp-admin/...` | 302 naar de login | `/` | live site, curl |
| `/sitemap-post-type-page.xml`, `-lp.xml`, `-juridisch.xml`, `-dienst.xml` | 200 | `/sitemap.xml` | live site, `sitemap.xml` (Slim SEO) |
| `/sitemap.xml`, `/robots.txt` | 200 | blijven | inventaris §5 |

Keuze bij de login: `/login/`, `/wp-login.php` en `/wp-admin/` gaan naar de home, niet naar `/admin/`. De
oude login was openbaar vindbaar; het nieuwe CMS-adres hoeft niet vanaf openbare adressen aangewezen te worden,
en een bezoeker die "login" zoekt wil naar Mijn OIG (knop in de kop van elke pagina, ander domein).
Redacteuren gaan rechtstreeks naar `/admin`.

## 3. PDF's en beeld onder `/wp-content/`

De acht PDF's in de mediabibliotheek van de live site (REST API, 12 november 2026):

| Oud adres | Geüpload | Nieuw | Bron |
|---|---|---|---|
| `/wp-content/uploads/whitepaper-leasefiets-def.pdf` | 2025-05-27 | `/fietsplan-onderwijs/` | REST API media; inventaris §1 PDF's |
| `/wp-content/uploads/whitepaper-kopie-def.pdf` | 2025-05-27 | `/lp/kopieerapparaat/` | idem |
| `/wp-content/uploads/whitepaper-meubilair-def.pdf` | 2025-03-19 | `/lp/meubilair/` | idem |
| `/wp-content/uploads/whitepaper-schoonmaak-def.pdf` | 2025-03-20 | `/lp/schoonmaak/` | idem |
| `/wp-content/uploads/algemene-voorwaarden-oig.pdf` | 2024-11-25 | `/juridisch/algemene-voorwaarden/` | idem |
| `/wp-content/uploads/premie-overzicht-collectieve-zorgverzekering-oig-2026.pdf` | 2025-11-24 | `/dienst/verzekeringen/` | idem |
| `/wp-content/uploads/de-christelijke-zorgverzekeraar-2026-premietabel-15.pdf` | 2025-11-27 | `/dienst/verzekeringen/` | idem |
| `/wp-content/uploads/wijzigingsformulier-oig-2026.pdf` | 2025-11-24 | `/dienst/verzekeringen/` | idem |

Vangnetten (in deze volgorde, na de regels hierboven):

| Patroon | Nieuw | Waarvoor |
|---|---|---|
| `/wp-content/uploads/...` eindigend op `.pdf` met `premie`, `zorg` of `wijzigingsformulier` in het pad (hoofdletters maken niet uit, ook in een jaar- of maandmap) | `/dienst/verzekeringen/` | oude premieoverzichten, premietabellen en wijzigingsformulieren (2019, 2024, 2025) |
| `/wp-content/...` (al het andere: beeld, overige PDF's, plugin- en themabestanden) | `/` | 481 mediabestanden van de oude site en losse bestanden |

### Oude premie-PDF's (2019, 2024, 2025): exacte adressen niet gevonden

Het paginaverslag van de verzekeringenpagina noemt oude premie-PDF's die nog 3.700 keer in Google verschijnen.
De exacte adressen staan nergens in de analyse en zijn niet te achterhalen zonder Search Console:

- Ahrefs: er is geen project voor onderwijsinkoopgroep.nl (wel voor acht andere sites), dus geen
  Search Console-gegevens via de koppeling.
- Analyse (inventaris, zoekwoorden, ontwerpbrief, paginaverslagen): alleen de jaartallen, geen adressen.
- Live site: de bestanden staan niet meer in de mediabibliotheek (zoeken op "premie" geeft alleen de twee van
  2026) en geen pagina linkt ernaar.
- Geprobeerd met `curl -sI`: 126 voor de hand liggende namen voor 2019 tot en met 2025 in `/wp-content/uploads/`
  (o.a. `premie-overzicht-collectieve-zorgverzekering-oig-<jaar>.pdf`, `premieoverzicht-<jaar>.pdf`,
  `premietabel-<jaar>.pdf`, `wijzigingsformulier-oig-<jaar>.pdf`,
  `de-christelijke-zorgverzekeraar-<jaar>-premietabel-15.pdf`): allemaal 404.

Ze vallen onder het vangnet zolang "premie", "zorg" of "wijzigingsformulier" in de bestandsnaam staat. Heet een
oud bestand anders (bijvoorbeeld alleen de naam van een verzekeraar), dan gaat het naar de home in plaats van
naar de verzekeringenpagina.

**Open:** in Search Console (Prestaties, filter Pagina bevat `.pdf`, 16 maanden) de exacte adressen opzoeken en
controleren dat ze op `/dienst/verzekeringen/` uitkomen. Voeg adressen die buiten het vangnet vallen toe aan
`redirects.ts` (boven het vangnet) en aan `MOVED` in `tests/seo.spec.ts`.

## 4. Bewust geen redirect

| Adres | Waarom |
|---|---|
| `/wp-json/...` | API van WordPress, geen pagina; mag 404 geven |
| `/xmlrpc.php`, `/wp-includes/...`, `/wp-cron.php` | alleen door bots opgevraagd |
| `/?s=<zoekterm>` | komt op de home uit (200), de zoekterm wordt genegeerd |
| `https://mijnoig.onderwijsinkoopgroep.nl/` | klantportaal op een ander domein, hoort niet bij deze site |
| `https://www.onderwijspapier.nl/` | aparte webshop |

## 5. Aandachtspunten

- **Zonder schuine streep**: `/blog` gaat eerst naar `/blog/` en dan naar `/` (twee stappen). Dat is de
  standaard van Next bij `trailingSlash`; WordPress schreef alle adressen met de streep, dus Google kent die.
- **Vacatures**: de vier oude vacature-adressen blijven alleen werken als de vacatures in het CMS dezelfde slug
  krijgen en gepubliceerd zijn. Vervalt een vacature, dan geeft het adres 404. Een redirect in `redirects.ts`
  kan dat niet oplossen (die zou ook de gepubliceerde vacature afdekken); laat de vacaturepagina zelf bij een
  onbekende slug naar `/vacatures/` doorsturen, of voeg de slug hier toe op het moment dat de vacature vervalt.
- **Domein**: `http://`, zonder `www` en `https://onderwijsinkoopgroep.nl` naar `https://www.` regelt Vercel bij
  het koppelen van het domein (in één stap instellen; op de oude site waren dat er twee).
- **Nieuwe redirect toevoegen**: regel in `redirects.ts`, regel in deze tabel, adres in `MOVED` in de test. De
  devserver leest `redirects.ts` alleen bij het starten: herstart na een wijziging.
