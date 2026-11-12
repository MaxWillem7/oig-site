import s from './inkoopbeleid.module.css'

/** Gemiddelde besparing per segment. Bron: afbeelding op de live pagina /inkoopbeleid/ (mei 2025). */
const SEGMENTEN: [string, number][] = [
  ['Kopieerapparaten', 59],
  ['Sanitair', 46],
  ['BHV', 41],
  ['Afvalverwijdering', 39],
  ['Controle speellokaal en gymzaal', 37],
  ['Controle speeltoestellen plein', 35],
  ['Beveiliging gebouw', 33],
  ['Koffie', 32],
  ['Papier', 25],
  ['Brandbeveiliging', 24],
  ['Energie', 20],
  ['Schoonmaak', 19],
  ['Arbodienst', 16],
  ['Administratiekantoor', 14],
  ['ICT en automatisering', 11],
  ['Onderwijs leerpakket', 9],
]

const MAX = 60

/** Staafgrafiek als gewone lijst: leesbaar voor zoekmachines en schermlezers. */
export function SavingsChart() {
  return (
    <div className={s.grafiek}>
      <div className={s.grafiekKop}>
        <h3 id="besparing-per-segment">Gemiddelde besparing per segment</h3>
        <p>Bron: benchmark OIG</p>
      </div>
      <ul aria-labelledby="besparing-per-segment" className={s.balken}>
        {SEGMENTEN.map(([naam, pct]) => (
          <li key={naam} className={s.rij}>
            <span className={s.naam}>{naam}</span>
            <span className={s.baan} aria-hidden>
              <span className={s.balk} style={{ width: `${(pct / MAX) * 100}%` }} />
            </span>
            <span className={s.pct}>{pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
