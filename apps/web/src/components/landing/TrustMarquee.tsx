"use client";

import { motion } from "framer-motion";
import { trustMarqueeItems } from "@/data/landing";
import { useReducedMotion } from "./useReducedMotion";

export function TrustMarquee() {
  const reduced = useReducedMotion();

  const row = (
    <div className="flex shrink-0 items-center gap-10 md:gap-16">
      {trustMarqueeItems.map((item) => (
        <span
          key={item}
          className="landing-muted font-mono text-sm font-medium uppercase tracking-[0.2em] opacity-40 md:text-base"
        >
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <section className="landing-section-alt overflow-hidden border-y py-8">
      {reduced ? (
        <div className="site-container flex flex-wrap justify-center gap-6">{row}</div>
      ) : (
        <motion.div
          className="flex w-max gap-10 md:gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {row}
          {row}
        </motion.div>
      )}
    </section>
  );
}
