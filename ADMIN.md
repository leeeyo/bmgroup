# BM Group — admin & contact backend

This site ships with a small embedded backend to capture contact requests and review them in an admin dashboard. No third-party SaaS required.

## Stack

- **DB**: [`@libsql/client`](https://github.com/tursodatabase/libsql-client-ts) — local SQLite file in dev (`./data/bmgroup.db`), drop-in Turso swap for prod via `DATABASE_URL`.
- **Auth**: single admin (email + bcrypt-hashed password from env), HMAC-signed JWT session cookie via [`jose`](https://github.com/panva/jose).
- **Validation**: [`zod`](https://zod.dev/).
- **Pages**: `/admin/login` (form), `/admin` (dashboard, server component, requires admin).
- **API**: `POST /api/contact` (public), `POST /api/admin/login`, `POST /api/admin/logout`, `GET /api/admin/leads` (protected), `PATCH /api/admin/leads/[id]` (protected).

## First-time setup

1. **Copy env**. Ensure `.env.local` is present (a working dev copy is committed locally but ignored by git). Fill in:
   - `DATABASE_URL` — defaults to `file:./data/bmgroup.db`.
   - `ADMIN_EMAIL` — the only email allowed to log in.
   - `ADMIN_PASSWORD_HASH` — bcrypt hash of the admin password.
   - `AUTH_SECRET` — ≥32 random characters.

2. **Generate a bcrypt hash** for any new admin password:
   ```bash
   node -e "require('bcryptjs').hash('your-password', 10).then(h => console.log(h))"
   ```

3. **Generate an auth secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

4. **Start dev**: `npm run dev`. The `leads` table is auto-created on first request.

## Default dev credentials

The committed `.env.local` (local only, gitignored) ships with:

- Email: `admin@bmgroup.tn`
- Password: `bmgroup-admin-2026`

**Rotate both before deploying anywhere.** Update `ADMIN_EMAIL` and regenerate `ADMIN_PASSWORD_HASH` + `AUTH_SECRET`.

## URLs

- `/` — landing (with the public contact form)
- `/admin/login` — admin login
- `/admin` — admin dashboard (table of leads, status filters, status update)

## Production deployment notes

- The default `DATABASE_URL=file:./data/bmgroup.db` works on a long-lived host (VPS) but **not on serverless platforms** (Vercel/Netlify) where the filesystem is read-only and ephemeral. For Vercel/Netlify:
  - Provision a [Turso](https://turso.tech/) database.
  - Set `DATABASE_URL=libsql://<your-db>.turso.io` and `DATABASE_AUTH_TOKEN=<token>` in the host's env.
  - No code change required; the same `lib/db.ts` handles both.

- Admin pages are excluded from search engines via `robots: { index: false, follow: false }` in `app/admin/layout.tsx`.

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

## Anti-spam

- Honeypot field `company_url` (hidden, must stay empty). Bot submissions are silently accepted and discarded.
- No rate limiting yet — add before exposing publicly if abuse occurs (`TODO`).
