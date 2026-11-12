'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Chevron, External } from './Icons'
import { MAIN_NAV } from './navigation'
import s from './Header.module.css'

export function Header({ portalUrl }: { portalUrl: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState<string | null>(null)
  const [menu, setMenu] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Bij een nieuwe pagina alles dicht
  useEffect(() => {
    setOpen(null)
    setMenu(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setMenu(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menu])

  const active = (href?: string) => Boolean(href && href !== '/' && pathname.startsWith(href))

  return (
    <header className={s.header}>
      <div className={`container ${s.bar}`}>
        <Link href="/" className={s.logo} aria-label="Onderwijs Inkoop Groep, naar de homepage">
          <Image src="/logo.svg" alt="" width={135} height={52} priority />
        </Link>

        <nav ref={navRef} className={s.nav} aria-label="Hoofdmenu">
          <ul className={s.list}>
            {MAIN_NAV.map((g) =>
              g.items ? (
                <li key={g.label} className={s.item}>
                  <button
                    type="button"
                    className={`${s.link} ${active(g.href) || g.items.some((i) => active(i.href)) ? s.active : ''}`}
                    aria-expanded={open === g.label}
                    aria-controls={`menu-${g.label}`}
                    onClick={() => setOpen(open === g.label ? null : g.label)}
                  >
                    {g.label}
                    <Chevron className={`${s.chevron} ${open === g.label ? s.chevronOpen : ''}`} />
                  </button>
                  <div id={`menu-${g.label}`} className={`${s.panel} ${g.items.length > 4 ? s.panelBreed : ''}`} hidden={open !== g.label}>
                    <ul className={g.items.length > 4 ? s.panelGrid : s.panelList}>
                      {g.items.map((i) => (
                        <li key={i.href}>
                          <Link href={i.href} className={s.panelLink}>
                            <span className={s.panelLabel}>{i.label}</span>
                            {i.description && <span className={s.panelDesc}>{i.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {g.label === 'Diensten' && (
                      <Link href="/diensten/" className={s.panelAll}>
                        Alle diensten in één overzicht
                      </Link>
                    )}
                  </div>
                </li>
              ) : (
                <li key={g.label} className={s.item}>
                  <Link href={g.href!} className={`${s.link} ${active(g.href) ? s.active : ''}`}>
                    {g.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={s.actions}>
          <a href={portalUrl} className={`btn btn--secundair btn--klein ${s.portal}`} rel="noopener">
            Mijn OIG
          </a>
          <Link href="/contact/" className={`btn btn--primair btn--klein ${s.contact}`}>
            Contact
          </Link>
          <button
            type="button"
            className={s.burger}
            aria-expanded={menu}
            aria-controls="mobiel-menu"
            onClick={() => setMenu(!menu)}
          >
            <span className="sr-only">{menu ? 'Menu sluiten' : 'Menu openen'}</span>
            <span className={`${s.burgerIcon} ${menu ? s.burgerOpen : ''}`} aria-hidden />
          </button>
        </div>
      </div>

      <div id="mobiel-menu" className={s.mobile} hidden={!menu}>
        <nav className="container" aria-label="Menu">
          <ul className={s.mobileList}>
            {MAIN_NAV.map((g) => (
              <li key={g.label}>
                {g.items ? (
                  <details className={s.mobileGroup}>
                    <summary>
                      {g.label}
                      <Chevron className={s.chevron} />
                    </summary>
                    <ul>
                      {g.label === 'Diensten' && (
                        <li>
                          <Link href="/diensten/">Alle diensten</Link>
                        </li>
                      )}
                      {g.items.map((i) => (
                        <li key={i.href}>
                          <Link href={i.href}>{i.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={g.href!} className={s.mobileLink}>
                    {g.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className={s.mobileActions}>
            <Link href="/contact/" className="btn btn--primair">
              Contact
            </Link>
            <a href={portalUrl} className="btn btn--secundair" rel="noopener">
              Mijn OIG <External />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
