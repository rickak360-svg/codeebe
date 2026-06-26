"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import type { QuotationData } from "@codeebe/shared";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { BrandLogo } from "@/components/brand/BrandLogo";

function formatInr(n: number) {
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1).replace(/\.0$/, "")}L`;
  if (n >= 1_000) return `₹${(n / 1_000).toFixed(0)}K`;
  return `₹${n}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function QuotationPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<QuotationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [actionState, setActionState] = useState<"idle" | "loading" | "done">("idle");
  const [actionMessage, setActionMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"estimate" | "srs" | "market" | "roadmap">("estimate");

  useEffect(() => {
    if (!token) return;
    api.getQuotation(token)
      .then(setData)
      .catch((err: Error) => {
        if (err.message.includes("410") || err.message.toLowerCase().includes("expired")) {
          setExpired(true);
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleAction(type: "interest" | "meeting") {
    if (!token || actionState !== "idle") return;
    setActionState("loading");
    try {
      const res = type === "meeting"
        ? await api.requestMeeting(token)
        : await api.markInterested(token);
      setActionMessage(res.message);
      setActionState("done");
      if (data) setData({ ...data, interestLevel: type === "meeting" ? "meeting_requested" : "interested" });
    } catch {
      setActionState("idle");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <MaterialIcon name="progress_activity" className="!text-[40px] text-[#ff6b00]" />
        </motion.div>
      </div>
    );
  }

  if (expired) {
    return (
      <EmptyState
        icon="schedule"
        title="This link has expired"
        description="Quotation links are valid for 24 hours. Submit a new project brief to receive a fresh quotation."
        cta={{ label: "Submit a new brief", href: "/" }}
      />
    );
  }

  if (error || !data) {
    return (
      <EmptyState
        icon="error_outline"
        title="Quotation not found"
        description="This link may be invalid. Please check the email you received or submit a new brief."
        cta={{ label: "Go home", href: "/" }}
      />
    );
  }

  const { estimate, srs, marketComparison } = data;
  const isInterested = data.interestLevel !== "none";

  const TABS = [
    { id: "estimate", label: "Estimate",    icon: "payments"       },
    { id: "srs",      label: "Requirements",icon: "description"    },
    { id: "market",   label: "Comparison",  icon: "leaderboard"    },
    { id: "roadmap",  label: "Roadmap",     icon: "alt_route"      },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[var(--background)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <BrandLogo variant="header" />
          <div className="flex items-center gap-2 text-sm text-white/40">
            <MaterialIcon name="schedule" className="!text-[15px]" />
            Expires {formatDate(data.expiresAt)}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero estimate banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 overflow-hidden rounded-2xl border border-[#ff6b00]/20 bg-gradient-to-br from-[#1f1209] to-[#0d0d0d] p-6 sm:p-8"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#ff6b00]/70">
            Project Quotation · {formatDate(data.createdAt)}
          </p>
          <h1 className="mb-1 text-2xl font-bold text-white sm:text-3xl">{data.projectType}</h1>
          <p className="mb-6 text-sm text-white/45">{data.fullName} · {estimate.suggestedPackage}</p>

          <div className="flex flex-wrap items-end gap-6">
            <div>
              <p className="mb-1 text-xs text-white/40">Estimated investment</p>
              <p className="text-4xl font-extrabold text-[#ff6b00] sm:text-5xl">
                {formatInr(estimate.minPrice)}
                <span className="text-2xl text-white/50 sm:text-3xl"> – {formatInr(estimate.maxPrice)}</span>
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-sm text-white/60">
                <MaterialIcon name="schedule" className="!text-[15px] text-[#ff6b00]" />
                {estimate.timelineLabel}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/60">
                <MaterialIcon name="category" className="!text-[15px] text-[#ff6b00]" />
                {data.features.length} feature{data.features.length !== 1 ? "s" : ""} selected
              </div>
            </div>
          </div>

          {/* CTA row */}
          <div className="mt-6 flex flex-wrap gap-3">
            {actionState === "done" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 rounded-xl bg-green-500/15 border border-green-500/30 px-4 py-2.5 text-sm text-green-400"
              >
                <MaterialIcon name="check_circle" className="!text-[16px]" />
                {actionMessage}
              </motion.div>
            ) : (
              <>
                <motion.button
                  type="button"
                  disabled={actionState === "loading" || isInterested}
                  onClick={() => handleAction("meeting")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-5 py-2.5 text-sm font-semibold text-[#1a0a00] shadow-[0_6px_24px_-6px_rgba(255,107,0,0.5)] hover:bg-[#ff8533] disabled:opacity-50"
                >
                  {actionState === "loading" ? (
                    <MaterialIcon name="progress_activity" className="animate-spin !text-[15px]" />
                  ) : (
                    <MaterialIcon name="calendar_today" className="!text-[15px]" />
                  )}
                  Schedule a Discovery Call
                </motion.button>
                <motion.button
                  type="button"
                  disabled={actionState === "loading" || isInterested}
                  onClick={() => handleAction("interest")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 hover:border-white/30 disabled:opacity-50"
                >
                  <MaterialIcon name="thumb_up" className="!text-[15px]" />
                  I'm Interested
                </motion.button>
                <a
                  href={api.quotationPdfUrl(token!)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 hover:border-white/30"
                >
                  <MaterialIcon name="download" className="!text-[15px]" />
                  Download PDF
                </a>
              </>
            )}
          </div>
          {isInterested && actionState !== "done" && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-green-400">
              <MaterialIcon name="check_circle" className="!text-[13px]" />
              {data.interestLevel === "meeting_requested" ? "Meeting requested — our team will contact you soon." : "You've shown interest — our team will reach out shortly."}
            </p>
          )}
        </motion.div>

        {/* Tab nav */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.03] p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-all sm:text-sm ${
                activeTab === tab.id
                  ? "bg-[#ff6b00] text-[#1a0a00] shadow-[0_2px_12px_-4px_rgba(255,107,0,0.5)]"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <MaterialIcon name={tab.icon} className="!text-[15px]" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "estimate" && <EstimateTab estimate={estimate} features={data.features} />}
            {activeTab === "srs" && <SRSTab srs={srs} />}
            {activeTab === "market" && <MarketTab market={marketComparison} />}
            {activeTab === "roadmap" && <RoadmapTab phases={srs.phases} deliverables={srs.deliverables} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// ─── Tab: Estimate ─────────────────────────────────────────────────────────────

function EstimateTab({ estimate, features }: { estimate: QuotationData["estimate"]; features: string[] }) {
  return (
    <div className="space-y-4">
      <Card title="What Codeebe Provides" icon="check_circle">
        <div className="grid gap-2 sm:grid-cols-2">
          {estimate.codeebeProvides.map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-white/65">
              <MaterialIcon name="check" className="mt-0.5 !text-[14px] shrink-0 text-[#ff6b00]" />
              {item}
            </div>
          ))}
        </div>
      </Card>

      {features.length > 0 && (
        <Card title="Selected Features" icon="featured_play_list">
          <div className="flex flex-wrap gap-2">
            {features.map((f) => (
              <span key={f} className="rounded-full border border-[#ff6b00]/30 bg-[#ff6b00]/8 px-3 py-1 text-xs text-white/70">
                {f}
              </span>
            ))}
          </div>
        </Card>
      )}

      <Card title="Pricing Notes" icon="info">
        <ul className="space-y-2">
          {estimate.notes.map((note, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/55">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b00]/60" />
              {note}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

// ─── Tab: SRS ──────────────────────────────────────────────────────────────────

function SRSTab({ srs }: { srs: QuotationData["srs"] }) {
  return (
    <div className="space-y-4">
      <Card title="Project Overview" icon="description">
        <p className="text-sm leading-relaxed text-white/65">{srs.overview}</p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="In Scope" icon="task_alt">
          <ul className="space-y-1.5">
            {srs.scope.included.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                <MaterialIcon name="check" className="mt-0.5 !text-[13px] shrink-0 text-green-400" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Out of Scope" icon="remove_circle_outline">
          <ul className="space-y-1.5">
            {srs.scope.outOfScope.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                <MaterialIcon name="close" className="mt-0.5 !text-[13px] shrink-0 text-red-400/70" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Functional Requirements" icon="list_alt">
        <div className="space-y-3">
          {srs.functionalRequirements.map((req) => (
            <div key={req.id} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded bg-[#ff6b00]/15 px-1.5 py-0.5 text-[10px] font-mono text-[#ff6b00]">{req.id}</span>
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

      <Card title="Tech Stack" icon="code">
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(srs.techStack).map(([key, value]) => (
            <div key={key} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/30">{key}</p>
              <p className="text-sm text-white/70">{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Tab: Market Comparison ────────────────────────────────────────────────────

function MarketTab({ market }: { market: QuotationData["marketComparison"] }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-white/45">{market.summary}</p>

      {/* Comparison cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {market.competitors.map((c) => (
          <div key={c.name} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="mb-3 text-sm font-semibold text-white/80">{c.name}</p>
            <p className="mb-1 text-xl font-bold text-white/60">{c.priceRange}</p>
            <p className="mb-3 text-xs text-white/35">{c.timeline}</p>
            <ul className="space-y-1.5">
              {c.gaps.slice(0, 3).map((g, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-red-400/70">
                  <MaterialIcon name="close" className="mt-0.5 !text-[12px] shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Codeebe card */}
        <div className="sm:col-span-3 rounded-xl border border-[#ff6b00]/30 bg-gradient-to-br from-[#1f1209] to-[#0d0d0d] p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-[#ff6b00] px-2.5 py-0.5 text-[11px] font-bold text-[#1a0a00]">Codeebe</span>
            <span className="text-xs text-[#ff6b00]/70">Recommended</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-2xl font-bold text-[#ff6b00]">{market.codeebe.priceRange}</p>
              <p className="text-xs text-white/35">{market.codeebe.timeline}</p>
            </div>
            <div className="flex-1">
              <div className="grid gap-1.5 sm:grid-cols-2">
                {market.codeebe.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-green-400">
                    <MaterialIcon name="check" className="mt-0.5 !text-[12px] shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card title="Why Codeebe?" icon="star">
        <div className="grid gap-2 sm:grid-cols-2">
          {market.whyCodeebe.map((w, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-white/65">
              <MaterialIcon name="arrow_forward" className="mt-0.5 !text-[14px] shrink-0 text-[#ff6b00]" />
              {w}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Tab: Roadmap ──────────────────────────────────────────────────────────────

function RoadmapTab({ phases, deliverables }: { phases: QuotationData["srs"]["phases"]; deliverables: string[] }) {
  return (
    <div className="space-y-4">
      <Card title="Delivery Phases" icon="alt_route">
        <div className="relative space-y-0">
          {phases.map((phase, i) => (
            <div key={phase.phase} className="flex gap-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff6b00]/15 text-[13px] font-bold text-[#ff6b00]">
                  {phase.phase}
                </div>
                {i < phases.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-white/[0.06]" style={{ minHeight: "2rem" }} />
                )}
              </div>
              <div className="pb-6">
                <div className="mb-1 flex flex-wrap items-baseline gap-2">
                  <p className="font-semibold text-white/85">{phase.name}</p>
                  <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/40">{phase.duration}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {phase.deliverables.map((d) => (
                    <span key={d} className="rounded border border-white/[0.08] px-2 py-0.5 text-[11px] text-white/50">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Final Deliverables" icon="inventory_2">
        <ul className="space-y-2">
          {deliverables.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/65">
              <MaterialIcon name="check_box" className="mt-0.5 !text-[14px] shrink-0 text-[#ff6b00]" />
              {d}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

// ─── Shared: Card ──────────────────────────────────────────────────────────────

function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
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

// ─── Shared: EmptyState ────────────────────────────────────────────────────────

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
