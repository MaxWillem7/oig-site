'use client'

import { NavGroup } from '@payloadcms/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const PAD = '/admin/claude-koppeling'

/** Link in het zijmenu naar de handleiding van de Claude-koppeling, in dezelfde opmaak als de andere links. */
export function ClaudeNavLink() {
  const pathname = usePathname()
  const actief = pathname?.replace(/\/$/, '') === PAD
  return (
    <NavGroup label="Hulp">
      <Link className="nav__link" href={PAD} id="nav-claude-koppeling" prefetch={false} aria-current={actief ? 'page' : undefined}>
        {actief && <div className="nav__link-indicator" />}
        <span className="nav__link-label">Claude-koppeling</span>
      </Link>
    </NavGroup>
  )
}
