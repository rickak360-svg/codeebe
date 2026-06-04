"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { faqItems } from "@/data/landing";
import { Reveal } from "./Reveal";
import { useReducedMotion } from "./useReducedMotion";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="landing-section-alt landing-section-gap scroll-mt-28">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
        <Reveal className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff6b00]">FAQ</p>
          <h2 className="landing-title mt-3 font-[family-name:var(--font-family-display)] text-3xl font-bold sm:text-4xl">
            Common questions
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.question} delay={i * 0.05}>
                <div className="glass-card overflow-hidden rounded-xl">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="landing-title font-semibold">{item.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.25 }}
                    >
                      <MaterialIcon name="expand_more" className="text-[#ff6b00]" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="landing-muted border-t border-[var(--landing-border-subtle)] px-5 pb-4 pt-3 text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
