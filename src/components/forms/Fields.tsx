'use client'

import { useId, type ReactNode } from 'react'
import { useFieldError } from './Form'
import s from './forms.module.css'

type Base = { name: string; label: string; required?: boolean; hint?: ReactNode; className?: string }

function Shell({ id, label, required, hint, error, children, className }: Base & { id: string; error?: string; children: ReactNode }) {
  return (
    <div className={`${s.field} ${className ?? ''}`}>
      <label htmlFor={id} className={s.label}>
        {label}
        {required && <span className={s.req} aria-hidden> *</span>}
      </label>
      {children}
      {hint && !error && <p className={s.hint} id={`${id}-hint`}>{hint}</p>}
      {error && <p className={s.fieldError} id={`${id}-err`}>{error}</p>}
    </div>
  )
}

export function TextField({
  type = 'text',
  autoComplete,
  placeholder,
  ...p
}: Base & { type?: 'text' | 'email' | 'tel' | 'date' | 'number'; autoComplete?: string; placeholder?: string }) {
  const id = useId()
  const error = useFieldError(p.name)
  return (
    <Shell {...p} id={id} error={error}>
      <input
        id={id}
        name={p.name}
        type={type}
        required={p.required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : p.hint ? `${id}-hint` : undefined}
        className={s.input}
      />
    </Shell>
  )
}

export function TextArea({ rows = 5, placeholder, ...p }: Base & { rows?: number; placeholder?: string }) {
  const id = useId()
  const error = useFieldError(p.name)
  return (
    <Shell {...p} id={id} error={error}>
      <textarea
        id={id}
        name={p.name}
        rows={rows}
        required={p.required}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${s.input} ${s.textarea}`}
      />
    </Shell>
  )
}

/** Bestandsveld (cv en motivatiebrief). */
export function FileField({ accept, multiple, ...p }: Base & { accept: string; multiple?: boolean }) {
  const id = useId()
  const error = useFieldError(p.name)
  return (
    <Shell {...p} id={id} error={error}>
      <input
        id={id}
        name={p.name}
        type="file"
        accept={accept}
        multiple={multiple}
        required={p.required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : p.hint ? `${id}-hint` : undefined}
        className={`${s.input} ${s.file}`}
      />
    </Shell>
  )
}

export function Checkbox({ name, label, className }: { name: string; label: ReactNode; className?: string }) {
  const error = useFieldError(name)
  return (
    <div className={`${s.field} ${className ?? ''}`}>
      <label className={s.checkbox}>
        <input type="checkbox" name={name} aria-invalid={Boolean(error)} />
        <span className={s.box} aria-hidden />
        <span>{label}</span>
      </label>
      {error && <p className={s.fieldError}>{error}</p>}
    </div>
  )
}

/** Twee velden naast elkaar op desktop, onder elkaar op mobiel. */
export function FieldRow({ children }: { children: ReactNode }) {
  return <div className={s.row}>{children}</div>
}
