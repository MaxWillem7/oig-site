import { getPayloadClient } from '@/lib/cms'

export const dynamic = 'force-dynamic'

const WEEKS = 4

/**
 * Dagelijkse opruimtaak (Vercel Cron): wist sollicitaties, met cv en motivatiebrief,
 * 4 weken nadat ze op "Afgerond" zijn gezet. Zo staat het ook in de privacyverklaring.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Niet toegestaan', { status: 401 })
  }
  const payload = await getPayloadClient()
  const before = new Date(Date.now() - WEEKS * 7 * 24 * 3600 * 1000).toISOString()
  const due = await payload.find({
    collection: 'inzendingen',
    where: {
      and: [
        { formType: { equals: 'sollicitatie' } },
        { status: { equals: 'afgerond' } },
        { afgerondOp: { less_than: before } },
      ],
    },
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })
  let files = 0
  for (const doc of due.docs) {
    for (const id of (doc.bestanden ?? []) as (number | { id: number })[]) {
      await payload.delete({ collection: 'cv-bestanden', id: typeof id === 'object' ? id.id : id, overrideAccess: true })
      files++
    }
    await payload.delete({ collection: 'inzendingen', id: doc.id, overrideAccess: true })
  }
  return Response.json({ gewist: due.docs.length, bestanden: files })
}
