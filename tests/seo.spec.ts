import { expect, test, type APIRequestContext } from '@playwright/test'
import { redirects } from '../redirects'
import { PAGES, type PageInfo } from '../src/lib/pages'

/**
 * Vindbaarheid: elke vaste pagina heeft kloppende basisgegevens, elk oud adres van de WordPress-site komt in
 * één stap op een pagina die bestaat, en sitemap, robots en llms.txt zijn er.
 * Draaien: npx playwright test tests/seo.spec.ts --project=desktop
 */

const pages = Object.entries(PAGES) as [string, PageInfo][]
const BASE = 'http://oud.test' // alleen om een Location-kop om te zetten naar een pad

/** Vraagt een adres op zonder redirects te volgen. Geeft de status en, bij een redirect, het pad waar het heen gaat. */
const hop = async (request: APIRequestContext, path: string) => {
  const res = await request.get(path, { maxRedirects: 0 })
  const location = res.headers()['location']
  const url = location ? new URL(location, BASE) : null
  return { status: res.status(), to: url ? url.pathname + url.search : null }
}

// ---------------------------------------------------------------------------------------------------------
// (a) Elke vaste pagina
// ---------------------------------------------------------------------------------------------------------
test.describe('vaste pagina', () => {
  for (const [path, info] of pages) {
    test(`${path} heeft h1, titel, omschrijving en canonical`, async ({ page }) => {
      const res = await page.goto(path)
      expect(res?.status(), 'status').toBe(200)

      await expect(page.locator('h1'), 'precies één h1').toHaveCount(1)

      const title = await page.title()
      expect(title.length, `titel is leeg`).toBeGreaterThan(0)
      expect(title.length, `titel hoogstens 60 tekens: "${title}"`).toBeLessThanOrEqual(60)

      const description = (await page.locator('head meta[name="description"]').getAttribute('content')) ?? ''
      // /bedankt/ is noindex en heeft bewust een korte omschrijving
      if (!info.noindex) {
        expect(description.length, `omschrijving minstens 50 tekens: "${description}"`).toBeGreaterThanOrEqual(50)
      }
      expect(description.length, `omschrijving hoogstens 160 tekens: "${description}"`).toBeLessThanOrEqual(160)

      const canonical = (await page.locator('head link[rel="canonical"]').getAttribute('href')) ?? ''
      expect(canonical, 'canonical eindigt op /').toMatch(/\/$/)
      expect(new URL(canonical).pathname, 'canonical wijst naar de pagina zelf').toBe(path)
    })
  }
})

// ---------------------------------------------------------------------------------------------------------
// (b) Oude adressen
// ---------------------------------------------------------------------------------------------------------

