@AGENTS.md

# BM Group

## 1. Project overview

Marketing site + lead-capture back office for **BM Group**, a **Tunisian** premium holding gathering three sister companies: **BM Wood** (high-end wood/furniture), **EBM** (construction & renovation), and **IBM** (real estate development). Single-locale site in **French** (`lang="fr"`), aimed at clients, partners, and investors. Includes a small editorial "Journal" (blog), a public contact form, and an authenticated admin dashboard for the resulting leads.

Production URL: `https://bmgroup.tn`. Deployment target: a single VPS (long-running Node server behind nginx/caddy).

**Tech stack**

- **Next.js 16.2.4** (App Router) + **React 19.2.4** + **TypeScript 5** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.*` — theme lives in CSS)
- **framer-motion 12** for the interactive client islands (carousel, hero parallax, sticky header, scroll progress) — the rest of the page uses a custom IO-based `<Reveal />` to avoid pulling motion into static sections
- **`@next/third-parties/google`** for GA4 (gated on env)
- **libSQL / `@libsql/client`** — embedded SQLite file by default (`data/bmgroup.db`); ready for Turso if ever needed
- **`jose`** (Edge-safe JWT) for admin sessions; **`zod` 4** for input validation
- **ESLint 9** flat config (`eslint-config-next` core-web-vitals + typescript)
- Google Fonts via `next/font/google`: **Manrope** (sans) + **Cormorant Garamond** (serif)

> Note: AGENTS.md flags this as a Next.js version with breaking changes vs. older training data — when in doubt, consult `node_modules/next/dist/docs/`.

## 2. Architecture

```
app/                       # Next.js App Router
  layout.tsx               # Root layout: fonts, global metadata, GA wiring
  page.tsx                 # Home — SERVER component composing client islands
  globals.css              # Tailwind v4 entry + CSS vars + .reveal-on-view
  robots.ts                # MetadataRoute.Robots (disallows /admin, /api)
  sitemap.ts               # MetadataRoute.Sitemap (dynamic lastModified)
  error.tsx                # Branded error boundary
  not-found.tsx            # Branded 404
  blog/
    page.tsx               # Blog index (server)
    [slug]/page.tsx        # Article detail (SSG via generateStaticParams)
  mentions-legales/
    page.tsx               # Legal notice (server)
  confidentialite/
    page.tsx               # Privacy policy (server)
  admin/
    layout.tsx             # Server layout (metadata noindex; gate enforced by proxy.ts)
    page.tsx               # Dashboard — server, calls requireAdmin()
    leads-table.tsx        # Client: filter + status update
    logout-button.tsx      # Client
    login/
      page.tsx             # Server (redirects to /admin if already authed)
      login-form.tsx       # Client
  api/
    contact/route.ts       # POST — public, rate-limited, validates + persists lead
    admin/
      login/route.ts       # POST — rate-limited, sets session cookie
      logout/route.ts      # POST — clears cookie
      leads/route.ts       # GET  — auth required
      leads/[id]/route.ts  # PATCH — auth required, updates status
components/
  contact-form.tsx         # Client form with field validation + honeypot
  ga-route-tracker.tsx     # Client: fires GA4 page_view on App Router nav
  reveal.tsx               # Client IO wrapper, no framer-motion
  scroll-progress.tsx      # Client island: top progress bar
  site-header.tsx          # Client island: sticky header
  hero.tsx                 # Client island: hero with parallax + floating image
  companies-carousel.tsx   # Client island: full-screen 3-slide carousel
lib/
  blog.ts                  # BlogArticle type, hardcoded blogArticles[], siteUrl, getArticleBySlug
  branding.ts              # bmGroupLogo asset metadata
  db.ts                    # libSQL client, ensureSchema(), insertLead, listLeads, updateLeadStatus
  auth.ts                  # verifyCredentials, session cookie helpers, requireAdmin
  validation.ts            # zod schemas: contactSchema, loginSchema, updateStatusSchema
  rate-limit.ts            # In-memory token-bucket limiter (single-VPS only)
