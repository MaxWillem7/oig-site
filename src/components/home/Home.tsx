import Image from 'next/image'
import Link from 'next/link'
import {
  Bike,
  CircleEuro,
  ClipboardList,
  FileCheck,
  FileText,
  Heart,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Avatar, CtaBand } from '@/components/Blocks'
import { Arrow, External } from '@/components/Icons'
import { getSettings, getTeam, getVacancies, media } from '@/lib/cms'
import { HERO_TILES, MAIN_QUOTE, SERVICES, SIDE_QUOTES, STEPS } from './content'
import s from './home.module.css'

const ICONS = {
  aanbesteden: FileCheck,
  inkoop: ShoppingCart,
  premiedesk: ShieldCheck,
  subsidiedesk: CircleEuro,
  inkoopbeleid: ClipboardList,
  verzekeringen: Heart,
} as const

const TILE_TONE = {
  groen: s.tileGroen,
  creme: s.tileCreme,
  blauwLicht: s.tileBlauwLicht,
  blauw: s.tileBlauw,
} as const
const ICON_TONE = { groen: 'icon-tile--groen', creme: '', blauw: 'icon-tile--blauw' } as const

/** Kop van een sectie met rechts een korte inleiding of een link. */
function Head({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <div className={s.head}>
      <div className={`stack ${s.headText}`}>
        <p className="kicker">{kicker}</p>
        <h2 className="h2">{title}</h2>
      </div>
      {children && <div className={s.headAside}>{children}</div>}
    </div>
  )
}

