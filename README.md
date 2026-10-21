# Michael Ofori M.D. Foundation — 3-Preview Website Project

**Single GitHub repository / one Vercel domain.** Two complete designs are included; Preview 3 is reserved for future work.

## Routes

| URL path | Description | Status |
| --- | --- | --- |
| `/` | Concept gallery / preview selector | Ready |
| `/preview-1/` | Previous dark green / mint design, with the disliked 3D globe removed and an editorial visual substituted | Ready |
| `/preview-2/` | Newly designed warm editorial foundation concept: photographic, responsive, interactive | Ready |
| `/preview-3/` | Reservation screen for the third design | Placeholder — not built yet |

## Deploy to Vercel

1. Extract the ZIP. Upload **the contents of the extracted folder** to the root of one GitHub repository. The repository root must contain `index.html`, `vercel.json`, `assets/`, `preview-1/`, `preview-2/`, `preview-3/`.
2. In Vercel choose **Add New → Project → Import** your repository. Framework Preset: **Other**. Leave Build Command empty; use repository root as Root Directory. No environment variables are required.
3. Deploy. Visit the root domain to pick a preview or visit `/preview-1/`, `/preview-2/`, and `/preview-3/` directly.
4. All concepts have a bottom-of-screen switcher that links to each preview. No separate repository or Vercel project is needed.

## Why there is no globe

The client disliked the 3D globe. We removed the renderer from Preview 1 and replaced its globe-based visual sections with a photo-led hero and a simpler interactive regional perspective. Preview 2 uses interactive storytelling — program cards, a three-stage process explorer, and role-specific pathways — rather than any globe. Regional information in the prior concept is editorial/illustrative and does not claim actual operations.

## Preview 2 interactions

- Desktop header and responsive mobile menu
- Client-oriented program explorer (clinic equipment, supplies, medical/dental education, grants)
- Three-stage illustrative pathway tabs
- Switchable clinic / student / partner / supporter pathways
- Giving explorer (one-time or monthly, USD amount, proposed purpose, review)
- Filterable searchable editorial cards, with detailed concept summaries
- Keyboard-accessible site search (`/` to open, `Esc` to close)
- Clinic, student, partnership, and general enquiry forms with native validation
- Demo newsletter signup, FAQ accordions, scroll progress / back-to-top
- Accessible focus indications, descriptive photography alt text, reduced-motion support

## Important limitations before production

- **Demo-only forms and donations**: No form data is saved or sent; no payment takes place. Connect trusted providers and implement consent, data handling, and legal notices before public launch.
- **Images**: Pexels image URLs are used as temporary illustrative photography and require Internet access. Replace with approved foundation assets. For robust production delivery, obtain and host licensed optimized image copies.
- **Programs**: Client-provided mission and aspirations are represented. No made-up operational locations, charity impact statistics, case studies, grants awarded, or IRS tax-deductibility claims.
- **Logo and brand identity**: Exploratory only until approved.
- **Founder biography**: Do not publish a verified biography until the founder confirms it.
- **No external JavaScript frameworks**: Static HTML, CSS, JS. Preview 1 retains the existing design's files and feature set; Preview 2 is independent.

## When Preview 3 is ready

Replace `preview-3/index.html` (and add any required local CSS, JS or assets) in this **same repository**, commit/push, and Vercel will deploy all three together automatically. No change to the root preview gallery route is required, but update its status label from `Coming later` to `Ready`.
