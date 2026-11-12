# Brontabel /ons-team/

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers). Ontwerp = Paper "Ons team · desktop" en "· dev-notities".
Alle mensen (naam, functie, groep, portret, telefoon, e-mail) komen uit het CMS (`getTeam()`); groepen en volgorde uit
`TEAM_GROUPS`. Het algemene nummer en mailadres komen uit `getSettings().contact`. Aantallen op de pagina worden geteld
uit wat er getoond wordt.

| Sectie | Tekst (eerste woorden) | Bron | Vorm |
|---|---|---|---|
| Hero, label | Ons team | Inventaris 668 (H1 live) | letterlijk |
| Hero, H1 | Vind uw contactpersoon | Paginaverslag oig-pagina-ons-team.md (SEO) | nieuw H1 volgens verslag |
| Hero, intro | Ontmoet ons team van experts die klaar staan om u te helpen. Zoek op naam of kies een rol en bel of mail direct. | Inventaris 678; tweede zin is uitleg bij het zoekveld | eerste zin letterlijk, tweede zin nieuw (bediening) |
| Hero, blok rechts | Weet u niet bij wie u moet zijn? + algemeen nummer en mailadres | CMS `contact.phone`, `contact.email` | vraag nieuw (bediening), gegevens uit het CMS |
| Zoekbalk | Zoek op naam of functie; knoppen Iedereen (aantal), Inkoopadvies, Aanbestedingsdesk, Contracten en dossiers, Directie en sales, Kantoor | Dev-notities; `TEAM_GROUPS` | bediening; aantal geteld |
| Groepskoppen | Inkoopadvies, Aanbestedingsdesk, Contracten en dossiers, Directie en sales, Kantoor, met "n collega's" | `TEAM_GROUPS`; aantal geteld | uit het CMS |
| Kaart | portret, naam, functie, telefoon (tel:), e-mail (mailto:) | CMS; leeg telefoonveld = algemeen nummer met "(algemeen)" | uit het CMS |
| Lege staat | Geen collega gevonden. Bel (algemeen nummer), wij verbinden u door. | Dev-notities; nummer uit het CMS | bediening |
| Vacatures, kop | Wij zoeken nieuwe collega's | Inventaris 686 ("Wij zijn op zoek naar nieuwe teamleden!") | herschreven |
| Vacatures, tekst | Kom ons versterken. Bekijk de openstaande vacatures en solliciteer vandaag nog. | Inventaris 687 en 688 | letterlijk, samengevoegd |
| Vacatures, knop | Bekijk de vacatures | Inventaris 689 ("Onze vacatures") | herschreven |
| Vacatures, foto's | oig-078, oig-104 | Inventaris, sectie Ons team (104 bij het vacatureblok, 078 bij het contactblok); fotoshoot klantmap | alt-teksten nieuw, op het beeld gecontroleerd |

Het vacatureblok toont zich alleen als er gepubliceerde vacatures in het CMS staan. Een groep zonder mensen toont zich niet.

## Weggelaten (niet te verifiëren)

- Ontwerp, omschrijving achter de groepskop ("vast aanspreekpunt voor uw inkoopvragen", "begeleiding van uw aanbestedingen",
  "contractbeheer en uw inkoopdossiers", "eigenaren, directie en nieuwe aansluitingen", "office support en administratie"):
  staat niet op de live site. Alleen het aantal per groep staat er.
- Ontwerp, portret van Michiel in het vacatureblok: vervangen door fotoshootbeeld 078 (portretten horen in het CMS).
- Ontwerp, placeholders "[aanleveren door OIG: portret]": wie geen foto heeft, krijgt de initialen.

## Open voor OIG

- Portretfoto's van Larissa Benning en Mika Valk; een echte portretfoto van Stijn Achterveld.
- Indeling per groep bevestigen.
- Direct nummer voor wie nu het algemene nummer heeft.
- Korte omschrijving per groep, als OIG die wil tonen.
