'use client'

import Link from 'next/link'
import { FILE_RULES } from '@/lib/forms/definitions'
import { Checkbox, FieldRow, FileField, TextArea, TextField } from './Fields'
import { Form } from './Form'

const Privacy = ({ je }: { je?: boolean }) => (
  <Checkbox
    name="akkoord"
    label={
      <>
        {je ? 'Ik ga akkoord met de ' : 'Ik ga akkoord met de '}
        <Link href="/juridisch/privacy-beleid/" target="_blank">
          privacyverklaring
        </Link>
        .
      </>
    }
  />
)

/** Contactformulier: naam, bestuur, e-mail, telefoon, bericht. */
export function ContactForm({ submitLabel = 'Verstuur bericht' }: { submitLabel?: string }) {
  return (
    <Form type="contact" submitLabel={submitLabel}>
      <FieldRow>
        <TextField name="naam" label="Naam" required autoComplete="name" />
        <TextField name="organisatie" label="Organisatie of schoolbestuur" autoComplete="organization" />
      </FieldRow>
      <FieldRow>
        <TextField name="email" label="E-mail" type="email" required autoComplete="email" />
        <TextField name="telefoon" label="Telefoon (optioneel)" type="tel" autoComplete="tel" />
      </FieldRow>
      <TextArea name="bericht" label="Bericht" required />
      <Privacy />
    </Form>
  )
}

/** Aanvraag van de inkoopscan (pagina Inkoopbeleid). */
export function InkoopscanForm() {
  return (
    <Form type="inkoopscan" submitLabel="Inkoopscan aanvragen">
      <TextField name="naam" label="Naam" required autoComplete="name" />
      <TextField name="organisatie" label="Organisatie of schoolbestuur" autoComplete="organization" />
      <TextField name="email" label="E-mail" type="email" required autoComplete="email" />
      <TextField name="telefoon" label="Telefoon (optioneel)" type="tel" autoComplete="tel" />
      <Privacy />
    </Form>
  )
}

/** Whitepaper aanvragen. `slug` is de slug van de whitepaper in het CMS. Na verzenden verschijnt de download. */
export function WhitepaperForm({ slug }: { slug: string }) {
  return (
    <Form type="whitepaper" submitLabel="Whitepaper ontvangen">
      <input type="hidden" name="whitepaper" value={slug} />
      <TextField name="naam" label="Naam" required autoComplete="name" />
      <TextField name="email" label="E-mail" type="email" required autoComplete="email" />
      <TextField name="telefoon" label="Telefoon (optioneel)" type="tel" autoComplete="tel" />
      <Privacy />
    </Form>
  )
}

/** Sollicitatieformulier met cv. `vacancy` is de functietitel; zonder titel kiest de sollicitant zelf (open sollicitatie). */
export function SollicitatieForm({ vacancy }: { vacancy?: string }) {
  return (
    <Form type="sollicitatie" submitLabel="Verstuur sollicitatie">
      {vacancy ? (
        <input type="hidden" name="vacature" value={vacancy} />
      ) : (
        <TextField name="vacature" label="Op welke functie solliciteer je?" required />
      )}
      <FieldRow>
        <TextField name="voornaam" label="Voornaam" required autoComplete="given-name" />
        <TextField name="achternaam" label="Achternaam" required autoComplete="family-name" />
      </FieldRow>
      <FieldRow>
        <TextField name="email" label="E-mail" type="email" required autoComplete="email" />
        <TextField name="woonplaats" label="Woonplaats" required autoComplete="address-level2" />
      </FieldRow>
      <TextArea name="bericht" label="Bericht" required />
      <FileField
        name="bestanden"
        label="Cv en motivatiebrief"
        required
        multiple
        accept=".pdf,.docx,.png,.jpg,.jpeg"
        hint={FILE_RULES.hint}
      />
      <Privacy je />
    </Form>
  )
}
