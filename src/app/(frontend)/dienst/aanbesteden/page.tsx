import Link from 'next/link'
import { BookOpen, Globe, Monitor, School, ShieldCheck, Users } from 'lucide-react'
import { ContactSection, CtaBand, FaqSection, PageHero, Photo } from '@/components/Blocks'
import { Arrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { KopRij, Stappen, Verwijsbalk, VoorWie } from '@/components/diensten/Onderdelen'
import s from '@/components/diensten/diensten.module.css'
import { getSettings, pageMetadata } from '@/lib/cms'
import { service } from '@/lib/jsonld'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/dienst/aanbesteden/')

const PUNTEN = [
  {
    icon: <Globe />,
    tile: 'icon-tile--groen',
    title: 'Europees en meervoudig onderhands',
    text: 'Europees aanbesteden waar het moet, een meervoudig onderhands traject waar het kan.',
  },
  {
    icon: <Users />,
    tile: '',
    title: 'Aanbestedingscollectief',
    text: 'Via het collectief besteedt u kosteloos en flexibel aan voor onderwijsgerelateerde vraagstukken.',
  },
  {
    icon: <School />,
    tile: 'icon-tile--blauw',
    title: 'Wensen per school',
    text: 'Wij inventariseren per school wat er nodig is. U kunt specifieke wensen per school aangeven.',
  },
  {
    icon: <ShieldCheck />,
    tile: 'icon-tile--groen',
    title: 'Kwaliteit en transparantie',
    text: 'Wij zorgen voor kwaliteitscontrole en transparantie, zonder extra kosten.',
  },
]

const STAPPEN = [
  {
    title: 'Inventarisatie per school',
    text: 'Wij brengen per school in kaart wat er nodig is bij de aanbesteding, inclusief specifieke wensen.',
  },
  {
    title: 'Keuze van de procedure',
    text: 'Is Europees aanbesteden niet strikt noodzakelijk, dan adviseren wij een meervoudig onderhands traject.',
  },
  {
    title: 'Uitvraag opstellen',
    text: 'Wij verwerken de gegevens en stellen het aanbestedingsdocument op.',
  },
  {
    title: 'Publicatie en inschrijving',
    text: 'De opdracht wordt gepubliceerd of geschikte leveranciers worden geselecteerd. Wij monitoren het proces.',
  },
  {
    title: 'Beoordeling en gunning',
    text: 'Wij evalueren de ontvangen inschrijvingen, zodat de beste partij wordt geselecteerd.',
  },
]

export default async function AanbestedenPage() {
  const { contact } = await getSettings()

  return (
    <>
      <JsonLd
        data={service({
          name: 'Aanbestedingsbegeleiding onderwijs',
          description:
            'De Onderwijs Inkoop Groep begeleidt schoolbesturen bij Europese en meervoudig onderhandse aanbestedingen, ook van leermiddelen.',
          path: '/dienst/aanbesteden/',
        })}
      />

      <PageHero
        crumbs={[
          { name: 'Diensten', path: '/diensten/' },
          { name: 'Aanbesteden', path: '/dienst/aanbesteden/' },
        ]}
        kicker="Aanbestedingsdesk"
        title={
          <>
            Hulp bij aanbesteden in het <span className="wordblock">onderwijs</span>
          </>
        }
        lead="De Onderwijs Inkoop Groep begeleidt schoolbesturen bij Europese en meervoudig onderhandse aanbestedingen. Wij hanteren een praktische aanpak: als Europees aanbesteden niet strikt noodzakelijk is, adviseren en begeleiden wij u bij een meervoudig onderhands traject."
        aside={
          <Photo
            img={{
              url: '/beeld/diensten/oig-081.jpg',
              alt: 'Medewerkers van de Onderwijs Inkoop Groep luisteren naar een presentatie op kantoor',
              focus: '62% 50%',
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
        <a href="#proces" className="btn btn--secundair">
          Bekijk het aanbestedingsproces
        </a>
      </PageHero>

      <section className="section section--creme">
        <div className={`container ${s.tekstEnRaster}`}>
          <div className={`stack ${s.tekstKolom}`}>
            <p className="kicker">Wat wij doen</p>
            <h2 className="h2">Wij nemen uw aanbesteding uit handen</h2>
            <p>
              Een aanbesteding omvat verschillende stappen, zoals het opstellen van een aanbestedingsdocument, het
              selecteren van geschikte leveranciers en het evalueren van de ontvangen inschrijvingen. Wij nemen dit
              graag voor u uit handen.
            </p>
            <VoorWie>
              Schoolbesturen in het primair onderwijs die een aanbesteding rechtmatig willen laten verlopen en het werk
              uit handen willen geven.
            </VoorWie>
          </div>
          <ul className={s.raster2}>
            {PUNTEN.map((p) => (
              <li key={p.title}>
                <article className={`card ${s.kaart} ${s.kaartCompact}`}>
                  <span className={`icon-tile ${p.tile}`}>{p.icon}</span>
                  <h3 className={s.kaartTitel}>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="proces">
        <div className="container">
          <KopRij
            kicker="Het proces"
            title="Zo verloopt een aanbesteding met de OIG"
            lead="Van inventarisatie tot gunning. Wij nemen het werk uit handen en monitoren het aanbestedingsproces."
          />
          <Stappen steps={STAPPEN} />
          <Verwijsbalk href="/werkwijze/" label="Bekijk onze werkwijze">
            Eerst weten hoe u ervoor staat? Dat laat de inkoopscan zien, onderdeel van onze werkwijze in zeven stappen.
          </Verwijsbalk>
        </div>
      </section>

      <section className={`section section--blauw ${s.blauw}`}>
        <div className={`container ${s.praktijk}`}>
          <div className={`stack ${s.praktijkTekst}`}>
            <p className="kicker">Uit de praktijk</p>
            <h2 className="h2">Aanbesteding van leermiddelen en ICT</h2>
            <p className="lead">Twee inkooptrajecten waarvoor Stichting Prisma Almere met de OIG samenwerkt.</p>
            <ul className={s.voorbeelden}>
              <li className={s.voorbeeld}>
                <span className="icon-tile icon-tile--wit icon-tile--blauw">
                  <BookOpen />
                </span>
                <div>
                  <h3>Onderwijs Leermiddelen Pakket (OLP)</h3>
                  <p>Het leermiddelenpakket ingekocht via een aanbesteding.</p>
                </div>
              </li>
              <li className={s.voorbeeld}>
                <span className="icon-tile icon-tile--wit icon-tile--blauw">
                  <Monitor />
                </span>
                <div>
                  <h3>Dynamisch Aankoop Systeem (DAS)</h3>
                  <p>ICT devices ingekocht via een Dynamisch Aankoop Systeem.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className={s.citaten}>
            <figure>
              <blockquote>
                <p>
                  “De OIG is onze partner voor een aantal inkooptrajecten zoals ICT devices via een Dynamisch Aankoop
                  Systeem en het Onderwijs Leermiddelen Pakket via een aanbesteding. Met de kennis van de markt en het
                  brede aanbod aan diensten neemt de OIG ons veel werk uit handen.”
                </p>
              </blockquote>
              <figcaption>
                <strong>Martijn van Dijk</strong>
                Coördinator contracten, Stichting Prisma Almere
              </figcaption>
            </figure>
            <figure>
              <blockquote>
                <p>“Inkopen, zeker als het Europees moet, blijft een taaie klus, maar OIG loodst ons er doorheen!”</p>
              </blockquote>
              <figcaption>Paul Schollaardt, College van Bestuur, Stichting Elan</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <FaqSection
        page="aanbesteden"
        title="Vragen over aanbesteden in het onderwijs"
        lead={
          <>
            Hier vindt u antwoorden op veelgestelde vragen over aanbesteden. Staat uw vraag er niet bij? Bel ons op{' '}
            {contact.phone}.
          </>
        }
      />

      <ContactSection
        title="Neem contact op met ons team"
        lead="Heeft u vragen over een aanbesteding of wilt u meer informatie? Neem gerust contact met ons op."
      />

      <CtaBand />
    </>
  )
}
