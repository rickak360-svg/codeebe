"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { CR, PRIMARY_GRADIENT, PrimaryButton, GhostButton } from "./shared";

/* Animated count-up for dashboard KPIs */
function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function LiveDashboard() {
  const revenue = useCountUp(1284000);
  const bookings = useCountUp(342);
  const utilization = useCountUp(87);

  const bars = [42, 58, 46, 72, 64, 88, 76];
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => (p + 1) % 3), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* Floating small cards */}
      <motion.div
        className="absolute -left-6 top-16 z-20 hidden rounded-2xl border p-3 backdrop-blur-xl sm:block"
        style={{ borderColor: CR.border, background: "rgba(17,17,17,0.9)" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(34,197,94,0.15)" }}>
            <MaterialIcon name="trending_up" className="!text-[16px]" style={{ color: CR.success }} />
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: CR.subtext }}>Growth</p>
            <p className="text-[13px] font-bold text-white">+34.2%</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -right-4 top-40 z-20 hidden rounded-2xl border p-3 backdrop-blur-xl md:block"
        style={{ borderColor: CR.border, background: "rgba(17,17,17,0.9)" }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(255,138,0,0.15)" }}>
            <MaterialIcon name="auto_awesome" className="!text-[16px]" style={{ color: CR.primary }} />
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: CR.subtext }}>AI Suggestion</p>
            <p className="text-[12px] font-medium text-white">Raise SUV price 8%</p>
          </div>
        </div>
      </motion.div>

      {/* Main dashboard panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative overflow-hidden rounded-[24px] border shadow-2xl"
        style={{
          borderColor: CR.borderHi,
          background: "linear-gradient(180deg, rgba(22,22,22,0.98), rgba(10,10,10,0.98))",
          boxShadow: "0 40px 120px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: CR.border }}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: PRIMARY_GRADIENT }}>
              <MaterialIcon name="dashboard" className="!text-[15px] text-[#0a0a0a]" />
            </div>
            <span className="text-[13px] font-semibold text-white">Fleet Control</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ background: "rgba(34,197,94,0.15)", color: CR.success }}>
              ● LIVE
            </span>
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-3">
          {/* KPI cards */}
          {[
            { label: "Revenue (MTD)", value: `₹${(revenue / 100000).toFixed(1)}L`, icon: "payments", tint: CR.primary },
            { label: "Bookings", value: Math.round(bookings).toString(), icon: "event_available", tint: CR.secondary },
            { label: "Utilization", value: `${Math.round(utilization)}%`, icon: "speed", tint: CR.success },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border p-3.5" style={{ borderColor: CR.border, background: "rgba(255,255,255,0.02)" }}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9.5px] uppercase tracking-wider" style={{ color: CR.subtext }}>{k.label}</span>
                <MaterialIcon name={k.icon} className="!text-[14px]" style={{ color: k.tint }} />
              </div>
              <p className="font-[family-name:var(--font-family-display)] text-xl font-bold text-white">{k.value}</p>
            </div>
          ))}
        </div>

        {/* Chart + side list */}
        <div className="grid gap-3 px-5 pb-5 lg:grid-cols-5">
          <div className="rounded-xl border p-4 lg:col-span-3" style={{ borderColor: CR.border, background: "rgba(255,255,255,0.02)" }}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-medium text-white">Weekly bookings</span>
              <span className="text-[10px]" style={{ color: CR.subtext }}>Last 7 days</span>
            </div>
            <div className="flex h-24 items-end gap-2">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md"
                  style={{ background: i === 5 ? PRIMARY_GRADIENT : "rgba(255,138,0,0.25)" }}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border p-4 lg:col-span-2" style={{ borderColor: CR.border, background: "rgba(255,255,255,0.02)" }}>
            <span className="mb-3 block text-[11px] font-medium text-white">Vehicle availability</span>
            <div className="space-y-2.5">
              {[
                { name: "SUV", pct: 64 },
                { name: "Sedan", pct: 82 },
                { name: "Luxury", pct: 41 },
              ].map((v, i) => (
                <div key={v.name}>
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span style={{ color: CR.subtext }}>{v.name}</span>
                    <span className={pulse === i ? "text-white" : ""} style={{ color: pulse === i ? undefined : CR.subtext }}>{v.pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: PRIMARY_GRADIENT }}
                      initial={{ width: 0 }}
                      animate={{ width: `${v.pct}%` }}
                      transition={{ delay: 0.7 + i * 0.15, duration: 0.9 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const BOOKING_SCENES = [
  "/images/car-rental/booking-1.jpg",
  "/images/car-rental/booking-2.jpg",
  "/images/car-rental/booking-3.jpg",
  "/images/car-rental/booking-4.jpg",
  "/images/car-rental/booking-5.jpg",
] as const;

function BookingBackground() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setScene((s) => (s + 1) % BOOKING_SCENES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Motion base — night traffic loop */}
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/car-rental-hero.mp4" type="video/mp4" />
      </video>

      {/* Car rental booking scenes — ken burns crossfade */}
      {BOOKING_SCENES.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: scene === i ? 0.78 : 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <motion.img
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            animate={
              scene === i
                ? { scale: [1.08, 1.16], x: [0, -14], y: [0, -8] }
                : { scale: 1.08, x: 0, y: 0 }
            }
            transition={{ duration: 5.5, ease: "linear" }}
          />
        </motion.div>
      ))}

      {/* Readability scrims */}
      <div className="absolute inset-0 bg-[#050505]/50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.55) 40%, rgba(5,5,5,0.42) 100%), linear-gradient(180deg, rgba(5,5,5,0.8) 0%, transparent 28%, transparent 68%, rgba(5,5,5,0.9) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(255,138,0,0.16), transparent 60%)" }}
      />
    </div>
  );
}

