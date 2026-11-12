import type { CollectionConfig } from 'payload'
import { FORMS, FORM_TYPES } from '../lib/forms/definitions'
import { isLoggedIn as loggedIn } from '../access'

export const Submissions: CollectionConfig = {
  slug: 'inzendingen',
  labels: { singular: 'Inzending', plural: 'Inzendingen' },
  admin: {
    hideAPIURL: true,
    useAsTitle: 'title',
    defaultColumns: ['title', 'formType', 'status', 'createdAt'],
    group: 'Formulieren',
    description: 'Alles wat via de formulieren op de site binnenkomt.',
  },
  // Aanmaken gebeurt alleen via de server (overrideAccess); nooit via de open API.
  access: { read: loggedIn, create: () => false, update: loggedIn, delete: loggedIn },
  defaultSort: '-createdAt',
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        // Datum van afronden bijhouden, voor de bewaartermijn
        if (data.status === 'afgerond' && originalDoc?.status !== 'afgerond')
          data.afgerondOp = new Date().toISOString()
        if (data.status && data.status !== 'afgerond') data.afgerondOp = null
        return data
      },
    ],
  },
  fields: [
    { name: 'title', label: 'Van', type: 'text', admin: { readOnly: true } },
    {
      name: 'formType',
      label: 'Formulier',
      type: 'select',
      required: true,
      options: FORM_TYPES.map((value) => ({ value, label: FORMS[value].label })),
      admin: { readOnly: true },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'nieuw',
      options: [
        { label: 'Nieuw', value: 'nieuw' },
        { label: 'In behandeling', value: 'bezig' },
        { label: 'Afgerond', value: 'afgerond' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'afgerondOp',
      label: 'Afgerond op',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description:
          'Sollicitaties: 4 weken na deze datum worden de bestanden en persoonsgegevens gewist.',
      },
    },
    {
      name: 'bestanden',
      label: 'Cv en motivatiebrief',
      type: 'upload',
      relationTo: 'cv-bestanden',
      hasMany: true,
      admin: { readOnly: true },
    },
    { name: 'email', label: 'E-mail of telefoon', type: 'text', admin: { readOnly: true } },
    { name: 'samenvatting', label: 'Inhoud', type: 'textarea', admin: { readOnly: true } },
    { name: 'data', label: 'Alle velden', type: 'json', admin: { readOnly: true } },
    { name: 'pagina', label: 'Verstuurd vanaf', type: 'text', admin: { readOnly: true } },
    {
      name: 'mailStatus',
      label: 'Mailmelding',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
    { name: 'notitie', label: 'Interne notitie', type: 'textarea' },
    { name: 'ipHash', type: 'text', index: true, admin: { hidden: true } },
  ],
}
