import { NextResponse, type NextRequest } from 'next/server'

/**
 * Schuine streep aan het eind. Pagina's krijgen er altijd één (308, één stap). API-adressen niet:
 * de Claude-koppeling (`/api/mcp`) en OAuth moeten zonder doorverwijzing bereikbaar zijn, want niet elke
 * client volgt een doorverwijzing op een POST. Daarom staat `skipTrailingSlashRedirect` aan in
 * next.config.ts en regelen we het hier.
 */
export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.endsWith('/') || /\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next()
  // Zelf het adres opbouwen: NextURL haalt de schuine streep er anders weer af
  return new Response(null, { status: 308, headers: { Location: `${req.nextUrl.origin}${pathname}/${req.nextUrl.search}` } })
}

export const config = {
  // Niet voor API, interne bestanden van Next en .well-known
  matcher: ['/((?!api/|_next/|\\.well-known/).*)'],
}
