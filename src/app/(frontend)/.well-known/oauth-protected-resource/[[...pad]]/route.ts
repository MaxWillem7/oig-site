import { issuer, MCP_PATH, resourceUrl, SCOPE } from '@/lib/mcp/config'
import { json, preflight } from '@/lib/mcp/oauth'

/**
 * Protected Resource Metadata (RFC 9728): vertelt een app waar hij moet inloggen voor de Claude-koppeling.
 * Bereikbaar op /.well-known/oauth-protected-resource en op de variant met het pad van de MCP-route erachter.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: Promise<{ pad?: string[] }> }) {
  const pad = ((await params).pad ?? []).join('/')
  if (pad && pad !== MCP_PATH.replace(/^\/|\/$/g, '')) return json({ error: 'not_found' }, 404)
  return json(
    {
      resource: resourceUrl(request),
      authorization_servers: [issuer(request)],
      scopes_supported: [SCOPE],
      bearer_methods_supported: ['header'],
      resource_name: 'Website Onderwijs Inkoop Groep (CMS)',
    },
    200,
    { 'Cache-Control': 'public, max-age=300' },
  )
}

export const OPTIONS = preflight
