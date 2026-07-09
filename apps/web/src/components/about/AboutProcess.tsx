"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { engineeringProcess } from "@/data/landing";
import { MaterialIcon } from "@/components/home/MaterialIcon";

const STEP_ICONS = [
  "travel_explore", // Discovery
  "strategy",       // Product Strategy
  "architecture",   // UX & Architecture
  "code",           // Development
  "verified",       // QA & Optimization
  "rocket_launch",  // Launch & Support
] as const;

// Decorative icons that float in the empty side gaps beside the timeline.
const FLOATING_ICONS = [
  { icon: "code",            side: "left",  top: "10%", offset: "7%",  size: 34, dur: 6.5, delay: 0,   opacity: 0.5  },
  { icon: "terminal",        side: "left",  top: "30%", offset: "14%", size: 28, dur: 7.5, delay: 0.6, opacity: 0.4  },
  { icon: "database",        side: "left",  top: "56%", offset: "6%",  size: 32, dur: 8,   delay: 1.1, opacity: 0.45 },
  { icon: "bolt",            side: "left",  top: "80%", offset: "13%", size: 26, dur: 6,   delay: 0.3, opacity: 0.42 },
  { icon: "rocket_launch",   side: "right", top: "12%", offset: "8%",  size: 34, dur: 7,   delay: 0.4, opacity: 0.5  },
  { icon: "cloud",           side: "right", top: "34%", offset: "14%", size: 30, dur: 6.5, delay: 0.9, opacity: 0.4  },
  { icon: "hub",             side: "right", top: "58%", offset: "6%",  size: 32, dur: 8.5, delay: 0.2, opacity: 0.45 },
  { icon: "design_services", side: "right", top: "82%", offset: "12%", size: 28, dur: 7,   delay: 1.3, opacity: 0.42 },
] as const;

// Radial particles for the success "blast" at the finish marker.
const BURST_PARTICLES = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const distance = 34 + (i % 3) * 10;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    color: i % 2 === 0 ? "#ff6b00" : "#ffcc00",
  };
});

export function AboutProcess() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Drives the line fill + travelling dot as the section scrolls through view.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.7", "end 0.65"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });
  const dotTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  const lastIndex = engineeringProcess.length - 1;

  return (
    <section id="process" className="relative overflow-hidden scroll-mt-28 py-20 sm:py-24">
      {/* floating decorative icons in the side gaps */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        {FLOATING_ICONS.map((f, i) => (
          <motion.span
            key={i}
            className="absolute text-[#ff6b00] [text-shadow:0_0_18px_rgba(255,107,0,0.55)]"
            style={{
              top: f.top,
              opacity: f.opacity,
              ...(f.side === "left" ? { left: f.offset } : { right: f.offset }),
            }}
            animate={{
              y: [0, -28, 0],
              x: [0, f.side === "left" ? 12 : -12, 0],
              rotate: [0, i % 2 === 0 ? 12 : -12, 0],
            }}
            transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: f.size }}>
              {f.icon}
            </span>
          </motion.span>
        ))}
      </div>

      <div className="site-container relative">
        <div className="mb-12 text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">How We Work</p>
          <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white sm:text-4xl">
            Our engineering process
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-white/45">
            From brief to launch — a structured approach that keeps you in control at every stage.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* start marker */}
          <div className="mb-5 flex items-center gap-4 sm:gap-5">
            <div className="flex w-11 justify-center sm:w-12">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ff6b00]/15 ring-1 ring-[#ff6b00]/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Kick-off</span>
          </div>

          {/* timeline track */}
          <div ref={trackRef} className="relative">
            {/* rail: static + animated fill + travelling dot */}
            <div className="pointer-events-none absolute left-[21px] top-3 bottom-3 w-[2px] sm:left-[23px]">
              <div className="absolute inset-0 rounded-full bg-white/[0.07]" />
              <motion.div
                style={{ scaleY: progress }}
                className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#ff6b00] via-[#ff9a00] to-[#ff6b00]"
              />
              <motion.div
                style={{ top: dotTop }}
                className="absolute left-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6b00] shadow-[0_0_14px_3px_rgba(255,107,0,0.7)]"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-[#ff6b00]/60" />
              </motion.div>
            </div>

            {/* steps */}
            <div className="space-y-4 sm:space-y-5">
              {engineeringProcess.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex items-start gap-4 sm:gap-5"
                >
                  {/* icon badge */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
                    className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#ff6b00]/30 bg-gradient-to-br from-[#ff6b00]/20 to-[#ff6b00]/[0.04] text-[#ff6b00] shadow-[0_0_0_4px_#0a0a0a] transition-all duration-300 group-hover:border-[#ff6b00]/60 group-hover:shadow-[0_0_20px_-2px_rgba(255,107,0,0.55),0_0_0_4px_#0a0a0a] sm:h-12 sm:w-12"
                  >
                    <MaterialIcon name={STEP_ICONS[i] ?? "check_circle"} className="!text-[20px] sm:!text-[22px]" />
                  </motion.div>

                  {/* card */}
                  <div className="min-w-0 flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 group-hover:border-[#ff6b00]/20 group-hover:bg-white/[0.035] sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[14px] font-semibold text-white sm:text-[15px]">{step.title}</h3>
                      <span className="shrink-0 font-mono text-[11px] font-semibold tracking-widest text-[#ff6b00]/50">
                        {step.step}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/45 sm:text-[13px]">{step.description}</p>
                    {i === lastIndex && (
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/[0.08] px-3 py-1 text-[11px] font-medium text-[#ff6b00]">
                        <span className="material-symbols-outlined !text-[13px]">check_circle</span>
                        Live in production
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* finish marker */}
          <div className="mt-5 flex items-center gap-4 sm:gap-5">
            <div className="relative flex w-11 justify-center sm:w-12">
              {/* success blast overlay */}
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {/* expanding rings */}
                <motion.span
                  initial={{ opacity: 0.85, scale: 0.3 }}
                  whileInView={{ opacity: 0, scale: 3 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
                  className="absolute h-9 w-9 rounded-full border-2 border-[#ff6b00]"
                />
                <motion.span
                  initial={{ opacity: 0.6, scale: 0.3 }}
                  whileInView={{ opacity: 0, scale: 4.4 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.1, delay: 0.28, ease: "easeOut" }}
                  className="absolute h-9 w-9 rounded-full border border-[#ffcc00]/70"
                />
                {/* flying particles */}
                {BURST_PARTICLES.map((p, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    whileInView={{ opacity: [0, 1, 1, 0], x: p.x, y: p.y, scale: [0, 1, 1, 0.4] }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.85, delay: 0.18 + i * 0.012, ease: "easeOut" }}
                    className="absolute h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}` }}
                  />
                ))}
              </span>

              {/* flag badge pop */}
              <motion.span
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: [0, 1.25, 1], rotate: [-30, 8, 0] }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#ff6b00] text-[#1a0a00] shadow-[0_0_20px_-2px_rgba(255,107,0,0.8)]"
              >
                <span className="material-symbols-outlined !text-[16px]">flag</span>
              </motion.span>
            </div>
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ff6b00]/70"
            >
              Launched
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
