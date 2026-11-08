# SeeCabs

A conversion-first transportation platform. Live in Bangalore, Hubli, Dharwad, Belgaum and Mangalore. Each city is its own data — routes, airport, local hours — not a renamed Bangalore page.

This is **not** another cab brochure site. Google traffic lands on a city or trip page, the trip builder names the journey in a few seconds, and WhatsApp continues with a structured message plus first-party attribution.

## Cloudflare Workers, catalog still in git

Public pages are generated from typed data. Leads live in Cloudflare D1. The pages do not read the database.

| Layer | Where it lives |
| --- | --- |
| Cities, routes, vehicles, localities, prices, FAQs | Typed data in `src/lib/data` |
| Landing pages | Static generation from that data, served as Workers assets |
| Fare + trip intent | Shared TypeScript (`src/lib/fare.ts`, `src/lib/trip-intent.ts`) |
| Leads | `POST /api/lead` writes D1. Local `next dev` falls back to `.data/leads.json` when the binding is missing |
| Attribution | First-party `localStorage` plus a `sc_attr` cookie (`gclid`, `gbraid`, `wbraid`, `fbclid`, UTM) |
| Measurement | Consent Mode v2, then GTM and the Meta Pixel. The server confirms `generate_lead` with GA4 and Meta when those secrets are set |
| Ops | `/ops`, signed in with `OPS_PASSWORD`. Cloudflare Access can replace the password later |

A later Postgres store replaces `src/lib/db/store.ts` only. Fares stay in git so a price change is reviewed.

## Pricing model

All published fares come from `src/lib/pricing-model.ts`, anchored on Hubli outstation:

| Route | Sedan one-way |
| --- | --- |
| Hubli → Dandeli | ₹2,999 |
| Hubli → Gokarna | ₹3,999 |
| Hubli → Hampi | ₹3,999 |

Formula: twin-city (≤25 km) ₹1,400 (Hubli ↔ Dharwad); otherwise ₹1,999 + ₹13.5/km, rounded to ×99. Hampi carries a ₹100 tourist premium so it matches Gokarna. Airport and local packages are city rates in the same file. Round trip is 1.75× except day-trip-only routes (Nandi Hills, Jog Falls).

Do not run high-volume Google Ads against the Workers Free daily request cap forever. Prove conversion, then move to Workers Paid if the script size or the traffic requires it.

## What’s in Phase 1

- Homepage is a Karnataka network: city first, then trip type (local hours included)
- Live cities: Bangalore, Hubli, Dharwad, Belgaum, Mangalore
- Each city: airport, local 4/8 hr, outstation, one-way, round-trip
- Route pages such as `/hubli-to-dharwad-cab` and `/belgaum-to-goa-cab`
- One trip builder for every product
- Structured WhatsApp (not a blank chat)
- `/ops` inventory of cities, routes, landing pages, leads
- Hyderabad and Chennai remain **draft**

## URL rules

Every public page has a customer decision:

- `/bangalore/airport-taxi` — I need airport transport
- `/bangalore-to-mysore-cab` — I need this route
- `/bangalore/outstation-cabs` — I need an intercity cab

There is no `/best-cab-service-in-bangalore`.

Google Ads should hit the matching URL, not `/`.

## Add a city later

1. Add a `City` in `src/lib/data/cities.ts`
2. Add localities, routes, pricing rules, FAQs
3. Set `status: "live"` when the commercial data is real

Do not find-and-replace “Bangalore” with “Hyderabad”.

## Local

```bash
npm install
cp .env.example .env.local
npm run db:migrate:local
npm run dev
```

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to your business number, country code, no plus. Set `OPS_PASSWORD` and `OPS_SESSION_SECRET` in `.env.local` before opening `/ops`.

## Deploy on Cloudflare Workers

The site runs on the OpenNext Cloudflare adapter, which ships the real `next build`. `npm run build` reads public vars from `wrangler.jsonc` before Next starts, so canonicals and tag ids match the Worker.

```bash
npx wrangler login
npx wrangler d1 create seecabs
```

Put the database id into `wrangler.jsonc` (`d1_databases[0].database_id`), then:

```bash
npx wrangler d1 migrations apply seecabs --remote
npx wrangler secret put OPS_PASSWORD
npx wrangler secret put OPS_SESSION_SECRET
npm run deploy
```

Optional secrets, only when the accounts exist: `GA4_MEASUREMENT_ID`, `GA4_API_SECRET`, `META_CAPI_ACCESS_TOKEN`. Public tag ids stay in `wrangler.jsonc` `vars`. Empty ids mean that tag is not loaded.

The public site is `https://seecabs.com`. `www.seecabs.com` redirects to that host. `INDEXABLE` is `true`, so the canonical host is indexable. `https://seecabs.seecabs99.workers.dev` stays `noindex` (the worker sends `X-Robots-Tag` and a disallow-all `robots.txt` on every other hostname). Submit `https://seecabs.com/sitemap.xml` in Search Console after the custom domain is live. One host only.

`wrangler.jsonc` attaches `seecabs.com` and `www.seecabs.com` as Worker custom domains. The DNS zone has to be on this Cloudflare account before `npm run deploy`, or the deploy stops at the domain step. Add the zone (change the registrar nameservers to Cloudflare), then deploy. Disconnect the old Netlify site so it cannot keep publishing.

GitHub Actions deploys `main` when `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set.

`/ops` needs the two ops secrets. Leads older than 24 months are deleted by the daily cron.

## Stack

Next.js App Router · Tailwind · Cloudflare Workers · D1 · OpenNext · typed catalog ready for Postgres
