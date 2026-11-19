import crypto from 'crypto'
import type { Payload, PayloadRequest } from 'payload'
import { sendNotification } from './forms/mail'

/** Hoe lang een uitnodigingslink werkt (een gewone wachtwoordherstel-link blijft 1 uur). */
export const UITNODIGING_GELDIG_MS = 7 * 24 * 60 * 60 * 1000

/** Een lang, willekeurig wachtwoord dat niemand kent: de gebruiker kiest zelf een wachtwoord via de link. */
export const onbekendWachtwoord = () => crypto.randomBytes(32).toString('base64url')

export type Uitnodiging = { link: string; verloopt: string; mail: string; verstuurd: boolean }

/** Het adres van de site: NEXT_PUBLIC_SITE_URL, anders het adres van het verzoek. */
export function siteAdres(req?: Partial<PayloadRequest>) {
  const vast = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (vast) return vast
  const host = req?.headers?.get('x-forwarded-host') ?? req?.headers?.get('host')
  if (!host) return 'http://localhost:3100'
  const proto = req?.headers?.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

const mailTekst = (naam: string | null | undefined, link: string, verloopt: Date) => {
  const datum = new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Amsterdam',
  }).format(verloopt)
  return [
    naam ? `Beste ${naam},` : 'Beste collega,',
    '',
    'Welkom bij het CMS van de Onderwijs Inkoop Groep. Hiermee werkt u de website bij: teamleden, vacatures, premietabellen, vragen en antwoorden en whitepapers.',
    '',
    'Kies uw wachtwoord via deze link:',
    link,
    '',
    `De link werkt tot en met ${datum} en kan één keer worden gebruikt. Na het kiezen van uw wachtwoord bent u direct ingelogd. Later logt u in op ${link.split('/admin/')[0]}/admin/ met uw e-mailadres en uw eigen wachtwoord.`,
    '',
    'Werkt de link niet meer? Vraag dan een beheerder om de uitnodiging opnieuw te sturen.',
    '',
    'Met vriendelijke groet,',
    'De Onderwijs Inkoop Groep',
  ].join('\n')
}

/**
 * Maakt een uitnodigingslink (het wachtwoordherstel van Payload, 7 dagen geldig) en mailt die naar de gebruiker.
 * Zonder RESEND_API_KEY gaat er geen mail uit; de beheerder ziet de link dan in het CMS en kan hem zelf doorsturen.
 * De status wordt bij de gebruiker bewaard (alleen zichtbaar voor beheerders).
 */
export async function stuurUitnodiging(
  payload: Payload,
  user: { id: number | string; email: string; naam?: string | null },
  req?: Partial<PayloadRequest>,
): Promise<Uitnodiging> {
  const token = await payload.forgotPassword({
    collection: 'users',
    data: { email: user.email },
    disableEmail: true,
    expiration: UITNODIGING_GELDIG_MS,
    req,
  })
  if (!token) throw new Error('Geen uitnodigingslink kunnen maken')
  const verloopt = new Date(Date.now() + UITNODIGING_GELDIG_MS)
  const link = `${siteAdres(req)}/admin/reset/${token}/`
  const mail = await sendNotification({
    to: [user.email],
    subject: 'Welkom bij het CMS van de Onderwijs Inkoop Groep: kies uw wachtwoord',
    text: mailTekst(user.naam, link, verloopt),
  })
  const verstuurd = mail.startsWith('verstuurd')
  await payload.update({
    collection: 'users',
    id: user.id,
    data: { uitnodigingStatus: verstuurd ? `Mail verstuurd naar ${user.email}` : `Mail niet verstuurd (${mail})`, uitnodigingVerloopt: verloopt.toISOString() },
    overrideAccess: true,
    context: { uitnodiging: 'status' },
    req,
  })
  return { link, verloopt: verloopt.toISOString(), mail, verstuurd }
}
