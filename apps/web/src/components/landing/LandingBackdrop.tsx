"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

export function LandingBackdrop({
  glowRight = false,
  subtle = false,
}: {
  glowRight?: boolean;
  subtle?: boolean;
}) {
  const reduced = useReducedMotion();
  const gridOpacity = subtle ? [0.08, 0.14, 0.08] : [0.14, 0.28, 0.14];
  const gridStatic = subtle ? 0.1 : 0.22;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {reduced ? (
        <div
          className="landing-grid-pattern absolute inset-0"
          style={{ opacity: gridStatic }}
        />
      ) : (
        <motion.div
          className="landing-grid-pattern absolute inset-0"
          animate={{ opacity: gridOpacity }}
          transition={{ duration: subtle ? 12 : 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {!subtle && (
        <div className="absolute -left-32 top-1/4 h-[360px] w-[360px] rounded-full bg-[#ffb693]/6 blur-[100px]" />
      )}
      {glowRight && (
        <div
          className={`absolute rounded-full blur-[100px] ${
            subtle
              ? "-right-16 top-1/3 h-[320px] w-[320px] bg-[#ff6b00]/6"
              : "-right-20 top-1/3 h-[480px] w-[480px] bg-[#ff6b00]/14 blur-[110px]"
          }`}
        />
      )}
    </div>
  );
}
