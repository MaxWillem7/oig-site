import Link from 'next/link'
import { CtaBand, PageHero, Photo } from '@/components/Blocks'
import { Arrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { Logo } from '@/components/organisatie/Logo'
import s from '@/components/organisatie/organisatie.module.css'
import { REFERENTIES, UITGELICHT } from '@/components/organisatie/referenties'
import { SITE_NAME, SITE_URL, pageMetadata } from '@/lib/cms'

export const revalidate = 300

export const generateMetadata = () => pageMetadata('/referenties/')

export default function ReferentiesPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Referenties van schoolbesturen | ${SITE_NAME}`,
          url: `${SITE_URL}/referenties/`,
          about: { '@id': `${SITE_URL}/#organisatie` },
        }}
      />

      <PageHero
        crumbs={[
          { name: 'Over ons', path: '/over-ons/' },
          { name: 'Referenties', path: '/referenties/' },
        ]}
        kicker="Referenties"
        title={
          <>
            Ervaringen van <span className="wordblock">schoolbesturen</span>
          </>
        }
        lead="Wat zijn de ervaringen binnen het collectief van de Onderwijs Inkoop Groep? Bestuurders, controllers en beleidsmedewerkers vertellen het in hun eigen woorden."
        aside={
          <Photo
            img={{
              url: '/beeld/organisatie/oig-096.jpg',
              alt: 'Team van de Onderwijs Inkoop Groep tijdens een presentatie',
            }}
            ratio="520 / 440"
            priority
          />
        }
      >
        <Link href="/contact/" className="btn btn--primair">
          Plan een kennismaking <Arrow />
        </Link>
        <Link href="/diensten/" className="btn btn--secundair">
          Bekijk onze diensten
        </Link>
      </PageHero>

      {/* Uitgelicht */}
      <section className="section section--blauw">
        <div className="container">
          <figure className={`stack ${s.uitgelicht}`}>
            <p className="kicker">Uitgelicht</p>
            <h2>“{UITGELICHT.kop}”</h2>
            <blockquote>
              <p>“{UITGELICHT.citaat}”</p>
            </blockquote>
            <figcaption>
              <span className={s.uitgelichtLogo}>
                <Logo src={UITGELICHT.logo} alt={`Logo ${UITGELICHT.logoNaam}`} sizes="120px" />
              </span>
              <span>
                <strong>{UITGELICHT.naam}</strong>
                <span>
                  {UITGELICHT.functie}, {UITGELICHT.organisatie}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Alle ervaringen */}
      <section className="section section--creme">
        <div className="container">
          <div className={s.kopRij}>
            <div className="stack">
              <p className="kicker">Ervaringen</p>
              <h2 className="h2">In hun eigen woorden</h2>
            </div>
            <p className={s.kopTekst}>Ervaringen van schoolbesturen in het primair onderwijs. Lange citaten zijn ingekort.</p>
          </div>
          <ul className={s.muur}>
            {REFERENTIES.map((ref) => (
              <li key={ref.naam}>
                <figure className={`card ${s.ervaring}`}>
                  <h3>“{ref.kop}”</h3>
                  <blockquote>
                    <p>“{ref.citaat}”</p>
                  </blockquote>
                  <figcaption>
                    <Logo src={ref.logo} alt={`Logo ${ref.logoNaam}`} sizes="80px" grijs />
                    <span>
                      <strong>{ref.naam}</strong>
                      <span>
                        {ref.functie}, {ref.organisatie}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
