import { Cookie, FileText, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '@/components/Blocks'
import { Arrow } from '@/components/Icons'
import { pageMetadata } from '@/lib/cms'
import s from '@/components/juridisch/juridisch.module.css'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/juridisch/')

const KAARTEN = [
  {
    href: '/juridisch/privacy-beleid/',
    title: 'Privacyverklaring',
    text: 'Hoe wij omgaan met uw persoonsgegevens.',
    icon: ShieldCheck,
    tone: 'icon-tile--groen',
  },
  {
    href: '/juridisch/cookiebeleid/',
    title: 'Cookiebeleid',
    text: 'Welke cookies deze website gebruikt en hoe u uw keuze aanpast.',
    icon: Cookie,
    tone: '',
  },
  {
    href: '/juridisch/algemene-voorwaarden/',
    title: 'Algemene voorwaarden',
    text: 'De algemene voorwaarden van de Onderwijs Inkoop Groep.',
    icon: FileText,
    tone: 'icon-tile--blauw',
  },
]

export default function JuridischPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Juridisch', path: '/juridisch/' }]}
        kicker="Juridisch"
        title={
          <>
            Juridische <span className="wordblock">documenten</span>
          </>
        }
        lead="De privacyverklaring, het cookiebeleid en de algemene voorwaarden van de Onderwijs Inkoop Groep."
      />
      <section className="section section--grijs">
        <ul className="container grid-3">
          {KAARTEN.map(({ href, title, text, icon: Icon, tone }) => (
            <li key={href}>
              <Link href={href} className={`card card--klikbaar ${s.kaart}`}>
                <span className={`icon-tile ${tone}`} aria-hidden>
                  <Icon />
                </span>
                <h2 className={s.kaartTitel}>{title}</h2>
                <p>{text}</p>
                <span className="textlink">
                  Bekijken <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
