"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { MaterialIcon } from "@/components/home/MaterialIcon";

const ALL = "All";

export function PortfolioList({ projects }: { projects: Project[] }) {
  const categories = [ALL, ...Array.from(new Set(projects.map((p) => p.category))).sort()];
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="pt-[9rem] pb-16 sm:pt-[10rem]">
      <div className="site-container">

        {/* ── page heading (centered) ──────────────────────────── */}
        <div className="mb-8 border-b border-white/[0.06] pb-8 text-center">
          {/* eyebrow */}
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#ff6b00]/30" />
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#ff6b00]/70">
              Case Studies
            </p>
            <span className="h-px w-8 bg-[#ff6b00]/30" />
          </div>

          {/* title */}
          <h1 className="font-[family-name:var(--font-family-display)] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Products we&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#ff6b00] to-[#ff9a00] bg-clip-text text-transparent">
              engineered
            </span>
          </h1>

          {/* description */}
          <p className="mx-auto mt-3 max-w-lg text-[13.5px] leading-relaxed text-white/40">
            From zero-to-one MVPs to full-scale production rewrites —
            every project ships with a detailed case study.
          </p>

          {/* meta chips */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5">
              <MaterialIcon name="folder_open" className="!text-[13px] text-[#ff6b00]/60" />
              <span className="font-mono text-[11px] text-white/45">{projects.length} projects</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5">
              <MaterialIcon name="category" className="!text-[13px] text-[#ff6b00]/60" />
              <span className="font-mono text-[11px] text-white/45">{categories.length - 1} categories</span>
            </div>
          </div>
        </div>

        {/* ── filter pills ────────────────────────────────────── */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={[
                "rounded-full px-3.5 py-1 text-[12px] font-medium transition-all",
                active === cat
                  ? "bg-[#ff6b00] text-[#1a0a00]"
                  : "border border-white/[0.07] text-white/40 hover:border-white/15 hover:text-white/70",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── grid ────────────────────────────────────────────── */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <MaterialIcon name="folder_open" className="!text-4xl text-white/20" />
            <p className="text-[14px] text-white/30">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
