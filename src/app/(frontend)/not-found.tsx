import Link from 'next/link'
import { Arrow } from '@/components/Icons'

export const metadata = { title: 'Pagina niet gevonden' }

export default function NotFound() {
  return (
    <section className="section">
      <div className="container stack" style={{ maxWidth: 820 }}>
        <p className="kicker">Niet gevonden</p>
        <h1 className="h1">Deze pagina bestaat niet (meer)</h1>
        <p className="lead">
          De pagina die u zoekt is verplaatst of verwijderd. Via de homepage of onze diensten vindt u snel de weg terug.
        </p>
        <div className="btn-rij">
          <Link href="/" className="btn btn--primair">
            Naar de homepage <Arrow />
          </Link>
          <Link href="/diensten/" className="btn btn--secundair">
            Bekijk onze diensten
          </Link>
        </div>
      </div>
    </section>
  )
}
