import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/cms'

export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.SITE_INDEXABLE === 'true'
  return indexable
    ? { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/bedankt/'] }], sitemap: `${SITE_URL}/sitemap.xml` }
    : { rules: [{ userAgent: '*', disallow: '/' }] }
}
