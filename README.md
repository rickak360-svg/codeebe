# Codeebe

pnpm monorepo with apps and shared packages.

| App | Path | Stack | Port |
|-----|------|-------|------|
| Web | `apps/web` | Next.js | 3000 |
| Admin | `apps/admin` | React (Vite) | 5173 |
| API | `apps/api` | NestJS | 3001 |
| Worker | `apps/worker` | BullMQ | — |

| Package | Path | Role |
|---------|------|------|
| shared | `packages/shared` | Types + API client for web & admin |
| queue | `packages/queue` | BullMQ queues, jobs, Redis config |

**Web** and **admin** call the **API**. The **API** enqueues background jobs; the **worker** processes them via **Redis** + **BullMQ**.

## Client Decision Platform MVP

Public visitors can browse projects, submit requirements, get instant estimates, and contact Codeebe. Admins can view and update leads stored in **PostgreSQL** (via Prisma in the API).

### Quick start

```bash
pnpm install
pnpm env:setup   # creates apps/*/.env from each .env.example
pnpm db:up       # Postgres on :5432
pnpm db:migrate  # apply Prisma migrations
pnpm dev:api    # terminal 1 — http://localhost:3001
pnpm dev:web    # terminal 2 — http://localhost:3000
pnpm dev:admin  # terminal 3 — http://localhost:5173
```

Or run everything (requires Redis for worker/jobs demo):

```bash
pnpm redis:up   # optional, for BullMQ demo
pnpm dev
```

### Try the MVP flow

1. Open **http://localhost:3000** — landing page, projects, comparison, process.
2. **http://localhost:3000/estimate** — fill the form and submit for an instant estimate.
3. **http://localhost:3000/contact** — contact form (also creates a lead).
4. **http://localhost:5173** — admin dashboard (leads, project showcase, settings).

### API endpoints (leads)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/leads` | Create lead + return estimate |
| `GET` | `/leads` | List all leads |
| `GET` | `/leads/:id` | Get one lead |
| `PATCH` | `/leads/:id/status` | Update status (`{ "status": "contacted" }`) |
| `GET` | `/projects` | List published showcase projects (public web) |
| `GET` | `/projects/:slug` | One published project |
| `GET` | `/admin/overview` | Dashboard stats |
| `GET` | `/admin/projects` | List all projects (admin) |
| `POST` | `/admin/projects` | Create showcase project |
| `PATCH` | `/admin/projects/:id` | Update project |
| `DELETE` | `/admin/projects/:id` | Delete project |

Existing routes unchanged: `GET /`, `GET /health`, `POST /jobs/example`, `GET /jobs/:id`.

### Environment

Each app has its own `.env` (see `.env.example` in that app folder):

| App | Env file | Example |
|-----|----------|---------|
| API | `apps/api/.env` | `apps/api/.env.example` |
| Web | `apps/web/.env` | `apps/web/.env.example` |
| Admin | `apps/admin/.env` | `apps/admin/.env.example` |
| Worker | `apps/worker/.env` | `apps/worker/.env.example` |

```bash
pnpm env:setup   # copy all .env.example → .env (skips existing files)
```

| Variable | App | Default |
|----------|-----|---------|
| `DATABASE_URL` | API | `postgresql://codeebe:codeebe@localhost:5432/codeebe` |
| `API_PORT`, `REDIS_*`, `REDIS_ENABLED` | API | `3001`, local Redis |
| `NEXT_PUBLIC_API_URL`, Calendly, WhatsApp | Web | `http://localhost:3001` |
| `VITE_API_URL` | Admin | `http://localhost:3001` |
| `REDIS_URL` | Worker | `redis://localhost:6379` |

## Prerequisites

- Node.js 20+ (see `.nvmrc`)
- [pnpm](https://pnpm.io/) 10+
- [Docker](https://www.docker.com/) (recommended, for local Postgres and Redis)

## Setup

```bash
pnpm install
pnpm env:setup   # apps/api, web, admin, worker each get a .env
pnpm db:up       # starts Postgres on :5432
pnpm db:migrate  # Prisma migrations for leads
pnpm redis:up    # starts Redis on :6379 (optional)
```

## Development

Run all services (including worker):

```bash
pnpm dev
```

Or individually:

```bash
pnpm dev:api      # http://localhost:3001
pnpm dev:worker   # BullMQ consumer
pnpm dev:web      # http://localhost:3000
pnpm dev:admin    # http://localhost:5173
```

**Database:** Leads require Postgres. Run `pnpm db:up` and `pnpm db:migrate`, and set `DATABASE_URL` in `apps/api/.env`.

**Redis not running?** Start it with `pnpm redis:up`, or set `REDIS_ENABLED=false` in `apps/api/.env` and restart the API — leads work without Redis; only the `/jobs` demo needs it.

### Try a background job

With API + worker + Redis running:

```bash
curl -X POST http://localhost:3001/jobs/example \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Hello worker\"}"
```

Check job status (replace `{jobId}`):

```bash
curl http://localhost:3001/jobs/{jobId}
```

The worker logs the job when it processes it.

### Example: create a lead via curl

```bash
curl -X POST http://localhost:3001/leads \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"+919999999999\",\"projectType\":\"Business Website\",\"description\":\"Need a company site\",\"features\":[\"SEO Setup\",\"Blog/CMS\"],\"timeline\":\"Standard: 3-5 weeks\",\"budgetRange\":\"₹50,000 - ₹1,00,000\"}"
```

## Structure

See [MONOREPO_STRUCTURE.md](./MONOREPO_STRUCTURE.md).

## Phase 2 (not in MVP)

- Email notifications
- PDF quotations
- Calendly webhooks
- WhatsApp notifications
- Lead scoring
- Admin authentication
- Client dashboard
