# EPL Ghana Web

Next.js 16 + Payload CMS 3 — one repo.

- **Public site** → `/`
- **Admin dashboard** → `/admin`

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| CMS | Payload 3 (embedded) |
| Database | **MongoDB** (Atlas free tier for prod, Docker for local) |
| Media | **Cloudflare R2** (S3-compatible) in production; local disk in dev |
| Package manager | **pnpm** |
| Styling | Tailwind CSS 4 + Charitics template assets |

## Architecture

```
Next.js app  →  reads content from MongoDB at runtime
            →  serves images from Cloudflare R2 (S3-compatible)
/admin       →  Payload dashboard (edit text, news, uploads)
```

## Quick start

### 1. Database

**Production — MongoDB Atlas (recommended)**

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Copy the connection string into `.env` as `DATABASE_URL`
3. No cold-start issues like serverless Postgres — Atlas free tier stays warm enough for a charity site

**Local dev — Docker**

```bash
docker compose up -d
# DATABASE_URL=mongodb://127.0.0.1:27017/epl_ghana
```

### 2. Environment

**Option A — Doppler (recommended for teams)**

```bash
# Install CLI (once): winget install Doppler.doppler
# If `doppler` is not recognized, restart your terminal OR use the pnpm scripts below.

pnpm doppler:login       # opens browser — sign in once
pnpm doppler:setup       # select project epl_website, config dev

# One-time secret upload:
#   copy doppler.env.example doppler.env
#   fill in values, then:
pnpm doppler:upload

pnpm dev:doppler
```

**Option B — local `.env` file**

```bash
cp .env.example .env
pnpm dev
```

See `doppler.yaml` and `doppler.env.example` for the full secret list.

### 3. Install & run

```bash
pnpm install
pnpm dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

## Production (Vercel)

Deploy the **`site/`** folder as the Vercel project root.

Set these environment variables in Vercel (copy from your local `.env`):

```
DATABASE_URL=mongodb+srv://...@cluster.mongodb.net/epl_ghana?retryWrites=true&w=majority
PAYLOAD_SECRET=<32+ char random string>
NEXT_PUBLIC_SERVER_URL=https://your-domain.vercel.app
EPL_DEV_AUTO_SEED=false

R2_BUCKET=epl-media
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_REGION=auto
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_CLIENT_UPLOADS=true

EMAIL_PROVIDER=resend
RESEND_API_KEY=...
EMAIL_FROM=...
EMAIL_FROM_NAME=EPL Ghana CMS
```

Optional: `R2_PUBLIC_URL=https://pub-xxxx.r2.dev` for direct CDN image URLs.

Legacy `S3_*` names still work if already set in Doppler/Vercel.

**Do not commit** `.env` or `doppler.env` — both are gitignored.

### Doppler → Vercel (production)

1. In Doppler, create configs: `dev`, `stg`, `prd` under project `epl_website`
2. Upload production secrets to the `prd` config
3. In Doppler: **Integrations → Vercel** → connect and sync `prd` → your Vercel project
4. Or create a **Service Token** for `prd` and add it in Vercel as `DOPPLER_TOKEN` if using Doppler during build

Set `NEXT_PUBLIC_SERVER_URL` per environment (`dev` = localhost, `prd` = live domain).

## What editors can change

| Admin area | Controls |
|------------|----------|
| **Site Settings** | Hero, about, stats, contact, logo |
| **News** | Blog posts |
| **Projects** | Program listings |
| **Testimonials** | Homepage quotes |
| **Media** | Images (MinIO when S3 is enabled) |

## Template assets

Design is based on the **Charitics** HTML template in `../charitics/`. Placeholder images are in `public/images/`.
