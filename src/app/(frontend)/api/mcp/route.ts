import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { baseUrl, sameResource } from '@/lib/mcp/config'
import { bearer, cors, json, preflight, unauthorized } from '@/lib/mcp/oauth'
import { buildServer } from '@/lib/mcp/server'
import { payloadClient, verifyAccessToken } from '@/lib/mcp/store'

/**
 * De Claude-koppeling: een MCP-server (Streamable HTTP) op één adres. Elk verzoek staat op zichzelf
 * (geen sessie, geen open verbinding), zodat het op Vercel werkt. Toegang alleen met een token uit de
 * OAuth-inlog (zie /api/oauth/ en docs/CLAUDE-KOPPELING.md).
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const authenticate = async (request: Request) => {
  const token = bearer(request)
  if (!token) return { access: null, hadToken: Boolean(request.headers.get('authorization')) }
  const access = await verifyAccessToken(token)
  // Het token moet voor deze server zijn uitgegeven (RFC 8707).
  if (!access || !sameResource(access.resource, request)) return { access: null, hadToken: true }
  return { access, hadToken: true }
}

export async function POST(request: Request) {
  const { access, hadToken } = await authenticate(request)
  if (!access) return unauthorized(request, hadToken)

  const payload = await payloadClient()
  const server = buildServer({ payload, user: access.user, siteUrl: baseUrl(request) }, access)
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
    maxRequestBodySize: 512 * 1024,
  })
  try {
    await server.connect(transport)
    const response = await transport.handleRequest(request, {
      authInfo: { token: '', clientId: access.clientId, scopes: access.scope.split(' ').filter(Boolean), expiresAt: access.expiresAt },
    })
    return cors(response)
  } catch (e) {
    console.error('Claude-koppeling: verzoek mislukt', e instanceof Error ? e.name : 'onbekende fout')
    return json({ jsonrpc: '2.0', id: null, error: { code: -32603, message: 'Er ging iets mis op de site. Probeer het opnieuw.' } }, 500)
  } finally {
    await server.close().catch(() => {})
  }
}

/** Geen doorlopende stroom (SSE): de server antwoordt alleen op POST. */
const nietToegestaan = async (request: Request) => {
  const { access, hadToken } = await authenticate(request)
  if (!access) return unauthorized(request, hadToken)
  return json({ jsonrpc: '2.0', id: null, error: { code: -32000, message: 'Gebruik POST.' } }, 405, { Allow: 'POST' })
}

export const GET = nietToegestaan
export const DELETE = nietToegestaan
export const OPTIONS = preflight
