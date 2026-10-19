# STORY GRID website

A responsive Next.js App Router site for STORY GRID, designed around the IDEA → CREATE → CONNECT → GROW process.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and set the public site URL and Resend email values.
4. Run `npm run dev` and open `http://localhost:3000`.

The contact form validates submissions on the server and sends mail through Resend. Until `RESEND_API_KEY` and a verified sender are configured, it returns a clear error with the direct email address rather than claiming delivery.

## Content updates

- Edit service descriptions in `lib/content.ts`.
- Replace the three clearly marked concept studies in `lib/content.ts` with verified projects, images, and outcomes. Do not publish demo results as client results. Project details are data-driven at `/en/work/[slug]` and `/zh-CN/work/[slug]`.
- The showreel control currently plays a labeled CSS motion study, not a video. Replace it with an authorized showreel file and poster when supplied.
- The approved dark and light STORY GRID logo variants are stored in `components/Logo/` and served from `public/brand/`. The matching emblem crops are used in the header and favicon; the full lockup is used in the footer and social preview metadata. `app/globals.css` defines the approved `--sg-*` palette and usage aliases for navy, black, ivory, champagne, pearl, and both red states.
- The WeChat QR code, client footage, and verified client portfolio were not supplied. The work cards are labeled concept studies; do not present them as client work.
- Configure `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `RESEND_API_KEY` for live inquiry delivery. The sender address must be verified with Resend.
- Review the English and Chinese privacy notices against the final hosting and email provider configuration before launch.

## Public routes

- `/en` — English homepage
- `/zh-CN` — Simplified Chinese homepage
- `/{locale}/services`, `/{locale}/work`, `/{locale}/about`, `/{locale}/contact`, `/{locale}/privacy` — localized public pages
- `/{locale}/services/[slug]` and `/{locale}/work/[slug]` — localized details and concept case studies
- `/api/contact` — validated contact submission endpoint

The locale middleware keeps legacy `/` and `/zh` URLs working, redirects them to the prefixed equivalents, and remembers the selected locale in the `NEXT_LOCALE` cookie. English and Chinese content currently lives in paired route modules; the requested `next-intl` message catalog migration is still outstanding.

Responsive styles cover compact phones through large desktop displays, add safe area spacing and touch sized controls, and simplify scroll motion when the viewport lacks a fine hover pointer. Chinese pages use system Chinese font fallbacks until approved self hosted font files are supplied.

## Current implementation boundaries

The project inquiry form validates input and emails it through Resend when configured. It does not persist inquiries or include an admin dashboard. Consultation booking, managed video delivery, reel uploads, and database-backed content management are not implemented yet. Add those in later phases with the required credentials, authorized media, and storage/database configuration; the public pages should not imply these services are connected before then.

Set `NEXT_PUBLIC_SITE_URL` to the production canonical origin before deployment. Review the sitemap URL in `app/sitemap.ts` and `app/robots.ts` when choosing the production domain. For mainland China hosting, plan for the applicable domain, ICP filing, and local delivery requirements.
