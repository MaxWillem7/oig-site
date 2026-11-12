import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { Arrow } from '@/components/Icons'
import s from './diensten.module.css'

/** Sectiekop met het handschriftlabel en de H2 links en een korte inleiding rechts. */
export function KopRij({ kicker, title, lead }: { kicker: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className={s.kopRij}>
      <div className={`stack ${s.kop}`}>
        <p className="kicker">{kicker}</p>
        <h2 className="h2">{title}</h2>
      </div>
      {lead && <p className={s.kopLead}>{lead}</p>}
    </div>
  )
}

/** Klein blok "Voor wie" onder de tekst van een sectie. */
export function VoorWie({ children }: { children: ReactNode }) {
  return (
    <div className={s.voorWie}>
      <h3>Voor wie</h3>
      <p>{children}</p>
    </div>
  )
}

export type Stap = { title: string; text: string }

/** Genummerde stappen: naast elkaar op desktop, als lijst op mobiel. */
export function Stappen({ steps, tone = 'wit' }: { steps: Stap[]; tone?: 'wit' | 'blauw' }) {
  return (
    <ol
      className={`${s.stappen} ${tone === 'blauw' ? s.stappenBlauw : ''}`}
      style={{ '--kolommen': steps.length } as CSSProperties}
    >
      {steps.map((step, i) => (
        <li key={step.title} className={s.stap}>
          <span className={s.stapNr} aria-hidden>
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3>
            <span className="sr-only">Stap {i + 1}: </span>
            {step.title}
          </h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  )
}

/** Balk met één zin en een tekstlink, bijvoorbeeld naar /werkwijze/. */
export function Verwijsbalk({
  children,
  href,
  label,
  tone = 'grijs',
}: {
  children: ReactNode
  href: string
  label: string
  tone?: 'grijs' | 'blauw'
}) {
  return (
    <div className={`${s.verwijs} ${tone === 'blauw' ? s.verwijsBlauw : ''}`}>
      <p>{children}</p>
      <Link href={href} className="textlink">
        {label} <Arrow />
      </Link>
    </div>
  )
}
