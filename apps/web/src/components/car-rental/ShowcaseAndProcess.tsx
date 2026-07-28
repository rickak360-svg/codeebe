"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { CR, PRIMARY_GRADIENT, Section, SectionHeading, fadeUp } from "./shared";

/* ───────────────────────── Interactive device showcase ── */
type View = { id: string; label: string; icon: string; desktop: string; mobile: string; url: string };

const VIEWS: View[] = [
  {
    id: "site",
    label: "Customer Website",
    icon: "language",
    desktop: "/projects/shubh-safar-car-rental/01-homepage-booking-hero.png",
    mobile: "/projects/shubh-safar-car-rental/mobile-01-home-booking.png",
    url: "www.shubhsafarrentals.com",
  },
  {
    id: "booking",
    label: "Booking Flow",
    icon: "event_available",
    desktop: "/projects/shubh-safar-car-rental/02-fleet-page.png",
    mobile: "/projects/shubh-safar-car-rental/mobile-02-fleet.png",
    url: "www.shubhsafarrentals.com/fleet",
  },
  {
    id: "admin",
    label: "Admin Dashboard",
    icon: "dashboard",
    desktop: "/projects/shubh-safar-car-rental/05-how-it-works.png",
    mobile: "/projects/shubh-safar-car-rental/mobile-03-admin-dashboard.png",
    url: "app.shubhsafarrentals.com/dashboard",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "insights",
    desktop: "/projects/shubh-safar-car-rental/04-travel-comfort-hero.png",
    mobile: "/projects/shubh-safar-car-rental/mobile-04-analytics.png",
    url: "app.shubhsafarrentals.com/analytics",
  },
];

