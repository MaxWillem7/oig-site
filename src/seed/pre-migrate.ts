/**
 * Draait vóór de migraties bij de build. Verwijdert de markering "dev" uit de migratietabel als die er
 * staat. Die markering ontstaat als Payload het schema ooit zelf heeft bijgewerkt (push) en laat
 * `payload migrate` dan wachten op een vraag die bij een build niemand kan beantwoorden.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })
try {
  const res = await payload.delete({ collection: 'payload-migrations', where: { batch: { equals: -1 } } })
  if (res.docs.length > 0) payload.logger.info('Markering "dev" uit de migratietabel gehaald')
} catch {
  // Nieuwe database: de migratietabel bestaat nog niet, er valt niets op te ruimen
}
process.exit(0)
