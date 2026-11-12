import type { CollectionConfig } from 'payload'
import { isLoggedIn, publishedOrLoggedIn } from '../access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

/** Inhoud die OIG zelf beheert: concept en gepubliceerd, zichtbaar voor bezoekers na publiceren. */
export const editable: Pick<CollectionConfig, 'access' | 'hooks' | 'versions'> = {
  access: { read: publishedOrLoggedIn, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  versions: { drafts: true, maxPerDoc: 20 },
}

/** Pagina's waar een vraag of premietabel bij kan horen. */
export const PAGE_OPTIONS = [
  { label: 'Aanbesteden', value: 'aanbesteden' },
  { label: 'Subsidiedesk', value: 'subsidiedesk' },
  { label: 'Ondersteuning bij inkoop', value: 'ondersteuning-inkoop' },
  { label: 'Inkoopsegmenten', value: 'inkoopsegmenten' },
  { label: 'Premiedesk', value: 'premiedesk' },
  { label: 'Verzekeringen (zorg)', value: 'verzekeringen' },
  { label: 'Inkoopbeleid', value: 'inkoopbeleid' },
  { label: 'Fietsplan onderwijs', value: 'fietsplan-onderwijs' },
  { label: 'Werkwijze', value: 'werkwijze' },
  { label: 'Vacatures', value: 'vacatures' },
]
