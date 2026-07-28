"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import type { IndustryConfig, TintKey } from "@/data/industries/types";
import { useTheme, gradientOf, PrimaryButton, GhostButton, type IndustryTheme } from "./theme";
import { HeroMotif } from "./motifs";

function tint(t: IndustryTheme, key?: TintKey) {
  if (key === "secondary") return t.secondary;
  if (key === "success") return t.success;
  return t.primary;
}

function DashboardPreview({ cfg }: { cfg: IndustryConfig["dashboard"] }) {
  const t = useTheme();
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setPulse((p) => (p + 1) % Math.max(1, cfg.listRows.length)), 2200);
    return () => clearInterval(timer);
  }, [cfg.listRows.length]);

  return (
    <div className="relative">
      {/* Floating card A */}
      <motion.div
        className="absolute -left-6 top-16 z-20 hidden rounded-2xl border p-3 backdrop-blur-xl sm:block"
        style={{ borderColor: t.border, background: t.surface }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${t.success}26` }}>
            <MaterialIcon name={cfg.floatA.icon} className="!text-[16px]" style={{ color: t.success }} />
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: t.subtext }}>{cfg.floatA.label}</p>
            <p className="text-[13px] font-bold" style={{ color: t.text }}>{cfg.floatA.value}</p>
          </div>
        </div>
      </motion.div>

      {/* Floating card B */}
      <motion.div
        className="absolute -right-4 top-40 z-20 hidden rounded-2xl border p-3 backdrop-blur-xl md:block"
        style={{ borderColor: t.border, background: t.surface }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: t.softTint }}>
            <MaterialIcon name={cfg.floatB.icon} className="!text-[16px]" style={{ color: t.primary }} />
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: t.subtext }}>{cfg.floatB.label}</p>
            <p className="text-[12px] font-medium" style={{ color: t.text }}>{cfg.floatB.value}</p>
          </div>
        </div>
      </motion.div>

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative overflow-hidden rounded-[24px] border shadow-2xl"
        style={{
          borderColor: t.borderHi,
          background: t.surfaceHi,
          boxShadow: t.dark
            ? "0 40px 120px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04) inset"
            : "0 40px 120px -40px rgba(20,40,90,0.28)",
        }}
      >
        <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: t.border }}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: gradientOf(t) }}>
              <MaterialIcon name={cfg.titleIcon} className="!text-[15px]" style={{ color: t.onPrimary }} />
            </div>
            <span className="text-[13px] font-semibold" style={{ color: t.text }}>{cfg.title}</span>
          </div>
          <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ background: `${t.success}26`, color: t.success }}>
            ● LIVE
          </span>
        </div>

        {/* KPI cards */}
        <div className="grid gap-3 p-5 sm:grid-cols-3">
          {cfg.kpis.map((k) => (
            <div key={k.label} className="rounded-xl border p-3.5" style={{ borderColor: t.border, background: t.overlay }}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9.5px] uppercase tracking-wider" style={{ color: t.subtext }}>{k.label}</span>
                <MaterialIcon name={k.icon} className="!text-[14px]" style={{ color: tint(t, k.tint) }} />
              </div>
              <p className="font-[family-name:var(--font-family-display)] text-xl font-bold" style={{ color: t.text }}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* chart + list */}
        <div className="grid gap-3 px-5 pb-5 lg:grid-cols-5">
          <div className="rounded-xl border p-4 lg:col-span-3" style={{ borderColor: t.border, background: t.overlay }}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[11px] font-medium" style={{ color: t.text }}>{cfg.chartTitle}</span>
              <span className="text-[10px]" style={{ color: t.subtext }}>{cfg.chartCaption}</span>
            </div>
            <div className="flex h-24 items-end gap-2">
              {cfg.bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md"
                  style={{ background: i === cfg.bars.length - 2 ? gradientOf(t) : t.softTint }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border p-4 lg:col-span-2" style={{ borderColor: t.border, background: t.overlay }}>
            <span className="mb-3 block text-[11px] font-medium" style={{ color: t.text }}>{cfg.listTitle}</span>
            <div className="space-y-2.5">
              {cfg.listRows.map((v, i) => (
                <div key={v.name}>
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span style={{ color: t.subtext }}>{v.name}</span>
                    <span style={{ color: pulse === i ? t.text : t.subtext }}>{v.pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full" style={{ background: t.overlayHi }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: gradientOf(t) }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${v.pct}%` }}
                      viewport={{ once: true }}
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

export function IndustryHero({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  const { hero } = config;
  return (
    <section className="relative overflow-hidden pt-[8.5rem] pb-16 sm:pt-[10rem] sm:pb-24">
      {/* ambient gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 90% 55% at 50% -5%, ${t.glow}, transparent 60%)` }}
      />
      <motion.div
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: t.glow }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-60 h-80 w-80 rounded-full blur-[120px]"
        style={{ background: t.softTint }}
        animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: t.dark ? 0.035 : 0.05,
          backgroundImage: `linear-gradient(${t.text} 1px, transparent 1px), linear-gradient(90deg, ${t.text} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)",
        }}
      />
      <HeroMotif />

      <div className="site-container relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2"
              style={{ borderColor: t.border, background: t.overlay }}
            >
              <MaterialIcon name={hero.badgeIcon} className="!text-[15px]" style={{ color: t.primary }} />
              <span className="text-[12px] font-medium" style={{ color: t.text }}>{hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-[family-name:var(--font-family-display)] text-[clamp(2.4rem,5.4vw,4rem)] font-bold leading-[1.04] tracking-tight"
              style={{ color: t.text }}
            >
              {hero.titleLead}{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradientOf(t) }}>
                {hero.titleHighlight}
              </span>
              {hero.titleTrail ? <> {hero.titleTrail}</> : null}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-[16px] leading-relaxed"
              style={{ color: t.subtext }}
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <PrimaryButton href="#estimator">
                <MaterialIcon name="auto_awesome" className="!text-[17px]" />
                {hero.primaryCta}
              </PrimaryButton>
              <GhostButton href="#showcase">
                <MaterialIcon name="play_circle" className="!text-[17px]" style={{ color: t.primary }} />
                {hero.secondaryCta}
              </GhostButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              {hero.trustPills.map((it) => (
                <div key={it.label} className="flex items-center gap-2">
                  <MaterialIcon name={it.icon} className="!text-[16px]" style={{ color: t.primary }} />
                  <span className="text-[12.5px]" style={{ color: t.subtext }}>{it.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative" style={{ perspective: "1200px" }}>
            <DashboardPreview cfg={config.dashboard} />
          </div>
        </div>
      </div>
    </section>
  );
}
