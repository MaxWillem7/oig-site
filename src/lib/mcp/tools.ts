import 'server-only'
import type { Payload } from 'payload'
import { z } from 'zod'
import { TEAM_GROUPS } from '@/collections/Team'
import { PAGE_OPTIONS } from '@/collections/shared'
import { previewUrl } from '@/lib/preview'
import type { Instellingen, User } from '@/payload-types'

/**
 * De tools van de Claude-koppeling. Elke tool draait met de rechten van de ingelogde CMS-gebruiker
 * (`overrideAccess: false` en `user`), dus wat iemand in het CMS niet mag, mag hij hier ook niet.
 * Opslaan is altijd een concept; live gaat iets pas met de tool `publiceren`.
 */

export type Ctx = { payload: Payload; user: User & { collection: 'users' }; siteUrl: string }

export class ToolFout extends Error {}

export type Soort = 'lezen' | 'schrijven' | 'publiceren' | 'verwijderen'
export type Tool = {
  naam: string
  titel: string
  omschrijving: string
  schema: z.ZodObject
  soort: Soort
  uitvoeren: (ctx: Ctx, args: never) => Promise<unknown>
}

const tool = <S extends z.ZodObject>(
  naam: string,
  titel: string,
  soort: Soort,
  omschrijving: string,
  schema: S,
  uitvoeren: (ctx: Ctx, args: z.infer<S>) => Promise<unknown>,
): Tool => ({ naam, titel, soort, omschrijving, schema, uitvoeren: uitvoeren as Tool['uitvoeren'] })

/* ───────────── invoer ───────────── */

const COLLECTIES = ['team', 'vacatures', 'premies', 'vragen'] as const
type Col = (typeof COLLECTIES)[number]

const id = z.number().int().positive().describe('Het id uit de bijbehorende lijst')
const tekst = (max: number) => z.string().trim().min(1).max(max)
/** Optioneel tekstveld; null of een lege tekst maakt het veld leeg. */
const leegbaar = (max: number) => z.string().trim().max(max).nullable().optional()
const volgorde = z.number().int().min(0).max(9999).optional().describe('Lager getal staat eerder. Standaard 10.')
const datum = z.iso.date().nullable().optional()
const bevestig = z
  .boolean()
  .optional()
  .describe('Moet true zijn. Zet dit alleen als de gebruiker in dit gesprek uitdrukkelijk heeft gezegd dat dit weg mag.')

const GROEPEN = TEAM_GROUPS.map((g) => g.value) as [string, ...string[]]
const PAGINAS = PAGE_OPTIONS.map((p) => p.value) as [string, ...string[]]
const groepLabel = (v: unknown) => TEAM_GROUPS.find((g) => g.value === v)?.label ?? v
const opsomming = (opts: { label: string; value: string }[]) => opts.map((o) => `${o.value} (${o.label})`).join(', ')

const punten = (label: string) =>
  z
    .object({
      inleiding: leegbaar(2000).describe('Optionele zin boven de punten'),
      punten: z.array(tekst(400)).max(30).optional().describe('De punten, elk als losse tekst'),
    })
    .optional()
    .describe(`Blok "${label}"`)

/* ───────────── hulpjes ───────────── */

type Doc = { id: number; _status?: 'draft' | 'published' | null; updatedAt?: string } & Record<string, unknown>

const NOG_NIET_LIVE =
  'Opgeslagen als concept. Dit staat nog niet live: het komt pas op de site als de gebruiker vraagt om te publiceren (tool publiceren). Geef de previewlink aan de gebruiker.'

const VRAAG_PAD: Record<string, string> = {
  aanbesteden: '/dienst/aanbesteden/',
  subsidiedesk: '/dienst/subsidiedesk/',
  'ondersteuning-inkoop': '/dienst/ondersteuning-inkoop/',
  inkoopsegmenten: '/dienst/ondersteuning-inkoop/inkoopsegmenten/',
  premiedesk: '/dienst/premiedesk/',
  verzekeringen: '/dienst/verzekeringen/',
  inkoopbeleid: '/inkoopbeleid/',
  'fietsplan-onderwijs': '/fietsplan-onderwijs/',
  werkwijze: '/werkwijze/',
  vacatures: '/vacatures/',
}

/** Het adres op de site waar dit document te zien is. */
const padVan = (col: Col, doc: Doc): string => {
  if (col === 'team') return '/ons-team/'
  if (col === 'premies') return '/dienst/verzekeringen/'
  if (col === 'vacatures') return typeof doc.slug === 'string' && doc.slug ? `/vacatures/${doc.slug}/` : '/vacatures/'
  return VRAAG_PAD[String(doc.page)] ?? '/'
}

