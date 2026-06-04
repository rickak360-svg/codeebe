"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroBriefTeaser } from "./HeroBriefTeaser";
import { HeroWizardBadges } from "./HeroWizardBadges";
import type { CreateLeadResponse } from "@codeebe/shared";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { siteConfig } from "@/config/site";
import { featureOptions, projectTypes, timelineOptions } from "@/data/pricing";
import { api } from "@/lib/api";
import {
  analyzeRequirement,
  formatInrCompact,
  previewEstimateRange,
  type AnalyzedRequirement,
} from "@/lib/analyzeRequirement";
import { useReducedMotion } from "./useReducedMotion";

const STEPS = ["Describe", "Refine", "Submit"] as const;

const MIN_DESCRIPTION = 24;

const textareaClass =
  "w-full resize-none rounded-lg border border-[var(--landing-border)] bg-[var(--landing-surface-lowest)] px-3 py-2.5 text-[15px] leading-snug text-[var(--landing-on-surface)] caret-[var(--landing-on-surface)] placeholder:text-[var(--landing-on-surface-variant)]/60 focus:border-[#ff6b00]/50 focus:outline-none focus:ring-1 focus:ring-[#ff6b00]/30";

const inputClass =
  "w-full rounded-lg border border-[var(--landing-border)] bg-[var(--landing-surface-lowest)] px-3 py-2.5 text-[15px] text-[var(--landing-on-surface)] placeholder:text-[var(--landing-on-surface-variant)]/60 focus:border-[#ff6b00]/50 focus:outline-none focus:ring-1 focus:ring-[#ff6b00]/30";

const chipClass = (on: boolean) =>
  `rounded-full border px-2.5 py-1 text-xs transition-colors ${
    on
      ? "border-[#ff6b00]/40 bg-[#ff6b00]/10 text-[var(--landing-on-surface)]"
      : "border-[var(--landing-border)] text-[var(--landing-on-surface-variant)] hover:border-[#ff6b00]/30"
  }`;

type Props = {
  briefOpen?: boolean;
  onBriefOpenChange?: (open: boolean) => void;
};

