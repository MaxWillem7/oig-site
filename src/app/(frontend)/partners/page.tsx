import { BadgeCheck, Scale } from 'lucide-react'
import Link from 'next/link'
import { CtaBand, PageHero, Photo, SectionHeading } from '@/components/Blocks'
import { Arrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { Logo } from '@/components/organisatie/Logo'
import s from '@/components/organisatie/organisatie.module.css'
import { PARTNERS } from '@/components/organisatie/partners'
import { SITE_NAME, SITE_URL, pageMetadata } from '@/lib/cms'

export const revalidate = 300

export const generateMetadata = () => pageMetadata('/partners/')

export default function PartnersPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Partners en leveranciers | ${SITE_NAME}`,
          url: `${SITE_URL}/partners/`,
          about: { '@id': `${SITE_URL}/#organisatie` },
        }}
      />

      <PageHero
        crumbs={[
          { name: 'Over ons', path: '/over-ons/' },
          { name: 'Partners', path: '/partners/' },
        ]}
        kicker="Partners"
        title={
          <>
            Onze <span className="wordblock">partners</span>
          </>
        }
        lead="De Onderwijs Inkoop Groep is doorlopend op zoek naar partners waarbij wij waarde hechten aan prijs én kwaliteit. Zo creëren we samen waarde voor uw school."
        aside={
          <div className={s.duo}>
            <Photo
              img={{
                url: '/beeld/organisatie/oig-048.jpg',
                alt: 'Zithoek met fauteuil en planten op het kantoor van de Onderwijs Inkoop Groep',
                focus: '50% 60%',
              }}
              ratio="262 / 400"
              sizes="(min-width: 1000px) 270px, 50vw"
              priority
            />
            <Photo
              img={{
                url: '/beeld/organisatie/oig-124.jpg',
                alt: "Collega's van de Onderwijs Inkoop Groep in overleg aan de vergadertafel",
                focus: '40% 50%',
              }}
              ratio="262 / 300"
              sizes="(min-width: 1000px) 270px, 50vw"
              priority
            />
          </div>
        }
      >
        <Link href="/contact/" className="btn btn--primair">
          Plan een kennismaking <Arrow />
        </Link>
        <Link href="/diensten/" className="btn btn--secundair">
          Bekijk onze diensten
        </Link>
      </PageHero>

      {/* Principes */}
      <section className="section section--creme">
        <div className="container">
          <SectionHeading kicker="Samenwerken" title="Wat u van onze partners mag verwachten" />
          <ul className="grid-2">
            <li className={`card ${s.principe}`}>
              <span className="icon-tile icon-tile--groen">
                <BadgeCheck strokeWidth={1.6} aria-hidden />
              </span>
              <h3 className="h3">Kwaliteit</h3>
              <p>
                Leveranciers in ons collectief hebben hun kwaliteit bewezen en bieden u de scherpste markttarieven. Zo
                bent u verzekerd van uitstekende service en gunstige voorwaarden.
              </p>
            </li>
            <li className={`card ${s.principe}`}>
              <span className="icon-tile icon-tile--blauw">
                <Scale strokeWidth={1.6} aria-hidden />
              </span>
              <h3 className="h3">Onafhankelijkheid</h3>
              <p>
                Onze leveranciers vragen geen financiële vergoeding en deelname is geheel vrijblijvend. U profiteert
                zonder verplichtingen van hun diensten en aanbiedingen.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Logowand */}
      <section className="section">
        <div className="container">
          <SectionHeading
            kicker="Leveranciers"
            title="Met deze partners werken we samen"
            lead="Op alfabetische volgorde."
          />
          <ul className={s.wand}>
            {PARTNERS.map((p) => (
              <li key={p.name}>
                <Logo src={p.logo} alt="" sizes="140px" grijs />
                <span>{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
