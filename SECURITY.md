# Security & Pre-Production Checklist

Security posture and the go-live checklist for the EPL Ghana site
(Next.js 16 + Payload CMS 3, MongoDB Atlas, Cloudflare R2, Resend).

## Before going to production

### 1. Rotate ALL secrets (do this last, right before deploy)
The values in `.env` are development credentials and must be rotated before
prod. Set the new values **only** as host environment variables (Vercel →
Project → Settings → Environment Variables). Never deploy the `.env` file.

- [ ] **MongoDB Atlas** — Database Access → edit the DB user → regenerate
      password → update `DATABASE_URL`. Also lock Network Access to the host's
      egress IPs (not `0.0.0.0/0`).
- [ ] **Cloudflare R2** — roll the R2 API token (Object Read & Write, scoped to
      the `epl-media` bucket only) → update `S3_ACCESS_KEY_ID` /
      `S3_SECRET_ACCESS_KEY`.
- [ ] **Resend** — revoke and recreate the API key → update `RESEND_API_KEY`.
- [ ] **PAYLOAD_SECRET** — generate a fresh 64-char value: `openssl rand -hex 32`.
      (Changing it invalidates all existing admin sessions — expected.)

### 2. Environment / config
- [ ] `NODE_ENV=production` on the host (disables the GraphQL playground and dev
      seeding; required for HSTS to make sense).
- [ ] `NEXT_PUBLIC_SERVER_URL` set to the real HTTPS domain (drives CORS, CSRF,
      email links, and image remote patterns).
- [ ] `EPL_DEV_AUTO_SEED=false` (or unset) in production.
- [ ] TLS/HTTPS enforced at the edge (Vercel/Cloudflare do this automatically).
- [ ] Confirm `.env` is git-ignored (it is) and never committed.
- [ ] Run `pnpm generate:importmap` before building for prod — the runtime logs
      a missing-importMap warning for the S3 client-upload handler, which can
      break admin media uploads until the import map is regenerated.

### 3. Application hardening (already in code)
- [x] HTTP security headers — `next.config.ts` (`X-Content-Type-Options`,
      `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`,
      `Strict-Transport-Security`).
- [x] Content-Security-Policy on frontend routes — `src/proxy.ts` (`script-src
      'self' 'unsafe-inline'`; no per-request nonce, which breaks Next.js static
      hydration). Flip to report-only with `CSP_REPORT_ONLY=true` if a page
      breaks; check the browser console for violations and adjust the policy.
- [x] Media uploads restricted to an image/PDF mime allowlist —
      `src/collections/Media.ts`.
- [x] CORS / CSRF pinned to `NEXT_PUBLIC_SERVER_URL` — `src/payload.config.ts`.
- [x] GraphQL endpoint disabled (unused; was also failing to build a schema) —
      `graphQL.disable` in `src/payload.config.ts`. Reduces attack surface.
- [x] `X-Powered-By` framework/version header removed — `next.config.ts`.
- [x] Mandatory TOTP 2FA for all CMS users (`payloadTotp forceSetup: true`).
- [x] Role-based access control on every collection — `src/access/`.
- [x] Public form endpoint: rate limited (5 / 15 min / IP), honeypot field,
      input validation + length caps, HTML-escaped in emails — `src/app/api/form-submit`.

### 4. Dependencies
- [ ] `pnpm audit --prod` is clean (or remaining advisories are triaged below).
- DOMPurify advisories: transitive via `@payloadcms/ui → monaco-editor`,
  admin-panel only. Pinned forward via `pnpm.overrides` in `package.json`.

### 5. Accounts & data
- [ ] Remove any test/seed admin accounts; confirm each CMS user has the
      minimum role they need (admin / editor / viewer).
- [ ] Confirm R2 bucket public access is limited to the media path only.
- [ ] Set up MongoDB Atlas backups.

## Dynamic testing (run from Kali against a running instance)

Build and start (`pnpm build && pnpm start`, serves on `:3000`), then point
tools at the staging URL or the Windows host IP. `$TARGET` = the base URL.

1. **Headers / quick CVEs** — `nuclei -u $TARGET` and `nikto -h $TARGET`.
   Confirms the security headers + CSP actually ship.
2. **TLS** (once on HTTPS) — `testssl.sh $TARGET`.
3. **Spider + active scan** — OWASP ZAP:
   `zap.sh -cmd -quickurl $TARGET -quickout zap-report.html`.
4. **Auth/2FA** — probe `/admin/login`, `/admin/forgot-password`, `/api/users/*`
   for rate-limiting, user enumeration, and that TOTP can't be bypassed.
5. **API access control** — `ffuf` the REST routes under `/api/*` unauthenticated;
   confirm GraphQL introspection is off in prod.
6. **Form abuse** — verify the honeypot + rate limit on `/api/form-submit`.
7. **sqlmap** — low priority (Payload uses an ODM over MongoDB, not raw SQL).

## Reporting a vulnerability
Email security concerns to the site administrator. Do not open public issues
for security problems.
