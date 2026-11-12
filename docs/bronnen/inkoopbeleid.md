# Brontabel Inkoopbeleid (/inkoopbeleid/)

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers). Live = https://www.onderwijsinkoopgroep.nl/inkoopbeleid/

| Sectie | Tekst (eerste woorden) | Bron | Vorm |
|---|---|---|---|
| Hero, H1 | Inkoopbeleid voor het onderwijs | Paginaverslag inkoopbeleid (SEO); live H1 inventaris 2230 | herschreven |
| Hero, intro | Bespaar kosten, voldoe aan wet- en regelgeving en creëer rust en overzicht ... | Inventaris 2231 | letterlijk |
| Hero, knop | Vraag een gratis inkoopscan aan (naar #inkoopscan) | Inventaris 2232 | letterlijk |
| Hero, foto's | oig-107 en oig-082 | Inventaris 2243 en 2273 (beide staan op de live pagina); klantmap `photos (2)/Kleur foto_s/` | alt nieuw geschreven op basis van het beeld |
| De basis, H2 en tekst | Een solide basis voor rechtmatige en efficiënte inkoop / Inkoopbeleid is de richtlijn die bepaalt ... | Inventaris 2238 en 2239 | letterlijk |
| De basis, vinklijst | creëert u grip op kosten en processen / krijgt u inzicht in leveranciersafspraken / bent u voorbereid op accountantscontroles | Inventaris 2240 tot 2242 | letterlijk |
| Wat wij doen, kop en tekst | Begeleiding van beleid tot praktijk / De Onderwijs Inkoop Groep ondersteunt schoolbesturen bij het opzetten én uitvoeren ... | Inventaris 2246 en 2247 | "schoolorganisaties in" werd "schoolbesturen bij"; dubbele zin weg |
| Wat wij doen, vier onderdelen | Juridische toetsing ... / Advies over centrale of decentrale inkoopstructuren / Monitoring van contracten via Mijn OIG / Begeleiding bij zowel Europese als onderhandse aanbestedingen | Inventaris 2249 tot 2252 | letterlijk |
| Link Mijn OIG | klantportaal | CMS (`getSettings().contact.portalUrl`) | niet getypt |
| Aanpak, kop en intro | Heldere aanpak, meetbare resultaten / U houdt overzicht en controle, zonder extra belasting voor uw organisatie | Inventaris 2255 en 2256 | letterlijk |
| Stap 1 tot 4 | Analyse / Aanbestedingskalender / Beleid verbeteren / Borgen in Mijn OIG | Inventaris 2256 | zinnen uit de alinea, opgeknipt in stappen; titels nieuw |
| Resultaat, H2 | Gemiddeld 37% besparing bij onze klanten | Inventaris 2265 (live: 29%); percentage uit CMS (`figures.saving`) | herschreven, cijfer niet getypt |
| Resultaat, tekst | Uit onze benchmark onder 2.700+ scholen blijkt dat goed inkoopbeleid direct loont ... | Inventaris 2266; aantal scholen uit CMS (`figures.schools`) | herschreven |
| Staafgrafiek | Kopieerapparaten 59% tot en met Onderwijs leerpakket 9% (16 segmenten) | Inventaris 2296 (inhoud van screenshot-2025-05-12 op de live pagina) | letterlijk overgenomen |
| Citaat | "Ik zie de OIG als een partner in het gehele inkoopbeleid ... Ook krijg ik gevraagd en ongevraagd advies." Edward van der Beek, beleidsmedewerker, Stichting Ommeriek | Inventaris 484 tot 486 en 1953 tot 1956 | ingekort, niet herschreven |
| Vragen | uit het CMS (`FaqSection page="inkoopbeleid"`) | CMS, collectie vragen | niet in de code |
| Inkoopscan, kop en tekst | Wilt u grip op uw inkoop en besparen op kosten? / Laat ons vrijblijvend meekijken ... | Inventaris 2270 en 2271 | letterlijk ("we" werd "wij") |
| Inkoopscan, formulier | `InkoopscanForm` (naam, organisatie, e-mail, telefoon, akkoord) | gedeeld onderdeel; inventaris 2272 | niet in de code |
| Contactgegevens | telefoon, e-mail, adres | CMS (`getSettings().contact`) | niet getypt |

## Weggelaten ten opzichte van het Paper-ontwerp of de live site

- "Een gemiddelde besparing van 29%": vervangen door het cijfer uit het CMS (nu 37%).
- Stap 2 "met de aanbestedingen die de komende tijd nodig zijn" (Paper): staat niet op de live site, ingekort tot wat er wel staat.
- Portret van Cor in de hero: portretten komen uit het CMS en zijn functie is onbekend. De hero toont twee fotoshootbeelden.
- Foto's ...-104 en ...-100 uit het ontwerp: dat zijn dartfoto's, de alt-tekst "adviseurs in overleg" zou niet kloppen. Vervangen door oig-107 (overleg bij whiteboard) en oig-082 (presentatie), die ook op de live pagina staan.
- Veld "Toelichting (optioneel)" uit het ontwerp: het gedeelde `InkoopscanForm` heeft dat veld niet.
- Teamfoto's michiel en dave, teamklok-collage, kapot anker #i, dubbele zin "Onze ondersteuning omvat:".

## Open voor OIG

- Bevestigen: gemiddelde besparing 37% (de live pagina zegt 29%, de homepage 37%). Het cijfer komt uit het CMS; past OIG het daar aan, dan verandert deze pagina mee.
- Bevestigen: de zestien segmentpercentages (afkomstig uit een schermafbeelding van mei 2025) en of 37% gemiddeld daarbij past.
- Bevestigen: "benchmark onder 2.700+ scholen" (live: 2.700).
- Keuze adres: /inkoopbeleid/ laten staan (nu gebouwd) of verplaatsen naar /dienst/inkoopbeleid/ met een 301.
- Wil OIG een toelichtingsveld in het inkoopscanformulier (zoals in het ontwerp)?
- Wil OIG het portret van Cor in de hero, dan graag zijn functie voor de alt-tekst.
