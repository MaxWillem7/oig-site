import { CookieSettingsButton } from '@/components/Consent'
import { LegalPage } from '@/components/juridisch/LegalPage'
import { getSettings, pageMetadata, telHref } from '@/lib/cms'
import s from '@/components/juridisch/juridisch.module.css'

export const revalidate = 300
export const generateMetadata = () => pageMetadata('/juridisch/cookiebeleid/')

const TOC = [
  { id: 'wat-zijn-cookies', label: 'Wat zijn cookies' },
  { id: 'uw-keuze', label: 'Uw keuze' },
  { id: 'categorieen', label: 'Welke cookies wij gebruiken' },
  { id: 'browser', label: 'Cookies beheren in uw browser' },
  { id: 'wijzigingen', label: 'Wijzigingen' },
  { id: 'contact', label: 'Contact' },
]

export default async function CookiebeleidPage() {
  const { contact } = await getSettings()
  return (
    <LegalPage
      path="/juridisch/cookiebeleid/"
      name="Cookiebeleid"
      title={
        <>
          Ons <span className="wordblock">cookiebeleid</span>
        </>
      }
      lead="Welke cookies deze website gebruikt, waarvoor, en hoe u uw keuze aanpast."
      updated="12 november 2026"
      toc={TOC}
      question="Vragen over cookies?"
    >
      <h2 id="wat-zijn-cookies">Wat zijn cookies</h2>
      <p>
        Cookies zijn kleine tekstbestanden die op uw computer of mobiele apparaat worden opgeslagen wanneer u een
        website bezoekt. Naast cookies bestaan er vergelijkbare technieken, zoals lokale opslag in uw browser. In dit
        cookiebeleid noemen wij ze samen cookies.
      </p>

      <h2 id="uw-keuze">Uw keuze</h2>
      <p>
        Bij uw eerste bezoek vragen wij welke cookies u toestaat. U kunt alles accepteren, alleen het noodzakelijke
        toestaan of per categorie kiezen. Zonder uw toestemming laden wij geen scripts voor statistieken of marketing.
      </p>
      <p>
        Uw keuze bewaren wij in de lokale opslag van uw browser, onder de naam <code>oig-cookies-v1</code>. Zo hoeven
        wij de vraag niet bij elk bezoek opnieuw te stellen. U kunt uw keuze op elk moment aanpassen.
      </p>
      <p className={s.knopRij}>
        <CookieSettingsButton className={`btn btn--secundair ${s.voorkeuren}`} />
      </p>

      <h2 id="categorieen">Welke cookies wij gebruiken</h2>
      <p>Wij werken met drie categorieën. Alleen de eerste staat altijd aan.</p>

      <h3>Noodzakelijk</h3>
      <p>
        Nodig om de site te laten werken. Hieronder valt het bewaren van uw cookiekeuze. Hiervoor is geen toestemming
        nodig.
      </p>

      <h3>Statistieken</h3>
      <p>
        Statistieken laten ons zien welke pagina&apos;s bezocht worden en waar bezoekers vastlopen. Alleen als u
        hiervoor toestemming geeft, laden wij Google Tag Manager. Via Google Tag Manager werken op deze site Google
        Analytics 4 en Microsoft Clarity. Deze diensten kunnen cookies in uw browser plaatsen.
      </p>

      <h3>Marketing</h3>
      <p>
        Marketingcookies gebruiken wij voor het meten van advertenties. Alleen als u hiervoor toestemming geeft, geven
        wij via Google Tag Manager door dat advertentiemeting is toegestaan.
      </p>

      <div className="tabel-wrap">
        <table className={`tabel ${s.tabel}`}>
          <caption className="sr-only">Overzicht van de cookiecategorieën</caption>
          <thead>
            <tr>
              <th scope="col">Categorie</th>
              <th scope="col">Waarvoor</th>
              <th scope="col">Diensten</th>
              <th scope="col">Wanneer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Noodzakelijk</th>
              <td>Uw cookiekeuze onthouden</td>
              <td>Deze website zelf</td>
              <td>Altijd</td>
            </tr>
            <tr>
              <th scope="row">Statistieken</th>
              <td>Zien hoe de site gebruikt wordt</td>
              <td>Google Tag Manager, Google Analytics 4, Microsoft Clarity</td>
              <td>Alleen met uw toestemming</td>
            </tr>
            <tr>
              <th scope="row">Marketing</th>
              <td>Advertenties meten</td>
              <td>Google Tag Manager</td>
              <td>Alleen met uw toestemming</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Geeft u voor geen van beide toestemming, dan wordt Google Tag Manager niet geladen. Uw keuze per categorie
        geven wij door aan Google Tag Manager.
      </p>

      <h2 id="browser">Cookies beheren in uw browser</h2>
      <p>
        U kunt cookies ook in uw browser blokkeren of wissen. In Google Chrome, Mozilla Firefox, Safari en Microsoft
        Edge vindt u dit in de instellingen onder Privacy. Wist u de gegevens van deze website, dan vragen wij bij uw
        volgende bezoek opnieuw om uw keuze.
      </p>
      <p>
        Het uitschakelen van cookies voor statistieken of marketing heeft geen invloed op de werking van de website.
      </p>

      <h2 id="wijzigingen">Wijzigingen</h2>
      <p>
        Wij kunnen dit cookiebeleid van tijd tot tijd bijwerken. Wijzigingen plaatsen wij op deze pagina, met een
        bijgewerkte datum.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Heeft u vragen of opmerkingen over dit cookiebeleid of ons gebruik van cookies? Neem dan contact met ons op:
        bel{' '}
        <a href={telHref(contact.phone)} className={s.tel}>
          {contact.phone}
        </a>{' '}
        of mail{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. Ons adres is {contact.street}, {contact.postalCode}{' '}
        {contact.city}.
      </p>
    </LegalPage>
  )
}