const titelVan = (col: Col, doc: Doc): string =>
  String((col === 'team' ? doc.name : col === 'vragen' ? doc.question : doc.title) ?? `nummer ${doc.id}`)

/** Laat lege waarden weg, zodat het antwoord kort blijft. */
const compact = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(compact)
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) {
      if (v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) continue
      const c = compact(v)
      if (c && typeof c === 'object' && !Array.isArray(c) && Object.keys(c).length === 0) continue
      out[k] = c
    }
    return out
  }
  return value
}

const dag = (v: unknown) => (typeof v === 'string' && v ? v.slice(0, 10) : undefined)
const alsDatum = (v: string | null | undefined) => (v === undefined ? undefined : v === null ? null : `${v}T12:00:00.000Z`)
/** Alleen de velden die zijn meegegeven; een lege tekst wordt null (veld leegmaken). */
const gegeven = (velden: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(velden)) if (v !== undefined) out[k] = v === '' ? null : v
  return out
}

const verplicht = (velden: Record<string, unknown>, namen: Record<string, string>) => {
  const mist = Object.entries(namen)
    .filter(([k]) => velden[k] === undefined || velden[k] === null || velden[k] === '')
    .map(([, label]) => label)
  if (mist.length) throw new ToolFout(`Voor een nieuw item ${mist.length === 1 ? 'is' : 'zijn'} ook nodig: ${mist.join(', ')}.`)
}

/** De nieuwste versie van een document, dus met de wijzigingen die nog concept zijn. */
const nieuwste = async (ctx: Ctx, col: Col, docId: number): Promise<Doc> => {
  try {
    return (await ctx.payload.findByID({ collection: col, id: docId, draft: true, depth: 0, overrideAccess: false, user: ctx.user })) as unknown as Doc
  } catch {
    throw new ToolFout(`Niet gevonden: er is geen document met id ${docId} in ${col}. Vraag eerst de lijst op.`)
  }
}

const lijst = async (ctx: Ctx, col: Col, where: Record<string, unknown> = {}): Promise<Doc[]> => {
  const res = await ctx.payload.find({
    collection: col,
    where: where as never,
    draft: true,
    sort: 'order',
    limit: 200,
    depth: 0,
    overrideAccess: false,
    user: ctx.user,
  })
  return res.docs as unknown as Doc[]
}

/** De id's die nu op de site staan (gepubliceerd), los van eventuele conceptwijzigingen. */
const liveIds = async (ctx: Ctx, col: Col): Promise<Set<number>> => {
  const res = await ctx.payload.find({
    collection: col,
    where: { _status: { equals: 'published' } },
    draft: false,
    limit: 1000,
    depth: 0,
    select: {},
    overrideAccess: false,
    user: ctx.user,
  })
  return new Set(res.docs.map((d) => d.id))
}

const staatLive = async (ctx: Ctx, col: Col, docId: number) => (await liveIds(ctx, col)).has(docId)

const statusTekst = (doc: Doc, live: boolean) =>
  live ? (doc._status === 'draft' ? 'gepubliceerd, met een wijziging die nog concept is' : 'gepubliceerd') : 'concept (niet op de site)'

const opslaan = async (ctx: Ctx, col: Col, docId: number | undefined, data: Record<string, unknown>): Promise<Doc> => {
  const common = { collection: col, draft: true, depth: 0, overrideAccess: false, user: ctx.user } as const
  if (docId) {
    await nieuwste(ctx, col, docId)
    return (await ctx.payload.update({ ...common, id: docId, data: { ...data, _status: 'draft' } as never })) as unknown as Doc
  }
  return (await ctx.payload.create({ ...common, data: { ...data, _status: 'draft' } as never })) as unknown as Doc
}

const naOpslaan = async (ctx: Ctx, col: Col, doc: Doc, weergave: unknown, nieuw: boolean) => {
  const live = nieuw ? false : await staatLive(ctx, col, doc.id)
  return {
    opgeslagen: weergave,
    status: live ? 'de wijziging is een concept; op de site staat nog de vorige gepubliceerde versie' : 'concept (niet op de site)',
    preview: previewUrl(padVan(col, doc)),
    let_op: NOG_NIET_LIVE,
  }
}

const verwijderen = async (ctx: Ctx, col: Col, docId: number, ok: boolean | undefined) => {
  const doc = await nieuwste(ctx, col, docId)
  const titel = titelVan(col, doc)
  if (ok !== true) {
    throw new ToolFout(
      `Niet verwijderd. Verwijderen kan niet ongedaan worden gemaakt. Vraag de gebruiker eerst of "${titel}" echt weg mag en roep de tool daarna opnieuw aan met bevestig: true.`,
    )
  }
  await ctx.payload.delete({ collection: col, id: docId, overrideAccess: false, user: ctx.user })
  return { verwijderd: titel, id: docId, let_op: 'Dit is direct van de site en uit het CMS verwijderd.' }
}

