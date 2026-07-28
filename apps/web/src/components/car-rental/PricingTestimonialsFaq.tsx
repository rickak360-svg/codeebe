"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { CR, PRIMARY_GRADIENT, Section, SectionHeading, fadeUp, PrimaryButton, GhostButton } from "./shared";

/* ───────────────────────── Pricing Plans ── */
const PLANS = [
  {
    name: "Starter",
    tagline: "Launch fast, lean & clean",
    price: "₹1.5L",
    period: "one-time",
    icon: "rocket_launch",
    popular: false,
    features: ["Customer website", "Online booking engine", "Fleet listing & search", "Payment gateway", "Basic admin dashboard", "1 year hosting", "45 days support"],
    maintenance: "₹4,000/mo",
  },
  {
    name: "Professional",
    tagline: "The complete rental platform",
    price: "₹4.5L",
    period: "one-time",
    icon: "workspace_premium",
    popular: true,
    features: ["Everything in Starter", "Customer & driver portals", "Fleet & maintenance modules", "GST billing + invoices", "Analytics dashboard", "WhatsApp + email automation", "Coupons, wallet & referrals", "60 days support"],
    maintenance: "₹9,000/mo",
  },
  {
    name: "Enterprise",
    tagline: "Scale without limits",
    price: "Custom",
    period: "from ₹9L",
    icon: "corporate_fare",
    popular: false,
    features: ["Everything in Professional", "Native Android & iOS apps", "AI booking assistant & chatbot", "Multi-branch & franchise", "GPS + fuel tracking", "CRM + advanced roles", "Dedicated architecture", "90 days priority support"],
    maintenance: "Custom SLA",
  },
];

export function PricingPlans() {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title={<>Transparent plans, <span style={{ color: CR.primary }}>no surprises</span></>}
        subtitle="One-time build cost with everything included. Optional monthly maintenance keeps you effortless."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.name}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -6 }}
            className="relative flex flex-col overflow-hidden rounded-[24px] border p-7"
            style={{
              borderColor: p.popular ? "rgba(255,138,0,0.45)" : CR.border,
              background: p.popular ? "linear-gradient(180deg, rgba(255,138,0,0.1), rgba(17,17,17,0.97) 40%)" : "rgba(255,255,255,0.02)",
              boxShadow: p.popular ? "0 30px 80px -30px rgba(255,138,0,0.35)" : "none",
              transform: p.popular ? "scale(1.03)" : undefined,
            }}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0a0a0a]" style={{ background: PRIMARY_GRADIENT }}>
                Most Popular
              </div>
            )}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: p.popular ? PRIMARY_GRADIENT : "rgba(255,138,0,0.12)" }}>
                <MaterialIcon name={p.icon} className="!text-[22px]" style={{ color: p.popular ? "#0a0a0a" : CR.primary }} />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-family-display)] text-xl font-bold text-white">{p.name}</h3>
                <p className="text-[12px]" style={{ color: CR.subtext }}>{p.tagline}</p>
              </div>
            </div>

            <div className="mb-5 flex items-end gap-2 border-b pb-5" style={{ borderColor: CR.border }}>
              <span className="font-[family-name:var(--font-family-display)] text-4xl font-bold text-white">{p.price}</span>
              <span className="pb-1 text-[12px]" style={{ color: CR.subtext }}>{p.period}</span>
            </div>

            <ul className="mb-6 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/75">
                  <MaterialIcon name="check_circle" className="!text-[16px] mt-px shrink-0" style={{ color: p.popular ? CR.primary : CR.success }} />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mb-5 rounded-xl border px-3 py-2 text-center text-[12px]" style={{ borderColor: CR.border, background: "rgba(255,255,255,0.02)", color: CR.subtext }}>
              Maintenance: <span className="font-semibold text-white">{p.maintenance}</span>
            </div>

            {p.popular ? (
              <PrimaryButton href="#estimator" className="w-full">Get started</PrimaryButton>
            ) : (
              <GhostButton href="#estimator" className="w-full">Choose {p.name}</GhostButton>
            )}
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center text-[13px]" style={{ color: CR.subtext }}>
        Need something specific? <a href="#estimator" className="font-semibold underline" style={{ color: CR.primary }}>Build a custom estimate →</a>
      </p>
    </Section>
  );
}

