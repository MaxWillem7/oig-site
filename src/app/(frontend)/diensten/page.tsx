import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Bike, ClipboardList, FileCheck, HandCoins, Heart, Printer, ShieldCheck, ShoppingCart } from 'lucide-react'
import { CtaBand, PageHero, Photo } from '@/components/Blocks'
import { Arrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { DIENSTEN } from '@/components/navigation'
import { KopRij, Verwijsbalk } from '@/components/diensten/Onderdelen'
import s from '@/components/diensten/diensten.module.css'
import { getSettings, pageMetadata } from '@/lib/cms'
import { service } from '@/lib/jsonld'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/diensten/')

type Kaart = {
  href: string
  icon: ReactNode
  tile: '' | 'icon-tile--groen' | 'icon-tile--blauw'
  text: ReactNode
  link: string
  extra?: { href: string; label: string }
}

export default async function DienstenPage() {
  const { figures } = await getSettings()

  // Volgorde en adressen komen uit de navigatie; Inkoopsegmenten hoort bij Ondersteuning bij inkoop.
  const kaarten: Kaart[] = [
    {
      href: '/dienst/aanbesteden/',
      icon: <FileCheck />,
      tile: 'icon-tile--groen',
      text: 'Wij begeleiden Europese en meervoudig onderhandse aanbestedingen. Via het aanbestedingscollectief besteedt u kosteloos en flexibel aan voor onderwijsgerelateerde vraagstukken.',
      link: 'Meer over aanbesteden',
    },
    {
      href: '/dienst/ondersteuning-inkoop/',
      icon: <ShoppingCart />,
      tile: '',
      text: 'Met een inkoopscan brengen wij uw inkoop in kaart. Door samen te werken met landelijke en regionale partnerleveranciers profiteert u van de beste inkoopcondities.',
      link: 'Meer over ondersteuning bij inkoop',
      extra: { href: '/dienst/ondersteuning-inkoop/inkoopsegmenten/', label: 'Bekijk de inkoopsegmenten' },
    },
    {
      href: '/dienst/premiedesk/',
      icon: <ShieldCheck />,
      tile: 'icon-tile--blauw',
      text: 'Grip op uw Whk-premie. Met de WGA-scan worden fouten in uitkeringsdossiers hersteld, en met onze collectieve aanpak voorkomt u onnodige opslagen op de ZW-premie.',
      link: 'Meer over de Premiedesk',
    },
    {
      href: '/dienst/subsidiedesk/',
      icon: <HandCoins />,
      tile: 'icon-tile--blauw',
      text: 'Wij helpen u bij het vinden, aanvragen en verantwoorden van subsidies, lokaal en nationaal. Wordt een subsidie niet toegekend, dan brengen wij geen kosten in rekening.',
      link: 'Meer over de Subsidiedesk',
    },
    {
      href: '/inkoopbeleid/',
      icon: <ClipboardList />,
      tile: 'icon-tile--groen',
      text: 'Wij helpen u bij het opstellen en uitvoeren van inkoopbeleid. Met grip op kosten en processen, inzicht in leveranciersafspraken en voorbereid op de accountantscontrole.',
      link: 'Meer over inkoopbeleid',
    },
    {
      href: '/dienst/verzekeringen/',
      icon: <Heart />,
      tile: '',
      text: (
        <>
          Collectiviteitskorting {figures.insuranceDiscount} op de zorgverzekering voor uw medewerkers. In veel gevallen
          is overstappen niet nodig en deelname kost u niets.
        </>
      ),
      link: 'Meer over verzekeringen',
    },
  ]
  const naam = (href: string) => DIENSTEN.find((d) => d.href === href)?.label ?? ''

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Diensten van de Onderwijs Inkoop Groep',
          itemListElement: DIENSTEN.map((d, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: service({ name: d.label, description: d.description ?? d.label, path: d.href }),
          })),
        }}
      />

      <PageHero
        crumbs={[{ name: 'Diensten', path: '/diensten/' }]}
        kicker="Diensten"
        title={
          <>
            Alle diensten voor uw <span className="wordblock">schoolbestuur</span>
          </>
        }
        lead="De Onderwijs Inkoop Groep ondersteunt schoolbesturen in het volledige inkoopproces. Naast deelname aan ons inkoopcollectief helpen wij u bij (Europese) aanbestedingen, subsidies, uw Whk-premie en uw inkoopbeleid."
        aside={
          <div className={s.fotoDuo}>
            <Photo
              img={{
                url: '/beeld/diensten/oig-120.jpg',
                alt: 'Twee adviseurs van de Onderwijs Inkoop Groep aan de vergadertafel met een laptop',
                focus: '40% 40%',
              }}
              ratio="3 / 4"
              sizes="(min-width: 1000px) 330px, 62vw"
              priority
            />
            <Photo
              img={{
                url: '/beeld/diensten/oig-119.jpg',
                alt: 'Vier adviseurs van de Onderwijs Inkoop Groep in overleg aan de vergadertafel',
                focus: '78% 50%',
              }}
              ratio="192 / 260"
              sizes="(min-width: 1000px) 192px, 36vw"
              priority
            />
          </div>
        }
      >
        <Link href="/contact/" className="btn btn--primair">
          Plan een kennismaking <Arrow />
        </Link>
        <a href="#diensten" className="btn btn--secundair">
          Bekijk alle diensten
        </a>
      </PageHero>

      <section className="section section--creme" id="diensten">
        <div className="container">
          <KopRij
            kicker="Voor uw bestuur"
            title="Zes diensten, u kiest wat u nodig heeft"
            lead="Van inkoopscan en aanbesteding tot subsidie en premie. Voor schoolbesturen in het primair onderwijs."
          />
          <ul className="grid-3">
            {kaarten.map((k) => (
              <li key={k.href}>
                <article className={`card ${s.kaart}`}>
                  <span className={`icon-tile ${k.tile}`}>{k.icon}</span>
                  <h3 className="h3">{naam(k.href)}</h3>
                  <p>{k.text}</p>
                  <div className={s.kaartLinks}>
                    <Link href={k.href} className="textlink">
                      {k.link} <Arrow />
                    </Link>
                    {k.extra && (
                      <Link href={k.extra.href} className="textlink">
                        {k.extra.label} <Arrow />
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <KopRij kicker="Kennis" title="Twee onderwerpen uitgelicht" />
          <div className="grid-2">
            <article className={`card ${s.kaartLiggend}`}>
              <span className="icon-tile icon-tile--groen">
                <Bike />
              </span>
              <div>
                <h3 className="h3">Fietsplan en leasefiets</h3>
                <p className="zacht">
                  Bied uw medewerkers een fiets van de zaak: een duurzaam en gezond alternatief voor woon-werkverkeer.
                  In onze whitepaper leest u hoe het werkt.
                </p>
                <Link href="/fietsplan-onderwijs/" className="textlink">
                  Meer over de leasefiets <Arrow />
                </Link>
              </div>
            </article>
            <article className={`card ${s.kaartLiggend}`}>
              <span className="icon-tile">
                <Printer />
              </span>
              <div>
                <h3 className="h3">Printers en kopieerapparatuur</h3>
                <p className="zacht">
                  Zeven inzichten die u helpen verborgen kosten van printers en kopieerapparatuur te voorkomen. Zo bent
                  u goed voorbereid.
                </p>
                <Link href="/lp/kopieerapparaat/" className="textlink">
                  Meer over kopieerapparatuur <Arrow />
                </Link>
              </div>
            </article>
          </div>
          <Verwijsbalk href="/werkwijze/" label="Bekijk onze werkwijze">
            Elke samenwerking begint met een kennismaking en een inkoopscan. Zo werken wij, in zeven stappen.
          </Verwijsbalk>
        </div>
      </section>

      <section className="section section--creme">
        <div className={`container ${s.citaatSectie}`}>
          <div className={`stack ${s.citaatIntro}`}>
            <p className="kicker">Ervaringen</p>
            <h2>Wat schoolbesturen zeggen over de samenwerking.</h2>
            <Link href="/referenties/" className="textlink">
              Alle referenties <Arrow />
            </Link>
          </div>
          <figure className={s.citaat}>
            <blockquote>
              <p>
                “Medewerkers van OIG zijn kundig en zoeken steeds opnieuw naar organisatievoordelen, ondersteunen bij
                (Europese) aanbestedingen en kennen de wensen en uitdagingen voor onze organisatie soms beter dan
                wijzelf.”
              </p>
            </blockquote>
            <figcaption className={s.bron}>
              <span className={s.bronLogo}>
                <Image src="/beeld/diensten/essentius-logo.png" alt="Logo Essentius" width={396} height={130} />
              </span>
              <div>
                <strong>Albert Sluiter</strong>
                <span>Directeur bestuurder, Essentius</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
