import { CalendarDays, FileDown, Globe, Mail, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { External } from '@/components/Icons'
import { telHref } from '@/lib/cms'
import type { Premy } from '@/payload-types'
import { INSURERS, type Insurer } from './content'
import s from './zorg.module.css'

/** Link naar een andere site: nieuw tabblad, met een hint voor schermlezers. */
export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className ?? s.extern}>
      {children}
      <External />
      <span className="sr-only"> (opent in een nieuw tabblad)</span>
    </a>
  )
}

/** Downloadlink naar een PDF uit het CMS. */
export function DocLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={s.doc}>
      <FileDown aria-hidden strokeWidth={1.8} />
      <span>{children}</span>
    </a>
  )
}

/** Meldingsblok: kop met een korte tekst, bijvoorbeeld dat de premies nog volgen. */
export function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={s.notice}>
      <CalendarDays aria-hidden strokeWidth={1.6} />
      <div>
        <p className={s.noticeTitle}>{title}</p>
        <div className={s.noticeText}>{children}</div>
      </div>
    </div>
  )
}

const signup = (i: Insurer) =>
  i.link ? (
    <ExternalLink href={i.link.href}>{i.link.label}</ExternalLink>
  ) : (
    <span className={s.geenLink}>
      Voeg het nummer toe via uw verzekeraar of vraag {i.via} om hulp
    </span>
  )

