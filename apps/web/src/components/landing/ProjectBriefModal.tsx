"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { api } from "@/lib/api";
import { formatInrCompact } from "@/lib/analyzeRequirement";
import { useReducedMotion } from "./useReducedMotion";
import { siteConfig } from "@/config/site";

// ─── Step definitions ──────────────────────────────────────────────────────────

type SingleOption = { value: string; icon: string; desc: string; color: string };

type Step =
  | { id: string; question: string; subtitle: string; type: "single"; options: SingleOption[] }
  | { id: string; question: string; subtitle: string; type: "multi"; options: string[] }
  | { id: string; question: string; subtitle: string; type: "form" };

const STEPS: Step[] = [
  {
    id: "projectType",
    question: "What are you building?",
    subtitle: "Choose the type of project that best describes your idea",
    type: "single",
    options: [
      { value: "Landing Page",        icon: "web",             desc: "Single page to promote your brand",        color: "#3b82f6" },
      { value: "Business Website",    icon: "business",        desc: "Multi-page company or portfolio site",      color: "#8b5cf6" },
      { value: "WordPress Website",   icon: "article",         desc: "CMS-powered, easy to update yourself",      color: "#0ea5e9" },
      { value: "eCommerce",           icon: "storefront",      desc: "Online store with cart & checkout",         color: "#10b981" },
      { value: "SaaS MVP",            icon: "rocket_launch",   desc: "Multi-tenant software product",             color: "#ff6b00" },
      { value: "Marketplace",         icon: "diversity_3",     desc: "Connect buyers & sellers on one platform",  color: "#a855f7" },
      { value: "CRM/Admin Dashboard", icon: "dashboard",       desc: "Internal tool or admin panel",              color: "#06b6d4" },
      { value: "Booking Platform",    icon: "event_available", desc: "Appointments, reservations or ticketing",   color: "#f59e0b" },
      { value: "Mobile App",          icon: "phone_iphone",    desc: "iOS, Android or cross-platform app",        color: "#ec4899" },
      { value: "Automation Workflow", icon: "auto_awesome",    desc: "AI, bots or process automation",            color: "#6366f1" },
      { value: "Portfolio / Blog",    icon: "feed",            desc: "Personal site, blog or case studies",       color: "#14b8a6" },
      { value: "Custom Software",     icon: "terminal",        desc: "Something unique — you tell us",            color: "#94a3b8" },
    ],
  },
  {
    id: "tech",
    question: "Which platform or tech?",
    subtitle: "We'll recommend the best stack — but your preference matters",
    type: "single",
    options: [
      { value: "WordPress / CMS",           icon: "article",      desc: "Easy to manage content sites",       color: "#21759b" },
      { value: "Shopify",                    icon: "shopping_bag", desc: "Battle-tested for e-commerce",       color: "#96bf48" },
      { value: "Next.js / React",            icon: "code",         desc: "Modern, fast & SEO-friendly",        color: "#64748b" },
      { value: "React Native / Flutter",     icon: "phone_iphone", desc: "One codebase for iOS & Android",     color: "#61dafb" },
      { value: "Custom Stack (Node/Python)", icon: "build",        desc: "Full control over architecture",     color: "#ff6b00" },
      { value: "No Preference",              icon: "help",         desc: "Let us recommend the right tool",    color: "#6b7280" },
    ],
  },
  {
    id: "features",
    question: "Which features do you need?",
    subtitle: "Pick all that apply — you can always change these later",
    type: "multi",
    options: [
      "Login / Auth",
      "Admin Panel",
      "Payment Gateway",
      "Booking / Calendar",
      "WhatsApp Integration",
      "Email Automation",
      "Blog / CMS",
      "Product Management",
      "User Dashboard",
      "Analytics",
      "API Integration",
      "SEO Setup",
      "Other (describe below)",
    ],
  },
  {
    id: "timeline",
    question: "When do you need it?",
    subtitle: "Timeline shapes team allocation and overall cost",
    type: "single",
    options: [
      { value: "Urgent: 1-2 weeks",   icon: "bolt",           desc: "Rush delivery — premium pricing applies", color: "#ef4444" },
      { value: "Standard: 3-5 weeks", icon: "schedule",       desc: "Our recommended sweet spot",              color: "#ff6b00" },
      { value: "Flexible: 6+ weeks",  icon: "calendar_month", desc: "More time = more polish & lower cost",    color: "#22c55e" },
    ],
  },
  {
    id: "describe",
    question: "Describe your project",
    subtitle: "A few sentences is enough. The more detail, the better your estimate.",
    type: "form",
  },
];

