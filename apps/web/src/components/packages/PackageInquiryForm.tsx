"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { api } from "@/lib/api";
import {
  SERVICE_IDS,
  calculateEstimate,
  getPlan,
  getService,
  isPlanIdForService,
  type PlanId,
  type ServiceId,
} from "@/data/configurator";

const PRIMARY = "#FF7A00";

const INPUT_CLASS =
  "w-full rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-3.5 text-[14px] text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:border-[#FF7A00]/50 focus:bg-black/55 focus:shadow-[0_0_0_3px_rgba(255,122,0,0.12)]";

function isServiceId(v: string | null): v is ServiceId {
  return !!v && (SERVICE_IDS as string[]).includes(v);
}

export function PackageInquiryForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const selection = useMemo(() => {
    const serviceId = searchParams.get("service");
    const packageId = searchParams.get("package");

    if (!isServiceId(serviceId) || !packageId || !isPlanIdForService(serviceId, packageId)) {
      return null;
    }

    const planId = packageId as PlanId;
    const service = getService(serviceId);
    const plan = getPlan(serviceId, planId);

    if (!service || !plan) return null;

    const estimate = calculateEstimate(serviceId, planId);

    return {
      serviceId,
      planId,
      service,
      plan,
      estimate,
    };
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selection) return;

    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);

    const summaryLines = [
      `Package configurator inquiry`,
      `Service: ${selection.service.title}`,
      `Package: ${selection.plan.name}`,
      `Deliverables: ${selection.plan.deliverables}`,
      `Price: ${selection.estimate.priceFormatted}`,
      `Timeline: ${selection.estimate.timeline}`,
      `Hosting: ${selection.estimate.hosting}`,
      `Support: ${selection.estimate.support}`,
      "",
      `Message:`,
      String(fd.get("message") || ""),
    ];

    try {
      await api.createLead({
        fullName: String(fd.get("fullName")),
        email: String(fd.get("email")),
        phone: String(fd.get("phone")),
        companyName: String(fd.get("companyName") || "") || undefined,
        projectType: selection.service.title,
        description: summaryLines.join("\n"),
        features: [selection.service.title, selection.plan.name, selection.plan.deliverables],
        timeline: selection.estimate.timeline,
        budgetRange: selection.estimate.priceFormatted,
        source: "contact",
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send inquiry");
    } finally {
      setLoading(false);
    }
  }

  if (!selection) {
    return <EmptyState />;
  }

  if (success) {
    return (
      <SuccessState
        price={selection.estimate.priceFormatted}
        emailHint="Check your inbox for the quotation link."
      />
    );
  }

  const chips = [
    { label: "Service", value: selection.service.title, icon: selection.service.icon },
    { label: "Package", value: selection.plan.name, icon: "inventory_2" },
    { label: "Timeline", value: selection.estimate.timeline, icon: "schedule" },
    { label: "Hosting", value: selection.estimate.hosting, icon: "cloud" },
    { label: "Support", value: selection.estimate.support, icon: "support_agent" },
  ];

  return (
    <div className="relative mx-auto max-w-3xl">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-60 blur-[100px]"
        style={{
          background: "radial-gradient(ellipse, rgba(255,122,0,0.18), transparent 70%)",
        }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative"
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/packages#plans"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#9CA3AF] transition-colors hover:text-white"
          >
            <MaterialIcon name="arrow_back" className="!text-[16px]" />
            Edit configuration
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-[#9CA3AF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
            Configuration complete
          </span>
        </div>

        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#FF7A00]/75">
            Your estimate
          </p>
          <h1 className="font-[family-name:var(--font-family-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            {selection.estimate.priceFormatted}
          </h1>
          <p className="mt-3 text-[15px] text-[#9CA3AF]">
            {selection.plan.name} · {selection.estimate.timeline} delivery
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {chips.map((chip) => (
            <div
              key={chip.label}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#121212]/90 px-3.5 py-2 backdrop-blur-md"
            >
              <MaterialIcon
                name={chip.icon}
                className="!text-[16px]"
                style={{ color: PRIMARY }}
              />
              <div className="text-left">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                  {chip.label}
                </p>
                <p className="text-[12.5px] font-medium text-white">{chip.value}</p>
              </div>
            </div>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.08] p-6 sm:p-8"
          style={{
            background:
              "linear-gradient(165deg, rgba(255,122,0,0.07) 0%, rgba(18,18,18,0.92) 28%, rgba(18,18,18,0.96) 100%)",
            boxShadow: "0 32px 80px -40px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.03) inset",
            backdropFilter: "blur(24px)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,122,0,0.45), transparent)",
            }}
            aria-hidden
          />

          <div className="mb-7">
            <h2 className="font-[family-name:var(--font-family-display)] text-xl font-bold text-white sm:text-2xl">
              Where should we send this?
            </h2>
            <p className="mt-1.5 text-[13.5px] text-[#9CA3AF]">
              Share your details — we&apos;ll email your estimate and notify our team.
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[13px] text-red-300">
              <MaterialIcon name="error" className="!text-[18px] mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" required htmlFor="fullName">
              <input
                id="fullName"
                name="fullName"
                required
                autoComplete="name"
                placeholder="Ada Lovelace"
                className={INPUT_CLASS}
              />
            </Field>
            <Field label="Email" required htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className={INPUT_CLASS}
              />
            </Field>
            <Field label="Phone" required htmlFor="phone">
              <input
                id="phone"
                name="phone"
                required
                autoComplete="tel"
                placeholder="+91 98765 43210"
                className={INPUT_CLASS}
              />
            </Field>
            <Field label="Company" htmlFor="companyName">
              <input
                id="companyName"
                name="companyName"
                autoComplete="organization"
                placeholder="Optional"
                className={INPUT_CLASS}
              />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Message" required htmlFor="message">
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Goals, deadline, or anything we should know…"
                className={`${INPUT_CLASS} resize-none`}
                defaultValue={`I'd like to proceed with ${selection.service.title} — ${selection.plan.name} at ${selection.estimate.priceFormatted}.`}
              />
            </Field>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.985 }}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-[15px] font-bold text-[#090909] transition-colors disabled:opacity-60"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY}, #FF9333)`,
              boxShadow: "0 12px 40px -10px rgba(255,122,0,0.55)",
            }}
          >
            <MaterialIcon
              name={loading ? "hourglass_top" : "send"}
              className="!text-[18px]"
            />
            {loading ? "Sending…" : "Send my estimate"}
          </motion.button>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-[#9CA3AF]">
            <span className="inline-flex items-center gap-1.5">
              <MaterialIcon name="lock" className="!text-[14px] text-[#FF7A00]/70" />
              Private & secure
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MaterialIcon name="schedule" className="!text-[14px] text-[#FF7A00]/70" />
              Reply within 24h
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MaterialIcon name="mail" className="!text-[14px] text-[#FF7A00]/70" />
              Copy emailed to you
            </span>
          </div>

          <p className="mt-5 text-center text-[13px] leading-relaxed text-[#9CA3AF]">
            Final pricing is{" "}
            <span className="font-medium text-white/80">negotiable</span>
            {" "}based on your exact scope, features, and timeline.
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  required,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[12px] font-medium text-white/55">
        {label}
        {required && <span className="text-[#FF7A00]"> *</span>}
      </label>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#121212]">
        <MaterialIcon name="tune" className="!text-[28px] text-[#FF7A00]" />
      </div>
      <h1 className="mt-5 font-[family-name:var(--font-family-display)] text-2xl font-bold text-white">
        No package selected
      </h1>
      <p className="mt-2 text-[14px] text-[#9CA3AF]">
        Configure a service and package first, then we&apos;ll collect your details here.
      </p>
      <Link
        href="/packages#plans"
        className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#FF7A00] px-6 py-3 text-sm font-semibold text-[#090909]"
      >
        Open configurator
        <MaterialIcon name="arrow_forward" className="!text-[16px]" />
      </Link>
    </div>
  );
}

function SuccessState({ price, emailHint }: { price: string; emailHint: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto max-w-lg overflow-hidden rounded-[28px] border border-[#22C55E]/20 p-8 text-center sm:p-10"
      style={{
        background:
          "linear-gradient(180deg, rgba(34,197,94,0.08) 0%, rgba(18,18,18,0.95) 40%)",
      }}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]/15 ring-1 ring-[#22C55E]/30">
        <MaterialIcon name="check_circle" className="!text-[36px] text-[#22C55E]" />
      </div>
      <h1 className="mt-6 font-[family-name:var(--font-family-display)] text-3xl font-bold text-white">
        You&apos;re all set
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-[#9CA3AF]">
        Your {price} estimate is on the way. {emailHint} Our team has been notified.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-2xl bg-[#FF7A00] px-6 py-3 text-sm font-semibold text-[#090909]"
        >
          Back to home
        </Link>
        <Link
          href="/packages#plans"
          className="rounded-2xl border border-white/10 px-6 py-3 text-sm text-white/70 hover:text-white"
        >
          Configure another
        </Link>
      </div>
    </motion.div>
  );
}
