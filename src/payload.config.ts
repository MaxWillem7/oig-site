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
import { oigBlobStorage } from './lib/storage/vercelBlob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Migraties en de seed (bij de build) gaan over de directe verbinding; de site zelf over de pooler.
const databaseUrl =
  process.env.DATABASE_URL ||
  (process.env.PAYLOAD_DIRECT_DB === '1' ? process.env.POSTGRES_URL_NON_POOLING : undefined) ||
  process.env.POSTGRES_URL ||
  ''

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' | OIG CMS' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: { supportedLanguages: { nl }, fallbackLanguage: 'nl' },
  collections: [Team, Vacancies, PremiumTables, Faqs, Whitepapers, Pages, Media, Documents, Submissions, Applications, Users, OAuthClients, OAuthTokens],
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: databaseUrl },
    // Lokaal wordt het schema bij de start bijgewerkt; op Vercel lopen migraties bij de build.
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [oigBlobStorage({ media: 'openbaar', documenten: 'openbaar', 'cv-bestanden': 'afgeschermd' })],
})
