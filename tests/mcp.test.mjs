/**
 * Test van de Claude-koppeling: doorloopt de hele keten tegen de draaiende site.
 *
 *   npx tsx tests/mcp.test.mjs            (devserver op http://localhost:3100, of BASE_URL=...)
 *
 * Maakt via de Payload Local API een testgebruiker (rol redacteur), meldt een app aan, logt in via het
 * inlogscherm, ruilt de code om met PKCE en gebruikt daarna de officiële MCP-client (@modelcontextprotocol/sdk)
 * om tools aan te roepen. Ruimt alles wat hij maakt weer op.
 *
 * Onder Playwright (`npm test`) draait dit bestand als één test die het script start.
 */
import { createHash, randomBytes } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const BASE = (process.env.BASE_URL || 'http://localhost:3100').replace(/\/$/, '')
/** Het adres zoals een gebruiker het invoert; de site stuurt het door (308) naar de variant met een schuine streep. */
const RESOURCE = `${BASE}/api/mcp`
const MCP_URL = `${RESOURCE}/`

if (process.env.TEST_WORKER_INDEX !== undefined || process.argv.some((a) => a.includes('playwright'))) {
  const { test } = await import('@playwright/test')
  const { execFileSync } = await import('node:child_process')
  test('Claude-koppeling: OAuth, tools, concept en publiceren', ({}, info) => {
    test.skip(info.project.name !== 'desktop', 'één keer draaien is genoeg')
    test.setTimeout(180_000)
    execFileSync('npx', ['tsx', fileURLToPath(import.meta.url)], { stdio: 'inherit', env: { ...process.env, TEST_WORKER_INDEX: undefined } })
  })
} else {
  await main()
}

