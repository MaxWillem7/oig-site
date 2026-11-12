import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access'

/**
 * Cv's en motivatiebrieven bij sollicitaties. Alleen ingelogde gebruikers kunnen ze openen.
 * Worden automatisch gewist 4 weken nadat de inzending is afgerond (zie /api/cron/opruimen).
 */
export const Applications: CollectionConfig = {
  slug: 'cv-bestanden',
  labels: { singular: 'Sollicitatiebestand', plural: 'Sollicitatiebestanden' },
  admin: {
    hideAPIURL: true,
    useAsTitle: 'filename',
    group: 'Formulieren',
    description: 'Afgeschermd. Wordt 4 weken na afronding gewist.',
  },
  access: { read: isLoggedIn, create: () => false, update: () => false, delete: isLoggedIn },
  fields: [],
  upload: {
    mimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg',
    ],
  },
}
