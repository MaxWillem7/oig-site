import { Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Avatar, CtaBand, PageHero, Photo } from '@/components/Blocks'
import { Arrow } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { cmsBeeld } from '@/components/organisatie/beeld'
import { TeamDirectory, type DirectoryGroup } from '@/components/organisatie/TeamDirectory'
import s from '@/components/organisatie/organisatie.module.css'
import { TEAM_GROUPS } from '@/collections/Team'
import { SITE_NAME, SITE_URL, getSettings, getTeam, getVacancies, pageMetadata, telHref } from '@/lib/cms'

export const revalidate = 300

export const generateMetadata = () => pageMetadata('/ons-team/')

type Lid = Awaited<ReturnType<typeof getTeam>>[number]

/** E-mailadres dat alleen na het apenstaartje mag afbreken. */
const Email = ({ value }: { value: string }) => {
  const [user, domain] = value.split('@')
  return (
    <>
      {user}@<wbr />
      {domain}
    </>
  )
}

function TeamCard({ lid, generalPhone, eager }: { lid: Lid; generalPhone: string; eager?: boolean }) {
  const photo = cmsBeeld(lid.photo, 'portret')
  const phone = lid.phone?.trim() || generalPhone
  const isGeneral = !lid.phone?.trim()
  return (
    <article className={s.lid}>
      {photo ? (
        <div className={s.lidFoto}>
          <Image
            src={photo.url}
            alt={photo.alt || `${lid.name}, ${lid.role} bij de ${SITE_NAME}`}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 480px) 120px, 104px"
            // De eerste portretten staan direct in beeld: meteen laden, de rest pas bij het scrollen
            priority={eager}
            style={{ objectPosition: photo.focus || '50% 20%' }}
          />
        </div>
      ) : (
        <Avatar name={lid.name} className={s.lidAvatar} />
      )}
      <div className={s.lidTekst}>
        <h3>{lid.name}</h3>
        <p className={s.lidRol}>{lid.role}</p>
        <a href={telHref(phone)} className={s.lidTel}>
          <Phone strokeWidth={1.8} aria-hidden />
          <span>
            <span className="sr-only">Bel {lid.name}: </span>
            {phone} {isGeneral && <small>(algemeen)</small>}
          </span>
        </a>
        {lid.email && (
          <a href={`mailto:${lid.email}`} className={s.lidMail}>
            <span className="sr-only">Mail {lid.name}: </span>
            <Email value={lid.email} />
          </a>
        )}
      </div>
    </article>
  )
}

export default async function OnsTeamPage() {
  const [{ contact }, team, vacancies] = await Promise.all([getSettings(), getTeam(), getVacancies()])

  const groups: DirectoryGroup[] = TEAM_GROUPS.map((g) => ({
    value: g.value,
    label: g.label,
    people: team
      .filter((lid) => lid.group === g.value)
      .map((lid) => ({
        id: lid.id,
        text: `${lid.name} ${lid.role}`,
        card: <TeamCard lid={lid} generalPhone={contact.phone} eager={g.value === TEAM_GROUPS[0].value} />,
      })),
  })).filter((g) => g.people.length > 0)

  const persons = team.map((lid) => {
    const photo = cmsBeeld(lid.photo, 'portret')
    return {
      '@type': 'Person',
      name: lid.name,
      jobTitle: lid.role,
      telephone: telHref(lid.phone?.trim() || contact.phone).replace('tel:', ''),
      ...(lid.email ? { email: lid.email } : {}),
      ...(photo ? { image: photo.url.startsWith('http') ? photo.url : `${SITE_URL}${photo.url}` } : {}),
      worksFor: { '@id': `${SITE_URL}/#organisatie` },
    }
  })

  return (
    <>
      {persons.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `Ons team en contactpersonen | ${SITE_NAME}`,
            url: `${SITE_URL}/ons-team/`,
            about: { '@id': `${SITE_URL}/#organisatie` },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: persons.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: p })),
            },
          }}
        />
      )}

      <PageHero
        crumbs={[
          { name: 'Over ons', path: '/over-ons/' },
          { name: 'Ons team', path: '/ons-team/' },
        ]}
        kicker="Ons team"
        title={
          <>
            Vind uw <span className="wordblock">contactpersoon</span>
          </>
        }
        lead="Ontmoet ons team van experts die klaar staan om u te helpen. Zoek op naam of kies een rol en bel of mail direct."
        aside={
          <div className={s.direct}>
            <p>Weet u niet bij wie u moet zijn?</p>
            <a href={telHref(contact.phone)} className={s.directTel}>
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className={s.directMail}>
              <Email value={contact.email} />
            </a>
          </div>
        }
      />

      {groups.length > 0 && (
        <section className={`section ${s.teamSectie}`}>
          <div className="container">
            <TeamDirectory
              groups={groups}
              empty={
                <Fragment>
                  Geen collega gevonden. Bel <a href={telHref(contact.phone)}>{contact.phone}</a>, wij verbinden u
                  door.
                </Fragment>
              }
            />
          </div>
        </section>
      )}

      {vacancies.length > 0 && (
        <section className="section section--creme">
          <div className="container split split--midden">
            <div className={`stack ${s.werken}`}>
              <p className="kicker">Werken bij de OIG</p>
              <h2 className="h2">Wij zoeken nieuwe collega&apos;s</h2>
              <p className="lead maat">
                Kom ons versterken. Bekijk de openstaande vacatures en solliciteer vandaag nog.
              </p>
              <div className="btn-rij">
                <Link href="/vacatures/" className="btn btn--secundair">
                  Bekijk de vacatures <Arrow />
                </Link>
              </div>
            </div>
            <div className={s.werkenFotos}>
              <Photo
                img={{
                  url: '/beeld/organisatie/oig-078.jpg',
                  alt: 'Blik door de glazen deuren op het team van de Onderwijs Inkoop Groep in overleg',
                }}
                ratio="auto"
                sizes="(min-width: 1000px) 200px, 36vw"
              />
              <Photo
                img={{
                  url: '/beeld/organisatie/oig-104.jpg',
                  alt: "Collega's van de Onderwijs Inkoop Groep bij het dartbord op kantoor",
                  focus: '40% 40%',
                }}
                ratio="auto"
                sizes="(min-width: 1000px) 360px, 64vw"
              />
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  )
}
