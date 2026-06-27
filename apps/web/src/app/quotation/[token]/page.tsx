"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import type { QuotationData } from "@codeebe/shared";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { BrandLogo } from "@/components/brand/BrandLogo";

function fmtInr(n: number) {
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1).replace(/\.0$/, "")}L`;
  if (n >= 1_000) return `₹${(n / 1_000).toFixed(0)}K`;
  return `₹${n}`;
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/* ── Loading / Empty states ─────────────────────────────────────────────── */
function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
        <MaterialIcon name="progress_activity" className="!text-[40px] text-[#ff6b00]" />
      </motion.div>
    </div>
  );
}

function EmptyState({ icon, title, description, cta }: {
  icon: string; title: string; description: string; cta: { label: string; href: string };
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--background)] px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04]">
        <MaterialIcon name={icon} className="!text-[32px] text-white/30" />
      </span>
      <h1 className="text-xl font-bold text-white/80">{title}</h1>
      <p className="max-w-sm text-sm text-white/45">{description}</p>
      <a href={cta.href} className="mt-2 rounded-xl bg-[#ff6b00] px-5 py-2.5 text-sm font-semibold text-[#1a0a00] hover:bg-[#ff8533]">
        {cta.label}
      </a>
    </div>
  );
}

/* ── Card wrapper ───────────────────────────────────────────────────────── */
function Card({ title, icon, children, className = "" }: { title: string; icon: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 ${className}`}>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff6b00]/12">
          <MaterialIcon name={icon} className="!text-[15px] text-[#ff6b00]" />
        </span>
        <h3 className="text-sm font-semibold text-white/80">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ── Section label ──────────────────────────────────────────────────────── */
