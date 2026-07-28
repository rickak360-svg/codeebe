"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { api } from "@/lib/api";
import type { IndustryConfig } from "@/data/industries/types";
import { useTheme, gradientOf, Section, SectionHeading, PrimaryButton, fadeUp } from "./theme";

/* ───────────────────────── Packages ── */
export function Packages({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Packages"
        title={<>Transparent pricing, <span style={{ color: t.primary }}>zero surprises</span></>}
        subtitle="Pick a starting point — every plan is fully customizable and scales as you grow."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-center">
        {config.packages.map((p, i) => {
          const popular = p.popular;
          return (
            <motion.div
              key={p.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative flex flex-col overflow-hidden rounded-[28px] border p-7"
              style={{
                borderColor: popular ? "transparent" : t.border,
                background: popular ? t.surface : t.overlay,
                boxShadow: popular ? `0 0 0 2px ${t.primary}, 0 30px 80px -30px ${t.glow}` : "none",
                transform: popular ? "scale(1.03)" : undefined,
              }}
            >
              {popular && (
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[70px]" style={{ background: t.glow }} />
              )}
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-family-display)] text-lg font-bold" style={{ color: t.text }}>{p.name}</h3>
                  {popular && (
                    <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: gradientOf(t), color: t.onPrimary }}>Most popular</span>
                  )}
                </div>
                <p className="mt-1 text-[12.5px]" style={{ color: t.subtext }}>{p.tagline}</p>
                <div className="mt-5 flex items-end gap-1.5">
                  <span className="font-[family-name:var(--font-family-display)] text-[2.4rem] font-bold leading-none" style={{ color: t.text }}>{p.price}</span>
                  <span className="pb-1 text-[12px]" style={{ color: t.subtext }}>{p.period}</span>
                </div>

                <div className="my-6 h-px" style={{ background: t.border }} />

                <ul className="space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px]" style={{ color: t.text }}>
                      <MaterialIcon name="check_circle" className="!text-[16px] mt-0.5 shrink-0" style={{ color: t.primary }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  {popular ? (
                    <PrimaryButton href="#contact" className="w-full">{p.cta}</PrimaryButton>
                  ) : (
                    <a href="#contact" className="flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[14px] font-semibold transition-all hover:-translate-y-0.5" style={{ borderColor: t.borderHi, color: t.text }}>
                      {p.cta}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ───────────────────────── Contact form ── */
const budgets = ["Under ₹3L", "₹3L – ₹6L", "₹6L – ₹12L", "₹12L – ₹25L", "₹25L+"];
const timelines = ["ASAP (4–8 weeks)", "1–3 months", "3–6 months", "Flexible"];

export function Contact({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const inputStyle = { borderColor: t.border, background: t.dark ? "rgba(0,0,0,0.4)" : "#fff", color: t.text } as const;
  const inputCls = "w-full rounded-xl border px-4 py-3 text-[14px] outline-none transition-all duration-200";

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
        projectType: config.estimator.industryLabel,
        description: [
          `Free consultation request — ${config.estimator.industryLabel}`,
          `Business type: ${fd.get("businessType") || "—"}`,
          `Budget: ${fd.get("budget") || "—"}`,
          `Timeline: ${fd.get("timeline") || "—"}`,
          "",
          "Message:",
          String(fd.get("message") || "—"),
        ].join("\n"),
        features: [config.estimator.industryLabel, String(fd.get("businessType") || "")].filter(Boolean),
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
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-[60%] -translate-x-1/2 rounded-full blur-[130px]" style={{ background: t.glow }} />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Let's Talk"
            title={<>{config.contact.heading.split("free")[0]}<span style={{ color: t.primary }}>free consultation</span></>}
            subtitle={config.contact.subtitle}
          />
          <div className="mt-8 space-y-4">
            {config.contact.perks.map((it) => (
              <div key={it.title} className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: t.softTint }}>
                  <MaterialIcon name={it.icon} className="!text-[20px]" style={{ color: t.primary }} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: t.text }}>{it.title}</p>
                  <p className="text-[12.5px]" style={{ color: t.subtext }}>{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[28px] border p-6 sm:p-8" style={{ borderColor: t.borderHi, background: t.surface }}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)` }} />

          {success ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: `${t.success}26` }}>
                <MaterialIcon name="check_circle" className="!text-[36px]" style={{ color: t.success }} />
              </div>
              <h3 className="font-[family-name:var(--font-family-display)] text-2xl font-bold" style={{ color: t.text }}>Thank you!</h3>
              <p className="mx-auto mt-2 max-w-sm text-[14px]" style={{ color: t.subtext }}>Your consultation request is in. Our team will reach out within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[13px] text-red-400">
                  <MaterialIcon name="error" className="!text-[16px]" />{error}
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="name" required placeholder="Full name *" className={inputCls} style={inputStyle} />
                <input name="email" type="email" required placeholder="Email *" className={inputCls} style={inputStyle} />
                <input name="phone" required placeholder="Phone *" className={inputCls} style={inputStyle} />
                <input name="company" placeholder="Business name" className={inputCls} style={inputStyle} />
                <select name="businessType" defaultValue="" className={inputCls} style={inputStyle}>
                  <option value="" disabled>Business type</option>
                  {config.contact.businessTypes.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <select name="budget" defaultValue="" className={inputCls} style={inputStyle}>
                  <option value="" disabled>Budget range</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <select name="timeline" defaultValue="" className={`${inputCls} mt-3`} style={inputStyle}>
                <option value="" disabled>Expected timeline</option>
                {timelines.map((tl) => <option key={tl} value={tl}>{tl}</option>)}
              </select>
              <textarea name="message" rows={3} placeholder="Tell us about your project…" className={`${inputCls} mt-3 resize-none`} style={inputStyle} />

              <PrimaryButton type="submit" className="mt-5 w-full">
                {loading ? <><MaterialIcon name="hourglass_top" className="!text-[16px]" /> Sending…</> : <><MaterialIcon name="event_available" className="!text-[16px]" /> Book Free Consultation</>}
              </PrimaryButton>
              <p className="mt-4 text-center text-[11.5px]" style={{ color: t.subtext }}>We&apos;ll never spam you. Response within 24 hours.</p>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

/* ───────────────────────── Premium CTA / footer band ── */
export function CtaBand({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[36px] border p-10 text-center sm:p-16"
        style={{ borderColor: t.borderHi, background: `linear-gradient(140deg, ${t.softTint}, ${t.surface})` }}
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full blur-[120px]" style={{ background: t.glow }} />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full blur-[120px]" style={{ background: t.glow }} />
        <div className="relative">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: gradientOf(t) }}>
            <MaterialIcon name={config.navIcon} className="!text-[28px]" style={{ color: t.onPrimary }} />
          </div>
          <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-family-display)] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1]" style={{ color: t.text }}>
            Ready to build the best {config.navLabel.toLowerCase()} platform in your city?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px]" style={{ color: t.subtext }}>
            Get a free consultation and an instant AI estimate. No pressure, no obligation — just a clear plan to grow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton href="#estimator"><MaterialIcon name="auto_awesome" className="!text-[17px]" /> Get Instant Estimate</PrimaryButton>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[14px] font-medium transition-all hover:-translate-y-0.5" style={{ borderColor: t.borderHi, color: t.text }}>
              <MaterialIcon name="calendar_month" className="!text-[17px]" style={{ color: t.primary }} /> Book a Call
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
