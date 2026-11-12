import { expect, test } from '@playwright/test'
import { PAGES } from '../src/lib/pages'

const ROUTES = [
  ...Object.keys(PAGES),
  '/vacatures/inkoopadviseur-relatiebeheerder/',
  '/vacatures/junior-inkoopadviseur-aanbestedingsdesk/',
  '/vacatures/medior-inkoopadviseur-aanbestedingsdesk/',
  '/vacatures/specialist-inkoopdossier/',
]

test.beforeEach(async ({ page }) => {
  // cookiemelding niet in beeld
  await page.addInitScript(() =>
    localStorage.setItem('oig-cookies-v1', JSON.stringify({ analytics: false, marketing: false })),
  )
})

for (const route of ROUTES) {
  test(`pagina ${route} laadt zonder fouten`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    const res = await page.goto(route)
    expect(res?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow, 'geen horizontale scroll').toBeLessThanOrEqual(1)
    // geen placeholders, Engelse resten of em-dashes in de zichtbare tekst
    const text = await page.locator('main').innerText()
    expect(text).not.toMatch(/\[aanleveren|lorem ipsum|placeholder|—/i)
    // elke afbeelding laadt en heeft een alt-attribuut
    const broken = await page.evaluate(async () => {
      const imgs = Array.from(document.images)
      await Promise.all(imgs.map((i) => (i.loading === 'lazy' ? (i.scrollIntoView(), i.decode().catch(() => {})) : i.decode().catch(() => {}))))
      return imgs.filter((i) => !i.hasAttribute('alt') || i.naturalWidth === 0).map((i) => i.currentSrc || i.src)
    })
    expect(broken, 'afbeeldingen zonder alt of die niet laden').toEqual([])
    expect(errors.filter((e) => !/Download the React DevTools|hydration|status of 404/i.test(e))).toEqual([])
  })
}

test('onbekende pagina geeft 404 met eigen pagina', async ({ page }) => {
  const res = await page.goto('/bestaat-niet/')
  expect(res?.status()).toBe(404)
  await expect(page.locator('h1')).toHaveCount(1)
})

test('contactformulier toont fouten per veld en slaat daarna op', async ({ page }) => {
  await page.goto('/contact/')
  await page.waitForTimeout(2800)
  const form = page.locator('form:has(textarea)').first()
  await form.locator('button[type=submit]').click()
  await expect(form.getByText('Dit veld is verplicht.').first()).toBeVisible()
  await expect(form.getByText('Vink dit aan om te kunnen versturen.')).toBeVisible()
  await form.getByLabel('Naam').fill('Playwright test')
  await form.getByLabel('E-mail').fill('test@example.com')
  await form.getByLabel('Bericht').fill('Automatische test, mag weg.')
  await form.locator('input[name=akkoord]').check({ force: true })
  await form.locator('button[type=submit]').click()
  await expect(page.getByRole('status')).toContainText('Dank u')
})

test('teampagina toont iedereen en zoeken werkt', async ({ page }) => {
  await page.goto('/ons-team/')
  await expect(page.getByRole('link', { name: /@onderwijsinkoopgroep\.nl/ }).first()).toBeVisible()
  const search = page.getByRole('searchbox').or(page.locator('input[type=search], input[type=text]')).first()
  await search.fill('stralen')
  await expect(page.getByRole('heading', { name: 'Cor van Stralen' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Heleen Gorlee' })).toBeHidden()
})
