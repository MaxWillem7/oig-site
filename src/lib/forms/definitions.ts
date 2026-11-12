/**
 * Eén bron van waarheid voor alle formulieren: welke velden, welke verplicht.
 * Wordt gebruikt door de server action (validatie) en door de pagina's (veldnamen).
 */
export type FormType = 'contact' | 'inkoopscan' | 'whitepaper' | 'sollicitatie'

export type FieldSpec = {
  label: string
  required?: boolean
  kind?: 'text' | 'email' | 'tel' | 'textarea' | 'choice' | 'checkbox'
  options?: string[]
  max?: number
}

export type FormSpec = {
  label: string
  nameField?: string
  emailField?: string
  fields: Record<string, FieldSpec>
  /** Bestandsveld (alleen sollicitatie): naam van het veld in het formulier */
  fileField?: string
  success: string
}

const privacy: FieldSpec = { label: 'Akkoord met de privacyverklaring', kind: 'checkbox', required: true }

export const FILE_RULES = {
  maxFiles: 2,
  /** Samen, niet per bestand: de server van Vercel neemt niet meer dan 4,5 MB per verzoek aan. */
  maxBytes: 4 * 1024 * 1024,
  types: {
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'image/png': 'png',
    'image/jpeg': 'jpg',
  } as Record<string, string>,
  hint: 'Pdf, docx, png of jpg. Hoogstens 2 bestanden, samen maximaal 4 MB.',
}

export const FORMS: Record<FormType, FormSpec> = {
  contact: {
    label: 'Contactbericht',
    nameField: 'naam',
    emailField: 'email',
    success: 'Dank u voor uw bericht. Wij nemen zo snel mogelijk contact met u op.',
    fields: {
      naam: { label: 'Naam', required: true },
      organisatie: { label: 'Organisatie of schoolbestuur' },
      email: { label: 'E-mail', kind: 'email', required: true },
      telefoon: { label: 'Telefoon', kind: 'tel' },
      bericht: { label: 'Bericht', kind: 'textarea', required: true, max: 5000 },
      akkoord: privacy,
    },
  },
  inkoopscan: {
    label: 'Aanvraag inkoopscan',
    nameField: 'naam',
    emailField: 'email',
    success: 'Dank u voor uw aanvraag. Wij nemen contact met u op om de inkoopscan in te plannen.',
    fields: {
      naam: { label: 'Naam', required: true },
      organisatie: { label: 'Organisatie of schoolbestuur' },
      email: { label: 'E-mail', kind: 'email', required: true },
      telefoon: { label: 'Telefoon', kind: 'tel' },
      akkoord: privacy,
    },
  },
  whitepaper: {
    label: 'Aanvraag whitepaper',
    nameField: 'naam',
    emailField: 'email',
    success: 'Dank u. De whitepaper staat hieronder voor u klaar.',
    fields: {
      whitepaper: { label: 'Whitepaper', required: true },
      naam: { label: 'Naam', required: true },
      email: { label: 'E-mail', kind: 'email', required: true },
      telefoon: { label: 'Telefoon', kind: 'tel' },
      akkoord: privacy,
    },
  },
  sollicitatie: {
    label: 'Sollicitatie',
    nameField: 'voornaam',
    emailField: 'email',
    fileField: 'bestanden',
    success: 'Dank je voor je sollicitatie. We nemen zo snel mogelijk contact met je op.',
    fields: {
      vacature: { label: 'Functie', required: true },
      voornaam: { label: 'Voornaam', required: true },
      achternaam: { label: 'Achternaam', required: true },
      email: { label: 'E-mail', kind: 'email', required: true },
      woonplaats: { label: 'Woonplaats', required: true },
      bericht: { label: 'Bericht', kind: 'textarea', required: true, max: 5000 },
      akkoord: privacy,
    },
  },
}

export const FORM_TYPES = Object.keys(FORMS) as FormType[]

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Record<string, string>
  /** Alleen bij whitepaper: link naar de PDF */
  downloadUrl?: string
}
