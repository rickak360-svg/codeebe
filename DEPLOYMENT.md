# Deployment Guide

Codeebe is a pnpm monorepo with four deployables:

| App | Type | Recommended host | Port |
|-----|------|------------------|------|
| `apps/web` | Next.js (SSR) | Vercel | 3000 |
| `apps/admin` | Vite static SPA | Vercel / Netlify / Cloudflare Pages | static |
| `apps/api` | NestJS (Node) | Railway / Render / Fly / Docker | 3001 |
| `apps/worker` | BullMQ consumer (Node) | Railway / Render / Fly / Docker | — |

Postgres (**Neon**) and Redis (**Upstash**) are already managed externally — nothing to deploy for those.

---

## 1. Backend: API + Worker

### Option A — Railway / Render (no Dockerfile needed)
Both platforms auto-detect Node + pnpm.

- **API service**
  - Root directory: repo root (or set **Config path** to `apps/api/railway.toml`)
  - Build command: `pnpm install --frozen-lockfile && pnpm --filter @codeebe/api... build`
  - Start command: `pnpm --filter @codeebe/api start` *(runs `node dist/src/main.js`)*
  - Health check path: `/health`
- **Worker service** (same repo, separate service)
  - Root directory: repo root (or set **Config path** to `apps/worker/railway.toml`)
  - Build command: `pnpm install --frozen-lockfile && pnpm --filter @codeebe/worker... build`
  - Start command: `pnpm --filter @codeebe/worker start`

> **Note:** The `...` suffix builds `@codeebe/queue` first. Each app also has a `prebuild` script as a fallback.

### Option B — Docker
Build from the **repo root** (the Dockerfiles expect the root as context):

```bash
docker build -f apps/api/Dockerfile    -t codeebe-api .
docker build -f apps/worker/Dockerfile -t codeebe-worker .
```

Or use the bundled compose file (API + worker only; DB/Redis are external):

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

### Required API environment variables (production)
```
NODE_ENV=production
API_PORT=3001
DATABASE_URL=postgresql://...neon.tech/...?sslmode=require
REDIS_URL=rediss://default:...@...upstash.io:6379
REDIS_ENABLED=true
WEB_ORIGIN=https://your-web-domain.com        # CORS — your deployed web URL
ADMIN_ORIGIN=https://your-admin-domain.com    # CORS — your deployed admin URL
WEB_URL=https://your-web-domain.com           # used in quotation email links
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@codeebe.com
SMTP_PASS=********
SMTP_FROM="Codeebe <noreply@codeebe.com>"
SMTP_REPLY_TO=support@codeebe.com
MAIL_ENABLED=true
ADMIN_NOTIFY_EMAIL=support@codeebe.com
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
AI_ENABLED=true
ADMIN_PASSWORD=<a strong admin password>
JWT_SECRET=<a long random string>
```

### Worker environment variables
```
NODE_ENV=production
REDIS_URL=rediss://default:...@...upstash.io:6379
```

### Database migrations (run once per deploy when schema changes)
```bash
pnpm --filter @codeebe/api exec prisma migrate deploy
```

---

## 2. Web (Next.js) — Vercel
- **Root directory:** `apps/web`
- Vercel detects Next.js automatically. (`output: "standalone"` is set for Docker; Vercel ignores it.)
- **Environment variables** (these are baked into the client, so set them before building):
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-handle
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/<your-number>
```

> Docker alternative: `docker build -f apps/web/Dockerfile --build-arg NEXT_PUBLIC_API_URL=https://api... -t codeebe-web .`

---

## 3. Admin (Vite SPA) — static host
- **Root directory:** `apps/admin`
- Build command: `pnpm install --frozen-lockfile && pnpm --filter @codeebe/admin build`
- Output directory: `apps/admin/dist`
- **Environment variable** (build-time):
```
VITE_API_URL=https://your-api-domain.com
```
- SPA routing: add a catch-all rewrite to `index.html` (Vercel: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`).

---

## 4. Post-deploy checklist
- [ ] `DATABASE_URL` points to Neon and `prisma migrate deploy` has run.
- [ ] `REDIS_URL` (Upstash, `rediss://`) set on both API and worker; `REDIS_ENABLED=true` on API.
- [ ] `WEB_ORIGIN` / `ADMIN_ORIGIN` match the real deployed domains (otherwise CORS blocks the browser).
- [ ] `ADMIN_PASSWORD` and `JWT_SECRET` are strong, unique secrets.
- [ ] `NEXT_PUBLIC_API_URL` (web) and `VITE_API_URL` (admin) point to the deployed API.
- [ ] Visit `/health` on the API → `{"status":"ok","database":"ok"}`.
- [ ] Submit a test lead and confirm the quotation email arrives + the worker logs a job.
- [ ] Log into the admin with `ADMIN_PASSWORD` and confirm leads load.
