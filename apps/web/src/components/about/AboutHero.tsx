"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";

export function AboutHero() {
  return (
    <section className="pt-[9rem] pb-8 sm:pt-[10rem]">
      <div className="site-container">

        {/* ── page heading (centered) ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-white/[0.06] pb-8 text-center"
        >
          {/* eyebrow */}
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#ff6b00]/30" />
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#ff6b00]/70">
              About Codeebe
            </p>
            <span className="h-px w-8 bg-[#ff6b00]/30" />
          </div>

          {/* title */}
          <h1 className="font-[family-name:var(--font-family-display)] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            We build products that{" "}
            <span className="bg-gradient-to-r from-[#ff6b00] to-[#ff9a00] bg-clip-text text-transparent">
              scale and last
            </span>
          </h1>

          {/* description */}
          <p className="mx-auto mt-3 max-w-lg text-[13.5px] leading-relaxed text-white/40">
            A premium product engineering studio partnering with founders to build
            SaaS platforms, AI workflows, marketplaces, and custom software.
          </p>

          {/* meta chips */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5">
              <MaterialIcon name="workspace_premium" className="!text-[13px] text-[#ff6b00]/60" />
              <span className="font-mono text-[11px] text-white/45">product-first</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5">
              <MaterialIcon name="rocket_launch" className="!text-[13px] text-[#ff6b00]/60" />
              <span className="font-mono text-[11px] text-white/45">launch-ready delivery</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