export function HeroRequirementWizard({
  briefOpen: briefOpenProp,
  onBriefOpenChange,
}: Props = {}) {
  const reduced = useReducedMotion();
  const [briefOpenInternal, setBriefOpenInternal] = useState(false);
  const briefOpen = briefOpenProp ?? briefOpenInternal;
  const setBriefOpen = onBriefOpenChange ?? setBriefOpenInternal;

  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzedRequirement | null>(null);
  const [projectType, setProjectType] = useState<(typeof projectTypes)[number]>(
    "Business Website",
  );
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<(typeof timelineOptions)[number]>(
    "Standard: 3-5 weeks",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateLeadResponse | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#hero-wizard") setBriefOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [setBriefOpen]);

  function openBrief() {
    setBriefOpen(true);
    document.getElementById("hero-wizard")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const preview = useMemo(
    () => previewEstimateRange(projectType, features.length, timeline),
    [projectType, features.length, timeline],
  );

  const refineFeatures = useMemo(() => {
    if (!analysis) return featureOptions.slice(0, 8);
    const suggested = new Set(analysis.suggestedFeatures);
    return [
      ...analysis.suggestedFeatures,
      ...featureOptions.filter((f) => !suggested.has(f)).slice(0, 4),
    ];
  }, [analysis]);

  const runAnalysis = useCallback(async () => {
    if (description.trim().length < MIN_DESCRIPTION) {
      setError(`Add at least ${MIN_DESCRIPTION} characters.`);
      return;
    }
    setError(null);
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, reduced ? 0 : 900));
    const next = analyzeRequirement(description);
    setAnalysis(next);
    setProjectType(next.projectType);
    setFeatures([...next.suggestedFeatures]);
    setTimeline(next.timeline);
    setAnalyzing(false);
    setStep(2);
  }, [description, reduced]);

  function toggleFeature(feature: string) {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      const response = await api.createLead({
        fullName: String(fd.get("fullName")),
        email: String(fd.get("email")),
        phone: String(fd.get("phone")),
        companyName: String(fd.get("companyName") || "") || undefined,
        projectType,
        description: description.trim(),
        features,
        timeline,
        source: "estimate",
      });
      setResult(response);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit");
    } finally {
      setSubmitting(false);
    }
  }

  if (!briefOpen) {
    return <HeroBriefTeaser onOpenBrief={openBrief} />;
  }

  if (result) {
    const { estimate } = result;
    return (
      <div>
        <WizardShell step={3}>
        <div className="space-y-3 text-center">
          <MaterialIcon name="check_circle" className="!text-[32px] text-[#ff6b00]" />
          <p className="text-lg font-semibold text-[var(--landing-on-surface)]">
            {formatInrCompact(estimate.minPrice)} – {formatInrCompact(estimate.maxPrice)}
          </p>
          <p className="text-sm text-[var(--landing-on-surface-variant)]">{estimate.summary}</p>
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-lg bg-[#ff6b00] py-2.5 text-sm font-semibold text-[#1a0a00] hover:bg-[#ff8533]"
          >
            Book a call
          </a>
          <button
            type="button"
            onClick={() => {
              setResult(null);
              setStep(1);
              setDescription("");
              setAnalysis(null);
              setFeatures([]);
            }}
            className="text-xs text-[var(--landing-on-surface-variant)] hover:text-[var(--landing-on-surface)]"
          >
            New request
          </button>
        </div>
        </WizardShell>
        <HeroWizardBadges />
      </div>
    );
  }

  return (
    <div>
    <WizardShell step={step}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <label htmlFor="hero-requirement" className="sr-only">
              Project description
            </label>
            <textarea
              id="hero-requirement"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe your product idea…"
              className={textareaClass}
            />

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="button"
              onClick={() => void runAnalysis()}
              disabled={analyzing || description.trim().length < MIN_DESCRIPTION}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#ff6b00] py-2.5 text-sm font-semibold text-[#1a0a00] transition-colors hover:bg-[#ff8533] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <MaterialIcon name="progress_activity" className="animate-spin !text-[16px]" />
                  Analyzing…
                </>
              ) : (
                <>
                  <MaterialIcon name="auto_awesome" className="!text-[16px]" />
                  Get suggestions
                </>
              )}
            </button>
          </motion.div>
        )}

        {step === 2 && analysis && (
          <motion.div
            key="step2"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <select
              value={projectType}
              onChange={(e) =>
                setProjectType(e.target.value as (typeof projectTypes)[number])
              }
              className={inputClass}
              aria-label="Project type"
            >
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-1.5">
              {refineFeatures.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => toggleFeature(feature)}
                  className={chipClass(features.includes(feature))}
                >
                  {feature}
                </button>
              ))}
            </div>

            <select
              value={timeline}
              onChange={(e) =>
                setTimeline(e.target.value as (typeof timelineOptions)[number])
              }
              className={inputClass}
              aria-label="Timeline"
            >
              {timelineOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <p className="text-center text-xs text-[var(--landing-on-surface-variant)]">
              Est. {formatInrCompact(preview.min)} – {formatInrCompact(preview.max)}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-lg border border-[var(--landing-border)] py-2.5 text-sm text-[var(--landing-on-surface-variant)] hover:bg-[var(--landing-border)]/40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-[1.2] rounded-lg bg-[#ff6b00] py-2.5 text-sm font-semibold text-[#1a0a00] hover:bg-[#ff8533]"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && !result && (
          <motion.form
            key="step3"
            onSubmit={handleSubmit}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2.5"
          >
            <input name="fullName" required placeholder="Name" className={inputClass} />
            <input name="email" type="email" required placeholder="Email" className={inputClass} />
            <input name="phone" required placeholder="Phone" className={inputClass} />

            {error && <p className="text-xs text-red-400">{error}</p>}

            <div className="flex gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 rounded-lg border border-[var(--landing-border)] py-2.5 text-sm text-[var(--landing-on-surface-variant)]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-[1.2] rounded-lg bg-[#ff6b00] py-2.5 text-sm font-semibold text-[#1a0a00] hover:bg-[#ff8533] disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Submit"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </WizardShell>
    <HeroWizardBadges />
    </div>
  );
}

function WizardShell({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none"
    >
      <div className="relative rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-glass-bg)] p-4 shadow-lg backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-[var(--landing-on-surface)]">
            Project brief
          </span>
          <span className="text-[11px] tabular-nums text-[var(--landing-on-surface-variant)]">
            {step} / 3
          </span>
        </div>

        <div
          className="mb-4 flex gap-1"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label={`Step ${step} of 3`}
        >
          {STEPS.map((_, i) => (
            <div
              key={STEPS[i]}
              className={`h-0.5 flex-1 rounded-full transition-colors ${
                i + 1 <= step ? "bg-[#ff6b00]" : "bg-[var(--landing-border)]"
              }`}
            />
          ))}
        </div>

        <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[var(--landing-on-surface-variant)]">
          {STEPS[step - 1]}
        </p>

        {children}
      </div>
    </motion.div>
  );
}
