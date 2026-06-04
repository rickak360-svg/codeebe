"use client";

import { motion } from "framer-motion";
import { engineeringProcess } from "@/data/landing";
import { GlassCard } from "./GlassCard";
import { Reveal } from "./Reveal";
import { Stagger, StaggerItem } from "./Stagger";
import { useReducedMotion } from "./useReducedMotion";

export function ProcessTimeline() {
  const reduced = useReducedMotion();

  return (
    <section id="process" className="landing-section-gap scroll-mt-28">
      <div className="site-container">
        <Reveal className="mb-14 text-center md:mx-auto md:max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff6b00]">How we work</p>
          <h2 className="landing-title mt-3 font-[family-name:var(--font-family-display)] text-3xl font-bold sm:text-4xl">
            Engineering process
          </h2>
        </Reveal>

        <div className="relative">
          <motion.div
            className="absolute left-0 top-0 hidden h-full w-full lg:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="landing-process-line absolute top-1/2 left-0 right-0 h-px" />
            <motion.div
              className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-[#ff6b00] to-[#ffb693]/50"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0.01 : 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringProcess.map((step) => (
              <StaggerItem key={step.step}>
                <GlassCard className="relative p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center bg-[#ff6b00] font-mono text-sm font-bold text-[#1a0a00]">
                    {step.step}
                  </span>
                  <h3 className="landing-title mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="landing-muted mt-2 text-sm leading-relaxed">{step.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
