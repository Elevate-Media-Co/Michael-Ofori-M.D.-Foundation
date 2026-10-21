# Michael Ofori M.D. Foundation — Interactive V2 Concept

A presentation-grade, multi-view website prototype for the Michael Ofori M.D. Foundation. Entirely bespoke visual identity and copy, built around the foundation's stated goals and newly clarified rural-clinic and medical/dental education priorities.

## Deploy on GitHub + Vercel

1. Extract the archive and upload the **contents of the extracted folder** to the root of your new GitHub repository. `index.html`, `app.js`, `globe.js`, `styles.css`, `vercel.json`, and `assets/` must be at the repository root.
2. In Vercel select **Add New > Project > Import Git Repository**.
3. Choose framework **Other**. Root Directory `./`, **no Build Command** and **no Output Directory override**.
4. Deploy. Static HTML/CSS/JavaScript — no npm install, API keys or third-party rendering dependencies required.
5. Test website at your Vercel URL. Navigation uses `#/...` client-side routes so every deep link works on static hosting.

### What works in V2

- Custom editorial design with responsive mobile and desktop presentation, accessible nav, mega menu and mobile menu.
- **Real interactive 3D WebGL Earth**: rotate with pointer/touch drag, slow auto-rotation, zoom on wheel, zoom controls, pause/resume and focus on six geographic exploration points. Uses local bundled globe texture and native WebGL, not a video or CSS rotating photograph.
- Route-based pages: Home, Our Story, Our Work, Global Outlook, Perspectives, Get Involved, Contact, six editorial articles.
- Switchable four-focus interactive work explorer.
- Search modal with keyboard `/` shortcut, live filtered results and Escape to close.
- Journal category filter, article keyword search, articles, sharing, copy link.
- Interactive donation drawer: one-off/monthly amounts, custom USD amount, focus designation and review summary.
- Partnership, volunteer, clinic-interest, education-interest, contact and newsletter frontend validation demos.
- FAQ accordion, reduced-motion preference, focusable controls, mobile gestures, responsive design, sticky navigation, scroll progress, back-to-top.

### Important boundaries (present in the UI)

**This is a prototype, not a functioning fundraising or intake portal.** Giving flows do not accept payment details or process donations. Forms are not connected to a server and do not send, save or subscribe anything. No real grants can be applied for. The geographic markers are editorial exploration anchors **not evidence of actual operations**. The blog is educational sample copy, **not project case studies**. No invented beneficiaries, completed outcomes, impact statistics, registered jurisdictions, charitable tax status or endorsements are claimed.

### Photographs and font

The site loads illustrative photos from Pexels URLs at runtime; **they are not photographs of actual beneficiaries or projects**. The site remains functional if those network images cannot load. Replace URLs in `app.js` after receiving approved project photos. Verify licensing and final usages for production.

Fonts DM Sans and Instrument Serif load from Google Fonts (and have system-font fallbacks).

### Globe texture

`assets/earth-terrain.webp` is a **locally bundled color-treated geographic visualization**, generated from [Natural Earth](https://www.naturalearthdata.com/) country polygons (public domain) and NOAA ETOPO1 raster relief as distributed with the Basemap project. The globe is **not photographic satellite imagery**. `scripts/build_earth_texture.py` documents the build process and is not required for deployment. The source script uses locally installed Python data sets; it is optional and may require adjusting the source paths on another workstation.

### Production integration checklist

- Confirm final foundation naming, logo, domain and brand approval.
- Approved photographs, founder bio and actual work/impact descriptions.
- Payment provider and donation page, processor webhooks, transaction receipts, organization metadata and appropriate jurisdiction-dependent compliance.
- Server-side form processing, anti-spam and consent/privacy policy.
- Active program criteria, grant application timelines and review process if educational grants are eventually offered.
- Official contact addresses, social media, terms and privacy page.
- Actual verified performance, project outcomes and reporting, once available.
- SEO final canonical URL, sitemap, content audit, social preview imagery.

### Editing content

- Main text, imagery, articles, focus areas, exploratory regions: `app.js`
- Palette, typography, responsiveness: `styles.css`
- Site header/footer, meta tags, donation overlay markup: `index.html`
- 3D globe engine and controls: `globe.js`
- Earth texture: `assets/earth-terrain.webp`

**Made as a creative/demo deliverable. Do not enable real payments without a compliant provider and independent security review.**
