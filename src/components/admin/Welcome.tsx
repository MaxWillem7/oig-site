import type { ServerProps } from 'payload'
import React from 'react'

/** Korte uitleg boven het dashboard van het CMS. */
export function Welcome({ user }: ServerProps) {
  const name = (user as { naam?: string } | null)?.naam
  return (
    <section className="oig-welcome">
      <p className="oig-welcome__label">Onderwijs Inkoop Groep</p>
      <h1>{name ? `Welkom, ${name}` : 'Welkom'}</h1>
      <p>
        Hier werkt u de website bij: teamleden, vacatures, premietabellen, vragen en antwoorden en whitepapers.
      </p>
      <ul>
        <li>
          <strong>Opslaan als concept</strong> bewaart uw wijziging zonder dat bezoekers hem zien.
        </li>
        <li>
          <strong>Publiceren</strong> zet de wijziging op de website. Dat duurt hoogstens een paar seconden.
        </li>
        <li>
          <strong>Niet meer actueel?</strong> Kies bij een vacature of teamlid voor Depubliceren, of verwijder het item.
        </li>
      </ul>
    </section>
  )
}
