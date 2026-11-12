'use client'

import { usePathname } from 'next/navigation'
import { createContext, useActionState, useContext, useEffect, useRef, type ReactNode } from 'react'
import { submitForm } from '@/lib/forms/actions'
import type { FormState, FormType } from '@/lib/forms/definitions'
import { Arrow } from '../Icons'
import s from './forms.module.css'

const initial: FormState = { status: 'idle' }
const ErrorsContext = createContext<Record<string, string>>({})
export const useFieldError = (name: string) => useContext(ErrorsContext)[name]

type Props = {
  type: FormType
  children: ReactNode
  submitLabel: string
  /** Kleine tekst naast de knop */
  note?: ReactNode
  className?: string
  /** Tekst op de downloadknop na verzenden (whitepaper) */
  downloadLabel?: string
}

/**
 * Formulierschil: verborgen velden (type, pagina, starttijd, honeypot), verzendstatus,
 * succes- en foutmelding. De velden zelf komen als children (TextField, TextArea, ...).
 */
export function Form({ type, children, submitLabel, note, className, downloadLabel }: Props) {
  const [state, action, pending] = useActionState(submitForm, initial)
  const pathname = usePathname()
  const startedAt = useRef(0)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])
  useEffect(() => {
    if (state.status !== 'idle') statusRef.current?.focus()
  }, [state])

  if (state.status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className={s.success}>
        <span className={s.check} aria-hidden>
          ✓
        </span>
        <div className={s.successBody}>
          <p>{state.message}</p>
          {state.downloadUrl && (
            <a href={state.downloadUrl} className="btn btn--primair" target="_blank" rel="noopener">
              {downloadLabel ?? 'Download de whitepaper'} <Arrow />
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <ErrorsContext.Provider value={state.fieldErrors ?? {}}>
      <form
        action={(fd: FormData) => {
          // starttijd bij het versturen toevoegen; React zet het formulier na een poging terug
          fd.set('_t', String(startedAt.current))
          return action(fd)
        }}
        className={`${s.form} ${className ?? ''}`}
        noValidate
      >
        <input type="hidden" name="_form" value={type} />
        <input type="hidden" name="_page" value={pathname} />
        <div className={s.hp} aria-hidden>
          <label>
            Laat dit veld leeg
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        {children}
        {state.status === 'error' && (
          <div ref={statusRef} tabIndex={-1} role="alert" className={s.error}>
            {state.message}
          </div>
        )}
        <div className={s.actions}>
          <button type="submit" className={`btn btn--primair ${s.submit}`} disabled={pending}>
            {pending ? 'Bezig met versturen…' : submitLabel}
            {!pending && <Arrow />}
          </button>
          {note && <p className={s.note}>{note}</p>}
        </div>
      </form>
    </ErrorsContext.Provider>
  )
}
