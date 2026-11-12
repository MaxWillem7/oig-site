import type { CollectionConfig } from 'payload'
import { editable } from './shared'

/**
 * Premietabel: vrije kolommen en rijen, zodat elke verzekeraar zijn eigen opbouw kan houden.
 * Wordt als echte HTML-tabel op de zorgpagina getoond.
 */
export const PremiumTables: CollectionConfig = {
  slug: 'premies',
  labels: { singular: 'Premietabel', plural: 'Premietabellen' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'insurer', '_status'],
    group: 'Inhoud',
    description: 'Premies per verzekeraar en jaar. Alleen gepubliceerde tabellen van het actuele jaar staan op de zorgpagina.',
  },
  defaultSort: 'order',
  ...editable,
  fields: [
    { name: 'title', label: 'Titel', type: 'text', required: true, admin: { description: 'Bijv. Zilveren Kruis 2027' } },
    {
      type: 'row',
      fields: [
        { name: 'year', label: 'Jaar', type: 'number', required: true },
        { name: 'insurer', label: 'Verzekeraar', type: 'text', required: true },
      ],
    },
    { name: 'note', label: 'Toelichting onder de tabel', type: 'textarea' },
    {
      name: 'columns',
      label: 'Kolommen',
      labels: { singular: 'Kolom', plural: 'Kolommen' },
      type: 'array',
      admin: { description: 'De koppen boven de bedragen, bijv. "Premie per maand" en "Met korting". De eerste kolom (het pakket) hoeft hier niet bij.' },
      fields: [{ name: 'label', label: 'Kop', type: 'text', required: true }],
    },
    {
      name: 'rows',
      label: 'Rijen',
      labels: { singular: 'Rij', plural: 'Rijen' },
      type: 'array',
      fields: [
        { name: 'label', label: 'Pakket of verzekering', type: 'text', required: true },
        {
          name: 'cells',
          label: 'Waarden',
          labels: { singular: 'Waarde', plural: 'Waarden' },
          type: 'array',
          admin: { description: 'Eén waarde per kolom, in dezelfde volgorde.' },
          fields: [{ name: 'value', label: 'Waarde', type: 'text' }],
        },
      ],
    },
    { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
  ],
}
