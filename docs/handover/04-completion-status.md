# 4. Completion Status

Percentages are engineering estimates from a code read, meant to guide the
handover — not a formal sign-off.

| Metric | Count |
|--------|-------|
| Modules complete | 9 |
| Partial modules | 3 |
| Demo / not built | 2 |
| Overall MVP | ~75% |

## Estimated completeness by area

| Area | Completeness |
|------|--------------|
| Lead capture & estimate | 100% |
| Quotation + PDF | 100% |
| Email (SMTP) | 95% |
| AI enrichment | 90% |
| Admin auth + CMS | 90% |
| Client portal | 55% |
| Calendly / WhatsApp | 60% |
| Background jobs | 20% |
| Docs / tests | 30% |

## Completed & functional

| Feature | Where |
|---------|-------|
| Lead capture (estimate + contact forms) | web + api `leads/` |
| Rule-based pricing + template SRS/market comparison | api `leads/srs.generator.ts` |
| Lead scoring (`score` / `scoreLabel`) | api `leads/lead-score.utils.ts` |
| Quotation pages with 24h token expiry | web + api `quotation/` |
| PDF download (`GET /quotation/:token/pdf`) | api `quotation.pdf.ts` |
| SMTP quotation + admin alert emails | api `mail/` |
| OpenAI enrichment (when key set) | api `ai/` |
| Admin JWT login + protected CRUD | admin + api `auth/` |
| Admin dashboard, leads, portfolio/team/services CMS | admin |
| DB seed + Docker/Railway deploy configs | `prisma/seed.ts`, docker-compose |

## Partial / needs work

| Feature | Gap |
|---------|-----|
| Client portal | Returns lead data for any matching email — no OTP/auth |
| Calendly webhook | Signature verification skipped if signing key unset |
| Admin auth model | Single shared password, no users/roles, JWT in localStorage |
| Project screenshots | Only in static web files — not manageable via CMS/API |

## Demo / not built

| Feature | State |
|---------|-------|
| BullMQ worker pipeline | Only an `example` job; email/AI run inline in API |
| Automated tests | One unit spec (`app.controller.spec.ts`); no e2e |

## Docs contradict the code

The README Phase 2 list marks email, PDF, Calendly, WhatsApp, scoring, auth and
the client dashboard as "not in MVP" — but most now exist. The admin
`SettingsPage.tsx` still says "Coming soon: Admin authentication," which is
already implemented. Update these during handover so they stop misleading the
next team.
