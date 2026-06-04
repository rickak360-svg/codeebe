"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroShowcaseImages } from "@/data/landing";
import { HeroFloatingBriefButton } from "./HeroFloatingBriefButton";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  onOpenBrief: () => void;
};

const slotClass: Record<(typeof heroShowcaseImages)[number]["slot"], string> = {
  "top-left":
    "relative col-start-1 row-start-1 min-h-0 overflow-hidden rounded-xl border border-[var(--landing-border)] shadow-md sm:rounded-2xl",
  "top-right":
    "relative col-start-2 row-start-1 min-h-0 overflow-hidden rounded-xl border border-[var(--landing-border)] shadow-md sm:rounded-2xl",
  "bottom-left":
    "relative col-start-1 row-start-2 min-h-0 overflow-hidden rounded-xl border border-[var(--landing-border)] shadow-md sm:rounded-2xl",
  "bottom-right":
    "relative col-start-2 row-start-2 min-h-0 overflow-hidden rounded-xl border border-[var(--landing-border)] shadow-md sm:rounded-2xl",
};

export function HeroBriefTeaser({ onOpenBrief }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.45 }}
      className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-surface-low)] p-2 pb-2.5 shadow-xl sm:p-2.5 sm:pb-3">
        <div className="grid min-h-[320px] grid-cols-[1.22fr_1fr] grid-rows-[1.18fr_1fr] gap-2 sm:min-h-[350px] sm:gap-2.5 lg:min-h-[380px]">
          {heroShowcaseImages.map((img, i) => (
            <motion.div
              key={img.slot}
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
              className={`${slotClass[img.slot]} min-h-[138px] sm:min-h-[150px] lg:min-h-[162px]`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 420px) 45vw, 210px"
                className="object-cover object-center"
                priority={i === 0}
              />
            </motion.div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-[var(--landing-surface-low)] to-transparent"
          aria-hidden
        />

        <div className="relative z-10 -mt-10 flex justify-center pb-0.5 sm:-mt-11 sm:justify-end sm:pr-1">
          <HeroFloatingBriefButton onClick={onOpenBrief} />
        </div>
      </div>
    </motion.div>
  );
}
