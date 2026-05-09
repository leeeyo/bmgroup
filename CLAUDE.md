@AGENTS.md

# BM Group

## 1. Project overview

Marketing site for **BM Group**, a Moroccan premium holding that gathers three sister companies: **BM Wood** (high-end wood/furniture), **BM Entreprise** (construction & renovation), and **IBM** (real estate development). Single-locale site in **French** (`lang="fr"`), aimed at clients, partners, and investors. Includes a small editorial "Journal" (blog) section.

**Tech stack**

- **Next.js 16.2.4** (App Router) + **React 19.2.4** + **TypeScript 5** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.*` — theme lives in CSS)
- **framer-motion 12** for entrance/scroll animations
- **`@next/third-parties/google`** for GA4 (gated on env)
- **ESLint 9** flat config (`eslint-config-next` core-web-vitals + typescript)
- Google Fonts via `next/font/google`: **Manrope** (sans) + **Cormorant Garamond** (serif)

> Note: AGENTS.md flags this as a Next.js version with breaking changes vs. older training data — when in doubt, consult `node_modules/next/dist/docs/`.

## 2. Architecture

```
app/                  # Next.js App Router
  layout.tsx          # Root layout: fonts, metadata, GA wiring
  page.tsx            # Home (single long-scroll landing) — "use client"
  globals.css         # Tailwind v4 entry + CSS vars + @theme inline tokens
  robots.ts           # MetadataRoute.Robots
  sitemap.ts          # MetadataRoute.Sitemap (home + blog index + each article)
  blog/
    page.tsx          # Blog index (server)
    [slug]/page.tsx   # Article detail (dynamic)
components/
  ga-route-tracker.tsx  # Client: fires GA4 page_view on App Router nav
lib/
  blog.ts             # BlogArticle type, hardcoded `blogArticles[]`, siteUrl, getArticleBySlug
  branding.ts         # bmGroupLogo asset metadata
public/                # bmgroup.png, logo-bmwood.png, logo-ebm.png, logo-ibm.png, hero/, blog/
```

**Data flow.** The blog is fully static — articles are a hardcoded array in `lib/blog.ts`. There is no CMS, no DB, no API routes. The home page, blog index, and `[slug]` page all import from `lib/blog.ts`. `sitemap.ts` derives URLs from the same array. `siteUrl` (`https://bmgroup.ma`) is also exported from `lib/blog.ts` and reused across metadata.

**Rendering.** Home (`app/page.tsx`) is a client component because it uses framer-motion `useScroll`/`useTransform`. Blog pages are server components. JSON-LD `Organization` schema is injected inline on the home page.

## 3. Key conventions

- **Path alias** `@/*` maps to repo root (see `tsconfig.json`). Imports: `@/lib/blog`, `@/components/ga-route-tracker`.
- **File naming.** Components are kebab-case files (`ga-route-tracker.tsx`) exporting PascalCase identifiers. App-router files follow Next conventions (`page.tsx`, `layout.tsx`, `[slug]/page.tsx`).
- **Styling.** Tailwind utility classes only — no CSS modules, no styled-components. Design tokens are CSS variables in `app/globals.css` and exposed to Tailwind via `@theme inline` (e.g. `bg-deep-green`, `text-gold`, `text-ink-soft`, `bg-stone`, `font-serif`, `font-sans`). Two custom utility classes: `.architectural-grid` and `.fine-noise`.
- **Brand palette.** `--background #f7f5ef`, `--foreground #161712`, `--deep-green #10251f`, `--gold #b5945b`, `--stone #e7e2d7`, `--muted-green #dfe8df`, `--ink-soft #5d625b`.
- **Typography.** Serif (Cormorant Garamond) for display headings, sans (Manrope) for body. Heavy use of uppercase eyebrows with wide `tracking-[0.2em]`+ letter spacing.
- **Copy is French.** Keep `lang="fr"` and French content; metadata `locale` is `fr_FR`.
- **Images.** Always use `next/image`; provide `sizes`; static assets live in `public/`.
- **Metadata.** Each route exports its own `metadata` (Next App Router pattern). `metadataBase` is set on root via `siteUrl`.

## 4. Commands

```
npm run dev      # next dev (http://localhost:3000)
npm run build    # next build
npm run start    # next start (production)
npm run lint     # eslint (flat config)
```

No test runner is configured.

## 5. Environment

External services / env vars (names only):

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 measurement ID. When unset, `<GoogleAnalytics>` and `<GaRouteTracker>` are not rendered.
- `GOOGLE_SITE_VERIFICATION` — optional; injected into `metadata.verification.google` when present.

External services: Google Analytics 4, Google Fonts (resolved at build by `next/font`).

No `.env*` files are committed. No DB, no auth, no third-party CMS.

## 6. Gotchas

- **Tailwind v4, no JS config.** Don't add `tailwind.config.js`. Add tokens by extending CSS vars + the `@theme inline` block in `app/globals.css`. PostCSS plugin is `@tailwindcss/postcss`.
- **`next.config.ts` is empty** (`{}`). No image remote patterns, no redirects, no i18n config — adding remote image hosts requires editing this file.
- **Home page is `"use client"`** because of framer-motion scroll hooks. Don't move server-only code (e.g. `generateMetadata`) into `app/page.tsx`; metadata for the root path lives in `app/layout.tsx`.
- **Blog content is hardcoded.** To add an article, append to `blogArticles` in `lib/blog.ts` (slug, title, excerpt, eyebrow, image in `public/blog/`, dates, content paragraphs). The sitemap and blog index update automatically.
- **`siteUrl` lives in `lib/blog.ts`** (slightly misplaced — also imported by `app/layout.tsx`, `robots.ts`, `sitemap.ts`). Keep it consistent with the deployed domain (`https://bmgroup.ma`).
- **GA route tracking** intentionally skips the first navigation (`skipFirstNavigation` ref) to avoid double-counting the initial page view that `<GoogleAnalytics>` already records. `useSearchParams` requires the `<Suspense>` wrapper that's already in place — don't remove it.
- **Sitemap `lastModified`** for the home + blog index uses a hardcoded date (`new Date("2026-05-05")`). Bump when shipping a meaningful content change.
- **JSON-LD** is injected via `dangerouslySetInnerHTML` on the home page; if you change company list/branding, also update the `department` array.
- **Hero/logo assets** are referenced by literal paths (`/hero/hero1.png`, `/logo-bmwood.png`, etc.) — keep filenames stable or update both `app/page.tsx` and `lib/branding.ts`.
- **Single locale.** No i18n routing. Don't introduce `next-intl`/locale folders without a product decision.
- **AGENTS.md warning:** Next.js APIs may differ from training data — verify with the local docs in `node_modules/next/dist/docs/` before relying on memory.
