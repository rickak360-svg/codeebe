# 1. Summary & Overview

## What Codeebe is

**Codeebe** is a **Client Decision Platform MVP** for a premium
product-engineering studio (India-focused, INR pricing). It lets:

- **Public visitors** browse portfolio/services, submit project requirements,
  receive **instant estimates**, view **interactive quotations** (SRS, market
  comparison, PDF), and contact the team.
- **Admins** manage **leads**, **portfolio projects**, **team**, and
  **services** via a separate dashboard.
- **Background processing** via Redis/BullMQ exists mainly as a **demo job
  pipeline** today.

## Core flow

1. **Capture** — visitor submits a brief via the estimate or contact form
   (`POST /leads`).
2. **Estimate** — rule-based pricing engine + template SRS and market
   comparison, optionally enriched by OpenAI.
3. **Quotation** — a 24h token link to an interactive quotation page with PDF
   download, emailed to the client.
4. **Convert** — client marks interest / books a meeting (Calendly); admin
   manages the lead pipeline and CMS.

## At a glance

| Metric | Value |
|--------|-------|
| Apps | 4 (web, admin, api, worker) |
| Shared packages | 2 (shared, queue) |
| MVP feature complete | ~75% |
| Open blockers | 4 |

## Repository layout

```
Codeebe/
├── apps/
│   ├── api/       NestJS REST API, Prisma, integrations
│   ├── web/       Next.js public marketing + lead/quotation UX
│   ├── admin/     React (Vite) admin SPA
│   └── worker/    BullMQ job consumer
├── packages/
│   ├── shared/    TypeScript types + HTTP API client
│   └── queue/     BullMQ queue names, job types, Redis config
├── docker-compose.yml          Local Postgres + Redis
├── docker-compose.prod.yml     Production API + worker
├── scripts/setup-env.mjs       Copies .env.example → .env per app
├── pnpm-workspace.yaml
└── package.json                Root scripts (dev, build, db, redis)
```

| App / Package | Purpose | Default port |
|---------------|---------|--------------|
| Web | Public site: landing, estimate, contact, quotation, portal | **3008** (dev) |
| Admin | JWT-protected admin dashboard | 5173 |
| API | NestJS backend, DB, email, AI, webhooks | 3001 |
| Worker | Processes BullMQ jobs | — |
| shared | Shared types + `createApiClient()` | — |
| queue | `QUEUES`, `JOBS`, `getRedisConnection()` | — |

## Module status snapshot

| Area | Owner app | Status |
|------|-----------|--------|
| Lead capture & estimate engine | web + api | Complete |
| Quotation pages + PDF | web + api | Complete |
| Email (SMTP quotation + admin alerts) | api | Complete |
| AI enrichment (OpenAI) | api | Complete |
| Admin auth + CMS (leads/portfolio/team/services) | admin + api | Complete |
| Client portal (email lookup) | web + api | Partial — no auth/OTP |
| WhatsApp / Calendly webhook | api | Partial — optional, unverified |
| Background jobs (BullMQ worker) | worker | Demo only |
| Docs / tests / env examples | repo | Stale / minimal |

## Top handover priorities

1. **Fix Prisma migration drift.** `schema.prisma` has many `Lead` fields
   (quotation token, SRS, score, interestLevel…) missing from the SQL
   migrations. A fresh `pnpm db:migrate` will not match the schema — generate
   and commit a migration before any production deploy.
2. **Reconcile ports & missing env.** Web dev runs on `3008` but docs say
   `3000`, and `apps/web/.env.example` is missing (referenced by
   `pnpm env:setup`). Align both.
3. **Harden auth before production.** Admin uses a single shared password +
   localStorage JWT (falls back to a dev secret). The client portal returns
   lead data for any matching email with no verification.
4. **Update docs & decide the worker's role.** The README Phase 2 section and
   the admin Settings page contradict already-shipped features. Decide whether
   email/AI move to the BullMQ worker or stay inline in the API.

## Quick start (local)

```bash
pnpm install              # install all workspaces
pnpm env:setup            # create per-app .env files from examples
pnpm db:up                # start Postgres (Docker)
pnpm db:migrate           # apply Prisma migrations
pnpm db:seed              # seed projects/team/services
pnpm redis:up             # start Redis (only if using the worker)
pnpm dev                  # run all apps in parallel
```

Ports: web 3008 · admin 5173 · api 3001 · Postgres 5432 · Redis 6379

## Root scripts

| Script | Action |
|--------|--------|
| `pnpm install` | Install all workspaces |
| `pnpm env:setup` | Create app `.env` files from examples |
| `pnpm db:up` / `db:migrate` / `db:seed` | Postgres + Prisma |
| `pnpm redis:up` | Local Redis |
| `pnpm dev` | All apps in parallel (builds queue first) |
| `pnpm dev:api` / `dev:web` / `dev:admin` / `dev:worker` | Individual services |
| `pnpm build` | Build queue + all apps |
