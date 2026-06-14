import { SectionHeading } from "@/components/brand/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects — Codeebe",
  description: "Case studies and previous work from Codeebe.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="page-below-header site-container pb-16 pt-8 sm:pb-20">
      <SectionHeading
        eyebrow="Portfolio"
        title="Our"
        titleAccent="projects"
        description="Explore platforms, stores, and tools we've delivered, synced from the Codeebe API."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
