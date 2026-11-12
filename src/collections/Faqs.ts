import type { CollectionConfig } from 'payload'
import { editable, PAGE_OPTIONS } from './shared'

export const Faqs: CollectionConfig = {
  slug: 'vragen',
  labels: { singular: 'Vraag en antwoord', plural: 'Vragen en antwoorden' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'page', 'order', '_status'],
    group: 'Inhoud',
    description: 'Vragen per dienst. Ze staan op de pagina en worden aan Google en AI-zoekmachines doorgegeven.',
  },
  defaultSort: 'order',
  ...editable,
  fields: [
    { name: 'question', label: 'Vraag', type: 'text', required: true },
    { name: 'answer', label: 'Antwoord', type: 'textarea', required: true },
    { name: 'page', label: 'Bij welke pagina', type: 'select', required: true, options: PAGE_OPTIONS },
    { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
  ],
}
