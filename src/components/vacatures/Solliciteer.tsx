import type { ReactNode } from 'react'
import { SollicitatieForm } from '@/components/forms'
import { telHref, type SiteSettings } from '@/lib/cms'
import s from './vacatures.module.css'

/** Sollicitatieblok: uitleg en contactgegevens links, formulier rechts. Zonder `vacancy` een open sollicitatie. */
export function Solliciteer({
  vacancy,
  contact,
  title,
  text,
}: {
  vacancy?: string
  contact: SiteSettings['contact']
  title: string
  text: ReactNode
}) {
  return (
    <section className="section section--creme">
      <div className={`container ${s.solliciteer}`} id="solliciteren">
        <div className="stack" style={{ gap: 20 }}>
          <p className="kicker">Solliciteer</p>
          <h2 className="h2">{title}</h2>
          <p className="lead">{text}</p>
          <p className={s.bellen}>
            <span>Liever eerst bellen?</span>
            <a href={telHref(contact.phone)} className={s.bellenTel}>
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className={s.bellenMail}>
              {contact.email}
            </a>
          </p>
        </div>
        <div className={s.formKaart}>
          <SollicitatieForm vacancy={vacancy} />
        </div>
      </div>
    </section>
  )
}
