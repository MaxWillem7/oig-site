/**
 * Redirects van oude adressen (WordPress) naar de nieuwe site. Elke oude URL en PDF hoort hier te staan
 * of een eigen pagina te hebben. Bron: digital-dudes/docs/plans/2026-10-16-dd-oig-site-inventaris.md en de
 * live site op 12 november 2026. De volledige tabel met bron per regel staat in docs/bronnen/redirects.md.
 *
 * Spelregels:
 * - `trailingSlash: true`: pagina-adressen staan hier mét de schuine streep aan het eind (zo schreef WordPress
 *   ze ook), bestanden (`.pdf`, `.php`, `.xml`) zonder. Dan gaat het oude adres in één stap (308) naar het nieuwe.
 * - De eerste regel die past wint: specifieke regels staan boven de vangnetten.
 * - Een bestemming is altijd een pagina uit `src/lib/pages.ts` (of `/sitemap.xml`), nooit een andere redirect.
 * - Redirects gaan vóór pagina's en bestanden in `public/`. Zet hier dus nooit een adres dat op de nieuwe site
 *   bestaat.
 */
type Redirect = { source: string; destination: string; permanent: boolean }

const UPLOADS = '/wp-content/uploads'

const to = (destination: string, sources: string[]): Redirect[] =>
  sources.map((source) => ({ source, destination, permanent: true }))

export const redirects: Redirect[] = [
  // Leasefiets: de landingspagina en het oude korte adres van de whitepaper gaan op in het fietsplan
  ...to('/fietsplan-onderwijs/', [
    '/lp/leasefiets/',
    '/whitepaper-leasefiets-def/',
    `${UPLOADS}/whitepaper-leasefiets-def.pdf`,
  ]),

  // Whitepapers als PDF: naar de landingspagina waar ze aan te vragen zijn
  ...to('/lp/kopieerapparaat/', [`${UPLOADS}/whitepaper-kopie-def.pdf`]),
  ...to('/lp/meubilair/', [`${UPLOADS}/whitepaper-meubilair-def.pdf`]),
  ...to('/lp/schoonmaak/', [`${UPLOADS}/whitepaper-schoonmaak-def.pdf`]),

  // Algemene voorwaarden als PDF
  ...to('/juridisch/algemene-voorwaarden/', [`${UPLOADS}/algemene-voorwaarden-oig.pdf`]),

  // Zorgverzekering: premieoverzichten, premietabellen en het wijzigingsformulier (2026 en alle eerdere jaren).
  // De eerste drie zijn de bestanden die nu op de live site staan; de laatste regel is het vangnet voor elke
  // andere PDF met "premie", "zorg" of "wijzigingsformulier" in de naam, ook in een jaar- of maandmap.
  ...to('/dienst/verzekeringen/', [
    `${UPLOADS}/premie-overzicht-collectieve-zorgverzekering-oig-2026.pdf`,
    `${UPLOADS}/de-christelijke-zorgverzekeraar-2026-premietabel-15.pdf`,
    `${UPLOADS}/wijzigingsformulier-oig-2026.pdf`,
    `${UPLOADS}/:bestand(.*(?:premie|zorg|wijzigingsformulier).*\\.pdf)`,
  ]),

  // Losse pagina's per teamlid en per referentie (WordPress maakte ze aan, niemand linkte ernaar)
  ...to('/ons-team/', ['/team/:pad*']),
  ...to('/referenties/', ['/review/:pad*']),

  // Archiefadres van de diensten (ging op de oude site ook al naar /diensten/)
  ...to('/diensten/', ['/dienst/']),

  // Oude deelsitemaps van Slim SEO
  ...to('/sitemap.xml', [
    '/sitemap-post-type-page.xml',
    '/sitemap-post-type-lp.xml',
    '/sitemap-post-type-juridisch.xml',
    '/sitemap-post-type-dienst.xml',
  ]),

  // Blog (leeg en noindex), feeds, archieven, zoekresultaten, stijlgids en de WordPress-login: naar de home.
  // De login van het nieuwe CMS staat op /admin; die wijzen we bewust niet aan vanaf openbare oude adressen.
  ...to('/', [
    '/blog/:pad*',
    '/feed/:pad*',
    '/comments/:pad*',
    '/:pad*/feed/',
    '/category/:pad*',
    '/tag/:pad*',
    '/author/:pad*',
    '/page/:pad*',
    '/search/:pad*',
    '/ui/',
    '/login/',
    '/wp-login.php',
    '/wp-admin/:pad*',
    // Vangnet: alle overige uploads (beeld, overige PDF's) en andere WordPress-bestanden
    '/wp-content/:pad*',
  ]),
]
