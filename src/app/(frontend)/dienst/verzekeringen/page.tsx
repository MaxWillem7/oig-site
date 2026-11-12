import { ArrowDown } from 'lucide-react'
import { CtaBand, FaqSection, PageHero, Photo, SectionHeading } from '@/components/Blocks'
import { JsonLd } from '@/components/JsonLd'
import { cmsUrl } from '@/components/zorg/cmsUrl'
import { DOCS, FIDUS, JABES, STEPS } from '@/components/zorg/content'
import {
  ContactCard,
  DocLink,
  InsurerComparison,
  Notice,
  PremiumTables,
} from '@/components/zorg/Zorg'
import { getDocument, getPremiumTables, getSettings, pageMetadata } from '@/lib/cms'
import { service } from '@/lib/jsonld'
import s from '@/components/zorg/zorg.module.css'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/dienst/verzekeringen/')

const PATH = '/dienst/verzekeringen/'

export default async function VerzekeringenPage() {
  const [{ figures, insurance }, tables, formDoc, overviewDoc, dczDoc] = await Promise.all([
    getSettings(),
    getPremiumTables(),
    getDocument(DOCS.form),
    getDocument(DOCS.overview2026),
    getDocument(DOCS.dcz2026),
  ])
  const year = insurance.year
  const hasTables = tables.length > 0
  const formUrl = cmsUrl(formDoc?.url)
  const downloads2026 = [
    {
      href: cmsUrl(overviewDoc?.url),
      label: 'Premieoverzicht collectieve zorgverzekering 2026 (pdf)',
    },
    { href: cmsUrl(dczDoc?.url), label: 'Premietabel De Christelijke Zorgverzekeraar 2026 (pdf)' },
  ].filter((d): d is { href: string; label: string } => Boolean(d.href))

  return (
    <>
      <JsonLd
        data={service({
          name: 'Collectieve zorgverzekering',
          description: `Collectiviteitskorting (${figures.insuranceDiscount}) op de aanvullende zorgverzekering bij zes zorgverzekeraars, voor medewerkers van schoolbesturen die zijn aangesloten bij de Onderwijs Inkoop Groep.`,
          path: PATH,
          audience: 'Medewerkers van aangesloten schoolbesturen',
        })}
      />

      <div className={s.hero}>
        <PageHero
          crumbs={[
            { name: 'Diensten', path: '/diensten/' },
            { name: 'Verzekeringen', path: PATH },
          ]}
          kicker="Voor medewerkers"
          title={
            <span className={s.titel}>
              <span className="wordblock">Collectiviteits&shy;korting</span> op uw zorgverzekering
            </span>
          }
          lead={
            <>
              Werkt u bij een school die is aangesloten bij de Onderwijs Inkoop Groep? Dan krijgt u
              privé {figures.insuranceDiscount} collectiviteitskorting op uw aanvullende
              zorgverzekering, bij zes zorgverzekeraars. Vaak hoeft u niet over te stappen: met het
              collectiviteitsnummer van de OIG ontvangt u direct de hoogste korting. Deelname is
              vrijblijvend en kost u niets.
            </>
          }
          aside={
            <div className={s.aside}>
              <Photo
                img={{
                  url: '/beeld/zorg/oig-090.jpg',
                  alt: 'Presentatie voor een groep toehoorders op het kantoor van de Onderwijs Inkoop Groep',
                  width: 1600,
                  height: 1066,
                }}
                ratio="23 / 20"
                sizes="(min-width: 1000px) 460px, 100vw"
                priority
              />
              {!hasTables && <Notice title={`Premies ${year}`}>{insurance.notice}</Notice>}
            </div>
          }
        >
          <a href="#verzekeraars" className="btn btn--primair">
            Vergelijk de zes verzekeraars <ArrowDown aria-hidden strokeWidth={2.2} />
          </a>
          <a href="#premies" className="btn btn--secundair">
            Premieoverzicht {year}
          </a>
        </PageHero>
      </div>

      <section className="section section--creme">
        <div className="container">
          <div className={s.kop}>
            <div className="stack">
              <p className="kicker">Zo werkt het</p>
              <h2 className="h2">In drie stappen korting op uw premie</h2>
            </div>
            <p className="zacht">
              Deelname is vrijblijvend, kosteloos en opengesteld voor alle relaties van de Onderwijs
              Inkoop Groep. U bent de OIG geen vergoeding verschuldigd.
            </p>
          </div>
          <ol className={`grid-3 ${s.stappen}`}>
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

      <section className="section" id="verzekeraars">
        <div className="container">
          <SectionHeading
            kicker="Zorgverzekering onderwijs"
            title="Zes zorgverzekeraars vergeleken"
            lead="De korting geldt op de aanvullende verzekering. Het percentage is de maximale korting per verzekeraar."
          />
          <InsurerComparison />
          <div className={s.onderTabel}>
            <p className="klein zacht maat">
              Bent u al verzekerd bij VGZ of Menzis? Dan voegt u het collectiviteitsnummer zelf toe
              door in te loggen bij uw verzekeraar; dat is daar de enige manier. Bij CZ, ONVZ en
              Nationale Nederlanden kunt u ook het wijzigingsformulier invullen en mailen naar
              Fidus. Bij De Christelijke Zorgverzekeraar mailt u uw relatienummer naar Jabes
              verzekeringen.
            </p>
            {formUrl && (
              <DocLink href={formUrl}>Download het wijzigingsformulier 2026 (pdf)</DocLink>
            )}
          </div>
        </div>
      </section>

      <section className="section section--creme" id="premies">
        <div className="container">
          <SectionHeading
            kicker={`Premies ${year}`}
            title={`Premieoverzicht ${year}`}
            lead={
              hasTables
                ? `De premies voor ${year} per verzekeraar, direct op deze pagina.`
                : undefined
            }
          />
          {hasTables ? (
            <PremiumTables tables={tables} />
          ) : (
            <div className={s.geenPremies}>
              <Notice title={`De premies voor ${year} volgen`}>{insurance.notice}</Notice>
              {downloads2026.length > 0 && (
                <div className={s.downloads}>
                  <h3>Tot die tijd: de premies van 2026</h3>
                  <ul>
                    {downloads2026.map((d) => (
                      <li key={d.href}>
                        <DocLink href={d.href}>{d.label}</DocLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section" id="polisvragen">
        <div className="container">
          <SectionHeading
            kicker="Uw polis"
            title="Fidus en Jabes helpen u verder"
            lead="Vragen over het collectief en uw polis worden afgehandeld door Fidus. Voor De Christelijke Zorgverzekeraar is dat Jabes verzekeringen."
          />
          <div className="grid-2">
            <ContactCard party={FIDUS}>
              <p>
                Liever het wijzigingsformulier gebruiken? Mail het volledig ingevuld naar{' '}
                <a className="link" href={`mailto:${FIDUS.email}`}>
                  {FIDUS.email}
                </a>
                . Fidus zorgt ervoor dat de korting op uw polis wordt doorgevoerd. Bij VGZ en Menzis
                kan dit alleen door zelf in te loggen.
              </p>
            </ContactCard>
            <ContactCard party={JABES}>
              <p>
                Meeliften in dit collectief? Mail dan naar{' '}
                <a className="link" href={`mailto:${JABES.email}`}>
                  {JABES.email}
                </a>
                . Vermeld uw relatienummer bij De Christelijke Zorgverzekeraar en geef aan dat u
                graag meelift op het collectief van de Onderwijs Inkoop Groep.
              </p>
            </ContactCard>
          </div>
        </div>
      </section>

      <FaqSection
        page="verzekeringen"
        title="Vragen over de collectieve zorgverzekering"
        tone="creme"
        lead={
          <>
            Hier vindt u antwoorden op veelgestelde vragen over de collectiviteitskorting.
            {formUrl && (
              <>
                {' '}
                Het wijzigingsformulier vindt u hier:{' '}
                <a className="link" href={formUrl}>
                  Wijzigingsformulier 2026 (pdf)
                </a>
                .
              </>
            )}
          </>
        }
      />

      <CtaBand
        title="Bent u bestuurder of werkgever?"
        text="De collectieve zorgverzekering is een van de voordelen van het collectief. Ontdek wat de OIG verder voor uw bestuur kan betekenen."
      />
    </>
  )
}
