/**
 * Adres van een bestand uit het CMS, bruikbaar in een link of in next/image.
 * Payload geeft voor lokaal opgeslagen bestanden een volledig adres met de sitenaam en een schuine streep erachter
 * (bijv. http://localhost:3100/api/media/file/cover.png/). next/image weigert dat adres en de link maakt een omweg.
 * Hier wordt het een pad binnen de eigen site. Adressen van externe opslag (Vercel Blob) blijven ongewijzigd.
 */
export function cmsUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const match = url.match(/^(?:https?:\/\/[^/]+)?(\/api\/[^?#]+?)\/?$/)
  return match ? match[1] : url
}
