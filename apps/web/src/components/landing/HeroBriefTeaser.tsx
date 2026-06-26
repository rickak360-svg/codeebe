"use client";

import { motion } from "framer-motion";
import { HeroVisual } from "@/components/home/HeroVisual";
import { HeroFloatingBriefButton } from "./HeroFloatingBriefButton";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  onOpenBrief: () => void;
};

const processSteps = ["Describe", "Analyze", "Quote", "Roadmap"] as const;

function HeroProcessStrip() {
  return (
    <div className="rounded-xl border border-[var(--landing-border)]/60 bg-[var(--landing-glass-bg)]/80 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-3.5">
      <div className="flex items-center justify-start gap-1.5 overflow-x-auto [scrollbar-width:none] sm:justify-center sm:gap-2 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {processSteps.map((step, index) => (
          <div key={step} className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6b00]/15 text-[10px] font-semibold tabular-nums text-[#ff6b00] sm:h-6 sm:w-6 sm:text-[11px]">
                {index + 1}
              </span>
              <span className="whitespace-nowrap text-[11px] font-medium text-[var(--landing-on-surface)] sm:text-xs">
                {step}
              </span>
            </div>
            {index < processSteps.length - 1 && (
              <span className="h-px w-3 bg-[var(--landing-border)] sm:w-5" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const mobileFloatChips = [
  { label: "SRS ready", className: "hero-float-delay-1 -left-1 top-6 sm:hidden" },
  { label: "Live quote", className: "hero-float-delay-3 -right-0.5 top-14 sm:hidden" },
  { label: "48h roadmap", className: "hero-float-delay-2 -bottom-1 left-4 sm:hidden" },
] as const;

export function HeroBriefTeaser({ onOpenBrief }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-none sm:max-w-[420px] lg:mx-0 lg:max-w-none"
    >
      <div
        className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,rgba(255,107,0,0.16),transparent_68%)] sm:-inset-3 sm:rounded-[1.75rem] sm:bg-[radial-gradient(circle_at_50%_35%,rgba(255,107,0,0.1),transparent_70%)]"
        aria-hidden
      />

      <div className="relative space-y-3 sm:space-y-3">
        <div className="relative">
          {!reduced &&
            mobileFloatChips.map((chip) => (
              <span
                key={chip.label}
                className={`pointer-events-none absolute z-20 rounded-full border border-[#ff6b00]/30 bg-[var(--landing-surface-lowest)]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#ff8533] shadow-[0_8px_24px_-8px_rgba(255,107,0,0.45)] backdrop-blur-sm ${chip.className}`}
              >
                {chip.label}
              </span>
            ))}

          <div className="-rotate-1 sm:rotate-0">
            <div className={reduced ? "" : "hero-float"}>
              <HeroVisual />
            </div>
          </div>
        </div>

        <HeroProcessStrip />

        <div className="flex justify-stretch sm:justify-end sm:pr-0.5">
          <HeroFloatingBriefButton
            onClick={onOpenBrief}
            className="w-full justify-center sm:w-auto sm:justify-start"
          />
        </div>
      </div>
    </motion.div>
  );
}
