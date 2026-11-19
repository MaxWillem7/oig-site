'use client'

import React, { useState } from 'react'

/** Een adres met een kopieerknop (voor de Claude-koppeling en de uitnodigingslink). */
export function KopieerAdres({ adres, label = 'Kopieer' }: { adres: string; label?: string }) {
  const [klaar, setKlaar] = useState(false)
  const kopieer = async () => {
    try {
      await navigator.clipboard.writeText(adres)
      setKlaar(true)
      setTimeout(() => setKlaar(false), 2500)
    } catch {
      // Geen toegang tot het klembord: de gebruiker kan het adres zelf selecteren
    }
  }
  return (
    <span className="oig-kopieer">
      <code className="oig-kopieer__adres">{adres}</code>
      <button type="button" className="oig-kopieer__knop" onClick={kopieer}>
        {klaar ? 'Gekopieerd' : label}
      </button>
      <span className="sr-only" aria-live="polite">
        {klaar ? 'Adres gekopieerd' : ''}
      </span>
    </span>
  )
}
