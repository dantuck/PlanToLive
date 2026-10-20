# plantolive.app

Marketing site for [Plan To Live LLC](https://plantolive.app), the small studio behind Lantern, mealQ, Binmark, and vivo. It's a static [Astro](https://astro.build) site deployed to Cloudflare as static assets, with no server code.

## Requirements

- Node `>=22.22.0`
- npm

## Commands

Run from the project root:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the site to `./dist/`                  |
| `npm run preview` | Preview the production build locally         |
| `npm run astro …` | Run Astro CLI commands (e.g. `astro check`)  |

## Project structure

```text
/
├── public/               Static files served as-is (favicon, og.png, _headers)
├── scripts/og.mjs        Regenerates the Open Graph image from the app data
├── src/
│   ├── assets/apps/      App icons and screenshots
│   ├── components/       AppCard, Device, Icon, ThemeToggle
│   ├── content/apps/     One YAML file per app (the content collection)
│   ├── layouts/          Base page shell and Legal page layout
│   ├── pages/            index, privacy, terms, 404
│   ├── styles/global.css Theme tokens and global styles
│   ├── content.config.ts Schema for the apps collection
│   └── site.ts           Company name, contact email, legal date
├── astro.config.mjs
└── wrangler.jsonc        Cloudflare deployment config
```

## Content

### Apps

Each app on the homepage is a YAML file in `src/content/apps/`, validated by the schema in `src/content.config.ts`. To add an app, create a new file with:

- `name`, `tagline`, `description`
- `accent` (and optional `accentFg`) as `#rrggbb` colors
- `order`, which controls display order
- `status`: `available`, `preview`, or `open-source`, plus a `statusNote`
- `icon` and optional `screenshot` / `screenshotAlt`, as paths into `src/assets/apps/`
- `links`, each with a `label`, an `href`, and an optional `primary` flag

The homepage, app names in copy, and the OG image all read from this collection, so a new app shows up everywhere automatically.

### Site details and legal pages

Company name, contact email, and the "last updated" date for the privacy policy and terms live in `src/site.ts`. Update `LEGAL_UPDATED` whenever `privacy.astro` or `terms.astro` changes.

### Open Graph image

After changing app icons or the brand colors, regenerate `public/og.png`:

```sh
node scripts/og.mjs
```

## Deployment

The site deploys to Cloudflare with [Wrangler](https://developers.cloudflare.com/workers/wrangler/). `wrangler.jsonc` serves `./dist` as static assets, with the 404 page for unknown routes, on `plantolive.app` and `www.plantolive.app`.

```sh
npm run build
npx wrangler deploy
```

The `www` host is redirected to the apex by a zone Redirect Rule in Cloudflare. The route here only keeps a proxied DNS record for it.

Internal links use trailing slashes (`trailingSlash: 'always'` in `astro.config.mjs`).
