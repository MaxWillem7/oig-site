# Huisstijl in code

Bron: de live site (Geist, I Love Glitter, kleuren) en de ontwerpbrief van 16 oktober 2026.
Tokens: `src/styles/tokens.css`. Basisklassen: `src/styles/globals.css`. Gebruik alleen tokens, nooit losse kleurcodes.

## Kleuren (tokens)

| Token | Waarde | Gebruik |
|---|---|---|
| `--tekst` | #1A1A1A | tekst, donkere knop |
| `--tekst-zacht` | #4A4A48 | secundaire tekst |
| `--tekst-lead` | #3A3A38 | inleidingen |
| `--lijn` / `--lijn-creme` | #E6E1D8 / #F0E4D2 | randen op wit / op crème |
| `--creme` | #FFF4E5 | crème sectie, icoonvlak |
| `--grijs` | #F7F5F1 | lichtgrijs vlak |
| `--oranje` | #FF8C00 | primaire knop, streep onder het handschriftlabel |
| `--oranje-tekst` | #B35F00 | oranje tekst, labels, links (contrast op wit) |
| `--oranje-icoon` | #E07B00 | iconen, handschriftlabel |
| `--groen` / `--groen-licht` | #006837 / #E3F0E8 | woordblok in de H1, tegels |
| `--blauw` / `--blauw-licht` | #312782 / #ECEAF6 | donkere sectie, tegels |
| `--op-blauw` / `--op-blauw-accent` | #D6D3EE / #FFB766 | tekst en accent op blauw |

## Regels

- Wissel witte en crème secties af. Hoogstens één blauwe sectie per pagina. Geen schaduwen op vlakken, geen verlopen.
- Eén H1 per pagina. Het groene woordblok (`<span className="wordblock">`) één keer per pagina, alleen in de H1.
- Handschriftlabel (`.kicker`, I Love Glitter met oranje streep) boven de H1 en boven de H2 van een sectie. Kort: één tot drie woorden, zoals op de live site ("Team", "Ervaringen", "Solliciteer").
- Zakelijk label (`.label`: 13px, hoofdletters) alleen voor kleine koppen in kaarten, tabellen en de footer.
- Geen stockfoto's van kinderen. Echte fotoshootbeelden van OIG, of lijniconen (lucide-react, `strokeWidth={1.6}`) op een kleurvlak (`.icon-tile`).
- Aanspreekvorm u. Alleen vacatures en het sollicitatieformulier gebruiken je.
- Geen em-dashes, geen emoji, geen Engelse teksten.

## Klassen (globals.css)

- Opbouw: `.container`, `.section` (+ `--creme`, `--grijs`, `--blauw`, `--smal`), `.stack` (kolom, `--gap`), `.grid-2/3/4`, `.split` (+ `--breed-links`, `--midden`).
- Tekst: `.h1`, `.h2`, `.h3`, `.lead`, `.zacht`, `.klein`, `.maat` (max 68 tekens breed), `.kicker`, `.label`, `.wordblock`, `.prose` (lopende tekst met koppen en lijsten), `.link`.
- Knoppen: `.btn` + `.btn--primair` / `--secundair` / `--donker` / `--wit` / `--klein`, `.btn-rij`, `.textlink` (met `<Arrow />`).
- Vlakken: `.card` (+ `--klikbaar`), `.icon-tile` (+ `--groen`, `--blauw`, `--wit`), `.foto`, `.checks` (lijst met `<Check />`), `.tabel-wrap` > `table.tabel`.
- Paginaspecifieke opmaak: een CSS-module naast je component, met tokens.

## Componenten

- `@/components/Blocks`: `PageHero` (kruimelpad, label, H1, lead, knoppen, rechterkolom), `SectionHeading`, `Breadcrumbs`, `Photo`, `Avatar`, `CtaBand` (oranje band, onderaan elke pagina), `FaqSection` (vragen uit het CMS plus FAQPage-gegevens), `ContactSection` (formulier plus contactgegevens).
- `@/components/Icons`: `Arrow`, `Chevron`, `Check`, `External`. Overige iconen uit `lucide-react`.
- `@/components/forms`: `ContactForm`, `InkoopscanForm`, `WhitepaperForm slug`, `SollicitatieForm vacancy`.
- `@/components/JsonLd` met de bouwers uit `@/lib/jsonld` (`service`, `faqPage`, `jobPosting`, `breadcrumb`).
- `@/components/RichText` voor richtext uit het CMS.

## Maten uit het ontwerp (desktop 1440)

Zijmarge 100px, sectie 88 tot 96px, H1 64 tot 68px, H2 44px, H3 24px, lead 20/32, body 17 tot 18px, kaart radius 10px en padding 28 tot 32px, knop radius 7px. Mobiel (390): zijmarge 20px, H1 40/46, H2 30/36, knoppen op volle breedte. De klassen hierboven regelen dit al.
