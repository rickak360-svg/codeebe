"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { api } from "@/lib/api";
import type { IndustryConfig } from "@/data/industries/types";
import {
  calculateEstimate,
  formatINR,
  formatINRCompact,
  type EstimatorSelections,
} from "@/data/industries/estimator";
import { useTheme, gradientOf, Section, SectionHeading, PrimaryButton, type IndustryTheme } from "./theme";

/** Simple 0–100 lead score for the admin panel: bigger scope + budget = hotter. */
function leadScore(complexity: number, featureCount: number, budget: string): number {
  const budgetBoost = budget ? (/25|12/.test(budget) ? 30 : /6/.test(budget) ? 20 : 10) : 0;
  return Math.min(100, Math.round(complexity * 0.5 + featureCount * 3 + budgetBoost));
}

export function Estimator({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  const est = config.estimator;
  const steps = est.steps;

  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<EstimatorSelections>({});
  const [showResult, setShowResult] = useState(false);
  const [budget, setBudget] = useState("");
  const [contact, setContact] = useState({ company: "", email: "", phone: "", location: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = steps.length;
  const step = steps[stepIndex];
  const isBudgetStep = stepIndex === totalSteps;
  const progress = Math.round((stepIndex / (totalSteps + 1)) * 100);

  const estimate = useMemo(() => calculateEstimate(est, selections), [est, selections]);

  function toggle(stepId: string, optionId: string, type: "single" | "multi") {
    setSelections((prev) => {
      const cur = prev[stepId] ?? [];
      if (type === "single") return { ...prev, [stepId]: [optionId] };
      return { ...prev, [stepId]: cur.includes(optionId) ? cur.filter((x) => x !== optionId) : [...cur, optionId] };
    });
  }

  const currentAnswered = isBudgetStep || !step ? true : (step.min ?? 0) === 0 ? true : (selections[step.id]?.length ?? 0) >= (step.min ?? 1);

  function next() {
    if (stepIndex < totalSteps) setStepIndex((s) => s + 1);
    else setShowResult(true);
  }
  function back() {
    if (showResult) { setShowResult(false); return; }
    setStepIndex((s) => Math.max(0, s - 1));
  }

  async function handleSubmit() {
    setError(null);
    setSubmitting(true);
    try {
      const selectedLabels: string[] = [];
      for (const s of steps) {
        for (const id of selections[s.id] ?? []) {
          const opt = s.options.find((o) => o.id === id);
          if (opt) selectedLabels.push(`${s.title.replace(/\?$/, "")}: ${opt.label}`);
        }
      }
      const score = leadScore(estimate.complexity, estimate.featureCount, budget);
      const description = [
        `${est.industryLabel} — AI Estimate`,
        "",
        `Estimated cost: ${formatINR(estimate.low)} – ${formatINR(estimate.high)}`,
        `Recommended package: ${estimate.recommendedPackage}`,
        `Timeline: ${estimate.timelineWeeks[0]}–${estimate.timelineWeeks[1]} weeks`,
        `Complexity score: ${estimate.complexity}/100`,
        `Lead score: ${score}/100`,
        `Suggested team size: ${estimate.teamSize}`,
        `Hosting: ${estimate.hosting}`,
        `Monthly maintenance: ${formatINR(estimate.monthlyMaintenance)}`,
        `Budget range: ${budget || "Not specified"}`,
        `Location: ${contact.location || "—"}`,
        "",
        "Selected configuration:",
        ...selectedLabels.map((l) => `• ${l}`),
        "",
        `Additional requirements: ${contact.notes || "—"}`,
      ].join("\n");

      await api.createLead({
        fullName: contact.company || contact.email,
        email: contact.email,
        phone: contact.phone,
        companyName: contact.company || undefined,
        projectType: est.industryLabel,
        description,
        features: selectedLabels,
        timeline: `${estimate.timelineWeeks[0]}–${estimate.timelineWeeks[1]} weeks`,
        budgetRange: budget || `${formatINR(estimate.low)} – ${formatINR(estimate.high)}`,
        source: "contact",
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle = { borderColor: t.border, background: t.dark ? "rgba(0,0,0,0.4)" : "#fff", color: t.text } as const;
  const inputCls = "w-full rounded-xl border px-4 py-3 text-[14px] outline-none transition-all duration-200";

  return (
    <Section id="estimator">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[70%] -translate-x-1/2 rounded-full blur-[140px]" style={{ background: t.glow }} />

      <SectionHeading
        eyebrow="AI Cost Estimator"
        title={<>Get your platform cost in <span style={{ color: t.primary }}>60 seconds</span></>}
        subtitle="Answer a few questions and our pricing engine builds a tailored estimate — instantly, no calls required."
      />

      <div className="relative mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-[1fr_360px]">
        {/* Wizard */}
        <div className="relative overflow-hidden rounded-[28px] border p-6 sm:p-8" style={{ borderColor: t.borderHi, background: t.surface }}>
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-[11px]" style={{ color: t.subtext }}>
              <span>{showResult ? "Your estimate" : isBudgetStep ? "Almost there" : step?.eyebrow}</span>
              <span>{showResult ? "100%" : `${progress}%`}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: t.overlayHi }}>
              <motion.div className="h-full rounded-full" style={{ background: gradientOf(t) }} animate={{ width: showResult ? "100%" : `${progress}%` }} transition={{ duration: 0.4 }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {showResult ? (
              <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: `${t.success}26` }}>
                      <MaterialIcon name="check_circle" className="!text-[36px]" style={{ color: t.success }} />
                    </div>
                    <h3 className="font-[family-name:var(--font-family-display)] text-2xl font-bold" style={{ color: t.text }}>Estimate sent!</h3>
                    <p className="mx-auto mt-2 max-w-md text-[14px]" style={{ color: t.subtext }}>
                      We&apos;ve logged your detailed breakdown and our team will reach out within 24 hours to refine it with you.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-[family-name:var(--font-family-display)] text-xl font-bold" style={{ color: t.text }}>Send me this estimate</h3>
                    <p className="mt-1 text-[13px]" style={{ color: t.subtext }}>Get the full breakdown by email + a free consultation.</p>

                    {error && (
                      <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[13px] text-red-400">
                        <MaterialIcon name="error" className="!text-[16px]" />{error}
                      </div>
                    )}

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <input className={inputCls} style={inputStyle} placeholder="Company name" value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} />
                      <input className={inputCls} style={inputStyle} type="email" placeholder="Email *" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                      <input className={inputCls} style={inputStyle} placeholder="Phone *" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                      <input className={inputCls} style={inputStyle} placeholder="Location / City" value={contact.location} onChange={(e) => setContact({ ...contact, location: e.target.value })} />
                    </div>
                    <textarea className={`${inputCls} mt-3 resize-none`} style={inputStyle} rows={3} placeholder="Additional requirements (optional)" value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} />

                    <div className="mt-5 flex items-center gap-3">
                      <button onClick={back} className="rounded-full border px-5 py-3 text-[13px] font-medium" style={{ borderColor: t.borderHi, color: t.subtext }}>Back</button>
                      <PrimaryButton onClick={handleSubmit} className="flex-1">
                        {submitting ? <><MaterialIcon name="hourglass_top" className="!text-[16px]" /> Sending…</> : <><MaterialIcon name="send" className="!text-[16px]" /> Email my estimate</>}
                      </PrimaryButton>
                    </div>
                  </>
                )}
              </motion.div>
            ) : isBudgetStep ? (
              <motion.div key="budget" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: t.primary }}>Final step</p>
                <h3 className="mt-2 font-[family-name:var(--font-family-display)] text-2xl font-bold" style={{ color: t.text }}>What&apos;s your budget range?</h3>
                <p className="mt-1.5 text-[14px]" style={{ color: t.subtext }}>Helps us recommend the right scope. Everything is negotiable.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {est.budgetOptions.map((b) => {
                    const sel = budget === b;
                    return (
                      <button key={b} onClick={() => setBudget(b)} className="flex items-center gap-3 rounded-xl border p-4 text-left transition-all" style={{ borderColor: sel ? "transparent" : t.border, background: sel ? t.softTint : t.overlay, boxShadow: sel ? `0 0 0 1.5px ${t.primary}` : "none" }}>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border" style={{ borderColor: sel ? t.primary : t.borderHi, background: sel ? t.primary : "transparent" }}>
                          {sel && <MaterialIcon name="check" className="!text-[12px]" style={{ color: t.onPrimary }} />}
                        </span>
                        <span className="text-[14px] font-medium" style={{ color: t.text }}>{b}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div key={step.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: t.primary }}>{step.eyebrow}</p>
                <h3 className="mt-2 font-[family-name:var(--font-family-display)] text-2xl font-bold" style={{ color: t.text }}>{step.title}</h3>
                <p className="mt-1.5 text-[14px]" style={{ color: t.subtext }}>{step.subtitle}</p>

                <div className={`mt-6 grid gap-3 ${step.type === "single" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                  {step.options.map((opt) => {
                    const sel = (selections[step.id] ?? []).includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggle(step.id, opt.id, step.type)}
                        className="group relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200"
                        style={{ borderColor: sel ? "transparent" : t.border, background: sel ? t.softTint : t.overlay, boxShadow: sel ? `0 0 0 1.5px ${t.primary}` : "none" }}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: sel ? gradientOf(t) : t.softTint }}>
                          <MaterialIcon name={opt.icon} className="!text-[18px]" style={{ color: sel ? t.onPrimary : t.primary }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13.5px] font-semibold" style={{ color: t.text }}>{opt.label}</p>
                          {opt.desc && <p className="mt-0.5 text-[11.5px]" style={{ color: t.subtext }}>{opt.desc}</p>}
                          {step.kind === "feature" && opt.cost > 0 && (
                            <p className="mt-1 text-[11px] font-medium" style={{ color: sel ? t.primary : t.subtext }}>+{formatINRCompact(opt.cost)}</p>
                          )}
                        </div>
                        {step.type === "multi" && (
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border" style={{ borderColor: sel ? t.primary : t.borderHi, background: sel ? t.primary : "transparent" }}>
                            {sel && <MaterialIcon name="check" className="!text-[11px]" style={{ color: t.onPrimary }} />}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showResult && (
            <div className="mt-8 flex items-center justify-between">
              <button onClick={back} disabled={stepIndex === 0} className="inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all disabled:opacity-30" style={{ borderColor: t.borderHi, color: t.subtext }}>
                <MaterialIcon name="arrow_back" className="!text-[15px]" /> Back
              </button>
              <span className="text-[12px]" style={{ color: t.subtext }}>{Math.min(stepIndex + 1, totalSteps + 1)} / {totalSteps + 1}</span>
              <PrimaryButton onClick={next} className={!currentAnswered ? "pointer-events-none opacity-40" : ""}>
                {stepIndex === totalSteps ? "See estimate" : "Continue"}
                <MaterialIcon name="arrow_forward" className="!text-[15px]" />
              </PrimaryButton>
            </div>
          )}
        </div>

        {/* Live sidebar */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[28px] border" style={{ borderColor: t.borderHi, background: `linear-gradient(180deg, ${t.softTint}, ${t.surface} 40%)` }}>
            <div className="border-b px-6 py-4" style={{ borderColor: t.border }}>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: t.primary }}>
                <MaterialIcon name="calculate" className="!text-[15px]" /> Live estimate
              </p>
            </div>
            <div className="p-6">
              <p className="text-[11px] uppercase tracking-wider" style={{ color: t.subtext }}>Estimated build cost</p>
              <div className="mt-1 flex items-end gap-1">
                <motion.span key={estimate.point} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-[family-name:var(--font-family-display)] text-[2rem] font-bold leading-none" style={{ color: t.text }}>
                  {formatINRCompact(estimate.low)}
                </motion.span>
                <span className="pb-0.5 text-[15px]" style={{ color: t.subtext }}>– {formatINRCompact(estimate.high)}</span>
              </div>

              <div className="mt-5 space-y-3">
                <Row t={t} icon="schedule" label="Timeline" value={`${estimate.timelineWeeks[0]}–${estimate.timelineWeeks[1]} weeks`} />
                <Row t={t} icon="workspace_premium" label="Package" value={estimate.recommendedPackage} accent />
                <Row t={t} icon="tune" label="Complexity" value={`${estimate.complexity}/100`} />
                <Row t={t} icon="groups" label="Team size" value={`${estimate.teamSize} people`} />
                <Row t={t} icon="dns" label="Maintenance" value={`${formatINRCompact(estimate.monthlyMaintenance)}/mo`} />
              </div>

              <div className="mt-5">
                <div className="mb-1.5 flex justify-between text-[10px]" style={{ color: t.subtext }}>
                  <span>Complexity</span><span>{estimate.complexity < 45 ? "Standard" : estimate.complexity < 75 ? "Advanced" : "Enterprise"}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: t.overlayHi }}>
                  <motion.div className="h-full rounded-full" style={{ background: gradientOf(t) }} animate={{ width: `${estimate.complexity}%` }} transition={{ duration: 0.5 }} />
                </div>
              </div>

              {estimate.upgradeSuggestions.length > 0 && (
                <div className="mt-5 rounded-xl border p-3" style={{ borderColor: t.border, background: t.overlay }}>
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: t.text }}>
                    <MaterialIcon name="lightbulb" className="!text-[13px]" style={{ color: t.primary }} /> AI suggestion
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed" style={{ color: t.subtext }}>{estimate.upgradeSuggestions[0]}</p>
                </div>
              )}

              <p className="mt-4 text-center text-[10.5px]" style={{ color: t.subtext }}>Indicative only · final quote after consultation</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Row({ t, icon, label, value, accent }: { t: IndustryTheme; icon: string; label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-[12.5px]" style={{ color: t.subtext }}>
        <MaterialIcon name={icon} className="!text-[15px]" style={{ color: t.primary }} />{label}
      </span>
      <span className="text-[13px] font-semibold" style={{ color: accent ? t.primary : t.text }}>{value}</span>
    </div>
  );
}