proxy.ts                   # Edge: auth gate for /admin/*, CSRF/origin gate for /api/admin/*
middleware.ts              # (does NOT exist — Next.js 16 deprecated this name; use proxy.ts)
data/                      # SQLite file (gitignored)
public/                    # bmgroup.png, logo-*.png, hero/, hero-bmgroup/, blog/
```

**Data flow.**
- **Marketing site** — fully static. Blog articles are a hardcoded `blogArticles` array in `lib/blog.ts`; the sitemap, blog index, and the homepage's blog section all derive from it.
- **Lead capture** — `components/contact-form.tsx` POSTs to `/api/contact`. The route applies an IP rate limit (`lib/rate-limit.ts`), validates with `contactSchema`, silently discards bot submissions whose honeypot field is filled, then inserts via `lib/db.ts:insertLead`.
- **Admin** — `proxy.ts` redirects unauthenticated `/admin/*` requests to `/admin/login` and origin-checks `/api/admin/*` mutations. After successful login, a `jose`-signed JWT lives in the `bm_admin_session` cookie (`httpOnly`, `secure` in prod, `SameSite=strict`, 7-day TTL).

**Rendering split.**
- `app/page.tsx` is a **server component**. It emits the JSON-LD, then mounts four client islands (`<ScrollProgress />`, `<SiteHeader />`, `<Hero />`, `<CompaniesCarousel />`) and wraps the rest of the sections (chiffres, manifeste, vision, méthode, blog, contact) in `<Reveal />` for scroll-triggered fade-up animations.
- `<Reveal />` is intentionally CSS-driven (IntersectionObserver toggles `.is-visible`, CSS handles opacity + transform). This keeps framer-motion out of the static sections — only the four islands import it.
- Blog pages are server components; the contact form and admin pages have their own targeted client components.

## 3. Key conventions

- **Path alias** `@/*` maps to repo root (see `tsconfig.json`). Imports: `@/lib/blog`, `@/components/companies-carousel`.
- **File naming.** Components are kebab-case files (`companies-carousel.tsx`) exporting PascalCase identifiers. App-router files follow Next conventions (`page.tsx`, `layout.tsx`, `[slug]/page.tsx`).
- **Styling.** Tailwind utility classes only — no CSS modules, no styled-components. Design tokens are CSS variables in `app/globals.css` and exposed to Tailwind via `@theme inline` (e.g. `bg-deep-green`, `text-gold`, `text-ink-soft`, `bg-stone`, `font-serif`, `font-sans`). Reusable utility classes: `.architectural-grid`, `.fine-noise`, `.editorial-mesh`, `.reveal-on-view` (used by `<Reveal />`).
- **Brand palette.** `--background #f7f5ef`, `--foreground #161712`, `--deep-green #10251f`, `--gold #b5945b`, `--stone #e7e2d7`, `--muted-green #dfe8df`, `--ink-soft #5d625b`.
- **Typography.** Serif (Cormorant Garamond) for display headings, sans (Manrope) for body. Heavy use of uppercase eyebrows with wide `tracking-[0.2em]`+ letter spacing.
- **Copy is French.** Keep `lang="fr"` and French content; metadata `locale` is `fr_FR`.
- **Images.** Always use `next/image`; provide `sizes`. `next.config.ts` declares `images.qualities: [75, 90]` — only those two values may be passed to `quality={...}` (90 is used by the carousel covers).
- **Reveal pattern.** Prefer `<Reveal>` (with optional `as="article" | "li"`, `delay={ms}`) over `motion.div whileInView` for entrance animation. Reserve framer-motion for scroll-tied, gestural, or keyframe-looped effects.
- **Metadata.** Each route exports its own `metadata` (Next App Router pattern). `metadataBase` is set on root via `siteUrl`.

## 4. Commands

```
npm run dev      # next dev (http://localhost:3000)
npm run build    # next build
npm run start    # next start (port 3001, see package.json)
npm run lint     # eslint (flat config)
```

No test runner is configured.

## 5. Environment

`.env.example` is the source of truth — copy to `.env.local` before `npm run dev`. Variables (names only):

- `DATABASE_URL` — libSQL URL. Default `file:./data/bmgroup.db` works on the VPS.
- `DATABASE_AUTH_TOKEN` — only when `DATABASE_URL` points at a remote libSQL/Turso instance.
- `ADMIN_EMAIL` — single admin allowed at `/admin`.
- `ADMIN_PASSWORD` — plaintext admin password. Comparison is constant-time on the server (`lib/auth.ts` SHA-256-normalises both sides then `timingSafeEqual`).
- `AUTH_SECRET` — ≥32-char random string used to sign session JWTs.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 Measurement ID. When unset, `<GoogleAnalytics>` and `<GaRouteTracker>` are not rendered.
- `GOOGLE_SITE_VERIFICATION` — optional; injected into `metadata.verification.google` when present.

External services: Google Analytics 4, Google Fonts (resolved at build by `next/font`).

## 6. Gotchas

- **`proxy.ts` not `middleware.ts`.** Next.js 16 deprecated the `middleware` file convention; use `proxy.ts` at the repo root with a named `proxy` export. The matcher targets `/admin/:path*` and `/api/admin/:path*`. The proxy runs on the Edge runtime — it can use `jose` for JWT verification but not Node-only modules.
- **Tailwind v4, no JS config.** Don't add `tailwind.config.js`. Add tokens by extending CSS vars + the `@theme inline` block in `app/globals.css`. PostCSS plugin is `@tailwindcss/postcss`.
- **`next.config.ts`** declares `images.qualities: [75, 90]`. Adding another quality value at the call site requires extending this list.
- **Home page is a SERVER component now.** Don't reintroduce `"use client"` at the top of `app/page.tsx` — push interactivity into a new island under `components/` instead. The four existing islands are `ScrollProgress`, `SiteHeader`, `Hero`, `CompaniesCarousel`.
- **`<Reveal />` is the default entrance animation.** Don't import `motion` just to fade an element up — use `<Reveal>` (`components/reveal.tsx`) which is CSS-driven and respects `prefers-reduced-motion` via the global `.reveal-on-view` rule.
- **Blog content is hardcoded.** To add an article, append to `blogArticles` in `lib/blog.ts` (slug, title, excerpt, eyebrow, image in `public/blog/`, dates, content paragraphs). The sitemap, blog index, and home journal section update automatically.
- **`siteUrl` lives in `lib/blog.ts`** (also imported by `app/layout.tsx`, `robots.ts`, `sitemap.ts`, blog slug page). Keep it consistent with the deployed domain (`https://bmgroup.tn`).
- **GA route tracking** intentionally skips the first navigation (`skipFirstNavigation` ref) to avoid double-counting the initial page view that `<GoogleAnalytics>` already records. `useSearchParams` requires the `<Suspense>` wrapper already in place — don't remove it.
- **Sitemap `lastModified`** for the home is `new Date()` at request time; the blog index uses the latest article date. No more hardcoded fallback.
- **JSON-LD `Organization`** is injected via `dangerouslySetInnerHTML` on the home page; if you change company list/branding, the `department` array updates automatically because it `.map()`s the same `companies` array.
- **Carousel images live in `public/hero-bmgroup/`** (`cover-bmgroup-{ebm,bmwood,ibm}.png`). EBM is the default slide. Source images have baked-in marketing typography near the bottom-center — the gradient overlay in `components/companies-carousel.tsx` is tuned to mask it; reducing gradient opacity will reveal it again.
- **Rate limiter is in-memory.** `lib/rate-limit.ts` works only for a single Node process. If we ever run multiple instances behind a load balancer, swap for Redis/Upstash. Keys come from `x-forwarded-for` / `x-real-ip`, so the reverse proxy in front of the VPS must forward those headers.
- **Honeypot is in the route handler, not the schema.** `contactSchema.company_url` accepts any string up to 200 chars; the dump check lives in `app/api/contact/route.ts` so bots get a 200 OK and stop retrying.
- **Admin password is plaintext in `.env.local`.** `ADMIN_PASSWORD=...` — no hashing or escaping required. Treat `.env.local` as a secret file (never commit, restrict file permissions on the VPS).
- **`secure` cookie + reverse proxy.** Session cookies set `secure: true` in production. Terminate TLS at nginx/caddy (or set `X-Forwarded-Proto: https`) so the cookie actually attaches over HTTPS.
- **SQLite file path.** `data/bmgroup.db` must be on a persistent volume. If using Docker, mount `./data` as a volume. The schema is auto-created on first request via `ensureSchema()`.
- **Single locale.** No i18n routing. Don't introduce `next-intl`/locale folders without a product decision.
- **AGENTS.md warning:** Next.js APIs may differ from training data — verify with the local docs in `node_modules/next/dist/docs/` before relying on memory.

## 7. Deploy (VPS)

1. Provision: Node 20+, nginx or caddy, persistent disk for `data/`.
2. `.env.local` with all required vars (see § 5); use a strong `AUTH_SECRET` and a long, unique `ADMIN_PASSWORD`. `chmod 600 .env.local` so only the app user can read it.
3. `npm ci && npm run build && npm run start` (port 3001).
4. Reverse-proxy: forward `X-Forwarded-For`, `X-Real-IP`, `X-Forwarded-Proto`; terminate TLS at the proxy.
5. Smoke-test: `/`, `/blog`, a blog slug, `/mentions-legales`, `/confidentialite`, `/admin/login`, then `/admin` (must 302 to login when unauthenticated), submit the contact form, hit rate limits.
