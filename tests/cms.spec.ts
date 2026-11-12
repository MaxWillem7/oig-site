import { expect, test, type Page } from '@playwright/test'

/**
 * Het CMS zoals een redacteur van OIG het gebruikt: inloggen, een teamlid toevoegen, wijzigen en verwijderen,
 * en controleren wat bezoekers op /ons-team/ zien. Vraagt een account:
 *   CMS_EMAIL=... CMS_PASSWORD=... npx playwright test tests/cms.spec.ts --project=desktop
 * Optioneel CMS_ADMIN_EMAIL en CMS_ADMIN_PASSWORD voor de test met gebruikersbeheer.
 */
const email = process.env.CMS_EMAIL
const password = process.env.CMS_PASSWORD
const adminEmail = process.env.CMS_ADMIN_EMAIL
const adminPassword = process.env.CMS_ADMIN_PASSWORD

const NAME = `Testpersoon ${Date.now().toString().slice(-6)}`

async function login(page: Page, user: string, pass: string) {
  await page.goto('/admin/')
  await page.fill('#field-email', user)
  await page.fill('#field-password', pass)
  await page.click('button[type=submit]')
  await expect(page.locator('.dashboard')).toBeVisible({ timeout: 20000 })
}

/** Staat deze naam op de openbare teampagina? Zonder cache van de browser. */
async function onSite(page: Page, name: string) {
  const res = await page.request.get(`/ons-team/?t=${Date.now()}`, { headers: { cookie: '' } })
  expect(res.status()).toBe(200)
  return (await res.text()).includes(name)
}

test.describe.configure({ mode: 'serial' })
test.skip(!email || !password, 'CMS_EMAIL en CMS_PASSWORD zijn niet gezet')

test('redacteur: teamlid toevoegen, wijzigen en verwijderen', async ({ page }) => {
  test.setTimeout(120000)
  await login(page, email!, password!)

  // Toevoegen als concept: nog niet op de site
  await page.goto('/admin/collections/team/create/')
  await page.fill('#field-name', NAME)
  await page.fill('#field-role', 'Testfunctie')
  await page.fill('#field-email', 'testpersoon@example.com')
  await page.click('#action-save-draft')
  await expect(page.locator('.payload-toast-container')).toContainText(/succesvol|opgeslagen|aangemaakt/i, { timeout: 20000 })
  expect(await onSite(page, NAME), 'concept staat niet op de site').toBe(false)

  // Publiceren: op de site
  await page.click('#action-save')
  await expect(page.locator('.payload-toast-container')).toContainText(/succesvol|aangepast|gepubliceerd/i, { timeout: 20000 })
  await expect.poll(() => onSite(page, NAME), { timeout: 20000 }).toBe(true)

  // Wijzigen en opnieuw publiceren
  await page.fill('#field-role', 'Gewijzigde testfunctie')
  await page.click('#action-save')
  await expect
    .poll(async () => (await (await page.request.get(`/ons-team/?t=${Date.now()}`)).text()).includes('Gewijzigde testfunctie'), {
      timeout: 20000,
    })
    .toBe(true)

  // Verwijderen: weg van de site en uit de lijst
  await page.locator('.doc-controls__popup button').first().click()
  await page.click('#action-delete')
  await page.click('#confirm-action')
  await expect(page).toHaveURL(/\/admin\/collections\/team\/?(\?.*)?$/, { timeout: 20000 })
  await expect.poll(() => onSite(page, NAME), { timeout: 20000 }).toBe(false)
  await expect(page.getByText(NAME)).toHaveCount(0)
})

test('redacteur ziet geen gebruikersbeheer', async ({ page }) => {
  await login(page, email!, password!)
  await expect(page.locator('.dashboard').getByText('Gebruikers')).toHaveCount(0)
  // Via de browser zelf, zodat het adres (Origin) meegaat zoals bij echt gebruik
  const result = await page.evaluate(async () => {
    const list = await fetch('/api/users?limit=50', { credentials: 'include' }).then((r) => r.json())
    const create = await fetch('/api/users', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'mag-niet@example.com', password: 'x-Y-z-123456', role: 'beheerder' }),
    })
    return { count: list.docs?.length, createStatus: create.status }
  })
  expect(result.count, 'alleen het eigen account').toBe(1)
  const create = { status: () => result.createStatus }
  expect(create.status(), 'redacteur mag geen gebruiker aanmaken').toBe(403)
})

test('beheerder kan een gebruiker toevoegen en verwijderen', async ({ page }) => {
  test.skip(!adminEmail || !adminPassword, 'CMS_ADMIN_EMAIL en CMS_ADMIN_PASSWORD zijn niet gezet')
  await login(page, adminEmail!, adminPassword!)
  await expect(page.locator('.dashboard').getByText('Gebruikers')).toBeVisible()
  const mail = `tijdelijk-${Date.now()}@example.com`
  const result = await page.evaluate(async (m) => {
    const created = await fetch('/api/users', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: m, password: 'Tijdelijk-123456!', naam: 'Tijdelijk', role: 'redacteur' }),
    })
    const id = created.ok ? (await created.json()).doc.id : null
    const removed = id ? await fetch(`/api/users/${id}`, { method: 'DELETE', credentials: 'include' }) : null
    return { created: created.status, removed: removed?.status }
  }, mail)
  expect(result.created).toBe(201)
  const removed = { status: () => result.removed }
  expect(removed.status()).toBe(200)
})

test('CMS op een telefoon: lijst als kaarten, teamlid openen, opslaan blijft bereikbaar', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  const page = await context.newPage()
  await login(page, email!, password!)
  const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(await overflow(), 'dashboard past in beeld').toBeLessThanOrEqual(1)

  // Menu openen en naar Team
  await page.locator('.app-header button:visible').first().click()
  await page.locator('.nav a', { hasText: 'Team' }).first().click()
  await expect(page).toHaveURL(/collections\/team/)
  await expect(page.locator('.table tbody tr').first()).toBeVisible()
  expect(await overflow(), 'teamlijst past in beeld').toBeLessThanOrEqual(1)
  // Elke rij is een kaart over de volle breedte, zonder zijwaarts schuiven
  await page.waitForLoadState('networkidle')
  const rows = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.collection-list .table tbody tr')).map((r) => Math.round(r.getBoundingClientRect().width)),
  )
  expect(rows.length).toBeGreaterThan(5)
  expect(Math.min(...rows), 'kaarten over de volle breedte').toBeGreaterThan(300)
  expect(Math.max(...rows)).toBeLessThanOrEqual(390)

  // Teamlid openen: velden en de knop Publiceren staan in beeld
  await page.locator('.table tbody tr a').first().click()
  await expect(page.locator('#field-name')).toBeVisible({ timeout: 20000 })
  expect(await overflow(), 'bewerkscherm past in beeld').toBeLessThanOrEqual(1)
  await page.locator('#field-email').scrollIntoViewIfNeeded()
  await expect(page.locator('#action-save')).toBeInViewport()
  await context.close()
})
