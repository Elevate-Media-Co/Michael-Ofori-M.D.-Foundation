# Michael Ofori M.D. Foundation

A six-page nonprofit website with privacy and terms pages, built with Next.js App Router, TypeScript, Tailwind CSS, and Lucide. Local WebP photographs are served through Next.js Image. Manrope and Playfair Display are self-hosted through Fontsource.

## Run locally

Use Node.js 22 LTS or 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The website runs with no credentials. Online giving and contact submission show their setup status until their providers are configured.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Upload to GitHub

Extract the ZIP, then upload or commit the **contents** of the extracted project at the repository root. Confirm that `package.json`, `package-lock.json`, `app/`, `public/`, `.gitignore`, and `.env.example` appear there. GitHub Desktop or Git can commit the source as a batch, including files whose names start with a dot. Keep local credentials in `.env.local`, which Git ignores.

## Deploy on Vercel

1. In [Vercel](https://vercel.com/new), import the GitHub repository as a new project. Select the **Next.js** framework preset and keep the repository root as the root directory.
2. Select a supported Node.js version that matches the `engines` field. Keep the preset’s build and output settings.
3. Add production variables under **Settings → Environment Variables**. Use preview-specific credentials only if you want integrations active on preview deployments.
4. Deploy. Once the final domain is known, set `SITE_URL` to that HTTPS origin and redeploy so canonical URLs, sharing cards, and the sitemap use the production domain.
5. Confirm the deployed domain, sitemap, menu, and program links. If integrations are enabled, verify the actual Foundation inbox receives a test inquiry and confirm the hosted giving page opens for the correct organization.

[Vercel’s GitHub deployment guide](https://vercel.com/docs/git/vercel-for-github)

## Launch configuration

Copy `.env.example` to `.env.local` for local configuration.

| Setting | Use |
| --- | --- |
| `SITE_URL` | Canonical HTTPS production origin. Pages carry a noindex tag until a canonical origin is set. Vercel previews also carry a noindex tag. |
| `DONATION_URL` | Approved HTTPS link to the Foundation’s hosted donation page. The provider collects gift amount and payment information. |
| `FOUNDATION_EMAIL`, `FOUNDATION_LOCATION` | Optional verified public email address and location. |
| `FOUNDATION_LINKEDIN_URL`, `FOUNDATION_INSTAGRAM_URL` | Optional verified public HTTPS profile links. |
| `RESEND_API_KEY` | Server-only API key with permission to send email. |
| `CONTACT_FROM_EMAIL` | Sender address on a verified [Resend domain](https://resend.com/docs/dashboard/domains/introduction). |
| `CONTACT_TO_EMAIL` | Foundation inbox that should receive inquiries. |

The contact endpoint validates submissions on the server and sends to the configured Foundation inbox. Visitor addresses are set as Reply-To. An accepted response means Resend accepted the request. Check the provider dashboard or delivery event to confirm inbox handoff. Consider a request rate limit for `POST /api/contact` through your hosting provider’s firewall before enabling the form publicly.

- **Brand assets** — The supplied Foundation logo appears in the site header and footer. The supplied portrait of Dr. Michael K. Ofori appears in the Home and About founder sections. To update either asset, place the replacement under `public/images/` and set `logo` or `founderPortrait` in `lib/site.ts`. The browser icon derived from the supplied logo is in `app/icon.png`.
- **Content** — Shared Foundation details live in `lib/site.ts`. Programs live in `lib/programs.ts`. Add verified reports and updates in `app/impact/page.tsx` when approved.
- **Privacy and terms** — Review `app/privacy/page.tsx` and `app/terms/page.tsx` against the Foundation’s actual hosting, email and giving arrangements before publishing.
- **Social sharing** — `public/images/social.jpg` is the local Open Graph photo. Metadata comes from `lib/metadata.ts`.
- **Photography** — See [PHOTO-CREDITS.md](PHOTO-CREDITS.md) for source and license details.

## Project structure

- `app/` — pages, metadata endpoints, global styles, and contact API
- `components/` — navigation, editorial sections, and contact form
- `lib/` — organization information, configuration, imagery, and validation
- `public/images/` — locally packaged photography and sharing image
