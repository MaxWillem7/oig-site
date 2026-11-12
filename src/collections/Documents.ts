import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

/** Openbare downloads: whitepapers, algemene voorwaarden, premieoverzicht, wijzigingsformulier. */
export const Documents: CollectionConfig = {
  slug: 'documenten',
  labels: { singular: 'Document', plural: 'Documenten' },
  admin: { useAsTitle: 'title', group: 'Inhoud', description: 'Openbare PDF-bestanden.' },
  access: { read: () => true, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [{ name: 'title', label: 'Titel', type: 'text', required: true }],
  upload: { mimeTypes: ['application/pdf'] },
}
