import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Beeld', plural: 'Beeldbank' },
  admin: { hideAPIURL: true, group: 'Inhoud' },
  access: { read: () => true, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    {
      name: 'alt',
      label: 'Beschrijving (alt-tekst)',
      type: 'text',
      required: true,
      admin: {
        description: 'Wat staat er op de foto? Voor blinden en slechtzienden en voor Google.',
      },
    },
    {
      name: 'focus',
      label: 'Uitsnede',
      type: 'text',
      admin: { description: 'Optioneel, bijv. "50% 30%": welk deel van de foto belangrijk is.' },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'portret', width: 480, height: 600, position: 'top' },
      { name: 'kaart', width: 900 },
      { name: 'breed', width: 1920 },
    ],
    adminThumbnail: 'kaart',
  },
}