/* ───────────── weergave ───────────── */

const teamKort = (d: Doc, live: boolean) => ({
  id: d.id,
  naam: d.name,
  functie: d.role,
  groep: d.group,
  volgorde: d.order,
  op_home: d.onHome || undefined,
  status: statusTekst(d, live),
})

const teamVol = (d: Doc, live: boolean) => ({
  ...teamKort(d, live),
  groep_naam: groepLabel(d.group),
  telefoon: d.phone,
  email: d.email,
  heeft_foto: Boolean(d.photo),
  bijgewerkt: dag(d.updatedAt),
})

type Blok = { intro?: string | null; items?: { text?: string | null }[] | null } | null | undefined
const blokUit = (b: unknown) => {
  const blok = b as Blok
  return { inleiding: blok?.intro, punten: (blok?.items ?? []).map((i) => i.text) }
}
const blokIn = (b: { inleiding?: string | null; punten?: string[] } | undefined, bestaand: unknown) => {
  if (!b) return undefined
  const oud = (bestaand ?? {}) as NonNullable<Blok>
  return {
    intro: b.inleiding === undefined ? (oud.intro ?? null) : b.inleiding || null,
    items: b.punten === undefined ? (oud.items ?? []).map((i) => ({ text: i.text })) : b.punten.map((text) => ({ text })),
  }
}

const vacatureKort = (d: Doc, live: boolean) => ({
  id: d.id,
  titel: d.title,
  adres: d.slug,
  uren: d.hours,
  plaats: d.location,
  sluitingsdatum: dag(d.validThrough),
  status: statusTekst(d, live),
})

const vacatureVol = (d: Doc, live: boolean) => {
  const salaris = (d.salary ?? {}) as { min?: number | null; max?: number | null }
  return {
    ...vacatureKort(d, live),
    korte_omschrijving: d.teaser,
    opleiding: d.education,
    openingstekst: d.intro,
    over_oig: d.about,
    oig_zoekt: blokUit(d.seeking),
    wie_ben_jij: blokUit(d.profile),
    wat_ga_je_doen: blokUit(d.tasks),
    wat_wij_bieden: blokUit(d.offer),
    salaris_vanaf: salaris.min,
    salaris_tot: salaris.max,
    geplaatst_op: dag(d.datePosted),
    aantal_fotos: Array.isArray(d.photos) ? d.photos.length : 0,
    volgorde: d.order,
    bijgewerkt: dag(d.updatedAt),
  }
}

type Kolom = { label?: string | null }
type Rij = { label?: string | null; cells?: { value?: string | null }[] | null }
const kolommenVan = (d: Doc) => ((d.columns ?? []) as Kolom[]).map((c) => c.label ?? '')
const rijenVan = (d: Doc) =>
  ((d.rows ?? []) as Rij[]).map((r) => ({ pakket: r.label ?? '', waarden: (r.cells ?? []).map((c) => c.value ?? '') }))

const premieKort = (d: Doc, live: boolean) => ({
  id: d.id,
  titel: d.title,
  jaar: d.year,
  verzekeraar: d.insurer,
  aantal_rijen: Array.isArray(d.rows) ? d.rows.length : 0,
  status: statusTekst(d, live),
})

const premieVol = (d: Doc, live: boolean) => ({
  ...premieKort(d, live),
  kolommen: kolommenVan(d),
  rijen: rijenVan(d),
  toelichting: d.note,
  volgorde: d.order,
  bijgewerkt: dag(d.updatedAt),
})

const vraagVol = (d: Doc, live: boolean) => ({
  id: d.id,
  vraag: d.question,
  antwoord: d.answer,
  pagina: d.page,
  volgorde: d.order,
  status: statusTekst(d, live),
})

/* ───────────── tools ───────────── */

