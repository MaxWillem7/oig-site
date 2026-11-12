'use client'

import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'
import s from './Consent.module.css'

type Choice = { analytics: boolean; marketing: boolean }
const KEY = 'oig-cookies-v1'
const EVENT = 'oig-cookies-open'
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  // Tag Manager verwacht het arguments-object, geen array
  const push = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  } as (...a: unknown[]) => void
  push(...args)
}

const consentState = (c: Choice) => ({
  analytics_storage: c.analytics ? 'granted' : 'denied',
  ad_storage: c.marketing ? 'granted' : 'denied',
  ad_user_data: c.marketing ? 'granted' : 'denied',
  ad_personalization: c.marketing ? 'granted' : 'denied',
})

let gtmLoaded = false
/** Tag Manager wordt pas geladen als de bezoeker statistieken toestaat (marketing alleen is niet genoeg). */
function loadGtm() {
  if (gtmLoaded || !GTM_ID) return
  gtmLoaded = true
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)
}

function apply(c: Choice) {
  gtag('consent', 'update', consentState(c))
  // Alleen bij toestemming voor statistieken: in de container zitten GA4 en Clarity
  if (c.analytics) loadGtm()
}

const CHANGED = 'oig-cookies-changed'
const NONE: Choice = { analytics: false, marketing: false }
/** Vangnet als de browser geen opslag toestaat: de keuze geldt dan alleen voor dit bezoek. */
let memory: string | null = null

const snapshot = () => {
  if (memory !== null) return memory
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

const subscribe = (onChange: () => void) => {
  window.addEventListener(CHANGED, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGED, onChange)
    window.removeEventListener('storage', onChange)
  }
}

const parse = (raw: string): Choice | null => {
  try {
    return raw ? (JSON.parse(raw) as Choice) : null
  } catch {
    return null
  }
}

/** Opent de cookievoorkeuren opnieuw (link in de footer). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(EVENT))}>
      Cookievoorkeuren
    </button>
  )
}

export function Consent() {
  // 'server' tijdens het opbouwen op de server en de eerste weergave: dan tonen we niets
  const raw = useSyncExternalStore(subscribe, snapshot, () => 'server')
  const saved = raw === 'server' ? null : parse(raw)
  const [reopened, setReopened] = useState(false)
  const [details, setDetails] = useState(false)
  const [choice, setChoice] = useState<Choice>(NONE)
  const open = raw !== 'server' && (saved === null || reopened)

  useEffect(() => {
    gtag('consent', 'default', {
      ...consentState(NONE),
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500,
    })
    const reopen = () => {
      setChoice(parse(snapshot()) ?? NONE)
      setDetails(true)
      setReopened(true)
    }
    window.addEventListener(EVENT, reopen)
    return () => window.removeEventListener(EVENT, reopen)
  }, [])

  // Een bewaarde keuze toepassen (ook als die in een ander tabblad is gewijzigd)
  useEffect(() => {
    const current = parse(raw === 'server' ? '' : raw)
    if (current) apply(current)
  }, [raw])

  const save = (c: Choice) => {
    const value = JSON.stringify(c)
    try {
      localStorage.setItem(KEY, value)
    } catch {
      memory = value
    }
    setReopened(false)
    setDetails(false)
    window.dispatchEvent(new Event(CHANGED))
  }

  if (!open) return null

  return (
    <div className={s.banner} role="dialog" aria-modal="false" aria-labelledby="cookie-titel">
      <div className={s.inner}>
        <h2 id="cookie-titel" className={s.title}>
          Cookies
        </h2>
        <p className={s.text}>
          We gebruiken cookies om te begrijpen hoe u onze site gebruikt en om hem te verbeteren. U kiest zelf welke
          cookies u toestaat. Meer leest u in ons <Link href="/juridisch/cookiebeleid/">cookiebeleid</Link>.
        </p>
        {details && (
          <fieldset className={s.options}>
            <legend className="sr-only">Cookievoorkeuren</legend>
            <label className={s.option}>
              <input type="checkbox" checked disabled />
              <span>
                <strong>Noodzakelijk</strong>
                Nodig om de site te laten werken. Altijd aan.
              </span>
            </label>
            <label className={s.option}>
              <input
                type="checkbox"
                checked={choice.analytics}
                onChange={(e) => setChoice({ ...choice, analytics: e.target.checked })}
              />
              <span>
                <strong>Statistieken</strong>
                Laat ons zien welke pagina&apos;s bezocht worden en waar bezoekers vastlopen.
              </span>
            </label>
            <label className={s.option}>
              <input
                type="checkbox"
                checked={choice.marketing}
                onChange={(e) => setChoice({ ...choice, marketing: e.target.checked })}
              />
              <span>
                <strong>Marketing</strong>
                Voor het meten van advertenties.
              </span>
            </label>
          </fieldset>
        )}
        <div className={s.actions}>
          <button type="button" className="btn btn--primair btn--klein" onClick={() => save({ analytics: true, marketing: true })}>
            Alles accepteren
          </button>
          <button type="button" className="btn btn--secundair btn--klein" onClick={() => save({ analytics: false, marketing: false })}>
            Alleen noodzakelijk
          </button>
          {details ? (
            <button type="button" className={s.plain} onClick={() => save(choice)}>
              Keuze opslaan
            </button>
          ) : (
            <button type="button" className={s.plain} onClick={() => setDetails(true)}>
              Voorkeuren
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
