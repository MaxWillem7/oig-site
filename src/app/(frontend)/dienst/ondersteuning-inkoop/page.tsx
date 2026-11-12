import Image from 'next/image'
import Link from 'next/link'
import { FileCheck, ListChecks, SearchCheck, Users } from 'lucide-react'
import { ContactSection, CtaBand, FaqSection, PageHero, Photo, SectionHeading } from '@/components/Blocks'
import { Arrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { INKOOP_PATH, SEGMENTEN_PATH, segments } from '@/components/inkoop/content'
import s from '@/components/inkoop/inkoop.module.css'
import { getSettings, pageMetadata } from '@/lib/cms'
import { service } from '@/lib/jsonld'

export const revalidate = 300

export const generateMetadata = () => pageMetadata('/dienst/ondersteuning-inkoop/')

export default async function OndersteuningInkoopPage() {
  const { figures } = await getSettings()

  return (
    <>
      <JsonLd
        data={service({
          name: 'Ondersteuning bij inkoop',
          description:
            'Ondersteuning bij inkoop voor schoolbesturen in het primair onderwijs: een inkoopscan per segment, onderhandeling met leveranciers en contractbeheer in Mijn OIG.',
          path: INKOOP_PATH,
        })}
      />

      <PageHero
        crumbs={[
          { name: 'Diensten', path: '/diensten/' },
          { name: 'Ondersteuning bij inkoop', path: INKOOP_PATH },
        ]}
        kicker="Inkoop"
        title={
          <>
            Gezamenlijk inkopen voor uw <span className="wordblock">scholen</span>
          </>
        }
        lead="Van ICT en energie tot schoonmaak en beveiliging: de Onderwijs Inkoop Groep ondersteunt u bij de inkoop voor uw scholen. Wij brengen uw inkoop per segment in kaart en werken samen met landelijke en regionale partnerleveranciers, zodat u profiteert van de beste inkoopcondities, zonder dat het u tijd kost."
        aside={
          <Photo
            img={{
              url: '/beeld/inkoop/oig-095.jpg',
              alt: 'Presentatie op kantoor bij de Onderwijs Inkoop Groep: een adviseur licht een overzicht op het scherm toe',
              focus: '35% 50%',
            }}
            ratio="5 / 4"
            priority
          />
        }
      >
        <Link href="/contact/" className="btn btn--primair">
          Plan een kennismaking <Arrow />
        </Link>
        <Link href={SEGMENTEN_PATH} className="btn btn--secundair">
          Bekijk alle inkoopsegmenten
        </Link>
        <dl className={s.cijfers}>
          <div>
            <dt>schoolbesturen</dt>
            <dd>{figures.boards}</dd>
          </div>
          <div>
            <dt>scholen</dt>
            <dd>{figures.schools}</dd>
          </div>
          <div>
            <dt>gemiddelde besparing bij onze klanten</dt>
            <dd>{figures.saving}</dd>
          </div>
        </dl>
      </PageHero>

      {/* Wat wij doen, en voor wie */}
      <section className="section section--creme">
        <div className="container">
          <div className={s.kopRij}>
            <SectionHeading kicker="Wat wij doen" title="Bespaar tijd en geld bij elke inkoop" />
            <p>
              Ons team begeleidt en adviseert schoolbesturen in het primair onderwijs om de inkoopkosten te verlagen
              en de efficiëntie te verbeteren.
            </p>
          </div>
          <div className="grid-3">
            <article className={`card ${s.kaart}`}>
              <span className="icon-tile icon-tile--groen">
                <SearchCheck aria-hidden />
              </span>
              <h3>Een inkoopstrategie die bespaart</h3>
              <p>
                Met een inkoopscan brengen we uw inkoop per segment in kaart en vergelijken we uw voorwaarden met wat
                gangbaar is in de markt.
              </p>
            </article>
            <article className={`card ${s.kaart}`}>
              <span className="icon-tile">
                <Users aria-hidden />
              </span>
              <h3>Ervaring in inkoopmanagement</h3>
              <p>
                Wij gaan voor u in gesprek met de leveranciers, onderzoeken welke ruimte er is en verzorgen de
                volledige implementatie, zodat u volledig ontzorgd wordt.
              </p>
            </article>
            <article className={`card ${s.kaart}`}>
              <span className="icon-tile icon-tile--blauw">
                <FileCheck aria-hidden />
              </span>
              <h3>Grip op uw contracten in Mijn OIG</h3>
              <p>
                Uw contracten staan in ons systeem Mijn OIG, waar u met uw eigen gegevens inlogt. Wij houden de
                jaarlijkse indexatie en de einddata voor u in de gaten.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Dynamisch aankoopsysteem */}
      <section className="section" id="dynamisch-aankoopsysteem">
        <div className="container">
          <div className={s.kopRij}>
            <SectionHeading kicker="Aankoopsysteem" title="Inkopen via een dynamisch aankoopsysteem" />
            <p>
              Voor schoonmaakdiensten en voor meubilair heeft de OIG een eigen dynamisch aankoopsysteem (DAS). Ook bij
              de inkoop van ICT helpen wij u verder.
            </p>
          </div>
          <div className="grid-3">
            <article className={`card ${s.kaartRand}`}>
              <p className="label">DAS meubilair</p>
              <h3>Schoolmeubilair</h3>
              <p>
                Alle toonaangevende leveranciers zijn aangesloten. Kwaliteit en actualiteit zijn gegarandeerd en u
                voldoet aan de regels van Europees aanbesteden.
              </p>
              <Link href={`${SEGMENTEN_PATH}#schoolmeubilair`} className={`textlink ${s.onder}`}>
                Meer over schoolmeubilair <Arrow />
              </Link>
            </article>
            <article className={`card ${s.kaartRand}`}>
              <p className="label">DAS schoonmaak</p>
              <h3>Schoonmaakdiensten</h3>
              <p>
                Eenvoudig inzicht in de kosten en toegang tot kwalitatief uitstekende bedrijven. Zowel landelijke als
                lokale schoonmakers kunnen opdrachten aannemen.
              </p>
              <Link href={`${SEGMENTEN_PATH}#schoonmaak`} className={`textlink ${s.onder}`}>
                Meer over schoonmaak <Arrow />
              </Link>
            </article>
            <article className={`card ${s.kaartRand}`}>
              <p className="label">Gezamenlijke inkoop ICT</p>
              <h3>ICT en automatisering</h3>
              <p>
                Nieuwe hardware voor uw school nodig? Wij helpen u aan de beste offerte. Heeft u al een offerte? Stuur
                hem door, dan onderhandelen wij hem verder voor u uit.
              </p>
              <Link href={`${SEGMENTEN_PATH}#automatisering`} className={`textlink ${s.onder}`}>
                Meer over ICT-inkoop <Arrow />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Segmenten: alleen de namen, details op de subpagina */}
      <section className="section section--creme">
        <div className={`container ${s.segSplit}`}>
          <div className="stack" style={{ '--gap': '18px' } as React.CSSProperties}>
            <p className="kicker">Segmenten</p>
            <h2 className="h2">Wij ondersteunen u op {segments.length} segmenten</h2>
            <p className="zacht">
              Voortdurend breiden wij onze dienstverlening uit, geheel naar uw behoefte. Per segment leest u wat wij
              doen.
            </p>
            <Link href={SEGMENTEN_PATH} className="textlink">
              Meer over de inkoopsegmenten <Arrow />
            </Link>
          </div>
          <ul className={s.tegels}>
            {segments.map((seg) => (
              <li key={seg.id}>
                <Link href={`${SEGMENTEN_PATH}#${seg.id}`}>
                  {seg.name}
                  <Arrow aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bewijs en aanpak */}
      <section className="section">
        <div className={`container ${s.bewijs}`}>
          <figure className={s.citaat}>
            <p className="kicker">Ervaringen</p>
            <blockquote>
              “De OIG is onze partner voor een aantal inkooptrajecten zoals ICT devices via een Dynamisch Aankoop
              Systeem en het Onderwijs Leermiddelen Pakket via een aanbesteding. Met de kennis van de markt en het
              brede aanbod aan diensten neemt de OIG ons veel werk uit handen.”
            </blockquote>
            <figcaption>
              <Image
                src="/beeld/inkoop/prisma-almere-logo.svg"
                alt="Logo Stichting Prisma Almere"
                width={112}
                height={56}
                unoptimized
                className={s.logo}
              />
              <span className={s.naam}>
                <strong>Martijn van Dijk</strong>
                Coördinator contracten, Stichting Prisma Almere
              </span>
            </figcaption>
          </figure>
          <aside className={`card ${s.werkwijze}`}>
            <span className="icon-tile icon-tile--wit">
              <ListChecks aria-hidden />
            </span>
            <h2 className="h3">Beter inkopen in zeven stappen</h2>
            <p>
              Van kennismaking en inkoopscan tot implementatie en borging: zo brengen wij uw volledige inkoop in kaart
              en richten wij de inkoop voor u in.
            </p>
            <Link href="/werkwijze/" className="textlink">
              Bekijk onze werkwijze <Arrow />
            </Link>
          </aside>
        </div>
      </section>

      <FaqSection
        page="ondersteuning-inkoop"
        title="Vragen over ondersteuning bij inkoop"
        lead="Hier vindt u antwoorden op veelgestelde vragen over onze ondersteuning bij inkoop."
        tone="creme"
      />
      <ContactSection tone="wit" />
      <CtaBand />
    </>
  )
}
