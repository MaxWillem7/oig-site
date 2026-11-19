'use client'

import { Button, useAuth, useDocumentInfo, useForm } from '@payloadcms/ui'
import React, { useEffect, useState } from 'react'
import { KopieerAdres } from './KopieerAdres'

type Stand = { link: string | null; verloopt: string | null; status: string | null; mailFout?: boolean }

const datum = (v?: string | null) =>
  v
    ? new Intl.DateTimeFormat('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Amsterdam',
      }).format(new Date(v))
    : ''

/** Willekeurige tekst voor de verborgen wachtwoordvelden; de server zet zelf een ander, onbekend wachtwoord. */
const willekeurig = () => {
  const bytes = new Uint8Array(24)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * In de collectie Gebruikers.
 * - Nieuwe gebruiker: de wachtwoordvelden verdwijnen; na opslaan krijgt de gebruiker een uitnodiging.
 * - Bestaande gebruiker (alleen voor beheerders): de uitnodigingslink met kopieerknop, of de mail is verstuurd,
 *   en de knop "Uitnodiging opnieuw sturen".
 */
export function Uitnodiging() {
  const { id } = useDocumentInfo()
  const { user } = useAuth()
  const { dispatchFields, getField } = useForm()
  const beheerder = (user as { role?: string } | null)?.role === 'beheerder'
  const [stand, setStand] = useState<Stand | null>(null)
  const [bezig, setBezig] = useState(false)
  const [fout, setFout] = useState<string | null>(null)

  // Nieuw: wachtwoordvelden vullen (het formulier eist ze) en verbergen
  // Het formulier zet bij het laden zijn beginstand neer; daarom een paar seconden blijven controleren
  useEffect(() => {
    if (id) return
    const vulling = willekeurig()
    const zet = () => {
      for (const path of ['password', 'confirm-password']) {
        if (getField(path)?.value !== vulling) dispatchFields({ type: 'UPDATE', path, value: vulling, valid: true })
      }
    }
    zet()
    const timer = setInterval(zet, 300)
    const stop = setTimeout(() => clearInterval(timer), 15000)
    return () => {
      clearInterval(timer)
      clearTimeout(stop)
    }
  }, [id, dispatchFields, getField])

  // Huidige link en status ophalen (alleen beheerders, bestaande gebruiker)
  useEffect(() => {
    if (!id || !beheerder) return
    let actief = true
    fetch(`/api/users/${id}/uitnodiging`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (actief && data) setStand(data)
      })
      .catch(() => {})
    return () => {
      actief = false
    }
  }, [id, beheerder])

  const opnieuw = async () => {
    setBezig(true)
    setFout(null)
    try {
      const res = await fetch(`/api/users/${id}/uitnodiging`, { method: 'POST', credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Versturen lukte niet')
      setStand({
        link: data.link,
        verloopt: data.verloopt,
        status: data.verstuurd ? 'Mail opnieuw verstuurd' : `Mail niet verstuurd (${data.mail})`,
        mailFout: !data.verstuurd,
      })
    } catch (e) {
      setFout((e as Error).message)
    } finally {
      setBezig(false)
    }
  }

  if (!id) {
    return (
      <div className="oig-uitnodiging">
        <style>{'.auth-fields__changing-password{display:none!important}'}</style>
        <p className="oig-uitnodiging__kop">Uitnodiging</p>
        <p>
          Vul naam, e-mailadres en rol in. Na opslaan krijgt deze persoon een e-mail met een link om zelf een
          wachtwoord te kiezen. De link werkt 7 dagen. U ziet de link daarna ook hier, zodat u hem zelf kunt doorsturen.
        </p>
      </div>
    )
  }

  if (!beheerder) return null
  const mailNiet = stand?.mailFout || Boolean(stand?.status?.startsWith('Mail niet'))

  return (
    <div className="oig-uitnodiging" data-testid="uitnodiging">
      <p className="oig-uitnodiging__kop">Uitnodiging</p>
      {stand?.link && stand.status && (
        <p className={mailNiet ? 'oig-uitnodiging__waarschuwing' : undefined} role="status">
          {mailNiet
            ? 'De uitnodiging kon niet per e-mail worden verstuurd. Kopieer de link hieronder en stuur hem zelf door.'
            : stand.status}
        </p>
      )}
      {stand?.link ? (
        <>
          <p>Link om zelf een wachtwoord te kiezen (werkt tot {datum(stand.verloopt)}):</p>
          <KopieerAdres adres={stand.link} label="Kopieer link" />
        </>
      ) : (
        <p>Er is geen geldige uitnodigingslink (verlopen, al gebruikt of nooit verstuurd).</p>
      )}
      <div className="oig-uitnodiging__knoppen">
        <Button buttonStyle="secondary" size="medium" onClick={opnieuw} disabled={bezig} type="button">
          {bezig ? 'Bezig...' : 'Uitnodiging opnieuw sturen'}
        </Button>
      </div>
      {fout && (
        <p className="oig-uitnodiging__waarschuwing" role="alert">
          {fout}
        </p>
      )}
    </div>
  )
}