export function CarRentalHero() {
  return (
    <section className="relative overflow-hidden pt-[8.5rem] pb-16 sm:pt-[10rem] sm:pb-24">
      <BookingBackground />

      <motion.div
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: "rgba(255,138,0,0.14)" }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-60 h-80 w-80 rounded-full blur-[120px]"
        style={{ background: "rgba(255,167,38,0.1)" }}
        animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="site-container relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
              style={{ borderColor: CR.border, background: "rgba(255,255,255,0.03)" }}
            >
              <MaterialIcon name="verified" className="!text-[15px]" style={{ color: CR.primary }} />
              <span className="text-[12px] font-medium text-white/80">Enterprise Car Rental Platform Development</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-[family-name:var(--font-family-display)] text-[clamp(2.4rem,5.4vw,4rem)] font-bold leading-[1.04] tracking-tight text-white"
            >
              Launch your car rental business with a{" "}
              <span className="relative whitespace-nowrap">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: PRIMARY_GRADIENT }}
                >
                  premium platform
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-[16px] leading-relaxed"
              style={{ color: CR.subtext }}
            >
              We build scalable, enterprise-grade rental platforms with online booking, fleet
              management, customer portals, analytics, payment gateways, AI automation, and custom
              admin dashboards — engineered to grow with you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <PrimaryButton href="#estimator">
                <MaterialIcon name="auto_awesome" className="!text-[17px]" />
                Get Instant AI Estimate
              </PrimaryButton>
              <GhostButton href="#showcase">
                <MaterialIcon name="play_circle" className="!text-[17px]" style={{ color: CR.primary }} />
                Watch Live Demo
              </GhostButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              {[
                { icon: "rocket_launch", label: "120+ platforms shipped" },
                { icon: "shield", label: "Bank-grade security" },
                { icon: "support_agent", label: "24/7 support" },
              ].map((it) => (
                <div key={it.label} className="flex items-center gap-2">
                  <MaterialIcon name={it.icon} className="!text-[16px]" style={{ color: CR.primary }} />
                  <span className="text-[12.5px]" style={{ color: CR.subtext }}>{it.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right dashboard */}
          <div className="relative" style={{ perspective: "1200px" }}>
            <LiveDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
