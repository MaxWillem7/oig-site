# Brontabel /werkwijze/

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers). Paper = pagina "08 Werkwijze", artboard "Werkwijze · desktop".
Inhoud in `src/components/werkwijze/content.ts`.

| Sectie | Tekst (eerste woorden) | Bron | Vorm |
|---|---|---|---|
| Hero, label | "Onze werkwijze" | Inventaris 1850 (oude H1) | letterlijk, als handschriftlabel |
| Hero, H1 | "Beter inkopen in zeven stappen" | Inventaris 1858 (H2 "Beter inkopen in 7 stappen") | letterlijk, getal uitgeschreven |
| Hero, intro | "Inkoop is een continu proces. Daarom geeft de Onderwijs Inkoop Groep deelnemende scholen doorlopend toegang..." | Inventaris 1851 | ingekort (slotvraag weggelaten) |
| Hero, knoppen | "Plan een kennismaking" / "Bekijk onze diensten" | Inventaris 1852; BOUWEN.md regel 6 | herschreven |
| Hero, kerncijfers | schoolbesturen / gemiddelde besparing / ervaring | CMS `figures.boards`, `figures.saving`, `figures.years`; bijschriften inventaris 283 | uit CMS |
| Hero, foto's | oig-077, oig-082, oig-107 | Fotoshoot (klantmap `photos (2)/Kleur foto_s`), dezelfde nummers als live (inventaris 1853-1855) | beeld, nieuwe alt-teksten |
| De aanpak, kop | "Van kennismaking tot borging van uw contracten" | Paper; stapnamen inventaris 1861, 1879 | nieuw (samenvatting van de stappen) |
| De aanpak, toelichting | "In zeven stappen brengen we uw volledige inkoop in kaart en richten we de inkoop voor u in." | Inventaris 1859 | ingekort |
| Stap 1 | "Kennismaking met alle betrokkenen: relatie en vertrouwen zijn de basis..." | Inventaris 1861-1862 | licht herschreven |
| Stap 2 | "Scan van de inkoop: ... per inkoopsegment in kaart" | Inventaris 1864-1865 | herschreven; "op 25 segmenten" vervangen door "per inkoopsegment" (inventaris 86-88: aantal is tegenstrijdig) |
| Stap 3 | "Analyse en benchmark: na de scan voeren we een analyse uit..." | Inventaris 1867-1868 | licht herschreven |
| Stap 4 | "Onderhandelingen: als alle gegevens bekend zijn..." | Inventaris 1870-1871 | licht herschreven |
| Stap 5 | "Rapportage: u ontvangt een korte en bondige rapportage..." | Inventaris 1873-1874 | herschreven |
| Stap 6 | "Implementatie: na goedkeuring door de bestuurder worden de besparingen geïmplementeerd..." | Inventaris 1876-1877 | licht herschreven |
| Stap 7 | "Borging: de nieuwe inkoopafspraken worden vastgelegd. Wij leveren de nieuwe contracten of addenda aan..." | Inventaris 1879-1880 | herschreven |
| Stap 7, link | "Naar Mijn OIG" (naar `contact.portalUrl` uit het CMS) | Paper; inventaris 1880 ("in ons systeem ... inloggen met uw eigen gegevens") | gissing uit het ontwerp, zie Open voor OIG |
| Foto's stappen | 1: oig-110, 2: oig-121, 3: oig-060, 4: oig-120, 5: oig-090, 6: oig-079, 7: oig-116 | Volgorde van de live pagina (inventaris 1860-1878) | beeld, nieuwe alt-teksten |
| Ervaringen, kop | "2.700+ scholen gingen u voor" (getal uit CMS) | Inventaris 1883-1884 | letterlijk |
| Citaat groot | "Inkopen, zeker als het Europees moet, blijft een taaie klus..." Paul Schollaardt, College van Bestuur, Stichting Elan | Inventaris 464-466 | ingekort (laatste twee zinnen), niet herschreven |
| Citaat kort 1 | "Medewerkers van OIG zijn kundig en zoeken steeds opnieuw..." Albert Sluiter, directeur bestuurder, Essentius | Inventaris 468-470 | ingekort (middelste zin) |
| Citaat kort 2 | "Ook krijg ik gevraagd en ongevraagd advies. (...) Tevens zie je bij ieder voorstel..." Edward van der Beek, beleidsmedewerker, Stichting Ommeriek | Inventaris 484-486 | ingekort (zin 3 en 5); "(...)" markeert het weggelaten deel; "je" blijft omdat het een citaat is |
| Logo | logo-elan.png | Live site `wp-content/uploads/image001.png` (inventaris 463) | beeld |
| Link | "Alle referenties" naar /referenties/ | Paper | - |
| Vragen | `<FaqSection page="werkwijze" />` | CMS (toont niets zolang er geen vragen zijn) | uit CMS |
| Contact | `<ContactSection />` | gedeeld onderdeel; vervangt het contactblok in drie kolommen (inventaris 1887-1896) | - |
| Oranje band | `<CtaBand />` | gedeeld onderdeel | - |

Gestructureerde gegevens: Service (provider OIG) plus een ItemList van de zeven stappen met ankers `#stap-1` tot `#stap-7`.

## Weggelaten omdat het niet te verifiëren was
- "25 segmenten" in stap 2 (de site noemt 15, 25 en meer dan 25).
- De slotvraag uit de oude intro ("Klaar om samen kosten te besparen...") is ingekort weggelaten, niet om inhoudelijke redenen.

## Open voor OIG
- Kerncijfers bevestigen (400+, 2.700+, 37%, 16 jaar).
- Hoeveel inkoopsegmenten omvat de scan?
- Is het contractsysteem uit stap 7 hetzelfde als Mijn OIG? De link "Naar Mijn OIG" bij stap 7 gaat daarvan uit.
- Kloppen de alt-teksten (wie en wat is er op de foto's te zien) en de toewijzing van foto's aan stappen (volgt de live pagina)?
- Beter logobestand van Stichting Elan (het huidige is 204 px breed).
