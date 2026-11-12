import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nl } from '@payloadcms/translations/languages/nl'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Applications } from './collections/Applications'
import { Documents } from './collections/Documents'
import { Faqs } from './collections/Faqs'
import { Media } from './collections/Media'
import { OAuthClients } from './collections/OAuthClients'
import { OAuthTokens } from './collections/OAuthTokens'
import { Pages } from './collections/Pages'
import { PremiumTables } from './collections/PremiumTables'
import { Submissions } from './collections/Submissions'
import { Team } from './collections/Team'
import { Users } from './collections/Users'
import { Vacancies } from './collections/Vacancies'
import { Whitepapers } from './collections/Whitepapers'
import { globals } from './globals'
import { SUPABASE_CA } from './lib/storage/supabase-ca'
import { oigBlobStorage } from './lib/storage/vercelBlob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Migraties en de seed (bij de build) gaan over de directe verbinding; de site zelf over de pooler.
const databaseUrl =
  process.env.DATABASE_URL ||
  (process.env.PAYLOAD_DIRECT_DB === '1' ? process.env.POSTGRES_URL_NON_POOLING : undefined) ||
  process.env.POSTGRES_URL ||
  ''

/**
 * Supabase gebruikt een eigen certificaatketen. We geven het basiscertificaat mee en halen de
 * ssl-instelling uit het adres, anders overschrijft de databasedriver onze instelling.
 */
const databasePool = () => {
  if (!/supabase\.(com|co)\b/.test(databaseUrl)) return { connectionString: databaseUrl }
  const url = new URL(databaseUrl)
  url.searchParams.delete('sslmode')
  return { connectionString: url.toString(), ssl: { ca: SUPABASE_CA } }
}

/**
 * Adressen waarvandaan het CMS mag worden gebruikt. Payload weigert een ingelogde actie als het adres in de
 * browser niet in deze lijst staat ("U mag deze actie niet uitvoeren"). Daarom staan hier naast het
 * ingestelde siteadres ook de adressen die Vercel zelf aan het project geeft en het domein van OIG.
 */
const trustedOrigins = [
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`,
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  'https://oig-site-one.vercel.app',
  'https://www.onderwijsinkoopgroep.nl',
  'https://onderwijsinkoopgroep.nl',
]
  .filter((o): o is string => Boolean(o))
  .map((o) => o.replace(/\/$/, ''))

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  csrf: trustedOrigins,
  cors: trustedOrigins,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | OIG CMS',
      description: 'Beheer van de website van de Onderwijs Inkoop Groep',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }],
    },
    // Eén vaste, lichte weergave in de huisstijl (zie src/app/(payload)/custom.scss)
    theme: 'light',
    dateFormat: 'd MMMM yyyy HH:mm',
    components: {
      graphics: { Logo: '/components/admin/Brand#Logo', Icon: '/components/admin/Brand#Icon' },
      beforeDashboard: ['/components/admin/Welcome#Welcome'],
    },
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: { supportedLanguages: { nl }, fallbackLanguage: 'nl' },
  collections: [Team, Vacancies, PremiumTables, Faqs, Whitepapers, Pages, Media, Documents, Submissions, Applications, Users, OAuthClients, OAuthTokens],
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: databasePool(),
    // Alleen de lokale devserver werkt het schema zelf bij. Op Vercel en in de buildstappen (migreren,
    // startinhoud) nooit: daar gaan wijzigingen alleen via migraties.
    push: process.env.NODE_ENV !== 'production' && !process.env.VERCEL && process.env.PAYLOAD_DIRECT_DB !== '1',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [oigBlobStorage({ media: 'openbaar', documenten: 'openbaar', 'cv-bestanden': 'afgeschermd' })],
})
