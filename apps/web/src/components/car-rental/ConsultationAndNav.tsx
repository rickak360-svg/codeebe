"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { api } from "@/lib/api";
import { CR, PRIMARY_GRADIENT, Section, SectionHeading, PrimaryButton } from "./shared";

const INPUT =
  "w-full rounded-xl border bg-black/40 px-4 py-3 text-[14px] text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(255,138,0,0.12)]";

const businessTypes = ["Self Drive", "Luxury Rental", "Bike Rental", "Corporate Rental", "Mixed Fleet"];
const budgets = ["Under ₹3L", "₹3L – ₹6L", "₹6L – ₹12L", "₹12L – ₹25L", "₹25L+"];
const timelines = ["ASAP (4–8 weeks)", "1–3 months", "3–6 months", "Flexible"];

export function ConsultationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await api.createLead({
        fullName: String(fd.get("name")),
        email: String(fd.get("email")),
        phone: String(fd.get("phone")),
        companyName: String(fd.get("company") || "") || undefined,
        projectType: "Car Rental Platform",
        description: [
          "Free consultation request — Car Rental Platform",
          `Business type: ${fd.get("businessType") || "—"}`,
          `Budget: ${fd.get("budget") || "—"}`,
          `Timeline: ${fd.get("timeline") || "—"}`,
          "",
          "Message:",
          String(fd.get("message") || "—"),
        ].join("\n"),
        features: ["Car Rental Platform", String(fd.get("businessType") || "")].filter(Boolean),
        timeline: String(fd.get("timeline") || ""),
        budgetRange: String(fd.get("budget") || ""),
        source: "contact",
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="contact">
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-[60%] -translate-x-1/2 rounded-full blur-[130px]" style={{ background: "rgba(255,138,0,0.1)" }} />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        {/* Left copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Let's Talk"
            title={<>Book your <span style={{ color: CR.primary }}>free consultation</span></>}
            subtitle="Tell us about your business. We'll respond within 24 hours with a tailored plan, timeline, and quote — no obligation."
          />
          <div className="mt-8 space-y-4">
            {[
              { icon: "schedule", title: "24-hour response", desc: "Real humans, fast replies." },
              { icon: "handshake", title: "No-pressure consultation", desc: "Advice first, always." },
              { icon: "lock", title: "Your details stay private", desc: "We never share your data." },
            ].map((it) => (
              <div key={it.title} className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(255,138,0,0.12)" }}>
                  <MaterialIcon name={it.icon} className="!text-[20px]" style={{ color: CR.primary }} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">{it.title}</p>
                  <p className="text-[12.5px]" style={{ color: CR.subtext }}>{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[28px] border p-6 sm:p-8"
          style={{ borderColor: CR.borderHi, background: "rgba(17,17,17,0.92)" }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,138,0,0.5), transparent)" }} />

          {success ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.15)" }}>
                <MaterialIcon name="check_circle" className="!text-[36px]" style={{ color: CR.success }} />
              </div>
              <h3 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white">Thank you!</h3>
              <p className="mx-auto mt-2 max-w-sm text-[14px]" style={{ color: CR.subtext }}>
                Your consultation request is in. Our team will reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[13px] text-red-300">
                  <MaterialIcon name="error" className="!text-[16px]" />{error}
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="name" required placeholder="Full name *" className={INPUT} style={{ borderColor: CR.border }} />
                <input name="email" type="email" required placeholder="Email *" className={INPUT} style={{ borderColor: CR.border }} />
                <input name="phone" required placeholder="Phone *" className={INPUT} style={{ borderColor: CR.border }} />
                <input name="company" placeholder="Company" className={INPUT} style={{ borderColor: CR.border }} />
                <select name="businessType" defaultValue="" className={INPUT} style={{ borderColor: CR.border }}>
                  <option value="" disabled>Business type</option>
                  {businessTypes.map((b) => <option key={b} value={b} className="bg-[#111]">{b}</option>)}
                </select>
                <select name="budget" defaultValue="" className={INPUT} style={{ borderColor: CR.border }}>
                  <option value="" disabled>Budget range</option>
                  {budgets.map((b) => <option key={b} value={b} className="bg-[#111]">{b}</option>)}
                </select>
              </div>
              <select name="timeline" defaultValue="" className={`${INPUT} mt-3`} style={{ borderColor: CR.border }}>
                <option value="" disabled>Expected timeline</option>
                {timelines.map((t) => <option key={t} value={t} className="bg-[#111]">{t}</option>)}
              </select>
              <textarea name="message" rows={3} placeholder="Tell us about your project…" className={`${INPUT} mt-3 resize-none`} style={{ borderColor: CR.border }} />

              <PrimaryButton type="submit" className="mt-5 w-full">
                {loading ? <><MaterialIcon name="hourglass_top" className="!text-[16px]" /> Sending…</> : <><MaterialIcon name="event_available" className="!text-[16px]" /> Book Free Consultation</>}
              </PrimaryButton>
              <p className="mt-4 text-center text-[11.5px]" style={{ color: CR.subtext }}>
                We&apos;ll never spam you. Response within 24 hours.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

/* ───────────────────────── In-page sticky sub-nav ── */
const NAV = [
  { label: "Overview", href: "#problems" },
  { label: "Platform", href: "#features" },
  { label: "Product", href: "#showcase" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function CarRentalSubNav() {
  return (
    <div className="sticky top-[4.75rem] z-[60] hidden border-y sm:block" style={{ borderColor: CR.border, background: "rgba(7,7,7,0.92)", backdropFilter: "blur(16px)" }}>
      <div className="site-container">
        <div className="flex items-center justify-between gap-3 py-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            <span className="mr-2 hidden shrink-0 items-center gap-1.5 text-[12px] font-semibold text-white md:inline-flex">
              <MaterialIcon name="directions_car" className="!text-[15px]" style={{ color: CR.primary }} />
              Car Rental
            </span>
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </div>
          <a
            href="#estimator"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#0a0a0a]"
            style={{ background: PRIMARY_GRADIENT }}
          >
            <MaterialIcon name="auto_awesome" className="!text-[14px]" />
            Get Estimate
          </a>
        </div>
      </div>
    </div>
  );
}
