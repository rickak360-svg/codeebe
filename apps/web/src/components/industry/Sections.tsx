"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import type { IndustryConfig } from "@/data/industries/types";
import { DEFAULT_PROCESS } from "@/data/industries/types";
import { useTheme, gradientOf, Section, SectionHeading, fadeUp } from "./theme";

/* ───────────────────────── Trusted-by marquee ── */
export function TrustedBy({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  const items = [...config.trustedBy, ...config.trustedBy];
  return (
    <div className="relative border-y py-8" style={{ borderColor: t.border, background: t.overlay }}>
      <div className="site-container">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: t.subtext }}>
          Trusted by ambitious {config.navLabel.toLowerCase()} brands
        </p>
      </div>
      <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)" }}>
        <motion.div className="flex w-max gap-12 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }}>
          {items.map((name, i) => (
            <span key={i} className="font-[family-name:var(--font-family-display)] text-[18px] font-semibold" style={{ color: t.subtext, opacity: 0.55 }}>
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────────────────── Problems → Solutions (interactive) ── */
export function Problems({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  const [active, setActive] = useState(0);
  const item = config.problems[active];

  return (
    <Section id="problems">
      <SectionHeading
        eyebrow="Problems We Solve"
        title={<>Common {config.navLabel.toLowerCase()} <span style={{ color: t.primary }}>growth blockers</span></>}
        subtitle="Most businesses in your industry lose revenue to the same avoidable problems. Here's how we fix each one."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        {/* problem list */}
        <div className="space-y-3">
          {config.problems.map((p, i) => {
            const sel = i === active;
            return (
              <button
                key={p.pain}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200"
                style={{
                  borderColor: sel ? "transparent" : t.border,
                  background: sel ? t.softTint : t.overlay,
                  boxShadow: sel ? `0 0 0 1.5px ${t.primary}` : "none",
                }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: sel ? gradientOf(t) : t.overlayHi }}>
                  <MaterialIcon name={p.painIcon} className="!text-[20px]" style={{ color: sel ? t.onPrimary : t.subtext }} />
                </div>
                <span className="text-[14px] font-medium" style={{ color: t.text }}>{p.pain}</span>
                <MaterialIcon name="arrow_forward" className="!text-[18px] ml-auto" style={{ color: sel ? t.primary : "transparent" }} />
              </button>
            );
          })}
        </div>

        {/* solution panel */}
        <div className="relative overflow-hidden rounded-[28px] border p-8" style={{ borderColor: t.borderHi, background: t.surface }}>
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[80px]" style={{ background: t.glow }} />
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${t.success}1f`, color: t.success }}>
                <MaterialIcon name="check_circle" className="!text-[13px]" /> Our solution
              </span>
              <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: gradientOf(t) }}>
                <MaterialIcon name={item.fixIcon} className="!text-[28px]" style={{ color: t.onPrimary }} />
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-family-display)] text-2xl font-bold" style={{ color: t.text }}>{item.pain}</h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: t.subtext }}>{item.fix}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────── Features bento grid ── */
export function Features({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Platform Features"
        title={<>Everything your platform <span style={{ color: t.primary }}>needs to win</span></>}
        subtitle="Purpose-built modules for your industry — not a generic template forced to fit."
      />

      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {config.features.map((f, i) => (
          <motion.div
            key={f.title}
            custom={i}
            variants={fadeUp}
            className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${f.span === 2 ? "sm:col-span-2" : ""}`}
            style={{
              borderColor: f.highlight ? "transparent" : t.border,
              background: f.highlight ? t.softTint : t.overlay,
              boxShadow: f.highlight ? `0 0 0 1.5px ${t.primary}` : "none",
            }}
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-[60px] transition-opacity duration-300 group-hover:opacity-100" style={{ background: t.glow }} />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: f.highlight ? gradientOf(t) : t.softTint }}>
                <MaterialIcon name={f.icon} className="!text-[24px]" style={{ color: f.highlight ? t.onPrimary : t.primary }} />
              </div>
              <h3 className="font-[family-name:var(--font-family-display)] text-[17px] font-bold" style={{ color: t.text }}>{f.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: t.subtext }}>{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ───────────────────────── Process timeline ── */
export function Process({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  const steps = config.process ?? DEFAULT_PROCESS;
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="How We Work"
        title={<>From idea to launch in <span style={{ color: t.primary }}>{steps.length} clear steps</span></>}
        subtitle="A proven, transparent process — you always know exactly where your project stands."
      />
      <div className="relative mt-16">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block" style={{ background: `linear-gradient(180deg, transparent, ${t.primary}66, transparent)` }} />
        <div className="space-y-5 lg:space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`relative flex items-center gap-5 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12" : "lg:ml-auto lg:flex-row-reverse lg:pl-12"}`}
            >
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: gradientOf(t), boxShadow: `0 8px 30px -6px ${t.glow}` }}>
                <MaterialIcon name={s.icon} className="!text-[26px]" style={{ color: t.onPrimary }} />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: t.surfaceHi, color: t.text, border: `1px solid ${t.borderHi}` }}>{i + 1}</span>
              </div>
              <div className={`flex-1 rounded-2xl border p-5 ${i % 2 === 0 ? "lg:text-right" : ""}`} style={{ borderColor: t.border, background: t.overlay }}>
                <h3 className="font-[family-name:var(--font-family-display)] text-[17px] font-bold" style={{ color: t.text }}>{s.title}</h3>
                <p className="mt-1 text-[13px]" style={{ color: t.subtext }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────── Animated stats ── */
function StatNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!inView || !match) return;
    const prefix = match[1];
    const target = parseFloat(match[2].replace(/,/g, ""));
    const suffix = match[3];
    const isFloat = match[2].includes(".");
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1500);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      setDisplay(`${prefix}${isFloat ? cur.toFixed(1) : Math.round(cur).toLocaleString("en-IN")}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, match]);

  return <span ref={ref}>{display}</span>;
}

export function Stats({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  return (
    <Section>
      <div className="relative overflow-hidden rounded-[32px] border p-8 sm:p-12" style={{ borderColor: t.borderHi, background: t.surface }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: t.glow }} />
        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {config.stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: t.softTint }}>
                <MaterialIcon name={s.icon} className="!text-[24px]" style={{ color: t.primary }} />
              </div>
              <p className="font-[family-name:var(--font-family-display)] text-[2.4rem] font-bold leading-none" style={{ color: t.text }}>
                <StatNumber value={s.value} />
              </p>
              <p className="mt-2 text-[13px]" style={{ color: t.subtext }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────── Testimonials ── */
export function Testimonials({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Client Results"
        title={<>Loved by {config.navLabel.toLowerCase()} <span style={{ color: t.primary }}>owners</span></>}
        subtitle="Real outcomes from businesses that launched with Codeebe."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {config.testimonials.map((tm, i) => (
          <motion.div
            key={tm.name}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col rounded-3xl border p-6"
            style={{ borderColor: t.border, background: t.overlay }}
          >
            <div className="mb-4 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <MaterialIcon key={s} name="star" className="!text-[16px]" style={{ color: t.primary }} />
              ))}
            </div>
            <p className="flex-1 text-[14px] leading-relaxed" style={{ color: t.text }}>&ldquo;{tm.quote}&rdquo;</p>
            <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: t.border }}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full font-bold" style={{ background: gradientOf(t), color: t.onPrimary }}>
                  {tm.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: t.text }}>{tm.name}</p>
                  <p className="text-[11.5px]" style={{ color: t.subtext }}>{tm.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-[family-name:var(--font-family-display)] text-lg font-bold" style={{ color: t.primary }}>{tm.metric}</p>
                <p className="text-[10px]" style={{ color: t.subtext }}>{tm.metricLabel}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── FAQ accordion ── */
export function Faq({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title={<>Questions? <span style={{ color: t.primary }}>Answered.</span></>}
        subtitle="Everything you need to know before we start building."
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {config.faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="overflow-hidden rounded-2xl border" style={{ borderColor: isOpen ? t.borderHi : t.border, background: t.overlay }}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="text-[14.5px] font-semibold" style={{ color: t.text }}>{f.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: t.softTint }}>
                  <MaterialIcon name="add" className="!text-[16px]" style={{ color: t.primary }} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-[13.5px] leading-relaxed" style={{ color: t.subtext }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ───────────────────────── Sticky sub-nav ── */
export function SubNav({ config }: { config: IndustryConfig }) {
  const t = useTheme();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-[5.2rem] z-[80] hidden justify-center px-4 lg:flex"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="flex items-center gap-1 rounded-full border px-2 py-2 backdrop-blur-xl" style={{ borderColor: t.borderHi, background: t.surface, boxShadow: "0 12px 40px -12px rgba(0,0,0,0.5)" }}>
        <span className="ml-2 mr-1 flex items-center gap-1.5 pr-2 text-[12px] font-semibold" style={{ color: t.text }}>
          <MaterialIcon name={config.navIcon} className="!text-[15px]" style={{ color: t.primary }} />
          {config.navLabel}
        </span>
        {config.subNav.map((n) => (
          <a key={n.href} href={n.href} className="rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors hover:opacity-100" style={{ color: t.subtext }}>
            {n.label}
          </a>
        ))}
        <a href="#estimator" className="ml-1 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-semibold" style={{ background: gradientOf(t), color: t.onPrimary }}>
          <MaterialIcon name="auto_awesome" className="!text-[14px]" /> Get Estimate
        </a>
      </div>
    </motion.div>
  );
}
