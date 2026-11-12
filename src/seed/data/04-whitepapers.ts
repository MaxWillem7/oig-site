import type { SeedContext } from '../context'

/**
 * Vier whitepapers met de PDF en de omslag van de live site. Titel en omschrijving komen van de
 * landingspagina's (inventaris), omgezet naar u-vorm. De leasefiets-whitepaper staat open op
 * /fietsplan-onderwijs/; de andere drie blijven achter het formulier op hun eigen adres.
 * Volgorde (veld order) volgens het ontwerp: schoonmaak, meubilair, kopieerapparaat, leasefiets.
 */
type Whitepaper = {
  slug: 'leasefiets' | 'kopieerapparaat' | 'meubilair' | 'schoonmaak'
  title: string
  summary: string
  file: string
  fileTitle: string
  image: string
  path: string
  gated: boolean
}

const WHITEPAPERS: Whitepaper[] = [
  {
    slug: 'schoonmaak',
    title: 'Een schone school is het beste visitekaartje',
    summary:
      'Leer meer over ons eigen dynamisch aankoopsysteem (DAS) voor schoonmaak: een marktplaats voor aanbestedingen waar elke school haar eigen schoonmaakbehoeften aangeeft.',
    file: 'whitepaper-schoonmaak-def.pdf',
    fileTitle: 'Whitepaper schoonmaak',
    image: 'whitepaper-schoonmaak-cover.png',
    path: '/lp/schoonmaak/',
    gated: true,
  },
  {
    slug: 'meubilair',
    title: 'In 7 stappen naar de aanschaf van nieuw meubilair',
    summary:
      'Deze whitepaper begeleidt u bij de aanschaf van schoolmeubilair, met een overzicht van het dynamisch aankoopsysteem, de zeven stappen voor meubelaankoop en de voordelen van samenwerken met de Onderwijs Inkoop Groep.',
    file: 'whitepaper-meubilair-def.pdf',
    fileTitle: 'Whitepaper meubilair',
    image: 'whitepaper-meubilair-cover.png',
    path: '/lp/meubilair/',
    gated: true,
  },
  {
    slug: 'kopieerapparaat',
    title: 'Aanschaf printers en kopieerapparatuur',
    summary:
      'In deze whitepaper delen wij 7 essentiële inzichten die u helpen om verborgen kosten van printers en kopieerapparatuur te voorkomen.',
    file: 'whitepaper-kopie-def.pdf',
    fileTitle: 'Whitepaper kopieerapparaat',
    image: 'whitepaper-kopieerapparaat-cover.png',
    path: '/lp/kopieerapparaat/',
    gated: true,
  },
  {
    slug: 'leasefiets',
    title: 'Alles over het leasen van fietsen',
    summary:
      'Leasefietsen bieden een duurzaam en gezond alternatief voor woon-werkverkeer. In deze whitepaper leest u hoe leasefietsen voordelig kunnen zijn voor uw organisatie.',
    file: 'whitepaper-leasefiets-def.pdf',
    fileTitle: 'Whitepaper leasefiets',
    image: 'whitepaper-leasefiets-cover.png',
    path: '/fietsplan-onderwijs/',
    gated: false,
  },
]

export default async function seedWhitepapers(ctx: SeedContext) {
  let order = 0
  for (const w of WHITEPAPERS) {
    order += 10
    await ctx.upsert('whitepapers', w.slug, {
      title: w.title,
      summary: w.summary,
      file: await ctx.pdf(w.file, w.fileTitle),
      image: await ctx.img(w.image),
      path: w.path,
      gated: w.gated,
      order,
    })
  }
}
