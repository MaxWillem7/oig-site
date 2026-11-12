import Link from 'next/link'
import { FaqSection, PageHero, Photo } from '@/components/Blocks'
import { Arrow, Check } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { Solliciteer } from '@/components/vacatures/Solliciteer'
import { getSettings, getVacancies, pageMetadata, SITE_URL } from '@/lib/cms'
import s from '@/components/vacatures/vacatures.module.css'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/vacatures/')

/** Wat op de live site bij elke vacature terugkomt (zie docs/bronnen/vacatures.md). */
const ZOEKEN = [
  'uitgesproken teamspelers zijn',
  'een analytische inslag hebben en goed kunnen rekenen',
  'mbo+ of hbo werk- en denkniveau hebben, afhankelijk van de functie',
  'in een straal van 40 kilometer rond Zeewolde wonen',
]

const BIEDEN = [
  'een enthousiast team van betrokken collega’s',
  'een groeiende organisatie met impact op het Nederlandse onderwijs',
  'digitaal gereedschap om je werk slim te doen',
  'een team waarin fouten mogen, zolang we ervan leren',
]

export default async function VacaturesPage() {
  const [vacatures, { contact }] = await Promise.all([getVacancies(), getSettings()])
  const aantal = vacatures.length

  return (
    <>
      {aantal > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: vacatures.map((v, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: v.title,
              url: `${SITE_URL}/vacatures/${v.slug}/`,
            })),
          }}
        />
      )}

      <PageHero
        kicker="Vacatures"
        title={
          <>
            <span className="wordblock">Werken</span> bij de Onderwijs Inkoop Groep
          </>
        }
        lead="Bij de Onderwijs Inkoop Groep maak je deel uit van een team dat zich dagelijks inzet om het verschil te maken in het onderwijs. Wij helpen onderwijsinstellingen kosten te besparen, zodat zij hun middelen kunnen inzetten voor beter onderwijs. Wij waarderen mensen die initiatief tonen, analytisch sterk zijn en graag samenwerken."
        aside={
          <div className={s.heroZij}>
            <Photo
              img={{
                url: '/beeld/vacatures/collegas-darts-kantoor.jpg',
                alt: 'Vier collega’s van de Onderwijs Inkoop Groep spelen darts op kantoor',
                focus: '50% 40%',
              }}
              ratio="3 / 2"
              priority
            />
            {aantal > 0 && (
              <p className={s.teller}>
                <span className={s.tellerGetal}>{aantal}</span>
                <span className={s.tellerTekst}>{aantal === 1 ? 'openstaande vacature' : 'openstaande vacatures'}</span>
                <span className={s.tellerPlaats}>Op kantoor in {contact.city}</span>
              </p>
            )}
          </div>
        }
      />

      {aantal > 0 ? (
        <section className={`section ${s.lijstSectie}`}>
          <div className={`container ${s.lijst}`}>
            {vacatures.map((v) => {
              const chips = [v.hours, v.education, v.location].filter(Boolean)
              return (
                <article key={v.id} className={s.kaart}>
                  <div className={s.kaartTekst}>
                    <h2 className={s.kaartTitel}>
                      <Link href={`/vacatures/${v.slug}/`}>{v.title}</Link>
                    </h2>
                    {chips.length > 0 && (
                      <ul className={s.chips}>
                        {chips.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    )}
                    <p className={s.teaser}>{v.teaser}</p>
                  </div>
                  <span className={`btn btn--secundair ${s.kaartKnop}`} aria-hidden>
                    Bekijk vacature <Arrow />
                  </span>
                </article>
              )
            })}
          </div>
        </section>
      ) : (
        <section className={`section ${s.lijstSectie}`}>
          <div className="container">
            <div className={`stack ${s.leeg}`}>
              <h2 className="h3">Op dit moment staan er geen vacatures open</h2>
              <p className="lead">
                Denk je dat je bij ons past? Stuur dan een open sollicitatie via het formulier hieronder, of bel of
                mail ons gerust.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="section section--creme">
        <div className="container split">
          <div className="stack">
            <p className="kicker">Wie wij zoeken</p>
            <h2 className={s.kolomKop}>Wij zoeken mensen die</h2>
            <ul className={s.regels}>
              {ZOEKEN.map((t) => (
                <li key={t}>
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="stack">
            <p className="kicker">Wat wij bieden</p>
            <h2 className={s.kolomKop}>Bij elke functie</h2>
            <ul className={`${s.regels} ${s.regelsPijl}`}>
              {BIEDEN.map((t) => (
                <li key={t}>
                  <Arrow />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection page="vacatures" />

      {aantal === 0 && (
        <Solliciteer
          contact={contact}
          title="Open sollicitatie"
          text="Vertel ons wat je zoekt en stuur je cv en motivatiebrief mee via het formulier."
        />
      )}
    </>
  )
}
