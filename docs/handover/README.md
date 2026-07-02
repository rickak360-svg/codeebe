# Codeebe — Knowledge Transfer (KT) Handover

This folder is the handover pack for the Codeebe monorepo. Read it in order.

| # | Doc | What it covers |
|---|-----|----------------|
| 1 | [01-summary.md](./01-summary.md) | Overview, the 4-step product flow, at-a-glance stats, module status snapshot, top priorities, quick start |
| 2 | [02-tech-stack.md](./02-tech-stack.md) | Languages, frontend/backend frameworks, database, integrations, infra & tooling |
| 3 | [03-modules-and-functions.md](./03-modules-and-functions.md) | Every app broken into modules → submodules → routes → key functions |
| 4 | [04-completion-status.md](./04-completion-status.md) | What is complete, partial, and not built |
| 5 | [05-blockers-data-config.md](./05-blockers-data-config.md) | Ranked known issues, DB schema, integrations, env vars |

## TL;DR

**Codeebe** is a **Client Decision Platform MVP** for a product-engineering
studio. A public Next.js site captures a project brief → the NestJS/Prisma/
Postgres API returns a rule-based estimate + SRS/market comparison (optionally
OpenAI-enriched) → a 24h-token interactive quotation page with PDF, emailed to
the client → a React admin manages the lead pipeline and CMS. A BullMQ worker
exists but is currently a demo scaffold.

- **~75% MVP feature complete.**
- **Top blocker:** Prisma migration drift — the `Lead` model in `schema.prisma`
  has many fields missing from the SQL migrations, so a fresh `db:migrate` will
  not match the schema. Fix before any production deploy.
- Other priorities: web port `3008` vs documented `3000` + missing
  `apps/web/.env.example`; harden admin auth and the client portal; decide the
  worker's role; update stale README/Settings docs.

> Status figures are engineering estimates from a code read to guide handover —
> not a formal sign-off.
