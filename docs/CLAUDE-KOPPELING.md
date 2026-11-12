# Claude-koppeling

Met de Claude-koppeling werkt u de website bij door het in gewone taal aan Claude te vragen. Claude kan teamleden,
vacatures, premietabellen en vragen en antwoorden lezen en wijzigen. Een wijziging via Claude is altijd eerst een
concept. Op de site komt hij pas als u Claude vraagt om te publiceren.

Dit document heeft twee delen: (a) voor medewerkers van de Onderwijs Inkoop Groep, (b) voor beheer.

---

## Deel A. Voor de Onderwijs Inkoop Groep

### De koppeling toevoegen (eenmalig, per persoon)

U hebt een account van het CMS nodig (hetzelfde e-mailadres en wachtwoord als op `/admin`) en een Claude-abonnement
waarmee u eigen koppelingen ("custom connectors") mag toevoegen.

1. Open Claude (claude.ai in de browser, of de app Claude Desktop).
2. Ga naar **Instellingen** en kies **Connectors** (in het Nederlands: Koppelingen).
3. Kies **Aangepaste connector toevoegen** (Add custom connector).
4. Vul in:
   - Naam: `OIG website`
   - Adres: `https://<adres van de site>/api/mcp`
   Laat de overige velden (client-id en geheim) leeg.
5. Klik op **Toevoegen** en daarna op **Verbinden**. Er opent een inlogscherm van de Onderwijs Inkoop Groep.
6. Controleer dat er staat dat **Claude** toegang vraagt en dat u teruggaat naar `claude.ai`. Log in met uw
   e-mailadres en wachtwoord van het CMS.
7. U komt terug in Claude. De koppeling staat nu aan. In een gesprek zet u hem aan via het plusje of het
   gereedschapsmenu onder het tekstvak.

Werkt de koppeling met het adres hierboven niet, probeer dan hetzelfde adres met een schuine streep aan het eind
(`.../api/mcp/`) en meld het aan de beheerder.

### Wat u kunt vragen

Vijf voorbeelden:

1. "Voeg Sanne de Vries toe aan het team als inkoopadviseur, in de groep Inkoopadvies, telefoon 036 820 10 00."
2. "Laat zien welke vacatures er nu op de site staan en welke nog concept zijn."
3. "Maak een vacature voor een aanbestedingsjurist, 32 tot 40 uur, HBO, in Zeewolde. Ik plak hieronder de tekst."
4. "Zet de premies van Zilveren Kruis voor 2027 in een nieuwe premietabel. Dit zijn de bedragen: ..."
5. "Pas het antwoord op de vraag over de kosten van aanbesteden aan: ..." en daarna "Publiceer deze wijziging."

Ook mogelijk: een vacature van de site halen ("sluit de vacature inkoopadviseur"), een teamlid of vraag verwijderen,
de kerncijfers en contactgegevens opvragen, en vragen wat er nog als concept wacht.

Wat niet via Claude gaat: foto's uploaden (dat doet u in het CMS), kerncijfers en contactgegevens wijzigen (dat doet
een beheerder in het CMS onder Instellingen), en gebruikers beheren.

### Concept en publiceren

- **Opslaan is altijd een concept.** Als u Claude iets laat toevoegen of wijzigen, staat het nog niet op de site.
  Claude geeft u een **previewlink**. Daarmee ziet u de pagina zoals hij wordt, 24 uur lang, zonder in te loggen.
- **Een bestaand item wijzigen** verandert de site ook nog niet: de bezoeker blijft de vorige versie zien tot u
  publiceert.
- **Publiceren** doet Claude pas als u daar om vraagt, bijvoorbeeld met "publiceer dit" of "zet het live". Vraag
  gerust eerst "wat staat er nog als concept?".
- **Verwijderen** gebeurt direct en kan niet ongedaan worden gemaakt. Claude vraagt daarom eerst om uw bevestiging.
- **Een vacature sluiten** haalt hem van de site maar bewaart hem in het CMS. U kunt hem later opnieuw publiceren.
- Alles wat Claude doet, gebeurt onder uw eigen account en met uw eigen rechten. In het CMS ziet u de wijzigingen
  terug, met de versiegeschiedenis per item.

