// Screenshot van een pagina: node scripts/shot.mjs <pad> <breedte> <uitvoer.png> [--full]
import { chromium } from '@playwright/test'

const [, , route = '/', width = '1440', out = 'shot.png', full] = process.argv
const base = process.env.BASE_URL || 'http://localhost:3100'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(width) < 600 ? 844 : 900 } })
// cookiemelding niet in beeld
await page.addInitScript(() => localStorage.setItem('oig-cookies-v1', JSON.stringify({ analytics: false, marketing: false })))
await page.goto(base + route, { waitUntil: 'networkidle' })
await page.evaluate(async () => {
  // lazy images laden
  for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 250)) }
  window.scrollTo(0, 0)
})
await page.waitForTimeout(1500)
await page.screenshot({ path: out, fullPage: full === '--full' })
await browser.close()
console.log(out)
