import Link from 'next/link'
import { CalendarCheck, Mail, MapPin, MonitorCheck, Network, Phone, Scale } from 'lucide-react'
import { CtaBand, FaqSection, PageHero, Photo } from '@/components/Blocks'
import { InkoopscanForm } from '@/components/forms'
import { Arrow, Check, External } from '@/components/Icons'
import s from '@/components/inkoopbeleid/inkoopbeleid.module.css'
import { SavingsChart } from '@/components/inkoopbeleid/SavingsChart'
import { JsonLd } from '@/components/JsonLd'
import { Steps } from '@/components/premiedesk/Steps'
import { getSettings, pageMetadata, telHref } from '@/lib/cms'
import { service } from '@/lib/jsonld'
import { PAGES } from '@/lib/pages'

const PATH = '/inkoopbeleid/'

export const revalidate = 300
export const generateMetadata = () => pageMetadata(PATH)

const voordelen = [
  'creëert u grip op kosten en processen',
  'krijgt u inzicht in leveranciersafspraken',
  'bent u voorbereid op accountantscontroles',
]

const stappen = [
  {
    title: 'Analyse',
    text: 'Elke samenwerking begint met een grondige analyse van uw huidige inkoopstructuur en lopende contracten.',
  },
  {
    title: 'Aanbestedingskalender',
    text: 'Vervolgens stellen wij een aanbestedingskalender op.',
  },
  {
    title: 'Beleid verbeteren',
    text: 'Wij begeleiden u stap voor stap bij het verbeteren van uw inkoopbeleid.',
  },
  {
    title: 'Borgen in Mijn OIG',
    text: 'Alle overeenkomsten worden veilig geborgd in Mijn OIG, met heldere rapportages en tijdige updates voor het bestuur.',
  },
]

