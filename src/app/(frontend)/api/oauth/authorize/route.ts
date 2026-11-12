import { AuthenticationError, LockedAuth } from 'payload'
import { baseUrl, issuer, resourceUrl, sameResource, SCOPE } from '@/lib/mcp/config'
import { errorPage, loginPage } from '@/lib/mcp/login-page'
import { formParams, isLoopback, redirectUriRegistered } from '@/lib/mcp/oauth'
import { clientRedirectUris, createCode, findClient, payloadClient } from '@/lib/mcp/store'
import type { OauthClient } from '@/payload-types'

/**
 * Het inlogscherm van de Claude-koppeling (OAuth authorization endpoint).
 * GET toont het scherm; POST controleert e-mail en wachtwoord van het CMS en stuurt de app terug met een
 * eenmalige code. Een onbekende app of een niet-geregistreerd terugkeeradres krijgt een foutpagina en
 * nooit een doorverwijzing (geen open redirect).
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PARAMS = ['response_type', 'client_id', 'redirect_uri', 'code_challenge', 'code_challenge_method', 'state', 'scope', 'resource'] as const

type Valid = { client: OauthClient; redirectUri: string; state?: string; hidden: Record<string, string>; codeChallenge: string }
type Checked = { page: Response } | { redirect: Response } | { ok: Valid }

const back = (request: Request, redirectUri: string, params: Record<string, string | undefined>) => {
  const url = new URL(redirectUri)
  for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, v)
  url.searchParams.set('iss', issuer(request))
  return new Response(null, { status: 303, headers: { Location: url.toString(), 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' } })
}

async function check(request: Request, p: URLSearchParams): Promise<Checked> {
  for (const key of PARAMS) {
    if (p.getAll(key).length > 1 || (p.get(key) ?? '').length > 1000) {
      return { page: errorPage('Ongeldig verzoek', 'Het verzoek van de applicatie klopt niet.') }
    }
  }
  const client = await findClient(p.get('client_id') ?? '')
  if (!client) {
    return { page: errorPage('Onbekende applicatie', 'Deze applicatie is niet (meer) aangemeld bij de site van de Onderwijs Inkoop Groep.') }
  }
  const registered = clientRedirectUris(client)
  const redirectUri = p.get('redirect_uri') ?? (registered.length === 1 ? registered[0] : '')
  if (!redirectUri || !redirectUriRegistered(redirectUri, registered)) {
    return { page: errorPage('Ongeldig terugkeeradres', 'Het adres waar de applicatie naartoe wil terugkeren is niet bij de aanmelding opgegeven. Er is niets gedeeld.') }
  }

  // Vanaf hier is het terugkeeradres vertrouwd en gaan fouten terug naar de app.
  const state = p.get('state') ?? undefined
  const fail = (error: string, description: string): Checked => ({ redirect: back(request, redirectUri, { error, error_description: description, state }) })
  if (p.get('response_type') !== 'code') return fail('unsupported_response_type', 'Alleen response_type=code wordt ondersteund.')
  const codeChallenge = p.get('code_challenge') ?? ''
  if (!/^[A-Za-z0-9\-._~]{43,128}$/.test(codeChallenge) || p.get('code_challenge_method') !== 'S256') {
    return fail('invalid_request', 'PKCE met code_challenge_method=S256 is verplicht.')
  }
  const resource = p.get('resource')
  if (resource && !sameResource(resource, request)) return fail('invalid_target', 'De parameter resource hoort niet bij deze server.')

  const hidden: Record<string, string> = {}
  for (const key of PARAMS) {
    const value = p.get(key)
    if (value !== null) hidden[key] = value
  }
  return { ok: { client, redirectUri, state, hidden, codeChallenge } }
}

const view = (v: Valid, extra: { email?: string; error?: string } = {}) => ({
  appName: v.client.clientName || 'Naamloze applicatie',
  redirectHost: new URL(v.redirectUri).host,
  loopback: isLoopback(v.redirectUri),
  hidden: v.hidden,
  ...extra,
})

export async function GET(request: Request) {
  const checked = await check(request, new URL(request.url).searchParams)
  if ('page' in checked) return checked.page
  if ('redirect' in checked) return checked.redirect
  return loginPage(view(checked.ok))
}

/** Het formulier moet van ons eigen inlogscherm komen. */
const sameOrigin = (request: Request): boolean => {
  const origin = request.headers.get('origin')
  if (!origin || origin === 'null') return origin !== 'null'
  try {
    const host = new URL(origin).host
    return host === new URL(baseUrl(request)).host || host === (request.headers.get('x-forwarded-host') || request.headers.get('host'))
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return errorPage('Ongeldig verzoek', 'Dit formulier is niet vanaf het inlogscherm verstuurd.', 403)
  const p = await formParams(request)
  if (!p) return errorPage('Ongeldig verzoek', 'Het formulier kon niet worden gelezen.')
  const checked = await check(request, p)
  if ('page' in checked) return checked.page
  if ('redirect' in checked) return checked.redirect
  const v = checked.ok

  if (p.get('actie') === 'weigeren') {
    return back(request, v.redirectUri, { error: 'access_denied', error_description: 'De gebruiker heeft geen toegang gegeven.', state: v.state })
  }

  const email = (p.get('email') ?? '').trim().toLowerCase().slice(0, 200)
  const password = (p.get('password') ?? '').slice(0, 200)
  if (!email || !password) return loginPage(view(v, { email, error: 'Vul uw e-mailadres en wachtwoord in.' }), 400)

  let userId: number
  try {
    const payload = await payloadClient()
    // Payload controleert het wachtwoord en blokkeert het account tijdelijk na te veel mislukte pogingen.
    const result = await payload.login({ collection: 'users', data: { email, password }, depth: 0 })
    if (!result.user) throw new AuthenticationError()
    userId = result.user.id
  } catch (e) {
    if (e instanceof LockedAuth) {
      return loginPage(view(v, { email, error: 'Dit account is tijdelijk geblokkeerd na te veel mislukte pogingen. Probeer het over tien minuten opnieuw.' }), 429)
    }
    if (e instanceof AuthenticationError) {
      return loginPage(view(v, { email, error: 'Het e-mailadres of wachtwoord klopt niet.' }), 401)
    }
    console.error('Claude-koppeling: inloggen mislukt', e instanceof Error ? e.name : 'onbekende fout')
    return loginPage(view(v, { email, error: 'Inloggen lukt nu niet. Probeer het later opnieuw.' }), 500)
  }

  const code = await createCode({
    client: v.client,
    userId,
    redirectUri: v.redirectUri,
    codeChallenge: v.codeChallenge,
    resource: resourceUrl(request),
    scope: SCOPE,
  })
  return back(request, v.redirectUri, { code, state: v.state })
}
