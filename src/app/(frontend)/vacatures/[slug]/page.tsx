import { Clock, GraduationCap, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero, Photo } from '@/components/Blocks'
import { Arrow, Check } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { Solliciteer } from '@/components/vacatures/Solliciteer'
import { buildMetadata, getSettings, getVacancies, getVacancy, media, telHref } from '@/lib/cms'
import { jobPosting } from '@/lib/jsonld'
import s from '@/components/vacatures/vacatures.module.css'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }
type Groep =
  | {
      title?: string | null
      intro?: string | null
      items?: { text: string; id?: string | null }[] | null
      outro?: string | null
    }
  | null
  | undefined

const punten = (g: Groep) => (g?.items ?? []).filter((i) => i.text?.trim())
const gevuld = (g: Groep) => Boolean(g?.intro?.trim() || g?.outro?.trim()) || punten(g).length > 0
/** Platte tekst van een punt: zonder ## (tussenkop) en ** (vet). */
const plat = (t: string) => t.replace(/^##\s*/, '').replace(/\*\*/g, '')
const euro = (n: number) => `€ ${n.toLocaleString('nl-NL')}`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const v = await getVacancy(slug)
  if (!v) return { title: 'Vacature niet gevonden', robots: { index: false, follow: true } }
  return buildMetadata(`/vacatures/${v.slug}/`, { title: `Vacature ${v.title} | OIG`, description: v.teaser })
}

/** Tekst met **vet** erin. */
function Vet({ text }: { text: string }) {
  const delen = text.split(/\*\*(.+?)\*\*/g)
  return <>{delen.map((d, i) => (i % 2 === 1 ? <strong key={i}>{d}</strong> : d))}</>
}

/**
 * Een blok met kop, inleiding, punten en slottekst. Een punt dat met ## begint is een tussenkop: de punten
 * erna komen in een eigen lijst (zoals "Dossierregie" en "Samenwerking" op de oude site).
 */