Controleer een concept altijd zelf via de previewlink voordat u het laat publiceren, zeker bij premies en bedragen.

---

## Deel B. Voor beheer

### Hoe het werkt

De koppeling is een MCP-server (Model Context Protocol) in dezelfde Next.js-app als de site, met een eigen
OAuth 2.1-inlog. Er is geen aparte dienst en geen extra database: alles staat in Payload.

| Adres | Wat |
|---|---|
| `/api/mcp` | De MCP-server (transport Streamable HTTP, zonder sessie, antwoord als JSON). Alleen `POST`. |
| `/.well-known/oauth-protected-resource` en `/.well-known/oauth-protected-resource/api/mcp` | Protected Resource Metadata (RFC 9728) |
| `/.well-known/oauth-authorization-server` | Authorization Server Metadata (RFC 8414) |
| `/api/oauth/register/` | Dynamische clientregistratie (RFC 7591) |
| `/api/oauth/authorize/` | Inlogscherm (e-mail en wachtwoord van het CMS) |
| `/api/oauth/token/` | Code omruilen en tokens verversen |
| `/api/oauth/revoke/` | Token intrekken door de app zelf (RFC 7009) |

Het verloop: Claude roept `/api/mcp` aan zonder token en krijgt `401` met een `WWW-Authenticate`-header die naar de
metadata wijst. Claude meldt zich aan als app (registratie), stuurt de gebruiker naar het inlogscherm en krijgt na
het inloggen een eenmalige code terug. Die ruilt Claude om voor een toegangstoken. Elke aanroep daarna draagt dat
token in de header `Authorization: Bearer ...`.

Beveiliging:

- Authorization Code met PKCE, alleen `S256`. Zonder PKCE geen code.
- Apps zijn openbare clients (geen geheim). Terugkeeradressen moeten bij de aanmelding zijn opgegeven en worden
  exact vergeleken; alleen `https`, of `http` naar `localhost` (dan telt de poort niet mee, RFC 8252). Een onbekende
  app of een onbekend terugkeeradres krijgt een foutpagina en nooit een doorverwijzing.
- Autorisatiecode: 60 seconden geldig, één keer bruikbaar. Wordt een code twee keer aangeboden, dan vervallen alle
  tokens van die inlog.
- Toegangstoken: 1 uur. Verversingstoken: 30 dagen, wordt bij elk gebruik vervangen (rotatie). Een oud
  verversingstoken dat opnieuw wordt aangeboden trekt de hele inlog in.
- Van codes en tokens staat alleen de SHA-256-hash in de database.
- Een token geldt alleen voor deze server (`resource`, RFC 8707) en hoort bij één CMS-gebruiker. Elke tool draait
  met `overrideAccess: false` en die gebruiker, dus de rechten van het CMS gelden. Is de gebruiker verwijderd, dan
  werkt het token niet meer.
- Inloggen loopt via `payload.login`. Payload blokkeert een account 10 minuten na 5 mislukte pogingen (de
  standaardwaarden `maxLoginAttempts` en `lockTime`; ze staan niet apart in `Users.ts`).
- Schrijfacties: hoogstens 40 per 5 minuten per toegangstoken. Aanmeldingen van apps: hoogstens 100 per uur.
- Invoer heeft maximale lengtes. Foutmeldingen zijn in gewoon Nederlands; in de serverlog komen geen tokens,
  wachtwoorden of inhoud.
- Inhoud uit het CMS gaat als gegevens naar Claude; de instructies van de server zeggen dat Claude er geen
  opdrachten uit opvolgt.

Code:

- `src/app/(frontend)/api/mcp/route.ts`: de MCP-route.
- `src/app/(frontend)/api/oauth/*` en `src/app/(frontend)/.well-known/*`: de OAuth-routes.
- `src/lib/mcp/tools.ts`: de tools (namen, beschrijvingen, invoerschema's). `server.ts`: MCP-server en instructies.
  `store.ts`: opslag van apps, codes en tokens. `config.ts`: adressen, geldigheidsduur en limieten.
  `login-page.ts`: het inlogscherm.
- `src/collections/OAuthClients.ts` en `OAuthTokens.ts`: twee collecties, in het CMS zichtbaar voor beheerders onder
  Beheer ("Claude-koppeling: apps" en "Claude-koppeling: toegang"). Niemand kan ze via de API vullen of wijzigen.

De tools: `overzicht`, `team_lijst`, `team_lezen`, `team_opslaan`, `team_verwijderen`, `vacatures_lijst`,
`vacature_lezen`, `vacature_opslaan`, `vacature_sluiten`, `premies_lijst`, `premietabel_lezen`,
`premietabel_opslaan`, `vragen_lijst`, `vraag_opslaan`, `vraag_verwijderen`, `kerncijfers_lezen`, `concepten`,
`publiceren`.

### Omgevingsvariabelen

Er zijn geen nieuwe variabelen. De koppeling gebruikt:

| Variabele | Waarvoor |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Het adres van de site zonder schuine streep aan het eind. Hieruit volgen alle adressen in de metadata, de `resource` van de tokens en de previewlinks. **Moet exact het adres zijn waarop de site bereikbaar is** (inclusief `www` of niet), anders mislukt het verbinden. |
| `PAYLOAD_SECRET` | Ondertekent de previewlinks (en de sessies van het CMS). |
| `DATABASE_URL` | De database waarin apps en tokens staan. |

De site moet op `https` draaien. Bij een wijziging van het domein moeten gebruikers de koppeling opnieuw verbinden.

Bij de eerste uitrol moeten de tabellen `oauth_clients` en `oauth_tokens` in de database komen. Lokaal gebeurt dat
vanzelf; op Vercel via een migratie (`npx payload migrate:create`, daarna draait `payload migrate` bij de build).

### Toegang intrekken

- **Van één persoon:** log in op `/admin` als beheerder, open **Claude-koppeling: toegang**, filter op de gebruiker,
  selecteer alle regels en verwijder ze. De koppeling van die persoon werkt direct niet meer; opnieuw inloggen kan
  nog wel.
- **Iemand definitief afsluiten:** verwijder het account onder Gebruikers (of wijzig het wachtwoord en verwijder de
  regels hierboven). Zonder account geen toegang. Let op: alleen het wachtwoord wijzigen trekt bestaande tokens niet
  in.
- **Van één app:** verwijder de regel onder **Claude-koppeling: apps**. Alle tokens van die app vervallen.
- **Alles in één keer:** leeg de tabel `oauth_tokens` (`delete from oauth_tokens;`). Iedereen moet dan opnieuw
  verbinden.
- De gebruiker kan de koppeling ook zelf verwijderen in Claude (Instellingen, Connectors).

Verlopen codes en tokens en apps die twee maanden niet gebruikt zijn, worden vanzelf opgeruimd bij een nieuwe
aanmelding.

### Testen

`npx tsx tests/mcp.test.mjs` doorloopt de hele keten tegen de draaiende site (standaard `http://localhost:3100`,
anders `BASE_URL=...`): metadata, aanmelden, inloggen, PKCE, verversen, intrekken, de tools via de officiële
MCP-client, concept en publiceren. Het script maakt een testgebruiker en ruimt alles weer op. Het draait ook mee in
`npm test`.

Los proberen met de MCP Inspector:
`npx @modelcontextprotocol/inspector --cli https://<site>/api/mcp --transport http --method tools/list`

### Bekende aandachtspunten

- Alle adressen van de site eindigen op een schuine streep (`trailingSlash`). `/api/mcp` wordt daarom doorgestuurd
  (308) naar `/api/mcp/`. De officiële MCP-client en de MCP Inspector volgen dat. Volgt een app het niet, voer dan
  het adres met de schuine streep in; beide vormen zijn geldig voor de inlog.
- Claude meldt zich bij elke nieuwe verbinding opnieuw aan als app. Daardoor staan er meer regels onder
  "Claude-koppeling: apps" dan er gebruikers zijn. Dat is normaal.
- Client ID Metadata Documents (de nieuwere manier van aanmelden) worden niet ondersteund; Claude valt dan terug op
  dynamische registratie.
