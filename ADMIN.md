# BM Group — admin & contact backend

This site ships with a small embedded backend to capture contact requests and review them in an admin dashboard. No third-party SaaS required.

## Stack

- **DB**: [`@libsql/client`](https://github.com/tursodatabase/libsql-client-ts) — local SQLite file (`./data/bmgroup.db`) on the VPS, or a Turso remote via `DATABASE_URL` if needed.
- **Auth**: single admin (email + plaintext password from env, constant-time comparison server-side), HMAC-signed JWT session cookie via [`jose`](https://github.com/panva/jose). Cookie is `httpOnly`, `secure` in prod, `SameSite=strict`, 7-day TTL.
- **Validation**: [`zod`](https://zod.dev/).
- **Pages**: `/admin/login` (form), `/admin` (dashboard, server component).
- **API**: `POST /api/contact` (public, rate-limited), `POST /api/admin/login` (rate-limited), `POST /api/admin/logout`, `GET /api/admin/leads` (protected), `PATCH /api/admin/leads/[id]` (protected).
- **Route protection**: `proxy.ts` at the repo root (Next.js 16 file convention) gates `/admin/*` (except `/admin/login`) and origin-checks `/api/admin/*` mutations.

## First-time setup

1. **Copy env**. `cp .env.example .env.local` then fill in:
   - `DATABASE_URL` — defaults to `file:./data/bmgroup.db`.
   - `ADMIN_EMAIL` — the only email allowed to log in.
   - `ADMIN_PASSWORD` — plaintext admin password.
   - `AUTH_SECRET` — ≥32 random characters.

2. **Generate an auth secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

3. **Start dev**: `npm run dev`. The `leads` table is auto-created on first request.

## URLs

- `/` — landing (with the public contact form)
- `/admin/login` — admin login
- `/admin` — admin dashboard (table of leads, status filters, status update)

## VPS deployment notes

- Default `DATABASE_URL=file:./data/bmgroup.db` works on the VPS — make sure `./data/` is on a persistent volume.
- `chmod 600 .env.local` so only the app user can read the password and secret.
- Reverse proxy (nginx/caddy) must forward `X-Forwarded-For` and `X-Real-IP` (the rate limiter reads them) and terminate TLS so the `secure` session cookie attaches.
- Admin pages are excluded from search engines via `robots: { index: false, follow: false }` in `app/admin/layout.tsx`, and `/admin` + `/api` are disallowed in `app/robots.ts`.

## Schema

```sql
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new',           -- 'new' | 'contacted' | 'closed'
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

## Anti-abuse

- **Honeypot** field `company_url` (hidden, must stay empty). Bot submissions are silently accepted (200 OK) and discarded, so spammers don't retry.
- **Rate limiting** in `lib/rate-limit.ts` — in-memory token bucket keyed by IP. Defaults: 5 contact submissions / 10 min / IP, 8 login attempts / 10 min / IP. Single-process only; swap for Redis if we ever horizontally scale.
- **CSRF**: session cookie is `SameSite=strict` and `proxy.ts` origin-checks `/api/admin/*` mutations.
