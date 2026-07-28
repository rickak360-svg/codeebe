"use client";

import { createContext, useContext, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";

/* ───────────────────────── Theme model ──
 * A single token set powers every industry landing page. Supplying a different
 * IndustryTheme is all that's needed to re-skin the entire experience — the
 * section components read exclusively from these tokens (never hard-coded
 * colors), so both dark (gym/barber/event) and light (clinic) themes work.
 */
export type IndustryTheme = {
  key: string;
  dark: boolean;
  bg: string;
  surface: string; // primary card fill
  surfaceHi: string; // elevated panels
  primary: string;
  secondary: string;
  text: string; // primary foreground
  subtext: string; // muted foreground
  border: string;
  borderHi: string;
  success: string;
  /** subtle fill for cards sitting on bg (dark: white α / light: black α) */
  overlay: string;
  /** stronger fill for hovers / selected states */
  overlayHi: string;
  /** foreground color that sits on top of the primary gradient button */
  onPrimary: string;
  /** rgba used for ambient glows / blurs */
  glow: string;
  /** low-alpha primary tint for icon chips */
  softTint: string;
  /** signature hero animation */
  motif: "pulse" | "heartbeat" | "shimmer" | "confetti" | "road";
};

export function gradientOf(t: IndustryTheme) {
  return `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`;
}

const ThemeCtx = createContext<IndustryTheme | null>(null);

export function IndustryThemeProvider({ theme, children }: { theme: IndustryTheme; children: ReactNode }) {
  return <ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): IndustryTheme {
  const t = useContext(ThemeCtx);
  if (!t) throw new Error("useTheme must be used inside <IndustryThemeProvider>");
  return t;
}

/* ───────────────────────── Motion presets ── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ───────────────────────── Eyebrow label ── */
export function Eyebrow({ children }: { children: ReactNode }) {
  const t = useTheme();
  return (
    <div
      className="mb-4 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5"
      style={{ borderColor: t.border, background: t.softTint }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: t.primary }} />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: t.primary }} />
      </span>
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: t.primary }}>
        {children}
      </span>
    </div>
  );
}

/* ───────────────────────── Section heading ── */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const t = useTheme();
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"} ${className}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="font-[family-name:var(--font-family-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight"
        style={{ color: t.text }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: t.subtext }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ───────────────────────── Section wrapper ── */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-28 py-20 sm:py-28 ${className}`}>
      <div className="site-container relative">{children}</div>
    </section>
  );
}

/* ───────────────────────── Buttons ── */
export function PrimaryButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const t = useTheme();
  const cls = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${className}`;
  const style = {
    background: gradientOf(t),
    color: t.onPrimary,
    boxShadow: `0 10px 40px -8px ${t.glow}`,
  } as const;
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} style={style}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} style={style}>
      {inner}
    </button>
  );
}

export function GhostButton({
  children,
  href,
  onClick,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const t = useTheme();
  const cls = `inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[14px] font-medium backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 ${className}`;
  const style = { borderColor: t.borderHi, background: t.overlay, color: t.text } as const;
  if (href) {
    return (
      <a href={href} className={cls} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  );
}

/* ───────────────────────── Shared icon chip ── */
export function IconChip({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) {
  const t = useTheme();
  return (
    <div
      className={`flex items-center justify-center rounded-lg ${className}`}
      style={{ background: t.softTint }}
    >
      <MaterialIcon name={name} className={`!text-[${size}px]`} style={{ color: t.primary }} />
    </div>
  );
}
