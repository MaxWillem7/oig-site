import Link from 'next/link'
import { Arrow } from '@/components/Icons'
import s from '@/components/juridisch/systeem.module.css'

export const metadata = { title: 'Pagina niet gevonden' }

const VEEL_GEZOCHT = [
  { name: 'Ons team', href: '/ons-team/' },
  { name: 'Diensten', href: '/diensten/' },
  { name: 'Vacatures', href: '/vacatures/' },
  { name: 'Whitepapers', href: '/whitepapers/' },
  { name: 'Contact', href: '/contact/' },
]

export default function NotFound() {
  return (
    <section className={`section ${s.fout}`}>
      <div className={`container ${s.foutInner}`}>
        <div className={`stack ${s.foutTekst}`}>
          <p className="kicker">Niet gevonden</p>
          <h1 className="h1">
            Oeps, deze pagina is <span className="wordblock">verdwaald</span>
          </h1>
          <p className="lead">
            De pagina die u zoekt bestaat niet meer of is verplaatst. Ga verder via een van de links of begin opnieuw
            op de startpagina.
          </p>
          <Link href="/" className="textlink">
            Naar de startpagina <Arrow />
          </Link>
        </div>
        <nav className={s.veel} aria-labelledby="veel-gezocht">
          <h2 className="label" id="veel-gezocht">
            Veel gezocht
          </h2>
          <ul>
            {VEEL_GEZOCHT.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  {l.name} <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
