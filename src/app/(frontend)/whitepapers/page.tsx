import Image from 'next/image'
import Link from 'next/link'
import { CtaBand, PageHero } from '@/components/Blocks'
import { Arrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { OVERVIEW, type OverviewCard } from '@/components/whitepapers/content'
import s from '@/components/whitepapers/Overview.module.css'
import { getSettings, getWhitepapers, media, pageMetadata, SITE_URL, telHref } from '@/lib/cms'
import { PAGES } from '@/lib/pages'

export const revalidate = 300

export const generateMetadata = () => pageMetadata('/whitepapers/')

/**
 * Het CMS bepaalt welke whitepapers er staan, in welke volgorde en met welke omschrijving. Voor de vier bekende
 * pagina's blijven kaarttitel, label en cover uit het ontwerp staan (de titel in het CMS is de titel van de PDF).
 * Een nieuwe whitepaper komt volledig uit het CMS. Is het CMS leeg, dan geldt de vaste lijst uit het ontwerp.
 */
async function getCards(): Promise<OverviewCard[]> {
  const docs = (await getWhitepapers()).filter((d) => d.path)
  if (docs.length === 0) return OVERVIEW
  return docs.map((d) => {
    const path = d.path as string
    const known = OVERVIEW.find((o) => o.path === path)
    if (known) return { ...known, text: d.summary || known.text }
    const image = media(d.image, 'kaart')
    return {
      path,
      label: '',
      title: d.title,
      text: d.summary || '',
      linkLabel: 'Naar de whitepaper',
      cover: image ? { url: image.url, alt: image.alt || `Voorkant whitepaper ${d.title}` } : { url: '', alt: '' },
    }
  })
}

export default async function WhitepapersPage() {
  const [{ contact }, cards] = await Promise.all([getSettings(), getCards()])
  const info = PAGES['/whitepapers/']

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: info.title,
          description: info.description,
          url: `${SITE_URL}/whitepapers/`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: cards.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.title,
              url: `${SITE_URL}${c.path}`,
            })),
          },
        }}
      />

      <PageHero
        crumbs={[{ name: 'Whitepapers', path: '/whitepapers/' }]}
        kicker="Kennis"
        title={
          <span className={s.titel}>
            Gratis <span className="wordblock">whitepapers</span> over inkoop in het onderwijs
          </span>
        }
        lead="Praktische kennis voor schoolbesturen over schoonmaak, schoolmeubilair, kopieerapparatuur en de leasefiets. Kies de whitepaper die bij uw vraag past."
        aside={
          <div className={s.advies}>
            <p className={s.adviesKop}>Liever direct advies?</p>
            <p>
              Bel{' '}
              <a href={telHref(contact.phone)} className="link">
                {contact.phone}
              </a>{' '}
              of{' '}
              <Link href="/contact/" className="link">
                plan een kennismaking
              </Link>{' '}
              met een van onze adviseurs.
            </p>
          </div>
        }
      />

      <section className={`section section--creme ${s.sectie}`}>
        <div className="container">
          <ul className={s.raster}>
            {cards.map((card) => (
              <li key={card.path} className={`card card--klikbaar ${s.kaart}`}>
                {card.cover.url && (
                  <div className={s.cover}>
                    <Image
                      src={card.cover.url}
                      alt={card.cover.alt}
                      fill
                      sizes="(min-width: 560px) 170px, 130px"
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>
                )}
                <div className={s.tekst}>
                  {card.label && <p className="label">{card.label}</p>}
                  <h2 className="h3">{card.title}</h2>
                  {card.text && <p className={`zacht ${s.omschrijving}`}>{card.text}</p>}
                  <Link href={card.path} className={`textlink ${s.link}`}>
                    {card.linkLabel} <Arrow />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
