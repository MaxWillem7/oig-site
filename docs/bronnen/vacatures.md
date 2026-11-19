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

## Wijzigingen 19 november 2026 (verzoeken OIG van 12 en 13 november)

Bron: mails van Thomas Bruschke (12 november 16:22 en 13 november 12:10) en de live site op 19 november 2026
(`/vacatures/` en de vier vacaturepagina's, opgehaald met curl). Online gezet via de datamigratie
`src/migrations/20261119_080000_inhoud_zorg_vacatures_privacy.ts`, ook in de seed.

| Wijziging | Bron | Vorm |
|---|---|---|
| Titel "Junior inkoper" (was Junior Inkoopadviseur Aanbestedingsdesk), adres blijft `/vacatures/junior-inkoopadviseur-aanbestedingsdesk/` | Mail 12 nov; live H1 en overzicht | letterlijk |
| Titel "Medior inkoper" (was Medior Inkoopadviseur Aanbestedingsdesk), adres blijft | idem | letterlijk |
| Junior en medior: punt "werken met AI: je leert hoe je AI verantwoord ..." als laatste punt onder "Wat ga je doen?" | Live pagina's (OIG vroeg het onder "Zo leer je het vak"; die kop hebben deze twee vacatures niet, Max zette het op live onder "Wat ga je doen?") | letterlijk |
| Nieuwe vacature "Medewerker Aanbestedingsdesk", `/vacatures/medewerker-aanbestedingsdesk/` (oude site: `-2` erachter, doorverwezen) | Docx "Medewerker Aanbestedingsdesk vacature" (klantmap Zorgverzekering 2027), met de correctie van 13 nov: "medior inkoopadviseur" wordt op beide plekken "medior inkoper" | letterlijk; puntkomma's aan het eind van de punten weggelaten zoals bij de andere vacatures |
| Nieuwe vacature: blok "De Onderwijs Inkoop Groep zoekt mensen die" | Live pagina (zelfde vier punten als de andere vacatures) | letterlijk |
| Nieuwe vacature: "Zo leer je het vak", "Waarom deze functie?", "Herken je jezelf hierin?" | Docx; staan in het nieuwe CMS-veld "Extra blokken" (onder "Wat wij bieden") | letterlijk |
| Nieuwe vacature: losse zin "Ervaring met inkoop ... geen vereiste." | Docx (onder de lijst van "Wie ben jij?"); hier als laatste punt van die lijst | letterlijk |
| Nieuwe vacature: uren 24-32 uur, MBO+ / HBO, Zeewolde, geplaatst 13 november 2026 | Live pagina en WordPress-publicatiedatum | letterlijk |
| Nieuwe vacature: foto's 085, 099, 097 | Al in het CMS (zelfde reeks als de andere aanbestedingsdeskvacatures); live gebruikt bij alle vacatures dezelfde foto's | keuze DD |

### Verschillen met live die niet zijn overgenomen (voor OIG)

- **Inkoopadviseur / Accountmanager** (`/vacatures/inkoopadviseur-relatiebeheerder/`) staat niet meer op de live site
  (404, niet in het overzicht). Op de nieuwe site staat hij nog; offline halen door hem in het CMS op concept te zetten.
- In de tekst van de junior- en mediorvacature staat op live nog "Junior Inkoopadviseur" en "Medior Inkoopadviseur"
  ("zoeken we een ...", "Als ... ondersteun en adviseer je"); zo overgenomen.
- Junior: op live staat "Afhankelijk van jouw ervaring pak je steeds meer zelfstandig op..." ná de lijst; hier
  ervoor (het blok heeft één inleiding).
- Live overzicht: "zoekt mensen die" zegt "Een hbo-opleiding hebben afgerond" en "Uitgesproken teamspelers zijn";
  het overzicht hier zegt "mbo+ of hbo werk- en denkniveau, afhankelijk van de functie" (eerder besluit, ongewijzigd).
- Specialist inkoopdossier: live kop "zoekt collega's die" (hier "mensen die"), live "24–32 uur" met lang streepje en
  een slotblok "Extra informatie" met "Stuur je cv ... naar info@onderwijsinkoopgroep.nl"; niet overgenomen.
- Medior: slotzin live "Stuur dan je motivatie en CV naar Justin Novák" niet overgenomen (sollicitatieformulier).

## Weggelaten ten opzichte van het ontwerp of de live site

- "no cure, no pay garantie" en "kinderopvangorganisaties" in de intro (geldt volgens de site alleen voor de subsidiedesk; bevinding in de inventaris).
- "100% pensioenbijdrage" in het gezamenlijke lijstje: één vacature noemt "premievrij pensioen". Staat nu alleen per vacature (CMS).
- "begeleiding door ervaren collega's": staat bij drie van de vier vacatures, dus niet bij "elke functie".
- Teamgrootte (18, 20 of 21) wordt niet genoemd in de vaste tekst.
- Vaste rij "Salaris: passend bij kennis en ervaring" in "In het kort": alleen een bedrag als het CMS dat heeft.
- Het ontwerp is in u-vorm; de pagina's staan in je-vorm (besluit bouwplan).
- Het veld "Functie" in het sollicitatieformulier is verborgen (gedeeld formulier), niet zichtbaar alleen-lezen zoals in het ontwerp.

## Open voor OIG

- Inkoopadviseur / Accountmanager is van de live site gehaald: hier ook offline halen?
- Publicatie- en sluitingsdatum per vacature.
- Opleidingsniveau Junior (mbo+ of hbo).
- Definitieve naam "Specialist Inkoopdossier" of "Commercieel medewerker binnendienst".
- Pensioen: "100% pensioenbijdrage" of "premievrij pensioen"? Teamgrootte.
- Contactpersoon per vacature voor "Liever eerst bellen?" (nu het algemene nummer).
