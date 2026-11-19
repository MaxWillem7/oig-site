import { expect, test } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { HANDLEIDING_DEEL_A } from '../src/lib/mcp/handleiding'

/**
 * De handleiding van de Claude-koppeling in het CMS (/admin/claude-koppeling).
 * Zonder account: de tekst is gelijk aan docs/CLAUDE-KOPPELING.md en de pagina vraagt om in te loggen.
 * Met account (CMS_EMAIL en CMS_PASSWORD, redacteur of beheerder): kop, adres met /api/mcp en de link in het menu.
 * Net als de andere CMS-tests na elkaar draaien (--workers=1): twee keer tegelijk inloggen met één account botst.
 */
const email = process.env.CMS_EMAIL
const password = process.env.CMS_PASSWORD

test('de handleiding in het CMS is gelijk aan deel A van docs/CLAUDE-KOPPELING.md', () => {
  const md = fs.readFileSync(path.resolve(process.cwd(), 'docs/CLAUDE-KOPPELING.md'), 'utf8')
  expect(md).toContain(HANDLEIDING_DEEL_A)
})

test('zonder inlog gaat de pagina naar het inlogscherm', async ({ page }) => {
  await page.goto('/admin/claude-koppeling')
  await expect(page).toHaveURL(/\/admin\/login/)
  await expect(page.locator('#field-email')).toBeVisible()
})

test.describe('ingelogd', () => {
  test.skip(!email || !password, 'CMS_EMAIL en CMS_PASSWORD zijn niet gezet')

  test('handleiding met adres en link in het menu', async ({ page, baseURL }) => {
    await page.goto('/admin/')
    await page.fill('#field-email', email!)
    await page.fill('#field-password', password!)
    await page.click('button[type=submit]')
    await expect(page.locator('.dashboard')).toBeVisible({ timeout: 20000 })

    // Verwijzing in het welkomstblok en de link in het zijmenu
    await expect(page.locator('.oig-welcome a[href="/admin/claude-koppeling"]')).toBeVisible()
    await expect(page.locator('#nav-claude-koppeling')).toBeAttached()

    await page.goto('/admin/claude-koppeling')
    await expect(page.getByRole('heading', { level: 1, name: 'De website bijwerken met Claude' })).toBeVisible()
    const adres = page.locator('.oig-kopieer__adres').first()
    await expect(adres).toHaveText(/\/api\/mcp$/)
    // Lokaal en op de preview: het adres van de site zelf (NEXT_PUBLIC_SITE_URL of het verzoekadres)
    if (baseURL && !process.env.NEXT_PUBLIC_SITE_URL) expect(await adres.textContent()).toContain(new URL(baseURL).host)
    await expect(page.getByRole('heading', { level: 2, name: 'De koppeling toevoegen (eenmalig, per persoon)' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Kopieer' }).first()).toBeVisible()

    // Geen horizontale scroll, ook op een telefoon
    const breed = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)
    expect(breed).toBe(false)
  })
})
