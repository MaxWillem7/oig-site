import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { editable } from './shared'

export const Whitepapers: CollectionConfig = {
  slug: 'whitepapers',
  labels: { singular: 'Whitepaper', plural: 'Whitepapers' },
  admin: {
    hideAPIURL: true,
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', '_status'],
    group: 'Inhoud',
  },
  defaultSort: 'order',
  ...editable,
  fields: [
    { name: 'title', label: 'Titel', type: 'text', required: true },
    slugField('title'),
    { name: 'summary', label: 'Korte omschrijving', type: 'textarea' },
    { name: 'file', label: 'PDF', type: 'upload', relationTo: 'documenten' },
    { name: 'image', label: 'Beeld', type: 'upload', relationTo: 'media' },
    {
      name: 'path',
      label: 'Pagina op de site',
      type: 'text',
      admin: { description: 'Bijv. /lp/meubilair/ of /fietsplan-onderwijs/' },
    },
    {
      name: 'gated',
      label: 'Alleen na het invullen van het formulier',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uit = de inhoud staat open op de pagina en de PDF is direct te downloaden.',
      },
    },
    {
      name: 'order',
      label: 'Volgorde',
      type: 'number',
      defaultValue: 10,
      admin: { position: 'sidebar' },
    },
  ],
}
