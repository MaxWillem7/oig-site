import { expect, test, type Page } from '@playwright/test'

/**
 * Gebruiker uitnodigen: een beheerder maakt een gebruiker zonder wachtwoord, ziet de uitnodigingslink, de nieuwe
 * gebruiker kiest zelf een wachtwoord en is daarna ingelogd als redacteur. Een gebruikte link geeft een nette melding.
 * Vraagt een beheerdersaccount en maakt een testgebruiker op example.com (wordt aan het eind verwijderd):
 *   CMS_ADMIN_EMAIL=... CMS_ADMIN_PASSWORD=... npx playwright test tests/cms-uitnodiging.spec.ts --workers=1
 * Alleen lokaal of op een testomgeving draaien, niet op de echte site.
 */
const adminEmail = process.env.CMS_ADMIN_EMAIL
const adminPassword = process.env.CMS_ADMIN_PASSWORD

test.describe.configure({ mode: 'serial' })
test.skip(!adminEmail || !adminPassword, 'CMS_ADMIN_EMAIL en CMS_ADMIN_PASSWORD zijn niet gezet')

async function login(page: Page) {
  await page.goto('/admin/')
  await page.fill('#field-email', adminEmail!)
  await page.fill('#field-password', adminPassword!)
  await page.click('button[type=submit]')
  await expect(page.locator('.dashboard')).toBeVisible({ timeout: 20000 })
}

test('beheerder nodigt uit, gebruiker kiest zelf een wachtwoord', async ({ page, browser }, info) => {
  test.setTimeout(150000)
  const email = `uitnodiging-${Date.now()}-${info.project.name}@example.com`

  await login(page)
  await page.goto('/admin/collections/users/create')
  await expect(page.getByText('Na opslaan krijgt deze persoon een e-mail')).toBeVisible({ timeout: 20000 })
  // Geen wachtwoordvelden bij aanmaken
  await expect(page.locator('#field-password')).toBeHidden()
  await page.waitForLoadState('networkidle')
  await page.fill('#field-naam', 'Testpersoon uitnodiging')
  await page.fill('#field-email', email)
  await page.locator('#action-save').click()
  await expect(page).toHaveURL(/\/admin\/collections\/users\/\d+/, { timeout: 20000 })
  const id = page.url().match(/users\/(\d+)/)![1]

  // De link staat in het formulier, met de melding of de mail is verstuurd
  const blok = page.getByTestId('uitnodiging')
  await expect(blok.locator('.oig-kopieer__adres')).toContainText('/admin/reset/', { timeout: 20000 })
  await expect(blok.getByRole('status')).toBeVisible()
  const link = (await blok.locator('.oig-kopieer__adres').textContent())!.trim()

  // Nieuwe, schone browser: wachtwoord kiezen via de link
  const schoon = await browser.newContext()
  const nieuw = await schoon.newPage()
  await nieuw.goto(link)
  await expect(nieuw.getByRole('heading', { name: 'Kies uw wachtwoord' })).toBeVisible({ timeout: 20000 })
  await nieuw.waitForLoadState('networkidle')
  const wachtwoord = `Test-${Date.now()}-wachtwoord`
  await nieuw.fill('#field-password', wachtwoord)
  await nieuw.fill('#field-confirm-password', wachtwoord)
  await nieuw.locator('button[type=submit]').click()
  await expect(nieuw.locator('.dashboard')).toBeVisible({ timeout: 20000 })
  // Ingelogd als redacteur: welkom, en geen gebruikersbeheer in het menu
  await expect(nieuw.getByRole('heading', { name: 'Welkom, Testpersoon uitnodiging' })).toBeVisible()
  await expect(nieuw.locator('#nav-users')).toHaveCount(0)
  const ik = await nieuw.request.get('/api/users/me', { headers: { origin: new URL(nieuw.url()).origin } })
  expect((await ik.json()).user?.role).toBe('redacteur')
  await schoon.close()

  // Dezelfde link nog een keer: nette melding
  const weer = await browser.newContext()
  const tweede = await weer.newPage()
  await tweede.goto(link)
  await tweede.waitForLoadState('networkidle')
  await tweede.fill('#field-password', `${wachtwoord}-2`)
  await tweede.fill('#field-confirm-password', `${wachtwoord}-2`)
  await tweede.locator('button[type=submit]').click()
  await expect(tweede.getByText('Deze link is verlopen of al gebruikt.', { exact: false })).toBeVisible({ timeout: 20000 })
  await weer.close()

  // Beheerder: link is gebruikt; opnieuw sturen geeft een nieuwe link
  await page.reload()
  await expect(blok).toContainText('geen geldige uitnodigingslink', { timeout: 20000 })
  await blok.getByRole('button', { name: 'Uitnodiging opnieuw sturen' }).click()
  await expect(blok.locator('.oig-kopieer__adres')).toContainText('/admin/reset/', { timeout: 20000 })
  expect((await blok.locator('.oig-kopieer__adres').textContent())!.trim()).not.toBe(link)

  // Opruimen
  // (Payload accepteert de inlogcookie alleen met een Origin van de site zelf)
  const weg = await page.request.delete(`/api/users/${id}`, { headers: { origin: new URL(page.url()).origin } })
  expect(weg.ok()).toBe(true)
})

test('zonder beheerdersrechten geen uitnodigingslink', async ({ request }) => {
  const res = await request.get('/api/users/1/uitnodiging')
  expect(res.status()).toBe(403)
})
