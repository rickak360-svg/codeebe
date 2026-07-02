# 2. Tech Stack

Everything used across the Codeebe monorepo. All apps are TypeScript on
Node.js 20+, managed with a pnpm 10 workspace.

## Foundations

| Concern | Technology |
|---------|-----------|
| Language | TypeScript (all apps & packages) |
| Runtime | Node.js 20+ (`node:20-slim` images) |
| Package manager | pnpm 10.8.0 (workspace monorepo) |
| Database | PostgreSQL 16 (via Prisma 6.9) |

## Frontend

| App | Framework | Key libraries |
|-----|-----------|---------------|
| Web (public site) | Next.js 16.2.6 (App Router) | React 19, Tailwind CSS 4, Framer Motion 12, `@codeebe/shared` |
| Admin (dashboard) | Vite 8 + React 19 | `react-router-dom` 7, `@codeebe/shared` |

## Backend (API)

| Concern | Technology | Notes |
|---------|-----------|-------|
| Framework | NestJS 11 (Express) | REST API, port 3001 |
| ORM | Prisma 6.9 | PostgreSQL 16 |
| Validation | class-validator / class-transformer | DTO validation pipes |
| Rate limiting | `@nestjs/throttler` | Login + public endpoints |
| Auth | `@nestjs/jwt` | Single shared-password admin login |
| Queue | BullMQ 5.40 + `@nestjs/bullmq` | Conditional on `REDIS_ENABLED` |
| Email | nodemailer | SMTP quotation + admin notifications |
| AI | openai SDK | `gpt-4o-mini` default, template fallback |
| PDF | pdfkit | Quotation document generation |
| WhatsApp | twilio | Optional admin/client alerts |

## External integrations

**Required**

- **PostgreSQL** (`DATABASE_URL`) — backs leads and all CMS content.

**Optional (feature-flagged)** — each gated by an `*_ENABLED` flag or presence
of keys; the app degrades gracefully if unconfigured:

- Redis / BullMQ
- SMTP email
- OpenAI
- Twilio WhatsApp
- Calendly

> No payment gateway is integrated anywhere in the codebase.

## Infrastructure & tooling

| Purpose | Local | Production |
|---------|-------|------------|
| Postgres | Docker Compose (5432) | Neon |
| Redis | Docker Compose (6379) | Upstash (TLS) |
| Web / Admin hosting | `pnpm dev` | Vercel |
| API / Worker hosting | `pnpm dev` | Railway / Render / Docker |
| Deploy config | `docker-compose.yml` | `docker-compose.prod.yml`, `railway.toml` |
| Lint / test | ESLint per app | Jest in API (minimal) |

> **Testing is thin.** Only one test spec exists
> (`apps/api/src/app.controller.spec.ts`). No e2e coverage — treat this as a
> gap when planning any refactor.
