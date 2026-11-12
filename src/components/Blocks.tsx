import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { getFaqs, getSettings, telHref, type Img } from '@/lib/cms'
import { breadcrumb, faqPage } from '@/lib/jsonld'
import { ContactForm } from './forms'
import { Arrow, Chevron } from './Icons'
import { JsonLd } from './JsonLd'
import s from './Blocks.module.css'

/** Kruimelpad boven de hero, met gestructureerde gegevens. Geef de stappen na Home. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Kruimelpad" className={s.crumbs}>
      <JsonLd data={breadcrumb(items)} />
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((i, idx) => (
          <li key={i.path} aria-current={idx === items.length - 1 ? 'page' : undefined}>
            {idx === items.length - 1 ? i.name : <Link href={i.path}>{i.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Hero van een vervolgpagina. `title` mag één woord in <span className="wordblock"> bevatten.
 * `aside` is de rechterkolom (foto, kaart, cijfers); zonder aside loopt de tekst over de volle breedte.
 */
export function PageHero({
  crumbs,
  kicker,
  title,
  lead,
  children,
  aside,
  tone = 'wit',
}: {
  crumbs?: { name: string; path: string }[]
  kicker?: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
  aside?: ReactNode
  tone?: 'wit' | 'creme'
}) {
  return (
    <section className={`section ${tone === 'creme' ? 'section--creme' : ''} ${s.hero}`}>
      <div className="container">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={aside ? `split split--breed-links split--midden` : undefined}>
          <div className={`stack ${s.heroText}`}>
            {kicker && <p className="kicker">{kicker}</p>}
            <h1 className="h1">{title}</h1>
            {lead && <p className="lead maat">{lead}</p>}
            {children && <div className="btn-rij">{children}</div>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  )
}

/** Kop van een sectie: handschriftlabel, H2 en optioneel een inleiding. */
export function SectionHeading({
  kicker,
  title,
  lead,
  center,
  as: Tag = 'h2',
}: {
  kicker?: string
  title: ReactNode
  lead?: ReactNode
  center?: boolean
  as?: 'h2' | 'h3'
}) {
  return (
    <div className={`stack ${s.heading} ${center ? s.center : ''}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <Tag className="h2">{title}</Tag>
      {lead && <p className="lead maat">{lead}</p>}
    </div>
  )
}

/** Foto uit het CMS of uit /public/beeld. `ratio` als "4 / 5". Zonder beeld: niets. */
export function Photo({
  img,
  ratio = '4 / 3',
  sizes = '(min-width: 1000px) 560px, 100vw',
  priority,
  className,
}: {
  img: Img | { url: string; alt: string; width?: number; height?: number; focus?: string } | null
  ratio?: string
  sizes?: string
  priority?: boolean
  className?: string
}) {
  if (!img) return null
  return (
    <div className={`foto ${className ?? ''}`} style={{ aspectRatio: ratio }}>
      <Image
        src={img.url}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: 'cover', objectPosition: img.focus || '50% 30%' }}
      />
    </div>
  )
}

/** Initialen als er geen portretfoto is. */
export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .filter((w) => /^[A-ZÀ-Ý]/.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
  return (
    <div className={`${s.avatar} ${className ?? ''}`} aria-hidden>
      {initials}
    </div>
  )
}

/** Oranje band onderaan elke pagina. */
export async function CtaBand({
  title = 'Benieuwd wat uw bestuur kan besparen?',
  text = 'Een inkoopscan laat het zien. Plan een vrijblijvende kennismaking met een van onze adviseurs.',
  label = 'Plan een kennismaking',
  href = '/contact/',
}: {
  title?: string
  text?: string
  label?: string
  href?: string
}) {
  const { contact } = await getSettings()
  return (
    <section className={s.cta}>
      <div className={`container ${s.ctaInner}`}>
        <div className={`stack ${s.ctaText}`}>
          <h2 className={s.ctaTitle}>{title}</h2>
          <p>{text}</p>
        </div>
        <div className={s.ctaActions}>
          <Link href={href} className="btn btn--donker">
            {label} <Arrow />
          </Link>
          <a href={telHref(contact.phone)} className={s.ctaTel}>
            of bel {contact.phone}
          </a>
        </div>
      </div>
    </section>
  )
}

/**
 * Vragen en antwoorden van één pagina uit het CMS, met FAQPage-gegevens.
 * Staat er niets gepubliceerd, dan verschijnt de sectie niet.
 */
export async function FaqSection({
  page,
  title = 'Veelgestelde vragen',
  lead,
  tone = 'wit',
}: {
  page: string
  title?: string
  lead?: ReactNode
  tone?: 'wit' | 'creme' | 'grijs'
}) {
  const faqs = await getFaqs(page)
  if (faqs.length === 0) return null
  return (
    <section className={`section ${tone === 'wit' ? '' : `section--${tone}`}`} id="vragen">
      <JsonLd data={faqPage(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <div className={`container ${s.faq}`}>
        <SectionHeading kicker="Vragen" title={title} lead={lead} />
        <div className={s.faqList}>
          {faqs.map((f) => (
            <details key={f.id} className={s.faqItem}>
              <summary>
                <h3>{f.question}</h3>
                <Chevron />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Contactblok onderaan een dienstpagina: formulier links, contactgegevens rechts. */
export async function ContactSection({
  title = 'Neem contact met ons op',
  lead = 'Stel uw vraag of plan een kennismaking. Wij reageren zo snel mogelijk.',
  tone = 'creme',
}: {
  title?: string
  lead?: string
  tone?: 'wit' | 'creme'
}) {
  const { contact } = await getSettings()
  return (
    <section className={`section ${tone === 'creme' ? 'section--creme' : ''}`} id="contact">
      <div className="container split">
        <div className="stack">
          <SectionHeading kicker="Contact" title={title} lead={lead} />
          <ul className={s.contactList}>
            <li>
              <span className="label">Bel</span>
              <a href={telHref(contact.phone)}>{contact.phone}</a>
            </li>
            <li>
              <span className="label">Mail</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <span className="label">Bezoek</span>
              <span>
                {contact.street}, {contact.postalCode} {contact.city}
              </span>
            </li>
          </ul>
        </div>
        <div className={s.formCard}>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
