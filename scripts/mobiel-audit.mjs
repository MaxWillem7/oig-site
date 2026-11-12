// Loopt alle pagina's na op telefoonformaat: onderdelen buiten beeld, te kleine tikdoelen, te kleine tekst.
// Gebruik: node scripts/mobiel-audit.mjs [breedte] (standaard 390). BASE_URL voor een ander adres.
import { chromium } from '@playwright/test'

const base = process.env.BASE_URL || 'http://localhost:3100'
const width = Number(process.argv[2] || 390)
const routes = [
  '/', '/diensten/', '/dienst/aanbesteden/', '/dienst/subsidiedesk/', '/dienst/ondersteuning-inkoop/',
  '/dienst/ondersteuning-inkoop/inkoopsegmenten/', '/dienst/premiedesk/', '/dienst/verzekeringen/', '/inkoopbeleid/',
  '/fietsplan-onderwijs/', '/whitepapers/', '/lp/kopieerapparaat/', '/lp/meubilair/', '/lp/schoonmaak/', '/werkwijze/',
  '/over-ons/', '/ons-team/', '/referenties/', '/partners/', '/vacatures/', '/vacatures/junior-inkoopadviseur-aanbestedingsdesk/',
  '/contact/', '/juridisch/', '/juridisch/privacy-beleid/', '/juridisch/cookiebeleid/', '/juridisch/algemene-voorwaarden/', '/bedankt/',
]
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true })
await page.addInitScript(() => localStorage.setItem('oig-cookies-v1', JSON.stringify({ analytics: false, marketing: false })))
let total = 0
for (const route of routes) {
  await page.goto(base + route, { waitUntil: 'networkidle' })
  const found = await page.evaluate(() => {
    const vw = window.innerWidth
    const out = { buiten: [], klein: [], tekst: [] }
    const visible = (el) => {
      const r = el.getBoundingClientRect()
      const st = getComputedStyle(el)
      return r.width > 0 && r.height > 0 && st.visibility !== 'hidden' && st.display !== 'none' && el.offsetParent !== null
    }
    const label = (el) => `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0].slice(0, 30)} "${(el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40)}"`
    // in een schuifbaar vak (tabel) mag inhoud breder zijn
    const inScroller = (el) => { for (let p = el.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if ((o === 'auto' || o === 'scroll' || o === 'hidden' || o === 'clip') && p !== document.body && p !== document.documentElement) return true } return false }
    for (const el of document.querySelectorAll('main *, header *, footer *')) {
      if (!visible(el)) continue
      const r = el.getBoundingClientRect()
      if ((r.right > vw + 1 || r.left < -1) && !inScroller(el) && out.buiten.length < 5) out.buiten.push(label(el) + ` [${Math.round(r.left)}..${Math.round(r.right)}]`)
    }
    for (const el of document.querySelectorAll('a, button, summary, input, select, textarea')) {
      if (!visible(el)) continue
      const r = el.getBoundingClientRect()
      const st = getComputedStyle(el)
      // lopende tekstlinks in een alinea tellen niet als knop
      const inline = st.display === 'inline' && el.closest('p, li, td, address, dd, figcaption')
      if (inline) continue
      if ((r.height < 32 || r.width < 32) && out.klein.length < 6) out.klein.push(label(el) + ` ${Math.round(r.width)}x${Math.round(r.height)}`)
    }
    const walker = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT)
    const seen = new Set()
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!n.nodeValue.trim()) continue
      const el = n.parentElement
      if (!el || seen.has(el) || !visible(el)) continue
      seen.add(el)
      const fs = parseFloat(getComputedStyle(el).fontSize)
      if (fs < 13 && out.tekst.length < 5) out.tekst.push(label(el) + ` ${fs}px`)
    }
    return out
  })
  const n = found.buiten.length + found.klein.length + found.tekst.length
  total += n
  if (n) {
    console.log(`\n${route}`)
    for (const [k, v] of Object.entries(found)) if (v.length) console.log(`  ${k}:`, v.join(' | '))
  }
}
console.log(`\n${routes.length} pagina's op ${width}px, ${total} bevindingen`)
await browser.close()
