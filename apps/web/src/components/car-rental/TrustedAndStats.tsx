"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { CR, Section, SectionHeading, fadeUp } from "./shared";

/* ───────────────────────── Trusted By marquee ── */
const TRUSTED = [
  { name: "DriveLux", icon: "diamond" },
  { name: "MetroFleet", icon: "local_taxi" },
  { name: "Voyage Rentals", icon: "flight_takeoff" },
  { name: "UrbanWheels", icon: "directions_car" },
  { name: "Apex Corporate", icon: "corporate_fare" },
  { name: "RideNow", icon: "bolt" },
  { name: "Elite Motors", icon: "star" },
  { name: "GoCabs", icon: "airport_shuttle" },
];

export function TrustedBy() {
  const row = [...TRUSTED, ...TRUSTED];
  return (
    <section className="relative border-y py-12" style={{ borderColor: CR.border }}>
      <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: CR.subtext }}>
        Trusted by rental brands & fleet operators
      </p>
      <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)" }}>
        <motion.div
          className="flex w-max gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {row.map((b, i) => (
            <div key={i} className="flex shrink-0 items-center gap-2.5 opacity-60 transition-opacity hover:opacity-100">
              <MaterialIcon name={b.icon} className="!text-[22px]" style={{ color: CR.primary }} />
              <span className="font-[family-name:var(--font-family-display)] text-lg font-semibold text-white/80">{b.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Animated stats ── */
function StatNumber({ value, suffix, decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 120, suffix: "+", label: "Platforms shipped", icon: "rocket_launch" },
  { value: 98.6, suffix: "%", label: "Client satisfaction", decimals: 1, icon: "sentiment_very_satisfied" },
  { value: 8, suffix: "+ yrs", label: "Engineering experience", icon: "workspace_premium" },
  { value: 99.9, suffix: "%", label: "Uptime SLA", decimals: 1, icon: "shield" },
];

export function WhyChoose() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why Codeebe"
        title={<>Built by engineers who <span style={{ color: CR.primary }}>ship at scale</span></>}
        subtitle="Security, performance and scalability aren't add-ons — they're the foundation of every platform we build."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="group relative overflow-hidden rounded-2xl border p-6 text-center"
            style={{ borderColor: CR.border, background: "rgba(255,255,255,0.02)" }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,138,0,0.08), transparent)" }} />
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "rgba(255,138,0,0.12)" }}>
              <MaterialIcon name={s.icon} className="!text-[22px]" style={{ color: CR.primary }} />
            </div>
            <p className="font-[family-name:var(--font-family-display)] text-[2.2rem] font-bold leading-none text-white">
              <StatNumber value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </p>
            <p className="mt-2 text-[13px]" style={{ color: CR.subtext }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
