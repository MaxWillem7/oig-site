# Brontabel: Vacatures (`/vacatures/` en `/vacatures/[slug]/`)

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers). Ontwerp = Paper "10 Contact en vacatures". Aanspreekvorm: je.

## Overzicht

| Sectie | Tekst (eerste woorden) | Bron | Vorm |
|---|---|---|---|
| Hero | H1 "Werken bij de Onderwijs Inkoop Groep" | Inventaris r. 729 | letterlijk |
| Hero | "Bij de Onderwijs Inkoop Groep maak je deel uit van een team ..." | Inventaris r. 729 | ingekort |
| Hero | Teller "N openstaande vacatures, op kantoor in Zeewolde" | Aantal gepubliceerde vacatures in het CMS; plaats uit instellingen | dynamisch |
| Hero | Foto collega's bij het dartbord | Klantmap, fotoshoot nr. 104 (staat ook op de live vacaturepagina, inventaris r. 732) | nieuwe alt-tekst |
| Lijst | Titel, uren, opleiding, plaats, teaser per vacature | CMS (collectie Vacatures) | uit CMS |
| Lege staat | "Op dit moment staan er geen vacatures open ... open sollicitatie" | Ontwerp, dev-notities ("Lege staat") | herschreven |
| Wie wij zoeken | Teamspelers; analytische inslag en goed kunnen rekenen; 40 kilometer rond Zeewolde | Inventaris r. 767-770 | letterlijk |
| Wie wij zoeken | "mbo+ of hbo werk- en denkniveau hebben, afhankelijk van de functie" | Inventaris r. 769 en 786, plus de kenmerken per vacature (r. 902 en 1091 "MBO+ / HBO") | herschreven |
| Wat wij bieden | Enthousiast team van betrokken collega's; groeiende organisatie met impact op het Nederlandse onderwijs; digitaal gereedschap; team waarin fouten mogen zolang we ervan leren | Staat bij alle vier vacatures: inventaris onder "Wat wij bieden" vanaf r. 843, 936, 1029 en 1129 | ingekort |
| Open sollicitatie | "Vertel ons wat je zoekt en stuur je cv en motivatiebrief mee" | Inventaris r. 948 ("Graag ontvangen wij jouw CV en motivatiebrief") | herschreven |
| Vragen | `FaqSection page="vacatures"` | CMS | uit CMS |

## Detailpagina

| Sectie | Tekst | Bron | Vorm |
|---|---|---|---|
| Hero, inhoud, "In het kort" | Titel, kenmerken, openingstekst, groepen, salaris, foto's | CMS (collectie Vacatures) | uit CMS |
| Koppen | "Wat ga je doen?", "Wie ben jij?", "De Onderwijs Inkoop Groep zoekt mensen die", "Wat wij bieden", "Over de Onderwijs Inkoop Groep" | Inventaris r. 808, 835, 843 en de H2-lijst per vacature | letterlijk |
| In het kort | Salaris "€ x tot € y bruto per maand bij fulltime" | CMS-veld Salaris (omschrijving in het CMS: bruto per maand bij fulltime); verborgen zonder bedrag | uit CMS |
| Solliciteer | "Wij hopen jou snel te mogen ontvangen als onze nieuwe collega. Stuur je cv en motivatiebrief mee via het formulier." | Inventaris r. 948 | herschreven |
| Solliciteer | "Liever eerst bellen?" met telefoon en e-mail | Ontwerp; gegevens uit instellingen | functioneel |
| Andere vacatures | Titel, uren, plaats | CMS | uit CMS |

## Gelijk aan de live site (19 november 2026)

**Besluit Max (19 november 2026): de live WordPress-site is de enige bron voor vacatures.** Alle tekst per vacature
staat letterlijk zoals op live (titel, openingstekst, uren, niveau, alle blokken, punten met hun leestekens, salaris,
slottekst), ook waar live een tik- of taalfout heeft. Bron: curl op de vier live pagina's en `/vacatures/` op
19 november 2026. Data: `src/seed/data/02-vacatures.ts`; online gezet met de datamigratie
`src/migrations/20261119_083000_vacatures_gelijk_aan_live.ts`. Een script legde elke tekstregel van live naast de
preview: alles staat erop.

Opmaak die bij deze site blijft (geen inhoud):
- Vaste koppen per blok in een vaste volgorde (Wat ga je doen, Wie ben jij, zoekt mensen die, Wat wij bieden);
  live heeft per vacature een andere volgorde. Live zet een dubbele punt achter "zoekt mensen die:"; hier niet.
- De slottekst ("Kom ons versterken" op live) is een extra blok: kop "Kom ons versterken" (junior, medior),
  "Extra informatie" (specialist) of "Herken je jezelf hierin?" (medewerker). Het sierlabel "Kom ons versterken"
  boven die laatste twee koppen staat er niet.
