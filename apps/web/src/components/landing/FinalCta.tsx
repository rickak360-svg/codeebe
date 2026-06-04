"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Reveal } from "./Reveal";
import { useReducedMotion } from "./useReducedMotion";

export function FinalCta() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden landing-section-gap">
      <div className="landing-final-cta-bg pointer-events-none absolute inset-0" />
      <motion.div
        className="landing-final-cta-glow pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#ff6b00]/30 blur-[100px]"
        animate={reduced ? undefined : { opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <Reveal className="site-container relative">
        <div className="glass-card rounded-2xl border-[#ff6b00]/25 p-10 text-center md:p-14">
          <h2 className="landing-title font-[family-name:var(--font-family-display)] text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Ready to build your next product?
          </h2>
          <p className="landing-lead mx-auto mt-4 max-w-xl">
            Book a consultation or request an estimate. We&apos;ll respond with a clear path forward.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[220px] items-center justify-center rounded-lg bg-[#ff6b00] px-8 py-4 font-mono text-sm font-semibold uppercase tracking-widest text-[#1a0a00] transition-colors hover:bg-[#ff8533]"
            >
              Book a consultation
            </a>
            <Link
              href="/estimate"
              className="landing-btn-ghost inline-flex min-w-[220px] items-center justify-center rounded-lg px-8 py-4 font-mono text-sm font-semibold uppercase tracking-widest"
            >
              Request an estimate
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
