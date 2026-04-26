# TravelIN Project Structure

This document describes the reorganized folder layout for the TravelIN static site.

## Directory Overview

```text
travelIn/
├── index.html                 # Site entry point (home)
├── 404.html                   # Custom not-found page
├── README.md                  # Setup and deployment guide
├── package.json               # npm scripts
├── netlify.toml               # Netlify build and headers
├── vercel.json                # Vercel headers
├── _headers                   # Cloudflare Pages headers
├── robots.txt                 # Crawler directives
├── sitemap.xml                # Static sitemap
├── .env.example               # Optional future env vars
├── .gitignore
│
├── assets/
│   ├── images/                # Photos and raster graphics
│   ├── icons/                 # UI SVG icons
│   └── screenshots/           # Portfolio/README screenshots
│
├── css/                       # Page-specific stylesheets
├── js/                        # Client-side behavior
├── pages/                     # Secondary HTML routes
├── scripts/                   # Build and validation tooling
└── docs/                      # Extended project documentation
```

## Folder Purposes

### Root (`/`)

Keeps deployment entry points at the site root so hosts like Netlify and GitHub Pages resolve `/` and `/404.html` without extra configuration.

| File         | Purpose                                      |
| ------------ | -------------------------------------------- |
| `index.html` | Home page and primary landing route          |
| `404.html`   | Branded not-found page                       |
| `README.md`  | Developer onboarding and deploy instructions |

### `assets/images/`

All JPG, JPEG, and PNG content images used by pages and CSS backgrounds.

Naming convention: `{subject}-{context}.{ext}`  
Examples: `dehradun-tour.jpg`, `hero-background.png`, `reviewer-ananya.jpg`

### `assets/icons/`

Reusable SVG icons for amenities, navigation glyphs, and social footer icons.

Examples: `hotel.svg`, `map.svg`, `facebook-fill.svg`

### `assets/screenshots/`

Documentation and portfolio captures referenced from `README.md` and portfolio docs. Not used in the live site UI.

### `css/`

One stylesheet per major page or template, renamed for clarity:

| File                     | Used by                         |
| ------------------------ | ------------------------------- |
| `home.css`               | `index.html`, `404.html`        |
| `tours.css`              | `pages/seasonaltours.html`      |
| `dehradun-mussoorie.css` | `pages/dehradun-mussoorie.html` |
| `prayagraj-varanasi.css` | `pages/prayagraj-varanasi.html` |
| `kerala.css`             | `pages/kerala.html`             |
| `jaipur.css`             | `pages/jaipur.html`             |
| `reviews.css`            | `pages/reviewpage.html`         |

CSS asset paths use `../assets/images/` and `../assets/icons/` relative to the `css/` directory.

### `js/`

| File           | Purpose                                        |
| -------------- | ---------------------------------------------- |
| `dropdown.js`  | Sort dropdown toggle on the tours listing page |
| `auth-demo.js` | Demo login/sign-up handlers (no network calls) |

### `pages/`

All secondary routes. Internal links between pages use same-directory paths (e.g. `seasonaltours.html`). Links back to home use `../index.html`.

| File                      | Former name          |
| ------------------------- | -------------------- |
| `seasonaltours.html`      | `seasonaltours.html` |
| `dates.html`              | `dates.html`         |
| `reviewpage.html`         | `reviewpage.html`    |
| `login.html`              | `logo.html`          |
| `dehradun-mussoorie.html` | `itenary1.html`      |
| `prayagraj-varanasi.html` | `itenary2.html`      |
| `kerala.html`             | `itenary7.html`      |
| `jaipur.html`             | `iternary.html`      |

### `scripts/`

Node.js tooling only — not loaded by the browser.

| File               | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| `validate-site.js` | Pre-deploy link and asset validation (`npm run build`) |
| `reorganize.js`    | One-time migration script (already executed)           |

### `docs/`

| File                   | Purpose                               |
| ---------------------- | ------------------------------------- |
| `PLAN.md`              | Production readiness assessment       |
| `PORTFOLIO_SUMMARY.md` | Portfolio and interview documentation |
| `PROJECT_STRUCTURE.md` | This file                             |

## Path Reference Rules

| From           | To assets              | To CSS       | To pages    | To home         |
| -------------- | ---------------------- | ------------ | ----------- | --------------- |
| `index.html`   | `assets/images/...`    | `css/...`    | `pages/...` | `index.html`    |
| `pages/*.html` | `../assets/images/...` | `../css/...` | same folder | `../index.html` |
| `css/*.css`    | `../assets/images/...` | —            | —           | —               |

## Asset Organization Strategy

1. **Separate content from chrome** — photos in `assets/images/`, UI icons in `assets/icons/`.
2. **Meaningful filenames** — replaced ambiguous names (`nap1.jpg`, `c1.png`, `style300.css`) with descriptive ones.
3. **Keep deploy entry at root** — only `index.html` and `404.html` stay outside `pages/`.
4. **Validate on build** — `npm run build` checks every HTML/CSS reference against the filesystem.

## Cleanup Notes

| Item                                             | Action                                                                |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| `Screenshots/main`                               | Deleted (empty dead file)                                             |
| `main` (root)                                    | Deleted in prior production pass                                      |
| Commented holiday/culture blocks in `index.html` | Kept; reference renamed assets only inside comments                   |
| `culture-highlight.png`, `holiday-banner.png`    | Kept — used on `pages/kerala.html`                                    |
| Duplicate reviewer images                        | None found                                                            |
| Unused CSS files                                 | None — all seven stylesheets are linked                               |
| Unused HTML pages                                | None — all eight page routes are linked from navigation or tour cards |

## Maintenance Tips

- Add new tour pages under `pages/` and link from `pages/seasonaltours.html`.
- Place new photos in `assets/images/` with descriptive names.
- Run `npm run build` before every deploy.
- Update `sitemap.xml` when adding or renaming routes.