export default async function InkoopbeleidPage() {
  const { figures, contact } = await getSettings()

  return (
    <>
      <JsonLd data={service({ name: 'Inkoopbeleid onderwijs', description: PAGES[PATH].description, path: PATH })} />

      <PageHero
        crumbs={[
          { name: 'Diensten', path: '/diensten/' },
          { name: 'Inkoopbeleid', path: PATH },
        ]}
        kicker="Inkoopbeleid"
        title={
          <>
            Inkoopbeleid voor het <span className="wordblock">onderwijs</span>
          </>
        }
        lead="Bespaar kosten, voldoe aan wet- en regelgeving en creëer rust en overzicht. De Onderwijs Inkoop Groep helpt u bij het opstellen en uitvoeren van effectief inkoopbeleid."
        aside={
          <div className={s.collage}>
            <Photo
              className={s.fotoGroot}
              img={{
                url: '/beeld/inkoopbeleid/oig-107.jpg',
                alt: 'Drie medewerkers van de Onderwijs Inkoop Groep in overleg, een van hen schrijft op een whiteboard',
                focus: '50% 40%',
              }}
              ratio="3 / 2"
              priority
            />
            <Photo
              className={s.fotoKlein}
              img={{
                url: '/beeld/inkoopbeleid/oig-082.jpg',
                alt: 'Medewerkers van de Onderwijs Inkoop Groep luisteren naar een presentatie',
                focus: '60% 40%',
              }}
              ratio="3 / 2"
              sizes="(min-width: 1000px) 340px, 60vw"
            />
          </div>
        }
      >
        <Link href="/contact/" className="btn btn--primair">
          Plan een kennismaking <Arrow />
        </Link>
        <a href="#inkoopscan" className="btn btn--secundair">
          Vraag een gratis inkoopscan aan
        </a>
      </PageHero>

      <section className="section section--creme">
        <div className="container split">
          <div className={`stack ${s.tekst}`}>
            <p className="kicker">De basis</p>
            <h2 className="h2">Een solide basis voor rechtmatige en efficiënte inkoop</h2>
            <p>
              Inkoopbeleid is de richtlijn die bepaalt hoe uw schoolbestuur inkopen en aanbestedingen uitvoert. Het vormt
              de basis voor een transparante en doelgerichte manier van inkopen. Met een goed doordacht inkoopbeleid:
            </p>
            <ul className="checks">
              {voordelen.map((v) => (
                <li key={v}>
                  <Check />
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className={`card ${s.doen}`}>
            <p className="label">Wat wij doen</p>
            <h2 className={s.doenTitel}>Begeleiding van beleid tot praktijk</h2>
            <p className={s.doenTekst}>
              De Onderwijs Inkoop Groep ondersteunt schoolbesturen bij het opzetten én uitvoeren van inkoopbeleid. Wij
              brengen structuur aan en zorgen voor naleving van de geldende regelgeving.
            </p>
            <ul className={s.onderdelen}>
              <li>
                <span className={`icon-tile icon-tile--groen ${s.tegel}`} aria-hidden>
                  <Scale />
                </span>
                Juridische toetsing en begeleiding bij aanbestedingen
              </li>
              <li>
                <span className={`icon-tile ${s.tegel}`} aria-hidden>
                  <Network />
                </span>
                Advies over centrale of decentrale inkoopstructuren
              </li>
              <li>
                <span className={`icon-tile icon-tile--blauw ${s.tegel}`} aria-hidden>
                  <MonitorCheck />
                </span>
                <span>
                  Monitoring van contracten via{' '}
                  <a href={contact.portalUrl} target="_blank" rel="noopener">
                    Mijn OIG
                  </a>
                </span>
              </li>
              <li>
                <span className={`icon-tile icon-tile--groen ${s.tegel}`} aria-hidden>
                  <CalendarCheck />
                </span>
                Begeleiding bij zowel Europese als onderhandse aanbestedingen
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Steps
        kicker="Onze aanpak"
        title="Heldere aanpak, meetbare resultaten"
        lead="U houdt overzicht en controle, zonder extra belasting voor uw organisatie."
        steps={stappen}
      >
        <div className="btn-rij">
          <a href="#inkoopscan" className="btn btn--primair">
            Vraag een gratis inkoopscan aan <Arrow />
          </a>
          <a href={contact.portalUrl} className="btn btn--wit" target="_blank" rel="noopener">
            Naar Mijn OIG <External />
          </a>
        </div>
      </Steps>

      <section className="section">
        <div className={`container split ${s.verhouding}`}>
          <div className={`stack ${s.resultaat}`}>
            <p className="kicker">Resultaat</p>
            <h2 className="h2">Gemiddeld {figures.saving} besparing bij onze klanten</h2>
            <p>
              Uit onze benchmark onder {figures.schools} scholen blijkt dat goed inkoopbeleid direct loont. U ziet hier
              de gemiddelde besparing per inkoopsegment.
            </p>
            <figure className={s.citaat}>
              <blockquote>
                “Ik zie de OIG als een partner in het gehele inkoopbeleid van onze organisatie waarbij ik altijd met
                mijn vragen en opmerkingen terecht kan. Ook krijg ik gevraagd en ongevraagd advies.”
              </blockquote>
              <figcaption>Edward van der Beek, beleidsmedewerker, Stichting Ommeriek</figcaption>
            </figure>
          </div>
          <SavingsChart />
        </div>
      </section>

      <FaqSection page="inkoopbeleid" tone="creme" title="Vragen over inkoopbeleid in het onderwijs" />

      <section className="section" id="inkoopscan">
        <div className={`container split ${s.verhouding}`}>
          <div className={`stack ${s.scan}`}>
            <p className="kicker">Gratis inkoopscan</p>
            <h2 className="h2">Wilt u grip op uw inkoop en besparen op kosten?</h2>
            <p>
              Laat ons vrijblijvend meekijken. Met een inkoopscan brengen wij besparingskansen,
              rechtmatigheidsrisico&apos;s en verbeterpunten voor uw beleid in kaart.
            </p>
            <ul className={s.contact}>
              <li>
                <span className={`icon-tile ${s.tegel}`} aria-hidden>
                  <Phone />
                </span>
                <a href={telHref(contact.phone)}>{contact.phone}</a>
              </li>
              <li>
                <span className={`icon-tile ${s.tegel}`} aria-hidden>
                  <Mail />
                </span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <span className={`icon-tile ${s.tegel}`} aria-hidden>
                  <MapPin />
                </span>
                <span>
                  {contact.street}, {contact.postalCode} {contact.city}
                </span>
              </li>
            </ul>
          </div>
          <div className={s.formKaart}>
            <h3 className={s.formTitel}>Inkoopscan aanvragen</h3>
            <InkoopscanForm />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
