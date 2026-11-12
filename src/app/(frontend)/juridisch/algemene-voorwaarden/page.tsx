import { Download } from 'lucide-react'
import { LegalPage } from '@/components/juridisch/LegalPage'
import { getDocument, getSettings, pageMetadata, telHref } from '@/lib/cms'
import s from '@/components/juridisch/juridisch.module.css'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/juridisch/algemene-voorwaarden/')

export default async function VoorwaardenPage() {
  const [doc, { contact }] = await Promise.all([getDocument('Algemene voorwaarden'), getSettings()])
  return (
    <LegalPage
      path="/juridisch/algemene-voorwaarden/"
      name="Algemene voorwaarden"
      title={
        <>
          Algemene <span className="wordblock">voorwaarden</span>
        </>
      }
      lead="De algemene voorwaarden van de Onderwijs Inkoop Groep."
      question="Vragen over de voorwaarden?"
    >
      {doc?.url ? (
        <>
          <p>U kunt onze algemene voorwaarden als pdf bekijken en downloaden.</p>
          <p className={s.knopRij}>
            <a href={doc.url} className="btn btn--primair" target="_blank" rel="noopener">
              <Download aria-hidden /> Download de algemene voorwaarden (pdf)
            </a>
          </p>
        </>
      ) : (
        <p>
          Wilt u onze algemene voorwaarden ontvangen? Mail <a href={`mailto:${contact.email}`}>{contact.email}</a> of
          bel <a href={telHref(contact.phone)}>{contact.phone}</a>.
        </p>
      )}
    </LegalPage>
  )
}
