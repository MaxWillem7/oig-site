import { expect, test, type Page } from '@playwright/test'
import fs from 'fs'
import path from 'path'

/**
 * Wat een redacteur in het CMS doet en wat bezoekers daarvan zien: vacature, premietabel, vraag, foto.
 * Vraagt een account: CMS_EMAIL=... CMS_PASSWORD=... npx playwright test tests/cms-inhoud.spec.ts --project=desktop
 */
const email = process.env.CMS_EMAIL
const password = process.env.CMS_PASSWORD
const stamp = Date.now().toString().slice(-6)

test.describe.configure({ mode: 'serial' })
test.skip(!email || !password, 'CMS_EMAIL en CMS_PASSWORD zijn niet gezet')

async function login(page: Page) {
  await page.goto('/admin/')
  await page.fill('#field-email', email!)
  await page.fill('#field-password', password!)
  await page.click('button[type=submit]')
  await expect(page.locator('.dashboard')).toBeVisible({ timeout: 20000 })
}

/** Aanroep van de CMS-API vanuit de ingelogde browser (met het adres erbij, zoals bij echt gebruik). */
async function api(page: Page, method: string, url: string, body?: unknown) {
  return page.evaluate(
    async ({ method, url, body }) => {
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      })
      const json = await res.json().catch(() => null)
      return { status: res.status, json }
    },
    { method, url, body },
  )
}

const html = async (page: Page, url: string) => {
  const res = await page.request.get(`${url}?t=${Date.now()}`, { headers: { cookie: '' } })
  return { status: res.status(), text: await res.text() }
}

test('vacature: concept is onzichtbaar, gepubliceerd staat hij op de site, daarna weer weg', async ({ page }) => {
  await login(page)
  const title = `Testvacature ${stamp}`
  const slug = `testvacature-${stamp}`
  const created = await api(page, 'POST', '/api/vacatures?draft=true', {
    title,
    slug,
    teaser: 'Automatische test, mag weg.',
    hours: '24-32 uur',
    education: 'HBO',
    location: 'Zeewolde',
    intro: 'Dit is een testvacature.',
    profile: { items: [{ text: 'Je test graag' }] },
    _status: 'draft',
  })
  expect(created.status).toBe(201)
  const id = created.json.doc.id

  expect((await html(page, '/vacatures/')).text).not.toContain(title)
  expect((await html(page, `/vacatures/${slug}/`)).status).toBe(404)

  expect((await api(page, 'PATCH', `/api/vacatures/${id}`, { _status: 'published' })).status).toBe(200)
  await expect.poll(async () => (await html(page, '/vacatures/')).text.includes(title), { timeout: 20000 }).toBe(true)
  const detail = await html(page, `/vacatures/${slug}/`)
  expect(detail.status).toBe(200)
  expect(detail.text).toContain('"@type":"JobPosting"')
  expect(detail.text).toContain('Je test graag')
  expect((await html(page, '/sitemap.xml')).text).toContain(`/vacatures/${slug}/`)

  // Depubliceren: van de site, maar bewaard in het CMS
  expect((await api(page, 'PATCH', `/api/vacatures/${id}`, { _status: 'draft' })).status).toBe(200)
  await expect.poll(async () => (await html(page, `/vacatures/${slug}/`)).status, { timeout: 20000 }).toBe(404)
  expect((await api(page, 'DELETE', `/api/vacatures/${id}`)).status).toBe(200)
})

test('premietabel: verschijnt als echte tabel op de zorgpagina en vervangt de melding', async ({ page }) => {
  await login(page)
  const settings = await api(page, 'GET', '/api/globals/instellingen')
  const year = settings.json.insurance?.year ?? 2027
  const before = await html(page, '/dienst/verzekeringen/')
  const title = `Testverzekeraar ${stamp} ${year}`
  const created = await api(page, 'POST', '/api/premies', {
    title,
    year,
    insurer: `Testverzekeraar ${stamp}`,
    note: 'Automatische test, mag weg.',
    columns: [{ label: 'Premie per maand' }, { label: 'Met korting' }],
    rows: [{ label: 'Basis', cells: [{ value: '€ 150,00' }, { value: '€ 145,00' }] }],
    _status: 'published',
  })
  expect(created.status).toBe(201)
  const id = created.json.doc.id
  try {
    await expect
      .poll(async () => (await html(page, '/dienst/verzekeringen/')).text.includes(title), { timeout: 20000 })
      .toBe(true)
    const after = (await html(page, '/dienst/verzekeringen/')).text
    expect(after).toContain('€ 145,00')
    expect(after).toMatch(/<th[^>]*scope="col"[^>]*>Met korting/)
    expect(after).toMatch(/<caption/)
    // Een tabel van een ander jaar hoort niet op de pagina
    const other = await api(page, 'POST', '/api/premies', {
      title: `Oud jaar ${stamp}`,
      year: year - 3,
      insurer: 'Oud',
      columns: [{ label: 'Premie' }],
      rows: [{ label: 'Basis', cells: [{ value: '€ 1' }] }],
      _status: 'published',
    })
    expect((await html(page, '/dienst/verzekeringen/')).text).not.toContain(`Oud jaar ${stamp}`)
    await api(page, 'DELETE', `/api/premies/${other.json.doc.id}`)
  } finally {
    expect((await api(page, 'DELETE', `/api/premies/${id}`)).status).toBe(200)
  }
  await expect
    .poll(async () => (await html(page, '/dienst/verzekeringen/')).text.includes(title), { timeout: 20000 })
    .toBe(false)
  expect(before.text.includes(title)).toBe(false)
})

