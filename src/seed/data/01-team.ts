import type { SeedContext } from '../context'

/**
 * Team: 21 personen zoals de live site ze op 12 november 2026 toont (/ons-team/ en
 * /wp-json/wp/v2/team). Indeling in groepen volgens het Paper-ontwerp "Ons team · desktop".
 * Bronnen per persoon: docs/bronnen/cms-inhoud.md.
 *
 * - phone leeg = de live site toont het algemene nummer (036-8201000).
 * - photo leeg = geen bruikbaar portret (de site toont initialen).
 */
type Person = {
  name: string
  role: string
  group: 'inkoopadvies' | 'aanbestedingsdesk' | 'contracten' | 'directie' | 'kantoor'
  phone?: string
  email: string
  photo?: string
  onHome?: boolean
}

const mail = (user: string) => `${user}@onderwijsinkoopgroep.nl`

const TEAM: Person[] = [
  // Inkoopadvies
  { name: 'Cor van Stralen', role: 'Inkoopadviseur', group: 'inkoopadvies', phone: '06 41 62 83 58', email: mail('c.vanstralen'), photo: 'team-cor-van-stralen.jpg', onHome: true },
  { name: 'Carine van Brummelen', role: 'Inkoopadviseur', group: 'inkoopadvies', phone: '06 18 20 93 67', email: mail('c.vanbrummelen'), photo: 'team-carine-van-brummelen.jpg', onHome: true },
  { name: 'René Verhoef', role: 'Inkoopadviseur', group: 'inkoopadvies', phone: '06 42 92 01 12', email: mail('r.verhoef'), photo: 'team-rene-verhoef.jpg', onHome: true },
  { name: 'Heleen Gorlee', role: 'Inkoopadviseur', group: 'inkoopadvies', phone: '06 38 03 04 88', email: mail('h.gorlee'), photo: 'team-heleen-gorlee.jpg', onHome: true },
  { name: 'Noah van Vlastuin', role: 'Inkoopadviseur', group: 'inkoopadvies', phone: '06 34 05 20 17', email: mail('n.vanvlastuin'), photo: 'team-noah-van-vlastuin.jpg' },
  { name: 'Thomas Bruschke', role: 'Inkoopadviseur', group: 'inkoopadvies', phone: '06 36 30 59 20', email: mail('t.bruschke'), photo: 'team-thomas-bruschke.jpg' },

  // Aanbestedingsdesk
  { name: 'Larissa Benning', role: 'Senior Inkoopadviseur Aanbestedingsdesk', group: 'aanbestedingsdesk', phone: '06 29 49 29 16', email: mail('l.benning'), photo: 'team-larissa-benning.jpg' },
  { name: 'Mika Valk', role: 'Junior Inkoopadviseur Aanbestedingsdesk', group: 'aanbestedingsdesk', email: mail('m.valk'), photo: 'team-mika-valk.jpg' },

  // Contracten en dossiers
  // Stijn Achterveld: het beeld op de live site (sa.png) is door ChatGPT gemaakt, dus geen foto.
  { name: 'Stijn Achterveld', role: 'Contractmanager', group: 'contracten', phone: '036 820 10 08', email: mail('s.achterveld') },
  { name: 'Bianca Omerzu', role: 'Contractbeheer', group: 'contracten', phone: '036 820 10 05', email: mail('b.omerzu'), photo: 'team-bianca-omerzu.jpg' },
  { name: 'Natasja Sloot', role: 'Dossierspecialist', group: 'contracten', phone: '036 820 10 06', email: mail('n.sloot'), photo: 'team-natasja-sloot.jpg' },
  { name: 'Maayke Veldhuyzen', role: 'Dossierspecialist', group: 'contracten', phone: '036 820 10 03', email: mail('m.veldhuyzen'), photo: 'team-maayke-veldhuyzen.jpg' },
  { name: 'Jaap Duel', role: 'Dossierspecialist', group: 'contracten', phone: '036 820 10 07', email: mail('j.duel'), photo: 'team-jaap-duel.jpg' },

  // Directie en sales
  { name: 'Dick Goedhart', role: 'Oprichter en eigenaar', group: 'directie', email: mail('d.goedhart'), photo: 'team-dick-goedhart.jpg' },
  { name: 'Justin Novák', role: 'Oprichter en eigenaar', group: 'directie', phone: '06 25 54 47 66', email: mail('j.novak'), photo: 'team-justin-novak.jpg' },
  { name: 'Michiel Koelewijn', role: 'Oprichter en eigenaar', group: 'directie', email: mail('m.koelewijn'), photo: 'team-michiel-koelewijn.jpg' },
  { name: 'Dave van Wagtendonk', role: 'Operationeel directeur', group: 'directie', phone: '06 39 86 08 52', email: mail('d.vanwagtendonk'), photo: 'team-dave-van-wagtendonk.jpg' },
  { name: 'Arjan Bokhorst', role: 'Salesmanager', group: 'directie', phone: '06 42 86 54 69', email: mail('a.bokhorst'), photo: 'team-arjan-bokhorst.jpg' },

  // Kantoor
  { name: 'Patricia Born', role: 'Office Support', group: 'kantoor', email: mail('p.born'), photo: 'team-patricia-born.jpg' },
  // Yvette Berghorst: sinds 4 november 2026 op de live site, daar nog zonder foto.
  { name: 'Yvette Berghorst', role: 'Office Support', group: 'kantoor', phone: '036 820 10 09', email: mail('y.berghorst') },
  { name: 'Hananja Fijnenberg', role: 'Administratie', group: 'kantoor', phone: '036 820 10 04', email: mail('h.fijnenberg'), photo: 'team-hananja-fijnenberg.jpg' },
]

export default async function seedTeam(ctx: SeedContext) {
  let order = 0
  for (const person of TEAM) {
    order += 10
    await ctx.upsert(
      'team',
      person.name,
      {
        role: person.role,
        group: person.group,
        photo: person.photo ? await ctx.img(person.photo) : null,
        phone: person.phone ?? null,
        email: person.email,
        onHome: person.onHome ?? false,
        order,
      },
      'name',
    )
  }
}