- Medior: de alinea over de OIG staat live onder de kop "zoekt mensen die" en staat hier als inleiding van dat blok.
- Specialist: tussenkoppen "Dossierregie" en "Samenwerking" (in het CMS: punt dat met ## begint); kop "De
  Onderwijs Inkoop Groep zoekt collega's die" (veld "Eigen kop").
- Medewerker: vette woorden in "Zo leer je het vak" (in het CMS tussen **).

Nieuw in het CMS hiervoor: per blok een "Eigen kop" en "Tekst onder de punten" (migratie
`20261119_082538_vacature_kop_en_slot`), en de extra blokken (`20261119_075857_vacature_blokken`).

| Vacature | Adres | Wat er veranderde op 19 november (tweede ronde) |
|---|---|---|
| Junior inkoper | `/vacatures/junior-inkoopadviseur-aanbestedingsdesk/` | "inkoop vak", "Je bent bereidheid ... werken." en "na afronding van een traject." zoals live; zin "Afhankelijk van jouw ervaring..." nu ná de lijst; slotblok "Kom ons versterken" erbij |
| Medior inkoper | `/vacatures/medior-inkoopadviseur-aanbestedingsdesk/` | Openingstekst één alinea zoals live; puntkomma's en punten achter de punten zoals live; OIG-alinea onder "zoekt mensen die"; slotblok met "Stuur dan je motivatie en CV naar Justin Novák." |
| Medewerker Aanbestedingsdesk | `/vacatures/medewerker-aanbestedingsdesk/` (live `-2`, doorverwezen) | Puntkomma's zoals live; slotzin "Ervaring met inkoop..." onder de lijst; "Solliciteer via de knop" (was "Solliciteer dan via"); **"doorgroeien naar medior inkoopadviseur"** in "Zo leer je het vak" zoals live (OIG vroeg op 13 november om "medior inkoper"; in "Wat wij bieden" staat live wel "medior inkoper") |
| Commercieel medewerker binnendienst | `/vacatures/specialist-inkoopdossier/` | "24–32 uur" zoals live; kop "zoekt collega's die"; tussenkoppen Dossierregie en Samenwerking; "Afspraken & kwaliteit" als punt zoals live; slotblok "Extra informatie" |
| Inkoopadviseur / Accountmanager | was `/vacatures/inkoopadviseur-relatiebeheerder/` | Live 404: in het CMS terug naar concept (niet verwijderd); het oude adres verwijst naar `/vacatures/`; uit de seed |

Overzicht `/vacatures/`: kop "De Onderwijs Inkoop Groep zoekt mensen die" met de vier punten letterlijk van live
("Uitgesproken teamspelers zijn", "Een hbo-opleiding hebben afgerond", ...). Het blok "Wat wij bieden / Bij elke
functie" is weg: dat staat niet op het live overzicht. De openingstekst bovenaan is nog de eerdere ingekorte versie
(zonder "no cure, no pay" en "kinderopvangorganisaties", zie hieronder); niet gevraagd in deze ronde.

## Weggelaten ten opzichte van het ontwerp of de live site

- "no cure, no pay garantie" en "kinderopvangorganisaties" in de intro (geldt volgens de site alleen voor de subsidiedesk; bevinding in de inventaris).
- "100% pensioenbijdrage" in het gezamenlijke lijstje: één vacature noemt "premievrij pensioen". Staat nu alleen per vacature (CMS).
- "begeleiding door ervaren collega's": staat bij drie van de vier vacatures, dus niet bij "elke functie".
- Teamgrootte (18, 20 of 21) wordt niet genoemd in de vaste tekst.
- Vaste rij "Salaris: passend bij kennis en ervaring" in "In het kort": alleen een bedrag als het CMS dat heeft.
- Het ontwerp is in u-vorm; de pagina's staan in je-vorm (besluit bouwplan).
- Het veld "Functie" in het sollicitatieformulier is verborgen (gedeeld formulier), niet zichtbaar alleen-lezen zoals in het ontwerp.

## Open voor OIG

- Publicatie- en sluitingsdatum per vacature.
- Opleidingsniveau Junior (mbo+ of hbo).
- Pensioen: "100% pensioenbijdrage" of "premievrij pensioen"? Teamgrootte.
- Contactpersoon per vacature voor "Liever eerst bellen?" (nu het algemene nummer).

- "Zo leer je het vak" bij Medewerker Aanbestedingsdesk zegt live (en dus hier) "medior inkoopadviseur"; OIG vroeg om "medior inkoper". Op live aanpassen, dan volgt de preview.
