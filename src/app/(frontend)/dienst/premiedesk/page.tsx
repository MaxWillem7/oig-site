import Link from 'next/link'
import { FileSearch, ShieldCheck } from 'lucide-react'
import { ContactSection, CtaBand, FaqSection, PageHero, Photo } from '@/components/Blocks'
import { Arrow, Check } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { Steps } from '@/components/premiedesk/Steps'
import s from '@/components/premiedesk/premiedesk.module.css'
import { pageMetadata } from '@/lib/cms'
import { service } from '@/lib/jsonld'
import { PAGES } from '@/lib/pages'

const PATH = '/dienst/premiedesk/'

export const revalidate = 300
export const generateMetadata = () => pageMetadata(PATH)

const begrippen = [
  {
    afk: 'Whk',
    kleur: s.afkGroen,
    naam: 'Werkhervattingskas',
    tekst:
      'De premie die u jaarlijks betaalt, bestaande uit de WGA-premie en de ZW-premie. Voor veel schoolbesturen een aanzienlijke kostenpost.',
  },
  {
    afk: 'WGA',
    kleur: s.afkBlauw,
    naam: 'Werkhervatting Gedeeltelijk Arbeidsgeschikten',
    tekst:
      'De kosten van (ex-)werknemers die na twee jaar ziekte recht hebben op een WGA-uitkering. Het grootste en vaak meest complexe deel van uw Whk-premie.',
  },
  {
    afk: 'ZW',
    kleur: s.afkOranje,
    naam: 'Ziektewet',
    tekst:
      'Vallen (ex-)medewerkers binnen vier weken ziek uit, vaak na afloop van een tijdelijk contract, dan neemt het UWV de uitkering over. Twee jaar later ziet u dat terug in een hogere ZW-premie.',
  },
]

const oplossingen = [
  {
    icon: <FileSearch />,
    tile: 'icon-tile icon-tile--blauw',
    titel: 'WGA-scan',
    tekst:
      'Veel Whk-beschikkingen van de Belastingdienst bevatten onjuistheden die leiden tot een onnodig hoge WGA-premie, vaak door fouten in de verrekening van dossiers van ex-werknemers. De WGA-scan is een vrijblijvende en diepgaande analyse om deze fouten op te sporen.',
    punten: [
      'Grondige dossieranalyse',
      'Fouten herkennen en herstellen',
      'Bezwaar en herstel',
      'Direct financiële impact',
    ],
  },
  {
    icon: <ShieldCheck />,
    tile: 'icon-tile',
    titel: 'ZW-premie optimalisatie',
    tekst:
      'Veel schoolbesturen betalen onnodige opslagen op de ZW-premie na uitval van ex-medewerkers. Die premie is niet alleen een terugbetaling van de uitkering: daarbovenop betaalt u vaak een opslag van 40% tot 75%. Met onze collectieve aanpak krijgt u grip op dit proces.',
    punten: [
      'Voorkom onnodige premie-opslagen',
      "Beter inzicht in en controle over kosten en risico's",
      'Schaalvoordelen en deskundige begeleiding',
      'Financiële ruimte voor goed onderwijs',
    ],
  },
]

const stappen = [
  {
    title: 'Analyse van uw beschikking',
    text: 'Wij analyseren uw huidige Whk-beschikking en de kennisgevingen van het UWV.',
  },
  {
    title: 'Dossieronderzoek',
    text: 'Geaccrediteerde professionals controleren de onderliggende dossiers op fouten die uw premielast onnodig verhogen.',
  },
  {
    title: 'Advies op maat',
    text: 'Binnen 24 uur na ontvangst van uw documenten krijgt u advies over mogelijke besparingen.',
  },
  {
    title: 'Bezwaar en herstel',
    text: 'Wij laten gevonden fouten herstellen, zodat uw WGA-premie omlaaggaat.',
  },
]

