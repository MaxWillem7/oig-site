import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Photo } from '@/components/Blocks'
import { ContactForm } from '@/components/forms'
import { Arrow, External } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { getSettings, pageMetadata, SITE_URL, telHref } from '@/lib/cms'
import s from '@/components/contact/contact.module.css'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/contact/')

/** Routebeschrijving: dezelfde Google Maps-link als op de live site. Geen ingesloten kaart (cookies). */
const ROUTE_URL = 'https://maps.app.goo.gl/LLokstcKvPxrytis6'

export default async function ContactPage() {
  const { contact } = await getSettings()
  const adres = `${contact.street}, ${contact.postalCode} ${contact.city}`

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${SITE_URL}/contact/`,
          name: 'Contact',
          mainEntity: { '@id': `${SITE_URL}/#organisatie` },
        }}
      />

      <section className="section">
        <div className="container split">
          <div className={`stack ${s.intro}`}>
            <p className="kicker">Contact</p>
            <h1 className="h1">
              Neem gerust <span className="wordblock">contact</span> op
            </h1>
            <p className="lead">
              Heeft u vragen of wilt u meer informatie? Bel, mail of vul het formulier in. Wij nemen zo snel mogelijk
              contact met u op.
            </p>

            <ul className={s.kanalen}>
              <li>
                <span className="icon-tile" aria-hidden>
                  <Phone />
                </span>
                <span className={s.kanaalTekst}>
                  <span className={s.kanaalLabel}>Bel ons</span>
                  <a href={telHref(contact.phone)} className={s.kanaalWaarde}>
                    {contact.phone}
                  </a>
                </span>
              </li>
              <li>
                <span className="icon-tile icon-tile--groen" aria-hidden>
                  <Mail />
                </span>
                <span className={s.kanaalTekst}>
                  <span className={s.kanaalLabel}>Mail ons</span>
                  <a href={`mailto:${contact.email}`} className={`${s.kanaalWaarde} ${s.kanaalMail}`}>
                    {contact.email}
                  </a>
                </span>
              </li>
              <li>
                <span className="icon-tile icon-tile--blauw" aria-hidden>
                  <MapPin />
                </span>
                <span className={s.kanaalTekst}>
                  <span className={s.kanaalLabel}>Ons adres</span>
                  <span className={s.kanaalWaarde}>{adres}</span>
                  <a href={ROUTE_URL} className={s.route} target="_blank" rel="noopener">
                    Plan uw route in Google Maps <External />
                  </a>
                </span>
              </li>
            </ul>

            <div className={s.mobiel}>
              <a href={telHref(contact.phone)} className="btn btn--primair">
                <Phone aria-hidden /> Bel {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="btn btn--secundair">
                Mail ons
              </a>
              <p className={s.mobielAdres}>
                <span>{adres}</span>
                <a href={ROUTE_URL} className={s.route} target="_blank" rel="noopener">
                  Plan uw route in Google Maps <External />
                </a>
              </p>
            </div>

            {contact.kvk && <p className={s.kvk}>KvK: {contact.kvk}</p>}
          </div>

          <div className={s.formulier}>
            <div>
              <h2 className={s.formulierKop}>Stuur ons een bericht</h2>
              <p>Velden met * zijn verplicht.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section section--creme section--smal">
        <div className={`container ${s.team}`}>
          <div>
            <h2>Liever direct uw contactpersoon spreken?</h2>
            <p>Op de teampagina vindt u onze collega&apos;s met hun directe telefoonnummer en e-mailadres.</p>
          </div>
          <Link href="/ons-team/" className={`btn btn--secundair ${s.witteKnop}`}>
            Vind uw contactpersoon <Arrow />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container split split--midden">
          <div className="stack" style={{ '--gap': '20px' } as CSSProperties}>
            <p className="kicker">Locatie</p>
            <h2 className="h2">Ons kantoor in {contact.city}</h2>
            <address className={s.adres}>
              {contact.street}
              <br />
              {contact.postalCode} {contact.city}
            </address>
            <a href={ROUTE_URL} className="textlink" target="_blank" rel="noopener">
              Plan uw route in Google Maps <External />
            </a>
          </div>
          <Photo
            img={{
              url: '/beeld/contact/kantoor-zeewolde-vergaderruimte.jpg',
              alt: 'Blik door een glazen deur in een vergaderruimte op het kantoor van de Onderwijs Inkoop Groep, waar een collega een groep toespreekt',
              focus: '50% 62%',
            }}
            ratio="3 / 2"
          />
        </div>
      </section>
    </>
  )
}
