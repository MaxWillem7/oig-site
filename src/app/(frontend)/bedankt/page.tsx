import { ClipboardCheck, MessageSquare, Users } from 'lucide-react'
import Link from 'next/link'
import { Arrow, Check } from '@/components/Icons'
import { getSettings, pageMetadata, telHref } from '@/lib/cms'
import s from '@/components/juridisch/systeem.module.css'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/bedankt/')

const VERDER = [
  {
    href: '/diensten/',
    title: 'Onze diensten',
    text: 'Wat wij voor uw schoolbestuur kunnen doen.',
    link: 'Bekijk de diensten',
    icon: ClipboardCheck,
    tone: 'icon-tile--groen',
  },
  {
    href: '/referenties/',
    title: 'Ervaringen',
    text: 'Wat schoolbesturen over de samenwerking zeggen.',
    link: 'Lees de referenties',
    icon: MessageSquare,
    tone: 'icon-tile--blauw',
  },
  {
    href: '/ons-team/',
    title: 'Ons team',
    text: 'Maak kennis met onze collega’s.',
    link: 'Bekijk het team',
    icon: Users,
    tone: '',
  },
]

export default async function BedanktPage() {
  const { contact } = await getSettings()
  return (
    <>
      <section className={`section ${s.bedankt}`}>
        <div className={`container ${s.bedanktInner}`}>
          <span className={s.vink} aria-hidden>
            <Check />
          </span>
          <h1 className="h1">
            Bericht <span className="wordblock">ontvangen</span>
          </h1>
          <p className="lead">
            Bedankt. Wij nemen zo snel mogelijk contact met u op. Heeft u haast? Bel ons op{' '}
            <a href={telHref(contact.phone)} className={s.tel}>
              {contact.phone}
            </a>
            .
          </p>
          <div className={`btn-rij ${s.knoppen}`}>
            <Link href="/" className="btn btn--primair">
              Naar de startpagina <Arrow />
            </Link>
            <a href={telHref(contact.phone)} className="btn btn--secundair">
              Bel {contact.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section section--grijs">
        <div className="container">
          <h2 className={s.verderKop}>Alvast verder lezen</h2>
          <ul className="grid-3">
            {VERDER.map(({ href, title, text, link, icon: Icon, tone }) => (
              <li key={href}>
                <Link href={href} className={`card card--klikbaar ${s.kaart}`}>
                  <span className={`icon-tile ${tone}`} aria-hidden>
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="textlink">
                    {link} <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
