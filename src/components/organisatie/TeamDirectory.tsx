'use client'

import { Search } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import s from './organisatie.module.css'

export type DirectoryPerson = {
  id: number | string
  /** Naam en functie, waarop gezocht wordt. */
  text: string
  /** De kaart, op de server opgebouwd. */
  card: ReactNode
}

export type DirectoryGroup = { value: string; label: string; people: DirectoryPerson[] }

const plain = (v: string) =>
  v
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()

/**
 * Teamlijst met zoekveld en filterknoppen per groep. De kaarten komen van de server; zonder JavaScript staat
 * gewoon iedereen er en blijft de zoekbalk verborgen.
 */
export function TeamDirectory({ groups, empty }: { groups: DirectoryGroup[]; empty: ReactNode }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('alle')
  const inputId = useId()

  const q = plain(query)
  const words = q ? q.split(/\s+/) : []
  const shown = groups
    .filter((g) => active === 'alle' || g.value === active)
    .map((g) => ({
      ...g,
      people: g.people.filter((p) => {
        const text = plain(p.text)
        return words.every((w) => text.includes(w))
      }),
    }))
    .filter((g) => g.people.length > 0)

  const total = groups.reduce((n, g) => n + g.people.length, 0)
  const found = shown.reduce((n, g) => n + g.people.length, 0)

  return (
    <div className={s.directory}>
      <div className={s.balk} role="search" aria-label="Zoek een collega">
        <label className={s.zoek} htmlFor={inputId}>
          <span className="sr-only">Zoek op naam of functie</span>
          <Search strokeWidth={1.8} aria-hidden />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek op naam of functie"
            autoComplete="off"
            enterKeyHint="search"
          />
        </label>
        <div className={s.chips} role="group" aria-label="Toon een groep">
          <button type="button" className={s.chip} aria-pressed={active === 'alle'} onClick={() => setActive('alle')}>
            Iedereen ({total})
          </button>
          {groups.map((g) => (
            <button
              key={g.value}
              type="button"
              className={s.chip}
              aria-pressed={active === g.value}
              onClick={() => setActive(g.value)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" role="status">
        {q || active !== 'alle' ? `${found} ${found === 1 ? 'collega' : "collega's"} gevonden` : ''}
      </p>

      {shown.map((g) => (
        <section key={g.value} className={s.groep} id={g.value} aria-labelledby={`groep-${g.value}`}>
          <div className={s.groepKop}>
            <h2 id={`groep-${g.value}`}>{g.label}</h2>
            <span>
              {g.people.length} {g.people.length === 1 ? 'collega' : "collega's"}
            </span>
          </div>
          <ul className={s.leden}>
            {g.people.map((p) => (
              <li key={p.id}>{p.card}</li>
            ))}
          </ul>
        </section>
      ))}

      {found === 0 && <p className={s.leeg}>{empty}</p>}
    </div>
  )
}