/* ───────────────────────── Testimonials ── */
type Review = {
  quote: string;
  name: string;
  role: string;
  metric: string;
  photo: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "Codeebe rebuilt our entire rental operation. Bookings are up 40% and I finally have real numbers to make decisions. The platform paid for itself in the first quarter.",
    name: "Rahul Mehta",
    role: "Founder, DriveLux",
    metric: "+40% bookings",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    quote: "The admin dashboard alone saved us two full-time staff. Everything just works and the AI assistant handles most enquiries.",
    name: "Priya Nair",
    role: "Ops Head, MetroFleet",
    metric: "2 FTEs saved",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    quote: "From consultation to launch in 9 weeks. Premium quality, fair pricing, and support that actually responds.",
    name: "Arjun Kapoor",
    role: "CEO, Voyage Rentals",
    metric: "9 week launch",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
  },
];

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, s) => (
        <MaterialIcon key={s} name="star" style={{ color: CR.primary, fontSize: size }} />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const featured = REVIEWS[featuredIdx];
  const others = REVIEWS
    .map((r, i) => ({ ...r, idx: i }))
    .filter((r) => r.idx !== featuredIdx);

  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Client Stories"
        title={<>Rental brands that <span style={{ color: CR.primary }}>grew with us</span></>}
        subtitle="Real results from real operators running on Codeebe platforms. Click a story to feature it."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-5 lg:items-stretch">
        <div className="relative lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.figure
              key={featured.name}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[28px] border p-8 sm:p-10"
              style={{
                borderColor: "rgba(255,138,0,0.28)",
                background: "linear-gradient(145deg, rgba(255,138,0,0.1) 0%, rgba(17,17,17,0.97) 42%)",
                boxShadow: "0 30px 80px -36px rgba(255,138,0,0.35)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[90px]"
                style={{ background: "rgba(255,138,0,0.18)" }}
                aria-hidden
              />

              <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
                <Stars size={18} />
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                  style={{ background: "rgba(34,197,94,0.14)", color: CR.success }}
                >
                  {featured.metric}
                </span>
              </div>

              <blockquote className="relative flex-1 font-[family-name:var(--font-family-display)] text-[clamp(1.15rem,2.4vw,1.55rem)] font-medium leading-snug text-white">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>

              <div className="relative mt-8 flex items-center gap-4 border-t pt-6" style={{ borderColor: CR.border }}>
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#FF8A00]/40 ring-offset-2 ring-offset-[#111]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.photo}
                    alt={featured.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <figcaption className="text-[16px] font-semibold text-white">{featured.name}</figcaption>
                  <p className="mt-0.5 text-[13px]" style={{ color: CR.subtext }}>{featured.role}</p>
                </div>
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-2">
          <AnimatePresence mode="popLayout">
            {others.map((r) => (
              <motion.button
                key={r.name}
                type="button"
                layout
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setFeaturedIdx(r.idx)}
                className="group flex flex-1 flex-col rounded-[22px] border p-5 text-left transition-colors sm:p-6"
                style={{ borderColor: CR.border, background: "rgba(255,255,255,0.02)" }}
                whileHover={{ borderColor: "rgba(255,138,0,0.35)", background: "rgba(255,138,0,0.05)" }}
                aria-label={`Show ${r.name}'s review`}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <Stars size={14} />
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ background: "rgba(34,197,94,0.12)", color: CR.success }}
                  >
                    {r.metric}
                  </span>
                </div>
                <blockquote className="flex-1 text-[13px] leading-relaxed text-white/80">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3 border-t pt-4" style={{ borderColor: CR.border }}>
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.photo} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-white">{r.name}</span>
                    <span className="block truncate text-[11px]" style={{ color: CR.subtext }}>{r.role}</span>
                  </div>
                  <MaterialIcon
                    name="arrow_outward"
                    className="!text-[16px] shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
                    style={{ color: CR.primary }}
                  />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────── FAQ ── */
const FAQS = [
  { q: "How long does it take to build a car rental platform?", a: "A Starter build launches in 4–6 weeks, Professional in 8–12 weeks, and Enterprise (with native apps and AI) in 12–20 weeks — depending on the modules you select in the estimator." },
  { q: "Do I own the platform and its code?", a: "Yes, 100%. It's a one-time build cost and the platform is entirely yours — no per-booking fees, no vendor lock-in. You can host it anywhere." },
  { q: "Can I start small and add modules later?", a: "Absolutely. Every platform is built modularly. Start with core booking and fleet management, then switch on AI, apps, franchise management, and more as you grow." },
  { q: "Which payment gateways do you integrate?", a: "Razorpay, Stripe, PayU, CCAvenue, and UPI out of the box. If you use a specific gateway, we'll confirm compatibility during consultation." },
  { q: "Do you provide native mobile apps?", a: "Yes — native Android and iOS apps are available in the Professional and Enterprise tiers, along with a fast PWA option for lighter budgets." },
  { q: "What about ongoing maintenance and support?", a: "Every plan includes post-launch support (45–90 days). After that, optional monthly maintenance covers hosting, updates, security patches, and priority support." },
  { q: "Is my data and my customers' data secure?", a: "Security is foundational: encrypted data at rest and in transit, role-based access control, secure authentication, and regular security testing on every build." },
];

export function CarRentalFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title={<>Questions, <span style={{ color: CR.primary }}>answered</span></>}
        subtitle="Everything you need to know before starting your project."
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: isOpen ? "rgba(255,138,0,0.3)" : CR.border, background: isOpen ? "rgba(255,138,0,0.05)" : "rgba(255,255,255,0.02)" }}
            >
              <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="text-[14.5px] font-medium text-white">{f.q}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <MaterialIcon name="expand_more" className="!text-[16px]" style={{ color: isOpen ? CR.primary : CR.subtext }} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden">
                    <p className="px-5 pb-5 pt-1 text-[13.5px] leading-relaxed" style={{ color: CR.subtext }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
