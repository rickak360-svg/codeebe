"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";

const FAQS = [
  { q: "How long does a typical project take?",           a: "An MVP SaaS or web app usually takes 6–10 weeks. A simple landing page or portfolio site can be done in 1–2 weeks. We provide a timeline in the SRS before any work begins." },
  { q: "Do you work on fixed-price or hourly contracts?", a: "We prefer fixed-scope, milestone-based contracts for predictability. For ongoing retainer work or evolving products, we offer monthly retainer packages billed at an agreed hourly rate." },
  { q: "Will I own the code and IP?",                     a: "Yes — 100%. Upon final payment, all source code, assets, and IP are transferred to you. We provide repo access throughout the project." },
  { q: "Can you take over an existing codebase?",         a: "Yes. We start with a paid code audit to assess quality, tech debt, and architecture. We then propose a phased plan to stabilise, refactor, or extend the product." },
  { q: "Do you offer post-launch support?",               a: "Yes. We offer three support tiers: bug-fix only (1 month free), standard maintenance retainer (monthly), and full product partnership (ongoing sprints + on-call support)." },
  { q: "What information do I need to provide to get started?", a: "Just a rough idea of what you want to build. We guide you through the brief using our Project Brief Wizard — it takes less than 5 minutes and generates a structured SRS." },
];

export function ServicesFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 border-t border-white/[0.06] bg-white/[0.015] py-20 sm:py-24">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">FAQ</p>
            <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white sm:text-4xl">
              Common questions
            </h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="overflow-hidden rounded-xl border border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[13.5px] font-semibold text-white/80">{faq.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <MaterialIcon name="expand_more" className="!text-[20px] text-[#ff6b00]" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-white/[0.05] px-5 pb-4 pt-3 text-[13px] leading-relaxed text-white/45">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
