import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import { Consent } from '@/components/Consent'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { getSettings, SITE_NAME, SITE_URL } from '@/lib/cms'
import { FEEDBACKLAAG } from '@/lib/feedbacklaag'
import { organization, website } from '@/lib/jsonld'
import '@/styles/globals.css'

import { fontVariables } from './fonts'

const indexable = process.env.SITE_INDEXABLE === 'true'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { template: `%s | ${SITE_NAME}`, default: SITE_NAME },
  description: 'Inkoopcollectief voor schoolbesturen in het primair onderwijs.',
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = { themeColor: '#ffffff' }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  const preview = (await draftMode()).isEnabled

  return (
    <html lang="nl" className={fontVariables}>
      <head>
        {/* Vaste tekst uit onze eigen code, geen invoer van bezoekers */}
        <script dangerouslySetInnerHTML={{ __html: FEEDBACKLAAG }} />
      </head>
      <body>
        <a href="#inhoud" className="skip-link">
          Naar de inhoud
        </a>
        {preview && (
          <p className="preview-balk">
            Voorvertoning: u ziet ook concepten die nog niet gepubliceerd zijn.{' '}
            {/* Geen next/link: dit is een API-route die de voorvertoning uitzet en doorstuurt */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/preview/?stop=1">Voorvertoning sluiten</a>
          </p>
        )}
        <Header portalUrl={settings.contact.portalUrl} />
        <main id="inhoud">{children}</main>
        <Footer contact={settings.contact} />
        <Consent />
        <JsonLd data={[organization(settings.contact), website()]} />
      </body>
    </html>
  )
}
