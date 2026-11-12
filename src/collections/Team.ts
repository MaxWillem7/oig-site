import type { CollectionConfig } from 'payload'
import { editable } from './shared'

export const TEAM_GROUPS = [
  { label: 'Inkoopadvies', value: 'inkoopadvies' },
  { label: 'Aanbestedingsdesk', value: 'aanbestedingsdesk' },
  { label: 'Contracten en dossiers', value: 'contracten' },
  { label: 'Directie en sales', value: 'directie' },
  { label: 'Kantoor', value: 'kantoor' },
]

export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: 'Teamlid', plural: 'Team' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'group', 'order', '_status'],
    group: 'Inhoud',
    description: 'De mensen op de teampagina. Een nieuw teamlid staat op de site zodra u op Publiceren klikt.',
    // Het hele team op één pagina
    pagination: { defaultLimit: 50 },
  },
  defaultSort: 'order',
  ...editable,
  fields: [
    { name: 'name', label: 'Naam', type: 'text', required: true },
    { name: 'role', label: 'Functie', type: 'text', required: true },
    {
      name: 'group',
      label: 'Groep op de teampagina',
      type: 'select',
      required: true,
      defaultValue: 'inkoopadvies',
      options: TEAM_GROUPS,
    },
    {
      name: 'photo',
      label: 'Portretfoto',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Staand portret. Zonder foto tonen we de initialen.' },
    },
    {
      name: 'phone',
      label: 'Telefoon',
      type: 'text',
      admin: { description: 'Leeg laten = het algemene nummer wordt getoond.' },
    },
    { name: 'email', label: 'E-mail', type: 'email' },
    {
      name: 'onHome',
      label: 'Tonen op de homepage',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
  ],
}
