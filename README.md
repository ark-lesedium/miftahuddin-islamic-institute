# Miftahuddin Islamic Institute — Website

The official website for Miftahuddin Islamic Institute (Kimberley, Northern Cape,
South Africa), built as a fully static, bilingual (English / Arabic) Next.js site.

## Stack

- **Next.js 16** (App Router), configured for fully static export (`output: "export"`)
- **TypeScript**, **Tailwind CSS v4**
- **next-intl** for i18n — `/en/*` and `/ar/*`, with full RTL support for Arabic
- **Framer Motion** for scroll reveals and transitions (respects `prefers-reduced-motion`)
- **Lucide-style inline SVG icons**

No server runtime, API routes, or database are used. All content currently lives in
`messages/en.json` / `messages/ar.json` and `src/data/`, so the site works entirely
as static HTML/CSS/JS — see [Future backend](#future-backend-migration) below for how
this is designed to evolve.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — it redirects to `http://localhost:3000/en/`.

## Building the static site

```bash
npm run build
```

Output is written to `out/`, ready to be hosted on any static file host.

### Environment variables (build-time only)

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | Set this to `/your-repo-name` when deploying to a GitHub Pages *project* site (`username.github.io/your-repo-name`). Leave unset for a custom domain or a `username.github.io` root site. | `""` |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin used for canonical URLs, `sitemap.xml`, `robots.txt` and Open Graph metadata. | `https://miftahuddin.example` |

Example for a GitHub Pages project site:

```bash
NEXT_PUBLIC_BASE_PATH=/miftahuddin-institute NEXT_PUBLIC_SITE_URL=https://<user>.github.io/miftahuddin-institute npm run build
```

## Deploying to GitHub Pages

A ready-made workflow lives at `.github/workflows/deploy.yml`. It builds the site and
deploys `out/` via GitHub's official Pages actions on every push to `main`.

To enable it:

1. Push this repository to GitHub.
2. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).

The workflow automatically derives `NEXT_PUBLIC_BASE_PATH` from the repository name
(empty for a `username.github.io` repo, `/repo-name` otherwise) — no manual edits
needed.

## Internationalisation

- Locales live in `messages/en.json` and `messages/ar.json` — one namespaced JSON
  tree, kept in exact key-parity between the two files.
- Routing is locale-prefixed (`/en/…`, `/ar/…`) via `src/i18n/routing.ts`, with no
  middleware (static export has no server to run one) — see `src/i18n/request.ts`
  and `src/app/[locale]/layout.tsx`.
- `public/index.html` is a small static (non-React) page that redirects `/` to the
  visitor's remembered or browser-detected locale.
- Adding a language: add its code to `routing.ts`, add `messages/<locale>.json` with
  the same keys as `en.json`, and add fonts/typography rules in `globals.css` if the
  script needs its own (see the `font-arabic-*` variables for the existing pattern).

## Content architecture

Structured content (stats, gallery, timeline, nav) lives in `messages/*.json` and
`src/data/*.ts` rather than being hard-coded into components, so it can move to a
real API later without rewriting the UI.

### Editorial content policy

All factual claims (statistics, dates, place names, staff counts, quotes) come
directly from the Institute's supplied Annual Report and contact details. Sections
for which no verified information was supplied (programme offerings, individual
staff bios/photos, news articles) ship as clearly-labelled "coming soon" states
rather than invented content — see the Education, Leadership and News pages.

## Future backend migration

The planned path is:

```
Next.js (static)  →  Django REST API  →  PostgreSQL
```

To move a content area (e.g. News) to the future API without a UI rewrite:

1. Replace the relevant `messages/*.json` section or `src/data/*.ts` file with a
   fetch to the Django endpoint (in a Server Component, at build time, or — once a
   server exists — at request time).
2. Keep the same shape (field names/types) already used by the component so no
   template changes are required.
3. Remove `output: "export"` from `next.config.ts` once server-rendered/ISR pages
   are needed (e.g. for an admin-managed news feed), and re-introduce
   `next-intl`'s middleware for locale detection at that point.

## Project structure

```
src/
  app/[locale]/        Route segments (home, about, education, impact, ...)
  components/          Shared UI (Navbar, Footer, Gallery, Timeline, ...)
  data/                Structured content (gallery image metadata, etc.)
  i18n/                next-intl routing/navigation/request config
  lib/                 Small utilities (cn helper)
messages/              en.json / ar.json — all UI + page copy
public/images/         Logo assets and gallery photographs
```
