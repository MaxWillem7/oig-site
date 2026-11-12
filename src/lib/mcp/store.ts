import 'server-only'
import config from '@payload-config'
import { sql } from '@payloadcms/db-postgres/drizzle'
import { createHash, randomBytes, timingSafeEqual } from 'crypto'
import { getPayload, type Payload } from 'payload'
import type { OauthClient, OauthToken, User } from '@/payload-types'
import {
  ACCESS_TTL_S,
  CODE_TTL_S,
  REFRESH_GRACE_S,
  REFRESH_TTL_S,
  REGISTER_LIMIT_PER_HOUR,
  WRITE_LIMIT,
  WRITE_WINDOW_MIN,
} from './config'

/**
 * Opslag van de Claude-koppeling: aangemelde apps, autorisatiecodes en tokens.
 * Van codes en tokens bewaren we alleen de SHA-256-hash; de waarde zelf verlaat de server één keer.
 * Alles hier draait met overrideAccess: niemand kan deze collecties via de API vullen of wijzigen.
 */

export const payloadClient = (): Promise<Payload> => getPayload({ config })

export const sha256 = (value: string) => createHash('sha256').update(value).digest('hex')
const random = (prefix: string, bytes = 32) => `${prefix}${randomBytes(bytes).toString('base64url')}`
const inSeconds = (s: number) => new Date(Date.now() + s * 1000).toISOString()
const idOf = (v: number | { id: number } | null | undefined) => (v && typeof v === 'object' ? v.id : (v ?? null))

type Rows<T> = { rows: T[] }
/** Rechtstreekse SQL voor de paar plekken waar een handeling ondeelbaar moet zijn (code of token maar één keer bruikbaar). */
const run = async <T>(payload: Payload, query: ReturnType<typeof sql>): Promise<T[]> => {
  const db = payload.db as unknown as { drizzle: { execute: (q: unknown) => Promise<Rows<T>> } }
  return (await db.drizzle.execute(query)).rows
}

/* ───────────── apps (clients) ───────────── */

export class RegisterLimit extends Error {}

export async function registerClient(input: { name?: string; redirectUris: string[] }): Promise<OauthClient> {
  const payload = await payloadClient()
  const since = new Date(Date.now() - 3600 * 1000).toISOString()
  const recent = await payload.count({ collection: 'oauth-clients', where: { createdAt: { greater_than: since } }, overrideAccess: true })
  if (recent.totalDocs >= REGISTER_LIMIT_PER_HOUR) throw new RegisterLimit()
  await cleanup(payload)
  return payload.create({
    collection: 'oauth-clients',
    data: { clientId: random('oig_', 18), clientName: input.name, redirectUris: input.redirectUris, lastUsedAt: new Date().toISOString() },
    overrideAccess: true,
  })
}

export async function findClient(clientId: string): Promise<OauthClient | null> {
  if (!clientId || clientId.length > 200) return null
  const payload = await payloadClient()
  const res = await payload.find({ collection: 'oauth-clients', where: { clientId: { equals: clientId } }, limit: 1, depth: 0, overrideAccess: true })
  return res.docs[0] ?? null
}

export const clientRedirectUris = (client: OauthClient): string[] =>
  Array.isArray(client.redirectUris) ? client.redirectUris.filter((u): u is string => typeof u === 'string') : []

/* ───────────── autorisatiecodes ───────────── */

export async function createCode(input: {
  client: OauthClient
  userId: number
  redirectUri: string
  codeChallenge: string
  resource: string
  scope: string
}): Promise<string> {
  const payload = await payloadClient()
  const code = random('oig_ac_')
  await payload.create({
    collection: 'oauth-tokens',
    data: {
      type: 'code',
      tokenHash: sha256(code),
      user: input.userId,
      client: input.client.id,
      family: randomBytes(16).toString('hex'),
      resource: input.resource,
      scope: input.scope,
      expiresAt: inSeconds(CODE_TTL_S),
      codeChallenge: input.codeChallenge,
      redirectUri: input.redirectUri,
    },
    overrideAccess: true,
  })
  return code
}

