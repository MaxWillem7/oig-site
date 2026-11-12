import type { CollectionConfig } from 'payload'
import { adminOrSelf, isAdmin, isAdminField } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Gebruiker', plural: 'Gebruikers' },
  admin: {
    useAsTitle: 'email',
    group: 'Beheer',
    defaultColumns: ['naam', 'email', 'role'],
    description: 'Redacteuren wijzigen en publiceren inhoud. Beheerders beheren ook gebruikers en instellingen.',
  },
  auth: true,
  access: { read: adminOrSelf, create: isAdmin, update: adminOrSelf, delete: isAdmin },
  fields: [
    { name: 'naam', label: 'Naam', type: 'text' },
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      required: true,
      defaultValue: 'redacteur',
      options: [
        { label: 'Redacteur', value: 'redacteur' },
        { label: 'Beheerder', value: 'beheerder' },
      ],
      saveToJWT: true,
      access: { create: isAdminField, update: isAdminField },
    },
  ],
}
