/**
 * Valt `today` in een periode die elk jaar terugkomt? Alleen maand en dag tellen (in Nederlandse tijd), dus een
 * periode van 15 november tot en met 15 januari loopt over de jaarwisseling heen. Begin en eind tellen allebei mee.
 */
const monthDay = (d: Date | string): number => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Amsterdam',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(new Date(d))
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  return get('month') * 100 + get('day')
}

export const inSeason = (today: Date, from: Date | string, until: Date | string): boolean => {
  const t = monthDay(today)
  const a = monthDay(from)
  const b = monthDay(until)
  if (Number.isNaN(t) || Number.isNaN(a) || Number.isNaN(b)) return false
  return a <= b ? t >= a && t <= b : t >= a || t <= b
}
