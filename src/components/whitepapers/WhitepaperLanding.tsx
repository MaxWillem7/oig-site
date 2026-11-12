import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, FileText, Search, TrendingUp } from 'lucide-react'
import { CtaBand, PageHero, Photo } from '@/components/Blocks'
import { WhitepaperForm } from '@/components/forms'
import { Check } from '@/components/Icons'
import { getSettings, getWhitepaper, telHref } from '@/lib/cms'
import type { LandingContent } from './content'
import s from './WhitepaperLanding.module.css'

const CARD_ICONS = [
  { Icon: Search, tone: 'icon-tile--blauw' },
  { Icon: TrendingUp, tone: 'icon-tile--groen' },
  { Icon: FileText, tone: '' },
] as const

/**
 * Sjabloon voor een landingspagina van een whitepaper: hero met cover, wat erin staat, samenvatting en
 * voor wie, aanvraagformulier (enige blauwe sectie, anker #whitepaper-form), citaat met kerncijfers.
 * Staat de whitepaper (nog) niet met een PDF in het CMS, dan verdwijnen het formulier en de knop ernaartoe.
 */
export async function WhitepaperLanding({ lp }: { lp: LandingContent }) {
  const [{ figures, contact }, whitepaper] = await Promise.all([getSettings(), getWhitepaper(lp.slug)])
  const file = whitepaper?.file
  const canRequest = Boolean(file && typeof file === 'object' && file.url)

  const cijfers = [
    { value: figures.boards, label: 'schoolbesturen in het collectief' },
    { value: figures.schools, label: 'scholen in het primair onderwijs' },
    { value: figures.years, label: 'ervaring met onderwijsinkoop' },
  ]

  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Whitepapers', path: '/whitepapers/' },
          { name: lp.crumb, path: lp.path },
        ]}
        kicker="Gratis whitepaper"
        title={
          <span className={s.titel}>
            {lp.title[0]} <span className="wordblock">{lp.title[1]}</span> {lp.title[2]}
          </span>
        }
        lead={lp.lead}
        aside={
          <div className={s.coverVlak}>
            <Image
              src={lp.cover.url}
              alt={lp.cover.alt}
              width={708}
              height={1000}
              sizes="(min-width: 1000px) 320px, 60vw"
              priority
              className={s.cover}
            />
          </div>
        }
      >
        {canRequest && (
          <a href="#whitepaper-form" className="btn btn--primair">
            Whitepaper aanvragen <ArrowDown aria-hidden strokeWidth={2.2} />
          </a>
        )}
        <Link href="/contact/" className={`btn ${canRequest ? 'btn--secundair' : 'btn--primair'}`}>
          Plan een kennismaking
        </Link>
      </PageHero>

      <section className="section section--creme">
        <div className="container">
          <div className={s.kop}>
            <div className="stack" style={{ '--gap': '18px' } as React.CSSProperties}>
              <p className="kicker">Wat staat erin</p>
              <h2 className="h2">{lp.contents.title}</h2>
            </div>
            <p className={`zacht ${s.kopTekst}`}>{lp.contents.aside}</p>
          </div>
          <ul className="grid-3">
            {lp.contents.cards.map((card, i) => {
              const { Icon, tone } = CARD_ICONS[i]
              return (
                <li key={card.title} className={`card ${s.kaart}`}>
                  <span className={`icon-tile ${tone}`}>
                    <Icon aria-hidden />
                  </span>
                  <h3 className="h3">{card.title}</h3>
                  <p className="zacht">{card.text}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.inhoud}`}>
          <div className="stack">
            <p className="kicker">Samenvatting</p>
            <h2 className="h2">{lp.summary.title}</h2>
            {lp.summary.paragraphs.map((p) => (
              <p key={p} className={s.alinea}>
                {p}
              </p>
            ))}
            <Photo
              img={lp.summary.photo}
              ratio="16 / 9"
              sizes="(min-width: 1000px) 660px, 100vw"
              className={s.foto}
            />
          </div>
          <div className={s.zijkant}>
            <div className={s.vlak}>
              <p className="label">Voor wie</p>
              <h3 className="h3">{lp.audience.title}</h3>
              <ul className="checks">
                {lp.audience.points.map((point) => (
                  <li key={point}>
                    <Check />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.vlak}>
              <p className="label">In deze whitepaper</p>
              <ol className={s.hoofdstukken}>
                {lp.chapters.map((chapter) => (
                  <li key={chapter}>{chapter}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {canRequest && (
        <section className={`section section--blauw ${s.aanvraag}`} id="whitepaper-form">
          <div className="container split split--midden">
            <div className="stack">
              <p className="kicker">Aanvragen</p>
              <h2 className="h2">{lp.form.title}</h2>
              <p className="lead">
                Vul uw gegevens in. Na het verzenden kunt u de gratis whitepaper direct downloaden.
              </p>
              <div className={s.direct}>
                <p className={s.directKop}>Liever direct overleggen?</p>
                <p>
                  Bel <a href={telHref(contact.phone)}>{contact.phone}</a> of mail{' '}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </div>
            </div>
            <div className={s.formKaart}>
              <WhitepaperForm slug={lp.slug} />
            </div>
          </div>
        </section>
      )}

      <section className="section section--creme">
        <div className={`container ${s.ervaring}`}>
          <figure className={`stack ${s.citaat}`}>
            <p className="kicker">Ervaring</p>
            <h2 className="sr-only">Ervaring van een schoolbestuur</h2>
            <blockquote>
              <p>“{lp.quote.text}”</p>
            </blockquote>
            <figcaption className={s.afzender}>
              <span className={s.logo}>
                <Image
                  src={lp.quote.logo.url}
                  alt={lp.quote.logo.alt}
                  width={lp.quote.logo.width}
                  height={lp.quote.logo.height}
                  unoptimized
                />
              </span>
              <span className={s.naam}>
                <strong>{lp.quote.name}</strong>
                <span>{lp.quote.role}</span>
              </span>
            </figcaption>
          </figure>
          <dl className={s.cijfers}>
            {cijfers.map((c) => (
              <div key={c.label}>
                <dt>{c.label}</dt>
                <dd>{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
