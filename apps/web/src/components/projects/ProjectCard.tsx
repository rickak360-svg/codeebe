"use client";

import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ProjectCardActions } from "./ProjectCardActions";

// ── Placeholder thumbnail helpers ──────────────────────────────────────────
const PALETTES = [
  ["#ff6b00", "#ff9a00"],
  ["#8b5cf6", "#c084fc"],
  ["#10b981", "#34d399"],
  ["#3b82f6", "#60a5fa"],
  ["#ef4444", "#f87171"],
  ["#f59e0b", "#fcd34d"],
  ["#06b6d4", "#22d3ee"],
  ["#ec4899", "#f472b6"],
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function PlaceholderThumb({
  name,
  category,
  tech,
}: {
  name: string;
  category: string;
  tech: string[];
}) {
  const [c1, c2] = PALETTES[hashStr(name + category) % PALETTES.length];
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${c1}22 0%,${c2}14 50%,#0a0a0a 100%)` }} />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(${c1}60 1px,transparent 1px),linear-gradient(90deg,${c1}60 1px,transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" style={{ background: `${c1}30` }} />
      <div
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl font-extrabold"
        style={{ background: `linear-gradient(135deg,${c1}22,${c2}18)`, borderColor: `${c1}35`, color: c1 }}
      >
        {initials(name)}
      </div>
      <p className="relative z-10 mt-3 max-w-[80%] truncate text-center text-[13px] font-semibold text-white/70">{name}</p>
      <div className="relative z-10 mt-2 flex flex-wrap justify-center gap-1 px-4">
        {tech.slice(0, 3).map((t) => (
          <span key={t} className="rounded px-1.5 py-0.5 font-mono text-[9px] font-medium" style={{ background: `${c1}18`, color: `${c1}cc` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────
export function ProjectCard({ project }: { project: Project }) {
  const thumb = project.screenshots?.[0];

  return (
    <article className="card-surface group flex flex-col overflow-hidden transition hover:border-[#ff6600]/40 hover:shadow-[0_0_30px_rgba(255,102,0,0.1)]">
      {/* Thumbnail */}
      <div className="relative h-44 w-full overflow-hidden bg-zinc-900/60">
        {thumb ? (
          <Image
            src={thumb}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderThumb name={project.name} category={project.category} tech={project.techStack} />
        )}
        <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[#ff6600] backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-semibold text-white">{project.name}</h3>
        <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-zinc-400">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10.5px] text-zinc-500">
              {tag}
            </span>
          ))}
        </div>
        <ProjectCardActions slug={project.slug} name={project.name} screenshots={project.screenshots} variant="default" />
      </div>
    </article>
  );
}
