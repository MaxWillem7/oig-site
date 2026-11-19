import type { CollectionConfig } from 'payload'
import { adminOrSelf, isAdmin, isAdminField } from '../access'
import { onbekendWachtwoord, siteAdres, stuurUitnodiging } from '../lib/uitnodiging'

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
      'Redacteuren wijzigen en publiceren inhoud. Beheerders beheren ook gebruikers en instellingen. Een nieuwe gebruiker krijgt een uitnodiging per e-mail en kiest zelf een wachtwoord.',
  },
  auth: true,
  endpoints: [
    {
      // Uitnodiging (opnieuw) sturen: nieuwe link van 7 dagen, mail als dat kan. Alleen voor beheerders.
      path: '/:id/uitnodiging',
      method: 'post',
      handler: async (req) => {
        if (req.user?.role !== 'beheerder') return Response.json({ error: 'Alleen voor beheerders' }, { status: 403 })
        const id = req.routeParams?.id as string
        const user = await req.payload.findByID({ collection: 'users', id, depth: 0, overrideAccess: true, req }).catch(() => null)
        if (!user) return Response.json({ error: 'Gebruiker niet gevonden' }, { status: 404 })
        const result = await stuurUitnodiging(req.payload, user, req)
        return Response.json(result)
      },
    },
    {
      // De link die nu geldt (als die er is), voor de kopieerknop. Alleen voor beheerders.
      path: '/:id/uitnodiging',
      method: 'get',
      handler: async (req) => {
        if (req.user?.role !== 'beheerder') return Response.json({ error: 'Alleen voor beheerders' }, { status: 403 })
        const id = req.routeParams?.id as string
        const user = (await req.payload
          .findByID({ collection: 'users', id, depth: 0, overrideAccess: true, showHiddenFields: true, req })
          .catch(() => null)) as { resetPasswordToken?: string | null; resetPasswordExpiration?: string | null; uitnodigingStatus?: string | null } | null
        if (!user) return Response.json({ error: 'Gebruiker niet gevonden' }, { status: 404 })
        const geldig =
          user.resetPasswordToken && user.resetPasswordExpiration && new Date(user.resetPasswordExpiration) > new Date()
        return Response.json({
          link: geldig ? `${siteAdres(req)}/admin/reset/${user.resetPasswordToken}/` : null,
          verloopt: geldig ? user.resetPasswordExpiration : null,
          status: user.uitnodigingStatus ?? null,
        })
      },
    },
  ],
  hooks: {
    afterError: [
      // Verlopen of al gebruikte uitnodigings- of herstellink: een Nederlandse melding in plaats van de Engelse
      ({ error }) => {
        if (error?.message === 'Token is either invalid or has expired.') {
          return {
            status: 403,
            response: {
              errors: [
                {
                  message:
                    'Deze link is verlopen of al gebruikt. Vraag een beheerder om een nieuwe uitnodiging, of kies "Wachtwoord vergeten?" op het inlogscherm.',
                },
              ],
            },
          }
        }
      },
    ],
    beforeValidate: [
      // Een beheerder bepaalt geen wachtwoord: bij aanmaken in het CMS of via de API zet de site een onbekend
      // wachtwoord en kiest de gebruiker zelf een wachtwoord via de uitnodiging. (De eerste beheerder uit de
      // startinhoud en scripts zonder ingelogde gebruiker houden hun eigen wachtwoord.)
      ({ data, operation, req }) => {
        if (operation === 'create' && req.user && data) return { ...data, password: onbekendWachtwoord() }
        return data
      },
    ],
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
      // Nieuwe gebruiker aangemaakt door een beheerder: uitnodiging met link om zelf een wachtwoord te kiezen
      async ({ doc, operation, req }) => {
        if (operation === 'create' && req.user) await stuurUitnodiging(req.payload, doc, req)
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
    {
      // Uitleg bij aanmaken, en voor beheerders de uitnodigingslink met kopieerknop en "Uitnodiging opnieuw sturen"
      name: 'uitnodiging',
      type: 'ui',
      admin: { components: { Field: '/components/admin/Uitnodiging#Uitnodiging' } },
    },
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
    {
      // Gezet door de uitnodiging; niet in het formulier, alleen voor beheerders te lezen
      name: 'uitnodigingStatus',
      type: 'text',
      admin: { hidden: true },
      access: { read: isAdminField, create: () => false, update: () => false },
    },
    {
      name: 'uitnodigingVerloopt',
      type: 'date',
      admin: { hidden: true },
      access: { read: isAdminField, create: () => false, update: () => false },
    },
  ],
}
