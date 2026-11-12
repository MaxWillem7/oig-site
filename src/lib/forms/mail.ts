/** Stuurt een melding via Resend. Zonder RESEND_API_KEY: niets versturen, status teruggeven. */
export async function sendNotification(opts: {
  to: string[]
  subject: string
  text: string
  replyTo?: string
}): Promise<string> {
  const key = process.env.RESEND_API_KEY
  if (!key) return 'niet verstuurd: RESEND_API_KEY ontbreekt'
  if (opts.to.length === 0) return 'niet verstuurd: geen ontvanger ingesteld'
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'OIG website <onboarding@resend.dev>',
        to: opts.to,
        subject: opts.subject,
        text: opts.text,
        reply_to: opts.replyTo,
      }),
    })
    if (!res.ok) return `fout ${res.status}: ${(await res.text()).slice(0, 200)}`
    return `verstuurd naar ${opts.to.join(', ')}`
  } catch (e) {
    return `fout: ${(e as Error).message}`
  }
}

export const splitRecipients = (value?: string | null): string[] =>
  (value ?? '')
    .split(/[,;\s]+/)
    .map((s) => s.trim())
    .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
