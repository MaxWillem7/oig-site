# Brontabel: startinhoud van het CMS

Gevuld door `npm run seed` (`src/seed/data/01-team.ts` tot en met `05-documenten.ts`). Stand: 12 november 2026.

- **Inventaris** = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers met r.).
- **Live** = https://www.onderwijsinkoopgroep.nl, opgehaald op 12 november 2026.
- **Paper** = ontwerp "OIG — Website opgepoetst (oktober 2026)".
- **Klantmap** = `Gedeelde drives/Projecten/Onderwijs Inkoop Groep/`.

De live site is sinds de inventaris van 16 oktober gewijzigd. Waar live en inventaris verschillen, is de live site
gevolgd en staat het verschil hieronder.

## 1. Team (21 personen)

Bron voor naam, functie, telefoon en e-mail: live `/ons-team/` (teamkaarten) en `/wp-json/wp/v2/team`; de inventaris
r.366-449 geeft dezelfde gegevens voor 20 van de 21. Groepen: Paper, pagina "09 Organisatie", artboard
"Ons team · desktop". `onHome`: de vier portretten in het teamblok van de home in Paper (`docs/paper/home-desktop.jsx`).

Alle gegevens zijn letterlijk overgenomen, met drie soorten opmaak: telefoonnummers in één notatie
(`06 41 62 83 58`, `036 820 10 08`), "Oprichter & Eigenaar" wordt "Oprichter en eigenaar" en "Operationeel Directeur"
wordt "Operationeel directeur" (schrijfwijze uit Paper). Telefoon is leeg waar de live site het algemene nummer
036-8201000 toont.

| # | Naam | Functie | Groep | Telefoon | Portret (bron op live, `/wp-content/uploads/`) |
|---|---|---|---|---|---|
| 1 | Cor van Stralen | Inkoopadviseur | inkoopadvies | 06 41 62 83 58 | `cor-scaled.jpg` · home |
| 2 | Carine van Brummelen | Inkoopadviseur | inkoopadvies | 06 18 20 93 67 | `img_7145-2-scaled.jpg` · home |
| 3 | René Verhoef | Inkoopadviseur | inkoopadvies | 06 42 92 01 12 | `rene-scaled.jpg` · home |
| 4 | Heleen Gorlee | Inkoopadviseur | inkoopadvies | 06 38 03 04 88 | `img_hg-scaled.jpeg` · home |
| 5 | Noah van Vlastuin | Inkoopadviseur | inkoopadvies | 06 34 05 20 17 | `noah2.jpeg` |
| 6 | Thomas Bruschke | Inkoopadviseur | inkoopadvies | 06 36 30 59 20 | `thomas-1-scaled.jpg` |
| 7 | Larissa Benning | Senior Inkoopadviseur Aanbestedingsdesk | aanbestedingsdesk | 06 29 49 29 16 | `lb-scaled.jpg` (sinds 22 oktober 2026 op live) |
| 8 | Mika Valk | Junior Inkoopadviseur Aanbestedingsdesk | aanbestedingsdesk | leeg (algemeen) | `mv-scaled.jpg` (nieuw op live sinds de inventaris) |
| 9 | Stijn Achterveld | Contractmanager | contracten | 036 820 10 08 | geen: zie hieronder |
| 10 | Bianca Omerzu | Contractbeheer | contracten | 036 820 10 05 | `bianca2-scaled.jpeg` |
| 11 | Natasja Sloot | Dossierspecialist | contracten | 036 820 10 06 | `natasja-scaled.jpg` |
| 12 | Maayke Veldhuyzen | Dossierspecialist | contracten | 036 820 10 03 | `img_mv-scaled.jpeg` |
| 13 | Jaap Duel | Dossierspecialist | contracten | 036 820 10 07 | `jaap2-scaled.jpeg` |
| 14 | Dick Goedhart | Oprichter en eigenaar | directie | leeg (algemeen) | `dick-scaled.jpg` |
| 15 | Justin Novák | Oprichter en eigenaar | directie | 06 25 54 47 66 | `justin-scaled.jpg` |
| 16 | Michiel Koelewijn | Oprichter en eigenaar | directie | leeg (algemeen) | `michiel-scaled.jpg` |
| 17 | Dave van Wagtendonk | Operationeel directeur | directie | 06 39 86 08 52 | `dave-scaled.jpg` |
| 18 | Arjan Bokhorst | Salesmanager | directie | 06 42 86 54 69 | `arjan-scaled.jpg` |
| 19 | Patricia Born | Office Support | kantoor | leeg (algemeen) | `patricia-scaled.jpg` |
| 20 | Yvette Berghorst | Office Support | kantoor | 036 820 10 09 | geen: live toont `blanco-avatar.png` |
| 21 | Hananja Fijnenberg | Administratie | kantoor | 036 820 10 04 | `oig-040.jpg` |

