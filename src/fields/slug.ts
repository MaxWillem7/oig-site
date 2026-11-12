import type { Field } from 'payload'

export const slugify = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' en ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Slug-veld dat zichzelf vult vanuit `from` als het leeg is. */
export const slugField = (from = 'title'): Field => ({
  name: 'slug',
  label: 'Adres (slug)',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Wordt automatisch gemaakt uit de titel. Alleen aanpassen als het moet.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.trim()) return slugify(value)
        const source = data?.[from]
        return typeof source === 'string' ? slugify(source) : value
      },
    ],
  },
})

/** Markering of een tekst nog concept is (DD) of akkoord is van ReBlessed. */
export const textStatusField: Field = {
  name: 'tekststatus',
  label: 'Tekststatus',
  type: 'select',
  defaultValue: 'concept',
  options: [
    { label: 'Concept (DD)', value: 'concept' },
    { label: 'Akkoord ReBlessed', value: 'akkoord' },
  ],
  admin: {
    position: 'sidebar',
    description: 'Alleen ter administratie: de tekst staat hoe dan ook online.',
  },
}
