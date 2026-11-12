import type { Metadata } from 'next'
import { anker, datumNl, LegalPage, type TocItem } from '@/components/juridisch/LegalPage'
import { hasRichText, RichText } from '@/components/RichText'
import { getPayloadClient, getSettings, pageMetadata, telHref } from '@/lib/cms'
import s from '@/components/juridisch/juridisch.module.css'

export const revalidate = 300

const PATH = '/juridisch/privacy-beleid/'

/** Privacyverklaring uit het CMS (global Juridische teksten). OIG levert de tekst aan. */
const getLegal = async () => {
  try {
    return await (await getPayloadClient()).findGlobal({ slug: 'juridisch' })
  } catch (e) {
    console.error('Juridische teksten niet geladen', e)
    return null
  }
}

type Node = { type?: string; tag?: string; text?: string; children?: Node[] }
const plat = (n: Node): string => n.text ?? (n.children ?? []).map(plat).join('')

/** Inhoudsopgave uit de H2's van de richtext. */
const kopjes = (data: unknown): TocItem[] => {
  const children = ((data as { root?: Node } | null)?.root?.children ?? []) as Node[]
  return children
    .filter((n) => n.type === 'heading' && n.tag === 'h2')
    .map((n) => plat(n).trim())
    .filter(Boolean)
    .map((label) => ({ id: anker(label), label }))
}

export async function generateMetadata(): Promise<Metadata> {
  const [meta, legal] = await Promise.all([pageMetadata(PATH), getLegal()])
  // zonder tekst hoort de pagina niet in de zoekresultaten
  return hasRichText(legal?.privacy) ? meta : { ...meta, robots: { index: false, follow: true } }
}

export default async function PrivacyPage() {
  const [legal, { contact }] = await Promise.all([getLegal(), getSettings()])
  const gevuld = hasRichText(legal?.privacy)

  return (
    <LegalPage
      path={PATH}
      name="Privacyverklaring"
      title={
        <>
          Onze <span className="wordblock">privacyverklaring</span>
        </>
      }
      lead="Hoe de Onderwijs Inkoop Groep omgaat met de persoonsgegevens die u via deze website, onze formulieren en sollicitaties met ons deelt."
      updated={gevuld && legal?.privacyUpdated ? datumNl(legal.privacyUpdated) : null}
      toc={gevuld ? kopjes(legal?.privacy) : []}
      autoIds={gevuld}
      question="Vragen over uw gegevens?"
    >
      {gevuld ? (
        <RichText data={legal?.privacy} />
      ) : (
        <div className={s.melding}>
          <h2>Onze privacyverklaring wordt bijgewerkt</h2>
          <p>
            Heeft u een vraag over uw persoonsgegevens? Neem dan contact met ons op via{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> of bel{' '}
            <a href={telHref(contact.phone)}>{contact.phone}</a>.
          </p>
        </div>
      )}
    </LegalPage>
  )
}
