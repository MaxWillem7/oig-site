import type { CollectionConfig } from 'payload'
import { adminOrSelf, isAdmin, isAdminField } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Gebruiker', plural: 'Gebruikers' },
  admin: {
    hideAPIURL: true,
    useAsTitle: 'email',
    group: 'Beheer',
    defaultColumns: ['naam', 'email', 'role'],
    // Redacteuren zien de gebruikerslijst niet; hun eigen account staat rechtsboven
    hidden: ({ user }) => user?.role !== 'beheerder',
    description:
      'Redacteuren wijzigen en publiceren inhoud. Beheerders beheren ook gebruikers en instellingen.',
  },
  auth: true,
  hooks: {
    afterChange: [
      // Nieuw wachtwoord of andere rol: de Claude-koppelingen van deze gebruiker vervallen, opnieuw inloggen is nodig
      async ({ doc, previousDoc, operation, req }) => {
        const passwordChanged = Boolean(
          req.data && typeof req.data === 'object' && 'password' in req.data && req.data.password,
        )
        if (operation === 'update' && (passwordChanged || doc.role !== previousDoc?.role)) {
          await req.payload.delete({
            collection: 'oauth-tokens',
            where: { user: { equals: doc.id } },
            overrideAccess: true,
            req,
          })
        }
        return doc
      },
    ],
    beforeDelete: [
      // Een verwijderde gebruiker laat geen tokens achter
      async ({ id, req }) => {
        await req.payload.delete({
          collection: 'oauth-tokens',
          where: { user: { equals: id } },
          overrideAccess: true,
          req,
        })
      },
    ],
  },
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
