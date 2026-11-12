import Link from 'next/link'
import type { ReactNode } from 'react'
import { Breadcrumbs } from '@/components/Blocks'
import { getSettings, telHref } from '@/lib/cms'
import { HeadingIds } from './HeadingIds'
import s from './juridisch.module.css'

export const DOCUMENTEN = [
  { name: 'Privacyverklaring', path: '/juridisch/privacy-beleid/' },
  { name: 'Cookiebeleid', path: '/juridisch/cookiebeleid/' },
  { name: 'Algemene voorwaarden', path: '/juridisch/algemene-voorwaarden/' },
] as const

export type TocItem = { id: string; label: string }

/** Anker voor een kop: kleine letters, koppeltekens. Zelfde regel als in HeadingIds. */
export const anker = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** Datum als "3 oktober 2026". */
export const datumNl = (value: string | Date) =>
  new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Amsterdam' }).format(
    new Date(value),
  )

/**
 * Sjabloon voor een juridische tekstpagina: titelband, zijbalk (inhoudsopgave, de drie documenten, contact)
 * en een tekstkolom. `autoIds` zet ankers op de H2's van tekst uit het CMS, zodat de inhoudsopgave werkt.
 */
export async function LegalPage({
  path,
  name,
  title,
  lead,
  updated,
  toc = [],
  autoIds,
  question = 'Vragen over dit document?',
  children,
}: {
  path: string
  name: string
  title: ReactNode
  lead?: ReactNode
  updated?: string | null
  toc?: TocItem[]
  autoIds?: boolean
  question?: string
  children: ReactNode
}) {
  const { contact } = await getSettings()
  return (
    <>
      <section className={s.band}>
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Juridisch', path: '/juridisch/' },
              { name, path },
            ]}
          />
          <div className={`stack ${s.bandTekst}`}>
            <p className="kicker">Juridisch</p>
            <h1 className="h1" lang="nl">
              {title}
            </h1>
            {lead && <p className="lead maat">{lead}</p>}
            {updated && <p className={s.datum}>Laatst bijgewerkt: {updated}</p>}
          </div>
        </div>
      </section>

      <section className={s.body}>
        <div className={`container ${s.kolommen}`}>
          <aside className={s.zij}>
            {toc.length > 0 && (
              <nav className={`${s.zijBlok} ${s.inhoudZij}`} aria-label="Op deze pagina">
                <p className="label">Op deze pagina</p>
                <ol className={s.inhoud}>
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.label}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <nav className={s.zijBlok} aria-label="Juridische documenten">
              <p className="label">Juridische documenten</p>
              <ul className={s.documenten}>
                {DOCUMENTEN.map((d) => (
                  <li key={d.path}>
                    <Link href={d.path} aria-current={d.path === path ? 'page' : undefined}>
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className={s.vragen}>
              <strong>{question}</strong>
              <span>
                Mail <a href={`mailto:${contact.email}`}>{contact.email}</a> of bel{' '}
                <a href={telHref(contact.phone)}>{contact.phone}</a>.
              </span>
            </p>
          </aside>

          <div>
            {toc.length > 0 && (
              <details className={s.inhoudMobiel}>
                <summary>Op deze pagina</summary>
                <ol>
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.label}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
            <div className={`prose ${s.tekst}`} id="juridische-tekst">
              {children}
            </div>
            {autoIds && <HeadingIds target="juridische-tekst" />}
          </div>
        </div>
      </section>
    </>
  )
}
