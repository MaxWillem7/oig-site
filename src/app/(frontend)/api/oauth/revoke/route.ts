import { formParams, json, oauthError, preflight } from '@/lib/mcp/oauth'
import { findClient, revokeToken } from '@/lib/mcp/store'

/** Token intrekken (RFC 7009): een app meldt zich af. Trekt alle tokens van dezelfde inlog in. */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const p = await formParams(request)
  const token = p?.get('token')
  if (!p || !token) return oauthError('invalid_request', 'De parameter token is verplicht.')
  const client = await findClient(p.get('client_id') ?? '')
  if (!client) return oauthError('invalid_client', 'Onbekende applicatie (client_id).', 401)
  try {
    await revokeToken(token, client)
  } catch (e) {
    console.error('Claude-koppeling: intrekken mislukt', e instanceof Error ? e.name : 'onbekende fout')
    return oauthError('server_error', 'Er ging iets mis op de site. Probeer het opnieuw.', 500)
  }
  return json({})
}

export const OPTIONS = preflight
