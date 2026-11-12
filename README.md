# Website Onderwijs Inkoop Groep

Next.js 16 met Payload CMS, Postgres, Vercel Blob en Resend. Vervangt de WordPress-site op onderwijsinkoopgroep.nl.
Bouwplan en besluiten: `digital-dudes/docs/plans/2026-11-12-dd-oig-nieuwe-site-bouwplan.md` in de vault van Digital Dudes.

## Lokaal draaien

```
cp .env.example .env      # DATABASE_URL en PAYLOAD_SECRET invullen (openssl rand -hex 32)
createdb oig
npm install
npm run dev               # http://localhost:3100, CMS op /admin
npm run seed              # startinhoud (overschrijft wijzigingen uit het CMS, alleen lokaal gebruiken)
```

## Waar staat wat

- `docs/BOUWEN.md` en `docs/STIJL.md`: regels voor inhoud, opbouw en huisstijl.
- `docs/bronnen/`: per pagina waar elke tekst vandaan komt en wat OIG nog moet bevestigen.
- `docs/CLAUDE-KOPPELING.md`: de koppeling waarmee OIG de site vanuit Claude bijwerkt.
- `src/lib/pages.ts`: alle vaste pagina's met titel en omschrijving. `redirects.ts`: oude adressen.
- `src/collections/`: wat OIG in het CMS beheert (team, vacatures, premies, vragen, whitepapers).

## Testen

```
npx tsc --noEmit && npx eslint .
npx playwright test          # alle pagina's op laptop en telefoon, redirects, sitemap
npx tsx tests/mcp.test.mjs   # Claude-koppeling, hele keten
```

## Vercel

De build draait `payload migrate`, laadt de startinhoud alleen als de database leeg is, en bouwt dan.
Nodig als omgevingsvariabelen: `DATABASE_URL` (of `POSTGRES_URL`), `BLOB_READ_WRITE_TOKEN`, `PAYLOAD_SECRET`,
`NEXT_PUBLIC_SITE_URL` (exact het adres van de site), `CRON_SECRET`, `SEED_ADMIN_EMAIL` en `SEED_ADMIN_PASSWORD`
(eerste beheerder), later `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_GTM_ID` en bij livegang `SITE_INDEXABLE=true`.
Na een wijziging in `src/collections` of `src/globals`: `npm run payload -- migrate:create <naam>`.
