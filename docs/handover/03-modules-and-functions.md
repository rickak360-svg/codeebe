# 3. Modules, Submodules & Functions

Feature breakdown across the four apps and two shared packages.

## Request flow

```
web / admin  ──HTTP──►  api (NestJS)
                            │
                            │  BullMQ (Redis) — optional
                            ▼
                         worker
```

**Shared packages**

- `packages/shared` — TS types + `createApiClient()` typed fetch client used by
  web & admin.
- `packages/queue` — `QUEUES`, `JOBS`, `getRedisConnection()` (Upstash TLS
  aware).

---

## API — `apps/api/src` (NestJS)

Modules are registered in `app.module.ts`. Admin routes are guarded by a JWT
Bearer `admin.guard.ts`.

| Module | Routes | Access |
|--------|--------|--------|
| App | `GET /` · `GET /health` | Public |
| Auth | `POST /auth/login` | Public (rate-limited) |
| Leads | `POST /leads` · `GET/PATCH /leads/*` | Public create · Admin reads/updates |
| Quotation | `GET /quotation/:token` · `/pdf` · `POST /interest` · `/meeting` | Public (token) |
| Projects | `GET /projects` · `GET /projects/:slug` | Public |
| Projects (admin) | CRUD `/admin/projects` | Admin JWT |
| Team | `GET /team` · CRUD `/admin/team` | Public / Admin |
| Services | `GET /services` · CRUD `/admin/services` | Public / Admin |
| Admin | `GET /admin/overview` | Admin JWT |
| Clients | `POST /clients/portal` | Public (email lookup) |
| Webhooks | `POST /webhooks/calendly` | Signature optional |
| Jobs | `POST /jobs/example` · `GET /jobs/:id` | Public (if Redis on) |

### Submodules & key functions

**`leads/` — core business logic**

- `leads.service.ts` — lead creation, pricing engine, SRS/market templates,
  quotation token, async AI enrichment + email/WhatsApp fan-out
- `srs.generator.ts` — template SRS + market comparison from project
  type/features
- `lead-score.utils.ts` — hot/warm/cold scoring (0–100)
- `estimate.utils.ts` — INR formatting helpers

**`quotation/` — token access & PDF**

- `quotation.service.ts` — token-based access, interest tracking, PDF buffer
- `quotation.pdf.ts` — PDFKit document builder

**`mail/` — SMTP**

- `mail.service.ts` — rich HTML quotation emails + admin interest notifications

**`ai/` — OpenAI enrichment**

- `ai.service.ts` — JSON quotation enrichment; falls back to templates if
  disabled/unset

**`auth/` — admin login**

- `auth.service.ts` — single shared-password JWT login
- `admin.guard.ts` — JWT Bearer guard for admin routes

**`notifications/` · `webhooks/` · `clients/` · `admin/`**

- `whatsapp.service.ts` — Twilio admin/client alerts
- `webhooks.controller.ts` — Calendly `invitee.created` → update lead
- `clients.service.ts` — email-based portal lookup
- `admin.service.ts` — dashboard aggregate stats

**`projects/` · `team/` · `services/` — CMS services**

- `projects.service.ts` — published + admin CRUD for showcase projects
- `team.service.ts` — published + admin CRUD for team
- `services.service.ts` — published cards/badges + admin CRUD

---

## Web — `apps/web/src/app` (Next.js)

| Route | Feature |
|-------|---------|
| `/` | Landing: hero wizard, bento, expertise, process, portfolio grid, FAQ |
| `/about` | Mission / values / process |
| `/services` | Services grid, tech stack, FAQ (API + static fallback) |
| `/portfolio` | Primary portfolio listing (main nav) |
| `/projects` · `/projects/[slug]` | Alternate grid + project detail with screenshot modal |
| `/estimate` | Full estimate form → creates lead |
| `/contact` | Contact form → creates lead (`source: contact`) |
| `/quotation/[token]` | Interactive quotation viewer + interest/meeting + PDF |
| `/portal` | Client portal — email lookup of past leads/quotations |

- **`components/`** — landing (hero wizard, brief modal), estimate, contact
- **`data/`** — static fallback for projects/team/services/pricing/process
- **`lib/`** — API wrappers w/ fallback + `analyzeRequirement.ts` (client-side
  keyword analysis)

---

## Admin — `apps/admin/src` (Vite + React)

| Route | Page | Feature |
|-------|------|---------|
| `/login` | LoginPage | Password → JWT in localStorage |
| `/` | DashboardPage | Stats overview from `/admin/overview` |
| `/leads` | LeadsPage / LeadsDashboard | List, view details, update status |
| `/portfolio` | ProjectsPage | CRUD showcase projects |
| `/team` | TeamPage | CRUD team members |
| `/services` | ServicesPage | CRUD service cards + trust badges |
| `/settings` | SettingsPage | Dev env info + "coming soon" (stale) |

Auth: `lib/auth.ts` (localStorage token) · `lib/api.ts` (Bearer header + 401
redirect).

---

## Worker — `apps/worker/src` (BullMQ)

Queue: `codeebe-default`.

- `example` job → `processors/example.processor.ts` logs a message and returns
  a processed result.

> No production jobs enqueue email/AI work today — those run inline in the API
> process (`void this.enrichAndNotify(...)`). The worker is a demo scaffold.
