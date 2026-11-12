import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access'
import { revalidateAfterChange } from '../hooks/revalidate'

/** Juridische teksten die OIG zelf aanlevert en bijhoudt. */
export const Legal: GlobalConfig = {
  slug: 'juridisch',
  label: 'Juridische teksten',
  admin: { group: 'Beheer' },
  access: { read: () => true, update: isLoggedIn },
  hooks: { afterChange: [revalidateAfterChange] },
  fields: [
    {
      name: 'privacy',
      label: 'Privacyverklaring',
      type: 'richText',
      admin: { description: 'De volledige tekst van de privacyverklaring. Zolang dit leeg is, toont de pagina een melding.' },
    },
    { name: 'privacyUpdated', label: 'Privacyverklaring bijgewerkt op', type: 'date', admin: { date: { displayFormat: 'd MMMM yyyy' } } },
  ],
}
