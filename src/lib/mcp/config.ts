/** Vaste waarden van de Claude-koppeling (MCP-server met OAuth). */

export const MCP_PATH = '/api/mcp/'
export const SCOPE = 'cms'

export const CODE_TTL_S = 60
export const ACCESS_TTL_S = 60 * 60
export const REFRESH_TTL_S = 30 * 24 * 60 * 60
/** Een net gebruikt verversingstoken dat binnen deze tijd nog eens komt, is een herhaald verzoek en geen diefstal. */
export const REFRESH_GRACE_S = 30

/** Schrijfacties per toegangstoken: hoogstens zoveel per venster. */
export const WRITE_LIMIT = 40
export const WRITE_WINDOW_MIN = 5
/** Nieuwe app-registraties voor de hele site, per uur. */
export const REGISTER_LIMIT_PER_HOUR = 100

/**
 * Adres van de site zonder schuine streep aan het eind. Volgt NEXT_PUBLIC_SITE_URL (net als de previewlinks);
 * staat die niet, dan het adres waarop het verzoek binnenkwam.
 */
export function baseUrl(request: Request): string {
  const env = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '')
  if (env) return env
  const url = new URL(request.url)
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || url.host
  const proto = request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '')
  return `${proto}://${host}`
}

export const issuer = (request: Request) => baseUrl(request)
/**
 * Het adres van de MCP-server; dit is ook de waarde van `resource` (RFC 8707) waarvoor tokens gelden.
 * Zonder schuine streep aan het eind: zo voert een gebruiker het in, en zo raadt de MCP-specificatie het aan.
 * (De site zelf stuurt /api/mcp door naar /api/mcp/, omdat alle adressen op een schuine streep eindigen.)
 */
export const resourceUrl = (request: Request) => `${baseUrl(request)}${MCP_PATH.replace(/\/$/, '')}`
export const resourceMetadataUrl = (request: Request) =>
  `${baseUrl(request)}/.well-known/oauth-protected-resource${MCP_PATH.replace(/\/$/, '')}`

export const endpoints = (request: Request) => {
  const base = baseUrl(request)
  return {
    authorize: `${base}/api/oauth/authorize/`,
    token: `${base}/api/oauth/token/`,
    register: `${base}/api/oauth/register/`,
    revoke: `${base}/api/oauth/revoke/`,
  }
}

/** Zelfde resource, met of zonder schuine streep aan het eind en ongeacht hoofdletters in schema en host. */
export function sameResource(given: string, request: Request): boolean {
  try {
    const a = new URL(given)
    const b = new URL(resourceUrl(request))
    if (a.hash || a.search) return false
    const path = (p: string) => p.replace(/\/+$/, '')
    return a.protocol === b.protocol && a.host === b.host && path(a.pathname) === path(b.pathname)
  } catch {
    return false
  }
}