// ─── State ─────────────────────────────────────────────────────────────────────

type Answers = { projectType: string; tech: string; features: string[]; timeline: string; otherFeature: string };
const defaultAnswers: Answers = { projectType: "", tech: "", features: [], timeline: "", otherFeature: "" };

type Props = { open: boolean; onClose: () => void };

// ─── Spring presets ────────────────────────────────────────────────────────────

const SPRING_MODAL  = { type: "spring", stiffness: 300, damping: 26, mass: 1 } as const;
const SPRING_CARD   = { type: "spring", stiffness: 420, damping: 28 } as const;
const SPRING_BADGE  = { type: "spring", stiffness: 500, damping: 22 } as const;
const SPRING_SLIDE  = { type: "spring", stiffness: 380, damping: 38, mass: 0.9 } as const;

// ─── Component ─────────────────────────────────────────────────────────────────

export function ProjectBriefModal({ open, onClose }: Props) {
  const reduced = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ min: number; max: number; summary: string } | null>(null);
  const [advancing, setAdvancing] = useState<string | null>(null); // value being auto-advanced
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSteps = STEPS.length;
  const step = STEPS[stepIndex];

  // lock body scroll
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // clear auto-advance on unmount
  useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); }, []);

  function handleClose() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    onClose();
    setTimeout(() => {
      setStepIndex(0);
      setDirection(1);
      setAnswers(defaultAnswers);
      setError(null);
      setSuccess(null);
      setAdvancing(null);
    }, 350);
  }

  function goNext() {
    setDirection(1);
    setAdvancing(null);
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  }

  function goBack() {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setAdvancing(null);
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function canAdvance(): boolean {
    if (step.type === "single") return !!answers[step.id as keyof Answers];
    if (step.type === "multi") return true;
    return false;
  }

  function selectSingle(key: keyof Answers, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (!reduced) {
      setAdvancing(value);
      advanceTimer.current = setTimeout(() => {
        setAdvancing(null);
        setDirection(1);
        setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
      }, 420);
    } else {
      setDirection(1);
      setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
    }
  }

  function toggleFeature(f: string) {
    setAnswers((a) => ({
      ...a,
      features: a.features.includes(f) ? a.features.filter((x) => x !== f) : [...a.features, f],
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const description = String(fd.get("description") ?? "").trim();
    if (description.length < 20) {
      setError("Please write at least a sentence about your project.");
      setSubmitting(false);
      return;
    }
    try {
      const res = await api.createLead({
        fullName: String(fd.get("fullName")),
        email: String(fd.get("email")),
        phone: String(fd.get("phone")),
        projectType: answers.projectType || "Custom Software",
        description: `[Tech: ${answers.tech}]${answers.otherFeature ? `\n[Other feature: ${answers.otherFeature}]` : ""}\n${description}`,
        features: answers.features,
        timeline: answers.timeline || "Standard: 3-5 weeks",
        source: "estimate",
      });
      setSuccess({ min: res.estimate.minPrice, max: res.estimate.maxPrice, summary: res.estimate.summary });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: reduced ? 0 : dir * 40, opacity: 0, y: reduced ? 0 : 4 }),
    center: { x: 0, opacity: 1, y: 0 },
    exit:  (dir: number) => ({ x: reduced ? 0 : dir * -40, opacity: 0, y: reduced ? 0 : -4 }),
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="pb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={handleClose}
            className="fixed inset-0 z-[999] bg-black/72 backdrop-blur-md"
            aria-hidden
          />

          {/* Modal card */}
          <motion.div
            key="pb-modal"
            role="dialog"
            aria-modal="true"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 16 }}
            transition={SPRING_MODAL}
            className="fixed inset-x-4 top-1/2 z-[1000] mx-auto flex max-h-[90vh] max-w-2xl -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-[var(--landing-border)] bg-[var(--background)] shadow-[0_48px_120px_-20px_rgba(0,0,0,0.75)] sm:inset-x-6"
          >
            {/* ── Header ── */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--landing-border)] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ff6b00]/15">
                  <MaterialIcon name="edit_note" className="!text-[18px] text-[#ff6b00]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">Project Brief</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={stepIndex}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                      className="text-[11px] text-[var(--foreground)]/50"
                    >
                      Step {stepIndex + 1} of {totalSteps}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex flex-1 items-center gap-1" role="progressbar" aria-valuenow={stepIndex + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
                {STEPS.map((_, i) => (
                  <motion.div
                    key={i}
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className={`h-1.5 rounded-full ${
                      i <= stepIndex ? "bg-[#ff6b00]" : "bg-[var(--landing-border)]"
                    }`}
                    style={{ flex: i === stepIndex ? 2 : 1 }}
                  />
                ))}
              </div>

              <motion.button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                whileHover={reduced ? undefined : { scale: 1.1, rotate: 90 }}
                whileTap={reduced ? undefined : { scale: 0.9 }}
                transition={SPRING_CARD}
                className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--foreground)]/40 hover:bg-[var(--landing-border)]/50 hover:text-[var(--foreground)]"
              >
                <MaterialIcon name="close" className="!text-[18px]" />
              </motion.button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="modal-scroll flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait" custom={direction}>
                {success ? (
                  <SuccessView key="success" onClose={handleClose} min={success.min} max={success.max} summary={success.summary} reduced={reduced} />
                ) : (
                  <motion.div
                    key={stepIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={SPRING_SLIDE}
                    className="px-5 py-6 sm:px-6"
                  >
                    {/* Question header */}
                    <motion.h2
                      initial={reduced ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04, duration: 0.24 }}
                      className="mb-1 text-xl font-bold text-[var(--foreground)] sm:text-2xl"
                    >
                      {step.question}
                    </motion.h2>
                    <motion.p
                      initial={reduced ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.22 }}
                      className="mb-5 text-sm text-[var(--foreground)]/55"
                    >
                      {step.subtitle}
                    </motion.p>

                    {/* Single-select option cards */}
                    {step.type === "single" && (
                      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
                        {(step.options as SingleOption[]).map((opt, i) => {
                          const selected = answers[step.id as keyof Answers] === opt.value;
                          const isAdvancing = advancing === opt.value;
                          const c = opt.color;
                          return (
                            <motion.button
                              key={opt.value}
                              type="button"
                              onClick={() => selectSingle(step.id as keyof Answers, opt.value)}
                              initial={reduced ? false : { opacity: 0, y: 12, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: reduced ? 0 : 0.05 + i * 0.035, ...SPRING_CARD }}
                              whileHover={reduced ? undefined : { scale: 1.03, y: -3 }}
                              whileTap={reduced ? undefined : { scale: 0.96 }}
                              style={selected ? {
                                borderColor: `${c}55`,
                                backgroundColor: `${c}0d`,
                                boxShadow: `0 0 0 1px ${c}30, 0 8px 28px -8px ${c}30`,
                              } : undefined}
                              className="group relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-xl border border-[var(--landing-border)] p-4 text-left transition-colors hover:border-white/10 hover:bg-white/[0.03]"
                            >
                              {/* Colored top accent bar */}
                              <div
                                className="absolute inset-x-0 top-0 h-[2.5px] rounded-t-xl transition-opacity duration-200"
                                style={{ background: `linear-gradient(90deg, ${c}cc, ${c}55)`, opacity: selected ? 1 : 0.35 }}
                              />

                              {/* Subtle radial glow behind icon */}
                              <div
                                className="absolute -left-4 -top-4 h-20 w-20 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                                style={{ background: c }}
                                aria-hidden
                              />

                              {/* Icon */}
                              <div
                                className="relative flex h-10 w-10 items-center justify-center rounded-xl"
                                style={{ background: `${c}18` }}
                              >
                                <MaterialIcon
                                  name={opt.icon}
                                  className="!text-[20px]"
                                  style={{ color: c }}
                                />
                              </div>

                              {/* Text */}
                              <div className="space-y-0.5">
                                <p className={`text-[13px] font-semibold leading-snug transition-colors duration-150 ${selected ? "text-[var(--foreground)]" : "text-[var(--foreground)]/80"}`}>
                                  {opt.value}
                                </p>
                                <p className="text-[11px] leading-snug text-[var(--foreground)]/40">
                                  {opt.desc}
                                </p>
                              </div>

                              {/* Check / spinner badge */}
                              <AnimatePresence>
                                {selected && (
                                  <motion.span
                                    key="check"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={SPRING_BADGE}
                                    className="absolute right-2.5 top-3 flex h-5 w-5 items-center justify-center rounded-full"
                                    style={{ background: c }}
                                  >
                                    {isAdvancing ? (
                                      <MaterialIcon name="progress_activity" className="animate-spin !text-[11px] text-white" />
                                    ) : (
                                      <MaterialIcon name="check" className="!text-[11px] text-white" />
                                    )}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}

                    {/* Multi-select feature chips */}
                    {step.type === "multi" && (
                      <div className="flex flex-wrap gap-2">
                        {(step.options as string[]).map((f, i) => {
                          const on = answers.features.includes(f);
                          return (
                            <motion.button
                              key={f}
                              type="button"
                              onClick={() => toggleFeature(f)}
                              initial={reduced ? false : { opacity: 0, scale: 0.88 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: reduced ? 0 : 0.04 + i * 0.03, ...SPRING_CARD }}
                              whileHover={reduced ? undefined : { scale: 1.05 }}
                              whileTap={reduced ? undefined : { scale: 0.94 }}
                              className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                                on
                                  ? "border-[#ff6b00]/50 bg-[#ff6b00]/10 text-[var(--foreground)]"
                                  : "border-[var(--landing-border)] text-[var(--foreground)]/60 hover:border-[#ff6b00]/30"
                              }`}
                            >
                              <AnimatePresence mode="wait">
                                {on && (
                                  <motion.span
                                    key="chipcheck"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="overflow-hidden"
                                  >
                                    <MaterialIcon name="check" className="!text-[13px] text-[#ff6b00]" />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              {f}
                            </motion.button>
                          );
                        })}
                                        <AnimatePresence>
                          {answers.features.includes("Other (describe below)") && (
                            <motion.div
                              key="other-input"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ type: "spring", stiffness: 400, damping: 36 }}
                              className="w-full overflow-hidden"
                            >
                              <textarea
                                rows={2}
                                value={answers.otherFeature}
                                onChange={(e) => setAnswers((a) => ({ ...a, otherFeature: e.target.value }))}
                                placeholder="Describe the feature(s) you have in mind…"
                                className="mt-1 w-full resize-none rounded-xl border border-[#ff6b00]/40 bg-[var(--landing-surface-lowest)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/35 focus:border-[#ff6b00]/60 focus:outline-none focus:ring-1 focus:ring-[#ff6b00]/30"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <p className="mt-2 w-full text-[11px] text-[var(--foreground)]/30">
                          None selected is fine — we'll suggest features based on your project type.
                        </p>
                      </div>
                    )}

                    {/* Final form step */}
                    {step.type === "form" && (
                      <motion.form
                        id="brief-form"
                        onSubmit={handleSubmit}
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.24 }}
                        className="space-y-3"
                      >
                        <textarea
                          name="description"
                          required
                          rows={4}
                          placeholder="Tell us about your project — what it does, who it's for, any specific requirements…"
                          className="w-full resize-none rounded-xl border border-[var(--landing-border)] bg-[var(--landing-surface-lowest)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/35 transition-colors focus:border-[#ff6b00]/50 focus:outline-none focus:ring-1 focus:ring-[#ff6b00]/30"
                        />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <input name="fullName" required placeholder="Your name"
                            className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-surface-lowest)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/35 transition-colors focus:border-[#ff6b00]/50 focus:outline-none focus:ring-1 focus:ring-[#ff6b00]/30"
                          />
                          <input name="email" type="email" required placeholder="Email address"
                            className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-surface-lowest)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/35 transition-colors focus:border-[#ff6b00]/50 focus:outline-none focus:ring-1 focus:ring-[#ff6b00]/30"
                          />
                        </div>
                        <input name="phone" required placeholder="Phone number"
                          className="w-full rounded-xl border border-[var(--landing-border)] bg-[var(--landing-surface-lowest)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/35 transition-colors focus:border-[#ff6b00]/50 focus:outline-none focus:ring-1 focus:ring-[#ff6b00]/30"
                        />
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-400"
                          >
                            {error}
                          </motion.p>
                        )}
                      </motion.form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Footer navigation ── */}
            <AnimatePresence>
              {!success && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.22 }}
                  className="flex shrink-0 items-center justify-between gap-3 border-t border-[var(--landing-border)] px-5 py-4 sm:px-6"
                >
                  <AnimatePresence mode="popLayout">
                    {stepIndex > 0 ? (
                      <motion.button
                        key="back"
                        type="button"
                        onClick={goBack}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={SPRING_CARD}
                        whileHover={reduced ? undefined : { scale: 1.03 }}
                        whileTap={reduced ? undefined : { scale: 0.96 }}
                        className="flex items-center gap-1.5 rounded-xl border border-[var(--landing-border)] px-4 py-2.5 text-sm text-[var(--foreground)]/60 hover:border-[var(--foreground)]/25 hover:text-[var(--foreground)]"
                      >
                        <MaterialIcon name="arrow_back" className="!text-[15px]" />
                        Back
                      </motion.button>
                    ) : (
                      <motion.div key="placeholder" className="w-0" />
                    )}
                  </AnimatePresence>

                  {step.type === "form" ? (
                    <motion.button
                      type="submit"
                      form="brief-form"
                      disabled={submitting}
                      whileHover={reduced ? undefined : { scale: 1.03 }}
                      whileTap={reduced ? undefined : { scale: 0.97 }}
                      transition={SPRING_CARD}
                      className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-5 py-2.5 text-sm font-semibold text-[#1a0a00] shadow-[0_6px_24px_-6px_rgba(255,107,0,0.55)] hover:bg-[#ff8533] disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <MaterialIcon name="progress_activity" className="animate-spin !text-[16px]" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <MaterialIcon name="send" className="!text-[15px]" />
                          Get my estimate
                        </>
                      )}
                    </motion.button>
                  ) : (
                    // Show Continue only on multi-select (single-select auto-advances)
                    step.type === "multi" && (
                      <motion.button
                        type="button"
                        onClick={goNext}
                        whileHover={reduced ? undefined : { scale: 1.03 }}
                        whileTap={reduced ? undefined : { scale: 0.97 }}
                        transition={SPRING_CARD}
                        className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-5 py-2.5 text-sm font-semibold text-[#1a0a00] shadow-[0_6px_24px_-6px_rgba(255,107,0,0.55)] hover:bg-[#ff8533]"
                      >
                        {answers.features.length === 0 ? "Skip" : "Continue"}
                        <MaterialIcon name="arrow_forward" className="!text-[15px]" />
                      </motion.button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Success view ──────────────────────────────────────────────────────────────

function SuccessView({ min, max, summary, onClose, reduced }: {
  min: number; max: number; summary: string; onClose: () => void; reduced: boolean;
}) {
  return (
    <motion.div
      key="success"
      initial={reduced ? false : { opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="flex flex-col items-center gap-5 px-6 py-10 text-center"
    >
      {/* Animated envelope */}
      <motion.span
        initial={reduced ? false : { scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 20 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff6b00]/15"
      >
        <MaterialIcon name="mark_email_read" className="!text-[36px] text-[#ff6b00]" />
      </motion.span>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.28 }}
        className="space-y-1.5"
      >
        <p className="text-xl font-bold text-[var(--foreground)]">Check your inbox!</p>
        <p className="text-sm text-[var(--foreground)]/55">
          We've sent your full quotation to your email with a private link.
        </p>
      </motion.div>

      {/* Estimate preview */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.26 }}
        className="w-full rounded-xl border border-[var(--landing-border)] bg-[var(--landing-surface-lowest)] px-4 py-3"
      >
        <p className="mb-0.5 text-[11px] text-[var(--foreground)]/40 uppercase tracking-wider">Estimated investment</p>
        <p className="text-2xl font-extrabold text-[#ff6b00]">
          {formatInrCompact(min)}
          <span className="text-lg text-[var(--foreground)]/50"> – {formatInrCompact(max)}</span>
        </p>
        <p className="mt-1 text-xs text-[var(--foreground)]/40">{summary}</p>
      </motion.div>

      {/* What's in the email */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32, duration: 0.28 }}
        className="w-full space-y-1.5 text-left"
      >
        {[
          "Full SRS (Software Requirements Specification)",
          "Phase-wise delivery roadmap",
          "Market comparison (Codeebe vs agencies)",
          "One-click to schedule a discovery call",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-[var(--foreground)]/55">
            <MaterialIcon name="check" className="!text-[13px] shrink-0 text-[#ff6b00]" />
            {item}
          </div>
        ))}
        <p className="pt-1 text-[10.5px] text-[var(--foreground)]/30">Link expires in 24 hours.</p>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.26 }}
        className="flex w-full flex-col gap-2 pt-1"
      >
        <motion.a
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={reduced ? undefined : { scale: 1.03 }}
          whileTap={reduced ? undefined : { scale: 0.97 }}
          transition={SPRING_CARD}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#ff6b00] py-3 text-sm font-semibold text-[#1a0a00] shadow-[0_6px_24px_-6px_rgba(255,107,0,0.5)] hover:bg-[#ff8533]"
        >
          <MaterialIcon name="calendar_today" className="!text-[15px]" />
          Book a free discovery call now
        </motion.a>
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={reduced ? undefined : { scale: 1.02 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          transition={SPRING_CARD}
          className="rounded-xl py-2.5 text-xs text-[var(--foreground)]/40 hover:text-[var(--foreground)]"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
