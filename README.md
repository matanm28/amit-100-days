# Amit's 100-day countdown

A static Hebrew / RTL release countdown built with React, TypeScript, Vite, and plain CSS. The board always has 100 programmatically generated cells, descending from 100 to 1 in ten rows of ten. In Hebrew reading order, 100 is at the top right and 1 at the bottom left.

## Personal setup

Edit **`src/config/siteConfig.ts`**:

1. Amit's confirmed release date is configured as `2026-12-21`. The final days display **2 — מחר אומרים מחר!** (19 December), **1 — מחר!** (20 December), and **0 — היום זה היום** (21 December). The 100-cell board remains numbered 100 through 1; day 0 is the celebration above it.
2. The supplied originals, `assets/soldier.jpeg` and `assets/cevilian.jpeg`, are imported in the config. Vite bundles them and generates URLs under the GitHub Pages base path. Replace those files or update the imports to change the photos. Alternatively, files in `public/assets/` can use base-relative config paths such as `assets/amit-uniform.jpg`.
3. The name, timezone, headline, description, photo paths, and personal message are all in that same file.

The page uses the two supplied photos without modifying them. If an image is missing or fails to load, an illustrated placeholder appears. Setting the date to `null` displays a waiting message and an unmarked board.

## Run locally

Install Node.js 24 LTS (see `.nvmrc`), then:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite with `/amit-100-days/` appended.

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

On Linux, Playwright may need system browser libraries: `npx playwright install --with-deps chromium`.

The browser tests run against the production build and check the exact rendered sequence, ten rows and ten columns, Hebrew direction, local asset loading, and overflow at 1440, 390, and 320 pixels. Unit tests cover midnight, both Israeli DST transitions, leap dates, invalid configuration, all countdown states, milestones, photo fallbacks, automatic updates, and reduced-motion celebration behavior.

## GitHub Pages

1. Initialize Git if needed, create the `amit-100-days` repository on GitHub, and push this project to `main`.
2. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. `.github/workflows/deploy.yml` tests and builds the app, verifies it in Chromium at desktop and mobile sizes, then deploys `dist` to Pages on pushes to `main`. Pull requests run verification without deploying.
4. The expected project URL is `https://<username>.github.io/amit-100-days/`.

Vite's `base` is `/amit-100-days/`, including photo, favicon, script, and stylesheet paths. If the repository name changes, update `base` in `vite.config.ts` and the URLs in `playwright.config.ts` and the photo-path assertion in `tests/app.test.tsx`. For a root site or custom domain, use `/`.

Deployment follows [Vite's GitHub Pages guidance](https://vite.dev/guide/static-deploy.html#github-pages). Node is only needed for building; GitHub Pages serves ordinary static files. There is no server runtime, database, cron job, or daily commit.

## Countdown details

The current calendar date is extracted in `Asia/Jerusalem` using `date-fns-tz`. Both it and the release date are normalized to UTC calendar-day indices before subtraction. This counts calendar days rather than elapsed 24-hour periods, avoiding DST errors. The browser refreshes at the next Jerusalem midnight and on focus or tab visibility changes. Like other client-side countdowns, it relies on the device clock being accurate.

Before day 100, the board is unmarked. During the final 100 days, past cells have marker crosses and today's cell has a gold outline, dark background, underline, and accessible current-date semantics. On 21 December 2026, day 0 displays “היום זה היום”, every board cell is crossed, and confetti plays once per mounted page unless reduced motion is requested. From 22 December onward, visits show a positive number of days since release.

Google Fonts provides optional Hebrew fonts; local Arial/sans-serif fallbacks keep the page usable if that request is blocked. Icons and all application code are bundled. No analytics or visitor data collection is configured.
