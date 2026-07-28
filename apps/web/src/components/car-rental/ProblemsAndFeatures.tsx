"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { CR, PRIMARY_GRADIENT, Section, SectionHeading, fadeUp } from "./shared";

/* ───────────────────────── Problems We Solve ── */
const PROBLEMS = [
  { pain: "Manual bookings over calls", fix: "Automated 24/7 booking engine", icon: "call_end", fixIcon: "event_available" },
  { pain: "Chaotic WhatsApp management", fix: "Centralized booking inbox + CRM", icon: "chat_bubble", fixIcon: "contacts" },
  { pain: "Excel-based fleet tracking", fix: "Real-time fleet dashboard", icon: "table_chart", fixIcon: "directions_car" },
  { pain: "Zero analytics or insights", fix: "Revenue & utilization analytics", icon: "visibility_off", fixIcon: "insights" },
  { pain: "No customer login or history", fix: "Customer portal & wallet", icon: "no_accounts", fixIcon: "account_circle" },
  { pain: "Manual billing & no reports", fix: "GST billing, invoices & reports", icon: "receipt", fixIcon: "receipt_long" },
];

export function ProblemsSolved() {
  const [active, setActive] = useState(0);
  const current = PROBLEMS[active];

  return (
    <Section id="problems">
      <SectionHeading
        eyebrow="The Problem"
        title={<>Stop running your fleet on <span style={{ color: CR.primary }}>guesswork</span></>}
        subtitle="Most rental businesses lose revenue to manual chaos. Here's what a real platform replaces."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* Left: problem list */}
        <div className="space-y-3">
          {PROBLEMS.map((p, i) => (
            <motion.button
              key={p.pain}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className="group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200"
              style={{
                borderColor: active === i ? "rgba(255,138,0,0.4)" : CR.border,
                background: active === i ? "rgba(255,138,0,0.06)" : "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(239,68,68,0.12)" }}>
                <MaterialIcon name={p.icon} className="!text-[19px] text-red-400" />
              </div>
              <span className="flex-1 text-[14px] font-medium text-white/85">{p.pain}</span>
              <MaterialIcon
                name="arrow_forward"
                className="!text-[18px] transition-transform group-hover:translate-x-1"
                style={{ color: active === i ? CR.primary : CR.subtext }}
              />
            </motion.button>
          ))}
        </div>

        {/* Right: solution preview */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[24px] border p-8"
          style={{ borderColor: CR.borderHi, background: "linear-gradient(160deg, rgba(255,138,0,0.08), rgba(17,17,17,0.95) 45%)" }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-[80px]" style={{ background: "rgba(255,138,0,0.2)" }} />
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(34,197,94,0.15)", color: CR.success }}>
            <MaterialIcon name="check_circle" className="!text-[13px]" /> Solved by Codeebe
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative mt-6"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: PRIMARY_GRADIENT }}>
                <MaterialIcon name={current.fixIcon} className="!text-[30px] text-[#0a0a0a]" />
              </div>
              <h3 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white">{current.fix}</h3>
              <p className="mt-3 text-[14px] leading-relaxed" style={{ color: CR.subtext }}>
                Replace <span className="text-red-400/90">{current.pain.toLowerCase()}</span> with a purpose-built module
                that runs automatically, scales with your fleet, and gives you full visibility in real time.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {["Automated", "Real-time", "Scalable"].map((tag) => (
                  <div key={tag} className="rounded-xl border px-3 py-2 text-center text-[11px] font-medium text-white/70" style={{ borderColor: CR.border, background: "rgba(255,255,255,0.03)" }}>
                    {tag}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}

/* ───────────────────────── Platform Features (Bento) ── */
type Feature = { title: string; desc: string; icon: string; span?: string; highlight?: boolean };

const FEATURES: Feature[] = [
  { title: "Online Booking Engine", desc: "Real-time availability, instant reservations, and smart pricing rules.", icon: "event_available", span: "sm:col-span-2 sm:row-span-2", highlight: true },
  { title: "Fleet Management", desc: "Track every vehicle, status, and location in one dashboard.", icon: "directions_car" },
  { title: "AI Booking Assistant", desc: "Converts visitors into bookings with conversational AI.", icon: "auto_awesome", highlight: true },
  { title: "Admin Dashboard", desc: "Command center for your entire operation.", icon: "dashboard", span: "sm:col-span-2" },
  { title: "Customer Portal", desc: "Login, history, wallet & referrals.", icon: "account_circle" },
  { title: "GST Billing & Invoices", desc: "Compliant billing, auto-generated invoices.", icon: "receipt_long" },
  { title: "Analytics", desc: "Revenue, utilization & growth insights.", icon: "insights" },
  { title: "Payment Gateway", desc: "Razorpay, Stripe, UPI & more.", icon: "credit_card" },
  { title: "WhatsApp & Email", desc: "Automated notifications end to end.", icon: "forward_to_inbox" },
  { title: "GPS Ready", desc: "Live tracking & geofencing.", icon: "gps_fixed" },
  { title: "Multi-Branch & Roles", desc: "Franchise, branches & granular access.", icon: "account_tree" },
];

export function PlatformFeatures() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="The Platform"
        title={<>Everything your rental business needs, <span style={{ color: CR.primary }}>in one system</span></>}
        subtitle="A complete, modular platform — pick what you need today and switch on more as you grow."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            custom={i}
            variants={fadeUp}
            className={`group relative overflow-hidden rounded-[20px] border p-6 ${f.span ?? ""}`}
            style={{
              borderColor: f.highlight ? "rgba(255,138,0,0.3)" : CR.border,
              background: f.highlight
                ? "linear-gradient(160deg, rgba(255,138,0,0.1), rgba(17,17,17,0.95) 55%)"
                : "rgba(255,255,255,0.02)",
            }}
            whileHover={{ y: -4 }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse 70% 60% at 30% 0%, rgba(255,138,0,0.1), transparent)" }} />
            <div className="relative">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: f.highlight ? PRIMARY_GRADIENT : "rgba(255,138,0,0.12)" }}>
                <MaterialIcon name={f.icon} className="!text-[22px]" style={{ color: f.highlight ? "#0a0a0a" : CR.primary }} />
              </div>
              <h3 className="font-[family-name:var(--font-family-display)] text-[17px] font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: CR.subtext }}>{f.desc}</p>
            </div>
          </motion.div>
        ))}

        {/* CTA tile */}
        <motion.a
          href="#estimator"
          custom={FEATURES.length}
          variants={fadeUp}
          whileHover={{ y: -4 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] p-6"
          style={{ background: PRIMARY_GRADIENT }}
        >
          <MaterialIcon name="tune" className="!text-[26px] text-[#0a0a0a]" />
          <div>
            <h3 className="font-[family-name:var(--font-family-display)] text-[17px] font-bold text-[#0a0a0a]">+15 more modules</h3>
            <p className="mt-1 flex items-center gap-1 text-[13px] font-semibold text-[#0a0a0a]/80">
              Configure yours <MaterialIcon name="arrow_forward" className="!text-[15px] transition-transform group-hover:translate-x-1" />
            </p>
          </div>
        </motion.a>
      </motion.div>
    </Section>
  );
}
