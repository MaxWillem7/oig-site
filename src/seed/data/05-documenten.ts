import type { SeedContext } from '../context'

/**
 * Losse downloads van de live site (/wp-content/uploads/). De titels zijn vast: pagina's zoeken
 * erop met getDocument(titel).
 *
 * KvK-nummer: niet gevonden in een stuk van OIG zelf (algemene voorwaarden, whitepapers,
 * huisstijlboek, contracten en facturen in de klantmap, live site, Mijn OIG, onderwijspapier.nl).
 * Instellingen > Contact > KvK-nummer blijft daarom leeg; de footer toont dan geen KvK-regel.
 */
const DOCUMENTS: [file: string, title: string][] = [
  ['algemene-voorwaarden-oig.pdf', 'Algemene voorwaarden'],
  ['premie-overzicht-collectieve-zorgverzekering-oig-2026.pdf', 'Premieoverzicht collectieve zorgverzekering 2026'],
  ['de-christelijke-zorgverzekeraar-2026-premietabel-15.pdf', 'Premietabel De Christelijke Zorgverzekeraar 2026'],
  ['wijzigingsformulier-oig-2026.pdf', 'Wijzigingsformulier 2026'],
]

export default async function seedDocuments(ctx: SeedContext) {
  for (const [file, title] of DOCUMENTS) await ctx.pdf(file, title)
}
