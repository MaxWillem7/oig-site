/**
 * Alle vaste pagina's van de site op één plek: adres, naam, titel en omschrijving.
 * Bron van titel en omschrijving: de paginaverslagen van 16 oktober 2026 (Ahrefs en Search Console).
 * Het CMS (Pagina's (SEO)) kan titel en omschrijving per pagina overschrijven.
 */
export type PageInfo = { name: string; title: string; description: string; noindex?: boolean }

export const PAGES = {
  '/': {
    name: 'Home',
    title: 'Onderwijs Inkoop Groep | Inkoopcollectief voor het PO',
    description:
      'Inkoopcollectief voor 400+ schoolbesturen in het primair onderwijs. Aanbesteden, inkoop, Premiedesk en subsidies. Meer budget voor het onderwijs.',
  },
  '/diensten/': {
    name: 'Diensten',
    title: 'Diensten voor schoolbesturen | Onderwijs Inkoop Groep',
    description:
      'Aanbesteden, inkoop, inkoopbeleid, subsidie, Whk-premie en verzekeringen: alle diensten van de Onderwijs Inkoop Groep voor schoolbesturen in het PO.',
  },
  '/dienst/aanbesteden/': {
    name: 'Aanbesteden',
    title: 'Aanbesteding onderwijs: hulp bij aanbesteden | OIG',
    description:
      'Hulp bij aanbesteden in het onderwijs: de OIG begeleidt schoolbesturen bij Europese en meervoudig onderhandse aanbestedingen, ook van leermiddelen.',
  },
  '/dienst/subsidiedesk/': {
    name: 'Subsidiedesk',
    title: 'Subsidie onderwijs aanvragen, no cure no pay | OIG',
    description:
      'Subsidie voor het onderwijs? De OIG Subsidiedesk vindt, vraagt aan en verantwoordt subsidies voor schoolbesturen. Geen toekenning, geen kosten.',
  },
  '/dienst/ondersteuning-inkoop/': {
    name: 'Ondersteuning bij inkoop',
    title: 'Gezamenlijke inkoop onderwijs: ICT, DAS en meer | OIG',
    description:
      'Ondersteuning bij inkoop voor schoolbesturen: van ICT via een dynamisch aankoopsysteem tot schoonmaak. 37% gemiddelde besparing bij onze klanten.',
  },
  '/dienst/ondersteuning-inkoop/inkoopsegmenten/': {
    name: 'Inkoopsegmenten',
    title: 'Inkoopsegmenten en schoolmeubilair aanbesteden | OIG',
    description:
      'Bekijk de 15 inkoopsegmenten van de OIG en de gemiddelde besparing per segment. Schoolmeubilair aanbesteden via ons dynamisch aankoopsysteem.',
  },
  '/dienst/premiedesk/': {
    name: 'Premiedesk',
    title: 'Whk-premie verlagen: WGA-scan en ZW-premie | OIG',
    description:
      'Grip op uw Whk-premie: de OIG Premiedesk controleert uw beschikking met de WGA-scan en helpt onnodige opslagen op de ZW-premie te voorkomen.',
  },
  '/dienst/verzekeringen/': {
    name: 'Verzekeringen',
    title: 'Collectiviteitskorting zorgverzekering onderwijs | OIG',
    description:
      'Tot 16% collectiviteitskorting op uw aanvullende zorgverzekering bij zes verzekeraars. Voor medewerkers in het onderwijs. Bekijk de premies 2027.',
  },
  '/inkoopbeleid/': {
    name: 'Inkoopbeleid',
    title: 'Inkoopbeleid onderwijs: rechtmatig inkopen | OIG',
    description:
      'Inkoopbeleid voor het onderwijs: de OIG helpt schoolbesturen bij opstellen en uitvoeren, van analyse en aanbestedingskalender tot borging in Mijn OIG.',
  },
  '/fietsplan-onderwijs/': {
    name: 'Fietsplan onderwijs',
    title: 'Fietsplan in het onderwijs: zo werkt de leasefiets | OIG',
    description:
      'Een fietsplan voor medewerkers in het onderwijs: hoe de leasefiets werkt, de voordelen en de gratis whitepaper. Voor schoolbesturen in het PO.',
  },
  '/whitepapers/': {
    name: 'Whitepapers',
    title: 'Gratis whitepapers over onderwijsinkoop | OIG',
    description:
      'Gratis whitepapers voor schoolbesturen over schoonmaak, schoolmeubilair, kopieerapparatuur en de leasefiets. Vraag ze direct aan.',
  },
  '/lp/kopieerapparaat/': {
    name: 'Whitepaper kopieerapparatuur',
    title: 'Printers en kopieerapparatuur aanschaffen: whitepaper | OIG',
    description:
      'Voorkom verborgen kosten in printer- en kopieercontracten. Gratis whitepaper met zeven inzichten voor schoolbesturen in het primair onderwijs.',
  },
  '/lp/meubilair/': {
    name: 'Whitepaper schoolmeubilair',
    title: 'Schoolmeubilair aanschaffen in 7 stappen: whitepaper | OIG',
    description:
      'Gratis whitepaper over schoolmeubilair aanschaffen: het Dynamisch Aankoopsysteem van de OIG, de zeven stappen en rechtmatig inkopen.',
  },
  '/lp/schoonmaak/': {
    name: 'Whitepaper schoonmaak',
    title: 'Schoonmaak aanbesteden voor scholen: whitepaper | OIG',
    description:
      'Gratis whitepaper over schoonmaak aanbesteden met een Dynamisch Aankoopsysteem (DAS): inzicht in kosten, kwaliteit en kansen voor lokale schoonmakers.',
  },
  '/werkwijze/': {
    name: 'Werkwijze',
    title: 'Werkwijze: beter inkopen in zeven stappen | OIG',
    description:
      'Zo werkt de Onderwijs Inkoop Groep: van kennismaking en inkoopscan tot onderhandeling, implementatie en borging van uw contracten. In zeven stappen.',
  },
  '/over-ons/': {
    name: 'Over ons',
    title: 'Over ons | Onderwijs Inkoop Groep',
    description:
      'De Onderwijs Inkoop Groep ondersteunt 400+ schoolbesturen in het primair onderwijs bij inkoop en aanbesteden. Lees onze missie, visie en waarden.',
  },
  '/ons-team/': {
    name: 'Ons team',
    title: 'Ons team en contactpersonen | Onderwijs Inkoop Groep',
    description:
      'Zoek uw contactpersoon bij de Onderwijs Inkoop Groep: inkoopadviseurs, aanbestedingsdesk, contractbeheer en directie. Met direct telefoonnummer en e-mail.',
  },
  '/referenties/': {
    name: 'Referenties',
    title: 'Referenties van schoolbesturen | Onderwijs Inkoop Groep',
    description:
      'Lees hoe schoolbesturen in het primair onderwijs de samenwerking met de Onderwijs Inkoop Groep ervaren: ervaringen van bestuurders en controllers.',
  },
  '/partners/': {
    name: 'Partners',
    title: 'Partners en leveranciers | Onderwijs Inkoop Groep',
    description:
      'Met deze leveranciers werkt de Onderwijs Inkoop Groep samen. Bewezen kwaliteit tegen scherpe markttarieven, zonder verplichtingen voor uw school.',
  },
  '/vacatures/': {
    name: 'Vacatures',
    title: 'Werken bij de Onderwijs Inkoop Groep | Vacatures',
    description:
      'Werken bij de Onderwijs Inkoop Groep in Zeewolde: bekijk onze vacatures voor inkoopadviseurs en dossierspecialisten en solliciteer direct.',
  },
  '/contact/': {
    name: 'Contact',
    title: 'Contact | Onderwijs Inkoop Groep, Zeewolde',
    description:
      'Neem contact op met de Onderwijs Inkoop Groep. Bel 036 820 10 00, mail info@onderwijsinkoopgroep.nl of plan een kennismaking. Gildenveld 3, Zeewolde.',
  },
  '/juridisch/': {
    name: 'Juridisch',
    title: 'Juridische documenten | Onderwijs Inkoop Groep',
    description: 'De privacyverklaring, het cookiebeleid en de algemene voorwaarden van de Onderwijs Inkoop Groep.',
  },
  '/juridisch/privacy-beleid/': {
    name: 'Privacyverklaring',
    title: 'Privacyverklaring | Onderwijs Inkoop Groep',
    description:
      'Lees hoe de Onderwijs Inkoop Groep omgaat met persoonsgegevens die u via onze website, formulieren en sollicitaties met ons deelt.',
  },
  '/juridisch/cookiebeleid/': {
    name: 'Cookiebeleid',
    title: 'Cookiebeleid | Onderwijs Inkoop Groep',
    description: 'Welke cookies de website van de Onderwijs Inkoop Groep gebruikt, waarvoor, en hoe u uw keuze aanpast.',
  },
  '/juridisch/algemene-voorwaarden/': {
    name: 'Algemene voorwaarden',
    title: 'Algemene voorwaarden | Onderwijs Inkoop Groep',
    description: 'De algemene voorwaarden van de Onderwijs Inkoop Groep, te lezen en te downloaden als pdf.',
  },
  '/bedankt/': {
    name: 'Bedankt',
    title: 'Bedankt | Onderwijs Inkoop Groep',
    description: 'Uw bericht is ontvangen.',
    noindex: true,
  },
} satisfies Record<string, PageInfo>

export type PagePath = keyof typeof PAGES