export const TOOLS: Tool[] = [
  tool(
    'overzicht',
    'Overzicht van de site-inhoud',
    'lezen',
    'Begin hier. Laat zien wat er in het CMS van de Onderwijs Inkoop Groep staat: per onderdeel (team, vacatures, premietabellen, vragen en antwoorden) hoeveel er gepubliceerd is en hoeveel als concept wacht, en als wie je bent ingelogd.',
    z.object({}),
    async (ctx) => {
      const delen: Record<string, unknown> = {}
      for (const col of COLLECTIES) {
        const [alles, live] = await Promise.all([lijst(ctx, col), liveIds(ctx, col)])
        const concept = alles.filter((d) => d._status === 'draft')
        delen[col] = {
          op_de_site: live.size,
          nieuw_als_concept: concept.filter((d) => !live.has(d.id)).length,
          wijziging_als_concept: concept.filter((d) => live.has(d.id)).length,
        }
      }
      return {
        ingelogd_als: ctx.user.naam || ctx.user.email,
        rol: ctx.user.role,
        ...delen,
        uitleg:
          'Opslaan via deze koppeling is altijd een concept met een previewlink. Pas na de tool publiceren staat iets op de site. De tool concepten geeft alles wat wacht.',
      }
    },
  ),

  /* ── team ── */
  tool(
    'team_lijst',
    'Teamleden bekijken',
    'lezen',
    'Alle teamleden van de teampagina met id, naam, functie, groep, volgorde en status (gepubliceerd of concept). Te filteren op groep of op een deel van de naam.',
    z.object({
      groep: z.enum(GROEPEN).optional().describe(`Alleen deze groep: ${opsomming(TEAM_GROUPS)}`),
      zoek: z.string().trim().max(80).optional().describe('Deel van de naam'),
    }),
    async (ctx, a) => {
      const [alles, live] = await Promise.all([lijst(ctx, 'team', a.groep ? { group: { equals: a.groep } } : {}), liveIds(ctx, 'team')])
      const zoek = a.zoek?.toLowerCase()
      const docs = zoek ? alles.filter((d) => String(d.name ?? '').toLowerCase().includes(zoek)) : alles
      return { aantal: docs.length, teamleden: docs.map((d) => teamKort(d, live.has(d.id))) }
    },
  ),
  tool(
    'team_lezen',
    'Eén teamlid bekijken',
    'lezen',
    'Alle gegevens van één teamlid (nieuwste versie, dus inclusief wijzigingen die nog concept zijn): naam, functie, groep, telefoon, e-mail, volgorde, of het teamlid op de home staat en of er een foto is.',
    z.object({ id }),
    async (ctx, a) => teamVol(await nieuwste(ctx, 'team', a.id), await staatLive(ctx, 'team', a.id)),
  ),
  tool(
    'team_opslaan',
    'Teamlid toevoegen of wijzigen (als concept)',
    'schrijven',
    `Voegt een teamlid toe (zonder id; naam en functie zijn dan verplicht) of wijzigt een bestaand teamlid (met id; velden die je weglaat blijven zoals ze zijn). Wordt altijd opgeslagen als concept en staat dus nog niet op de site; je krijgt een previewlink terug. Een portretfoto uploaden kan niet via Claude: dat doet de gebruiker zelf in het CMS (zonder foto toont de site de initialen). Groepen: ${opsomming(TEAM_GROUPS)}.`,
    z.object({
      id: id.optional().describe('Id van een bestaand teamlid. Weglaten = nieuw teamlid.'),
      naam: tekst(120).optional(),
      functie: tekst(160).optional(),
      groep: z.enum(GROEPEN).optional().describe('Groep op de teampagina. Standaard inkoopadvies.'),
      telefoon: leegbaar(30).describe('Leeg = het algemene nummer wordt getoond'),
      email: z.union([z.email().max(200), z.literal('')]).nullable().optional(),
      volgorde,
      op_home: z.boolean().optional().describe('Tonen op de homepage'),
    }),
    async (ctx, a) => {
      if (!a.id) verplicht(a, { naam: 'naam', functie: 'functie' })
      const doc = await opslaan(
        ctx,
        'team',
        a.id,
        gegeven({ name: a.naam, role: a.functie, group: a.groep, phone: a.telefoon, email: a.email, order: a.volgorde, onHome: a.op_home }),
      )
      return naOpslaan(ctx, 'team', doc, teamVol(doc, false), !a.id)
    },
  ),
  tool(
    'team_verwijderen',
    'Teamlid verwijderen',
    'verwijderen',
    'Verwijdert een teamlid direct van de site en uit het CMS. Dit kan niet ongedaan worden gemaakt en werkt alleen met bevestig: true, nadat de gebruiker uitdrukkelijk heeft gezegd dat het teamlid weg mag.',
    z.object({ id, bevestig }),
    (ctx, a) => verwijderen(ctx, 'team', a.id, a.bevestig),
  ),

  /* ── vacatures ── */
  tool(
    'vacatures_lijst',
    'Vacatures bekijken',
    'lezen',
    'Alle vacatures met id, titel, adres (slug), uren, plaats, sluitingsdatum en status. Een vacature met status concept staat niet op de site.',
    z.object({}),
    async (ctx) => {
      const [alles, live] = await Promise.all([lijst(ctx, 'vacatures'), liveIds(ctx, 'vacatures')])
      return { aantal: alles.length, vacatures: alles.map((d) => vacatureKort(d, live.has(d.id))) }
    },
  ),
  tool(
    'vacature_lezen',
    'Eén vacature bekijken',
    'lezen',
    'De volledige tekst van één vacature (nieuwste versie, dus inclusief wijzigingen die nog concept zijn), met alle blokken en puntenlijsten.',
    z.object({ id }),
    async (ctx, a) => vacatureVol(await nieuwste(ctx, 'vacatures', a.id), await staatLive(ctx, 'vacatures', a.id)),
  ),
  tool(
    'vacature_opslaan',
    'Vacature toevoegen of wijzigen (als concept)',
    'schrijven',
    'Maakt een nieuwe vacature (zonder id; titel en korte_omschrijving zijn dan verplicht) of wijzigt een bestaande (met id; velden die je weglaat blijven zoals ze zijn; een puntenlijst die je meegeeft vervangt de hele lijst van dat blok). Wordt altijd opgeslagen als concept en staat dus nog niet op de site; je krijgt een previewlink terug. Vacatures spreken de lezer aan met je. Foto\'s toevoegen doet de gebruiker zelf in het CMS.',
    z.object({
      id: id.optional().describe('Id van een bestaande vacature. Weglaten = nieuwe vacature.'),
      titel: tekst(160).optional().describe('Functietitel'),
      adres: z
        .string()
        .trim()
        .max(120)
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Alleen kleine letters, cijfers en koppeltekens')
        .optional()
        .describe('Slug in het webadres. Weglaten = wordt gemaakt uit de titel. Wijzig het adres van een gepubliceerde vacature liever niet.'),
      korte_omschrijving: tekst(600).optional().describe('Twee of drie zinnen voor het overzicht en Google'),
      uren: leegbaar(60).describe('Bijv. 32-40 uur'),
      opleiding: leegbaar(60).describe('Bijv. HBO'),
      plaats: leegbaar(80).describe('Standaard Zeewolde'),
      openingstekst: leegbaar(4000),
      over_oig: leegbaar(4000).describe('Blok "Over de Onderwijs Inkoop Groep"'),
      oig_zoekt: punten('De Onderwijs Inkoop Groep zoekt mensen die'),
      wie_ben_jij: punten('Wie ben jij?'),
      wat_ga_je_doen: punten('Wat ga je doen?'),
      wat_wij_bieden: punten('Wat wij bieden'),
      salaris_vanaf: z.number().min(0).max(100000).nullable().optional().describe('Bruto per maand bij fulltime, voor Google for Jobs'),
      salaris_tot: z.number().min(0).max(100000).nullable().optional(),
      geplaatst_op: datum.describe('JJJJ-MM-DD'),
      sluitingsdatum: datum.describe('JJJJ-MM-DD, optioneel'),
      volgorde,
    }),
    async (ctx, a) => {
      if (!a.id) verplicht(a, { titel: 'titel', korte_omschrijving: 'korte_omschrijving' })
      const oud = a.id ? await nieuwste(ctx, 'vacatures', a.id) : ({} as Doc)
      const oudSalaris = (oud.salary ?? {}) as { min?: number | null; max?: number | null }
      const salaris =
        a.salaris_vanaf === undefined && a.salaris_tot === undefined
          ? undefined
          : {
              min: a.salaris_vanaf === undefined ? (oudSalaris.min ?? null) : a.salaris_vanaf,
              max: a.salaris_tot === undefined ? (oudSalaris.max ?? null) : a.salaris_tot,
            }
      const doc = await opslaan(
        ctx,
        'vacatures',
        a.id,
        gegeven({
          title: a.titel,
          slug: a.adres,
          teaser: a.korte_omschrijving,
          hours: a.uren,
          education: a.opleiding,
          location: a.plaats,
          intro: a.openingstekst,
          about: a.over_oig,
          seeking: blokIn(a.oig_zoekt, oud.seeking),
          profile: blokIn(a.wie_ben_jij, oud.profile),
          tasks: blokIn(a.wat_ga_je_doen, oud.tasks),
          offer: blokIn(a.wat_wij_bieden, oud.offer),
          salary: salaris,
          datePosted: alsDatum(a.geplaatst_op),
          validThrough: alsDatum(a.sluitingsdatum),
          order: a.volgorde,
        }),
      )
      return naOpslaan(ctx, 'vacatures', doc, vacatureVol(doc, false), !a.id)
    },
  ),
  tool(
    'vacature_sluiten',
    'Vacature van de site halen',
    'publiceren',
    'Zet een gepubliceerde vacature terug naar concept: hij verdwijnt van de site en uit Google for Jobs, maar blijft in het CMS bewaard en kan later weer worden gepubliceerd. Gebruik dit als een vacature is vervuld of niet meer actueel is.',
    z.object({ id }),
    async (ctx, a) => {
      const doc = await nieuwste(ctx, 'vacatures', a.id)
      if (!(await staatLive(ctx, 'vacatures', a.id))) {
        return { vacature: doc.title, status: 'concept (niet op de site)', let_op: 'Deze vacature stond al niet op de site.' }
      }
      await ctx.payload.update({
        collection: 'vacatures',
        id: a.id,
        data: { _status: 'draft' },
        draft: false,
        depth: 0,
        overrideAccess: false,
        user: ctx.user,
      })
      return { vacature: doc.title, status: 'concept (niet op de site)', let_op: 'De vacature staat niet meer op de site. Opnieuw plaatsen kan met de tool publiceren.' }
    },
  ),

  /* ── premies ── */
  tool(
    'premies_lijst',
    'Premietabellen bekijken',
    'lezen',
    'Alle premietabellen (zorgverzekering) met id, titel, jaar, verzekeraar en status. Op de pagina Verzekeringen staan alleen gepubliceerde tabellen van het actuele premiejaar (zie kerncijfers_lezen).',
    z.object({ jaar: z.number().int().min(2000).max(2100).optional().describe('Alleen dit premiejaar') }),
    async (ctx, a) => {
      const [alles, live] = await Promise.all([lijst(ctx, 'premies', a.jaar ? { year: { equals: a.jaar } } : {}), liveIds(ctx, 'premies')])
      return { aantal: alles.length, premietabellen: alles.map((d) => premieKort(d, live.has(d.id))) }
    },
  ),
  tool(
    'premietabel_lezen',
    'Eén premietabel bekijken',
    'lezen',
    'Eén premietabel volledig (nieuwste versie, dus inclusief wijzigingen die nog concept zijn): de kolomkoppen, per rij het pakket met de waarden, en de toelichting.',
    z.object({ id }),
    async (ctx, a) => premieVol(await nieuwste(ctx, 'premies', a.id), await staatLive(ctx, 'premies', a.id)),
  ),
  tool(
    'premietabel_opslaan',
    'Premietabel toevoegen of wijzigen (als concept)',
    'schrijven',
    'Maakt een nieuwe premietabel (zonder id; titel, jaar, verzekeraar, kolommen en rijen zijn dan verplicht) of wijzigt een bestaande (met id; velden die je weglaat blijven zoals ze zijn; kolommen of rijen die je meegeeft vervangen de hele lijst). Elke rij moet precies evenveel waarden hebben als er kolommen zijn. De eerste kolom (het pakket) hoort niet bij kolommen. Neem bedragen letterlijk over van wat de gebruiker aanlevert en verzin of bereken er geen. Wordt altijd opgeslagen als concept; je krijgt een previewlink terug.',
    z.object({
      id: id.optional().describe('Id van een bestaande tabel. Weglaten = nieuwe tabel.'),
      titel: tekst(160).optional().describe('Bijv. Zilveren Kruis 2027'),
      jaar: z.number().int().min(2000).max(2100).optional().describe('Premiejaar'),
      verzekeraar: tekst(120).optional(),
      kolommen: z.array(tekst(80)).min(1).max(12).optional().describe('De koppen boven de bedragen, bijv. ["Premie per maand", "Met korting"]'),
      rijen: z
        .array(z.object({ pakket: tekst(160).describe('Pakket of verzekering'), waarden: z.array(z.string().trim().max(80)).max(12).describe('Eén waarde per kolom, in dezelfde volgorde') }))
        .max(80)
        .optional(),
      toelichting: leegbaar(3000).describe('Tekst onder de tabel'),
      volgorde,
    }),
    async (ctx, a) => {
      if (!a.id) verplicht(a, { titel: 'titel', jaar: 'jaar', verzekeraar: 'verzekeraar', kolommen: 'kolommen', rijen: 'rijen' })
      const oud = a.id ? await nieuwste(ctx, 'premies', a.id) : ({} as Doc)
      const kolommen = a.kolommen ?? kolommenVan(oud)
      const rijen = a.rijen ?? rijenVan(oud)
      const scheef = rijen.filter((r) => r.waarden.length !== kolommen.length)
      if (scheef.length) {
        throw new ToolFout(
          `Niet opgeslagen: er zijn ${kolommen.length} kolommen, maar deze rijen hebben een ander aantal waarden: ${scheef
            .slice(0, 8)
            .map((r) => `"${r.pakket}" (${r.waarden.length})`)
            .join(', ')}. Geef elke rij precies ${kolommen.length} waarden (gebruik een lege tekst voor een leeg vakje).`,
        )
      }
      const doc = await opslaan(
        ctx,
        'premies',
        a.id,
        gegeven({
          title: a.titel,
          year: a.jaar,
          insurer: a.verzekeraar,
          note: a.toelichting,
          columns: a.kolommen?.map((label) => ({ label })),
          rows: a.rijen?.map((r) => ({ label: r.pakket, cells: r.waarden.map((value) => ({ value })) })),
          order: a.volgorde,
        }),
      )
      return naOpslaan(ctx, 'premies', doc, premieVol(doc, false), !a.id)
    },
  ),

  /* ── vragen en antwoorden ── */
  tool(
    'vragen_lijst',
    'Vragen en antwoorden bekijken',
    'lezen',
    `Vragen en antwoorden (FAQ) met id, vraag, antwoord, de pagina waar ze bij horen, volgorde en status. Filter bij voorkeur op pagina: ${opsomming(PAGE_OPTIONS)}.`,
    z.object({ pagina: z.enum(PAGINAS).optional().describe('Alleen de vragen bij deze pagina') }),
    async (ctx, a) => {
      const [alles, live] = await Promise.all([lijst(ctx, 'vragen', a.pagina ? { page: { equals: a.pagina } } : {}), liveIds(ctx, 'vragen')])
      return { aantal: alles.length, vragen: alles.map((d) => vraagVol(d, live.has(d.id))) }
    },
  ),
  tool(
    'vraag_opslaan',
    'Vraag en antwoord toevoegen of wijzigen (als concept)',
    'schrijven',
    `Voegt een vraag met antwoord toe (zonder id; vraag, antwoord en pagina zijn dan verplicht) of wijzigt een bestaande (met id; velden die je weglaat blijven zoals ze zijn). Wordt altijd opgeslagen als concept; je krijgt een previewlink terug. De site spreekt de lezer aan met u. Pagina's: ${opsomming(PAGE_OPTIONS)}.`,
    z.object({
      id: id.optional().describe('Id van een bestaande vraag. Weglaten = nieuwe vraag.'),
      vraag: tekst(300).optional(),
      antwoord: tekst(5000).optional(),
      pagina: z.enum(PAGINAS).optional().describe('Bij welke pagina de vraag hoort'),
      volgorde,
    }),
    async (ctx, a) => {
      if (!a.id) verplicht(a, { vraag: 'vraag', antwoord: 'antwoord', pagina: 'pagina' })
      const doc = await opslaan(ctx, 'vragen', a.id, gegeven({ question: a.vraag, answer: a.antwoord, page: a.pagina, order: a.volgorde }))
      return naOpslaan(ctx, 'vragen', doc, vraagVol(doc, false), !a.id)
    },
  ),
  tool(
    'vraag_verwijderen',
    'Vraag en antwoord verwijderen',
    'verwijderen',
    'Verwijdert een vraag met antwoord direct van de site en uit het CMS. Dit kan niet ongedaan worden gemaakt en werkt alleen met bevestig: true, nadat de gebruiker uitdrukkelijk heeft gezegd dat de vraag weg mag.',
    z.object({ id, bevestig }),
    (ctx, a) => verwijderen(ctx, 'vragen', a.id, a.bevestig),
  ),

  /* ── instellingen ── */
  tool(
    'kerncijfers_lezen',
    'Kerncijfers en contactgegevens bekijken',
    'lezen',
    'De kerncijfers (schoolbesturen, scholen, gemiddelde besparing, jaren ervaring, korting zorgverzekering), de contactgegevens en het actuele premiejaar zoals ze op de site staan. Alleen lezen: wijzigen doet een beheerder in het CMS onder Instellingen.',
    z.object({}),
    async (ctx) => {
      const s = (await ctx.payload.findGlobal({ slug: 'instellingen', depth: 0, overrideAccess: false, user: ctx.user })) as Instellingen
      return {
        kerncijfers: {
          schoolbesturen: s.figures?.boards,
          scholen: s.figures?.schools,
          gemiddelde_besparing: s.figures?.saving,
          ervaring: s.figures?.years,
          korting_zorgverzekering: s.figures?.insuranceDiscount,
        },
        contact: {
          telefoon: s.contact?.phone,
          email: s.contact?.email,
          adres: [s.contact?.street, [s.contact?.postalCode, s.contact?.city].filter(Boolean).join(' ')].filter(Boolean).join(', '),
          kvk: s.contact?.kvk,
          linkedin: s.contact?.linkedin,
          mijn_oig: s.contact?.portalUrl,
        },
        zorgverzekering: { actueel_premiejaar: s.insurance?.year, melding_zonder_premies: s.insurance?.notice },
      }
    },
  ),

  /* ── concept en publiceren ── */
  tool(
    'concepten',
    'Wat wacht er als concept',
    'lezen',
    'Alles wat als concept wacht en dus nog niet op de site staat: nieuwe items en wijzigingen op gepubliceerde items, elk met een previewlink (24 uur geldig) waarmee de gebruiker het op de site kan bekijken. Gebruik dit voordat je publiceert.',
    z.object({}),
    async (ctx) => {
      const wacht: unknown[] = []
      for (const col of COLLECTIES) {
        const [docs, live] = await Promise.all([lijst(ctx, col, { _status: { equals: 'draft' } }), liveIds(ctx, col)])
        for (const d of docs) {
          wacht.push({
            collectie: col,
            id: d.id,
            titel: titelVan(col, d),
            soort: live.has(d.id) ? 'wijziging op een gepubliceerd item' : 'nieuw, nog nooit gepubliceerd',
            bijgewerkt: dag(d.updatedAt),
            preview: previewUrl(padVan(col, d)),
          })
        }
      }
      return { aantal: wacht.length, concepten: wacht, let_op: 'Niets hiervan staat live. Publiceren kan met de tool publiceren (collectie en id).' }
    },
  ),
  tool(
    'publiceren',
    'Concepten live zetten',
    'publiceren',
    'Zet één of meer concepten live op de site. Gebruik dit alleen als de gebruiker daar uitdrukkelijk om vraagt (bijvoorbeeld "publiceer"), nooit uit jezelf direct na het opslaan. Geef per document de collectie en het id; die staan in de tool concepten en in de lijsten.',
    z.object({
      documenten: z
        .array(z.object({ collectie: z.enum(COLLECTIES), id }))
        .min(1)
        .max(25)
        .describe('Welke documenten live moeten'),
    }),
    async (ctx, a) => {
      const resultaat: unknown[] = []
      for (const item of a.documenten) {
        try {
          const voor = await nieuwste(ctx, item.collectie, item.id)
          const doc = (await ctx.payload.update({
            collection: item.collectie,
            id: item.id,
            data: { _status: 'published' },
            draft: false,
            depth: 0,
            overrideAccess: false,
            user: ctx.user,
          })) as unknown as Doc
          resultaat.push({
            collectie: item.collectie,
            id: item.id,
            titel: titelVan(item.collectie, doc),
            resultaat: voor._status === 'published' ? 'stond al live, opnieuw gepubliceerd' : 'gepubliceerd',
            adres: `${ctx.siteUrl}${padVan(item.collectie, doc)}`,
          })
        } catch (e) {
          resultaat.push({ collectie: item.collectie, id: item.id, resultaat: 'niet gepubliceerd', reden: foutTekst(e) })
        }
      }
      return { resultaat, let_op: 'Het kan een paar tellen duren voordat de pagina de nieuwe inhoud toont.' }
    },
  ),
]

