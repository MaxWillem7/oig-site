import { expect, test } from '@playwright/test'

const ROUTES = ['/', '/ontdek-jezus', '/events', '/muziek', '/boek-ons', '/artiesten', '/doe-mee', '/over-ons', '/nieuws', '/steun-ons', '/contact', '/privacy', '/cookies']

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
    expect(errors.filter((e) => !/Download the React DevTools|hydration|_vercel\/insights|status of 404/i.test(e))).toEqual([])
  })
}

test('onbekende pagina geeft 404', async ({ page }) => {
  const res = await page.goto('/bestaat-niet')
  expect(res?.status()).toBe(404)
})

test('detailpagina\'s uit het CMS werken', async ({ page }) => {
  for (const route of ['/muziek/nieuwe-energie', '/artiesten/howard-d', '/events/mars-voor-jezus-parijs']) {
    const res = await page.goto(route)
    expect(res?.status(), route).toBe(200)
  }
})

test('contactformulier toont fouten bij lege velden', async ({ page }) => {
  await page.goto('/contact')
  await page.waitForTimeout(2600)
  await page.locator('form:has(textarea) button[type=submit]').first().click()
  await expect(page.getByText('Dit veld is verplicht.').first()).toBeVisible()
})

test('formulier: na een fout opnieuw versturen slaat wel op', async ({ page }) => {
  await page.goto('/contact')
  await page.waitForTimeout(2600)
  const form = page.locator('form:has(textarea)').first()
  await form.locator('button[type=submit]').click()
  await expect(page.getByText('Dit veld is verplicht.').first()).toBeVisible()
  await form.getByLabel('Naam').fill('Playwright test')
  await form.getByLabel('E-mail').fill('test@example.com')
  await form.getByLabel('Bericht').fill('Automatische test, mag weg.')
  await form.locator('button[type=submit]').click()
  await expect(page.getByRole('status')).toContainText('Dank je')
})
