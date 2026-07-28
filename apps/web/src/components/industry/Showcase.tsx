"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import type { IndustryConfig } from "@/data/industries/types";
import { useTheme, gradientOf, Section, SectionHeading, fadeUp, type IndustryTheme } from "./theme";

const VIEWS = [
  { id: "site", label: "Customer Website", icon: "language" },
  { id: "booking", label: "Booking Flow", icon: "event_available" },
  { id: "admin", label: "Admin Dashboard", icon: "dashboard" },
  { id: "analytics", label: "Analytics", icon: "insights" },
];

function Mock({ view, t }: { view: string; t: IndustryTheme }) {
  const g = gradientOf(t);
  return (
    <div className="flex h-full flex-col" style={{ background: t.dark ? "#0a0a0a" : "#f4f7fd" }}>
      {view === "site" && (
        <div className="flex-1 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-3 w-24 rounded-full" style={{ background: g }} />
            <div className="flex gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-2 w-10 rounded-full" style={{ background: t.overlayHi }} />)}</div>
          </div>
          <div className="mb-4 h-24 rounded-xl" style={{ background: `linear-gradient(120deg, ${t.softTint}, ${t.overlay})` }} />
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border p-2" style={{ borderColor: t.border, background: t.overlay }}>
                <div className="mb-2 h-12 rounded-md" style={{ background: t.overlayHi }} />
                <div className="h-2 w-3/4 rounded-full" style={{ background: t.overlayHi }} />
                <div className="mt-1.5 h-2 w-1/2 rounded-full" style={{ background: t.softTint }} />
              </div>
            ))}
          </div>
        </div>
      )}
      {view === "booking" && (
        <div className="flex-1 p-5">
          <div className="mb-4 flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-1 items-center gap-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: i <= 1 ? g : t.overlayHi, color: i <= 1 ? t.onPrimary : t.subtext }}>{i + 1}</div>
                {i < 3 && <div className="h-px flex-1" style={{ background: i < 1 ? t.primary : t.overlayHi }} />}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: i === 1 ? t.primary : t.border, background: i === 1 ? t.softTint : t.overlay }}>
                <div className="h-12 w-16 rounded-md" style={{ background: t.overlayHi }} />
                <div className="flex-1">
                  <div className="h-2.5 w-24 rounded-full" style={{ background: t.overlayHi }} />
                  <div className="mt-1.5 h-2 w-16 rounded-full" style={{ background: t.overlay }} />
                </div>
                <div className="h-6 w-14 rounded-md" style={{ background: i === 1 ? g : t.overlayHi }} />
              </div>
            ))}
          </div>
        </div>
      )}
      {view === "admin" && (
        <div className="flex h-full">
          <div className="w-14 border-r p-2" style={{ borderColor: t.border }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: i === 0 ? t.softTint : "transparent" }}>
                <div className="h-4 w-4 rounded" style={{ background: i === 0 ? t.primary : t.overlayHi }} />
              </div>
            ))}
          </div>
          <div className="flex-1 p-4">
            <div className="mb-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border p-2.5" style={{ borderColor: t.border, background: t.overlay }}>
                  <div className="h-2 w-10 rounded-full" style={{ background: t.overlayHi }} />
                  <div className="mt-2 h-4 w-14 rounded" style={{ background: t.softTint }} />
                </div>
              ))}
            </div>
            <div className="rounded-lg border p-3" style={{ borderColor: t.border, background: t.overlay }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2 border-b py-2 last:border-0" style={{ borderColor: t.border }}>
                  <div className="h-6 w-6 rounded-full" style={{ background: t.overlayHi }} />
                  <div className="h-2 flex-1 rounded-full" style={{ background: t.overlayHi }} />
                  <div className="h-4 w-12 rounded" style={{ background: i === 0 ? `${t.success}4d` : t.overlay }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {view === "analytics" && (
        <div className="flex-1 p-5">
          <div className="mb-4 grid grid-cols-2 gap-3">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-xl border p-3" style={{ borderColor: t.border, background: t.overlay }}>
                <div className="h-2 w-16 rounded-full" style={{ background: t.overlayHi }} />
                <div className="mt-2 h-5 w-20 rounded" style={{ background: g }} />
              </div>
            ))}
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: t.border, background: t.overlay }}>
            <div className="flex h-28 items-end gap-2">
              {[40, 65, 50, 80, 60, 92, 74, 58].map((h, i) => (
                <motion.div key={i} className="flex-1 rounded-t" style={{ background: i === 5 ? g : t.softTint }} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LiveDemo({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  const [loaded, setLoaded] = useState(false);
  const s = config.showcase;
  if (!s.liveUrl) return null;

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="mx-auto mt-16 max-w-5xl">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: `${t.success}4d`, background: `${t.success}1a`, color: t.success }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: t.success }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: t.success }} />
            </span>
            Live client platform
          </span>
          <h3 className="font-[family-name:var(--font-family-display)] text-xl font-bold sm:text-2xl" style={{ color: t.text }}>{s.liveTitle ?? "See a real platform we built"}</h3>
          <p className="mt-1 text-[13.5px]" style={{ color: t.subtext }}>{s.liveDesc}</p>
        </div>
        <a href={s.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold" style={{ background: gradientOf(t), color: t.onPrimary }}>
          <MaterialIcon name="open_in_new" className="!text-[16px]" /> Open live demo
        </a>
      </div>

      <div className="overflow-hidden rounded-[20px] border shadow-2xl" style={{ borderColor: t.borderHi, background: t.surfaceHi }}>
        <div className="flex items-center gap-1.5 border-b px-4 py-2.5" style={{ borderColor: t.border }}>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex flex-1 items-center gap-1.5 rounded px-3 py-1 text-[10px]" style={{ background: t.overlay, color: t.subtext }}>
            <MaterialIcon name="lock" className="!text-[10px]" style={{ color: t.success }} />
            {s.liveDomain}
          </div>
        </div>
        <div className="relative w-full" style={{ height: "560px", background: t.dark ? "#0a0a0a" : "#fff" }}>
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2" style={{ borderColor: t.overlayHi, borderTopColor: t.primary }} />
              <p className="text-[12px]" style={{ color: t.subtext }}>Loading live demo…</p>
            </div>
          )}
          <iframe
            src={s.liveUrl}
            title={`${config.navLabel} live demo`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="h-full w-full"
            style={{ border: "none", opacity: loaded ? 1 : 0, transition: "opacity 0.4s" }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-2.5" style={{ borderColor: t.border }}>
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: t.subtext }}>
            <MaterialIcon name="verified" className="!text-[13px]" style={{ color: t.primary }} /> Real platform built by Codeebe
          </span>
          <a href="#estimator" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold" style={{ background: gradientOf(t), color: t.onPrimary }}>
            <MaterialIcon name="auto_awesome" className="!text-[12px]" /> Get one like this
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Showcase({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  const [view, setView] = useState("admin");

  return (
    <Section id="showcase">
      <SectionHeading eyebrow="Product Tour" title={<>{config.showcase.heading}</>} subtitle={config.showcase.subtitle} />

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all"
            style={{
              borderColor: view === v.id ? "transparent" : t.border,
              background: view === v.id ? gradientOf(t) : t.overlay,
              color: view === v.id ? t.onPrimary : t.text,
            }}
          >
            <MaterialIcon name={v.icon} className="!text-[16px]" />
            {v.label}
          </button>
        ))}
      </div>

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative mt-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" style={{ background: t.glow }} />
        <div className="relative mx-auto flex max-w-4xl items-end justify-center gap-4">
          <div className="relative w-full max-w-3xl">
            <div className="overflow-hidden rounded-t-2xl border border-b-0 shadow-2xl" style={{ borderColor: t.borderHi, background: t.dark ? "#0d0d0d" : "#fff" }}>
              <div className="flex items-center gap-1.5 border-b px-4 py-2.5" style={{ borderColor: t.border }}>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="ml-3 flex-1 rounded px-3 py-1 text-[9px]" style={{ background: t.overlay, color: t.subtext }}>app.yourbrand.com</div>
              </div>
              <div className="relative h-[300px] sm:h-[360px]">
                <AnimatePresence mode="wait">
                  <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                    <Mock view={view} t={t} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="mx-auto h-3 w-[108%] -translate-x-[3.7%] rounded-b-xl" style={{ background: t.dark ? "linear-gradient(180deg, #2a2a2a, #0d0d0d)" : "linear-gradient(180deg, #d5ddec, #b7c2d6)" }} />
          </div>

          <div className="relative hidden w-40 shrink-0 sm:block">
            <div className="overflow-hidden rounded-[28px] border-4 shadow-2xl" style={{ borderColor: t.dark ? "#1a1a1a" : "#d5ddec", background: t.dark ? "#0a0a0a" : "#fff" }}>
              <div className="flex justify-center py-1.5"><div className="h-1 w-10 rounded-full" style={{ background: t.overlayHi }} /></div>
              <div className="relative h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 scale-90">
                    <Mock view={view === "admin" ? "booking" : view} t={t} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <LiveDemo config={config} />
    </Section>
  );
}
