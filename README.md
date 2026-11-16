# Alleycat

A single-page React marketplace hub for art, stickers and clothes, with a pastel MySpace scrapbook design. Purchases happen on the linked marketplaces.

## Local development

- `npm.cmd start` starts the development server at http://localhost:3000.
- `npm.cmd test -- --watchAll=false --runInBand` runs the shopping-flow tests.
- `npm.cmd run build` creates the production site in `build/`.

Use `npm` in shells without PowerShell script restrictions. Dependencies are installed with `npm.cmd ci`.

## Shop destinations

Set the owner's real HTTPS profile URLs in `src/shopConfig.js`. Empty, malformed, non-HTTPS and known placeholder destinations display a non-clickable "coming soon" label. Configured links open a new tab and announce that behavior to screen readers.

The Redbubble and Vinted URLs have not yet been supplied. Add those before launch; no fake profiles or contact details are shipped. Additional marketplaces can be added when real destinations are available.

## Artwork and clothing

The supplied artwork is served from `public/assets/`. The same designs appear as informative previews and decorative paper collages; original colors and artwork backgrounds are preserved. The clothing section uses a simple hanger illustration until genuine garment photos are available.

The layout adapts to narrow screens and supports keyboard navigation, a skip link, and reduced motion. Confirm real marketplace destinations and inspect desktop/mobile layouts before publishing.

## Netlify deployment

Production: https://alleycat-shop.netlify.app

Netlify project: https://app.netlify.com/projects/alleycat-shop (Elis projects).

The site uses direct uploads. Git pushes do not automatically deploy it. The local project is linked through the ignored `.netlify/state.json`; `netlify.toml` records the build command and publish directory.

To update the site from this linked checkout, sign in to the same Netlify account if needed, then run:

```powershell
npm.cmd test -- --watchAll=false --runInBand
npm.cmd run build
npx.cmd --yes netlify-cli deploy --dir build --no-build --prod
```

Only run the upload after the tests and build succeed. From a new checkout, first run `npx.cmd --yes netlify-cli link --id 80c803c3-1a62-4634-9630-ac4dfabd2ead`.