export default function PremiedeskPage() {
  return (
    <>
      <JsonLd data={service({ name: 'Premiedesk Whk-premie', description: PAGES[PATH].description, path: PATH })} />

      <PageHero
        crumbs={[
          { name: 'Diensten', path: '/diensten/' },
          { name: 'Premiedesk', path: PATH },
        ]}
        kicker="Premiedesk"
        title={
          <>
            Besparen op uw <span className="wordblock">Whk-premie</span>
          </>
        }
        lead="Als onderwijsorganisatie betaalt u jaarlijks een premie voor de Werkhervattingskas (Whk), bestaande uit de WGA-premie en de ZW-premie. Dit is een aanzienlijke kostenpost. De OIG Premiedesk helpt u structureel te besparen op beide delen, zodat u meer budget overhoudt voor het onderwijs."
        aside={
          <Photo
            img={{
              url: '/beeld/premiedesk/oig-108.jpg',
              alt: 'Twee adviseurs van de Onderwijs Inkoop Groep in overleg aan een bureau met een laptop',
              focus: '60% 45%',
            }}
            ratio="1 / 1"
            priority
          />
        }
      >
        <Link href="/contact/" className="btn btn--primair">
          Plan een kennismaking <Arrow />
        </Link>
        <a href="#whk-premie" className="btn btn--secundair">
          Wat is de Whk-premie?
        </a>
      </PageHero>

      <section className="section section--creme" id="whk-premie">
        <div className="container split">
          <div className={`stack ${s.uitleg}`}>
            <p className="kicker">Uitleg</p>
            <h2 className="h2">Wat is de Whk-premie?</h2>
            <p>
              Als werkgever in het onderwijs betaalt u elk jaar een premie voor de Werkhervattingskas (Whk). Die premie
              bestaat uit twee delen: de WGA-premie en de ZW-premie.
            </p>
            <p>
              Elk jaar ontvangt u van de Belastingdienst een brief met het nieuwe premiepercentage. Veel van deze
              Whk-beschikkingen bevatten onjuistheden die leiden tot een onnodig hoge WGA-premie, vaak door fouten in de
              verrekening van dossiers van ex-werknemers.
            </p>
          </div>
          <dl className={s.begrippen}>
            {begrippen.map((b) => (
              <div key={b.afk} className={s.begrip}>
                <dt className={`${s.afk} ${b.kleur}`}>{b.afk}</dt>
                <dd>
                  <h3 className={s.begripTitel}>{b.naam}</h3>
                  <p>{b.tekst}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={s.kop}>
            <div className={`stack ${s.kopTekst}`}>
              <p className="kicker">Wat wij doen</p>
              <h2 className="h2">Twee oplossingen voor een lagere Whk-premie</h2>
            </div>
            <div className={s.voorWie}>
              <p className="label">Voor wie</p>
              <p>Voor schoolbesturen in het primair onderwijs die grip willen op hun Whk-premie.</p>
            </div>
          </div>
          <div className="grid-2">
            {oplossingen.map((o) => (
              <article key={o.titel} className={`card ${s.oplossing}`}>
                <span className={o.tile} aria-hidden>
                  {o.icon}
                </span>
                <h3 className={s.oplossingTitel}>{o.titel}</h3>
                <p>{o.tekst}</p>
                <ul className="checks">
                  {o.punten.map((p) => (
                    <li key={p}>
                      <Check />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Steps
        kicker="Onze aanpak"
        title="Van beschikking tot bezwaar, wij doen het werk"
        lead="De WGA-scan is vrijblijvend. Onze professionals nemen het volledige proces uit handen."
        steps={stappen}
      >
        <figure className={s.citaat}>
          <blockquote>
            <p>
              “De OIG is voor mij een betrouwbare partner die goed begrijpt wat er speelt in het onderwijs en zich inzet
              voor de beste oplossingen.”
            </p>
          </blockquote>
          <figcaption>Irene Verbeet, directeur-bestuurder, De Oversteek</figcaption>
        </figure>
      </Steps>

      <FaqSection page="premiedesk" tone="creme" title="Vragen over de Whk-premie en de Premiedesk" />

      <ContactSection
        tone="wit"
        title="Neem contact op met ons team"
        lead="Wilt u weten of uw Whk-beschikking klopt? Neem gerust contact met ons op."
      />

      <CtaBand />
    </>
  )
}