function DeviceShot({
  src,
  alt,
  mode = "scroll",
}: {
  src: string;
  alt: string;
  /** scroll = full page (desktop); fill = cover phone frame with no empty gap */
  mode?: "scroll" | "fill";
}) {
  if (mode === "fill") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#f7f4ee]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-top"
          loading="lazy"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain bg-[#f3f1ea]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full max-w-none"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

export function ProductShowcase() {
  const [view, setView] = useState("site");
  const active = VIEWS.find((v) => v.id === view) ?? VIEWS[0];

  return (
    <Section id="showcase">
      <SectionHeading
        eyebrow="Product Tour"
        title={<>One platform, every <span style={{ color: CR.primary }}>screen</span></>}
        subtitle="Real screens from Shubh Safar — a live car rental platform we built. Switch views to explore desktop and mobile."
      />

      {/* View switcher */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all"
            style={{
              borderColor: view === v.id ? "transparent" : CR.border,
              background: view === v.id ? PRIMARY_GRADIENT : "rgba(255,255,255,0.03)",
              color: view === v.id ? "#0a0a0a" : "#fff",
            }}
          >
            <MaterialIcon name={v.icon} className="!text-[16px]" />
            {v.label}
          </button>
        ))}
      </div>

      {/* Devices — full site-container width to match navbar */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative mt-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" style={{ background: "rgba(255,138,0,0.12)" }} />

        <div className="relative flex w-full items-end justify-center gap-4 lg:gap-6">
          {/* Laptop */}
          <div className="relative min-w-0 flex-1">
            <div className="overflow-hidden rounded-t-2xl border border-b-0 shadow-2xl" style={{ borderColor: CR.borderHi, background: "#0d0d0d" }}>
              <div className="flex items-center gap-1.5 border-b px-4 py-2.5" style={{ borderColor: CR.border }}>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="ml-3 flex flex-1 items-center gap-1.5 rounded bg-white/[0.05] px-3 py-1 text-[9px]" style={{ color: CR.subtext }}>
                  <MaterialIcon name="lock" className="!text-[10px]" style={{ color: CR.success }} />
                  {active.url}
                </div>
              </div>
              <div className="relative h-[340px] sm:h-[420px] lg:h-[480px]" style={{ background: "#f3f1ea" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`desk-${active.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <DeviceShot src={active.desktop} alt={`Shubh Safar — ${active.label} desktop`} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            {/* laptop base */}
            <div className="mx-auto h-3 w-[102%] -translate-x-[1%] rounded-b-xl" style={{ background: "linear-gradient(180deg, #2a2a2a, #0d0d0d)" }} />
          </div>

          {/* Phone — aspect closer to real mobile screenshots */}
          <div className="relative hidden w-[11.5rem] shrink-0 sm:block xl:w-52">
            <div className="overflow-hidden rounded-[28px] border-4 shadow-2xl" style={{ borderColor: "#1a1a1a", background: "#0a0a0a" }}>
              <div className="flex justify-center py-1.5">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <div className="relative aspect-[9/14] w-full" style={{ background: "#f7f4ee" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mob-${active.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <DeviceShot
                      src={active.mobile}
                      alt={`Shubh Safar — ${active.label} mobile`}
                      mode="fill"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-[12px]" style={{ color: CR.subtext }}>
          Screenshots from{" "}
          <a
            href="https://www.shubhsafarrentals.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-white/70"
          >
            shubhsafarrentals.com
          </a>
          {" "}— scroll the laptop preview for the full desktop page.
        </p>
      </motion.div>

      {/* ── Live demo: real client platform ── */}
      <LiveDemo />
    </Section>
  );
}

const DEMO_URL = "https://www.shubhsafarrentals.com/";

function LiveDemo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mt-16 w-full"
    >
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.1)", color: CR.success }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
            </span>
            Live client platform
          </span>
          <h3 className="font-[family-name:var(--font-family-display)] text-xl font-bold text-white sm:text-2xl">
            See a real platform we built
          </h3>
          <p className="mt-1 text-[13.5px]" style={{ color: CR.subtext }}>
            Shubh Safar — a self-drive rental platform live in Ranchi. Explore it right here.
          </p>
        </div>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-[#0a0a0a]"
          style={{ background: PRIMARY_GRADIENT }}
        >
          <MaterialIcon name="open_in_new" className="!text-[16px]" />
          Open live demo
        </a>
      </div>

      <div className="overflow-hidden rounded-[20px] border shadow-2xl" style={{ borderColor: CR.borderHi, background: "#0d0d0d" }}>
        {/* browser chrome */}
        <div className="flex items-center gap-1.5 border-b px-4 py-2.5" style={{ borderColor: CR.border }}>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex flex-1 items-center gap-1.5 rounded bg-white/[0.05] px-3 py-1 text-[10px]" style={{ color: CR.subtext }}>
            <MaterialIcon name="lock" className="!text-[10px]" style={{ color: CR.success }} />
            www.shubhsafarrentals.com
          </div>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors hover:text-white">
            <MaterialIcon name="open_in_full" className="!text-[15px]" />
          </a>
        </div>

        {/* live iframe */}
        <div className="relative w-full" style={{ height: "560px", background: "#0a0a0a" }}>
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10" style={{ borderTopColor: CR.primary }} />
              <p className="text-[12px]" style={{ color: CR.subtext }}>Loading live demo…</p>
            </div>
          )}
          <iframe
            src={DEMO_URL}
            title="Shubh Safar — live car rental platform demo"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="h-full w-full"
            style={{ border: "none", opacity: loaded ? 1 : 0, transition: "opacity 0.4s" }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
          />
        </div>

        {/* status bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-2.5" style={{ borderColor: CR.border }}>
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: CR.subtext }}>
            <MaterialIcon name="verified" className="!text-[13px]" style={{ color: CR.primary }} />
            Real platform built by Codeebe
          </span>
          <a href="#estimator" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold text-[#0a0a0a]" style={{ background: PRIMARY_GRADIENT }}>
            <MaterialIcon name="auto_awesome" className="!text-[12px]" /> Get one like this
          </a>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px]" style={{ color: CR.subtext }}>
        Live preview of{" "}
        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-white/60">
          shubhsafarrentals.com
        </a>
        {" "}— if it doesn&apos;t load here, use &ldquo;Open live demo&rdquo; above.
      </p>
    </motion.div>
  );
}

/* ───────────────────────── Development Process Timeline ── */
const STEPS = [
  { title: "Consultation", desc: "We understand your business, fleet & goals.", icon: "forum" },
  { title: "Requirements", desc: "Detailed scope, features & success metrics.", icon: "fact_check" },
  { title: "UI/UX Design", desc: "Premium, on-brand interface prototypes.", icon: "design_services" },
  { title: "Development", desc: "Agile sprints with weekly demos.", icon: "code" },
  { title: "Testing", desc: "QA, security & load testing.", icon: "bug_report" },
  { title: "Deployment", desc: "Zero-downtime launch to production.", icon: "rocket_launch" },
  { title: "Training", desc: "Hands-on onboarding for your team.", icon: "school" },
  { title: "Support", desc: "Ongoing maintenance & upgrades.", icon: "support_agent" },
];

export function ProcessTimeline() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="How We Work"
        title={<>From idea to launch in <span style={{ color: CR.primary }}>8 clear steps</span></>}
        subtitle="A proven, transparent process — you always know exactly where your project stands."
      />

      <div className="relative mt-16">
        {/* connecting line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block" style={{ background: "linear-gradient(180deg, transparent, rgba(255,138,0,0.4), transparent)" }} />

        <div className="space-y-5 lg:space-y-0">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`relative flex items-center gap-5 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12" : "lg:ml-auto lg:flex-row-reverse lg:pl-12"}`}
            >
              {/* node */}
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: PRIMARY_GRADIENT, boxShadow: "0 8px 30px -6px rgba(255,138,0,0.5)" }}>
                <MaterialIcon name={s.icon} className="!text-[26px] text-[#0a0a0a]" />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: CR.surfaceHi, border: `1px solid ${CR.borderHi}` }}>{i + 1}</span>
              </div>
              <div className={`flex-1 rounded-2xl border p-5 ${i % 2 === 0 ? "lg:text-right" : ""}`} style={{ borderColor: CR.border, background: "rgba(255,255,255,0.02)" }}>
                <h3 className="font-[family-name:var(--font-family-display)] text-[17px] font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-[13px]" style={{ color: CR.subtext }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
