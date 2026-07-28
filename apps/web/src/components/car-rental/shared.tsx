"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

/* ───────────────────────── Premium palette ── */
export const CR = {
  bg: "#070707",
  surface: "#111111",
  surfaceHi: "#161616",
  primary: "#FF8A00",
  secondary: "#FFA726",
  text: "#FFFFFF",
  subtext: "#A8A8A8",
  border: "rgba(255,255,255,0.08)",
  borderHi: "rgba(255,255,255,0.14)",
  success: "#22C55E",
} as const;

/* Reusable gradient for primary CTAs & accents */
export const PRIMARY_GRADIENT = `linear-gradient(135deg, ${CR.primary} 0%, ${CR.secondary} 100%)`;

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
  return (
    <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5"
      style={{ borderColor: CR.border, background: "rgba(255,138,0,0.06)" }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: CR.primary }} />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: CR.primary }} />
      </span>
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: CR.secondary }}>
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
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"} ${className}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-[family-name:var(--font-family-display)] text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: CR.subtext }}>
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

/* ───────────────────────── Magnetic-ish primary button ── */
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
  const cls = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[14px] font-semibold text-[#0a0a0a] transition-transform duration-200 hover:-translate-y-0.5 ${className}`;
  const style = {
    background: PRIMARY_GRADIENT,
    boxShadow: "0 10px 40px -8px rgba(255,138,0,0.5)",
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
  const cls = `inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[14px] font-medium text-white/80 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:text-white ${className}`;
  const style = { borderColor: CR.borderHi, background: "rgba(255,255,255,0.03)" } as const;
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
