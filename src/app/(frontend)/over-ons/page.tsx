import { Handshake, Sprout, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, CtaBand, PageHero, Photo } from '@/components/Blocks'
import { Arrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { cmsBeeld } from '@/components/organisatie/beeld'
import { Logo } from '@/components/organisatie/Logo'
import s from '@/components/organisatie/organisatie.module.css'
import { PARTNERS_OVER_ONS } from '@/components/organisatie/partners'
import { SITE_NAME, SITE_URL, getSettings, getTeam, pageMetadata } from '@/lib/cms'

export const revalidate = 300

export const generateMetadata = () => pageMetadata('/over-ons/')

const WAARDEN = [
  {
    icon: Handshake,
    tone: 'icon-tile--groen',
    title: 'Eerlijk zaken doen',
    text: 'Integriteit is niet te koop, maar wel in één keer te verliezen.',
  },
  {
    icon: Users,
    tone: '',
    title: 'Respect voor elkaar',
    text: 'Behandel een ander zoals u zelf behandeld wilt worden.',
  },
  {
    icon: Sprout,
    tone: 'icon-tile--blauw',
    title: 'Delen met anderen',
    text: 'Wat u zaait, is wat u oogst.',
  },
]

const DIENSTEN = [
  {
    name: 'Aanbesteden',
    href: '/dienst/aanbesteden/',
    text: 'Begeleiding bij uw aanbestedingen. U voldoet aan alle regelgeving en haalt het maximale uit het beschikbare budget.',
  },
  {
    name: 'Ondersteuning bij inkoop',
    href: '/dienst/ondersteuning-inkoop/',
    text: 'Van grondige analyse tot volledige implementatie. Wij helpen u kosten te besparen en kwaliteit te waarborgen.',
  },
  {
    name: 'Premiedesk',
    href: '/dienst/premiedesk/',
    text: 'De premie voor de Werkhervattingskas (Whk) is een aanzienlijke kostenpost. Met de Premiedesk bespaart u structureel op de WGA- en ZW-premie.',
  },
  {
    name: 'Subsidiedesk',
    href: '/dienst/subsidiedesk/',
    text: 'Ondersteuning bij het vinden, aanvragen en verantwoorden van subsidies, zowel lokaal als landelijk.',
  },
  {
    name: 'Inkoopbeleid',
    href: '/inkoopbeleid/',
    text: 'Hulp bij het opstellen en uitvoeren van effectief inkoopbeleid, zodat u voldoet aan wet- en regelgeving.',
  },
  {
    name: 'Verzekeringen',
    href: '/dienst/verzekeringen/',
    text: 'Laat uw personeel meeliften op een van de collectieven van aangesloten zorgverzekeraars.',
  },
]

export default async function OverOnsPage() {
  const [{ figures }, team] = await Promise.all([getSettings(), getTeam()])
  const dick = team.find((lid) => lid.name === 'Dick Goedhart')
  const dickFoto = cmsBeeld(dick?.photo, 'portret')

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `Over ons | ${SITE_NAME}`,
          url: `${SITE_URL}/over-ons/`,
          mainEntity: { '@id': `${SITE_URL}/#organisatie` },
        }}
      />

      <PageHero
        crumbs={[{ name: 'Over ons', path: '/over-ons/' }]}
        kicker="Over ons"
        title={
          <>
            Over de <span className="wordblock">Onderwijs</span> Inkoop Groep
          </>
        }
        lead="Wij ondersteunen schoolbesturen bij hun inkoop. Met efficiëntere inkoop realiseren wij besparingen, zodat u zich volledig kunt richten op waar u goed in bent: hoogwaardig onderwijs."
        aside={
          <div className={s.collage}>
            <Photo
              img={{
                url: '/beeld/organisatie/oig-077.jpg',
                alt: 'Medewerker van de Onderwijs Inkoop Groep loopt door de glazen deur een overleg binnen',
                focus: '50% 40%',
              }}
              ratio="auto"
              sizes="(min-width: 1000px) 270px, 50vw"
              priority
            />
            <Photo
              img={{
                url: '/beeld/organisatie/oig-094.jpg',
                alt: 'Collega geeft een presentatie bij het scherm',
                focus: '50% 55%',
              }}
              ratio="auto"
              sizes="(min-width: 1000px) 270px, 50vw"
              priority
            />
            <Photo
              img={{
                url: '/beeld/organisatie/oig-093.jpg',
                alt: 'Het team van de Onderwijs Inkoop Groep volgt een presentatie op kantoor',
                focus: '60% 50%',
              }}
              ratio="auto"
              sizes="(min-width: 1000px) 270px, 50vw"
            />
          </div>
        }
      >
        <Link href="/contact/" className="btn btn--primair">
          Plan een kennismaking <Arrow />
        </Link>
        <Link href="/werkwijze/" className="btn btn--secundair">
          Bekijk onze werkwijze
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
            <dt>gemiddelde besparing</dt>
            <dd>{figures.saving}</dd>
          </div>
          <div>
            <dt>ervaring</dt>
            <dd>{figures.years}</dd>
          </div>
        </dl>
      </PageHero>

      {/* Missie */}
      <section className="section section--creme">
        <div className="container split split--midden">
          <Photo
            className={s.missieFoto}
            img={{
              url: '/beeld/organisatie/oig-120.jpg',
              alt: "Twee collega's van de Onderwijs Inkoop Groep in overleg aan de vergadertafel",
              focus: '45% 50%',
            }}
            ratio="520 / 460"
          />
          <figure className={`stack ${s.missie}`}>
            <h2 className="kicker">Onze missie</h2>
            <blockquote>
              <p>
                “Bij de Onderwijs Inkoop Groep ondersteunen wij onderwijsinstellingen bij het optimaliseren van hun
                financiële middelen door middel van deskundige inkoopdiensten. Ons doel is om kostenbesparingen te
                realiseren en efficiëntie te bevorderen, zodat scholen zich volledig kunnen richten op het bieden van
                hoogwaardig onderwijs. We streven naar een partnerschap dat is gebaseerd op integriteit,
                professionaliteit en betrokkenheid.”
              </p>
            </blockquote>
            <figcaption className={s.persoon}>
              {dickFoto ? (
                <span className={s.persoonFoto}>
                  <Image src={dickFoto.url} alt="" width={dickFoto.width} height={dickFoto.height} sizes="56px" />
                </span>
              ) : (
                <Avatar name="Dick Goedhart" className={s.persoonAvatar} />
              )}
              <span>
                <strong>Dick Goedhart</strong>
                <span>Oprichter en eigenaar, Onderwijs Inkoop Groep</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Visie en waarden */}
      <section className="section">
        <div className="container">
          <div className={s.kopRij}>
            <div className="stack">
              <p className="kicker">Visie en waarden</p>
              <h2 className="h2">Elke school verdient effectieve inkoop</h2>
            </div>
            <p className={s.kopTekst}>
              Wij geloven in een onderwijssector waarin elke school toegang heeft tot effectieve inkoopoplossingen die
              bijdragen aan duurzame financiële gezondheid. Samen met onderwijsinstellingen werken wij aan innovatieve
              en kostenbesparende inkoop binnen het onderwijs.
            </p>
          </div>
          <ul className="grid-3">
            {WAARDEN.map(({ icon: Icon, tone, title, text }) => (
              <li key={title} className={`card ${s.waarde}`}>
                <span className={`icon-tile ${tone}`}>
                  <Icon strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="h3">{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Diensten */}
      <section className="section section--creme">
        <div className={`container split ${s.dienstenSplit}`}>
          <div className={`stack ${s.dienstenKop}`}>
            <p className="kicker">Diensten</p>
            <h2 className="h2">Wat wij voor uw bestuur doen</h2>
          </div>
          <ul className={s.diensten}>
            {DIENSTEN.map((d) => (
              <li key={d.href}>
                <Link href={d.href}>
                  <strong>{d.name}</strong>
                  <span>{d.text}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partners */}
      <section className="section section--smal">
        <div className="container">
          <div className={s.partnerKop}>
            <div className="stack">
              <p className="kicker">Partners</p>
              <h2>Leveranciers in ons collectief</h2>
            </div>
            <Link href="/partners/" className="textlink">
              Bekijk alle partners <Arrow />
            </Link>
          </div>
          <ul className={s.logoRij}>
            {PARTNERS_OVER_ONS.map((p) => (
              <li key={p.name}>
                <Logo src={p.logo} alt={`Logo ${p.name}`} sizes="110px" grijs />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
