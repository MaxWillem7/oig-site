import type { SeedContext } from '../context'

/**
 * Losse downloads van de live site (/wp-content/uploads/). De titels zijn vast: pagina's zoeken
 * erop met getDocument(titel).
 *
 * KvK-nummer: niet gevonden in een stuk van OIG zelf (algemene voorwaarden, whitepapers,
 * huisstijlboek, contracten en facturen in de klantmap, live site, Mijn OIG, onderwijspapier.nl).
 * Instellingen > Contact > KvK-nummer blijft daarom leeg; de footer toont dan geen KvK-regel.
 */
/** Zorgverzekering 2027: aangeleverd door OIG op 18 november 2026 (klantmap "Zorgverzekering 2027"). */
export const ZORG_DOCUMENTS_2027: [file: string, title: string][] = [
  ['premie-overzicht-collectieve-zorgverzekering-oig-2027.pdf', 'Premieoverzicht collectieve zorgverzekering 2027'],
  ['de-christelijke-zorgverzekeraar-2027-premietabel.pdf', 'Premietabel De Christelijke Zorgverzekeraar 2027'],
  ['wijzigingsformulier-oig-2027.pdf', 'Wijzigingsformulier 2027'],
]

/** Vervangen door 2027; de datamigratie van 19 november 2026 haalt ze online weg. */
export const ZORG_DOCUMENTS_2026 = [
  'premie-overzicht-collectieve-zorgverzekering-oig-2026.pdf',
  'de-christelijke-zorgverzekeraar-2026-premietabel-15.pdf',
  'wijzigingsformulier-oig-2026.pdf',
]

const DOCUMENTS: [file: string, title: string][] = [
  ['algemene-voorwaarden-oig.pdf', 'Algemene voorwaarden'],
  ...ZORG_DOCUMENTS_2027,
]

export default async function seedDocuments(ctx: SeedContext) {
  for (const [file, title] of DOCUMENTS) await ctx.pdf(file, title)
}
