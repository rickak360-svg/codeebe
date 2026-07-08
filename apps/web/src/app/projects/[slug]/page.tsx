import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/Button";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
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

  const screenshots = project.screenshots ?? [];

  return (
    <article className="page-below-header relative overflow-hidden pb-24">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#ff6b00]/[0.05] blur-[140px]" />
      </div>

      <div className="site-container relative z-10">
        {/* breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-white/40">
          <Link href="/" className="transition-colors hover:text-white/70">Home</Link>
          <span className="text-white/20">/</span>
          <Link href="/portfolio" className="transition-colors hover:text-white/70">Portfolio</Link>
          <span className="text-white/20">/</span>
          <span className="text-[#ff6b00]/80">{project.name}</span>
        </nav>

        {/* header */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#ff6b00]/30" />
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#ff6b00]/70">
              {project.category}
            </p>
            <span className="h-px w-8 bg-[#ff6b00]/30" />
          </div>
          <h1 className="font-[family-name:var(--font-family-display)] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {project.name}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/50">
            {project.overview}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {project.techStack.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#ff6b00]/20 bg-[#ff6b00]/[0.06] px-3 py-1 text-[11.5px] font-medium text-[#ff6b00]/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* gallery */}
        {screenshots.length > 0 && (
          <div className="mt-10">
            <ProjectGallery images={screenshots} name={project.name} />
          </div>
        )}

        {/* content grid */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* main content */}
          <div className="space-y-10">
            <section>
              <div className="mb-3 flex items-center gap-2">
                <MaterialGlyph name="target" />
                <h2 className="text-lg font-semibold text-white">Problem solved</h2>
              </div>
              <p className="text-[14.5px] leading-relaxed text-white/55">{project.problemSolved}</p>
            </section>

            <section>
              <div className="mb-4 flex items-center gap-2">
                <MaterialGlyph name="bolt" />
                <h2 className="text-lg font-semibold text-white">Key features</h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.keyFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-[13.5px] text-white/65"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#ff6b00]/10">
                      <span className="material-symbols-outlined !text-[14px] text-[#ff6b00]">check</span>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <MaterialGlyph name="trending_up" />
                <h2 className="text-lg font-semibold text-white">Business value</h2>
              </div>
              <p className="text-[14.5px] leading-relaxed text-white/55">{project.businessValue}</p>
            </section>
          </div>

          {/* sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#ff6b00]/15 bg-gradient-to-b from-[#ff6b00]/[0.06] to-transparent p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Similar project cost range
                </p>
                <p className="mt-2 font-[family-name:var(--font-family-display)] text-2xl font-bold text-[#ff6b00]">
                  {project.costRange}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-white/40">
                  Indicative range based on comparable scope — final pricing depends on your requirements.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Built with
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center">
                <p className="text-[13.5px] font-medium text-white">Want something similar?</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/45">
                  Get a tailored estimate for your project in minutes.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <ButtonLink href="/estimate" className="w-full">Get an estimate</ButtonLink>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center gap-1 text-[13px] font-medium text-white/45 transition-colors hover:text-[#ff6b00]"
                  >
                    <span className="material-symbols-outlined !text-[15px]">arrow_back</span>
                    All projects
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

function MaterialGlyph({ name }: { name: string }) {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff6b00]/10 ring-1 ring-[#ff6b00]/15">
      <span className="material-symbols-outlined !text-[16px] text-[#ff6b00]">{name}</span>
    </span>
  );
}
