import type { PayloadRequest } from 'payload'
import type { SeedContext } from '../context'

/**
 * Privacyverklaring: voorstel van Digital Dudes (19 november 2026), letterlijk uit
 * digital-dudes/docs/plans/2026-11-19-dd-oig-privacyverklaring-voorstel.md (sectie "Tekst").
 * OIG moet de tekst nog goedkeuren; zie docs/bronnen/juridisch.md. Wordt alleen gezet als het veld leeg is,
 * zodat een tekst van OIG nooit wordt overschreven.
 *
 * Opmaak: ["h2", kop], ["p", tekst], ["ul", [punten]]. In tekst: **vet** en [label](adres).
 */
type Block = ['h2', string] | ['p', string] | ['ul', string[]]

export const PRIVACY_UPDATED = '2026-11-19T12:00:00.000Z'

const BLOCKS = [
  [
    "h2",
    "Wie wij zijn"
  ],
  [
    "p",
    "De Onderwijs Inkoop Groep (OIG), Gildenveld 3, 3892 DC Zeewolde, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring. U bereikt ons via [info@onderwijsinkoopgroep.nl](mailto:info@onderwijsinkoopgroep.nl) of [036 820 10 00](tel:+31368201000)."
  ],
  [
    "h2",
    "Welke gegevens wij verwerken en waarom"
  ],
  [
    "p",
    "Wij verwerken alleen gegevens die u zelf aan ons geeft, en gebruiken ze alleen voor het doel waarvoor u ze gaf."
  ],
  [
    "ul",
    [
      "**Contact en kennismaking.** Vult u een contactformulier in, dan verwerken wij uw naam, organisatie, e-mailadres, telefoonnummer en uw bericht om uw vraag te beantwoorden of een afspraak te maken. Grondslag: ons gerechtvaardigd belang om op uw verzoek te reageren.",
      "**Whitepapers.** Vraagt u een whitepaper aan, dan verwerken wij uw naam, organisatie en e-mailadres om u de whitepaper toe te sturen. Grondslag: de uitvoering van uw verzoek.",
      "**Sollicitaties.** Solliciteert u, dan verwerken wij uw naam, contactgegevens, cv, motivatie en andere gegevens die u meestuurt om uw sollicitatie te beoordelen. Grondslag: de stappen die voorafgaan aan een mogelijke arbeidsovereenkomst.",
      "**Statistieken.** Alleen met uw toestemming meten wij met Google Analytics en Microsoft Clarity hoe de website wordt gebruikt. Meer hierover leest u in ons [cookiebeleid](/juridisch/cookiebeleid/)."
    ]
  ],
  [
    "p",
    "Wij nemen geen besluiten op basis van geautomatiseerde verwerking en verkopen uw gegevens niet."
  ],
  [
    "h2",
    "Hoe lang wij gegevens bewaren"
  ],
  [
    "ul",
    [
      "Contactaanvragen en aanvragen van whitepapers: zolang nodig is om uw vraag af te handelen, en hoogstens twee jaar.",
      "Sollicitaties: tot vier weken na afronding van de procedure. Alleen met uw toestemming bewaren wij uw gegevens langer, hoogstens een jaar.",
      "Statistieken: zie ons [cookiebeleid](/juridisch/cookiebeleid/)."
    ]
  ],
  [
    "h2",
    "Met wie wij gegevens delen"
  ],
  [
    "p",
    "Wij delen uw gegevens alleen met partijen die ons helpen de website te laten werken: de partij die de website bouwt en beheert, de hostingpartij, de dienst die de e-mails van de formulieren verstuurt en, na uw toestemming, Google en Microsoft voor de statistieken. Met deze partijen hebben wij afspraken gemaakt over de beveiliging en het gebruik van uw gegevens. De website en de database staan in de Europese Unie. Worden gegevens toch buiten de Europese Economische Ruimte verwerkt, dan gebeurt dat met de waarborgen die de wet daarvoor voorschrijft."
  ],
  [
    "p",
    "Voor de collectieve zorgverzekering verwijzen wij u naar de zorgverzekeraars en hun adviseurs. Voor gegevens die u met hen deelt geldt hun eigen privacyverklaring."
  ],
  [
    "h2",
    "Beveiliging"
  ],
  [
    "p",
    "Wij nemen passende maatregelen om uw gegevens te beschermen. De website werkt met een beveiligde verbinding, cv's staan in een afgeschermde opslag en alleen medewerkers die de gegevens nodig hebben kunnen erbij."
  ],
  [
    "h2",
    "Uw rechten"
  ],
  [
    "p",
    "U mag uw gegevens inzien, laten verbeteren of laten verwijderen. U kunt ook bezwaar maken tegen de verwerking, vragen om de verwerking te beperken, uw gegevens laten overdragen en een gegeven toestemming intrekken. Stuur uw verzoek naar [info@onderwijsinkoopgroep.nl](mailto:info@onderwijsinkoopgroep.nl). Wij reageren binnen vier weken."
  ],
  [
    "p",
    "Bent u het niet eens met hoe wij met uw gegevens omgaan, dan horen wij dat graag. U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens via [autoriteitpersoonsgegevens.nl](https://www.autoriteitpersoonsgegevens.nl/)."
  ],
  [
    "h2",
    "Wijzigingen"
  ],
  [
    "p",
    "Wij kunnen deze privacyverklaring aanpassen. De datum bovenaan deze pagina laat zien wanneer dat voor het laatst is gebeurd."
  ]
] as Block[]

