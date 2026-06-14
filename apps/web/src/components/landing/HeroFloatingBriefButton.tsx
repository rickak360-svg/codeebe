"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  onClick: () => void;
  className?: string;
};

export function HeroFloatingBriefButton({ onClick, className = "" }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.35 }}
      whileHover={reduced ? undefined : { scale: 1.03 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      className={`group flex items-center gap-1.5 rounded-full border border-[#ff6b00]/30 bg-[#ff6b00] px-3 py-2 text-xs font-semibold text-[#1a0a00] shadow-[0_8px_28px_-8px_rgba(255,107,0,0.5)] transition-shadow hover:bg-[#ff8533] hover:shadow-[0_10px_32px_-8px_rgba(255,107,0,0.6)] sm:px-3.5 sm:py-2.5 sm:text-sm ${className}`}
      aria-label="Open project brief"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a0a00]/10 sm:h-7 sm:w-7">
        <MaterialIcon name="edit_note" className="!text-[16px] text-[#1a0a00] sm:!text-[18px]" />
      </span>
      <span className="pr-0.5">Project brief</span>
      <MaterialIcon
        name="arrow_forward"
        className="!text-[15px] transition-transform group-hover:translate-x-0.5 sm:!text-[16px]"
      />
    </motion.button>
  );
}
