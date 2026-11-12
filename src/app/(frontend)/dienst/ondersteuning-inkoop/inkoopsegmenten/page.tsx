import Link from 'next/link'
import { ContactSection, CtaBand, FaqSection, PageHero, Photo, SectionHeading } from '@/components/Blocks'
import { Arrow, Check } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { SavingsTable } from '@/components/inkoop/SavingsTable'
import { INKOOP_PATH, SEGMENTEN_PATH, segments } from '@/components/inkoop/content'
import s from '@/components/inkoop/inkoop.module.css'
import { getSettings, pageMetadata } from '@/lib/cms'
import { service } from '@/lib/jsonld'

export const revalidate = 300

export const generateMetadata = () => pageMetadata('/dienst/ondersteuning-inkoop/inkoopsegmenten/')

export default async function InkoopsegmentenPage() {
  const { figures } = await getSettings()

  return (
    <>
      <JsonLd
        data={service({
          name: 'Inkoopsegmenten',
          description:
            'De inkoopsegmenten waarop de Onderwijs Inkoop Groep schoolbesturen ondersteunt, van kopieerapparatuur en schoonmaak tot ICT, met de gemiddelde besparing per segment.',
          path: SEGMENTEN_PATH,
        })}
      />

      <PageHero
        crumbs={[
          { name: 'Diensten', path: '/diensten/' },
          { name: 'Ondersteuning bij inkoop', path: INKOOP_PATH },
          { name: 'Inkoopsegmenten', path: SEGMENTEN_PATH },
        ]}
        kicker="Segmenten"
        title={
          <>
            Inkoopsegmenten, van <span className="wordblock">schoolmeubilair</span> tot schoonmaak
          </>
        }
        lead={`Bij de Onderwijs Inkoop Groep kiest u uit ${segments.length} inkoopsegmenten die aansluiten op uw behoeften, van ICT en energie tot facilitaire diensten. Per segment leest u hieronder wat wij doen, gevolgd door de gemiddelde besparing per segment.`}
        aside={
          <Photo
            img={{
              url: '/beeld/inkoop/oig-108.jpg',
              alt: 'Twee medewerkers van de Onderwijs Inkoop Groep in overleg aan een bureau met laptop',
              focus: '55% 50%',
            }}
            ratio="5 / 4"
            priority
          />
        }
      >
        <Link href="/contact/" className="btn btn--primair">
          Plan een kennismaking <Arrow />
        </Link>
        <Link href="#besparing" className="btn btn--secundair">
          Bekijk de besparing per segment
        </Link>
      </PageHero>

      {/* Alle segmenten, elk met een eigen anker */}
      <section className="section section--creme" id="segmenten">
        <div className="container">
          <div className={s.kopRij}>
            <SectionHeading
              kicker="Alle segmenten"
              title={`${segments.length} inkoopsegmenten waarop wij u ondersteunen`}
            />
            <p>Voortdurend breiden wij onze dienstverlening uit, geheel naar uw behoefte.</p>
          </div>
          <div className="grid-3">
            {segments.map((seg) => (
              <article key={seg.id} id={seg.id} className={`card ${s.segKaart}`}>
                <h3>{seg.name}</h3>
                <p>{seg.text}</p>
                {seg.link && (
                  <Link href={seg.link.href} className={`textlink ${s.onder}`}>
                    {seg.link.label} <Arrow />
                  </Link>
                )}
              </article>
            ))}
          </div>
          <p className={s.noot}>
            Hoe wij uw inkoop per segment in kaart brengen, leest u bij{' '}
            <Link href="/werkwijze/" className="link">
              onze werkwijze in zeven stappen
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Besparing per segment */}
      <section className={`section ${s.anker}`} id="besparing">
        <div className="container">
          <div className={s.kopRij}>
            <SectionHeading kicker="Benchmark" title="Gemiddelde besparing per segment" />
            <p>
              Uit onze benchmark onder {figures.schools} scholen blijkt dat goed inkopen direct loont. Gemiddeld
              besparen onze klanten {figures.saving}. In de tabel ziet u de gemiddelde besparingen per segment.
            </p>
          </div>
          <SavingsTable />
        </div>
      </section>

      {/* Schoolmeubilair via het dynamisch aankoopsysteem */}
      <section className={`section section--blauw ${s.anker}`} id="schoolmeubilair">
        <div className="container split split--breed-links split--midden">
          <div className={`stack ${s.blauwTekst}`}>
            <p className="kicker">Schoolmeubilair</p>
            <h2 className="h2">Schoolmeubilair aanbesteden via ons dynamisch aankoopsysteem</h2>
            <p className="lead">
              Schoolbesturen kunnen niet overal aan denken bij de aanschaf van nieuw meubilair. Daarom heeft de OIG een
              dynamisch aankoopsysteem ontwikkeld voor een rechtmatige en efficiënte inkoop van meubilair. Vooraf
              stellen we samen met u een grondig meubilairplan op.
            </p>
            <div className="btn-rij">
              <Link href="/contact/" className="btn btn--primair">
                Plan een kennismaking <Arrow />
              </Link>
              <Link href="/lp/meubilair/" className="btn btn--wit">
                Whitepaper meubilair
              </Link>
            </div>
          </div>
          <div className={s.voordelen}>
            <h3>Dit levert het aankoopsysteem u op</h3>
            <ul className="checks">
              <li>
                <Check aria-hidden />
                Alle toonaangevende leveranciers zijn aangesloten
              </li>
              <li>
                <Check aria-hidden />
                Kwaliteit en actualiteit gegarandeerd
              </li>
              <li>
                <Check aria-hidden />U voldoet aan de regels van Europees aanbesteden
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Kennis per segment */}
      <section className="section section--creme">
        <div className="container">
          <SectionHeading kicker="Kennis" title="Verdiep u in een segment" />
          <div className="grid-3">
            <article className={`card ${s.kaart}`}>
              <h3>Schoonmaakdiensten aanbesteden</h3>
              <p>
                Eenvoudig inzicht in de kosten en toegang tot kwalitatief uitstekende bedrijven, via ons eigen
                dynamisch aankoopsysteem voor schoonmaakdiensten.
              </p>
              <Link href="/lp/schoonmaak/" className={`textlink ${s.onder}`}>
                Whitepaper schoonmaak <Arrow />
              </Link>
            </article>
            <article className={`card ${s.kaart}`}>
              <h3>Printers en kopieerapparatuur</h3>
              <p>Zeven inzichten die u helpen om verborgen kosten van printer- en kopieercontracten te voorkomen.</p>
              <Link href="/lp/kopieerapparaat/" className={`textlink ${s.onder}`}>
                Whitepaper kopieerapparatuur <Arrow />
              </Link>
            </article>
            <article className={`card ${s.kaart}`}>
              <h3>Fietsplan voor medewerkers</h3>
              <p>
                Met onze leasefietsregeling leaset u eenvoudig en voordelig fietsen voor uw medewerkers: een duurzaam
                en gezond alternatief voor woon-werkverkeer.
              </p>
              <Link href="/fietsplan-onderwijs/" className={`textlink ${s.onder}`}>
                Fietsplan in het onderwijs <Arrow />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <FaqSection page="inkoopsegmenten" title="Vragen over schoolmeubilair" />
      <ContactSection />
      <CtaBand />
    </>
  )
}
