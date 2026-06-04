# Monorepo structure

```
.
├── apps/
│   ├── admin/          # React (Vite) admin dashboard
│   ├── api/            # NestJS backend (enqueues BullMQ jobs)
│   ├── web/            # Next.js public website
│   └── worker/         # BullMQ worker (processes background jobs)
├── packages/
│   ├── queue/          # Shared queue names, job types, Redis config
│   └── shared/         # Shared API client & TypeScript types
├── docker-compose.yml  # Local Postgres + Redis
├── pnpm-workspace.yaml
└── package.json
```

## Request flow

```
web / admin  ──HTTP──►  api (NestJS)
                            │
                            │  BullMQ (Redis)
                            ▼
                         worker
```

1. **Frontends** call REST on `apps/api`.
2. **API** enqueues jobs on shared queues (e.g. `POST /jobs/example`).
3. **Worker** (`apps/worker`) consumes the same queues and runs processors.

## Shared queue package

`@codeebe/queue` defines:

- `QUEUES` — queue names (must match between API and worker)
- `JOBS` — job name constants
- Job payload/result types
- `getRedisConnection()` — Redis options from env

## Adding a new job

1. Add job name to `JOBS` and payload type in `packages/queue`.
2. Register a processor in `apps/worker/src/processors/`.
3. Enqueue from the API with `queue.add(JOBS.YOUR_JOB, payload)`.

## Local Postgres (leads)

```bash
pnpm db:up
pnpm db:migrate
```

Set `DATABASE_URL` in `apps/api/.env` (see `apps/api/.env.example`).

## Local Redis (optional jobs demo)

```bash
pnpm redis:up
```

Or set `REDIS_URL` in `apps/api/.env` and `apps/worker/.env` (see `pnpm env:setup`).

## Environment files

Each service loads its own `.env` from its app directory:

| Path | Tool |
|------|------|
| `apps/api/.env` | dotenv in `src/env.ts` |
| `apps/web/.env` | Next.js built-in |
| `apps/admin/.env` | Vite `envDir` |
| `apps/worker/.env` | dotenv in `src/env.ts` |

Run `pnpm env:setup` from the repo root to create all `.env` files from examples.
