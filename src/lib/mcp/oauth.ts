import 'server-only'
import { resourceMetadataUrl, SCOPE } from './config'

/** Hulpjes voor de OAuth-routes: antwoorden, CORS en het vergelijken van terugkeeradressen. */

const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID',
  'Access-Control-Expose-Headers': 'WWW-Authenticate, Mcp-Session-Id',
  'Access-Control-Max-Age': '86400',
}

/** Tokens gaan mee in een header en nooit in een cookie, dus elke herkomst mag deze adressen aanroepen. */
export const cors = (res: Response): Response => {
  for (const [k, v] of Object.entries(CORS)) res.headers.set(k, v)
  return res
}

export const preflight = () => new Response(null, { status: 204, headers: CORS })

export const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  cors(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', Pragma: 'no-cache', ...headers },
    }),
  )

/** Foutantwoord volgens RFC 6749, met een omschrijving in gewoon Nederlands. */
export const oauthError = (error: string, description: string, status = 400) =>
  json({ error, error_description: description }, status)

/** 401 voor de MCP-route: wijst de app naar de plek waar staat hoe hij moet inloggen (RFC 9728). */
export function unauthorized(request: Request, invalidToken: boolean): Response {
  const parts = [`resource_metadata="${resourceMetadataUrl(request)}"`, `scope="${SCOPE}"`]
  if (invalidToken) parts.unshift('error="invalid_token"', 'error_description="Het token is ongeldig, verlopen of ingetrokken"')
  return json(
    {
      jsonrpc: '2.0',
      id: null,
      error: { code: -32001, message: invalidToken ? 'Het token is ongeldig, verlopen of ingetrokken. Log opnieuw in.' : 'Inloggen is nodig.' },
    },
    401,
    { 'WWW-Authenticate': `Bearer ${parts.join(', ')}` },
  )
}

export const bearer = (request: Request): string | null => {
  const m = /^Bearer\s+(\S+)$/i.exec(request.headers.get('authorization') || '')
  return m ? m[1] : null
}

const LOOPBACK = new Set(['localhost', '127.0.0.1', '[::1]'])
const parse = (value: string): URL | null => {
  try {
    return new URL(value)
  } catch {
    return null
  }
}

export const isLoopback = (uri: string): boolean => {
  const u = parse(uri)
  return Boolean(u && u.protocol === 'http:' && LOOPBACK.has(u.hostname))
}

/** Een terugkeeradres mag alleen https zijn, of http naar de eigen computer (RFC 8252). Geen fragment, geen inloggegevens. */
export function validRedirectUri(uri: unknown): uri is string {
  if (typeof uri !== 'string' || uri.length > 500) return false
  const u = parse(uri)
  if (!u || u.hash || u.username || u.password) return false
  return u.protocol === 'https:' || isLoopback(uri)
}

/**
 * Staat dit terugkeeradres bij de app geregistreerd? Exacte vergelijking. Alleen bij een adres op de eigen
 * computer telt de poort niet mee, omdat die per sessie wisselt (RFC 8252 7.3).
 */
export function redirectUriRegistered(given: string, registered: string[]): boolean {
  if (registered.includes(given)) return true
  if (!isLoopback(given)) return false
  const g = parse(given)!
  return registered.some((r) => {
    if (!isLoopback(r)) return false
    const u = parse(r)!
    return u.hostname === g.hostname && u.pathname === g.pathname && u.search === g.search
  })
}

/** Leest een formulier (application/x-www-form-urlencoded). Elke parameter mag maar één keer voorkomen. */
export async function formParams(request: Request): Promise<URLSearchParams | null> {
  const type = (request.headers.get('content-type') || '').split(';')[0].trim().toLowerCase()
  if (type !== 'application/x-www-form-urlencoded') return null
  const text = await request.text()
  if (text.length > 8000) return null
  const params = new URLSearchParams(text)
  const seen = new Set<string>()
  for (const key of params.keys()) {
    if (seen.has(key)) return null
    seen.add(key)
  }
  return params
}
