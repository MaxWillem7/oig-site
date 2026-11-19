import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps } from 'payload'
import React, { type ReactNode } from 'react'
import { ADRES_PLAATSHOUDER, HANDLEIDING_DEEL_A } from '@/lib/mcp/handleiding'
import { KopieerAdres } from './KopieerAdres'

/** Het adres van deze site: NEXT_PUBLIC_SITE_URL, anders het adres van het verzoek. */
async function siteAdres() {
  const vast = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (vast) return vast
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3100'
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

/* ── Een klein stukje markdown: koppen, alinea's, genummerde stappen, punten, vet en code ── */

/** Inhoud van een stap, in volgorde: een alinea of een lijstje punten. */
type Deel = { soort: 'tekst'; tekst: string } | { soort: 'punten'; items: string[] }

type Blok =
  | { soort: 'kop'; tekst: string }
  | { soort: 'alinea'; tekst: string }
  | { soort: 'stappen'; items: Deel[][] }
  | { soort: 'punten'; items: string[] }

function lees(md: string): Blok[] {
  const blokken: Blok[] = []
  const regels = md.split('\n')
  let i = 0
  while (i < regels.length) {
    const r = regels[i]
    if (!r.trim()) {
      i++
      continue
    }
    if (r.startsWith('### ')) {
      blokken.push({ soort: 'kop', tekst: r.slice(4).trim() })
      i++
      continue
    }
    if (/^\d+\.\s/.test(r)) {
      const items: Deel[][] = []
      while (i < regels.length && (/^\d+\.\s/.test(regels[i]) || /^\s{2,}\S/.test(regels[i]))) {
        const regel = regels[i]
        if (/^\d+\.\s/.test(regel)) items.push([{ soort: 'tekst', tekst: regel.replace(/^\d+\.\s+/, '') }])
        else {
          const stap = items[items.length - 1]
          const laatste = stap[stap.length - 1]
          if (/^\s+-\s/.test(regel)) {
            const punt = regel.replace(/^\s+-\s+/, '')
            if (laatste.soort === 'punten') laatste.items.push(punt)
            else stap.push({ soort: 'punten', items: [punt] })
          } else if (laatste.soort === 'tekst' && !/[.:]$/.test(laatste.tekst)) {
            // Doorlopende regel van dezelfde zin
            laatste.tekst += ` ${regel.trim()}`
          } else stap.push({ soort: 'tekst', tekst: regel.trim() })
        }
        i++
      }
      blokken.push({ soort: 'stappen', items })
      continue
    }
    if (r.startsWith('- ')) {
      const items: string[] = []
      while (i < regels.length && (regels[i].startsWith('- ') || /^\s{2,}\S/.test(regels[i]))) {
        if (regels[i].startsWith('- ')) items.push(regels[i].slice(2).trim())
        else items[items.length - 1] += ` ${regels[i].trim()}`
        i++
      }
      blokken.push({ soort: 'punten', items })
      continue
    }
    const tekst: string[] = []
    while (i < regels.length && regels[i].trim() && !/^(###\s|\d+\.\s|-\s)/.test(regels[i])) tekst.push(regels[i++].trim())
    blokken.push({ soort: 'alinea', tekst: tekst.join(' ') })
  }
  return blokken
}

function Inline({ tekst, adres }: { tekst: string; adres: string }) {
  const delen = tekst.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean)
  return (
    <>
      {delen.map((d, i) => {
        if (d.startsWith('**')) return <strong key={i}>{d.slice(2, -2)}</strong>
        if (d.startsWith('`')) {
          const code = d.slice(1, -1)
          if (code === ADRES_PLAATSHOUDER) return <KopieerAdres key={i} adres={adres} />
          return <code key={i}>{code.replace('https://<adres van de site>', adres)}</code>
        }
        return <React.Fragment key={i}>{d}</React.Fragment>
      })}
    </>
  )
}

function Handleiding({ md, adres }: { md: string; adres: string }) {
  const out: ReactNode[] = []
  lees(md).forEach((b, i) => {
    if (b.soort === 'kop') out.push(<h2 key={i}>{b.tekst}</h2>)
    else if (b.soort === 'alinea')
      out.push(
        <p key={i}>
          <Inline tekst={b.tekst} adres={adres} />
        </p>,
      )
    else if (b.soort === 'punten')
      out.push(
        <ul key={i}>
          {b.items.map((t, j) => (
            <li key={j}>
              <Inline tekst={t} adres={adres} />
            </li>
          ))}
        </ul>,
      )
    else
      out.push(
        <ol key={i}>
          {b.items.map((s, j) => (
            <li key={j}>
              {s.map((d, k) =>
                d.soort === 'tekst' ? (
                  <p key={k}>
                    <Inline tekst={d.tekst} adres={adres} />
                  </p>
                ) : (
                  <ul key={k}>
                    {d.items.map((t, m) => (
                      <li key={m}>
                        <Inline tekst={t} adres={adres} />
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </li>
          ))}
        </ol>,
      )
  })
  return <>{out}</>
}

/**
 * Pagina /admin/claude-koppeling: hoe een medewerker van OIG de Claude-koppeling toevoegt en gebruikt.
 * Alleen voor wie is ingelogd (redacteur en beheerder); anders naar het inlogscherm.
 */
export async function ClaudeKoppeling({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, permissions, visibleEntities, locale } = initPageResult
  if (!req.user) redirect('/admin/login/?redirect=%2Fadmin%2Fclaude-koppeling')
  const adres = `${await siteAdres()}/api/mcp`

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user ?? undefined}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        <article className="oig-handleiding">
          <p className="oig-welcome__label">Claude-koppeling</p>
          <h1>De website bijwerken met Claude</h1>
          <p className="oig-handleiding__lead">
            Met de Claude-koppeling werkt u de website bij door het in gewone taal aan Claude te vragen: teamleden,
            vacatures, premietabellen en vragen en antwoorden. Een wijziging via Claude is altijd eerst een concept.
          </p>
          <div className="oig-handleiding__nodig">
            <p>
              <strong>Wat u nodig hebt</strong>
            </p>
            <ul>
              <li>Uw account van dit CMS (hetzelfde e-mailadres en wachtwoord waarmee u hier inlogt).</li>
              <li>Een Claude-abonnement waarmee u eigen koppelingen (&quot;custom connectors&quot;) mag toevoegen.</li>
              <li>
                Het adres van de koppeling: <KopieerAdres adres={adres} />
              </li>
            </ul>
          </div>
          <Handleiding md={HANDLEIDING_DEEL_A} adres={adres} />
        </article>
      </Gutter>
    </DefaultTemplate>
  )
}
