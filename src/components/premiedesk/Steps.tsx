import type { ReactNode } from 'react'
import s from './Steps.module.css'

export type Step = { title: string; text: string }

/** Blauwe sectie met genummerde stappen. Gebruikt op Premiedesk en Inkoopbeleid. */
export function Steps({
  kicker,
  title,
  lead,
  steps,
  children,
}: {
  kicker: string
  title: string
  lead?: string
  steps: Step[]
  children?: ReactNode
}) {
  return (
    <section className="section section--blauw">
      <div className={`container ${s.wrap}`}>
        <div className={s.kop}>
          <div className={`stack ${s.kopTekst}`}>
            <p className="kicker">{kicker}</p>
            <h2 className="h2">{title}</h2>
          </div>
          {lead && <p className={s.lead}>{lead}</p>}
        </div>
        <ol className={s.stappen}>
          {steps.map((step, i) => (
            <li key={step.title} className={s.stap}>
              <span className={s.nr} aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={s.stapTitel}>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        {children}
      </div>
    </section>
  )
}