E-mailadressen: letterlijk van de mailto-links op live (`<voorletter>.<achternaam>@onderwijsinkoopgroep.nl`).

Verschillen met de inventaris en met Paper:

- **Ben Stam** (inventaris r.384-387, Paper: zevende inkoopadviseur) staat niet meer op de live site en is niet
  opgenomen. Inkoopadvies telt daardoor 6 personen, niet 7.
- **Yvette Berghorst** (Office Support, 036-8201009) staat sinds 4 november 2026 op de live site en ontbreekt in de
  inventaris en in Paper. Ingedeeld bij Kantoor, naast Patricia Born met dezelfde functie. Kantoor telt 3 personen.
- **Larissa Benning en Mika Valk** hadden in de inventaris een blanco avatar. De live site toont nu bij hun naam een
  echt portret (`lb-scaled.jpg`, `mv-scaled.jpg`, zelfde keukenachtergrond als de andere recente portretten). Die zijn
  gebruikt.
- **Stijn Achterveld**: de live site toont nu `sa.png` (geüpload op 4 november 2026). Dat bestand bevat
  C2PA-herkomstgegevens van OpenAI/ChatGPT en is dus hetzelfde gegenereerde beeld als
  `chatgpt-image-14-sep-2026-...png` uit de inventaris, onder een andere naam. Niet gebruikt. In de fotoshoot van 2024
  en in `Voorkeursfotos` staat geen bestand met zijn naam; hij staat pas sinds september 2026 op de site. Geen foto,
  de site toont initialen.
- De map `Voorkeursfotos` (klantmap) bevat portretten uit 2024 van elf huidige teamleden. De live site gebruikt voor
  hen dezelfde shoot of een nieuwer portret; de live versie is aangehouden omdat OIG die zelf heeft gekozen.

Portretten: grootste maat van de live site, verkleind tot hoogstens 1200 px, jpg, `seed-assets/images/team-*.jpg`.
Alt-tekst: "Portret van <naam>, <functie> bij de Onderwijs Inkoop Groep". Bron per bestand in
`seed-assets/images/manifest.json`.

## 2. Vacatures (4)

Bron: de live vacaturepagina's (gelijk aan inventaris r.790-1160) en de kaarten op `/vacatures/` (r.730-760) voor de
korte omschrijving. Tekst **letterlijk**, in je-vorm. Een script heeft elke zin in het CMS vergeleken met de live
pagina: alles komt letterlijk terug, op de punten hieronder na. `datePosted` = veld `date` uit
`/wp-json/wp/v2/pages?slug=<slug>`.

| Slug | Titel (H1 live) | Uren · opleiding | Salaris | Geplaatst | Foto's (fotoshoot) |
|---|---|---|---|---|---|
| `inkoopadviseur-relatiebeheerder` | Inkoopadviseur / Accountmanager | 32-40 uur · HBO | 3.484 tot 4.728 | 2025-07-10 | 085, 078, 107 |
| `junior-inkoopadviseur-aanbestedingsdesk` | Junior Inkoopadviseur Aanbestedingsdesk | 24-32 uur · MBO+ / HBO | geen range genoemd | 2026-09-24 | 085, 098, 097 |
| `medior-inkoopadviseur-aanbestedingsdesk` | Medior Inkoopadviseur Aanbestedingsdesk | 24-32 uur · HBO | geen range genoemd | 2024-11-08 | 089, 099, 081 |
| `specialist-inkoopdossier` | Commercieel medewerker binnendienst | 24-32 uur · MBO+ / HBO | 3.084 tot 4.187 | 2025-07-10 | 124, 109, 083 |

Verbeterde typfouten (verder niets gewijzigd):

- "ondersteund bij" wordt "ondersteunt bij" (Inkoopadviseur, r.809).
- "inkoop vak" wordt "inkoopvak"; "Je bent bereidheid om" wordt "Je bent bereid om" (Junior).
- "Bij Onderwijs Inkoopgroep" en "Werken bij Onderwijs Inkoopgroep" worden "de Onderwijs Inkoop Groep" (Medior).
- "worden.Je werkt" krijgt een spatie en een alinea (Commercieel medewerker).
- "24–32 uur" met liggend streepje wordt "24-32 uur", gelijk aan de andere vacatures.
- Puntkomma's en punten aan het eind van lijstpunten zijn weggehaald.

Verdeling over de velden:

