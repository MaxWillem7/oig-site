import { createHmac, timingSafeEqual } from 'crypto'

const secret = () => process.env.PAYLOAD_SECRET || ''
const sign = (path: string, exp: number) => createHmac('sha256', secret()).update(`${path}:${exp}`).digest('hex')

/** Link waarmee iemand 24 uur lang concepten op de site kan bekijken, zonder in te loggen. */
export function previewUrl(path: string, hours = 24): string {
  const exp = Date.now() + hours * 3600 * 1000
  const base = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')
  return `${base}/api/preview?path=${encodeURIComponent(path)}&exp=${exp}&sig=${sign(path, exp)}`
}

export function verifyPreview(path: string, exp: number, sig: string): boolean {
  if (!secret() || !path.startsWith('/') || path.startsWith('//') || !Number.isFinite(exp) || exp < Date.now()) return false
  const expected = Buffer.from(sign(path, exp))
  const given = Buffer.from(sig)
  return expected.length === given.length && timingSafeEqual(expected, given)
}
