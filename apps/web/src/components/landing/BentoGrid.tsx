"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { Reveal } from "./Reveal";
import { useReducedMotion } from "./useReducedMotion";
import { defaultTransition, fadeUp, staggerContainer } from "@/lib/motion";

/* ── individual card data ── */
const cards = [
  {
    id: "saas",
    size: "wide",          // col-span-2
    label: "SaaS Platforms",
    icon: "layers",
    accent: "#ff6b00",
    stat: "50+",
    statLabel: "products shipped",
    description:
      "Multi-tenant architectures with billing, dashboards, and APIs built for long-term scale.",
    tags: ["Next.js", "NestJS", "PostgreSQL"],
    glow: "rgba(255,107,0,0.18)",
  },
  {
    id: "ai",
    size: "tall",          // row-span-2
    label: "AI & Automation",
    icon: "smart_toy",
    accent: "#a259ff",
    stat: "10×",
    statLabel: "ops efficiency",
    description:
      "LLM workflows, internal copilots, and integrations that remove repetitive operational work at scale.",
    tags: ["OpenAI", "LangChain", "Redis"],
    glow: "rgba(162,89,255,0.18)",
  },
  {
    id: "cloud",
    size: "normal",
    label: "Cloud Infrastructure",
    icon: "cloud",
    accent: "#22d3ee",
    stat: "99.9%",
    statLabel: "uptime SLA",
    description:
      "AWS-ready deployments, CI/CD pipelines, and cost-aware architecture from day one.",
    tags: ["AWS", "Docker", "Terraform"],
    glow: "rgba(34,211,238,0.15)",
  },
  {
    id: "marketplace",
    size: "normal",
    label: "Marketplace Platforms",
    icon: "storefront",
    accent: "#34d399",
    stat: "2-sided",
    statLabel: "vendor ready",
    description:
      "Listings, payments, vendor tools, and trust-focused UX for thriving two-sided ecosystems.",
    tags: ["Stripe", "React", "Node.js"],
    glow: "rgba(52,211,153,0.15)",
  },
  {
    id: "web",
    size: "wide",
    label: "Brand Websites",
    icon: "language",
    accent: "#f472b6",
    stat: "3-week",
    statLabel: "launch sprint",
    description:
      "High-converting landing pages, CMS setups, and brand-aligned digital presences.",
    tags: ["Next.js", "WordPress", "Tailwind"],
    glow: "rgba(244,114,182,0.15)",
  },
  {
    id: "data",
    size: "normal",
    label: "Data Dashboards",
    icon: "analytics",
    accent: "#fbbf24",
    stat: "Real-time",
    statLabel: "reporting panels",
    description:
      "Internal tools and live analytics that turn raw data into actionable decisions.",
    tags: ["React", "Recharts", "PostgreSQL"],
    glow: "rgba(251,191,36,0.15)",
  },
] as const;

/* ── animated floating orb behind tall card ── */
function FloatOrb({ color }: { color: string }) {
  return (
    <motion.div
      className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-20 blur-3xl"
      style={{ background: color }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.3, 0.18] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ── single bento card ── */
function BentoCard({
  card,
  delay,
}: {
  card: (typeof cards)[number];
  delay: number;
}) {
  const reduced = useReducedMotion();
  const isTall = card.size === "tall";

  return (
    <motion.div
      className={[
        "group relative overflow-hidden rounded-2xl border p-6 md:p-8",
        "flex flex-col justify-between",
        card.size === "wide" ? "sm:col-span-2" : "",
        isTall ? "sm:row-span-2" : "",
        "transition-shadow duration-300",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: "var(--landing-glass-bg)",
        borderColor: "var(--landing-border)",
        minHeight: isTall ? 340 : 200,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ ...defaultTransition(reduced), delay: reduced ? 0 : delay }}
      whileHover={
        reduced
          ? undefined
          : {
              y: -5,
              borderColor: card.accent + "55",
              boxShadow: `0 24px 60px ${card.glow}`,
            }
      }
    >
      {/* background glow */}
      <FloatOrb color={card.accent} />

      {/* corner gradient accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${card.accent}18 0%, transparent 65%)`,
        }}
      />

      {/* top row: icon + stat */}
      <div className="relative flex items-start justify-between gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ background: card.accent + "22", color: card.accent }}
        >
          <MaterialIcon name={card.icon} className="text-2xl" />
        </div>

        <div className="text-right">
          <p
            className="font-[family-name:var(--font-family-display)] text-2xl font-bold leading-none"
            style={{ color: card.accent }}
          >
            {card.stat}
          </p>
          <p className="mt-0.5 text-xs opacity-50">{card.statLabel}</p>
        </div>
      </div>

      {/* content */}
      <div className="relative mt-5 flex flex-col gap-3">
        <h3 className="landing-title text-lg font-bold">{card.label}</h3>
        <p className="landing-muted text-sm leading-relaxed opacity-70">
          {card.description}
        </p>

        {/* tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-0.5 font-mono text-xs font-medium"
              style={{
                background: card.accent + "18",
                color: card.accent,
                border: `1px solid ${card.accent}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* bottom arrow link */}
      <div className="relative mt-6 flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ color: card.accent }}
      >
        <span>Learn more</span>
        <MaterialIcon name="arrow_forward" className="text-sm" />
      </div>
    </motion.div>
  );
}

/* ── section header ── */
function SectionHeader() {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff6b00]">
        What we build
      </p>
      <h2 className="landing-title mt-3 font-[family-name:var(--font-family-display)] text-3xl font-bold sm:text-4xl lg:text-5xl">
        Services at a glance
      </h2>
      <p className="landing-lead mt-4 opacity-70">
        From MVPs to enterprise platforms. Pick a surface, we&apos;ll engineer it right.
      </p>
    </Reveal>
  );
}

/* ── exported section ── */
export function BentoGrid() {
  return (
    <section id="services" className="landing-section-gap scroll-mt-28">
      <div className="site-container">
        <SectionHeader />

        {/* bento grid: 1-col mobile → 2-col sm → 3-col lg */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {cards.map((card, i) => (
            <BentoCard key={card.id} card={card} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
