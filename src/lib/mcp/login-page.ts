import 'server-only'

/** Het inlogscherm van de Claude-koppeling, als losse HTML-pagina in de huisstijl (kleuren uit tokens.css). */

const esc = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

const STYLE = `
*,*::before,*::after{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 20px;background:#fff4e5;color:#1a1a1a;
font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
main{width:100%;max-width:460px;background:#fff;border:1px solid #f0e4d2;border-radius:10px;padding:32px 28px}
img{display:block;height:44px;width:auto;margin-bottom:24px}
.label{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#a85800;font-weight:600;margin:0 0 6px}
h1{font-size:28px;line-height:1.2;margin:0 0 12px;font-weight:600}
p{margin:0 0 14px}
.zacht{color:#4a4a48;font-size:15px}
.app{background:#f7f5f1;border-radius:10px;padding:14px 16px;margin:0 0 20px;font-size:15px}
.app strong{display:block;font-size:17px;overflow-wrap:anywhere}
.app code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;overflow-wrap:anywhere}
ul{margin:0 0 20px;padding-left:20px;font-size:15px;color:#4a4a48}
label{display:block;font-weight:600;font-size:15px;margin:14px 0 6px}
input{width:100%;font:inherit;padding:11px 12px;border:1px solid #c9c3b8;border-radius:7px;background:#fff;color:#1a1a1a}
input:focus-visible,button:focus-visible,a:focus-visible{outline:3px solid #312782;outline-offset:2px}
.fout{background:#fbeceb;color:#b3261e;border-radius:7px;padding:10px 12px;font-size:15px;margin:0 0 12px}
.waarschuwing{background:#eceaf6;color:#312782;border-radius:7px;padding:10px 12px;font-size:15px;margin:0 0 16px}
.knoppen{display:flex;flex-direction:column;gap:10px;margin-top:22px}
button{font:inherit;font-weight:600;border-radius:7px;padding:12px 18px;cursor:pointer;border:1px solid transparent}
.primair{background:#ff8c00;color:#3a2300}
.primair:hover{background:#e67e00}
.secundair{background:transparent;border-color:#c9c3b8;color:#1a1a1a}
.secundair:hover{background:#f7f5f1}
`

const page = (title: string, body: string) => `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)} | Onderwijs Inkoop Groep</title>
<style>${STYLE}</style>
</head>
<body>
<main>
<img src="/logo.svg" alt="Onderwijs Inkoop Groep" width="115" height="44">
${body}
</main>
</body>
</html>`

const HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; frame-ancestors 'none'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
}

export const html = (content: string, status = 200) => new Response(content, { status, headers: HEADERS })

export type LoginView = {
  /** Naam die de app zelf opgeeft; niet te controleren, dus tonen we ook waar hij naartoe terugkeert. */
  appName: string
  redirectHost: string
  loopback: boolean
  /** Alle OAuth-parameters van het verzoek, als verborgen velden. */
  hidden: Record<string, string>
  email?: string
  error?: string
}

export function loginPage(v: LoginView, status = 200): Response {
  const fields = Object.entries(v.hidden)
    .map(([k, val]) => `<input type="hidden" name="${esc(k)}" value="${esc(val)}">`)
    .join('\n')
  const body = `
<p class="label">Claude-koppeling</p>
<h1>Toegang geven tot het CMS</h1>
<div class="app">
Deze applicatie vraagt toegang:
<strong>${esc(v.appName)}</strong>
Na het inloggen gaat u terug naar <code>${esc(v.redirectHost)}</code>
</div>
${v.loopback ? '<p class="waarschuwing">Deze applicatie draait op uw eigen computer. Ga alleen verder als u de koppeling zojuist zelf hebt gestart.</p>' : ''}
<p>Als u inlogt, mag deze applicatie namens u:</p>
<ul>
<li>teamleden, vacatures, premietabellen en vragen en antwoorden lezen</li>
<li>wijzigingen klaarzetten als concept, en ze publiceren als u daar om vraagt</li>
</ul>
${v.error ? `<p class="fout" role="alert">${esc(v.error)}</p>` : ''}
<form method="post" autocomplete="on">
${fields}
<label for="email">E-mailadres</label>
<input id="email" name="email" type="email" autocomplete="username" required maxlength="200" value="${esc(v.email ?? '')}"${v.email ? '' : ' autofocus'}>
<label for="password">Wachtwoord</label>
<input id="password" name="password" type="password" autocomplete="current-password" required maxlength="200"${v.email ? ' autofocus' : ''}>
<div class="knoppen">
<button class="primair" type="submit" name="actie" value="toestaan">Inloggen en toegang geven</button>
<button class="secundair" type="submit" name="actie" value="weigeren" formnovalidate>Weigeren</button>
</div>
</form>
<p class="zacht" style="margin:18px 0 0">U logt in met uw account van het CMS van de Onderwijs Inkoop Groep. Uw wachtwoord wordt niet met de applicatie gedeeld. Toegang intrekken kan via de beheerder.</p>`
  return html(page('Toegang geven', body), status)
}

export function errorPage(title: string, message: string, status = 400): Response {
  return html(page(title, `<p class="label">Claude-koppeling</p><h1>${esc(title)}</h1><p>${esc(message)}</p><p class="zacht">Sluit dit venster en probeer de koppeling opnieuw toe te voegen. Blijft het misgaan, neem dan contact op met de beheerder van de site.</p>`), status)
}
