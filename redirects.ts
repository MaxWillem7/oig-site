/**
 * Redirects van oude adressen (WordPress) naar de nieuwe site. Elke oude URL en PDF hoort hier te staan
 * of een eigen pagina te hebben. Bron: digital-dudes/docs/plans/2026-10-16-dd-oig-site-inventaris.md.
 */
type Redirect = { source: string; destination: string; permanent: boolean }

export const redirects: Redirect[] = []