- `teaser`: de tekst van de kaart op `/vacatures/`. `intro`: de openingstekst onder de H1.
- `about`: "Over de Onderwijs Inkoop Groep" (Inkoopadviseur) en de alinea die bij Medior onder de kop "zoekt mensen
  die" staat.
- Junior: de slotzin van "Wat ga je doen?" ("Afhankelijk van jouw ervaring ...") staat in de inleiding van de lijst,
  vóór "Concreet houd je je onder andere bezig met:", omdat het CMS geen tekst na de lijst kent.
- Commercieel medewerker: de live pagina heeft onder "Wat ga je doen?" drie tussenkoppen (Dossierregie, Afspraken &
  kwaliteit, Samenwerking). Het CMS heeft één lijst; de elf punten staan in dezelfde volgorde, de drie koppen staan in
  de inleiding ("Dossierregie, afspraken & kwaliteit en samenwerking:"). Dit is de enige regel die niet letterlijk van
  de live site komt.
- Niet overgenomen (geen veld, en het sollicitatieformulier vervangt het): het slotblok "Kom ons versterken" met per
  vacature een andere tekst, waaronder "Stuur dan je motivatie en CV naar Justin Novák" (Medior) en "Stuur je cv en
  een korte motivatie naar info@onderwijsinkoopgroep.nl" (Commercieel medewerker).

Foto's: de drie foto's die de kaart van die vacature op live `/vacatures/` toont, uit de fotoshoot in de klantmap
(`OIG Traject 2024/photos (2)/Kleur foto_s/Kleine afbeeldingen/...-<nr>.jpg`, 2688 px breed; de map
`Kleine afbeeldingen` staat binnen `Kleur foto_s`), verkleind tot hoogstens 2000 px. Voor
081 en 085 is de shootfoto naast de live versie gelegd: zelfde beeld. De alt-teksten beschrijven wat er te zien is,
zonder namen. Foto 085 staat bij twee vacatures, net als op live.

## 3. Vragen en antwoorden (36)

Bron: de veelgestelde vragen per pagina op de live site (inventaris). Keuze en formulering van de vragen: Paper en
de paginaverslagen. Alle antwoorden staan in u-vorm.

