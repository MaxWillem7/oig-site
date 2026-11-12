import { endpoints, issuer, SCOPE } from '@/lib/mcp/config'
import { json, preflight } from '@/lib/mcp/oauth'

/** Authorization Server Metadata (RFC 8414): de adressen en mogelijkheden van de OAuth-inlog. */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export function GET(request: Request) {
  const e = endpoints(request)
  return json(
    {
      issuer: issuer(request),
      authorization_endpoint: e.authorize,
      token_endpoint: e.token,
      registration_endpoint: e.register,
      revocation_endpoint: e.revoke,
      response_types_supported: ['code'],
      response_modes_supported: ['query'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
      code_challenge_methods_supported: ['S256'],
      token_endpoint_auth_methods_supported: ['none'],
      revocation_endpoint_auth_methods_supported: ['none'],
      scopes_supported: [SCOPE],
      authorization_response_iss_parameter_supported: true,
    },
    200,
    { 'Cache-Control': 'public, max-age=300' },
  )
}

export const OPTIONS = preflight
