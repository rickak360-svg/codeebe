import Link from "next/link";

import type { Project } from "@/lib/projects";



export function ProjectCard({ project }: { project: Project }) {

  return (

    <article className="card-surface group flex flex-col p-6 transition hover:border-[#ff6600]/40 hover:shadow-[0_0_30px_rgba(255,102,0,0.1)]">

      <p className="text-xs font-semibold uppercase tracking-wide text-[#ff6600]">

        {project.category}

      </p>

      <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">

        {project.shortDescription}

      </p>

      <div className="mt-4 flex flex-wrap gap-2">

        {project.techStack.slice(0, 4).map((tag) => (

          <span

            key={tag}

            className="rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-xs text-zinc-400"

          >

            {tag}

          </span>

        ))}

      </div>

      <Link

        href={`/projects/${project.slug}`}

        className="mt-5 text-sm font-medium text-[#ff6600] transition group-hover:text-[#ff8533]"

      >

        View Case Study →

      </Link>

    </article>

  );

}