| Pagina | Vraag | Bron | Bewerking |
|---|---|---|---|
| aanbesteden | Wat is aanbesteden? | r.1299-1300 | letterlijk |
| aanbesteden | Valt een school onder de Aanbestedingswet? | r.2281-2282 (FAQ inkoopbeleid) | vraag herschreven, antwoord letterlijk met "Ja." ervoor |
| aanbesteden | Wanneer moet een school Europees aanbesteden? | r.2287-2288 en r.1256 | herschreven |
| aanbesteden | Waarom is aanbesteden belangrijk? | r.1301-1302 | letterlijk |
| aanbesteden | Welke regels gelden er bij aanbesteden? | r.1305-1306 | letterlijk |
| aanbesteden | Kan ik hulp krijgen bij een aanbesteding van leermiddelen? | r.1307-1308; leermiddelen: segment r.1434 en klantcitaat Prisma Almere r.476 | herschreven |
| subsidiedesk | Wat doet een subsidiedesk voor schoolbesturen? | r.1366-1367 | ingekort |
| subsidiedesk | Welke subsidies zijn er voor scholen? | r.1370-1371 | ingekort |
| subsidiedesk | Hoe werkt het aanvragen via de Subsidiedesk? | r.1368-1369 | ingekort |
| subsidiedesk | Wat betekent no cure, no pay? | r.1372-1373 | ingekort |
| subsidiedesk | Wat heeft u nodig voor een subsidieaanvraag? | r.1378-1379 | ingekort |
| subsidiedesk | Hoe bespaart de Subsidiedesk tijd? | r.1374-1375 | ingekort |
| subsidiedesk | Waarom een subsidiedesk inschakelen? | r.1376-1377 | ingekort |
| ondersteuning-inkoop | Wat is een dynamisch aankoopsysteem? | r.2506, r.1589, r.1596, r.1599 | herschreven (vraag uit Paper) |
| ondersteuning-inkoop | Ik heb al een offerte voor hardware. Kan de OIG helpen? | r.1468 | herschreven (vraag uit Paper) |
| ondersteuning-inkoop | Hoe houd ik zicht op mijn contracten? | r.2256 en r.1419 | herschreven (vraag uit Paper) |
| ondersteuning-inkoop | Op welke inkoopsegmenten ondersteunt de OIG? | r.1404 (segmentkoppen) en r.1427 | herschreven, zonder aantal (vraag uit Paper) |
| inkoopsegmenten | Moet ik schoolmeubilair Europees aanbesteden? | r.2287-2288 en r.1596-1599 | herschreven (vraag uit Paper) |
| inkoopsegmenten | Hoe begint een meubilairtraject bij de OIG? | r.2455-2462 (LP meubilair) | herschreven (vraag uit Paper) |
| premiedesk | Wat is de Whk-premie? | r.1655 en r.1681 | herschreven (vraag uit Paper) |
| premiedesk | Hoe werkt de WGA-scan? | r.1690-1693 | ingekort |
| premiedesk | Wat is WIA, WGA en IVA? | r.1694-1697 | ingekort, zonder "sinds 2015" en "De overheid betaalt 75%" |
| premiedesk | Hoe ontstaat de hoge opslag op de ZW-premie? | r.1700-1701 | ingekort |
| premiedesk | Hoe werkt de collectieve aanpak van de OIG? | r.1702-1707 | ingekort |
| verzekeringen | Ik ben al verzekerd bij een van de zes verzekeraars. Hoe krijg ik de korting? | r.1809-1810 en r.1801 (Jabes) | herschreven |
| verzekeringen | Waarom zou ik meedoen? | r.1811-1813 en r.1792 | ingekort |
| inkoopbeleid | Wat is inkoopbeleid voor scholen precies? | r.2279-2280 | letterlijk |
| inkoopbeleid | Waarom moet een school voldoen aan de Aanbestedingswet? | r.2281-2282 | letterlijk |
| inkoopbeleid | Begeleidt de OIG ook onderhandse aanbestedingen? | r.2252 en r.1256 | herschreven (vraag uit Paper) |
| inkoopbeleid | Wanneer moet ik Europees aanbesteden? | r.2287-2288 | letterlijk |
| inkoopbeleid | Wat is het verschil tussen centrale en decentrale inkoop? | r.2283-2284 | letterlijk, één woord ingekort |
| inkoopbeleid | Hoe weet ik of mijn school rechtmatig inkoopt? | r.2285-2286 | ingekort |
| fietsplan-onderwijs | Wat is een leasefiets? | r.2345-2346 | herschreven |
| fietsplan-onderwijs | Hoe werkt het leasefietsprogramma? | r.2347-2348 | herschreven naar u-vorm, "zijn brutoloon" wordt "het brutoloon" |
| fietsplan-onderwijs | Wat zijn de voordelen van een leasefiets? | r.2349-2350 | letterlijk |
| fietsplan-onderwijs | Wat gebeurt er als een medewerker van baan verandert? | r.2353-2354 | vraag herschreven, antwoord licht herschreven |

Weggelaten:

- **Aanbesteden, "Hoe lang duurt het aanvraagproces?"** (r.1303-1304): het antwoord noemt geen duur. Paper maakte er
  "Hoe verloopt een aanbesteding en hoe lang duurt het?" van met een plek voor de doorlooptijd; die is er niet.
- **Premiedesk, "Welke regels gelden er bij aanbesteden?"** (r.1698-1699): gaat niet over de Premiedesk.
- **Premiedesk, "Wat is de gedifferentieerde premie Whk?"** (alleen in Paper): het antwoord in Paper zegt dat de
  hoogte afhangt van de uitkeringen aan eigen (ex-)medewerkers en dat de Belastingdienst elk jaar een beschikking
  stuurt. Dat staat nergens op de live site. Vervangen door "Wat is de Whk-premie?" met alleen zinnen van de live
  pagina.
- **Fietsplan, "Hoe kan ik een leasefiets aanvragen?"** (r.2351-2352): het antwoord zegt niet hoe je aanvraagt.
- **Werkwijze en vacatures**: geen vragen op de live site en geen in Paper. Geen vragen aangemaakt.

## 4. Whitepapers (4)

| Slug | Titel | Omschrijving, bron | Pad | Achter formulier | PDF (live `/wp-content/uploads/`) |
|---|---|---|---|---|---|
| `schoonmaak` | Een schone school is het beste visitekaartje | r.2497-2499 en r.2506, ingekort | `/lp/schoonmaak/` | ja | `whitepaper-schoonmaak-def.pdf` |
| `meubilair` | In 7 stappen naar de aanschaf van nieuw meubilair | r.2447-2449 (H1 en intro), ingekort | `/lp/meubilair/` | ja | `whitepaper-meubilair-def.pdf` |
| `kopieerapparaat` | Aanschaf printers en kopieerapparatuur | r.2394-2395 (H1 en intro), ingekort | `/lp/kopieerapparaat/` | ja | `whitepaper-kopie-def.pdf` |
| `leasefiets` | Alles over het leasen van fietsen | r.2319, u-vorm; titel uit "Leer alles over het leasen van fietsen" (r.2363) | `/fietsplan-onderwijs/` | nee | `whitepaper-leasefiets-def.pdf` |

