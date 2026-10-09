# Copperline: Next.js plumbing and handyman site

Pages: Home (`/`), Contact (`/contact`), Quote (`/quote`, a 2-step form).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Make it yours

- **Business name, phone, hours, services, plans, FAQs, testimonials:** `lib/site.ts`
- **Colors:** `tailwind.config.ts` (`ink`, `copper`, `mist`, `steel`)
- **Fonts:** `app/layout.tsx` (Bricolage Grotesque + Figtree via `next/font`)
- **Photos:** `components/Placeholder.tsx` is a stand-in. Swap usages for `next/image` with files in `/public`.
- **Stats on the homepage** (`stats` in `lib/site.ts`) are sample numbers. Replace them with real ones.

## Receiving form submissions

Both forms POST to `app/api/quote/route.ts` and `app/api/contact/route.ts`. Right now they validate and
`console.log`. Add your delivery method where the `TODO` is (Resend, Postmark, SMTP, a CRM or Slack webhook).
Consider adding rate limiting or a honeypot/CAPTCHA before going live.

## Deploy

Works on Vercel as-is. For a Node VPS: `npm run build && npm start` behind a reverse proxy.
