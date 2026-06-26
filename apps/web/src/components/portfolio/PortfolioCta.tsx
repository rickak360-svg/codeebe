"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { siteConfig } from "@/config/site";

export function PortfolioCta() {
  return (
    <section className="border-t border-white/[0.06] bg-white/[0.015] py-20 sm:py-24">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-2xl border border-[#ff6b00]/20 bg-gradient-to-br from-[#ff6b00]/[0.08] to-transparent p-10 text-center sm:p-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,107,0,0.12),transparent)]" />
          <p className="relative mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">
            Your project next?
          </p>
          <h2 className="relative font-[family-name:var(--font-family-display)] text-3xl font-bold text-white sm:text-4xl">
            Let&apos;s add your product to this list
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-white/50">
            We&apos;re taking on new projects. Tell us what you need and we&apos;ll send a
            detailed estimate and SRS within 24 hours.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/estimate"
              className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-7 py-3 text-sm font-semibold text-[#1a0a00] shadow-[0_6px_28px_-6px_rgba(255,107,0,0.55)] hover:bg-[#ff8533] transition-colors"
            >
              <MaterialIcon name="calculate" className="!text-[15px]" />
              Get a Free Estimate
            </Link>
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-7 py-3 text-sm font-medium text-white/60 hover:border-white/20 hover:text-white transition-all"
            >
              <MaterialIcon name="calendar_today" className="!text-[15px]" />
              Book a Discovery Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
