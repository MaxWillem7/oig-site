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
                {
                  name: 'homeTile',
                  label: 'Zorgverzekering op de homepagina',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description:
                      'In de overstapperiode staat bovenaan de homepagina de tegel Zorgverzekering, in plaats van Subsidiedesk.',
                  },
                },
                {
                  type: 'row',
                  admin: { condition: (_, sibling) => Boolean(sibling?.homeTile) },
                  fields: [
                    {
                      name: 'homeTileFrom',
                      label: 'Tonen vanaf',
                      type: 'date',
                      defaultValue: '2026-11-15T12:00:00.000Z',
                      admin: {
                        width: '50%',
                        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM' },
                        description: 'Alleen dag en maand tellen, dus het geldt elk jaar.',
                      },
                    },
                    {
                      name: 'homeTileUntil',
                      label: 'Tonen tot en met',
                      type: 'date',
                      defaultValue: '2027-01-15T12:00:00.000Z',
                      admin: {
                        width: '50%',
                        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM' },
                        description: 'Mag na de jaarwisseling vallen, bijvoorbeeld 15 januari.',
                      },
                    },
                  ],
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
