# Brontabel: Verzekeringen (`/dienst/verzekeringen/`)

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers bij benadering, sectie "Verzekeringen" r. 1725-1833). Ontwerp = Paper "05 Zorgverzekering" (desktop, mobiel,
dev-notities). Korting in de intro, premiejaar en melding komen uit `getSettings()`; premietabellen uit `getPremiumTables()`;
vragen uit het CMS (`FaqSection page="verzekeringen"`); PDF's uit `getDocument(...)`.

**Bijgewerkt 19 november 2026** met de stukken die OIG op 18 november aanleverde, klantmap
`Onderwijs Inkoop Groep/Zorgverzekering 2027 (aangeleverd 18 nov)/` (hierna K2027): premieoverzicht 2027 van Zicht
Adviseurs (7 pagina's), premietabel De Christelijke Zorgverzekeraar 2027, wijzigingsformulier 2027 en drie foto's van
afdrukken van de oude pagina met pencorrecties (20261118_110605/110726/111008.jpg). Online gezet via de datamigratie
`src/migrations/20261119_080000_inhoud_zorg_vacatures_privacy.ts`; dezelfde stand staat in de seed.

| Sectie | Tekst (begin) | Bron | Vorm |
|---|---|---|---|
| Metadata | Title en description | `src/lib/pages.ts`, gelijk aan dev-notities | ongewijzigd |
| Hero, label | "Voor medewerkers" | Ontwerp ("Voor medewerkers van aangesloten schoolbesturen") | ingekort tot handschriftlabel |
| Hero, H1 | "Collectiviteitskorting op uw zorgverzekering" | Ontwerp en paginaverslag (zoekwoord) | letterlijk |
| Hero, intro | "Werkt u bij een school die is aangesloten..." | Inventaris r. 1742-1743 (meeliften, overstappen niet nodig, hoogste korting, vrijblijvend, kost niets), r. 1789-1790 (privé, 6 verzekeraars); korting = `figures.insuranceDiscount` | herschreven |
| Hero, knoppen | "Vergelijk de zes verzekeraars", "Premieoverzicht {jaar}" | Dev-notities (bewuste afwijking van de standaardknop) | n.v.t. |
| Hero, foto | oig-090 | Klantmap, fotoshoot "Kleur foto_s", foto 090 (live: `oig-090-1168x779.jpg`, r. 1745). Alt zelf beschreven | n.v.t. |
| Hero, melding | "Premies {jaar}" plus melding | `insurance.notice` uit het CMS; alleen zichtbaar zonder premietabellen | CMS |
| Zo werkt het, inleiding | "Deelname is vrijblijvend, kosteloos en opengesteld voor alle relaties..." | Inventaris r. 1794 en r. 1812 ("U bent ons geen enkele vergoeding verschuldigd") | vrijwel letterlijk |
| Zo werkt het, stap 1 | "Kies uw verzekeraar" | Ontwerp; verwijst naar de tabel | nieuw (navigatie) |
| Zo werkt het, stap 2 | "Al verzekerd? Log in bij uw verzekeraar..." | Inventaris r. 1810 | ingekort |
| Zo werkt het, stap 3 | "De korting wordt op uw polis doorgevoerd... Zicht Adviseurs (voorheen Fidus)" | Inventaris r. 1810, r. 1796, r. 1801; naam: K2027 premieoverzicht p. 1 "Zicht Adviseurs (voorheen FIDUS)" | ingekort |
| Tabel, label en kop | "Zorgverzekering onderwijs", "Zes zorgverzekeraars vergeleken" | Dev-notities (secundair zoekwoord), ontwerp | letterlijk |
| Tabel, inleiding | "De korting geldt op de aanvullende verzekering..." | Inventaris r. 1749-1786 ("Aanvullend: max. x% korting") | herschreven |
| Tabel, CZ | tot 16%, 3886964 | K2027 premieoverzicht p. 1 (gelijk aan inventaris r. 1749-1753) | letterlijk ("Max." werd "tot") |
| Tabel, VGZ | tot 15%, 87711967 | K2027 premieoverzicht p. 1 | letterlijk |
| Tabel, De Christelijke Zorgverzekeraar | tot 15%, 205504273 | Inventaris r. 1782-1786; K2027 DCZ-premietabel ("inclusief 15% korting", collectief 205504273) | letterlijk |
| Tabel, ONVZ | tot 10%, 87737812 (was 9461) | K2027 premieoverzicht p. 1 en wijzigingsformulier; pencorrectie op foto 110605 | letterlijk |
| Tabel, Nationale Nederlanden | tot 5% (was 10%), ditiszorg2240 | K2027 premieoverzicht p. 1 "Max. 5%". Let op: de foto met pencorrecties (110605) laat "max. 10%" staan; verschil voorgelegd aan OIG | letterlijk |
| Tabel, Menzis | tot 9%, 57805 | K2027 premieoverzicht p. 1 | letterlijk |
| Tabel, "Vragen via" | Zicht Adviseurs of Jabes verzekeringen | K2027; inventaris r. 1801 | letterlijk |
| Onder de tabel | "Bent u al verzekerd bij VGZ of Menzis?..." | Inventaris r. 1810 (enige manier bij VGZ en Menzis, wijzigingsformulier voor de overige), r. 1803 (relatienummer naar Jabes) | herschreven |
| Onder de tabel, formulier | "Bij CZ, ONVZ en Nationale Nederlanden ... wijzigingsformulier ... Zicht Adviseurs" | K2027 wijzigingsformulier noemt precies CZ (3886964), ONVZ (87737812) en Nationale Nederlanden (Ditiszorg 2240); mailen naar zorg.debilt@zichtadviseurs.nl | klopt |
| Wijzigingsformulier | "Download het wijzigingsformulier 2027 (pdf)" | CMS-document "Wijzigingsformulier 2027" (`wijzigingsformulier-oig-2027.pdf`, K2027) | nette link |
| Premies, kop | "Premieoverzicht {jaar}" | Ontwerp; jaar uit `insurance.year` | CMS |
| Premies, inleiding | "De maandpremies voor {jaar} per verzekeraar, per verzekerde van 18 jaar en ouder. De kortingen ... al verwerkt." | K2027 premieoverzicht p. 2 | ingekort |
| Premies, tabellen | 19 tabellen 2027, gegroepeerd per verzekeraar met snelkoppelingen | CMS-collectie Premietabellen; inhoud en bron per tabel in `src/seed/data/06-premies.ts` (hieronder) | CMS |
| Premies, voorbehoud | "Aan deze informatie kunnen geen rechten worden ontleend..." | K2027 premieoverzicht, voettekst elke pagina | vrijwel letterlijk |
| Premies, melding | "De premies voor {jaar} volgen" plus melding | `insurance.notice` | CMS |
| Premies, downloads | "Download de premieoverzichten": premieoverzicht 2027 en premietabel DCZ 2027 (pdf) | CMS-documenten uit K2027 | nette link |
| Contact, kop en inleiding | "Zicht Adviseurs en Jabes helpen u verder" / "Vragen over het collectief..." | Ontwerp; inventaris r. 1796, r. 1801; naam uit K2027 | herschreven |
| Contact, Zicht Adviseurs | "voorheen Fidus", 020 30 20 091, zorg.debilt@zichtadviseurs.nl, www.zichtadviseurs.nl | K2027 premieoverzicht ("020-30 20 091", "Zicht Adviseurs (voorheen FIDUS)"), wijzigingsformulier (e-mail), pencorrecties op foto's 110726 en 111008 (site, e-mail, telefoon) | letterlijk, telefoon in één notatie |
| Contact, Zicht Adviseurs, noot | "Liever het wijzigingsformulier gebruiken?..." | Inventaris r. 1810 | ingekort |
| Contact, Jabes | 0341 270 575, info@jabesverzekeringen.nl, jabesverzekeringen.nl/contact/ | Inventaris r. 1802 | letterlijk (telefoon zonder +31) |
| Contact, meeliften | "Meeliften in dit collectief? Mail dan naar..." | Inventaris r. 1803 | vrijwel letterlijk |
| Vragen | kop "Vragen over de collectieve zorgverzekering" | Dev-notities (zoekwoord); vragen zelf uit het CMS | CMS |
| CTA | "Bent u bestuurder of werkgever?" | Ontwerp; inventaris r. 1789 (inkoopvoordeel voor aangesloten scholen) | herschreven |

## Premietabellen 2027 (CMS, collectie Premietabellen)

Elk bedrag letterlijk uit de pdf (met "€ " ervoor); na invoer elk getal nog een keer tegen de pdf gelegd. De verzekeraar
per kolom is in het premieoverzicht alleen als logo te zien; afgelezen op pagina's die als beeld zijn bekeken.

| Verzekeraar | Tabellen | Bron |
|---|---|---|
| CZ | basis (Zorgbewust, Zorgopmaat natura; Zorgvariatiepolis combinatie), aanvullend (7), tand (3) | premieoverzicht p. 2, 4, 5, 6; vooruitbetalen p. 7 |
| VGZ | basis (Basis Keuze, Ruime Keuze natura; VGZ Eigen Keuze combinatie), aanvullend (5), tand (4) | p. 2, 4, 5, 6, 7 |
| De Christelijke Zorgverzekeraar | basis (Principe Polis), aanvullend (4 plus Aanvullend Zorgpakket gratis), tand (3) | DCZ-premietabel 2027 |
| ONVZ | basis (alleen ONVZ Vrije Keuze, combinatie), aanvullend (7, vanaf en tot 18 jaar), tand (4) | p. 4, 5, 6, 7 |
| Menzis | basis (Basis Voordelig, Basis natura; Basis Vrij combinatie), aanvullend (7), tand (3) | p. 2, 4, 5, 6, 7 |
| Nationale Nederlanden | basis (Zorg Voordelig natura; Combinatiepolis Zorg Vrij), aanvullend op Zorg Vrij (7), aanvullend op Zorg Voordelig (4), tand (5) | p. 3, 4, 5, 6, 7 |

Toelichtingen onder de tabellen: verplicht eigen risico 2027 € 400 en natura/combinatie (p. 2), "kortingen al verwerkt"
(p. 2 en 5), extra korting bij vooruitbetalen (p. 7; DCZ uit de eigen premietabel), en voor DCZ de regels voor kinderen.

Weggelaten of aangepast:
- **ONVZ natura (p. 3)**: onder het ONVZ-logo staan "Bewuste Keuze" en "Ruime Keuze" met exact dezelfde bedragen als VGZ
  op p. 2 (167,40 tot 155,75). "Bewuste Keuze" en "Ruime Keuze" zijn pakketnamen van VGZ. Vermoedelijk een kopieerfout,
  dus niet ingevoerd. In de pdf staan op p. 2 ook verborgen kolommen "ONVZ Vrije Keuze" (166,10 en 144,10, alleen bij
  € 0 en € 500) die niet zichtbaar zijn; ook niet ingevoerd.
- VGZ natura heet op p. 2 "Basis Keuze"; overgenomen zoals het er staat.
- CZ tand: "Tandarts Collectief tandarts" letterlijk overgenomen (vreemde naam, staat zo in de pdf).
- Nationale Nederlanden tand: "TandenGaaf € 1.000 (100%" mist in de pdf het sluithaakje; aangevuld.
- ONVZ combinatie € 500: 161,60 (stap van 10 euro waar de rest 3 euro is); letterlijk overgenomen.

## Uitgaande links (gecontroleerd op 19 november 2026)

Links in het premieoverzicht 2027 (pdf-annotaties) tegen de pagina gelegd:

| Link in de pdf | Op de pagina |
|---|---|
| `https://aanmelden.cz.nl/collectiviteit/3886964?ct=...&mc_cid=...` | Zelfde, zonder Mailchimp-parameters. Werkt (200 na doorverwijzing naar cz.nl). |
| `https://www.menzis.nl/premie-berekenen-en-aanvragen?collectiefId=57805` | Gelijk. Werkt (200). |
| `https://www.onvz.nl/zorgverzekering/collectief?coll-nummer=87737812` ("Collectief ONVZ 87737812") | Nieuw als aanmeldlink. Werkt (200); de pagina noemt "Onderwijs Inkoop Groep" en "10% korting". |
| `https://www.vgz.nl/87711967` | Gelijk. Werkt (200, naar collid=87711967). |
| Outlook Safe Links-adres naar `http://www.ditiszorg.nl/fidus` (met e-mailadres van een medewerker van Zicht/Fidus) | `https://www.ditiszorg.nl/fidus`, zoals ook als tekst in de pdf staat. Werkt (200). |
| `https://www.zichtadviseurs.nl/` | Met curl 403 (botbeveiliging, net als eerder fidus.nl); niet in de browser gecontroleerd. |
| DCZ `...premie-berekenen?cn=205504273` en `jabesverzekeringen.nl/contact/` | Werken (200). |

Let op: de pdf van het premieoverzicht zelf bevat nog die Safe Links-link met het e-mailadres van de medewerker. Zo
aangeleverd door OIG; de pdf is niet aangepast.

## Uitgaande links (gecontroleerd op 12 november 2026)

| Link | Uitkomst |
|---|---|
| `https://aanmelden.cz.nl/collectiviteit/3886964` | Werkt. 301 naar cz.nl/zorgverzekering/premie-berekenen; pagina toont "Onderwijs Inkoop Groep B.V., via intermediair Fidus". Mailchimp-parameters van de live link verwijderd. |
| `https://www.vgz.nl/87711967` | Werkt. 301 naar vgz.nl/zorgverzekering/collectieve-zorgverzekering?collid=87711967 (200). |
| `https://www.dechristelijkezorgverzekeraar.nl/zorgverzekering/premie-berekenen?cn=205504273` | Werkt (200). Pagina toont "Collectiviteit Onderwijs Inkoop Groep, collectiviteitnummer 205504273". |
| `https://www.ditiszorg.nl/fidus` (Nationale Nederlanden) | Werkt (200). Is de `url=`-bestemming uit de Outlook Safe Links-URL, met https. De pagina meldt dat de premies 2027 uiterlijk 19 november zijn verwerkt. |
| `https://www.menzis.nl/premie-berekenen-en-aanvragen?collectiefId=57805` | Werkt in de browser. De parameter verdwijnt uit de adresbalk (302), maar het collectief staat daarna ingevuld als "MKB Fidus 57805"; zonder parameter staat er niets ingevuld. |
| `https://www.onvz.nl/collectiviteiten?coll-nummer=9461` | Niet te controleren: onvz.nl gaf de hele dag 503 ("Op 12 november werken we aan onze website"). Geen link op de pagina; de rij verwijst naar het nummer en naar Fidus. |
| `https://www.fidus.nl/` | Werkt in de browser, maar stuurt door naar zichtadviseurs.nl: "Vanaf 1 oktober 2026 gaat Fidus verder als Zicht adviseurs". Met curl 403 (botbeveiliging). |
| `https://jabesverzekeringen.nl/contact/` | Werkt (200). |
| `tel:` en `mailto:` van Fidus en Jabes | Uit de inventaris, niet te testen. |

Niet overgenomen: de Outlook Safe Links-URL (met e-mailadres van een Fidus-medewerker) en de Mailchimp-parameters bij CZ.

## Weggelaten

- Losse verzekeraarlogo's, de dubbele knop naar dezelfde premie-pdf, het formulier "Newsletter Signup" (dev-notities).
- "De dekking is op veel plekken beter dan wanneer u dit individueel afsluit" staat alleen in de vraag in het CMS, niet in de vaste tekst.
- Premietabel 2027 met placeholders uit het ontwerp: vervangen door de echte tabellen uit het CMS (19 november 2026).
- Het blok "De premies volgen / tot die tijd de premies van 2026" en de drie pdf's van 2026 (uit het CMS verwijderd; de oude adressen verwijzen door naar deze pagina).

## Open voor OIG

- Nationale Nederlanden: premieoverzicht 2027 zegt "Max. 5%", de gecorrigeerde afdruk laat "max. 10%" staan. Op de site staat nu 5%.
- ONVZ natura-tabel 2027 (p. 3 van het premieoverzicht) lijkt een kopie van VGZ; juiste tabel opvragen bij Zicht Adviseurs.
- CZ "Tandarts Collectief tandarts": klopt die naam?
- Wie mag meedoen: "alle relaties van de Onderwijs Inkoop Groep", bedoeld als medewerkers van aangesloten besturen?
- Menzis: het collectief heet bij Menzis "MKB Fidus" (nummer 57805). Klopt dat voor de OIG?
- De aanmeldlink van Nationale Nederlanden blijft ditiszorg.nl/fidus (zo in het premieoverzicht 2027).
- Akkoord van Fidus en Jabes op het vermelden van hun contactgegevens.
- Bevestigen wat foto 090 toont (alt-tekst: "Presentatie voor een groep toehoorders op het kantoor van de Onderwijs Inkoop Groep").
