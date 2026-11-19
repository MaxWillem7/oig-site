import { expect, test } from '@playwright/test'
import { inSeason } from '../src/lib/seizoen'

// Standaardperiode uit Instellingen > Zorgverzekering: 15 november tot en met 15 januari (over de jaarwisseling).
const VAN = '2026-11-15T12:00:00.000Z'
const TOT = '2027-01-15T12:00:00.000Z'
const dag = (iso: string) => new Date(`${iso}T10:00:00+01:00`)

test('zorgseizoen loopt over de jaarwisseling en telt alleen dag en maand', () => {
  expect(inSeason(dag('2026-11-14'), VAN, TOT)).toBe(false)
  expect(inSeason(dag('2026-11-15'), VAN, TOT)).toBe(true)
  expect(inSeason(dag('2026-11-19'), VAN, TOT)).toBe(true)
  expect(inSeason(dag('2026-12-31'), VAN, TOT)).toBe(true)
  expect(inSeason(dag('2027-01-01'), VAN, TOT)).toBe(true)
  expect(inSeason(dag('2027-01-15'), VAN, TOT)).toBe(true)
  expect(inSeason(dag('2027-01-16'), VAN, TOT)).toBe(false)
  expect(inSeason(dag('2027-07-01'), VAN, TOT)).toBe(false)
  // Andere jaren in de opgeslagen datums maken niet uit
  expect(inSeason(dag('2031-12-01'), VAN, TOT)).toBe(true)
  // Periode binnen één jaar
  expect(inSeason(dag('2027-03-10'), '2027-03-01T12:00:00.000Z', '2027-03-31T12:00:00.000Z')).toBe(true)
  expect(inSeason(dag('2027-04-01'), '2027-03-01T12:00:00.000Z', '2027-03-31T12:00:00.000Z')).toBe(false)
  // Middernacht Nederlandse tijd is nog dezelfde dag, ook al is het in UTC de dag ervoor
  expect(inSeason(new Date('2026-11-14T23:30:00Z'), VAN, TOT)).toBe(true)
})

test('homepagina toont in het zorgseizoen Zorgverzekering in plaats van Subsidiedesk', async ({ page }) => {
  await page.goto('/')
  const tegels = page.locator('main section').first().getByRole('listitem')
  await expect(tegels).toHaveCount(4)
  if (inSeason(new Date(), VAN, TOT)) {
    const zorg = tegels.getByRole('link', { name: /Zorgverzekering/ })
    await expect(zorg).toHaveAttribute('href', '/dienst/verzekeringen/')
    await expect(zorg).toContainText('korting voor uw personeel')
    await expect(tegels.getByRole('link', { name: /Subsidiedesk/ })).toHaveCount(0)
  } else {
    await expect(tegels.getByRole('link', { name: /Subsidiedesk/ })).toHaveCount(1)
  }
})
