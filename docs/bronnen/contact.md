# Brontabel: Contact (`/contact/`)

Inventaris = `2026-10-16-dd-oig-site-inventaris.md` (regelnummers). Ontwerp = Paper "10 Contact en vacatures", artboard Contact.

| Sectie | Tekst (eerste woorden) | Bron | Vorm |
|---|---|---|---|
| Hero | Label "Contact", H1 "Neem gerust contact op" | Inventaris r. 2552 ("Neem gerust contact met ons op"), ontwerp | herschreven |
| Hero | "Heeft u vragen of wilt u meer informatie? Bel, mail of vul het formulier in. Wij nemen zo snel mogelijk contact met u op." | Inventaris r. 2552 (eerste zin) en r. 2891 (bedankpagina: "zo snel mogelijk contact") | herschreven |
| Kanalen | Telefoon, e-mail, adres | CMS `getSettings().contact` (gelijk aan inventaris r. 2559-2561) | letterlijk |
| Kanalen | "Plan uw route in Google Maps" naar maps.app.goo.gl/LLokstcKvPxrytis6 | Inventaris r. 2561 (zelfde link als live) | link letterlijk |
| Kanalen | KvK-regel | CMS `contact.kvk`; verborgen zolang leeg | n.v.t. |
| Formulier | "Stuur ons een bericht", "Velden met * zijn verplicht." | Ontwerp; gedeeld `ContactForm` | functioneel |
| Teamverwijzing | "Liever direct uw contactpersoon spreken? Op de teampagina vindt u onze collega's met hun directe telefoonnummer en e-mailadres." | Ontwerp; `PAGES['/ons-team/']` ("Met direct telefoonnummer en e-mail") | herschreven |
| Locatie | "Ons kantoor in Zeewolde", adres | Inventaris r. 2565-2566 ("Locatie van de OIG", "Wij zijn gevestigd in Zeewolde.") | herschreven |
| Locatie | Foto vergaderruimte | Klantmap, fotoshoot nr. 078 (zelfde foto als de hero van de live contactpagina, inventaris r. 2553) | nieuwe alt-tekst |

## Weggelaten ten opzichte van het ontwerp

- "Openingstijden" en "KvK" als placeholder: niet aangeleverd (regel 3). KvK verschijnt vanzelf zodra het in het CMS staat.
- "Bezoek ons" is "Ons adres" geworden: niet bevestigd dat bezoekers zonder afspraak kunnen langskomen.
- "uw vaste adviseur": niet in de inventaris als belofte terug te vinden; vervangen door "uw contactpersoon".
- Statische kaartafbeelding: vervangen door een foto van het kantoor plus de routelink (geen Google Maps, geen cookies).
- "Beveiligd met reCAPTCHA": de nieuwe site gebruikt geen reCAPTCHA.
- Organisatie is in het gedeelde formulier niet verplicht (ontwerp: verplicht).

## Open voor OIG

- KvK-nummer (ook voor de footer) en openingstijden.
- Naar welk adres gaan formulierberichten en wie volgt op?
- Kunnen bezoekers zonder afspraak langskomen? Dan kan "Ons adres" weer "Bezoek ons" worden.