function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff6b00] text-[12px] font-bold text-[#1a0a00]">
        {number}
      </span>
      <h2 className="text-lg font-bold text-white">{label}</h2>
      <div className="h-px flex-1 bg-white/[0.06]" />
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────────────────────── */
export default function QuotationPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<QuotationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [actionState, setActionState] = useState<"idle" | "loading" | "done">("idle");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    if (!token) return;
    api.getQuotation(token)
      .then(setData)
      .catch((err: Error) => {
        if (err.message.includes("410") || err.message.toLowerCase().includes("expired")) setExpired(true);
        else setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleAction(type: "interest" | "meeting") {
    if (!token || actionState !== "idle") return;
    setActionState("loading");
    try {
      const res = type === "meeting" ? await api.requestMeeting(token) : await api.markInterested(token);
      setActionMessage(res.message);
      setActionState("done");
      if (data) setData({ ...data, interestLevel: type === "meeting" ? "meeting_requested" : "interested" });
    } catch { setActionState("idle"); }
  }

  if (loading) return <Spinner />;
  if (expired) return <EmptyState icon="schedule" title="This link has expired" description="Quotation links are valid for 24 hours. Submit a new brief to receive a fresh one." cta={{ label: "Submit a new brief", href: "/" }} />;
  if (error || !data) return <EmptyState icon="error_outline" title="Quotation not found" description="This link may be invalid. Please check your email or submit a new brief." cta={{ label: "Go home", href: "/" }} />;

  const { estimate, srs, marketComparison } = data;
  const isInterested = data.interestLevel !== "none";

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[var(--background)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <BrandLogo variant="header" />
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1.5 text-xs text-white/35 sm:flex">
              <MaterialIcon name="schedule" className="!text-[13px]" />
              Expires {fmtDate(data.expiresAt)}
            </div>
            <a
              href={api.quotationPdfUrl(token!)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white/80"
            >
              <MaterialIcon name="download" className="!text-[14px]" />
              PDF
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-10 px-4 py-8 sm:px-6 sm:py-12">

        {/* ── Hero price banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-[#ff6b00]/20 bg-gradient-to-br from-[#1f1209] via-[#150d04] to-[#0d0d0d]"
        >
          <div className="p-6 sm:p-8">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#ff6b00]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#ff6b00]">
                Project Quotation
              </span>
              <span className="text-xs text-white/30">{fmtDate(data.createdAt)}</span>
            </div>

            <h1 className="mb-0.5 text-2xl font-bold text-white sm:text-3xl">{data.projectType}</h1>
            <p className="mb-6 text-sm text-white/40">{data.fullName} · {estimate.suggestedPackage}</p>

            {/* Price */}
            <div className="mb-6 flex flex-wrap items-end gap-6">
              <div>
                <p className="mb-1 text-xs text-white/35">Estimated Investment</p>
                <p className="text-4xl font-extrabold leading-none text-[#ff6b00] sm:text-5xl">
                  {fmtInr(estimate.minPrice)}
                  <span className="text-2xl text-white/40 sm:text-3xl"> – {fmtInr(estimate.maxPrice)}</span>
                </p>
                <p className="mt-2 text-xs text-white/30">Final cost confirmed after discovery call</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-white/55">
                  <MaterialIcon name="schedule" className="!text-[15px] text-[#ff6b00]" />
                  {estimate.timelineLabel}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/55">
                  <MaterialIcon name="category" className="!text-[15px] text-[#ff6b00]" />
                  {data.features.length} feature{data.features.length !== 1 ? "s" : ""} selected
                </div>
                <div className="flex items-center gap-2 text-sm text-white/55">
                  <MaterialIcon name="code" className="!text-[15px] text-[#ff6b00]" />
                  {srs.techStack.frontend}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              {actionState === "done" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-400"
                >
                  <MaterialIcon name="check_circle" className="!text-[16px]" />
                  {actionMessage}
                </motion.div>
              ) : (
                <>
                  <button
                    type="button"
                    disabled={actionState === "loading" || isInterested}
                    onClick={() => handleAction("meeting")}
                    className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-5 py-2.5 text-sm font-semibold text-[#1a0a00] shadow-[0_6px_24px_-6px_rgba(255,107,0,0.5)] transition-colors hover:bg-[#ff8533] disabled:opacity-50"
                  >
                    {actionState === "loading"
                      ? <MaterialIcon name="progress_activity" className="animate-spin !text-[15px]" />
                      : <MaterialIcon name="calendar_today" className="!text-[15px]" />
                    }
                    Schedule a Discovery Call
                  </button>
                  <button
                    type="button"
                    disabled={actionState === "loading" || isInterested}
                    onClick={() => handleAction("interest")}
                    className="flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 disabled:opacity-50"
                  >
                    <MaterialIcon name="thumb_up" className="!text-[15px]" />
                    I'm Interested
                  </button>
                </>
              )}
            </div>

            {isInterested && actionState !== "done" && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-green-400">
                <MaterialIcon name="check_circle" className="!text-[13px]" />
                {data.interestLevel === "meeting_requested"
                  ? "Meeting requested — our team will contact you soon."
                  : "You've shown interest — our team will reach out shortly."}
              </p>
            )}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            SECTION 1: PROJECT SUMMARY
        ══════════════════════════════════════════════════════ */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <SectionLabel number="1" label="Project Summary" />

          <div className="space-y-4">
            {/* Overview */}
            <Card title="Project Overview" icon="description">
              <p className="text-sm leading-relaxed text-white/60">{srs.overview}</p>
            </Card>

            {/* Features + Tech Stack side by side on desktop */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card title="Selected Features" icon="featured_play_list">
                {data.features.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {data.features.map((f) => (
                      <span key={f} className="rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/8 px-3 py-1 text-[11px] text-white/70">
                        {f}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white/40">Core scope — no extra features selected.</p>
                )}
              </Card>

              <Card title="Recommended Tech Stack" icon="code">
                <div className="space-y-2">
                  {Object.entries(srs.techStack).map(([key, val]) => (
                    <div key={key} className="flex items-start gap-2">
                      <span className="w-20 shrink-0 pt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/25">{key}</span>
                      <span className="text-sm text-white/65">{val}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Scope */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card title="In Scope" icon="task_alt">
                <ul className="space-y-2">
                  {srs.scope.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <MaterialIcon name="check" className="mt-0.5 !text-[13px] shrink-0 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card title="Out of Scope" icon="remove_circle_outline">
                <ul className="space-y-2">
                  {srs.scope.outOfScope.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <MaterialIcon name="close" className="mt-0.5 !text-[13px] shrink-0 text-red-400/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Functional Requirements */}
            <Card title="Functional Requirements" icon="list_alt">
              <div className="space-y-3">
                {srs.functionalRequirements.map((req) => (
                  <div key={req.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="rounded bg-[#ff6b00]/15 px-1.5 py-0.5 font-mono text-[10px] text-[#ff6b00]">{req.id}</span>
                      <span className="text-sm font-semibold text-white/80">{req.title}</span>
                      <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        req.priority === "High" ? "bg-red-500/15 text-red-400" :
                        req.priority === "Medium" ? "bg-amber-500/15 text-amber-400" :
                        "bg-green-500/15 text-green-400"
                      }`}>{req.priority}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-white/45">{req.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Non-functional requirements */}
            <Card title="Non-Functional Requirements" icon="verified_user">
              <div className="grid gap-3 sm:grid-cols-2">
                {srs.nonFunctionalRequirements.map((nfr, i) => (
                  <div key={i} className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-3">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#ff6b00]/70">{nfr.category}</p>
                    <p className="text-xs leading-relaxed text-white/55">{nfr.requirement}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* What Codeebe provides + Pricing notes */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card title="What Codeebe Provides" icon="check_circle">
                <ul className="space-y-2">
                  {estimate.codeebeProvides.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                      <MaterialIcon name="check" className="mt-0.5 !text-[14px] shrink-0 text-[#ff6b00]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card title="Pricing Notes" icon="info">
                <ul className="space-y-2">
                  {estimate.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/55">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b00]/50" />
                      {note}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Delivery Roadmap */}
            <Card title="Delivery Roadmap" icon="alt_route">
              <div className="space-y-0">
                {srs.phases.map((phase, i) => (
                  <div key={phase.phase} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff6b00]/15 text-[13px] font-bold text-[#ff6b00]">
                        {phase.phase}
                      </div>
                      {i < srs.phases.length - 1 && (
                        <div className="mt-1 w-px flex-1 bg-white/[0.06]" style={{ minHeight: "2rem" }} />
                      )}
                    </div>
                    <div className="pb-5">
                      <div className="mb-1 flex flex-wrap items-baseline gap-2">
                        <p className="font-semibold text-white/85">{phase.name}</p>
                        <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/40">{phase.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.deliverables.map((d) => (
                          <span key={d} className="rounded border border-white/[0.07] px-2 py-0.5 text-[11px] text-white/45">{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Final deliverables */}
            <Card title="Final Deliverables" icon="inventory_2">
              <div className="grid gap-2 sm:grid-cols-2">
                {srs.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <MaterialIcon name="check_box" className="mt-0.5 !text-[14px] shrink-0 text-[#ff6b00]" />
                    {d}
                  </div>
                ))}
              </div>
            </Card>

            {/* Assumptions */}
            <Card title="Assumptions & Dependencies" icon="lightbulb">
              <ul className="space-y-2">
                {srs.assumptions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/55">
                    <MaterialIcon name="arrow_right" className="mt-0.5 !text-[15px] shrink-0 text-white/25" />
                    {a}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            SECTION 2: MARKET COMPARISON
        ══════════════════════════════════════════════════════ */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <SectionLabel number="2" label="Market Comparison" />

          <div className="space-y-4">
            <p className="text-sm text-white/45">{marketComparison.summary}</p>

            {/* Comparison table — what market offers vs Codeebe */}
            <div className="overflow-hidden rounded-xl border border-white/[0.06]">
              {/* Column headers */}
              <div className="grid grid-cols-3 border-b border-white/[0.06] bg-white/[0.02]">
                {marketComparison.competitors.map((c) => (
                  <div key={c.name} className="border-r border-white/[0.06] p-4 last:border-r-0">
                    <p className="text-[11px] font-semibold text-white/50">{c.name}</p>
                  </div>
                ))}
                <div className="p-4">
                  <span className="inline-block rounded-full bg-[#ff6b00] px-2.5 py-0.5 text-[10px] font-bold text-[#1a0a00]">
                    Codeebe ✓
                  </span>
                </div>
              </div>

              {/* Price row */}
              <div className="grid grid-cols-3 border-b border-white/[0.06] bg-white/[0.015]">
                {marketComparison.competitors.map((c) => (
                  <div key={c.name} className="border-r border-white/[0.06] p-4 last:border-r-0">
                    <p className="text-[10px] text-white/30">Price</p>
                    <p className="mt-0.5 text-base font-bold text-white/60">{c.priceRange}</p>
                  </div>
                ))}
                <div className="p-4">
                  <p className="text-[10px] text-white/30">Price</p>
                  <p className="mt-0.5 text-base font-bold text-[#ff6b00]">{marketComparison.codeebe.priceRange}</p>
                </div>
              </div>

              {/* Timeline row */}
              <div className="grid grid-cols-3 border-b border-white/[0.06]">
                {marketComparison.competitors.map((c) => (
                  <div key={c.name} className="border-r border-white/[0.06] p-4 last:border-r-0">
                    <p className="text-[10px] text-white/30">Timeline</p>
                    <p className="mt-0.5 text-xs text-amber-400/70">{c.timeline}</p>
                  </div>
                ))}
                <div className="p-4">
                  <p className="text-[10px] text-white/30">Timeline</p>
                  <p className="mt-0.5 text-xs text-green-400">{marketComparison.codeebe.timeline}</p>
                </div>
              </div>

              {/* What they provide / What we provide */}
              <div className="grid grid-cols-3">
                {marketComparison.competitors.map((c) => (
                  <div key={c.name} className="border-r border-white/[0.06] p-4 last:border-r-0">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-400/60">Drawbacks</p>
                    <ul className="space-y-2">
                      {c.gaps.map((g, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] leading-snug text-red-400/70">
                          <MaterialIcon name="close" className="mt-0.5 !text-[11px] shrink-0" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="bg-[#ff6b00]/[0.04] p-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-green-400/70">What we deliver</p>
                  <ul className="space-y-2">
                    {marketComparison.codeebe.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[11px] leading-snug text-green-400">
                        <MaterialIcon name="check" className="mt-0.5 !text-[11px] shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Why Codeebe */}
            <Card title="Why Choose Codeebe?" icon="star">
              <div className="grid gap-3 sm:grid-cols-2">
                {marketComparison.whyCodeebe.map((w, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 text-sm text-white/65">
                    <MaterialIcon name="arrow_forward" className="mt-0.5 !text-[14px] shrink-0 text-[#ff6b00]" />
                    {w}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-[#ff6b00]/15 bg-gradient-to-br from-[#1f1209]/60 to-transparent p-6 text-center"
        >
          <p className="mb-1 text-sm font-semibold text-white/70">Ready to move forward?</p>
          <p className="mb-5 text-xs text-white/35">Schedule a free 30-minute discovery call — no commitment required.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              disabled={actionState === "loading" || isInterested || actionState === "done"}
              onClick={() => handleAction("meeting")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6b00] px-6 py-3 text-sm font-semibold text-[#1a0a00] shadow-[0_8px_28px_-8px_rgba(255,107,0,0.5)] transition-colors hover:bg-[#ff8533] disabled:opacity-50 sm:w-auto"
            >
              <MaterialIcon name="calendar_today" className="!text-[15px]" />
              Schedule Discovery Call
            </button>
            <a
              href={api.quotationPdfUrl(token!)}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 sm:w-auto"
            >
              <MaterialIcon name="download" className="!text-[15px]" />
              Download PDF
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
