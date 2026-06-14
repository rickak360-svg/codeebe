"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { ProjectCardActions } from "@/components/projects/ProjectCardActions";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { GlassCard } from "./GlassCard";
import { Reveal } from "./Reveal";
import { Stagger, StaggerItem } from "./Stagger";
import { useReducedMotion } from "./useReducedMotion";

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion();

  return (
    <section id="portfolio" className="landing-section-gap scroll-mt-28">
      <div className="site-container">
        <Reveal className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff6b00]">Case studies</p>
            <h2 className="landing-title mt-3 font-[family-name:var(--font-family-display)] text-3xl font-bold sm:text-4xl">
              Products we&apos;ve engineered
            </h2>
          </div>
          <Link
            href="/projects"
            className="landing-link inline-flex items-center gap-2 font-mono text-sm"
          >
            View all
            <MaterialIcon name="north_east" className="text-base" />
          </Link>
        </Reveal>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <motion.div whileHover={reduced ? undefined : { y: -6 }}>
                <GlassCard className="group flex h-full flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#ff6b00]">
                    {project.category}
                  </p>
                  <h3 className="landing-title mt-3 text-xl font-bold transition-colors group-hover:text-[#ff6b00]">
                    {project.name}
                  </h3>
                  <p className="landing-muted mt-2 flex-1 text-sm leading-relaxed">
                    {project.shortDescription}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="landing-tag rounded px-2 py-0.5 font-mono text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ProjectCardActions
                    slug={project.slug}
                    name={project.name}
                    screenshots={project.screenshots}
                    variant="landing"
                  />
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
