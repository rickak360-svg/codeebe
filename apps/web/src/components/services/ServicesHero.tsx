"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MaterialIcon } from "@/components/home/MaterialIcon";

const TAGS = ["SaaS Platforms", "AI Integrations", "E-Commerce", "Mobile Apps", "WordPress", "Custom APIs"];

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] pt-[8rem] pb-20 sm:pt-[9.5rem] sm:pb-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#ff6b00]/[0.05] blur-[120px]" />
      <div className="site-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80"
          >
            What We Build
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.4 }}
            className="font-[family-name:var(--font-family-display)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.5rem]"
          >
            End-to-end{" "}
            <span className="bg-gradient-to-r from-[#ff6b00] to-[#ff9a00] bg-clip-text text-transparent">
              product engineering
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.38 }}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/50"
          >
            From idea to scalable product. We design, build, test, and ship software — taking
            full ownership so you can focus on growth.
          </motion.p>
          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-7 flex flex-wrap justify-center gap-2"
          >
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#ff6b00]/20 bg-[#ff6b00]/[0.06] px-3 py-1 text-[11.5px] font-medium text-[#ff6b00]/80"
              >
                {tag}
              </span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.36 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/estimate"
              className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-6 py-3 text-sm font-semibold text-[#1a0a00] shadow-[0_6px_24px_-6px_rgba(255,107,0,0.5)] hover:bg-[#ff8533] transition-colors"
            >
              <MaterialIcon name="calculate" className="!text-[15px]" />
              Get an Estimate
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white/60 hover:border-white/20 hover:text-white transition-all"
            >
              <MaterialIcon name="work" className="!text-[15px]" />
              View Our Work
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
