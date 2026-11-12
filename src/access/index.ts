import type { Access, FieldAccess, Where } from 'payload'

type Req = { user?: { role?: string | null; id?: number | string } | null }

export const isLoggedIn = ({ req }: { req: Req }) => Boolean(req.user)
export const isAdmin = ({ req }: { req: Req }) => req.user?.role === 'beheerder'
export const isAdminField: FieldAccess = ({ req }) => req.user?.role === 'beheerder'

/** Bezoekers zien alleen wat gepubliceerd is; wie ingelogd is ziet ook concepten. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  const where: Where = { _status: { equals: 'published' } }
  return where
}

/** Beheerder mag alles; een redacteur alleen het eigen account. */
export const adminOrSelf: Access = ({ req }) => {
  if (req.user?.role === 'beheerder') return true
  if (req.user) return { id: { equals: req.user.id } }
  return false
}
