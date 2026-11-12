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
type Groep = { intro?: string | null; items?: { text: string; id?: string | null }[] | null } | null | undefined

const punten = (g: Groep) => (g?.items ?? []).filter((i) => i.text?.trim())
const gevuld = (g: Groep) => Boolean(g?.intro?.trim()) || punten(g).length > 0
const euro = (n: number) => `€ ${n.toLocaleString('nl-NL')}`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const v = await getVacancy(slug)
  if (!v) return { title: 'Vacature niet gevonden', robots: { index: false, follow: true } }
  return buildMetadata(`/vacatures/${v.slug}/`, { title: `Vacature ${v.title} | OIG`, description: v.teaser })
}

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
  const items = punten(groep)
  return (
    <section className={`${s.blok} ${className ?? ''}`}>
      <h2>{title}</h2>
      {groep?.intro?.trim() && <p>{groep.intro}</p>}
      {items.length > 0 && (
        <ul className={`${s.punten} ${icoon === 'pijl' ? s.puntenPijl : ''}`}>
          {items.map((i, idx) => (
            <li key={i.id ?? idx} className={icoon === 'punt' ? s.punt : undefined}>
              {icoon === 'vink' && <Check />}
              {icoon === 'pijl' && <Arrow />}
              <span>{i.text}</span>
            </li>
          ))}
        </ul>
      )}
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
    ...[v.tasks, v.profile, v.seeking, v.offer].flatMap((g: Groep) => [g?.intro, ...punten(g).map((i) => `- ${i.text}`)]),
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