async function main() {
  await import('dotenv/config')
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config.ts')
  const { Client } = await import('@modelcontextprotocol/sdk/client/index.js')
  const { StreamableHTTPClientTransport } = await import('@modelcontextprotocol/sdk/client/streamableHttp.js')
  const { UnauthorizedError } = await import('@modelcontextprotocol/sdk/client/auth.js')

  let passed = 0
  const ok = (cond, label, detail = '') => {
    if (!cond) throw new Error(`MISLUKT: ${label}${detail ? ` (${detail})` : ''}`)
    passed++
    console.log(`  ok  ${label}`)
  }
  const stap = (titel) => console.log(`\n${titel}`)
  const sha = (v) => createHash('sha256').update(v).digest('hex')
  const b64 = (buf) => buf.toString('base64url')
  const form = (obj) => new URLSearchParams(obj).toString()
  const FORM = { 'Content-Type': 'application/x-www-form-urlencoded' }

  const payload = await getPayload({ config })
  const tag = randomBytes(4).toString('hex')
  const email = `mcp-test-${tag}@example.com`
  const password = b64(randomBytes(18))
  const naam = `Testpersoon Koppeling ${tag}`
  const appNaam = `mcp-test-${tag}`
  let user
  let teamId

  /** Speelt de browser: opent het inlogscherm, vult het formulier in en geeft terug waar de site naartoe doorstuurt. */
  const login = async (authorizeUrl, creds = { email, password }, actie = 'toestaan') => {
    const page = await fetch(authorizeUrl, { redirect: 'manual' })
    const html = await page.text()
    if (page.status !== 200) return { status: page.status, html, location: page.headers.get('location') }
    const hidden = Object.fromEntries([...html.matchAll(/<input type="hidden" name="([^"]+)" value="([^"]*)">/g)].map((m) => [m[1], m[2].replace(/&amp;/g, '&')]))
    const res = await fetch(String(authorizeUrl).split('?')[0], {
      method: 'POST',
      headers: { ...FORM, Origin: BASE },
      body: form({ ...hidden, ...creds, actie }),
      redirect: 'manual',
    })
    return { status: res.status, html: await res.text(), location: res.headers.get('location'), page: html }
  }

  const mcpRaw = (token, body = { jsonrpc: '2.0', id: 1, method: 'tools/list' }) =>
    fetch(MCP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    })

  /** Aanmelden, inloggen en code omruilen zonder de SDK, om elke stap los te kunnen controleren. */
  const rawFlow = async () => {
    const redirectUri = 'https://voorbeeld-app.example/callback'
    const reg = await fetch(`${BASE}/api/oauth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_name: appNaam, redirect_uris: [redirectUri], grant_types: ['authorization_code', 'refresh_token'], token_endpoint_auth_method: 'none' }),
    })
    const client = await reg.json()
    const verifier = b64(randomBytes(32))
    const challenge = b64(createHash('sha256').update(verifier).digest())
    const state = b64(randomBytes(8))
    const authorizeUrl = (extra = {}) =>
      `${BASE}/api/oauth/authorize/?${form({ response_type: 'code', client_id: client.client_id, redirect_uri: redirectUri, code_challenge: challenge, code_challenge_method: 'S256', state, resource: RESOURCE, ...extra })}`
    const token = (params) => fetch(`${BASE}/api/oauth/token/`, { method: 'POST', headers: FORM, body: form({ client_id: client.client_id, ...params }) })
    return { reg, client, redirectUri, verifier, state, authorizeUrl, token }
  }

  const publiek = async () => {
    const [rest, pagina] = await Promise.all([
      fetch(`${BASE}/api/team/?where[name][equals]=${encodeURIComponent(naam)}&depth=0`).then((r) => r.json()),
      fetch(`${BASE}/ons-team/`, { cache: 'no-store' }),
    ])
    const html = pagina.status === 200 ? await pagina.text() : null
    return { rest: rest.docs ?? [], paginaBestaat: html !== null, opPagina: html ? html.includes(naam) : false, html }
  }

  try {
    stap('Voorbereiding')
    user = await payload.create({ collection: 'users', data: { email, password, naam: 'Test Redacteur', role: 'redacteur' }, overrideAccess: true })
    ok(user.role === 'redacteur', `testgebruiker met rol redacteur gemaakt (${email})`)

    stap('1. Zonder inlog geen toegang')
    const geen = await mcpRaw(null)
    const wa = geen.headers.get('www-authenticate') || ''
    ok(geen.status === 401, 'zonder token: 401')
    const rm = /resource_metadata="([^"]+)"/.exec(wa)?.[1]
    ok(wa.startsWith('Bearer ') && rm === `${BASE}/.well-known/oauth-protected-resource/api/mcp`, 'WWW-Authenticate wijst naar resource_metadata', wa)
    const nep = await mcpRaw('oig_at_bestaatniet')
    ok(nep.status === 401 && (nep.headers.get('www-authenticate') || '').includes('error="invalid_token"'), 'onbekend token: 401 met invalid_token')
    const get = await fetch(MCP_URL)
    ok(get.status === 401, 'GET zonder token: 401')

    stap('2. Metadata')
    const prm = await fetch(rm).then((r) => r.json())
    const prmRoot = await fetch(`${BASE}/.well-known/oauth-protected-resource`).then((r) => r.json())
    ok(prm.resource === RESOURCE && prmRoot.resource === RESOURCE, 'protected resource metadata (beide adressen) noemt de MCP-server', prm.resource)
    ok(Array.isArray(prm.authorization_servers) && prm.authorization_servers[0] === BASE, 'authorization_servers wijst naar de site')
    const as = await fetch(`${BASE}/.well-known/oauth-authorization-server`).then((r) => r.json())
    ok(as.issuer === BASE, 'issuer klopt met het adres van de metadata')
    ok(as.code_challenge_methods_supported?.length === 1 && as.code_challenge_methods_supported[0] === 'S256', 'alleen PKCE S256')
    ok(as.registration_endpoint && as.token_endpoint && as.authorization_endpoint, 'registratie-, token- en inlogadres aanwezig')
    ok(as.token_endpoint_auth_methods_supported.includes('none') && as.grant_types_supported.includes('refresh_token'), 'openbare clients en refresh tokens')

    stap('3. Aanmelden van een app (dynamic client registration)')
    const f = await rawFlow()
    ok(f.reg.status === 201 && typeof f.client.client_id === 'string' && !('client_secret' in f.client), 'app aangemeld, zonder geheim')
    const fout = await fetch(`${BASE}/api/oauth/register/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ redirect_uris: ['http://kwaadaardig.example/cb'] }) })
    ok(fout.status === 400 && (await fout.json()).error === 'invalid_redirect_uri', 'terugkeeradres over http (niet localhost) geweigerd')

    stap('4. Inlogscherm')
    const vreemd = await fetch(f.authorizeUrl({ redirect_uri: 'https://aanvaller.example/callback' }), { redirect: 'manual' })
    ok(vreemd.status === 400 && !vreemd.headers.get('location'), 'niet-geregistreerd terugkeeradres: foutpagina, geen doorverwijzing')
    const onbekend = await fetch(f.authorizeUrl({ client_id: 'oig_bestaatniet' }), { redirect: 'manual' })
    ok(onbekend.status === 400 && !onbekend.headers.get('location'), 'onbekende app: foutpagina, geen doorverwijzing')
    const zonderPkce = await fetch(f.authorizeUrl({ code_challenge: '' }), { redirect: 'manual' })
    ok(zonderPkce.status === 303 && new URL(zonderPkce.headers.get('location')).searchParams.get('error') === 'invalid_request', 'zonder PKCE: invalid_request')
    const plain = await fetch(f.authorizeUrl({ code_challenge_method: 'plain' }), { redirect: 'manual' })
    ok(new URL(plain.headers.get('location')).searchParams.get('error') === 'invalid_request', 'PKCE plain geweigerd')
    const andereResource = await fetch(f.authorizeUrl({ resource: 'https://andere-server.example/mcp' }), { redirect: 'manual' })
    ok(new URL(andereResource.headers.get('location')).searchParams.get('error') === 'invalid_target', 'resource van een andere server geweigerd')

    const scherm = await fetch(f.authorizeUrl())
    const schermHtml = await scherm.text()
    ok(scherm.status === 200 && schermHtml.includes(appNaam) && schermHtml.includes('voorbeeld-app.example'), 'inlogscherm toont welke app toegang vraagt en waarheen hij terugkeert')
    ok((scherm.headers.get('content-security-policy') || '').includes("frame-ancestors 'none'"), 'inlogscherm kan niet in een frame')
    const fouteInlog = await login(f.authorizeUrl(), { email, password: 'verkeerd-wachtwoord' })
    ok(fouteInlog.status === 401 && !fouteInlog.location && fouteInlog.html.includes('klopt niet'), 'verkeerd wachtwoord: geen code, nette melding')
    const vanElders = await fetch(`${BASE}/api/oauth/authorize/`, { method: 'POST', headers: { ...FORM, Origin: 'https://aanvaller.example' }, body: form({ email, password }) })
    ok(vanElders.status === 403, 'formulier vanaf een andere site geweigerd')
    const geweigerd = await login(f.authorizeUrl(), { email, password }, 'weigeren')
    ok(new URL(geweigerd.location).searchParams.get('error') === 'access_denied', 'weigeren geeft access_denied terug aan de app')

    const goed = await login(f.authorizeUrl())
    const terug = new URL(goed.location)
    const code = terug.searchParams.get('code')
    ok(goed.status === 303 && terug.origin + terug.pathname === f.redirectUri && code, 'juiste inlog: terug naar de app met een code')
    ok(terug.searchParams.get('state') === f.state && terug.searchParams.get('iss') === BASE, 'state en iss komen mee terug')

    stap('5. Code omruilen met PKCE')
    const verkeerd = await f.token({ grant_type: 'authorization_code', code, code_verifier: b64(randomBytes(32)), redirect_uri: f.redirectUri, resource: RESOURCE })
    ok(verkeerd.status === 400 && (await verkeerd.json()).error === 'invalid_grant', 'verkeerde PKCE-verifier geweigerd')
    const andereUri = await f.token({ grant_type: 'authorization_code', code, code_verifier: f.verifier, redirect_uri: 'https://aanvaller.example/callback' })
    ok(andereUri.status === 400, 'ander terugkeeradres bij het omruilen geweigerd')
    const json = await fetch(`${BASE}/api/oauth/token/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })
    ok(json.status === 400, 'token-adres accepteert alleen formulierdata')
    const ruil = await f.token({ grant_type: 'authorization_code', code, code_verifier: f.verifier, redirect_uri: f.redirectUri, resource: MCP_URL })
    const tokens = await ruil.json()
    ok(ruil.status === 200 && tokens.token_type === 'Bearer' && tokens.access_token && tokens.refresh_token && tokens.expires_in <= 3600, 'juiste verifier: toegangstoken (hoogstens een uur) en verversingstoken')
    ok((await mcpRaw(tokens.access_token)).status === 200, 'toegangstoken werkt op de MCP-server')
    const opgeslagen = await payload.find({ collection: 'oauth-tokens', where: { user: { equals: user.id } }, limit: 50, overrideAccess: true, showHiddenFields: true })
    const hashes = opgeslagen.docs.map((d) => d.tokenHash)
    ok(hashes.includes(sha(tokens.access_token)) && hashes.includes(sha(tokens.refresh_token)), 'in de database staat de SHA-256-hash')
    ok(!JSON.stringify(opgeslagen.docs).includes(tokens.access_token) && !JSON.stringify(opgeslagen.docs).includes(tokens.refresh_token), 'het token zelf staat nergens in de database')

    stap('6. Verversen, verlopen en intrekken')
    const ververs = await f.token({ grant_type: 'refresh_token', refresh_token: tokens.refresh_token, resource: MCP_URL })
    const nieuw = await ververs.json()
    ok(ververs.status === 200 && nieuw.refresh_token && nieuw.refresh_token !== tokens.refresh_token && nieuw.access_token !== tokens.access_token, 'verversen geeft een nieuw toegangs- en verversingstoken')
    ok((await mcpRaw(tokens.access_token)).status === 401, 'het vorige toegangstoken werkt niet meer')
    const hergebruik = await f.token({ grant_type: 'refresh_token', refresh_token: tokens.refresh_token })
    ok(hergebruik.status === 400 && (await hergebruik.json()).error === 'invalid_grant', 'een gebruikt verversingstoken werkt niet nog eens (invalid_grant)')
    ok((await mcpRaw(nieuw.access_token)).status === 200, 'het nieuwe toegangstoken werkt')
    const rij = (await payload.find({ collection: 'oauth-tokens', where: { tokenHash: { equals: sha(nieuw.access_token) } }, limit: 1, overrideAccess: true })).docs[0]
    await payload.update({ collection: 'oauth-tokens', id: rij.id, data: { expiresAt: new Date(Date.now() - 1000).toISOString() }, overrideAccess: true })
    const verlopen = await mcpRaw(nieuw.access_token)
    ok(verlopen.status === 401 && (verlopen.headers.get('www-authenticate') || '').includes('resource_metadata='), 'verlopen token: 401 met de juiste header')
    // Een code die twee keer wordt aangeboden trekt alles van die inlog in.
    const f2 = await rawFlow()
    const code2 = new URL((await login(f2.authorizeUrl())).location).searchParams.get('code')
    const t2 = await (await f2.token({ grant_type: 'authorization_code', code: code2, code_verifier: f2.verifier, redirect_uri: f2.redirectUri })).json()
    ok((await mcpRaw(t2.access_token)).status === 200, 'tweede inlog werkt')
    const dubbel = await f2.token({ grant_type: 'authorization_code', code: code2, code_verifier: f2.verifier, redirect_uri: f2.redirectUri })
    ok(dubbel.status === 400, 'autorisatiecode werkt maar één keer')
    ok((await mcpRaw(t2.access_token)).status === 401, 'na hergebruik van de code zijn de tokens van die inlog ingetrokken')
    const f3 = await rawFlow()
    const code3 = new URL((await login(f3.authorizeUrl())).location).searchParams.get('code')
    const t3 = await (await f3.token({ grant_type: 'authorization_code', code: code3, code_verifier: f3.verifier })).json()
    const anderClient = await f2.token({ grant_type: 'refresh_token', refresh_token: t3.refresh_token })
    ok(anderClient.status === 400, 'verversingstoken werkt niet bij een andere app')
    const trekIn = await fetch(`${BASE}/api/oauth/revoke/`, { method: 'POST', headers: FORM, body: form({ token: t3.refresh_token, client_id: f3.client.client_id }) })
    ok(trekIn.status === 200 && (await mcpRaw(t3.access_token)).status === 401, 'ingetrokken token: 401')

    stap('7. Echte MCP-client (@modelcontextprotocol/sdk): ontdekken, aanmelden, inloggen, tools')
    const opslag = {}
    let authorizeUrl
    const provider = {
      get redirectUrl() {
        return 'http://localhost:53999/callback'
      },
      get clientMetadata() {
        return { client_name: appNaam, redirect_uris: ['http://localhost:53999/callback'], grant_types: ['authorization_code', 'refresh_token'], response_types: ['code'], token_endpoint_auth_method: 'none' }
      },
      clientInformation: () => opslag.client,
      saveClientInformation: (c) => void (opslag.client = c),
      tokens: () => opslag.tokens,
      saveTokens: (t) => void (opslag.tokens = t),
      redirectToAuthorization: (url) => void (authorizeUrl = url),
      saveCodeVerifier: (v) => void (opslag.verifier = v),
      codeVerifier: () => opslag.verifier,
    }
    // Zonder schuine streep aan het eind: Next stuurt door (308) naar /api/mcp/; de client hoort dat te volgen.
    const zonderSlash = RESOURCE
    let transport = new StreamableHTTPClientTransport(new URL(zonderSlash), { authProvider: provider })
    let client = new Client({ name: appNaam, version: '1.0.0' })
    let moestInloggen = false
    try {
      await client.connect(transport)
    } catch (e) {
      if (!(e instanceof UnauthorizedError)) throw e
      moestInloggen = true
    }
    ok(moestInloggen && authorizeUrl, 'de client vindt zelf het inlogadres (metadata) en meldt zich aan')
    const au = new URL(authorizeUrl)
    ok(au.searchParams.get('code_challenge_method') === 'S256' && au.searchParams.get('resource'), 'de client stuurt PKCE S256 en resource mee', au.searchParams.get('resource') ?? '')
    ok(au.searchParams.get('resource') === RESOURCE, 'resource is het adres van de MCP-server')
    {
      // Ook wie het adres mét schuine streep invoert, komt door de controle van de client heen.
      let url2
      const p2 = { ...provider, clientInformation: () => undefined, saveClientInformation: () => {}, tokens: () => undefined, redirectToAuthorization: (u) => void (url2 = u), saveCodeVerifier: () => {} }
      Object.defineProperties(p2, { redirectUrl: { get: () => provider.redirectUrl }, clientMetadata: { get: () => provider.clientMetadata } })
      await new Client({ name: appNaam, version: '1.0.0' }).connect(new StreamableHTTPClientTransport(new URL(MCP_URL), { authProvider: p2 })).catch(() => {})
      ok(Boolean(url2), 'het adres met een schuine streep aan het eind werkt ook')
    }
    const sdkLogin = await login(authorizeUrl)
    ok(sdkLogin.page.includes('eigen computer'), 'inlogscherm waarschuwt bij een app op de eigen computer')
    const sdkTerug = new URL(sdkLogin.location)
    ok(sdkTerug.port === '53999' && sdkTerug.searchParams.get('code'), 'terug naar de app op localhost met een code')
    await transport.finishAuth(sdkTerug.searchParams.get('code'))
    transport = new StreamableHTTPClientTransport(new URL(zonderSlash), { authProvider: provider })
    client = new Client({ name: appNaam, version: '1.0.0' })
    await client.connect(transport)
    ok(client.getServerVersion()?.name === 'oig-website', `verbonden via ${zonderSlash} (protocol ${transport.protocolVersion ?? 'onbekend'})`)
    ok((client.getInstructions() || '').includes('concept'), 'de server geeft instructies mee')

    const { tools } = await client.listTools()
    const namen = tools.map((t) => t.name).sort()
    const verwacht = ['concepten', 'kerncijfers_lezen', 'overzicht', 'premies_lijst', 'premietabel_lezen', 'premietabel_opslaan', 'publiceren', 'team_lezen', 'team_lijst', 'team_opslaan', 'team_verwijderen', 'vacature_lezen', 'vacature_opslaan', 'vacature_sluiten', 'vacatures_lijst', 'vraag_opslaan', 'vraag_verwijderen', 'vragen_lijst']
    ok(JSON.stringify(namen) === JSON.stringify(verwacht), `tools/list geeft ${tools.length} tools`, namen.join(','))
    const hint = (n) => tools.find((t) => t.name === n).annotations
    ok(hint('team_lijst').readOnlyHint === true && hint('team_opslaan').readOnlyHint === false && hint('team_opslaan').destructiveHint === false && hint('team_verwijderen').destructiveHint === true, 'annotaties (alleen lezen, verwijderen) kloppen')
    ok(tools.every((t) => t.description && t.inputSchema?.type === 'object'), 'elke tool heeft een beschrijving en een invoerschema')

    const roep = async (name, args = {}) => {
      const res = await client.callTool({ name, arguments: args })
      const text = res.content?.[0]?.text ?? ''
      let data
      try {
        data = JSON.parse(text)
      } catch {
        data = null
      }
      return { fout: Boolean(res.isError), text, data }
    }

    stap('8. Lezen')
    const overzicht = await roep('overzicht')
    ok(!overzicht.fout && overzicht.data.rol === 'redacteur' && 'team' in overzicht.data, 'overzicht werkt en draait als de redacteur')
    const cijfers = await roep('kerncijfers_lezen')
    ok(!cijfers.fout && cijfers.data.kerncijfers && !cijfers.text.includes('recipients') && !cijfers.text.includes('ontvangers'), 'kerncijfers lezen, zonder de interne ontvangers van formulieren')

    stap('9. Teamlid opslaan als concept')
    const zonderFunctie = await roep('team_opslaan', { naam })
    ok(zonderFunctie.fout && zonderFunctie.text.includes('functie'), 'nieuw teamlid zonder functie: nette melding')
    const teLang = await roep('team_opslaan', { naam: 'x'.repeat(500), functie: 'Test' })
    ok(teLang.fout, 'te lange invoer geweigerd')
    const nieuwLid = await roep('team_opslaan', { naam, functie: 'Testfunctie', groep: 'kantoor', email: `lid-${tag}@example.com`, volgorde: 999 })
    ok(!nieuwLid.fout && nieuwLid.data.opgeslagen.id, 'teamlid opgeslagen', nieuwLid.text)
    teamId = nieuwLid.data.opgeslagen.id
    ok(nieuwLid.data.status.startsWith('concept') && /nog niet live/.test(nieuwLid.data.let_op), 'antwoord zegt dat het een concept is en nog niet live staat')
    ok(nieuwLid.data.preview?.startsWith(`${BASE}/api/preview?path=%2Fons-team%2F`), 'antwoord bevat de previewlink naar de teampagina')

    let p = await publiek()
    const inDb = await payload.find({ collection: 'team', where: { and: [{ name: { equals: naam } }, { _status: { equals: 'published' } }] }, overrideAccess: true })
    ok(inDb.totalDocs === 0, 'Local API: niet gepubliceerd')
    ok(p.rest.length === 0, 'openbare API (zonder inlog): concept niet zichtbaar')
    if (p.paginaBestaat) ok(!p.opPagina, 'openbare teampagina /ons-team/: concept staat er NIET op')
    else console.log('  let op: /ons-team/ geeft nu geen 200 (pagina nog in aanbouw); gecontroleerd via de Local API en de openbare API')

    const prev = await fetch(nieuwLid.data.preview, { redirect: 'manual' })
    const prev2 = [301, 307, 308].includes(prev.status) && !prev.headers.get('set-cookie') ? await fetch(new URL(prev.headers.get('location'), BASE), { redirect: 'manual' }) : prev
    const cookies = (prev2.headers.getSetCookie?.() ?? []).map((c) => c.split(';')[0]).join('; ')
    ok([302, 303, 307].includes(prev2.status) && cookies.includes('__prerender_bypass'), 'previewlink is geldig en zet de voorvertoning aan')
    if (p.paginaBestaat) {
      const metPreview = await fetch(`${BASE}/ons-team/`, { headers: { Cookie: cookies }, cache: 'no-store' }).then((r) => r.text())
      ok(metPreview.includes(naam), 'via de previewlink staat het concept WEL op /ons-team/')
    } else {
      const concept = await payload.find({ collection: 'team', draft: true, where: { name: { equals: naam } }, overrideAccess: true })
      ok(concept.totalDocs === 1, 'Local API (concepten): het teamlid is er als concept')
    }
    const vervalst = await fetch(nieuwLid.data.preview.replace(/sig=.{4}/, 'sig=0000'), { redirect: 'follow' })
    ok(vervalst.status === 401, 'een aangepaste previewlink werkt niet')

    const wacht = await roep('concepten')
    ok(wacht.data.concepten.some((c) => c.collectie === 'team' && c.id === teamId && c.soort.startsWith('nieuw') && c.preview), 'tool concepten noemt het teamlid, met previewlink')

    stap('10. Publiceren')
    const pub = await roep('publiceren', { documenten: [{ collectie: 'team', id: teamId }] })
    ok(!pub.fout && pub.data.resultaat[0].resultaat === 'gepubliceerd', 'publiceren gelukt', pub.text)
    p = await publiek()
    ok(p.rest.length === 1 && p.rest[0].role === 'Testfunctie', 'openbare API: het teamlid staat nu live')
    if (p.paginaBestaat) ok(p.opPagina, 'openbare teampagina /ons-team/: het teamlid staat er nu WEL op')

    stap('11. Gepubliceerd teamlid wijzigen: concept naast de live versie')
    const wijzig = await roep('team_opslaan', { id: teamId, functie: 'Gewijzigde functie' })
    ok(!wijzig.fout && wijzig.data.status.includes('vorige gepubliceerde versie'), 'wijziging opgeslagen als concept')
    p = await publiek()
    ok(p.rest[0]?.role === 'Testfunctie', 'op de site staat nog de gepubliceerde versie')
    if (p.paginaBestaat) ok(p.opPagina && !p.html.includes('Gewijzigde functie'), 'teampagina toont nog de oude functie')
    const gelezen = await roep('team_lezen', { id: teamId })
    ok(gelezen.data.functie === 'Gewijzigde functie' && gelezen.data.naam === naam && gelezen.data.status.includes('wijziging'), 'team_lezen geeft de conceptversie, overige velden bleven staan')
    await roep('publiceren', { documenten: [{ collectie: 'team', id: teamId }] })
    p = await publiek()
    ok(p.rest[0]?.role === 'Gewijzigde functie', 'na publiceren staat de wijziging live')
    const pubFout = await roep('publiceren', { documenten: [{ collectie: 'team', id: 99999999 }] })
    ok(pubFout.data.resultaat[0].resultaat === 'niet gepubliceerd', 'publiceren van een onbekend id geeft een nette melding')

    stap('12. Premietabel: rijen en kolommen moeten kloppen')
    const scheef = await roep('premietabel_opslaan', { titel: `Test ${tag}`, jaar: 2099, verzekeraar: 'Test', kolommen: ['Premie', 'Met korting'], rijen: [{ pakket: 'Basis', waarden: ['1'] }] })
    ok(scheef.fout && scheef.text.includes('2 kolommen'), 'rij met te weinig waarden geweigerd')
    const tabel = await roep('premietabel_opslaan', { titel: `Test ${tag}`, jaar: 2099, verzekeraar: 'Test', kolommen: ['Premie', 'Met korting'], rijen: [{ pakket: 'Basis', waarden: ['€ 1', '€ 0,90'] }] })
    ok(!tabel.fout && tabel.data.preview.includes('verzekeringen'), 'kloppende tabel opgeslagen als concept, preview naar de zorgpagina')
    const tabelFout = await roep('premietabel_opslaan', { id: tabel.data.opgeslagen.id, kolommen: ['Premie'] })
    ok(tabelFout.fout, 'kolommen wijzigen zonder de rijen aan te passen geweigerd')
    await payload.delete({ collection: 'premies', id: tabel.data.opgeslagen.id, overrideAccess: true })

    stap('13. Vacature en vraag (concept, sluiten, verwijderen)')
    const vac = await roep('vacature_opslaan', { titel: `Testvacature ${tag}`, korte_omschrijving: 'Alleen voor de test.', wat_ga_je_doen: { punten: ['Testen', 'Opruimen'] } })
    ok(!vac.fout && vac.data.preview.includes(encodeURIComponent(`/vacatures/testvacature-${tag}/`)), 'vacature als concept, preview naar het eigen adres', vac.text)
    const vacId = vac.data.opgeslagen.id
    // Dezelfde controle op een echte pagina: het vacature-overzicht.
    const overzichtPagina = async (cookie) => {
      const r = await fetch(`${BASE}/vacatures/`, { headers: cookie ? { Cookie: cookie } : {}, cache: 'no-store' })
      return r.status === 200 ? (await r.text()).includes(`Testvacature ${tag}`) : null
    }
    const vacVoor = await overzichtPagina()
    if (vacVoor === null) console.log('  let op: /vacatures/ geeft nu geen 200; paginacontrole overgeslagen')
    else {
      ok(vacVoor === false, 'openbare pagina /vacatures/: het concept staat er NIET op')
      const pv = await fetch(vac.data.preview, { redirect: 'manual' })
      const pv2 = [301, 308].includes(pv.status) ? await fetch(new URL(pv.headers.get('location'), BASE), { redirect: 'manual' }) : pv
      const pvCookie = (pv2.headers.getSetCookie?.() ?? []).map((c) => c.split(';')[0]).join('; ')
      ok((await overzichtPagina(pvCookie)) === true, 'met de voorvertoning aan (previewlink) staat het concept WEL op /vacatures/')
    }
    await roep('publiceren', { documenten: [{ collectie: 'vacatures', id: vacId }] })
    if (vacVoor !== null) ok((await overzichtPagina()) === true, 'na publiceren staat de vacature op de openbare pagina /vacatures/')
    const vacLive = await fetch(`${BASE}/api/vacatures/${vacId}/?depth=0`)
    ok(vacLive.status === 200, 'vacature staat live')
    const dicht = await roep('vacature_sluiten', { id: vacId })
    const vacWeg = await fetch(`${BASE}/api/vacatures/${vacId}/?depth=0`)
    ok(!dicht.fout && vacWeg.status !== 200, 'vacature_sluiten haalt hem van de site')
    if (vacVoor !== null) ok((await overzichtPagina()) === false, 'na sluiten staat de vacature niet meer op /vacatures/')
    const vacNog = await roep('vacature_lezen', { id: vacId })
    ok(vacNog.data.wat_ga_je_doen.punten.length === 2 && vacNog.data.status.startsWith('concept'), 'de vacature blijft bewaard als concept')
    await payload.delete({ collection: 'vacatures', id: vacId, overrideAccess: true })
    const vraag = await roep('vraag_opslaan', { vraag: `Testvraag ${tag}?`, antwoord: 'Testantwoord.', pagina: 'werkwijze' })
    ok(!vraag.fout && vraag.data.preview.includes('werkwijze'), 'vraag als concept, preview naar de juiste pagina')
    const vraagNee = await roep('vraag_verwijderen', { id: vraag.data.opgeslagen.id })
    ok(vraagNee.fout && vraagNee.text.includes('bevestig'), 'verwijderen zonder bevestig: true gebeurt niet')
    const vraagJa = await roep('vraag_verwijderen', { id: vraag.data.opgeslagen.id, bevestig: true })
    ok(!vraagJa.fout, 'verwijderen met bevestig: true gelukt')

    stap('14. Rem op schrijfacties per token')
    const sdkRij = (await payload.find({ collection: 'oauth-tokens', where: { tokenHash: { equals: sha(opslag.tokens.access_token) } }, limit: 1, overrideAccess: true })).docs[0]
    await payload.update({ collection: 'oauth-tokens', id: sdkRij.id, data: { writeCount: 40, writeWindowStart: new Date().toISOString() }, overrideAccess: true })
    const geremd = await roep('team_opslaan', { id: teamId, volgorde: 998 })
    ok(geremd.fout && geremd.text.includes('Te veel wijzigingen'), 'boven de limiet wordt een schrijfactie geweigerd')
    ok(!(await roep('team_lijst', { zoek: tag })).fout, 'lezen kan dan nog wel')
    await payload.update({ collection: 'oauth-tokens', id: sdkRij.id, data: { writeCount: 0 }, overrideAccess: true })

    stap('15. Testteamlid verwijderen via Claude')
    const nee = await roep('team_verwijderen', { id: teamId })
    ok(nee.fout && nee.text.includes(naam), 'zonder bevestig: true wordt niets verwijderd')
    const ja = await roep('team_verwijderen', { id: teamId, bevestig: true })
    ok(!ja.fout, 'met bevestig: true is het teamlid verwijderd')
    p = await publiek()
    ok(p.rest.length === 0 && !p.opPagina, 'het teamlid staat niet meer op de site')
    teamId = undefined

    stap('16. Gebruiker weg, toegang weg')
    ok((await mcpRaw(opslag.tokens.access_token)).status === 200, 'token van de testgebruiker werkt nog')
    await payload.delete({ collection: 'users', id: user.id, overrideAccess: true })
    user = undefined
    ok((await mcpRaw(opslag.tokens.access_token)).status === 401, 'na het verwijderen van de gebruiker: 401')
    await client.close().catch(() => {})

    console.log(`\nGeslaagd: ${passed} controles.`)
  } catch (e) {
    console.error(`\n${e instanceof Error ? e.message : e}`)
    process.exitCode = 1
  } finally {
    // Opruimen, ook als er iets misging.
    const stil = (pr) => pr.catch(() => {})
    if (teamId) await stil(payload.delete({ collection: 'team', id: teamId, overrideAccess: true }))
    await stil(payload.delete({ collection: 'team', where: { name: { equals: naam } }, overrideAccess: true }))
    await stil(payload.delete({ collection: 'vacatures', where: { title: { equals: `Testvacature ${tag}` } }, overrideAccess: true }))
    await stil(payload.delete({ collection: 'vragen', where: { question: { equals: `Testvraag ${tag}?` } }, overrideAccess: true }))
    await stil(payload.delete({ collection: 'premies', where: { title: { equals: `Test ${tag}` } }, overrideAccess: true }))
    const apps = await payload.find({ collection: 'oauth-clients', where: { clientName: { equals: appNaam } }, limit: 50, overrideAccess: true }).catch(() => ({ docs: [] }))
    for (const app of apps.docs) {
      await stil(payload.delete({ collection: 'oauth-tokens', where: { client: { equals: app.id } }, overrideAccess: true }))
      await stil(payload.delete({ collection: 'oauth-clients', id: app.id, overrideAccess: true }))
    }
    if (user) await stil(payload.delete({ collection: 'users', id: user.id, overrideAccess: true }))
    console.log('Opgeruimd: testgebruiker, testinhoud, aangemelde test-apps en hun tokens.')
    process.exit(process.exitCode ?? 0)
  }
}
