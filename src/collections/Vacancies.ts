import type { CollectionConfig, Field } from 'payload'
import { slugField } from '../fields/slug'
import { editable } from './shared'

const bullets = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    { name: 'intro', label: 'Inleiding (optioneel)', type: 'textarea' },
    {
      name: 'items',
      label: 'Punten',
      labels: { singular: 'Punt', plural: 'Punten' },
      type: 'array',
      admin: { components: { RowLabel: '/components/admin/RowLabel#RowLabel' } },
      fields: [{ name: 'text', label: 'Tekst', type: 'text', required: true }],
    },
  ],
  admin: description ? { description } : undefined,
})

export const Vacancies: CollectionConfig = {
  slug: 'vacatures',
  labels: { singular: 'Vacature', plural: 'Vacatures' },
  admin: {
    hideAPIURL: true,
    useAsTitle: 'title',
    defaultColumns: ['title', 'hours', 'location', '_status', 'updatedAt'],
    group: 'Inhoud',
    description:
      'Een gepubliceerde vacature staat op de site en in Google for Jobs. Niet meer actueel? Zet hem terug naar concept.',
  },
  defaultSort: 'order',
  ...editable,
  fields: [
    { name: 'title', label: 'Functietitel', type: 'text', required: true },
    slugField('title'),
    {
      name: 'teaser',
      label: 'Korte omschrijving (overzicht en Google)',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        { name: 'hours', label: 'Uren', type: 'text', admin: { description: 'Bijv. 32-40 uur' } },
        {
          name: 'education',
          label: 'Opleiding',
          type: 'text',
          admin: { description: 'Bijv. HBO' },
        },
        { name: 'location', label: 'Plaats', type: 'text', defaultValue: 'Zeewolde' },
      ],
    },
    { name: 'intro', label: 'Openingstekst', type: 'textarea' },
    { name: 'about', label: 'Over de Onderwijs Inkoop Groep', type: 'textarea' },
    bullets('seeking', 'De Onderwijs Inkoop Groep zoekt mensen die'),
    bullets('profile', 'Wie ben jij?'),
    bullets('tasks', 'Wat ga je doen?'),
    bullets('offer', 'Wat wij bieden'),
    {
      name: 'salary',
      label: 'Salaris voor Google for Jobs',
      type: 'group',
      admin: { description: 'Optioneel. Bruto per maand bij fulltime.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'min', label: 'Vanaf', type: 'number' },
            { name: 'max', label: 'Tot', type: 'number' },
          ],
        },
      ],
    },
    { name: 'photos', label: "Foto's", type: 'upload', relationTo: 'media', hasMany: true },
    {
      name: 'datePosted',
      label: 'Geplaatst op',
      type: 'date',
      admin: { position: 'sidebar', date: { displayFormat: 'd MMM yyyy' } },
    },
    {
      name: 'validThrough',
      label: 'Sluitingsdatum (optioneel)',
      type: 'date',
      admin: { position: 'sidebar', date: { displayFormat: 'd MMM yyyy' } },
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
