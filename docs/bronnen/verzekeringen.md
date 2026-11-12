# Brontabel: Verzekeringen (`/dienst/verzekeringen/`)

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers bij benadering, sectie "Verzekeringen" r. 1725-1833). Ontwerp = Paper "05 Zorgverzekering" (desktop, mobiel,
dev-notities). Korting in de intro, premiejaar en melding komen uit `getSettings()`; premietabellen uit `getPremiumTables()`;
vragen uit het CMS (`FaqSection page="verzekeringen"`); PDF's uit `getDocument(...)`.

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
| Zo werkt het, stap 3 | "De korting wordt op uw polis doorgevoerd..." | Inventaris r. 1810, r. 1796, r. 1801 | ingekort |
| Tabel, label en kop | "Zorgverzekering onderwijs", "Zes zorgverzekeraars vergeleken" | Dev-notities (secundair zoekwoord), ontwerp | letterlijk |
| Tabel, inleiding | "De korting geldt op de aanvullende verzekering..." | Inventaris r. 1749-1786 ("Aanvullend: max. x% korting") | herschreven |
| Tabel, CZ | tot 16%, 3886964 | Inventaris r. 1749-1753 | letterlijk ("max." werd "tot") |
| Tabel, VGZ | tot 15%, 87711967 | Inventaris r. 1776-1780 | letterlijk |
| Tabel, De Christelijke Zorgverzekeraar | tot 15%, 205504273 | Inventaris r. 1782-1786 | letterlijk |
| Tabel, ONVZ | tot 10%, 9461 | Inventaris r. 1755-1759 | letterlijk |
| Tabel, Nationale Nederlanden | tot 10%, ditiszorg2240 | Inventaris r. 1761-1765 | letterlijk |
| Tabel, Menzis | tot 9%, 57805 | Inventaris r. 1767-1771 | letterlijk |
| Tabel, "Vragen via" | Fidus of Jabes verzekeringen | Inventaris r. 1796, r. 1801 | letterlijk |
| Onder de tabel | "Bent u al verzekerd bij VGZ of Menzis?..." | Inventaris r. 1810 (enige manier bij VGZ en Menzis, wijzigingsformulier voor de overige), r. 1803 (relatienummer naar Jabes) | herschreven |
| Wijzigingsformulier | "Download het wijzigingsformulier 2026 (pdf)" | CMS-document "Wijzigingsformulier 2026" (live: `wijzigingsformulier-oig-2026.pdf`, r. 1810) | nette link |
| Premies, kop | "Premieoverzicht {jaar}" | Ontwerp; jaar uit `insurance.year` | CMS |
| Premies, tabellen | per tabel titel, kolommen, rijen, toelichting | CMS-collectie Premietabellen (alleen gepubliceerd, actuele jaar) | CMS |
| Premies, melding | "De premies voor {jaar} volgen" plus melding | `insurance.notice` | CMS |
| Premies, 2026 | "Tot die tijd: de premies van 2026" met twee pdf's | CMS-documenten (live: r. 1744 en r. 1804) | nieuw kopje, bestaande bestanden |
| Contact, kop en inleiding | "Fidus en Jabes helpen u verder" / "Vragen over het collectief..." | Ontwerp; inventaris r. 1796, r. 1801 | herschreven |
| Contact, Fidus | 085 860 00 00, zorg.debilt@fidus.nl, www.fidus.nl | Inventaris r. 1796 (telefoon in één notatie volgens dev-notities) | letterlijk |
| Contact, Fidus, noot | "Liever het wijzigingsformulier gebruiken?..." | Inventaris r. 1810 | ingekort |
| Contact, Jabes | 0341 270 575, info@jabesverzekeringen.nl, jabesverzekeringen.nl/contact/ | Inventaris r. 1802 | letterlijk (telefoon zonder +31) |
| Contact, meeliften | "Meeliften in dit collectief? Mail dan naar..." | Inventaris r. 1803 | vrijwel letterlijk |
| Vragen | kop "Vragen over de collectieve zorgverzekering" | Dev-notities (zoekwoord); vragen zelf uit het CMS | CMS |
| CTA | "Bent u bestuurder of werkgever?" | Ontwerp; inventaris r. 1789 (inkoopvoordeel voor aangesloten scholen) | herschreven |

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
- Premietabel 2027 met placeholders uit het ontwerp: vervangen door de melding uit het CMS.

## Open voor OIG

- Premietabellen 2027 per verzekeraar (invoeren in het CMS) en de nieuwe pdf's 2027 (premieoverzicht, DCZ-premietabel, wijzigingsformulier).
- Kortingspercentages 2027 bevestigen (nu 16, 15, 15, 10, 10 en 9%).
- Wie mag meedoen: "alle relaties van de Onderwijs Inkoop Groep", bedoeld als medewerkers van aangesloten besturen?
- ONVZ: aanmeldlink opnieuw testen als onvz.nl weer bereikbaar is; daarna invullen in `src/components/zorg/content.ts`.
- Menzis: het collectief heet bij Menzis "MKB Fidus" (nummer 57805). Klopt dat voor de OIG?
- Fidus gaat sinds 1 oktober 2026 verder als Zicht adviseurs. Kloppen naam, zorg.debilt@fidus.nl, 085 860 00 00 en www.fidus.nl nog?
- Akkoord van Fidus en Jabes op het vermelden van hun contactgegevens.
- Bevestigen wat foto 090 toont (alt-tekst: "Presentatie voor een groep toehoorders op het kantoor van de Onderwijs Inkoop Groep").