export async function Home() {
  const [{ figures, insurance }, team, vacancies] = await Promise.all([
    getSettings(),
    getTeam(),
    getVacancies(),
  ])

  const picked = team.filter((m) => m.onHome)
  const faces = (picked.length > 0 ? picked : team).slice(0, 4)

  return (
    <>
      {/* 1. Hero */}
      <section className={`section ${s.hero}`}>
        <div className={`container ${s.heroGrid}`}>
          <div className={`stack ${s.heroText}`}>
            <p className="kicker">Inkoopcollectief</p>
            <h1 className={`h1 ${s.heroTitle}`}>
              Meer budget voor het <span className="wordblock">onderwijs</span>
            </h1>
            <p className="lead">
              De Onderwijs Inkoop Groep neemt schoolbesturen het inkoopwerk uit handen: van
              inkoopscan en (Europese) aanbesteding tot contractbeheer. Zo houdt u meer budget over
              voor leerkrachten, boeken en goed onderwijs.
            </p>
            <div className="btn-rij">
              <Link href="/contact/" className="btn btn--primair">
                Plan een kennismaking <Arrow />
              </Link>
              <Link href="/diensten/" className="btn btn--secundair">
                Bekijk onze diensten
              </Link>
            </div>
            <dl className={s.trust}>
              <div>
                <dd>{figures.boards}</dd>
                <dt>schoolbesturen</dt>
              </div>
              <div>
                <dd>{figures.schools}</dd>
                <dt>scholen</dt>
              </div>
              <div>
                <dd>{figures.years}</dd>
                <dt>ervaring in onderwijsinkoop</dt>
              </div>
            </dl>
          </div>

          <ul className={s.tiles}>
            {HERO_TILES.map((t) => {
              const Icon = ICONS[t.key]
              return (
                <li key={t.key}>
                  <Link href={t.href} className={`${s.tile} ${TILE_TONE[t.tone]}`}>
                    <Icon strokeWidth={1.4} aria-hidden />
                    <span className={s.tileText}>
                      <span className={s.tileTitle}>{t.title}</span>
                      <span className={s.tileSub}>{t.text}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* 2. Diensten */}
      <section className="section section--creme">
        <div className="container">
          <Head kicker="Diensten" title="Alles wat uw bestuur inkoopt, onder één dak">
            <p className="zacht">
              Van inkoopscan tot contractbeheer. U kiest zelf welke diensten u inzet.
            </p>
          </Head>
          <ul className={`grid-3 ${s.services}`}>
            {SERVICES.map((d) => {
              const Icon = ICONS[d.key]
              return (
                <li key={d.key} className={`card ${s.service}`}>
                  <span className={`icon-tile ${ICON_TONE[d.tone]} ${s.serviceIcon}`}>
                    <Icon strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="h3">{d.title}</h3>
                  <p className={`zacht ${s.serviceText}`}>{d.text}</p>
                  <Link href={d.href} className={`textlink ${s.serviceLink}`}>
                    <span>{d.link}</span> <Arrow />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* 3. Het collectief */}
      <section className="section section--blauw">
        <div className="container split split--midden">
          <div className={`stack ${s.collectiveText}`}>
            <p className="kicker">Het collectief</p>
            <h2 className="h2">Krachtig inkopen, meer budget voor het onderwijs</h2>
            <p>
              Al {figures.years} helpt de Onderwijs Inkoop Groep scholen in het primair onderwijs
              met besparen. Het resultaat: minder geld dat uit het onderwijs stroomt, dus meer
              budget voor leerkrachten, boeken, schoolpleinen en alles wat nodig is voor beter
              onderwijs.
            </p>
          </div>
          <dl className={s.stats}>
            <div>
              <dd>{figures.boards}</dd>
              <dt>schoolbesturen in het collectief</dt>
            </div>
            <div>
              <dd>{figures.schools}</dd>
              <dt>scholen in het primair onderwijs</dt>
            </div>
            <div>
              <dd className={s.statAccent}>{figures.saving}</dd>
              <dt>gemiddelde besparing bij onze klanten</dt>
            </div>
            <div>
              <dd>{figures.years}</dd>
              <dt>ervaring met onderwijsinkoop</dt>
            </div>
          </dl>
        </div>
      </section>

      {/* 4. Werkwijze */}
      <section className="section">
        <div className="container">
          <Head kicker="Werkwijze" title="Beter inkopen in zeven stappen">
            <Link href="/werkwijze/" className="textlink">
              Bekijk de volledige werkwijze <Arrow />
            </Link>
          </Head>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.title}>
                <span className={s.stepNr} aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className={s.stepTitle}>{st.title}</h3>
                  <p className={s.stepText}>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Ervaringen */}
      <section className="section section--creme">
        <div className="container">
          <div className={`stack ${s.quotesHead}`}>
            <p className="kicker">Ervaringen</p>
            <h2 className="h2">{figures.schools} scholen gingen u voor</h2>
          </div>
          <div className={s.quotes}>
            <figure className={s.mainQuote}>
              <blockquote>
                <p>“{MAIN_QUOTE.text}”</p>
              </blockquote>
              <figcaption>
                <span className={s.quoteLogo}>
                  <Image
                    src={MAIN_QUOTE.logo.url}
                    alt={MAIN_QUOTE.logo.alt}
                    width={96}
                    height={48}
                    unoptimized
                  />
                </span>
                <span className={s.quoteBy}>
                  <strong>{MAIN_QUOTE.name}</strong>
                  <span>{MAIN_QUOTE.role}</span>
                </span>
              </figcaption>
            </figure>
            <div className={s.sideQuotes}>
              {SIDE_QUOTES.map((q) => (
                <figure key={q.by} className={s.sideQuote}>
                  <blockquote>
                    <p>“{q.text}”</p>
                  </blockquote>
                  <figcaption>{q.by}</figcaption>
                </figure>
              ))}
              <Link href="/referenties/" className="textlink">
                Alle referenties <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Direct voordeel */}
      <section className="section">
        <div className="container">
          <Head kicker="Direct voordeel" title="Voordeel voor uw scholen en medewerkers">
            <p className="zacht">
              Regelingen die aangesloten besturen direct gebruiken of doorgeven aan hun medewerkers.
            </p>
          </Head>
          <ul className={`grid-3 ${s.perks}`}>
            <li className={s.perk}>
              <span className="icon-tile">
                <Heart strokeWidth={1.6} aria-hidden />
              </span>
              <div className={s.perkBody}>
                <h3>Collectieve zorgverzekering</h3>
                <p>
                  {figures.insuranceDiscount.replace(/^t/, 'T')} korting op de aanvullende
                  verzekering. In veel gevallen is overstappen niet nodig.
                </p>
                <Link href="/dienst/verzekeringen/#premies" className="textlink">
                  Bekijk de premies {insurance.year} <Arrow />
                </Link>
              </div>
            </li>
            <li className={s.perk}>
              <span className="icon-tile icon-tile--groen">
                <Bike strokeWidth={1.6} aria-hidden />
              </span>
              <div className={s.perkBody}>
                <h3>Fietsplan en leasefiets</h3>
                <p>
                  Een fiets van de zaak voor uw medewerkers: een duurzaam en gezond alternatief voor
                  woon-werkverkeer.
                </p>
                <Link href="/fietsplan-onderwijs/" className="textlink">
                  Zo werkt het fietsplan <Arrow />
                </Link>
              </div>
            </li>
            <li className={s.perk}>
              <span className="icon-tile icon-tile--blauw">
                <FileText strokeWidth={1.6} aria-hidden />
              </span>
              <div className={s.perkBody}>
                <h3>Onderwijspapier</h3>
                <p>Bestel voordelig en eenvoudig papier voor uw scholen op onderwijspapier.nl.</p>
                <a
                  href="https://onderwijspapier.nl/"
                  target="_blank"
                  rel="noopener"
                  className="textlink"
                >
                  Naar onderwijspapier.nl <External />
                  <span className="sr-only">(opent in een nieuw tabblad)</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 7. Team en vacatures */}
      <section className={`section ${s.teamSection}`}>
        <div className={`container ${s.teamGrid}`}>
          <div className={s.teamCard}>
            <div className={`stack ${s.cardText}`}>
              <p className="kicker">Team</p>
              <h2 className={s.cardTitle}>Wie wij zijn</h2>
              <p className="zacht">
                Inkoopadviseurs, aanbestedingsspecialisten, contractbeheerders en
                dossierspecialisten. Maak kennis met de mensen van de Onderwijs Inkoop Groep.
              </p>
            </div>
            {faces.length > 0 ? (
              <div className={s.faces}>
                {faces.map((m) => {
                  const img = media(m.photo, 'portret')
                  return (
                    <div key={m.id} className={s.face}>
                      {img ? (
                        <Image
                          src={img.url}
                          alt={img.alt || `${m.name}, ${m.role}`}
                          fill
                          sizes="140px"
                          style={{ objectFit: 'cover', objectPosition: img.focus || '50% 25%' }}
                        />
                      ) : (
                        <>
                          <Avatar name={m.name} className={s.faceAvatar} />
                          <span className="sr-only">
                            {m.name}, {m.role}
                          </span>
                        </>
                      )}
                    </div>
                  )
                })}
                <Link href="/ons-team/" className={s.teamLink}>
                  Hele team <Arrow />
                </Link>
              </div>
            ) : (
              <Link href="/ons-team/" className={`btn btn--secundair ${s.jobsBtn}`}>
                Bekijk het hele team <Arrow />
              </Link>
            )}
          </div>

          <div className={s.jobsCard}>
            <div className={`stack ${s.cardText}`}>
              <p className={`kicker ${s.jobsKicker}`}>Solliciteer</p>
              <h2 className={s.cardTitle}>Werken bij de OIG</h2>
              {vacancies.length > 0 && <p>Bekijk onze openstaande vacatures.</p>}
            </div>
            <Link href="/vacatures/" className={`btn btn--wit ${s.jobsBtn}`}>
              Bekijk vacatures
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Afsluiter */}
      <CtaBand />
    </>
  )
}