Volgorde (veld `order`) volgens het ontwerp: schoonmaak, meubilair, kopieerapparaat, leasefiets.

Omslagen: `<onderwerp>-whitepaper-cover.png` van de live site (r.2148-2154). Ze zijn klein (262 × 363 px, schoonmaak
524 × 726 px).

## 5. Documenten (4, plus de 4 whitepaper-PDF's)

| Titel in het CMS | Bestand (live `/wp-content/uploads/`) | Inventaris |
|---|---|---|
| Algemene voorwaarden | `algemene-voorwaarden-oig.pdf` | r.73 |
| Premieoverzicht collectieve zorgverzekering 2026 | `premie-overzicht-collectieve-zorgverzekering-oig-2026.pdf` | r.70 |
| Premietabel De Christelijke Zorgverzekeraar 2026 | `de-christelijke-zorgverzekeraar-2026-premietabel-15.pdf` | r.71 |
| Wijzigingsformulier 2026 | `wijzigingsformulier-oig-2026.pdf` | r.72 |
| Whitepaper leasefiets, kopieerapparaat, meubilair, schoonmaak | zie sectie 4 | r.74-77 |

Er zijn geen premietabellen aangemaakt (2027 is nog niet bekend).

## 6. KvK-nummer

**Niet gevonden, veld blijft leeg.** Doorzocht op "KvK", "Kamer van Koophandel" en "handelsregister":

- de acht PDF's van de live site (algemene voorwaarden, premiestukken, wijzigingsformulier, vier whitepapers);
- de live site zelf (home, over ons, contact, algemene voorwaarden, privacybeleid, cookiebeleid) en de loginpagina
  van Mijn OIG;
- de home van onderwijspapier.nl;
- alle PDF's en Word-bestanden in de klantmap (behalve `Wachtwoorden` en `Backup Website`), waaronder het
  huisstijlhandboek, beide overeenkomsten met Digital Dudes en `OIG/1 oktober factuur.pdf`.

De enige treffers zijn het KvK-nummer van Drukwerkdeal (Enschede) op hun facturen aan OIG. Dat is niet van OIG.

## Open voor OIG

1. **KvK-nummer** aanleveren (Instellingen > Contact). Zolang het leeg is, toont de footer geen KvK-regel.
2. **Portret van Stijn Achterveld**: het huidige beeld is gegenereerd. Graag een echte foto.
3. **Portret van Yvette Berghorst** (nieuw sinds 4 november, nog zonder foto).
4. **Ben Stam** staat niet meer op de live site: klopt het dat hij weg is?
5. **Indeling per groep bevestigen**, met name Yvette Berghorst bij Kantoor en Stijn Achterveld bij Contracten.
6. **Direct nummer** voor Mika Valk, Patricia Born, Dick Goedhart en Michiel Koelewijn (nu het algemene nummer).
7. **Vacature `specialist-inkoopdossier`**: het adres zegt "Specialist Inkoopdossier", de H1 en de kaart zeggen
   "Commercieel medewerker binnendienst". Die laatste is nu de titel. Welke naam is het?
8. **Vacatures**: zijn alle vier nog open? De Medior-vacature is van 8 november 2024. Sluitingsdatums zijn leeg.
9. **Tegenstrijdigheden in de vacatureteksten** (letterlijk overgenomen): team van 18 of 20 collega's (21 op de
   teampagina); Junior vraagt "MBO+ / HBO" in het kenmerk en "een afgeronde hbo-opleiding" in het profiel;
   "premievrij pensioen" naast "100% pensioenbijdrage"; "gogme" en "Je voert kennis en regie".
10. **Salarisindicatie** voor Junior en Medior (nu geen bedragen, dus ook niet in Google for Jobs).
11. **Doorlooptijd van een aanbesteding** (Europees en meervoudig onderhands): dan kan de vraag terug in de FAQ.
12. **Hoe vraagt een bestuur of medewerker een leasefiets aan?** Dan kan die vraag terug op de fietsplanpagina.
13. **Premiedesk**: klopt de uitleg van WIA, WGA en IVA? De live site zegt "sinds 2015" (de WIA geldt sinds eind
    2005) en "De overheid betaalt 75%"; beide zijn weggelaten.
14. **Whitepapers**: zijn alle vier nog actueel (maart en mei 2025)? Grotere omslagbeelden zijn welkom.
15. **Premiestukken 2027** en het wijzigingsformulier 2027 zodra ze er zijn.
