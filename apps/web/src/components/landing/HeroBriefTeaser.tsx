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
    <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-glass-bg)]/80 px-3 py-3 backdrop-blur-sm sm:px-4">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3">
        {processSteps.map((step, index) => (
          <div key={step} className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff6b00]/15 text-[10px] font-semibold tabular-nums text-[#ff6b00] sm:h-6 sm:w-6 sm:text-[11px]">
                {index + 1}
              </span>
              <span className="text-[11px] font-medium text-[var(--landing-on-surface)] sm:text-xs">
                {step}
              </span>
            </div>
            {index < processSteps.length - 1 && (
              <span className="h-px w-3 shrink-0 bg-[var(--landing-border)] sm:w-5" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroBriefTeaser({ onOpenBrief }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full min-w-0 max-w-[440px] overflow-visible pt-3 lg:mx-0 lg:max-w-none"
    >
      <div
        className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_35%,rgba(255,107,0,0.12),transparent_70%)]"
        aria-hidden
      />

      <div className="relative space-y-3">
        <div className={reduced ? "" : "hero-float"}>
          <HeroVisual />
        </div>

        <HeroProcessStrip />

        <HeroFloatingBriefButton
          onClick={onOpenBrief}
          className="w-full justify-center"
        />
      </div>
    </motion.div>
  );
}