/** De zes verzekeraars: echte tabel vanaf 860px, kaarten op smallere schermen. */
export function InsurerComparison() {
  return (
    <>
      <div className={`tabel-wrap ${s.vergelijkTabel}`}>
        <table className="tabel">
          <caption className="sr-only">Collectiviteitskorting per zorgverzekeraar</caption>
          <thead>
            <tr>
              <th scope="col">Verzekeraar</th>
              <th scope="col">Korting aanvullend</th>
              <th scope="col">Collectiviteitsnummer</th>
              <th scope="col">Aanmelden</th>
              <th scope="col">Vragen via</th>
            </tr>
          </thead>
          <tbody>
            {INSURERS.map((i) => (
              <tr key={i.name}>
                <th scope="row" className={s.naam}>
                  {i.name}
                </th>
                <td className={s.korting}>{i.discount}</td>
                <td className={s.nummer}>{i.number}</td>
                <td>{signup(i)}</td>
                <td className="zacht">{i.via}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className={s.vergelijkKaarten}>
        {INSURERS.map((i) => (
          <li key={i.name} className={s.kaart}>
            <div className={s.kaartKop}>
              <h3 className={s.naam}>{i.name}</h3>
              <span className={s.korting}>{i.discount}</span>
            </div>
            <dl className={s.kaartRijen}>
              <div>
                <dt>Collectiviteitsnummer</dt>
                <dd className={s.nummer}>{i.number}</dd>
              </div>
              <div>
                <dt>Vragen via</dt>
                <dd>{i.via}</dd>
              </div>
            </dl>
            <div>{signup(i)}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

/** Korte kop van een tabel binnen de groep van de verzekeraar: "CZ basisverzekering 2027" wordt "Basisverzekering". */
const tableLabel = (t: Premy) => {
  const kort = t.title
    .replace(t.insurer, '')
    .replace(String(t.year), '')
    .replace(/\s+/g, ' ')
    .trim()
  return kort ? kort.charAt(0).toUpperCase() + kort.slice(1) : t.title
}

const anchorId = (insurer: string) =>
  `premies-${insurer
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`

/** Eén premietabel: echte tabel vanaf 700px, daaronder kaarten per pakket zodat er geen kolommen buiten beeld vallen. */
function PremiumTable({ t }: { t: Premy }) {
  const columns = t.columns ?? []
  const label = tableLabel(t)
  const rows = (t.rows ?? []).map((r) => {
    const cells = r.cells ?? []
    const count = Math.max(columns.length, cells.length)
    return {
      id: r.id,
      label: r.label,
      values: Array.from({ length: count }, (_, i) => cells[i]?.value ?? ''),
    }
  })
  const breed = columns.length > 2
  return (
    <div className={`${s.premie} ${breed ? s.premieVol : ''}`}>
      <div className={`tabel-wrap ${s.premieBreed}`}>
        <table className={`tabel ${s.premieTabel}`}>
          <caption>
            <span className="sr-only">{t.insurer}: </span>
            {label}
          </caption>
          {columns.length > 0 && (
            <thead>
              <tr>
                <th scope="col">Pakket</th>
                {columns.map((c, idx) => (
                  <th key={c.id ?? idx} scope="col">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((r, ridx) => (
              <tr key={r.id ?? ridx}>
                <th scope="row">{r.label}</th>
                {r.values.map((v, cidx) => (
                  <td key={cidx}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={s.premieSmal}>
        <h4 className={s.premieTitel}>{label}</h4>
        <ul className={s.premieKaarten}>
          {rows.map((r, ridx) => (
            <li key={r.id ?? ridx}>
              <p className={s.premiePakket}>{r.label}</p>
              <dl className={s.kaartRijen}>
                {r.values.map((v, cidx) =>
                  v ? (
                    <div key={cidx}>
                      <dt>{columns[cidx]?.label ?? ''}</dt>
                      <dd className={s.nummer}>{v}</dd>
                    </div>
                  ) : null,
                )}
              </dl>
            </li>
          ))}
        </ul>
      </div>

      {t.note && <p className={`klein zacht ${s.premieNoot}`}>{t.note}</p>}
    </div>
  )
}

/**
 * Premietabellen uit het CMS, gegroepeerd per verzekeraar (in de volgorde uit het CMS), met bovenaan
 * snelkoppelingen naar elke verzekeraar.
 */
export function PremiumTables({ tables }: { tables: Premy[] }) {
  const groups: { insurer: string; tables: Premy[] }[] = []
  for (const t of tables) {
    const last = groups[groups.length - 1]
    if (last && last.insurer === t.insurer) last.tables.push(t)
    else groups.push({ insurer: t.insurer, tables: [t] })
  }
  return (
    <div className={s.premies}>
      {groups.length > 1 && (
        <nav className={s.premieNav} aria-label="Premies per verzekeraar">
          <p className="label">Ga naar</p>
          <ul>
            {groups.map((g) => (
              <li key={g.insurer}>
                <a href={`#${anchorId(g.insurer)}`}>{g.insurer}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {groups.map((g) => (
        <section key={g.insurer} id={anchorId(g.insurer)} className={s.premieGroep} aria-labelledby={`${anchorId(g.insurer)}-kop`}>
          <h3 id={`${anchorId(g.insurer)}-kop`} className={`h3 ${s.premieVerzekeraar}`}>
            {g.insurer}
          </h3>
          <div className={s.premieRaster}>
            {g.tables.map((t) => (
              <PremiumTable key={t.id} t={t} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

type Party = {
  name: string
  /** Vorige naam, klein onder de naam (bijv. "voorheen Fidus"). */
  formerly?: string
  insurers: string
  phone: string
  email: string
  site: { href: string; label: string }
}

/** Contactkaart van Zicht Adviseurs of Jabes met klikbare telefoon, e-mail en website. */
export function ContactCard({ party, children }: { party: Party; children?: ReactNode }) {
  return (
    <div className={`card ${s.contact}`}>
      <p className="label">{party.insurers}</p>
      <h3 className="h3">{party.name}</h3>
      {party.formerly && <p className={`klein zacht ${s.voorheen}`}>{party.formerly}</p>}
      <ul className={s.contactLijst}>
        <li>
          <Phone aria-hidden strokeWidth={1.8} />
          <a href={telHref(party.phone)}>{party.phone}</a>
        </li>
        <li>
          <Mail aria-hidden strokeWidth={1.8} />
          <a href={`mailto:${party.email}`}>{party.email}</a>
        </li>
        <li>
          <Globe aria-hidden strokeWidth={1.8} />
          <ExternalLink href={party.site.href} className={s.contactSite}>
            {party.site.label}
          </ExternalLink>
        </li>
      </ul>
      {children && <div className={`klein zacht ${s.contactNoot}`}>{children}</div>}
    </div>
  )
}
