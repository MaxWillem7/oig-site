import Image from 'next/image'
import Link from 'next/link'
import type { SiteSettings } from '@/lib/cms'
import { CookieSettingsButton } from './Consent'
import { External } from './Icons'
import { FOOTER_NAV, LEGAL_NAV } from './navigation'
import s from './Footer.module.css'

const tel = (phone: string) => {
  const d = phone.replace(/[^\d+]/g, '')
  return `tel:${d.startsWith('0') ? `+31${d.slice(1)}` : d}`
}

export function Footer({ contact }: { contact: SiteSettings['contact'] }) {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.top}>
          <div className={s.brand}>
            <Link href="/" aria-label="Onderwijs Inkoop Groep, naar de homepage">
              <Image src="/logo.svg" alt="" width={156} height={60} />
            </Link>
            <p className={s.tagline}>Inkoopcollectief voor schoolbesturen in het primair onderwijs.</p>
            <address className={s.address}>
              <a href={tel(contact.phone)}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>
                {contact.street}, {contact.postalCode} {contact.city}
              </span>
            </address>
          </div>
          {FOOTER_NAV.map((col) => (
            <nav key={col.label} className={s.col} aria-label={col.label}>
              <h2 className="label">{col.label}</h2>
              <ul>
                {col.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href}>{i.label}</Link>
                  </li>
                ))}
                {col.label === 'Kennis' && (
                  <>
                    <li>
                      <a href={contact.portalUrl} rel="noopener" className={s.ext}>
                        Mijn OIG <External />
                      </a>
                    </li>
                    {contact.linkedin && (
                      <li>
                        <a href={contact.linkedin} rel="noopener" className={s.ext}>
                          LinkedIn <External />
                        </a>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </nav>
          ))}
        </div>
        <div className={s.bottom}>
          <p>
            © {new Date().getFullYear()} Onderwijs Inkoop Groep{contact.kvk ? ` · KvK ${contact.kvk}` : ''}
          </p>
          <ul className={s.legal}>
            {LEGAL_NAV.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className={s.cookieBtn} />
            </li>
            <li>
              Website:{' '}
              <a href="https://digitaldudes.nl/" rel="noopener">
                Digital Dudes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
