# Michael Ofori M.D. Foundation website

A responsive, static HTML/CSS/JavaScript website hosted on Vercel. No framework or build step is required.

## Preview
Open `index.html` in a local static server or deploy the repository to Vercel. Navigation uses hash routes (`#/about`, `#/programs`, `#/impact`, `#/get-involved`, and `#/contact`).

## Production configuration
Edit the `SITE` object at the top of `app.js` before production:

- `donationUrl`: approved secure donation provider URL. Until configured, no payment is requested or processed.
- `contactEndpoint`: approved form backend endpoint. Until configured, form validation works locally but messages are not delivered or stored. A successful response from the configured endpoint is required before the UI confirms acceptance.

Review and confirm all program details, organizational contact information, legal disclosures, and the canonical domain before launch. The founder portrait in `assets/dr-michael-ofori.webp` is retained from the repository. No unverified impact numbers, partners, testimonials, tax claims, or awards are displayed. Healthcare photography is illustrative external stock imagery; replace with properly licensed, approved photography as available.

## Files
- `index.html` — document shell, SEO metadata, primary navigation, footer, and verified organization structured data.
- `app.js` — page content, route rendering, responsive navigation, and form integration points.
- `styles.css` — design tokens, editorial responsive layouts, and accessible interactions.
- `sitemap.xml`, `robots.txt` — crawl configuration.
