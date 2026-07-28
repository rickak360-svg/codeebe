"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { api } from "@/lib/api";
import {
  estimatorSteps,
  calculateEstimate,
  formatINR,
  formatINRCompact,
  type EstimatorSelections,
} from "@/data/carRentalEstimator";
import { CR, PRIMARY_GRADIENT, Section, SectionHeading, PrimaryButton } from "./shared";

const INPUT =
  "w-full rounded-xl border bg-black/40 px-4 py-3 text-[14px] text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(255,138,0,0.12)]";

const budgetOptions = ["Under ₹3L", "₹3L – ₹6L", "₹6L – ₹12L", "₹12L – ₹25L", "₹25L+"];

export function CostEstimator() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<EstimatorSelections>({});
  const [showResult, setShowResult] = useState(false);
  const [budget, setBudget] = useState("");
  const [contact, setContact] = useState({ company: "", email: "", phone: "", location: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = estimatorSteps.length;
  const step = estimatorSteps[stepIndex];
  const isContactStep = stepIndex === totalSteps; // synthetic final step
  const progress = Math.round(((stepIndex) / totalSteps) * 100);

  const estimate = useMemo(() => calculateEstimate(selections), [selections]);

  function toggle(stepId: string, optionId: string, type: "single" | "multi") {
    setSelections((prev) => {
      const cur = prev[stepId] ?? [];
      if (type === "single") return { ...prev, [stepId]: [optionId] };
      return {
        ...prev,
        [stepId]: cur.includes(optionId) ? cur.filter((x) => x !== optionId) : [...cur, optionId],
      };
    });
  }

  const currentAnswered =
    isContactStep || !step
      ? true
      : (step.min ?? 0) === 0
        ? true
        : (selections[step.id]?.length ?? 0) >= (step.min ?? 1);

  function next() {
    if (stepIndex < totalSteps) setStepIndex((s) => s + 1);
    if (stepIndex === totalSteps) setShowResult(true);
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
      for (const s of estimatorSteps) {
        for (const id of selections[s.id] ?? []) {
          const opt = s.options.find((o) => o.id === id);
          if (opt) selectedLabels.push(`${s.title.replace(/\?$/, "")}: ${opt.label}`);
        }
      }
      const description = [
        "Car Rental Platform — AI Estimate",
        "",
        `Estimated cost: ${formatINR(estimate.low)} – ${formatINR(estimate.high)}`,
        `Recommended package: ${estimate.recommendedPackage}`,
        `Timeline: ${estimate.timelineWeeks[0]}–${estimate.timelineWeeks[1]} weeks`,
        `Complexity score: ${estimate.complexity}/100`,
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
        projectType: "Car Rental Platform",
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

  return (
    <Section id="estimator">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[70%] -translate-x-1/2 rounded-full blur-[140px]" style={{ background: "rgba(255,138,0,0.1)" }} />

      <SectionHeading
        eyebrow="AI Cost Estimator"
        title={<>Get your platform cost in <span style={{ color: CR.primary }}>60 seconds</span></>}
        subtitle="Answer a few questions and our pricing engine builds a tailored estimate — instantly, no calls required."
      />

      <div className="relative mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-[1fr_360px]">
        {/* ── Wizard panel ── */}
        <div className="relative overflow-hidden rounded-[28px] border p-6 sm:p-8" style={{ borderColor: CR.borderHi, background: "rgba(17,17,17,0.9)" }}>
          {/* progress */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-[11px]" style={{ color: CR.subtext }}>
              <span>{showResult ? "Your estimate" : isContactStep ? "Almost there" : `${step?.eyebrow}`}</span>
              <span>{showResult ? "100%" : `${progress}%`}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div className="h-full rounded-full" style={{ background: PRIMARY_GRADIENT }} animate={{ width: showResult ? "100%" : `${progress}%` }} transition={{ duration: 0.4 }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* RESULT */}
            {showResult ? (
              <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.15)" }}>
                      <MaterialIcon name="check_circle" className="!text-[36px]" style={{ color: CR.success }} />
                    </div>
                    <h3 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white">Estimate sent!</h3>
                    <p className="mx-auto mt-2 max-w-md text-[14px]" style={{ color: CR.subtext }}>
                      We&apos;ve emailed your detailed breakdown and our team will reach out within 24 hours to refine it with you.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-[family-name:var(--font-family-display)] text-xl font-bold text-white">Send me this estimate</h3>
                    <p className="mt-1 text-[13px]" style={{ color: CR.subtext }}>Get the full breakdown by email + a free consultation.</p>

                    {error && (
                      <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[13px] text-red-300">
                        <MaterialIcon name="error" className="!text-[16px]" />{error}
                      </div>
                    )}

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <input className={INPUT} style={{ borderColor: CR.border }} placeholder="Company name" value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} />
                      <input className={INPUT} style={{ borderColor: CR.border }} type="email" placeholder="Email *" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                      <input className={INPUT} style={{ borderColor: CR.border }} placeholder="Phone *" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                      <input className={INPUT} style={{ borderColor: CR.border }} placeholder="Location / City" value={contact.location} onChange={(e) => setContact({ ...contact, location: e.target.value })} />
                    </div>
                    <textarea className={`${INPUT} mt-3 resize-none`} style={{ borderColor: CR.border }} rows={3} placeholder="Additional requirements (optional)" value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} />

                    <div className="mt-5 flex items-center gap-3">
                      <button onClick={back} className="rounded-full border px-5 py-3 text-[13px] font-medium text-white/70 transition-colors hover:text-white" style={{ borderColor: CR.borderHi }}>
                        Back
                      </button>
                      <PrimaryButton onClick={handleSubmit} className="flex-1">
                        {submitting ? <><MaterialIcon name="hourglass_top" className="!text-[16px]" /> Sending…</> : <><MaterialIcon name="send" className="!text-[16px]" /> Email my estimate</>}
                      </PrimaryButton>
                    </div>
                  </>
                )}
              </motion.div>
            ) : isContactStep ? (
              /* BUDGET step (last before result) */
              <motion.div key="budget" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: CR.secondary }}>Step 09</p>
                <h3 className="mt-2 font-[family-name:var(--font-family-display)] text-2xl font-bold text-white">What&apos;s your budget range?</h3>
                <p className="mt-1.5 text-[14px]" style={{ color: CR.subtext }}>Helps us recommend the right scope. Everything is negotiable.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {budgetOptions.map((b) => {
                    const sel = budget === b;
                    return (
                      <button key={b} onClick={() => setBudget(b)} className="flex items-center gap-3 rounded-xl border p-4 text-left transition-all" style={{ borderColor: sel ? "transparent" : CR.border, background: sel ? "rgba(255,138,0,0.1)" : "rgba(255,255,255,0.02)", boxShadow: sel ? `0 0 0 1.5px ${CR.primary}` : "none" }}>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border" style={{ borderColor: sel ? CR.primary : CR.borderHi, background: sel ? CR.primary : "transparent" }}>
                          {sel && <MaterialIcon name="check" className="!text-[12px] text-[#0a0a0a]" />}
                        </span>
                        <span className="text-[14px] font-medium text-white">{b}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* QUESTION step */
              <motion.div key={step.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}>
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: CR.secondary }}>{step.eyebrow}</p>
                <h3 className="mt-2 font-[family-name:var(--font-family-display)] text-2xl font-bold text-white">{step.title}</h3>
                <p className="mt-1.5 text-[14px]" style={{ color: CR.subtext }}>{step.subtitle}</p>

                <div className={`mt-6 grid gap-3 ${step.type === "single" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                  {step.options.map((opt) => {
                    const sel = (selections[step.id] ?? []).includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggle(step.id, opt.id, step.type)}
                        className="group relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200"
                        style={{ borderColor: sel ? "transparent" : CR.border, background: sel ? "rgba(255,138,0,0.1)" : "rgba(255,255,255,0.02)", boxShadow: sel ? `0 0 0 1.5px ${CR.primary}` : "none" }}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors" style={{ background: sel ? PRIMARY_GRADIENT : "rgba(255,138,0,0.1)" }}>
                          <MaterialIcon name={opt.icon} className="!text-[18px]" style={{ color: sel ? "#0a0a0a" : CR.primary }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13.5px] font-semibold text-white">{opt.label}</p>
                          {opt.desc && <p className="mt-0.5 text-[11.5px]" style={{ color: CR.subtext }}>{opt.desc}</p>}
                          {step.type === "multi" && opt.cost > 0 && (
                            <p className="mt-1 text-[11px] font-medium" style={{ color: sel ? CR.secondary : CR.subtext }}>+{formatINRCompact(opt.cost)}</p>
                          )}
                        </div>
                        {step.type === "multi" && (
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border" style={{ borderColor: sel ? CR.primary : CR.borderHi, background: sel ? CR.primary : "transparent" }}>
                            {sel && <MaterialIcon name="check" className="!text-[11px] text-[#0a0a0a]" />}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* nav */}
          {!showResult && (
            <div className="mt-8 flex items-center justify-between">
              <button onClick={back} disabled={stepIndex === 0} className="inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-[13px] font-medium text-white/70 transition-all hover:text-white disabled:opacity-30" style={{ borderColor: CR.borderHi }}>
                <MaterialIcon name="arrow_back" className="!text-[15px]" /> Back
              </button>
              <span className="text-[12px]" style={{ color: CR.subtext }}>{Math.min(stepIndex + 1, totalSteps + 1)} / {totalSteps + 1}</span>
              <PrimaryButton onClick={next} className={!currentAnswered ? "pointer-events-none opacity-40" : ""}>
                {stepIndex === totalSteps ? "See estimate" : "Continue"}
                <MaterialIcon name="arrow_forward" className="!text-[15px]" />
              </PrimaryButton>
            </div>
          )}
        </div>

        {/* ── Live result sidebar ── */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[28px] border" style={{ borderColor: CR.borderHi, background: "linear-gradient(180deg, rgba(255,138,0,0.1), rgba(17,17,17,0.95) 40%)" }}>
            <div className="border-b px-6 py-4" style={{ borderColor: CR.border }}>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: CR.secondary }}>
                <MaterialIcon name="calculate" className="!text-[15px]" /> Live estimate
              </p>
            </div>
            <div className="p-6">
              <p className="text-[11px] uppercase tracking-wider" style={{ color: CR.subtext }}>Estimated build cost</p>
              <div className="mt-1 flex items-end gap-1">
                <motion.span key={estimate.point} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-[family-name:var(--font-family-display)] text-[2rem] font-bold leading-none text-white">
                  {formatINRCompact(estimate.low)}
                </motion.span>
                <span className="pb-0.5 text-[15px]" style={{ color: CR.subtext }}>– {formatINRCompact(estimate.high)}</span>
              </div>

              <div className="mt-5 space-y-3">
                <ResultRow icon="schedule" label="Timeline" value={`${estimate.timelineWeeks[0]}–${estimate.timelineWeeks[1]} weeks`} />
                <ResultRow icon="workspace_premium" label="Package" value={estimate.recommendedPackage} accent />
                <ResultRow icon="tune" label="Complexity" value={`${estimate.complexity}/100`} />
                <ResultRow icon="groups" label="Team size" value={`${estimate.teamSize} people`} />
                <ResultRow icon="dns" label="Maintenance" value={`${formatINRCompact(estimate.monthlyMaintenance)}/mo`} />
              </div>

              {/* complexity meter */}
              <div className="mt-5">
                <div className="mb-1.5 flex justify-between text-[10px]" style={{ color: CR.subtext }}>
                  <span>Complexity</span><span>{estimate.complexity < 45 ? "Standard" : estimate.complexity < 75 ? "Advanced" : "Enterprise"}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div className="h-full rounded-full" style={{ background: PRIMARY_GRADIENT }} animate={{ width: `${estimate.complexity}%` }} transition={{ duration: 0.5 }} />
                </div>
              </div>

              {estimate.upgradeSuggestions.length > 0 && (
                <div className="mt-5 rounded-xl border p-3" style={{ borderColor: CR.border, background: "rgba(255,255,255,0.02)" }}>
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white"><MaterialIcon name="lightbulb" className="!text-[13px]" style={{ color: CR.primary }} /> AI suggestion</p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed" style={{ color: CR.subtext }}>{estimate.upgradeSuggestions[0]}</p>
                </div>
              )}

              <p className="mt-4 text-center text-[10.5px]" style={{ color: CR.subtext }}>Indicative only · final quote after consultation</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ResultRow({ icon, label, value, accent }: { icon: string; label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-[12.5px]" style={{ color: CR.subtext }}>
        <MaterialIcon name={icon} className="!text-[15px]" style={{ color: CR.primary }} />{label}
      </span>
      <span className="text-[13px] font-semibold" style={{ color: accent ? CR.secondary : "#fff" }}>{value}</span>
    </div>
  );
}
