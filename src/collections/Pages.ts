import type { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '../access'
import { revalidateAfterChange } from '../hooks/revalidate'

/** Titel en omschrijving voor Google, per pagina. De pagina zelf staat in de code. */
export const Pages: CollectionConfig = {
  slug: 'paginas',
  labels: { singular: 'Pagina (SEO)', plural: "Pagina's (SEO)" },
  admin: {
    hideAPIURL: true,
    useAsTitle: 'name',
    defaultColumns: ['name', 'path', 'seoTitle'],
    group: 'Inhoud',
    description: 'De titel en omschrijving die Google en AI-zoekmachines van elke pagina tonen.',
  },
  access: { read: () => true, create: isAdmin, update: isLoggedIn, delete: isAdmin },
  hooks: { afterChange: [revalidateAfterChange] },
  defaultSort: 'path',
  fields: [
    { name: 'name', label: 'Pagina', type: 'text', required: true, admin: { readOnly: true } },
    {
      name: 'path',
      label: 'Adres',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
    { name: 'seoTitle', label: 'Titel (maximaal 60 tekens)', type: 'text', maxLength: 70 },
    {
      name: 'seoDescription',
      label: 'Omschrijving (maximaal 155 tekens)',
      type: 'textarea',
      maxLength: 170,
    },
  ],
}
