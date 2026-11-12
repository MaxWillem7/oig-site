import { savings } from './content'
import s from './inkoop.module.css'

/** Besparing per segment als echte tabel. De balk is decoratief; het percentage staat als tekst in de cel. */
export function SavingsTable() {
  const max = Math.max(...savings.map((r) => r.pct))
  return (
    <div className="tabel-wrap">
      <table className={`tabel ${s.besparing}`}>
        <caption>Gemiddelde besparing per inkoopsegment</caption>
        <thead>
          <tr>
            <th scope="col">Segment</th>
            <th scope="col">Besparing</th>
          </tr>
        </thead>
        <tbody>
          {savings.map((r) => (
            <tr key={r.name}>
              <th scope="row">{r.name}</th>
              <td>
                <div className={s.waarde}>
                  <span className={s.pct}>{r.pct}%</span>
                  <span className={s.balk} aria-hidden="true">
                    <span style={{ width: `${(r.pct / (max * 1.1)) * 100}%` }} />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
