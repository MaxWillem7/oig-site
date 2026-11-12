'use client'

import { useRowLabel } from '@payloadcms/ui'

/**
 * Titel van een rij in een lijst in het CMS: toont de tekst van de rij zelf (bijv. het punt uit een vacature)
 * in plaats van "Punt 01", zodat de lijst ook dichtgeklapt en op een telefoon te lezen is.
 */
export function RowLabel() {
  const { data, rowNumber } = useRowLabel<{ text?: string; label?: string; value?: string }>()
  const text = (data?.text || data?.label || data?.value || '').trim()
  const nr = String((rowNumber ?? 0) + 1).padStart(2, '0')
  return <span className="oig-rowlabel">{text ? text : `Nog leeg (${nr})`}</span>
}
