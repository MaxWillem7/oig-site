import { Bike, Building2, Download, HeartPulse, Leaf, PiggyBank, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ContactSection, CtaBand, FaqSection, PageHero, SectionHeading } from '@/components/Blocks'
import {
  CALCULATOR_URL,
  EVOLUTION,
  EXAMPLE,
  FISCAL,
  PRACTICAL,
  SCENARIOS,
  SCOPE,
  START,
  STEPS,
} from '@/components/fietsplan/content'
import { Arrow, External } from '@/components/Icons'
import { cmsUrl } from '@/components/zorg/cmsUrl'
import { getWhitepaper, media, pageMetadata } from '@/lib/cms'
import s from '@/components/fietsplan/fietsplan.module.css'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/fietsplan-onderwijs/')

const WHITEPAPER_TITLE = 'Zet heel onderwijs Nederland op de fiets'
const SCOPE_ICONS = { fiets: Bike, organisatie: Building2, medewerkers: Users }

function DataTable({
  caption,
  first,
  columns,
  rows,
}: {
  caption: string
  first: string
  columns: string[]
  rows: { label: string; cells: string[] }[]
}) {
  return (
    <div
      className="tabel-wrap"
      tabIndex={0}
      role="region"
      aria-label={`${caption}, schuifbare tabel`}
    >
      <table className={`tabel ${s.tabel}`}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{first}</th>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {r.cells.map((c, idx) => (
                <td key={idx}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className={s.schuif}>Schuif opzij voor alle kolommen.</p>
    </div>
  )
}

function CostTable({ data }: { data: { title: string; rows: string[][]; total: string } }) {
  return (
    <table className={s.kosten}>
      <caption>{data.title}</caption>
      <tbody>
        {data.rows.map(([label, value]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Totaal</th>
          <td>{data.total}</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default async function FietsplanPage() {
  const whitepaper = await getWhitepaper('leasefiets')
  const file = whitepaper?.file && typeof whitepaper.file === 'object' ? whitepaper.file : null
  const pdfUrl = cmsUrl(file?.url)
  const image = media(whitepaper?.image, 'kaart')
  const cover = image && { ...image, url: cmsUrl(image.url) ?? image.url }

  const download = pdfUrl && (
    <a href={pdfUrl} className="btn btn--primair">
      <Download aria-hidden strokeWidth={2.2} /> Download de whitepaper (pdf)
    </a>
  )

  return (
    <>
      <PageHero
        crumbs={[{ name: 'Fietsplan onderwijs', path: '/fietsplan-onderwijs/' }]}
        kicker="Kennis"
        title={
          <>
            Fietsplan in het <span className="wordblock">onderwijs</span>
          </>
        }
        lead="Met een fietsplan biedt u uw medewerkers een fiets van de zaak: een duurzaam en gezond alternatief voor woon-werkverkeer. Met de leasefietsregeling van de Onderwijs Inkoop Groep leaset u eenvoudig en voordelig fietsen voor uw medewerkers. Op deze pagina leest u hoe het werkt."
        aside={
          <div className={s.paneel}>
            <div className={s.paneelIcoon}>
              <Bike aria-hidden strokeWidth={1.4} />
            </div>
            <div className={s.paneelOnder}>
              {cover && (
                <Image
                  src={cover.url}
                  alt={`Voorkant van de whitepaper ${WHITEPAPER_TITLE}`}
                  width={cover.width}
                  height={cover.height}
                  sizes="150px"
                  className={s.cover}
                />
              )}
              <div className={s.paneelTekst}>
                <p className={s.paneelLabel}>Whitepaper leasefiets</p>
                <p className={s.paneelTitel}>{WHITEPAPER_TITLE}</p>
              </div>
            </div>
          </div>
        }
      >
        {download}
        <Link href="/contact/" className={`btn ${pdfUrl ? 'btn--secundair' : 'btn--primair'}`}>
          Plan een kennismaking
        </Link>
      </PageHero>

      <section className="section section--creme" id="zo-werkt-het">
        <div className="container">
          <div className={s.kop}>
            <div className="stack">
              <p className="kicker">Zo werkt het</p>
              <h2 className="h2">Zo werkt een fietsplan met een leasefiets</h2>
            </div>
            <p className="zacht">
              Meer dan de helft van werkend Nederland woont binnen 15 kilometer van het werk. Ruim
              70% is bereid die afstand te fietsen, zeker als de werkgever een fiets opneemt in de
              secundaire arbeidsvoorwaarden.
            </p>
          </div>
          <ol className="grid-3">
            {STEPS.map((step, idx) => (
              <li key={step.title} className={`card ${s.stap}`}>
                <span className={s.stapNr} aria-hidden>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="voordelen">
        <div className="container">
          <SectionHeading kicker="Voordelen" title="Waarom een fietsplan voor uw medewerkers?" />
          <div className="grid-3">
            <div className={`card ${s.voordeel}`}>
              <span className="icon-tile icon-tile--groen">
                <Leaf aria-hidden />
              </span>
              <h3>Beter voor het milieu</h3>
              <p>
                Een duurzaam alternatief voor autovervoer. Een leasefiets verlaagt de CO2-uitstoot
                en draagt bij aan een betere luchtkwaliteit.
              </p>
            </div>
            <div className={`card ${s.voordeel}`}>
              <span className="icon-tile">
                <HeartPulse aria-hidden />
              </span>
              <h3>Fitte medewerkers</h3>
              <p>
                Fietsen bevordert lichamelijke activiteit. Een fiets zorgt voor fitte, vitale en
                loyale collega’s.
              </p>
            </div>
            <div className={`card ${s.voordeel}`}>
              <span className="icon-tile icon-tile--blauw">
                <PiggyBank aria-hidden />
              </span>
              <h3>Financieel voordeel</h3>
              <p>
                Het voordeel voor de medewerker ligt rond de 30%. Dat hangt af van de hoogte van het
                brutoloon en van een eventuele bijdrage van de werkgever.
              </p>
              <a
                href={CALCULATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={s.extern}
              >
                Bereken het voordeel bij Lease a Bike <External />
                <span className="sr-only"> (opent in een nieuw tabblad)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--creme" id="voor-wie">
        <div className="container">
          <SectionHeading
            kicker="Voor wie"
            title="Waarop is de regeling van toepassing?"
            lead="Van het fietsplan (tot 2014) via de werkkostenregeling (WKR) naar de leasefiets (vanaf 2020)."
          />
          <ul className={`grid-3 ${s.scope}`}>
            {SCOPE.map((item) => {
              const Icon = SCOPE_ICONS[item.icon]
              return (
                <li key={item.title} className={`card ${s.voordeel}`}>
                  <span className="icon-tile">
                    <Icon aria-hidden />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              )
            })}
          </ul>
          <DataTable
            caption="Van fietsplan naar leasefiets: de regelingen vergeleken"
            first="Kenmerk"
            columns={EVOLUTION.columns}
            rows={EVOLUTION.rows}
          />
          <p className={`zacht maat ${s.onderTabel}`}>
            De regeling ‘fiets van de zaak’ uit 1995 bestaat nog steeds, maar maakt nu deel uit van
            de werkkostenregeling. Daarbij mag maximaal € 1.500 worden uitgeruild met het brutoloon.
            Het nieuwe fietsplan met de leasefiets valt buiten de werkkostenregeling en kent geen
            maximum voor de aanschafwaarde van de fiets.
          </p>
        </div>
      </section>

      <section className="section" id="kosten">
        <div className="container">
          <SectionHeading
            kicker="Kosten en fiscus"
            title="Werkkostenregeling, bijtelling en reiskosten"
            lead="Wat betekent een leasefiets voor de werkkostenregeling, het loon en de reiskostenvergoeding?"
          />
          <div className={s.fiscaal}>
            {FISCAL.map((item) => (
              <div key={item.title} className={s.fiscaalItem}>
                <h3>{item.title}</h3>
                {item.text.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ))}
          </div>
          <DataTable
            caption="Voorbeeld: drie manieren om de kosten van een fiets van € 2.900 te verdelen"
            first="Verdeling"
            columns={SCENARIOS.columns}
            rows={SCENARIOS.rows}
          />
        </div>
      </section>

      <section className="section section--creme" id="praktisch">
        <div className="container">
          <SectionHeading kicker="Praktisch" title="Handig om te weten" />
          <ul className="grid-3">
            {PRACTICAL.map((item) => (
              <li key={item.title} className={`card ${s.praktisch}`}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="rekenvoorbeeld">
        <div className="container">
          <SectionHeading
            kicker="Rekenvoorbeeld"
            title={`${EXAMPLE.percent} voordeel voor meester Henk`}
            lead="Wat levert een leasefiets een leerkracht netto op? Een rekenvoorbeeld uit de whitepaper van mei 2025."
          />
          <div className="split">
            <div className="stack">
              <h3 className="h3">De uitgangspunten</h3>
              <ul className={s.punten}>
                {EXAMPLE.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className={s.uitkomst}>
              <div className={s.kostenRij}>
                <CostTable data={EXAMPLE.lease} />
                <CostTable data={EXAMPLE.buy} />
              </div>
              <p className={s.voordeelRegel}>
                Voordeel voor meester Henk: <strong>{EXAMPLE.saving}</strong>, ofwel{' '}
                <strong>{EXAMPLE.percent}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--creme" id="starten">
        <div className="container split">
          <div className="stack">
            <SectionHeading
              kicker="Hoe verder"
              title="In zeven stappen een fiets van de zaak"
              lead="Wilt u uw medewerkers een leasefiets bieden? Neem dan gerust contact met ons op. Wij maken graag een telefonische of persoonlijke afspraak en beantwoorden al uw vragen."
            />
            <div className="btn-rij">
              <a href="#contact" className="btn btn--primair">
                Neem contact op <Arrow />
              </a>
            </div>
          </div>
          <div className="stack">
            <ol className={s.start}>
              {START.map((step, idx) => (
                <li key={step}>
                  <span aria-hidden>{idx + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <p className="zacht">
              Het proces is simpel en overzichtelijk en kan binnen een week afgerond zijn.
            </p>
          </div>
        </div>
      </section>

      {pdfUrl && (
        <section className="section section--blauw section--smal" id="whitepaper">
          <div className={`container ${s.whitepaper}`}>
            {cover && (
              <Image
                src={cover.url}
                alt={`Voorkant van de whitepaper ${WHITEPAPER_TITLE}`}
                width={cover.width}
                height={cover.height}
                sizes="(min-width: 800px) 260px, 180px"
                className={s.whitepaperCover}
              />
            )}
            <div className={`stack ${s.whitepaperTekst}`}>
              <p className="kicker">Whitepaper</p>
              <h2 className="h2">De hele whitepaper als pdf</h2>
              <p className="maat">
                Alles op deze pagina staat ook in de whitepaper ‘{WHITEPAPER_TITLE}’. Direct te
                downloaden, zonder formulier.
              </p>
              <div className={s.whitepaperActie}>
                {download}
                <span>pdf, 12 pagina’s</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <FaqSection page="fietsplan-onderwijs" title="Vragen over het fietsplan" />
      <ContactSection />
      <CtaBand />
    </>
  )
}
