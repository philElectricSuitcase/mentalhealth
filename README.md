# Mental Health Support UK — React + MUI

A responsive UK mental-health support directory built with React, Vite and Material UI.

## Run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## SEO before launch

1. Replace `https://mentalhealthsupport.uk/` in `index.html`, `public/robots.txt` and `public/sitemap.xml` with the actual production domain.
2. Add a production social-sharing image and `og:image` / `twitter:image` tags.
3. For maximum crawlability beyond modern JS-rendering search engines, add prerendering or deploy with an SSR framework such as Next.js. The project already includes static title/description/canonical tags plus JSON-LD.
4. Review all service details periodically; phone numbers, eligibility, coverage and opening times can change.

## Safety

The emergency panel is intentionally placed above the directory. The site is signposting only and does not diagnose, triage or replace professional medical care.


## September 2026 directory updates

- Added UK Men’s Sheds Association with a direct Find a Shed link.
- Added HABS – Strength in Mind (Hertfordshire / East of England).
- Added a UK region filter alongside nation, audience, need and support method.
- Free-text search now includes region and location labels.
