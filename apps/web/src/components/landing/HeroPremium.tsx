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
      className="relative isolate w-full overflow-x-clip border-b border-[var(--landing-border-subtle)] bg-[var(--landing-surface-lowest)] pt-36 sm:pt-40 lg:pt-44"
    >
      <LandingBackdrop glowRight subtle />

      {/* Fade only under the floating header — keep short so hero card isn't clipped */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[15] h-24 bg-gradient-to-b from-[var(--landing-surface-lowest)] from-20% via-[var(--landing-surface-lowest)]/70 to-transparent sm:h-28 lg:h-32"
        aria-hidden
      />

      {/* Soft brand glows — clipped by overflow-x-clip so they never cause horizontal scroll */}
      <div
        className="pointer-events-none absolute -left-24 top-24 h-56 w-56 rounded-full bg-[#ff6b00]/12 blur-[90px] lg:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b00]/40 to-transparent"
        aria-hidden
      />

      <SiteContainer className="relative z-10 pb-14 pt-4 sm:pb-16 sm:pt-6 lg:pb-24 lg:pt-8">
        <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-14 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,540px)]">
          {/* Copy — leads on every breakpoint for a clear value prop */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="order-1 flex min-w-0 w-full flex-col items-start"
          >
            <motion.p
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="inline-flex items-center gap-2 rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff8533] sm:text-xs"
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
              className="landing-title mt-5 w-full font-[family-name:var(--font-family-ethno)] text-[1.5rem] leading-[1.15] tracking-[0.02em] sm:text-[2.25rem] sm:leading-[1.12] lg:text-[2.75rem] xl:text-[3rem]"
            >
              Describe your project.{" "}
              <span className="bg-gradient-to-br from-[#ffb693] via-[#ff6b00] to-[#ff8533] bg-clip-text text-transparent">
                Get a clear SRS, quotation, and launch roadmap.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="landing-muted mt-4 max-w-[52ch] text-[15px] leading-relaxed sm:text-base md:text-lg md:leading-[1.6]"
            >
              Use the wizard to describe your idea and instantly get an SRS,
              quotation, and roadmap you can act on.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#ff6b00] px-6 py-3.5 text-[15px] font-semibold text-[#1a0a00] shadow-[0_12px_32px_-10px_rgba(255,107,0,0.55)] transition-[background-color,box-shadow,transform] hover:bg-[#ff8533] hover:shadow-[0_14px_36px_-10px_rgba(255,107,0,0.65)] active:scale-[0.98] sm:w-auto sm:px-7"
              >
                Start in the wizard
              </button>
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-btn-ghost inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-[15px] font-medium sm:w-auto sm:px-7"
              >
                Book Consultation
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={defaultTransition(reduced)}
              className="w-full"
            >
              <HeroTrustStrip />
            </motion.div>
          </motion.div>

          {/* Visual — follows the copy on mobile, sits beside it on desktop */}
          <div className="order-2 relative z-20 w-full min-w-0 overflow-visible">
            <HeroRequirementWizard open={modalOpen} onOpenChange={setModalOpen} />
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
