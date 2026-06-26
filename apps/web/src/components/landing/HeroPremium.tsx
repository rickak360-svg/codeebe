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
      className="relative isolate overflow-hidden border-b border-[var(--landing-border-subtle)] bg-[var(--landing-surface-lowest)] pt-[6.75rem] sm:pt-[8.75rem]"
    >
      <LandingBackdrop glowRight subtle />

      {/* Mobile-only ambient glow — stronger presence on small screens */}
      <div
        className="pointer-events-none absolute -left-24 top-28 h-64 w-64 rounded-full bg-[#ff6b00]/14 blur-[90px] sm:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-16 h-48 w-48 rounded-full bg-[#ffb693]/12 blur-[70px] sm:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b00]/40 to-transparent sm:hidden"
        aria-hidden
      />

      <SiteContainer className="relative z-10 pb-10 pt-4 sm:pb-12 sm:pt-5 md:pb-16 md:pt-9 lg:pb-20 lg:pt-11">
        <div className="grid items-start gap-7 sm:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,460px)] lg:gap-10 xl:grid-cols-[minmax(0,1.25fr)_480px] xl:gap-12">
          {/* Visual leads on mobile — copy follows once the hook lands */}
          <div className="order-1 w-full lg:order-2">
            <HeroRequirementWizard
              open={modalOpen}
              onOpenChange={setModalOpen}
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="order-2 w-full max-w-none space-y-4 sm:max-w-[540px] lg:order-1 lg:max-w-[600px] xl:max-w-[640px]"
          >
            <motion.p
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="inline-flex items-center gap-2 rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff8533] sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:text-xs sm:font-medium sm:tracking-[0.2em] sm:text-[var(--landing-on-surface-variant)]"
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6b00] ${reduced ? "" : "animate-pulse"}`}
                aria-hidden
              />
              Project clarity platform
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="landing-title font-[family-name:var(--font-family-display)] text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[2.375rem] sm:leading-[1.2] sm:tracking-tight lg:text-[2.75rem] lg:leading-[1.16]"
            >
              Describe your project.{" "}
              <span className="bg-gradient-to-br from-[#ffb693] via-[#ff6b00] to-[#ff8533] bg-clip-text text-transparent">
                Get a clear SRS, quotation, and launch roadmap.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="landing-muted max-w-[36ch] text-[15px] leading-relaxed sm:max-w-none sm:text-base sm:leading-relaxed md:text-lg md:leading-[1.55]"
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
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#ff6b00] px-6 py-3.5 text-[15px] font-semibold text-[#1a0a00] shadow-[0_12px_32px_-10px_rgba(255,107,0,0.55)] transition-[background-color,box-shadow,transform] hover:bg-[#ff8533] hover:shadow-[0_14px_36px_-10px_rgba(255,107,0,0.65)] active:scale-[0.98] sm:w-auto sm:rounded-lg sm:py-3 sm:font-medium sm:shadow-none sm:hover:shadow-none sm:active:scale-100 sm:text-base"
                >
                  Start in the wizard
                </button>
                <a
                  href={siteConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="landing-btn-ghost inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-[15px] font-medium sm:w-auto sm:rounded-lg sm:py-3 sm:text-base"
                >
                  Book Consultation
                </a>
              </div>
              <HeroTrustStrip />
            </motion.div>
          </motion.div>
        </div>
      </SiteContainer>
    </section>
  );
}