/** Oude adressen met een redirect: [oud adres, verwachte bestemming]. Zelfde lijst als docs/bronnen/redirects.md. */
const MOVED: [string, string][] = [
  // Leasefiets
  ['/lp/leasefiets/', '/fietsplan-onderwijs/'],
  ['/whitepaper-leasefiets-def/', '/fietsplan-onderwijs/'],
  // De acht PDF's uit de mediabibliotheek van de live site
  ['/wp-content/uploads/whitepaper-leasefiets-def.pdf', '/fietsplan-onderwijs/'],
  ['/wp-content/uploads/whitepaper-kopie-def.pdf', '/lp/kopieerapparaat/'],
  ['/wp-content/uploads/whitepaper-meubilair-def.pdf', '/lp/meubilair/'],
  ['/wp-content/uploads/whitepaper-schoonmaak-def.pdf', '/lp/schoonmaak/'],
  ['/wp-content/uploads/algemene-voorwaarden-oig.pdf', '/juridisch/algemene-voorwaarden/'],
  ['/wp-content/uploads/premie-overzicht-collectieve-zorgverzekering-oig-2026.pdf', '/dienst/verzekeringen/'],
  ['/wp-content/uploads/de-christelijke-zorgverzekeraar-2026-premietabel-15.pdf', '/dienst/verzekeringen/'],
  ['/wp-content/uploads/wijzigingsformulier-oig-2026.pdf', '/dienst/verzekeringen/'],
  // Vangnet premie-PDF's van eerdere jaren (exacte namen onbekend: patroon van 2026, hoofdletters, jaarmap)
  ['/wp-content/uploads/premie-overzicht-collectieve-zorgverzekering-oig-2025.pdf', '/dienst/verzekeringen/'],
  ['/wp-content/uploads/premie-overzicht-collectieve-zorgverzekering-oig-2024.pdf', '/dienst/verzekeringen/'],
  ['/wp-content/uploads/2019/11/Premieoverzicht-2019.pdf', '/dienst/verzekeringen/'],
  ['/wp-content/uploads/de-christelijke-zorgverzekeraar-2025-premietabel-15.pdf', '/dienst/verzekeringen/'],
  ['/wp-content/uploads/wijzigingsformulier-oig-2025.pdf', '/dienst/verzekeringen/'],
  // Vangnet overige uploads en WordPress-bestanden
  ['/wp-content/uploads/onbekend-document.pdf', '/'],
  ['/wp-content/uploads/oig-086.jpg', '/'],
  ['/wp-content/uploads/2025/03/oig-086-scaled.jpg', '/'],
  ['/wp-content/plugins/slim-seo/src/Sitemaps/style.xsl', '/'],
  // Teamleden en referenties
  ['/team/dick-goedhart/', '/ons-team/'],
  ['/team/2493/', '/ons-team/'],
  ['/team/', '/ons-team/'],
  ['/review/henk-hoek/', '/referenties/'],
  ['/review/albert-sluiter-essentius/', '/referenties/'],
  // Archief van de diensten
  ['/dienst/', '/diensten/'],
  // Blog, feeds, archieven
  ['/blog/', '/'],
  ['/blog/feed/', '/'],
  ['/blog/een-oud-bericht/', '/'],
  ['/feed/', '/'],
  ['/comments/feed/', '/'],
  ['/over-ons/feed/', '/'],
  ['/category/uncategorized/', '/'],
  ['/tag/inkoop/', '/'],
  ['/author/admin/', '/'],
  ['/page/2/', '/'],
  ['/search/aanbesteden/', '/'],
  // Stijlgids en WordPress-login
  ['/ui/', '/'],
  ['/login/', '/'],
  ['/wp-login.php', '/'],
  ['/wp-admin/', '/'],
  ['/wp-admin/admin-ajax.php', '/'],
  // Oude deelsitemaps
  ['/sitemap-post-type-page.xml', '/sitemap.xml'],
  ['/sitemap-post-type-lp.xml', '/sitemap.xml'],
  ['/sitemap-post-type-juridisch.xml', '/sitemap.xml'],
  ['/sitemap-post-type-dienst.xml', '/sitemap.xml'],
]

/** Oude adressen die hetzelfde blijven (inventaris sectie 1): moeten direct 200 geven, zonder redirect. */
const KEPT = [
  '/',
  '/over-ons/',
  '/ons-team/',
  '/vacatures/',
  '/vacatures/inkoopadviseur-relatiebeheerder/',
  '/vacatures/junior-inkoopadviseur-aanbestedingsdesk/',
  '/vacatures/medior-inkoopadviseur-aanbestedingsdesk/',
  '/vacatures/specialist-inkoopdossier/',
  '/diensten/',
  '/dienst/aanbesteden/',
  '/dienst/subsidiedesk/',
  '/dienst/ondersteuning-inkoop/',
  '/dienst/ondersteuning-inkoop/inkoopsegmenten/',
  '/dienst/premiedesk/',
  '/dienst/verzekeringen/',
  '/werkwijze/',
  '/referenties/',
  '/partners/',
  '/whitepapers/',
  '/inkoopbeleid/',
  '/lp/kopieerapparaat/',
  '/lp/meubilair/',
  '/lp/schoonmaak/',
  '/contact/',
  '/juridisch/',
  '/juridisch/algemene-voorwaarden/',
  '/juridisch/privacy-beleid/',
  '/juridisch/cookiebeleid/',
  '/bedankt/',
]

test.describe('oud adres met redirect', () => {
  for (const [from, to] of MOVED) {
    test(`${from} gaat in één stap naar ${to}`, async ({ request }) => {
      const first = await hop(request, from)
      expect(first.status, 'eerste antwoord is een permanente redirect (308)').toBe(308)
      expect(first.to, 'bestemming').toBe(to)

      const second = await hop(request, to)
      expect(second.status, `bestemming ${to} geeft 200 (geen tweede redirect, geen 404)`).toBe(200)
    })
  }
})

test.describe('oud adres dat blijft', () => {
  for (const path of KEPT) {
    test(`${path} geeft 200 zonder redirect`, async ({ request }) => {
      const res = await hop(request, path)
      expect(res.status, res.to ? `gaat naar ${res.to}` : 'status').toBe(200)
    })
  }
})

