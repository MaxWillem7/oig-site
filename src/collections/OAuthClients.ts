import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

/**
 * Apps die zich via de Claude-koppeling hebben aangemeld (OAuth dynamic client registration).
 * Alleen de server schrijft hier (overrideAccess); een beheerder kan regels inzien en verwijderen.
 */
export const OAuthClients: CollectionConfig = {
  slug: 'oauth-clients',
  labels: { singular: 'Gekoppelde app', plural: 'Claude-koppeling: apps' },
  admin: {
    hideAPIURL: true,
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'createdAt', 'lastUsedAt'],
    group: 'Beheer',
    hidden: ({ user }) => user?.role !== 'beheerder',
    description:
      'Apps (zoals Claude) die toegang hebben gevraagd tot het CMS. Verwijderen trekt alle toegang van die app in.',
  },
  access: { read: isAdmin, create: () => false, update: () => false, delete: isAdmin },
  fields: [
    {
      name: 'clientId',
      label: 'Client-id',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'clientName',
      label: 'Naam van de app (zelf opgegeven)',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'redirectUris',
      label: 'Terugkeeradressen',
      type: 'json',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'lastUsedAt',
      label: 'Laatst gebruikt',
      type: 'date',
      index: true,
      admin: { readOnly: true },
    },
  ],
}
