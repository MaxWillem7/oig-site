import type { GlobalConfig } from 'payload'
import { isAdmin, isLoggedIn } from '../access'
import { revalidateAfterChange } from '../hooks/revalidate'

const DD = 'max@digitaldudes.nl'

const recipient = (name: string, label: string) => ({
  name,
  label,
  type: 'text' as const,
  defaultValue: DD,
  admin: { description: "Eén of meer adressen, gescheiden door komma's." },
})

export const Settings: GlobalConfig = {
  slug: 'instellingen',
  label: 'Instellingen',
  admin: { group: 'Beheer' },
  access: { read: () => true, update: isLoggedIn },
  versions: { drafts: false },
  hooks: { afterChange: [revalidateAfterChange] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Kerncijfers',
          description: 'Deze cijfers staan op meerdere pagina\'s. Wijzig ze hier, dan kloppen ze overal.',
          fields: [
            {
              name: 'figures',
              type: 'group',
              label: false,
              fields: [
                { name: 'boards', label: 'Schoolbesturen', type: 'text', defaultValue: '400+' },
                { name: 'schools', label: 'Scholen', type: 'text', defaultValue: '2.700+' },
                { name: 'saving', label: 'Gemiddelde besparing', type: 'text', defaultValue: '37%' },
                { name: 'years', label: 'Jaar ervaring', type: 'text', defaultValue: '16 jaar' },
                { name: 'insuranceDiscount', label: 'Korting zorgverzekering', type: 'text', defaultValue: 'tot 16%' },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contact',
              type: 'group',
              label: false,
              fields: [
                { name: 'phone', label: 'Telefoon', type: 'text', defaultValue: '036 820 10 00' },
                { name: 'email', label: 'E-mail', type: 'email', defaultValue: 'info@onderwijsinkoopgroep.nl' },
                { name: 'street', label: 'Straat en nummer', type: 'text', defaultValue: 'Gildenveld 3' },
                { name: 'postalCode', label: 'Postcode', type: 'text', defaultValue: '3892 DC' },
                { name: 'city', label: 'Plaats', type: 'text', defaultValue: 'Zeewolde' },
                { name: 'kvk', label: 'KvK-nummer', type: 'text', admin: { description: 'Leeg = wordt niet getoond.' } },
                { name: 'linkedin', label: 'LinkedIn', type: 'text' },
                {
                  name: 'portalUrl',
                  label: 'Link naar Mijn OIG',
                  type: 'text',
                  defaultValue: 'https://mijnoig.onderwijsinkoopgroep.nl/',
                },
              ],
            },
          ],
        },
        {
          label: 'Zorgverzekering',
          fields: [
            {
              name: 'insurance',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'year',
                  label: 'Actueel premiejaar',
                  type: 'number',
                  defaultValue: 2027,
                  admin: { description: 'Alleen premietabellen van dit jaar staan op de zorgpagina.' },
                },
                {
                  name: 'notice',
                  label: 'Melding zolang er geen premies staan',
                  type: 'textarea',
                  defaultValue:
                    'De premies voor 2027 volgen zodra de verzekeraars ze bekend hebben gemaakt. Zodra ze er zijn, staan ze op deze pagina.',
                },
              ],
            },
          ],
        },
        {
          label: 'Formulieren',
          description: 'Wie krijgt een mail bij een nieuwe inzending? Tot de livegang alleen Digital Dudes.',
          fields: [
            {
              name: 'recipients',
              type: 'group',
              label: false,
              access: { update: ({ req }) => isAdmin({ req }) },
              fields: [
                recipient('contact', 'Contact'),
                recipient('inkoopscan', 'Inkoopscan'),
                recipient('whitepaper', 'Whitepapers'),
                recipient('sollicitatie', 'Sollicitaties'),
              ],
            },
          ],
        },
      ],
    },
  ],
}
