import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

/**
 * Autorisatiecodes, toegangstokens en verversingstokens van de Claude-koppeling.
 * Van elk token staat alleen de SHA-256-hash in de database. Alleen de server schrijft hier
 * (overrideAccess); een beheerder kan regels verwijderen om toegang in te trekken.
 */
export const OAuthTokens: CollectionConfig = {
  slug: 'oauth-tokens',
  labels: { singular: 'Toegang', plural: 'Claude-koppeling: toegang' },
  admin: {
    hideAPIURL: true,
    useAsTitle: 'type',
    defaultColumns: ['user', 'client', 'type', 'expiresAt', 'createdAt'],
    group: 'Beheer',
    hidden: ({ user }) => user?.role !== 'beheerder',
    description:
      'Wie via Claude toegang heeft tot het CMS. Toegang intrekken: filter op de gebruiker, selecteer alle regels en verwijder ze.',
  },
  access: { read: isAdmin, create: () => false, update: () => false, delete: isAdmin },
  fields: [
    {
      name: 'type',
      label: 'Soort',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Autorisatiecode', value: 'code' },
        { label: 'Toegangstoken', value: 'access' },
        { label: 'Verversingstoken', value: 'refresh' },
      ],
      admin: { readOnly: true },
    },
    {
      name: 'tokenHash',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      access: { read: () => false },
      admin: { hidden: true },
    },
    {
      name: 'user',
      label: 'Gebruiker',
      type: 'relationship',
      relationTo: 'users',
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'client',
      label: 'App',
      type: 'relationship',
      relationTo: 'oauth-clients',
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'family',
      label: 'Inlogsessie',
      type: 'text',
      required: true,
      index: true,
      admin: { readOnly: true },
    },
    { name: 'resource', type: 'text', admin: { hidden: true } },
    { name: 'scope', type: 'text', admin: { hidden: true } },
    {
      name: 'expiresAt',
      label: 'Verloopt op',
      type: 'date',
      required: true,
      index: true,
      admin: { readOnly: true },
    },
    { name: 'usedAt', label: 'Gebruikt op', type: 'date', admin: { readOnly: true } },
    { name: 'codeChallenge', type: 'text', access: { read: () => false }, admin: { hidden: true } },
    { name: 'redirectUri', type: 'text', admin: { hidden: true } },
    { name: 'writeCount', type: 'number', defaultValue: 0, admin: { hidden: true } },
    { name: 'writeWindowStart', type: 'date', admin: { hidden: true } },
  ],
}
