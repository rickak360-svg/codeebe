import Link from "next/link";

import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/Button";

import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";



type Props = { params: Promise<{ slug: string }> };



export const revalidate = 60;



export async function generateStaticParams() {

  const slugs = await getAllProjectSlugs();

  return slugs.map((slug) => ({ slug }));

}



export async function generateMetadata({ params }: Props) {

  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project — Codeebe" };

  return {

    title: `${project.name} — Codeebe`,

    description: project.shortDescription,

  };

}



export default async function ProjectDetailPage({ params }: Props) {

  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) notFound();



  return (

    <article className="page-below-header mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20">

      <p className="text-sm font-semibold uppercase tracking-wide text-[#ff6600]">

        {project.category}

      </p>

      <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{project.name}</h1>

      <p className="mt-4 text-lg text-zinc-400">{project.overview}</p>



      <div className="mt-6 flex flex-wrap gap-2">

        {project.techStack.map((tag) => (

          <span

            key={tag}

            className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300"

          >

            {tag}

          </span>

        ))}

      </div>



      <section className="mt-12">

        <h2 className="text-xl font-semibold text-white">Problem solved</h2>

        <p className="mt-2 text-zinc-400">{project.problemSolved}</p>

      </section>



      <section className="mt-10">

        <h2 className="text-xl font-semibold text-white">Key features</h2>

        <ul className="mt-3 list-inside list-disc space-y-1 text-zinc-400">

          {project.keyFeatures.map((f) => (

            <li key={f}>{f}</li>

          ))}

        </ul>

      </section>



      <section className="mt-10">

        <h2 className="text-xl font-semibold text-white">Business value</h2>

        <p className="mt-2 text-zinc-400">{project.businessValue}</p>

      </section>



      <section className="card-surface mt-10 p-6">

        <h2 className="text-lg font-semibold text-white">Similar project cost range</h2>

        <p className="mt-2 text-2xl font-bold text-[#ff6600]">{project.costRange}</p>

        <p className="mt-2 text-sm text-zinc-500">

          Indicative range based on comparable scope — final pricing depends on requirements.

        </p>

      </section>



      <div className="mt-12 flex flex-wrap gap-3">

        <ButtonLink href="/estimate">Want a similar project? Get estimate</ButtonLink>

        <Link

          href="/projects"

          className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-[#ff6600]"

        >

          ← All projects

        </Link>

      </div>

    </article>

  );

}

