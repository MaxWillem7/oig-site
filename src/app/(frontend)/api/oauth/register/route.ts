import { SCOPE } from '@/lib/mcp/config'
import { json, oauthError, preflight, validRedirectUri } from '@/lib/mcp/oauth'
import { clientRedirectUris, registerClient, RegisterLimit } from '@/lib/mcp/store'

/**
 * Dynamische clientregistratie (RFC 7591): een app zoals Claude meldt zich hier aan en krijgt een client-id.
 * Alleen openbare clients (geen geheim); de beveiliging zit in PKCE en de exacte terugkeeradressen.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    const text = await request.text()
    if (text.length > 10000) throw new Error('te groot')
    const parsed: unknown = JSON.parse(text)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('geen object')
    body = parsed as Record<string, unknown>
  } catch {
    return oauthError('invalid_client_metadata', 'De aanmelding is geen geldige JSON.')
  }

  const uris = body.redirect_uris
  if (!Array.isArray(uris) || uris.length < 1 || uris.length > 5 || !uris.every(validRedirectUri)) {
    return oauthError('invalid_redirect_uri', 'Geef één tot vijf terugkeeradressen op: https, of http naar localhost.')
  }
  const grants = body.grant_types
  if (grants !== undefined && !(Array.isArray(grants) && grants.includes('authorization_code'))) {
    return oauthError('invalid_client_metadata', 'Alleen de grant authorization_code (met refresh_token) wordt ondersteund.')
  }
  const responses = body.response_types
  if (responses !== undefined && !(Array.isArray(responses) && responses.includes('code'))) {
    return oauthError('invalid_client_metadata', 'Alleen response_type code wordt ondersteund.')
  }
  const name = typeof body.client_name === 'string' ? body.client_name.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 100) : ''

  try {
    const client = await registerClient({ name: name || undefined, redirectUris: [...new Set(uris)] })
    return json(
      {
        client_id: client.clientId,
        client_id_issued_at: Math.floor(new Date(client.createdAt).getTime() / 1000),
        client_name: client.clientName || undefined,
        redirect_uris: clientRedirectUris(client),
        grant_types: ['authorization_code', 'refresh_token'],
        response_types: ['code'],
        token_endpoint_auth_method: 'none',
        scope: SCOPE,
      },
      201,
    )
  } catch (e) {
    if (e instanceof RegisterLimit) return oauthError('temporarily_unavailable', 'Te veel aanmeldingen. Probeer het over een uur opnieuw.', 429)
    console.error('Claude-koppeling: registratie mislukt', e instanceof Error ? e.name : 'onbekende fout')
    return oauthError('server_error', 'De aanmelding is niet gelukt. Probeer het later opnieuw.', 500)
  }
}

export const OPTIONS = preflight