test('vraag en antwoord: staat op de pagina en in de gegevens voor zoekmachines', async ({ page }) => {
  await login(page)
  const question = `Is dit een testvraag ${stamp}?`
  const created = await api(page, 'POST', '/api/vragen', {
    question,
    answer: 'Ja, dit is een automatische test.',
    page: 'werkwijze',
    _status: 'published',
  })
  expect(created.status).toBe(201)
  try {
    await expect.poll(async () => (await html(page, '/werkwijze/')).text.includes(question), { timeout: 20000 }).toBe(true)
    expect((await html(page, '/werkwijze/')).text).toContain('"@type":"FAQPage"')
  } finally {
    expect((await api(page, 'DELETE', `/api/vragen/${created.json.doc.id}`)).status).toBe(200)
  }
})

test('foto uploaden en aan een teamlid hangen: portret staat op de teampagina', async ({ page }) => {
  await login(page)
  const file = path.resolve(process.cwd(), 'seed-assets/images/team-cor-van-stralen.jpg')
  const upload = await page.evaluate(
    async ({ b64, name }) => {
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
      const fd = new FormData()
      fd.append('file', new File([bytes], name, { type: 'image/jpeg' }))
      fd.append('_payload', JSON.stringify({ alt: 'Testportret, mag weg' }))
      const res = await fetch('/api/media', { method: 'POST', credentials: 'include', body: fd })
      return { status: res.status, json: await res.json().catch(() => null) }
    },
    { b64: fs.readFileSync(file).toString('base64'), name: `testportret-${stamp}.jpg` },
  )
  expect(upload.status).toBe(201)
  const mediaId = upload.json.doc.id
  const name = `Fototest ${stamp}`
  const member = await api(page, 'POST', '/api/team', {
    name,
    role: 'Testfunctie',
    group: 'kantoor',
    photo: mediaId,
    _status: 'published',
  })
  expect(member.status).toBe(201)
  try {
    await page.goto(`/ons-team/?t=${Date.now()}`)
    const img = page.locator(`img[alt*="Testportret"]`).first()
    await expect(img).toBeVisible({ timeout: 20000 })
    await img.scrollIntoViewIfNeeded()
    await expect.poll(() => img.evaluate((i: HTMLImageElement) => i.naturalWidth), { timeout: 20000 }).toBeGreaterThan(0)
  } finally {
    expect((await api(page, 'DELETE', `/api/team/${member.json.doc.id}`)).status).toBe(200)
    expect((await api(page, 'DELETE', `/api/media/${mediaId}`)).status).toBe(200)
  }
})

test('redacteur mag de kerncijfers wijzigen maar niet de ontvangers van formulieren', async ({ page }) => {
  await login(page)
  const current = (await api(page, 'GET', '/api/globals/instellingen')).json
  const changed = await api(page, 'POST', '/api/globals/instellingen', {
    figures: { ...current.figures, schools: '2.701+' },
    recipients: { ...current.recipients, contact: 'iemand-anders@example.com' },
  })
  expect(changed.status).toBe(200)
  try {
    const after = (await api(page, 'GET', '/api/globals/instellingen')).json
    expect(after.figures.schools).toBe('2.701+')
    expect(after.recipients?.contact ?? null, 'ontvangers blijven ongewijzigd').toBe(current.recipients?.contact ?? null)
    await expect.poll(async () => (await html(page, '/')).text.includes('2.701+'), { timeout: 20000 }).toBe(true)
  } finally {
    await api(page, 'POST', '/api/globals/instellingen', { figures: current.figures })
  }
  await expect.poll(async () => (await html(page, '/')).text.includes('2.701+'), { timeout: 20000 }).toBe(false)
})