/** Zelfde regel als hasRichText in components/RichText (hier los, zodat de migratie geen React laadt). */
const hasText = (data: unknown) =>
  JSON.stringify((data as { root?: { children?: unknown[] } } | null)?.root?.children ?? []).includes('"text":"')

const common = { direction: 'ltr' as const, format: '' as const, indent: 0, version: 1 }

const text = (value: string, bold = false) => ({
  type: 'text',
  text: value,
  format: bold ? 1 : 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

/** Zet een regel met **vet** en [label](adres) om naar Lexical-tekst en -links. */
const inline = (value: string) => {
  const nodes: Record<string, unknown>[] = []
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g
  let last = 0
  for (const m of value.matchAll(re)) {
    if (m.index > last) nodes.push(text(value.slice(last, m.index)))
    if (m[1]) nodes.push(text(m[1], true))
    else {
      const url = m[3]
      nodes.push({
        ...common,
        type: 'link',
        version: 3,
        fields: { linkType: 'custom', url, newTab: url.startsWith('http') },
        children: [text(m[2])],
      })
    }
    last = m.index + m[0].length
  }
  if (last < value.length) nodes.push(text(value.slice(last)))
  return nodes
}

const node = (b: Block) => {
  if (b[0] === 'h2') return { ...common, type: 'heading', tag: 'h2', children: inline(b[1]) }
  if (b[0] === 'p') return { ...common, type: 'paragraph', textFormat: 0, textStyle: '', children: inline(b[1]) }
  return {
    ...common,
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    children: b[1].map((item, i) => ({ ...common, type: 'listitem', value: i + 1, children: inline(item) })),
  }
}

/** De privacyverklaring als Lexical-richtext voor het veld `privacy` van de global Juridische teksten. */
export const privacyRichText = () => ({
  root: { ...common, type: 'root', children: BLOCKS.map(node) },
})

/** Zet de voorgestelde privacyverklaring, alleen als er nog geen tekst staat. */
export async function setPrivacyIfEmpty({ payload }: Pick<SeedContext, 'payload'>, req?: Partial<PayloadRequest>) {
  const current = await payload.findGlobal({ slug: 'juridisch', depth: 0, req })
  if (hasText(current.privacy)) return false
  await payload.updateGlobal({
    slug: 'juridisch',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { privacy: privacyRichText() as any, privacyUpdated: PRIVACY_UPDATED },
    req,
  })
  return true
}

export default async function seedLegal(ctx: SeedContext) {
  await setPrivacyIfEmpty(ctx)
}
