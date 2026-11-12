import Link from 'next/link'
import { Armchair, ClipboardCheck, Laptop, Leaf, Search, Send, Users } from 'lucide-react'
import { ContactSection, CtaBand, FaqSection, PageHero, Photo } from '@/components/Blocks'
import { Arrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { KopRij, Stappen, Verwijsbalk, VoorWie } from '@/components/diensten/Onderdelen'
import s from '@/components/diensten/diensten.module.css'
import { getSettings, pageMetadata } from '@/lib/cms'
import { service } from '@/lib/jsonld'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/dienst/subsidiedesk/')

const TAKEN = [
  {
    icon: <Search />,
    tile: 'icon-tile--blauw',
    title: 'Vinden',
    text: 'Wij zoeken welke subsidies bij uw scholen passen en adviseren u over geschikte regelingen: regionaal, nationaal en Europees.',
  },
  {
    icon: <Send />,
    tile: '',
    title: 'Aanvragen',
    text: 'Wij verzamelen de benodigde documenten, zoals projectplannen en begrotingen, en dienen de aanvraag voor u in.',
  },
  {
    icon: <ClipboardCheck />,
    tile: 'icon-tile--groen',
    title: 'Verantwoorden',
    text: 'Wij beheren de deadlines en rapportages die bij de verantwoording van een subsidie horen.',
  },
]

const THEMAS = [
  { icon: <Laptop />, tile: 'icon-tile--blauw', title: 'Digitalisering' },
  { icon: <Leaf />, tile: 'icon-tile--groen', title: 'Duurzaamheid' },
  { icon: <Armchair />, tile: '', title: 'Schoolinrichting' },
  { icon: <Users />, tile: 'icon-tile--blauw', title: 'Personeel' },
]

const STAPPEN = [
  { title: 'Subsidies zoeken', text: 'Wij zoeken eerst welke subsidies geschikt zijn voor uw scholen.' },
  {
    title: 'Documenten verzamelen',
    text: 'Wij helpen bij het verzamelen en opstellen van de benodigde stukken, zoals projectplan en begroting.',
  },
  { title: 'Aanvraag indienen', text: 'Wij dienen de aanvraag in en volgen deze op.' },
  { title: 'Verantwoorden', text: 'Wij beheren de deadlines en rapportages voor de verantwoording.' },
]

export default async function SubsidiedeskPage() {
  const { contact } = await getSettings()

  return (
    <>
      <JsonLd
        data={service({
          name: 'Subsidiedesk onderwijs',
          description:
            'De OIG Subsidiedesk vindt, vraagt aan en verantwoordt subsidies voor schoolbesturen. Wordt een subsidie niet toegekend, dan zijn er geen kosten.',
          path: '/dienst/subsidiedesk/',
        })}
      />

      <PageHero
        crumbs={[
          { name: 'Diensten', path: '/diensten/' },
          { name: 'Subsidiedesk', path: '/dienst/subsidiedesk/' },
        ]}
        kicker="Subsidiedesk"
        title={
          <>
            Subsidie voor het <span className="wordblock">onderwijs</span>
          </>
        }
        lead="De OIG Subsidiedesk helpt uw organisatie bij het vinden, aanvragen en verantwoorden van beschikbare subsidies, lokaal en nationaal. Wordt een subsidie niet toegekend, dan brengen wij geen kosten in rekening."
        aside={
          <Photo
            img={{
              url: '/beeld/diensten/oig-124.jpg',
              alt: 'Twee adviseurs van de Onderwijs Inkoop Groep in gesprek aan de vergadertafel',
              focus: '30% 50%',
            }}
            ratio="1 / 1"
            sizes="(min-width: 1000px) 520px, 100vw"
            priority
          />
        }
      >
        <Link href="/contact/" className="btn btn--primair">
          Plan een kennismaking <Arrow />
        </Link>
        <a href="#aanpak" className="btn btn--secundair">
          Zo werkt de Subsidiedesk
        </a>
      </PageHero>

      <section className="section section--creme">
        <div className="container">
          <KopRij
            kicker="Wat wij doen"
            title="Wij nemen het hele subsidietraject uit handen"
            lead="Ons team heeft uitgebreide kennis van subsidiemogelijkheden voor het onderwijs en begeleidt u bij elke stap."
          />
          <ul className="grid-3">
            {TAKEN.map((t) => (
              <li key={t.title}>
                <article className={`card ${s.kaart}`}>
                  <span className={`icon-tile ${t.tile}`}>{t.icon}</span>
                  <h3 className="h3">{t.title}</h3>
                  <p>{t.text}</p>
                </article>
              </li>
            ))}
          </ul>
          <div className={s.balken}>
            <div className={`${s.balk} ${s.balkGroen}`}>
              <h3>No cure, no pay</h3>
              <p>Wordt een subsidie niet toegekend, dan brengen wij geen kosten in rekening.</p>
            </div>
            <div className={s.balk}>
              <h3>Volledige ontzorging</h3>
              <p>Van aanvraag tot verantwoording. U bespaart tijd en kunt zich richten op het onderwijs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.tekstEnRaster}`}>
          <div className={`stack ${s.tekstKolom}`}>
            <p className="kicker">Waarvoor</p>
            <h2 className="h2">Waarvoor kan uw school subsidie krijgen?</h2>
            <p>
              Scholen kunnen aanspraak maken op diverse subsidies. Het aanbod varieert per regio en type instelling.
              Wij zoeken uit welke subsidies geschikt zijn voor uw scholen.
            </p>
            <VoorWie>
              Schoolbesturen in het primair onderwijs die subsidiekansen willen benutten en daar zelf geen kostbare tijd
              aan willen besteden.
            </VoorWie>
          </div>
          <ul className={s.raster2}>
            {THEMAS.map((t) => (
              <li key={t.title} className={s.tegel}>
                <span className={`icon-tile ${t.tile}`}>{t.icon}</span>
                <h3>{t.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section section--blauw ${s.blauw}`} id="aanpak">
        <div className="container">
          <KopRij kicker="Aanpak" title="In vier stappen naar uw subsidie" />
          <Stappen steps={STAPPEN} tone="blauw" />
          <Verwijsbalk href="/werkwijze/" label="Bekijk onze werkwijze" tone="blauw">
            Benieuwd hoe wij met schoolbesturen samenwerken? Onze werkwijze bestaat uit zeven stappen.
          </Verwijsbalk>
        </div>
      </section>

      <FaqSection
        page="subsidiedesk"
        title="Vragen over subsidie in het onderwijs"
        lead={
          <>
            Hier vindt u antwoorden op veelgestelde vragen over de OIG Subsidiedesk en het aanvragen van subsidie. Staat
            uw vraag er niet bij? Bel ons op {contact.phone}.
          </>
        }
      />

      <ContactSection
        title="Neem contact op met ons team"
        lead="Benieuwd naar uw subsidiekansen? Neem gerust contact met ons op."
      />

      <CtaBand />
    </>
  )
}