/* ───────────── uitvoer en fouten ───────────── */

export const uitvoerTekst = (resultaat: unknown): string => JSON.stringify(compact(resultaat))

type PayloadFout = { name?: string; status?: number; data?: { errors?: { label?: string; path?: string; message?: string }[] } }

/** Foutmelding in gewoon Nederlands, zonder technische details. Onverwachte fouten gaan (zonder inhoud) naar de serverlog. */
export function foutTekst(e: unknown): string {
  if (e instanceof ToolFout) return e.message
  const f = (e ?? {}) as PayloadFout
  if (f.name === 'ValidationError') {
    const velden = (f.data?.errors ?? []).map((x) => `${x.label || x.path}: ${x.message}`).slice(0, 8)
    return `Niet opgeslagen, deze velden kloppen niet: ${velden.join('; ') || 'onbekend veld'}.`
  }
  if (f.name === 'Forbidden' || f.status === 403) return 'Hiervoor heeft dit account geen rechten in het CMS.'
  if (f.name === 'NotFound' || f.status === 404) return 'Niet gevonden. Vraag eerst de lijst op om het juiste id te vinden.'
  if (f.status === 423 || f.name === 'Locked') return 'Dit document is nu bij iemand anders in het CMS geopend. Probeer het later opnieuw.'
  console.error('Claude-koppeling: tool mislukt', f.name || 'onbekende fout', f.status ?? '')
  return 'Er ging iets mis op de site. Er is niets gewijzigd; probeer het opnieuw of neem contact op met de beheerder.'
}
