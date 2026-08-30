# MyCab

A conversion-first transportation platform. Bangalore is live. The next cities are data, not a redesign.

This is **not** another cab brochure site. Google traffic lands on a city or trip page, the trip builder names the journey in a few seconds, and WhatsApp continues with a structured message plus first-party attribution.

## Netlify Free, without a hosted database

Yes. Phase 1 runs on **Netlify Free** and does **not** need Netlify Database, Supabase, or Neon.

| Layer | Where it lives |
| --- | --- |
| Cities, routes, vehicles, localities, prices, FAQs | Typed data in `src/lib/data` — eight tables, no server required |
| Landing pages | Static generation from that data |
| Fare + trip intent | Shared TypeScript (`src/lib/fare.ts`, `src/lib/trip-intent.ts`) |
| Leads | `POST /api/lead` writes a JSON file locally; on Netlify Free it keeps the current function instance (WhatsApp is the sales inbox) |
| Attribution | First-party `localStorage` (`first_touch_*` + `gclid` / UTM) sent with the lead |

When you outgrow Free, swap only the store in `src/lib/db/store.ts` for Postgres. The pages do not change.

Do not run high-volume Google Ads on the Free credit cap forever. Prove conversion, then upgrade.

## What’s in Phase 1

- Homepage that converts, instead of ranking for everything
- `/bangalore` city hub
- Journey pages: airport, outstation, local, one-way, round-trip
- Route pages such as `/bangalore-to-mysore-cab` with the trip already filled
- One trip builder for every product
- Progressive disclosure: from → to → understanding → date → passengers → cars
- Structured WhatsApp (not a blank chat)
- `/ops` inventory of cities, routes, landing pages, leads
- Hyderabad and Chennai as **draft** cities so the next city is a data row

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
npm run dev
```

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to your business number, country code, no plus.

## Deploy on Netlify Free

Connect this GitHub repo. Build command `npm run build`, Next.js runtime. Add the same env vars in the Netlify UI.

## Stack

Next.js App Router · Tailwind · Netlify · file-shaped data ready for Postgres
