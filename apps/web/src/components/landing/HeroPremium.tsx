"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/motion";
import { HeroRequirementWizard } from "./HeroRequirementWizard";
import { HeroTrustStrip } from "./HeroTrustStrip";
import { LandingBackdrop } from "./LandingBackdrop";
import { SiteContainer } from "./SiteContainer";
import { useReducedMotion } from "./useReducedMotion";

export function HeroPremium() {
  const reduced = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden border-b border-[var(--landing-border-subtle)] bg-[var(--landing-surface-lowest)] pt-[7.5rem] sm:pt-[8.75rem]"
    >
      <LandingBackdrop glowRight subtle />

      <SiteContainer className="relative z-10 pb-12 pt-5 md:pb-16 md:pt-9 lg:pb-20 lg:pt-11">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,460px)] lg:gap-10 xl:grid-cols-[minmax(0,1.25fr)_480px] xl:gap-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[540px] space-y-4 lg:max-w-[600px] xl:max-w-[640px]"
          >
            <motion.p
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="landing-muted text-xs font-medium uppercase tracking-[0.2em] sm:text-[13px]"
            >
              Project clarity platform
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="landing-title font-[family-name:var(--font-family-display)] text-[2rem] font-semibold leading-[1.2] tracking-tight sm:text-[2.375rem] lg:text-[2.75rem] lg:leading-[1.16]"
            >
              Describe your project. Get a clear SRS, quotation, and launch roadmap.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="landing-muted text-base leading-relaxed sm:text-lg sm:leading-[1.55]"
            >
              Use the wizard to describe your idea and get SRS, quotation, and roadmap options.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="space-y-0"
            >
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#ff6b00] px-6 py-3 text-[15px] font-medium text-[#1a0a00] transition-colors hover:bg-[#ff8533] sm:text-base"
                >
                  Start in the wizard
                </button>
                <a
                  href={siteConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="landing-btn-ghost inline-flex items-center justify-center rounded-lg px-6 py-3 text-[15px] font-medium sm:text-base"
                >
                  Book Consultation
                </a>
              </div>
              <HeroTrustStrip />
            </motion.div>
          </motion.div>

          <div className="w-full">
            <HeroRequirementWizard
              open={modalOpen}
              onOpenChange={setModalOpen}
            />
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
