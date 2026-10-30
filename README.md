# NEXUS OSINT — V0.1

A lightweight, static phone-number intelligence dashboard. V0.1 performs browser-side phone-number parsing and numbering-plan validation with `libphonenumber-js`.

## What works
- Responsive cyber-investigation dashboard.
- Parses phone numbers (Indonesia is the default region for national-format input).
- Displays E.164, international and national formats.
- Displays country/region, possible/valid status, and number type where metadata is available.
- No phone number is sent to a backend by this starter version.

## What does not work yet
- It does not identify the subscriber or owner of a phone number.
- It does not query mobile network operators, private contact books, or private databases.
- It does not yet query OSINT search providers or spam-report databases.
- Carrier information is deliberately not inferred from prefixes because number portability and allocation changes can make that misleading.

## Run locally

### Option 1: simplest
Open `index.html` in a modern browser while connected to the internet. The phone parsing library is loaded from jsDelivr CDN.

### Option 2: local web server
From this folder run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish free with Cloudflare Pages

1. Create a GitHub repository, for example `nexus-osint-v01`.
2. Upload `index.html`, `styles.css`, and `app.js` to the repository root.
3. Sign in to Cloudflare and open **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
4. Select the repository.
5. Framework preset: **None**.
6. Build command: leave blank. Build output directory: `/` (repository root).
7. Deploy. Cloudflare will provide a `*.pages.dev` address.

For a static site, no server, database, or API key is required in V0.1.

## Next development milestones
- V0.2: opt-in/public-source connectors, source provenance, retrieval timestamps, deduplication, and evidence confidence labels.
- V0.3: moderated community spam reports with abuse prevention.
- V0.4: authentication, private case workspace, access controls, retention and deletion controls.

## Responsible-use notes
Only integrate data sources that explicitly permit the intended use. Do not scrape private accounts, obtain subscriber data from operators without authorization, or present an inferred name as a verified subscriber identity. Minimize personal data, document source provenance, secure credentials server-side, and provide deletion/reporting processes before launching public lookup features.