const byHash = async (payload: Payload, raw: string, type: OauthToken['type']): Promise<OauthToken | null> => {
  if (!raw || raw.length > 200) return null
  const res = await payload.find({
    collection: 'oauth-tokens',
    where: { and: [{ tokenHash: { equals: sha256(raw) } }, { type: { equals: type } }] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return res.docs[0] ?? null
}

/** Markeert een code of verversingstoken als gebruikt. Geeft alleen true voor de eerste die het probeert. */
const claimOnce = async (payload: Payload, id: number): Promise<boolean> => {
  const rows = await run<{ id: number }>(
    payload,
    sql`update "oauth_tokens" set "used_at" = now() where "id" = ${id} and "used_at" is null and "expires_at" > now() returning "id"`,
  )
  return rows.length === 1
}

const revokeFamily = async (payload: Payload, family: string) => {
  await payload.delete({ collection: 'oauth-tokens', where: { family: { equals: family } }, overrideAccess: true })
}

const pkceMatches = (verifier: string, challenge: string): boolean => {
  if (!/^[A-Za-z0-9\-._~]{43,128}$/.test(verifier)) return false
  const expected = Buffer.from(createHash('sha256').update(verifier).digest('base64url'))
  const given = Buffer.from(challenge)
  return expected.length === given.length && timingSafeEqual(expected, given)
}

export type Issued = { accessToken: string; refreshToken: string; expiresIn: number; scope: string }

const issue = async (
  payload: Payload,
  g: { userId: number; clientDocId: number; family: string; resource: string; scope: string },
): Promise<Issued> => {
  const accessToken = random('oig_at_')
  const refreshToken = random('oig_rt_')
  const shared = { user: g.userId, client: g.clientDocId, family: g.family, resource: g.resource, scope: g.scope }
  await payload.create({
    collection: 'oauth-tokens',
    data: { ...shared, type: 'access', tokenHash: sha256(accessToken), expiresAt: inSeconds(ACCESS_TTL_S) },
    overrideAccess: true,
  })
  await payload.create({
    collection: 'oauth-tokens',
    data: { ...shared, type: 'refresh', tokenHash: sha256(refreshToken), expiresAt: inSeconds(REFRESH_TTL_S) },
    overrideAccess: true,
  })
  await payload.update({ collection: 'oauth-clients', id: g.clientDocId, data: { lastUsedAt: new Date().toISOString() }, overrideAccess: true })
  return { accessToken, refreshToken, expiresIn: ACCESS_TTL_S, scope: g.scope }
}

export type GrantError = 'invalid_grant' | 'invalid_target'

/** Ruilt een autorisatiecode om voor tokens. De code werkt één keer, kort, en alleen met de juiste PKCE-verifier. */
export async function exchangeCode(input: {
  code: string
  client: OauthClient
  codeVerifier: string
  redirectUri?: string
  resourceOk: (stored: string) => boolean
}): Promise<Issued | GrantError> {
  const payload = await payloadClient()
  const row = await byHash(payload, input.code, 'code')
  if (!row) return 'invalid_grant'
  if (idOf(row.client) !== input.client.id) return 'invalid_grant'
  if (row.usedAt) {
    // Een code die twee keer wordt aangeboden is mogelijk onderschept: trek alles van deze inlog in.
    await revokeFamily(payload, row.family)
    return 'invalid_grant'
  }
  const userId = idOf(row.user)
  if (!userId || new Date(row.expiresAt).getTime() <= Date.now()) return 'invalid_grant'
  if (input.redirectUri !== undefined && input.redirectUri !== row.redirectUri) return 'invalid_grant'
  if (!row.codeChallenge || !pkceMatches(input.codeVerifier, row.codeChallenge)) return 'invalid_grant'
  if (!row.resource || !input.resourceOk(row.resource)) return 'invalid_target'
  if (!(await claimOnce(payload, row.id))) return 'invalid_grant'
  return issue(payload, { userId, clientDocId: input.client.id, family: row.family, resource: row.resource, scope: row.scope || '' })
}

/** Ververst tokens. Het oude verversingstoken vervalt meteen; hergebruik trekt de hele inlog in. */
export async function rotateRefresh(input: {
  refreshToken: string
  client: OauthClient
  resourceOk: (stored: string) => boolean
}): Promise<Issued | GrantError> {
  const payload = await payloadClient()
  const row = await byHash(payload, input.refreshToken, 'refresh')
  if (!row || idOf(row.client) !== input.client.id) return 'invalid_grant'
  const userId = idOf(row.user)
  if (!userId || new Date(row.expiresAt).getTime() <= Date.now()) return 'invalid_grant'
  if (!row.resource || !input.resourceOk(row.resource)) return 'invalid_target'
  const claimed = !row.usedAt && (await claimOnce(payload, row.id))
  if (!claimed) {
    const usedAt = row.usedAt ? new Date(row.usedAt).getTime() : Date.now()
    if (Date.now() - usedAt > REFRESH_GRACE_S * 1000) await revokeFamily(payload, row.family)
    return 'invalid_grant'
  }
  // De vorige toegangstokens van deze inlog vervallen ook.
  await payload.delete({
    collection: 'oauth-tokens',
    where: { and: [{ family: { equals: row.family } }, { type: { equals: 'access' } }] },
    overrideAccess: true,
  })
  return issue(payload, { userId, clientDocId: input.client.id, family: row.family, resource: row.resource, scope: row.scope || '' })
}

/** Trekt een token in (RFC 7009), met alles wat bij dezelfde inlog hoort. Onbekende tokens worden stil genegeerd. */
export async function revokeToken(raw: string, client: OauthClient): Promise<void> {
  const payload = await payloadClient()
  const row = (await byHash(payload, raw, 'refresh')) ?? (await byHash(payload, raw, 'access'))
  if (row && idOf(row.client) === client.id) await revokeFamily(payload, row.family)
}

/* ───────────── toegang controleren ───────────── */

export type Access = { tokenId: number; user: User & { collection: 'users' }; clientId: string; scope: string; expiresAt: number; resource: string }

export async function verifyAccessToken(raw: string): Promise<Access | null> {
  if (!raw.startsWith('oig_at_') || raw.length > 200) return null
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'oauth-tokens',
    where: { and: [{ tokenHash: { equals: sha256(raw) } }, { type: { equals: 'access' } }, { expiresAt: { greater_than: new Date().toISOString() } }] },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })
  const row = res.docs[0]
  if (!row || !row.resource) return null
  // Gebruiker of app verwijderd (of de regel is door een beheerder gewist): geen toegang meer.
  if (!row.user || typeof row.user !== 'object' || !row.client || typeof row.client !== 'object') return null
  return {
    tokenId: row.id,
    user: { ...row.user, collection: 'users' },
    clientId: row.client.clientId,
    scope: row.scope || '',
    expiresAt: Math.floor(new Date(row.expiresAt).getTime() / 1000),
    resource: row.resource,
  }
}

/** Telt een schrijfactie voor dit token. Geeft false als de limiet voor dit tijdvenster bereikt is. */
export async function countWrite(tokenId: number): Promise<boolean> {
  const payload = await payloadClient()
  const rows = await run<{ write_count: string | number }>(
    payload,
    sql`update "oauth_tokens" set
          "write_count" = case when "write_window_start" is null or "write_window_start" < now() - make_interval(mins => ${WRITE_WINDOW_MIN}) then 1 else coalesce("write_count", 0) + 1 end,
          "write_window_start" = case when "write_window_start" is null or "write_window_start" < now() - make_interval(mins => ${WRITE_WINDOW_MIN}) then now() else "write_window_start" end
        where "id" = ${tokenId} returning "write_count"`,
  )
  return rows.length === 1 && Number(rows[0].write_count) <= WRITE_LIMIT
}

/** Ruimt verlopen codes en tokens op, en apps die twee maanden niet gebruikt zijn. Faalt stil. */
export async function cleanup(payload: Payload): Promise<void> {
  try {
    const now = new Date().toISOString()
    await payload.delete({ collection: 'oauth-tokens', where: { expiresAt: { less_than: now } }, overrideAccess: true })
    const stale = new Date(Date.now() - 60 * 24 * 3600 * 1000).toISOString()
    await payload.delete({ collection: 'oauth-clients', where: { lastUsedAt: { less_than: stale } }, overrideAccess: true })
  } catch (e) {
    console.error('Opruimen van de Claude-koppeling mislukt', e instanceof Error ? e.message : 'onbekende fout')
  }
}
