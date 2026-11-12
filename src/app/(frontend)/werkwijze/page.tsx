import Image from 'next/image'
import Link from 'next/link'
import { ContactSection, CtaBand, FaqSection, PageHero, Photo } from '@/components/Blocks'
import { Arrow, External } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { HERO_PHOTOS, MAIN_QUOTE, SHORT_QUOTES, STEPS } from '@/components/werkwijze/content'
import s from '@/components/werkwijze/Werkwijze.module.css'
import { getSettings, pageMetadata, SITE_URL } from '@/lib/cms'
import { service } from '@/lib/jsonld'
import { PAGES } from '@/lib/pages'

export const revalidate = 300

export const generateMetadata = () => pageMetadata('/werkwijze/')

export default async function WerkwijzePage() {
  const { figures, contact } = await getSettings()
  const cijfers = [
    { value: figures.boards, label: 'schoolbesturen' },
    { value: figures.saving, label: 'gemiddelde besparing' },
    { value: figures.years, label: 'ervaring' },
  ]

  return (
    <>
      <JsonLd
        data={{
          ...service({
            name: 'Inkoopondersteuning in zeven stappen',
            description: PAGES['/werkwijze/'].description,
            path: '/werkwijze/',
          }),
          serviceType: 'Inkoopondersteuning',
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Beter inkopen in zeven stappen',
          itemListElement: STEPS.map((step, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: step.title,
            description: step.text,
            url: `${SITE_URL}/werkwijze/#stap-${i + 1}`,
          })),
        }}
      />

      <PageHero
        crumbs={[{ name: 'Werkwijze', path: '/werkwijze/' }]}
        kicker="Onze werkwijze"
        title={
          <>
            Beter <span className="wordblock">inkopen</span> in zeven stappen
          </>
        }
        lead="Inkoop is een continu proces. Daarom geeft de Onderwijs Inkoop Groep deelnemende scholen doorlopend toegang tot voordelige mantelcontracten. Ons transparante model is volledig gericht op de belangen van scholen."
        aside={
          <div className={s.fotos}>
            {HERO_PHOTOS.map((img, i) => (
              <Photo
                key={img.url}
                img={img}
                ratio="auto"
                sizes="(min-width: 1000px) 280px, 50vw"
                priority={i === 0}
                className={s.heroFoto}
              />
            ))}
          </div>
        }
      >
        <Link href="/contact/" className="btn btn--primair">
          Plan een kennismaking <Arrow />
        </Link>
        <Link href="/diensten/" className="btn btn--secundair">
          Bekijk onze diensten
        </Link>
        <dl className={s.cijfers}>
          {cijfers.map((c) => (
            <div key={c.label}>
              <dt>{c.label}</dt>
              <dd>{c.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="section section--creme" id="stappen">
        <div className="container">
          <div className={s.kop}>
            <div className="stack" style={{ '--gap': '18px' } as React.CSSProperties}>
              <p className="kicker">De aanpak</p>
              <h2 className="h2">Van kennismaking tot borging van uw contracten</h2>
            </div>
            <p className={`zacht ${s.kopTekst}`}>
              In zeven stappen brengen we uw volledige inkoop in kaart en richten we de inkoop voor u in.
            </p>
          </div>

          <ol className={s.stappen}>
            {STEPS.map((step, i) => (
              <li key={step.title} id={`stap-${i + 1}`} className={s.stap}>
                <span className={s.nummer} aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={s.stapTekst}>
                  <h3 className="h3">
                    <span className="sr-only">Stap {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p>{step.text}</p>
                  {step.portal && (
                    <a href={contact.portalUrl} className="textlink" target="_blank" rel="noopener">
                      Naar Mijn OIG <External />
                      <span className="sr-only"> (opent in een nieuw venster)</span>
                    </a>
                  )}
                </div>
                <Photo
                  img={step.photo}
                  ratio="16 / 9"
                  sizes="(min-width: 1000px) 480px, 100vw"
                  className={s.stapFoto}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.ervaringen}`}>
          <figure className={`stack ${s.citaat}`}>
            <p className="kicker">Ervaringen</p>
            <h2 className="h2">{figures.schools} scholen gingen u voor</h2>
            <blockquote>
              <p>“{MAIN_QUOTE.text}”</p>
            </blockquote>
            <figcaption className={s.afzender}>
              <span className={s.logo}>
                <Image
                  src={MAIN_QUOTE.logo.url}
                  alt={MAIN_QUOTE.logo.alt}
                  width={MAIN_QUOTE.logo.width}
                  height={MAIN_QUOTE.logo.height}
                  unoptimized
                />
              </span>
              <span className={s.naam}>
                <strong>{MAIN_QUOTE.name}</strong>
                <span>{MAIN_QUOTE.role}</span>
              </span>
            </figcaption>
          </figure>
          <div className={s.kort}>
            {SHORT_QUOTES.map((q) => (
              <figure key={q.by} className={s.kortCitaat}>
                <blockquote>
                  <p>“{q.text}”</p>
                </blockquote>
                <figcaption>{q.by}</figcaption>
              </figure>
            ))}
            <Link href="/referenties/" className="textlink">
              Alle referenties <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <FaqSection page="werkwijze" tone="grijs" />
      <ContactSection />
      <CtaBand />
    </>
  )
}