test.describe('redirectlijst', () => {
  test('elke bestemming is een vaste pagina of de sitemap', () => {
    const known = new Set([...Object.keys(PAGES), '/sitemap.xml'])
    const unknown = redirects.filter((r) => !known.has(r.destination)).map((r) => `${r.source} -> ${r.destination}`)
    expect(unknown).toEqual([])
  })

  test('geen redirect staat op het adres van een vaste pagina', () => {
    const taken = redirects.filter((r) => r.source in PAGES).map((r) => r.source)
    expect(taken).toEqual([])
  })

  test('elke regel is permanent', () => {
    expect(redirects.filter((r) => !r.permanent)).toEqual([])
  })

  test('elke vaste regel (zonder patroon) wordt hierboven getest', () => {
    const tested = new Set(MOVED.map(([from]) => from))
    const missing = redirects.filter((r) => !/[:(*]/.test(r.source) && !tested.has(r.source)).map((r) => r.source)
    expect(missing).toEqual([])
  })

  test('een nieuw adres zonder schuine streep krijgt er één (en geen 404)', async ({ request }) => {
    const res = await hop(request, '/over-ons')
    expect(res.status).toBe(308)
    expect(res.to).toBe('/over-ons/')
  })
})

// ---------------------------------------------------------------------------------------------------------
// (c) Sitemap, robots, llms.txt, deelafbeelding en favicon
// ---------------------------------------------------------------------------------------------------------
test.describe('bestanden voor zoekmachines', () => {
  test('/sitemap.xml geeft 200 en bevat elke indexeerbare pagina met schuine streep', async ({ request }) => {
    const res = await request.get('/sitemap.xml')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('xml')

    const locs = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    const paths = locs.map((loc) => new URL(loc).pathname)

    for (const [path, info] of pages) {
      if (info.noindex) expect(paths, `${path} is noindex en hoort er niet in`).not.toContain(path)
      else expect(paths, `${path} ontbreekt`).toContain(path)
    }
    expect(paths.filter((p) => !p.endsWith('/')), 'adressen zonder schuine streep').toEqual([])
    expect(new Set(locs).size, 'geen dubbele adressen').toBe(locs.length)
    expect(new Set(locs.map((loc) => new URL(loc).origin)).size, 'één domein').toBe(1)
  })

  test('elke vacature in de sitemap geeft 200', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    const vacancies = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => new URL(m[1]).pathname)
      .filter((p) => /^\/vacatures\/[^/]+\/$/.test(p))
    for (const path of vacancies) {
      expect((await hop(request, path)).status, path).toBe(200)
    }
  })

  test('/robots.txt geeft 200', async ({ request }) => {
    const res = await request.get('/robots.txt')
    expect(res.status()).toBe(200)
    expect(await res.text()).toMatch(/User-Agent: \*/i)
  })

  test('/llms.txt geeft 200 als markdown met naam, samenvatting en links naar bestaande pagina\'s', async ({ request }) => {
    const res = await request.get('/llms.txt')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('text/markdown')

    const text = await res.text()
    const lines = text.split('\n')
    expect(lines[0]).toBe('# Onderwijs Inkoop Groep')
    expect(lines.filter((l) => l.startsWith('# ')), 'precies één H1').toHaveLength(1)
    expect(lines.find((l) => l.startsWith('> ')), 'samenvatting als blockquote').toBeTruthy()
    for (const heading of ['## Diensten', '## Kennis', '## Organisatie', '## Contact']) {
      expect(lines, heading).toContain(heading)
    }

    const links = [...text.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => new URL(m[1]).pathname)
    expect(links.length).toBeGreaterThan(15)
    expect(links.filter((p) => !(p in PAGES)), 'links naar adressen die geen vaste pagina zijn').toEqual([])
    expect(text, 'geen em-dashes').not.toContain('—')
  })

  test('deelafbeelding en favicon bestaan', async ({ request }) => {
    const og = await request.get('/og.png')
    expect(og.status()).toBe(200)
    expect(og.headers()['content-type']).toContain('image/png')

    const icon = await request.get('/favicon.svg')
    expect(icon.status()).toBe(200)
    expect(icon.headers()['content-type']).toContain('image/svg+xml')

    expect((await request.get('/favicon.ico')).status()).toBe(200)
  })

  test('de home verwijst naar de deelafbeelding van 1200 bij 630', async ({ page }) => {
    await page.goto('/')
    const image = (await page.locator('head meta[property="og:image"]').first().getAttribute('content')) ?? ''
    expect(new URL(image).pathname).toBe('/og.png')
    await expect(page.locator('head meta[property="og:image:width"]').first()).toHaveAttribute('content', '1200')
    await expect(page.locator('head meta[property="og:image:height"]').first()).toHaveAttribute('content', '630')
  })
})
