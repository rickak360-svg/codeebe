# 5. Blockers, Data & Config

Known issues to resolve before production, plus the database schema, external
integrations and environment variables the next team needs.

## High-priority blockers

### B1 · Prisma migration drift (blocking prod)

`schema.prisma` defines many `Lead` fields — `srs`, `marketComparison`,
`quotationToken`, `tokenExpiresAt`, `score`, `interestLevel`,
`calendlyEventUri` — that are **absent from the SQL migrations** (only 4
migrations exist; the Lead one covers basic fields + estimate JSON only). A
fresh `pnpm db:migrate` on a clean DB will not match the schema, breaking lead
creation. Someone has been relying on `prisma db push`.
**Fix:** generate and commit a real migration.

### B2 · Port & env mismatch

Web dev runs on `3008` (`apps/web/package.json`) but README/DEPLOYMENT say
`3000`. `apps/web/.env.example` is missing though referenced by
`scripts/setup-env.mjs`, so `pnpm env:setup` skips web. `mail.service.ts`
defaults `WEB_URL` to `:3000` while `leads.service.ts` uses `:3008` — quotation
links can point to the wrong port.

## All known issues

| # | Issue | Severity |
|---|-------|----------|
| 1 | Prisma migration drift on Lead fields | High |
| 2 | Web port 3008 vs 3000 + missing web `.env.example` | High |
| 3 | Admin: shared password, 7-day JWT in localStorage, no RBAC | Security |
| 4 | JWT falls back to `dev-insecure-secret-change-me` if unset | Security |
| 5 | Client portal returns leads for any email, no verification | Security |
| 6 | Calendly webhook accepted unverified if signing key unset | Security |
| 7 | Worker unused — email/AI run inline in API process | Architecture |
| 8 | Screenshots live in static files, not CMS/DB | Product |
| 9 | Duplicate portfolio routes (`/portfolio` and `/projects`) | Product |
| 10 | README Phase 2 + admin Settings page are stale | Docs |

## Database schema — `prisma/schema.prisma`

### Models

- **Lead** — core entity: contact, project brief, pipeline
  (`status`/`interestLevel`/`score`), quotation
  (`estimate`/`srs`/`marketComparison`/`quotationToken`).
- **ShowcaseProject** — portfolio CMS (`slug`, `category`, `techStack[]`,
  `overview`, `keyFeatures[]`, `costRange`, `published`).
- **TeamMember** — team CMS (`name`, `role`, `bio`, links, `published`).
- **ServiceItem** — services CMS (`kind`: card|badge, `title`, `published`).

### Enums

- `LeadStatus`: new · contacted · meeting_scheduled · proposal_sent ·
  converted · lost
- `InterestLevel`: none · interested · meeting_requested
- `LeadSource`: estimate · contact
- `ServiceKind`: card · badge

### Migrations & seed

4 migrations: `init_leads`, `showcase_projects`, `team_members`,
`service_items`. Seed: 13 projects, 4 team members, 6 service cards + 7 trust
badges.

## External integrations

| Integration | Config | Status |
|-------------|--------|--------|
| PostgreSQL | `DATABASE_URL` | Required |
| Redis / BullMQ | `REDIS_URL`, `REDIS_ENABLED` | Optional (default off locally) |
| SMTP email | `SMTP_*`, `MAIL_ENABLED`, `ADMIN_NOTIFY_EMAIL` | Optional |
| OpenAI | `OPENAI_API_KEY`, `OPENAI_MODEL`, `AI_ENABLED` | Optional, template fallback |
| Twilio WhatsApp | `WHATSAPP_*`, `TWILIO_*` | Optional, default off |
| Calendly | `NEXT_PUBLIC_CALENDLY_URL`, `CALENDLY_WEBHOOK_SIGNING_KEY` | Link + webhook |

> No payment gateway is integrated anywhere in the codebase.

## Environment variables (per app, via `pnpm env:setup`)

**API — `apps/api/.env.example`**

`API_PORT`, `DATABASE_URL`, `WEB_ORIGIN`/`ADMIN_ORIGIN` (CORS), `REDIS_*`,
`WEB_URL`, `SMTP_*`/`MAIL_ENABLED`, `OPENAI_*`/`AI_ENABLED`, `ADMIN_PASSWORD`,
`JWT_SECRET`, `WHATSAPP_*`/`TWILIO_*`, `CALENDLY_WEBHOOK_SIGNING_KEY`

**Web — MISSING `.env.example` (needs creating)**

Expected: `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`),
`NEXT_PUBLIC_CALENDLY_URL`, `NEXT_PUBLIC_WHATSAPP_URL`, optional
`NEXT_PUBLIC_UPWORK_URL`/`NEXT_PUBLIC_LINKEDIN_URL`

**Admin — `apps/admin/.env.example`**

`VITE_API_URL` (default `http://localhost:3001`), `VITE_WEB_URL` (default
`http://localhost:3008`)

**Worker — `apps/worker/.env.example`**

`REDIS_URL` and optional `REDIS_HOST`/`REDIS_PORT`/`REDIS_PASSWORD`
