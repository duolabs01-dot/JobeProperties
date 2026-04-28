# Jobe Propco

A high-end redesign for Jobe Propco that combines:

- **Marketing site (`/`)** — brand-first landing page with live availability and waiting list capture
- **Tenant portal (`/portal`)** — self-service surface for maintenance, documents, move tracking, and rent flow
- **Owner dashboard (`/admin`)** — revenue, occupancy, payment, and maintenance story in one place
- **Advertising enquiries (`/advertise`)** — a future revenue lane for on-site and nearby businesses

## Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- Supabase-ready schema under `supabase/migrations/`
- Resend email notifications with SMS / WhatsApp stubs for owner alerts
- PayFast-ready payment architecture

## Local setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in values when ready.

## Key routes

- `/` marketing site
- `/portal` tenant portal concept
- `/admin` owner dashboard concept
- `/advertise` advertiser enquiry page
- `/api/waiting-list` lead capture endpoint
- `/api/maintenance` tenant maintenance endpoint
- `/api/advertise` ad enquiry endpoint

## Next implementation moves

1. Connect Supabase auth and row-level security for tenant / owner roles.
2. Persist waiting-list and maintenance submissions into Supabase instead of notification-only flows.
3. Add PayFast checkout and payment webhook handling.
4. Add Supabase Storage for lease documents and maintenance photos.
5. Wire WhatsApp Business provider once the owner approves reminder flows.

## Adding real content

### Logo

Drop your logo into `/public/logo.svg` (vector preferred) or `/public/logo.png`. The header will use it automatically.

### Favicon

Replace `/public/favicon.svg` with your own 32×32 SVG icon.

### Testimonials

Open `src/components/testimonials.tsx` and replace the 3 placeholder objects with real quotes. The format is:

```ts
{ quote: "...", name: "...", since: "YYYY", phase: "Phase X" }
```

### Founder photo (About page)

Drop a photo at `/public/founder.jpg` and update `src/app/about/page.tsx` — replace the placeholder div with:

```tsx
<Image src="/founder.jpg" alt="Dr Nhlanhla Sithole" fill className="object-cover object-top rounded-[2rem]" />
```

## Automatic reminders

Deploy the Edge Function: `supabase functions deploy send-reminders`

Set secrets: `supabase secrets set WASSENGER_API_KEY=your_key`

The function runs automatically at 8am daily.

This repo also includes `supabase/functions/send-reminders/config.toml` with the intended `0 8 * * *`
schedule so the daily reminder timing is captured alongside the function code.
