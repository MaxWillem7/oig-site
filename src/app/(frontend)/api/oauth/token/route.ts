import { sameResource } from '@/lib/mcp/config'
import { formParams, json, oauthError, preflight } from '@/lib/mcp/oauth'
import { exchangeCode, findClient, rotateRefresh, type GrantError, type Issued } from '@/lib/mcp/store'

/**
 * OAuth token endpoint. Ruilt een autorisatiecode (met PKCE) om voor een toegangstoken, of ververst tokens.
 * Toegangstokens gelden een uur; een verversingstoken werkt één keer en wordt bij elk gebruik vervangen.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const GRANT_ERRORS: Record<GrantError, string> = {
  invalid_grant: 'De code of het verversingstoken is ongeldig, verlopen of al gebruikt. Log opnieuw in.',
  invalid_target: 'De parameter resource hoort niet bij deze server.',
}

const answer = (result: Issued | GrantError) =>
  typeof result === 'string'
    ? oauthError(result, GRANT_ERRORS[result])
    : json({
        access_token: result.accessToken,
        token_type: 'Bearer',
        expires_in: result.expiresIn,
        refresh_token: result.refreshToken,
        scope: result.scope,
      })

export async function POST(request: Request) {
  const p = await formParams(request)
  if (!p) return oauthError('invalid_request', 'Stuur het verzoek als application/x-www-form-urlencoded, met elke parameter één keer.')

  const client = await findClient(p.get('client_id') ?? '')
  if (!client) return oauthError('invalid_client', 'Onbekende applicatie (client_id).', 401)

  const resource = p.get('resource')
  if (resource && !sameResource(resource, request)) return oauthError('invalid_target', GRANT_ERRORS.invalid_target)
  const resourceOk = (stored: string) => sameResource(stored, request)

  try {
    switch (p.get('grant_type')) {
      case 'authorization_code': {
        const code = p.get('code')
        const codeVerifier = p.get('code_verifier')
        if (!code || !codeVerifier) return oauthError('invalid_request', 'De parameters code en code_verifier zijn verplicht.')
        return answer(await exchangeCode({ code, client, codeVerifier, redirectUri: p.get('redirect_uri') ?? undefined, resourceOk }))
      }
      case 'refresh_token': {
        const refreshToken = p.get('refresh_token')
        if (!refreshToken) return oauthError('invalid_request', 'De parameter refresh_token is verplicht.')
        return answer(await rotateRefresh({ refreshToken, client, resourceOk }))
      }
      default:
        return oauthError('unsupported_grant_type', 'Alleen authorization_code en refresh_token worden ondersteund.')
    }
  } catch (e) {
    console.error('Claude-koppeling: token uitgeven mislukt', e instanceof Error ? e.name : 'onbekende fout')
    return oauthError('server_error', 'Er ging iets mis op de site. Probeer het opnieuw.', 500)
  }
}

export const OPTIONS = preflight
