"use client";

import { motion } from "framer-motion";
import { engineeringProcess } from "@/data/landing";

export function AboutProcess() {
  return (
    <section className="py-20 sm:py-24">
      <div className="site-container">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">How We Work</p>
          <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white sm:text-4xl">
            Our engineering process
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-white/45">
            From brief to launch — a structured approach that keeps you in control at every stage.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {engineeringProcess.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="group relative flex gap-5 pb-10 last:pb-0"
            >
              {/* vertical line */}
              {i < engineeringProcess.length - 1 && (
                <div className="absolute left-5 top-12 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-[#ff6b00]/30 to-transparent" />
              )}

              {/* step number */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff6b00] text-sm font-bold text-[#1a0a00]">
                {step.step}
              </div>

              <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors group-hover:border-white/10">
                <p className="text-[13.5px] font-semibold text-white/90">{step.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/45">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
