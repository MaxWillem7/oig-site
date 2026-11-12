# Brontabel: Juridisch, bedankt en 404

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers). Ontwerp = Paper "11 Systeempagina's".

## Juridisch overzicht (`/juridisch/`)

| Tekst | Bron | Vorm |
|---|---|---|
| H1 "Juridische documenten", drie kaarten met "Bekijken" | Inventaris r. 2631-2637 | letterlijk ("Privacy Beleid" wordt "Privacyverklaring") |
| Intro en kaartteksten | `PAGES` (omschrijvingen uit de paginaverslagen) | ingekort |

## Privacyverklaring (`/juridisch/privacy-beleid/`)

| Tekst | Bron | Vorm |
|---|---|---|
| H1 "Onze privacyverklaring", intro | Ontwerp, paginaverslag privacy-beleid | letterlijk uit ontwerp |
| De verklaring zelf, datum "Laatst bijgewerkt" | CMS: global Juridische teksten, velden `privacy` en `privacyUpdated` | uit CMS |
| Melding "Onze privacyverklaring wordt bijgewerkt" met telefoon en e-mail | Opdracht; gegevens uit instellingen. Alleen zichtbaar zolang het CMS-veld leeg is; de pagina staat dan op noindex | functioneel |

## Cookiebeleid (`/juridisch/cookiebeleid/`)

| Sectie | Bron | Vorm |
|---|---|---|
| Wat zijn cookies | Inventaris r. 2712-2713 | ingekort, u-vorm |
| Uw keuze | Code: `src/components/Consent.tsx` (sleutel `oig-cookies-v1` in localStorage, knoppen, geen scripts zonder toestemming) | feitelijke beschrijving |
| Categorieën en tabel | Code: `Consent.tsx` (Noodzakelijk, Statistieken, Marketing; Tag Manager laadt pas na toestemming; Consent Mode). GA4 en Clarity: inventaris r. 2869 ("in de HTML staat alleen GTM, GA4 via GTM en Clarity") | feitelijke beschrijving |
| Cookies beheren in uw browser | Inventaris r. 2850-2856 | ingekort |
| Wijzigingen | Inventaris r. 2858 | ingekort |
| Contact | Inventaris r. 2860-2863; gegevens uit instellingen | ingekort |
| Laatst bijgewerkt: 12 november 2026 | Datum waarop deze tekst is geschreven | feit |

## Algemene voorwaarden (`/juridisch/algemene-voorwaarden/`)

| Tekst | Bron | Vorm |
|---|---|---|
| H1, downloadknop | Inventaris r. 2662 (live staat alleen de pdf). Knop via `getDocument('Algemene voorwaarden')`; zonder document een regel met telefoon en e-mail | functioneel |

De voorwaarden staan op de live site niet als tekst (inventaris r. 2667), dus er is geen tekst overgenomen.

## Bedankt (`/bedankt/`)

| Tekst | Bron | Vorm |
|---|---|---|
| H1 "Bericht ontvangen", "Bedankt. Wij nemen zo snel mogelijk contact met u op. Heeft u haast? Bel ons op ..." | Inventaris r. 2890-2892, ontwerp | herschreven |
| Drie kaarten naar diensten, referenties, team | Ontwerp; neutrale verwijsteksten | herschreven |

## 404 (`not-found.tsx`)

| Tekst | Bron | Vorm |
|---|---|---|
| H1 "Oeps, deze pagina is verdwaald", "Naar de startpagina" | Inventaris r. 2968-2970 | herschreven |
| "Veel gezocht": Ons team, Diensten, Vacatures, Whitepapers, Contact | Ontwerp (dev-notities 404) | navigatie |

## Weggelaten ten opzichte van het ontwerp

- Zoekveld op de 404: de nieuwe site heeft geen zoekfunctie.
- "Van inkoopscan tot contractbeheer" en "Wie u straks aan de lijn krijgt" op de bedanktpagina: vervangen door neutrale verwijzingen.
- Varianten van de bedanktpagina per formuliertype: de formulieren tonen hun bevestiging op de pagina zelf en sturen niet door.
- Merken van advertentiediensten (Meta, Snapchat, Google Ads) en de cookietabel met namen en bewaartermijnen uit het live cookiebeleid: niet te controleren.

## Open voor OIG

- Volledige privacyverklaring met datum (harde voorwaarde voor live); invoeren in het CMS onder Juridische teksten.
- Welke tags zitten in de Google Tag Manager-container (alleen GA4 en Clarity, of ook advertentiepixels)? Daarna kan het cookiebeleid de diensten en cookies per categorie noemen.
- Algemene voorwaarden als pdf in het CMS (Documenten, titel exact "Algemene voorwaarden"); de tekst ook op de pagina zetten als OIG die als tekst aanlevert.
- Reactietermijn op de bedanktpagina, als OIG die wil noemen.