function Blok({
  title,
  groep,
  icoon,
  className,
}: {
  title: string
  groep: Groep
  icoon: 'punt' | 'vink' | 'pijl'
  className?: string
}) {
  if (!gevuld(groep)) return null
  const lijsten: { kop?: string; items: { text: string; id?: string | null }[] }[] = []
  for (const i of punten(groep)) {
    const kop = i.text.match(/^##\s*(.+)$/)
    if (kop) lijsten.push({ kop: kop[1].trim(), items: [] })
    else {
      if (lijsten.length === 0) lijsten.push({ items: [] })
      lijsten[lijsten.length - 1].items.push(i)
    }
  }
  return (
    <section className={`${s.blok} ${className ?? ''}`}>
      <h2>{groep?.title?.trim() || title}</h2>
      {groep?.intro?.trim() && <p>{groep.intro}</p>}
      {lijsten.map((l, lidx) => (
        <div key={lidx} className={s.lijstDeel}>
          {l.kop && (
            <p className={s.tussenkop}>
              <strong>{l.kop}</strong>
            </p>
          )}
          {l.items.length > 0 && (
            <ul className={`${s.punten} ${icoon === 'pijl' ? s.puntenPijl : ''}`}>
              {l.items.map((i, idx) => (
                <li key={i.id ?? idx} className={icoon === 'punt' ? s.punt : undefined}>
                  {icoon === 'vink' && <Check />}
                  {icoon === 'pijl' && <Arrow />}
                  <span>
                    <Vet text={i.text} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {groep?.outro?.trim() && <p>{groep.outro}</p>}
    </section>
  )
}

export default async function VacaturePage({ params }: Props) {
  const { slug } = await params
  const v = await getVacancy(slug)
  if (!v) notFound()

  const [{ contact }, alle] = await Promise.all([getSettings(), getVacancies()])
  const andere = alle.filter((a) => a.id !== v.id)
  const path = `/vacatures/${v.slug}/`
  const fotos = (Array.isArray(v.photos) ? v.photos : []).map((f) => media(f, 'kaart')).filter((f) => f !== null)

  const [eerste, ...rest] = v.title.split(' ')
  const kenmerken = [
    { icon: Clock, text: v.hours },
    { icon: GraduationCap, text: v.education },
    { icon: MapPin, text: v.location },
  ].filter((k) => k.text)

  // Platte tekst voor Google for Jobs: openingstekst plus alle punten
  const omschrijving = [
    v.intro,
    ...[v.tasks, v.profile, v.seeking, v.offer, ...(v.blocks ?? [])].flatMap((g: Groep) => [
      g?.title,
      g?.intro,
      ...punten(g).map((i) => (/^##/.test(i.text) ? plat(i.text) : `- ${plat(i.text)}`)),
      g?.outro,
    ]),
    v.about,
  ]
    .map((t) => t?.trim())
    .filter(Boolean)
    .join('\n')

  return (
    <>
      <JsonLd
        data={jobPosting(
          {
            title: v.title,
            description: omschrijving || v.teaser,
            path,
            datePosted: v.datePosted,
            validThrough: v.validThrough,
            hours: v.hours,
            salaryMin: v.salary?.min,
            salaryMax: v.salary?.max,
          },
          contact,
        )}
      />

      <PageHero
        tone="creme"
        crumbs={[
          { name: 'Vacatures', path: '/vacatures/' },
          { name: v.title, path },
        ]}
        kicker="Vacature"
        title={
          <span className={s.titel} lang="nl">
            <span className="wordblock">{eerste}</span>
            {rest.length > 0 && ` ${rest.join(' ')}`}
          </span>
        }
      >
        {kenmerken.length > 0 && (
          <ul className={`${s.chips} ${s.chipsHero}`}>
            {kenmerken.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon aria-hidden strokeWidth={1.8} />
                {text}
              </li>
            ))}
          </ul>
        )}
        <a href="#solliciteren" className="btn btn--primair">
          Solliciteer direct
        </a>
        <Link href="/vacatures/" className={`btn btn--secundair ${s.witteKnop}`}>
          Alle vacatures
        </Link>
      </PageHero>

      <section className="section">
        <div className={`container ${s.inhoud}`}>
          <div className={s.tekst}>
            {v.intro?.trim() && <p className={s.opening}>{v.intro}</p>}
            <Blok title="Wat ga je doen?" groep={v.tasks} icoon="punt" />
            <Blok title="Wie ben jij?" groep={v.profile} icoon="vink" />
            <Blok title="De Onderwijs Inkoop Groep zoekt mensen die" groep={v.seeking} icoon="vink" />
            <Blok title="Wat wij bieden" groep={v.offer} icoon="pijl" className={s.bieden} />
            {(v.blocks ?? [])
              .filter((b) => b.title?.trim())
              .map((b, idx) => (
                <Blok key={b.id ?? idx} title={b.title} groep={{ ...b, title: null }} icoon="punt" />
              ))}
            {v.about?.trim() && (
              <section className={s.blok}>
                <h2>Over de Onderwijs Inkoop Groep</h2>
                <p>{v.about}</p>
              </section>
            )}
            {fotos.length > 0 && (
              <div className={s.fotos}>
                {fotos.slice(0, 3).map((f) => (
                  <Photo key={f.url} img={f} ratio="4 / 3" sizes="(min-width: 1000px) 250px, (min-width: 520px) 50vw, 100vw" />
                ))}
              </div>
            )}
          </div>

          <aside className={s.kort} aria-label="In het kort">
            <p className={s.kortKop}>In het kort</p>
            <dl className={s.kortLijst}>
              {v.hours && (
                <div>
                  <dt>Uren</dt>
                  <dd>{v.hours}</dd>
                </div>
              )}
              {v.education && (
                <div>
                  <dt>Niveau</dt>
                  <dd>{v.education}</dd>
                </div>
              )}
              {v.location && (
                <div>
                  <dt>Locatie</dt>
                  <dd>{v.location}</dd>
                </div>
              )}
              {v.salary?.min && (
                <div>
                  <dt>Salaris</dt>
                  <dd>
                    {euro(v.salary.min)}
                    {v.salary.max ? ` tot ${euro(v.salary.max)}` : ''} bruto per maand bij fulltime
                  </dd>
                </div>
              )}
            </dl>
            <a href="#solliciteren" className="btn btn--primair">
              Solliciteer direct
            </a>
            <p className={s.kortVragen}>
              Vragen? Bel <a href={telHref(contact.phone)}>{contact.phone}</a> of mail{' '}
              <a href={`mailto:${contact.email}`} style={{ whiteSpace: 'normal', overflowWrap: 'anywhere' }}>
                {contact.email}
              </a>
            </p>
          </aside>
        </div>
      </section>

      <Solliciteer
        vacancy={v.title}
        contact={contact}
        title="Solliciteer direct"
        text="Wij hopen jou snel te mogen ontvangen als onze nieuwe collega. Stuur je cv en motivatiebrief mee via het formulier."
      />

      {andere.length > 0 && (
        <section className="section section--smal">
          <div className="container">
            <h2 className={s.andereKop}>Andere vacatures</h2>
            <ul className={s.andere}>
              {andere.map((a) => (
                <li key={a.id}>
                  <Link href={`/vacatures/${a.slug}/`}>
                    <span>
                      <strong>{a.title}</strong>
                      <span>{[a.hours, a.location].filter(Boolean).join(' · ')}</span>
                    </span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
