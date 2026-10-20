# Michael Ofori M.D. Foundation — Interactive Concept V1

A bespoke, framework-free, responsive nonprofit website demo built using HTML, CSS and JavaScript. Designed for direct GitHub → Vercel deployment without a build step.

## Upload to GitHub

1. Create a new GitHub repository (e.g. `michael-ofori-foundation`).
2. Upload **all files and folders in this directory to the repository root**. Do **not** upload the ZIP as one file.
3. Make sure `index.html`, `main.js`, `styles.css`, `vercel.json`, and `assets/` are at the root.
4. Commit your changes.

## Deploy on Vercel

1. Vercel → **Add New → Project** → Import Git Repository.
2. Framework Preset: **Other**.
3. Root Directory: `./`.
4. Build Command: **leave empty**.
5. Output Directory: **leave empty (project root)**.
6. Deploy.

For local preview run `python3 -m http.server 8000` from the repository directory and open `http://localhost:8000`.

## Working interactive features

- Responsive desktop and mobile navigation, focus dropdown, global site search
- Home, Our Story, Our Focus, Global Outlook, Journal, Get Involved, Contact views
- Interactive four-program explorer and approach stepper
- Region selector for prospective global scope (not a map of current operations)
- Journal filtering, keyword search and article detail views
- Donation configuration: one-time/monthly, amount, purpose, preview summary, drawer
- Forms with native validation and **honest demo-only confirmation**
- Back-to-top, transition states, Escape-to-close drawers, reduced-motion support

## Intentional demo limitations

- **No actual donation processing.** No payment gateway or card capture is present.
- **No real message or newsletter submissions.** The forms demonstrate interaction only, and do not send/store data.
- **No fabricated projects, outcomes or statistics.** Focus areas are aspirational until officially approved; journal posts are editorial.
- **No confirmed founder photo, detailed biography, official domain or social profiles.** Replace with approved assets later.
- **Stock photographs load remotely from Pexels.** They are illustrative only, not evidence of foundation activities. For production, download properly licensed approved assets to `assets/` and update URLs in `main.js`.
- **Branding is a proposed concept.** Registered entity name shown as supplied by client; validate before launch.

## Editing content

Edit the `CONFIG`, `FOCUS`, `REGIONS`, `STEPS`, and `ARTICLES` data in `main.js`. Edit color variables and typography in `styles.css`. Replace photos listed in `IMAGES`.

## Image credits & notes

Images selected from Pexels free stock photography (see https://www.pexels.com/license/). These are illustrative depictions; no pictured person or institution is claimed to be affiliated with the foundation. Please verify each image's permissions and substitute client-approved imagery before public launch.
