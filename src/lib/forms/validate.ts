import { FORMS, type FormType } from './definitions'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Parsed = { values: Record<string, string | boolean>; errors: Record<string, string> }

/** Leest en valideert een FormData tegen de definitie. Onbekende velden worden genegeerd. */
export function parseForm(type: FormType, fd: FormData): Parsed {
  const spec = FORMS[type]
  const values: Parsed['values'] = {}
  const errors: Record<string, string> = {}
  for (const [name, f] of Object.entries(spec.fields)) {
    const max = f.max ?? 300
    if (f.kind === 'checkbox') {
      values[name] = fd.get(name) === 'on' || fd.get(name) === 'true'
      if (f.required && !values[name]) errors[name] = 'Vink dit aan om te kunnen versturen.'
      continue
    }
    const raw = String(fd.get(name) ?? '').trim()
    if (raw.length > max) errors[name] = `Maximaal ${max} tekens.`
    if (f.required && !raw) errors[name] = 'Dit veld is verplicht.'
    else if (raw && f.kind === 'email' && !EMAIL.test(raw)) errors[name] = 'Vul een geldig e-mailadres in.'
    else if (raw && f.options && !f.options.includes(raw)) errors[name] = 'Kies een van de opties.'
    values[name] = raw.slice(0, max)
  }
  return { values, errors }
}

export function summarize(type: FormType, values: Parsed['values']): string {
  const spec = FORMS[type]
  return Object.entries(spec.fields)
    .map(([name, f]) => {
      const v = values[name]
      const text = typeof v === 'boolean' ? (v ? 'ja' : 'nee') : v
      return text ? `${f.label}: ${text}` : null
    })
    .filter(Boolean)
    .join('\n')
}
