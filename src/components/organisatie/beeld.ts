import { media } from '@/lib/cms'

/**
 * Beeld uit het CMS, met een adres dat next/image accepteert. `media()` geeft voor lokale uploads soms een volledig
 * adres met een schuine streep erachter (http://host/api/media/file/naam.jpg/); next/image wil het lokale pad.
 * Adressen van externe opslag blijven zoals ze zijn.
 */
export const cmsBeeld = (...args: Parameters<typeof media>) => {
  const img = media(...args)
  if (!img) return null
  const at = img.url.indexOf('/api/media/file/')
  return at === -1 ? img : { ...img, url: img.url.slice(at).replace(/\/+$/, '') }
}
