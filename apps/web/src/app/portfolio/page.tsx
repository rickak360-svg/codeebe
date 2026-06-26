import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioList } from "@/components/portfolio/PortfolioList";
import { PortfolioCta } from "@/components/portfolio/PortfolioCta";
import { getProjects } from "@/lib/projects";

export const metadata = {
  title: "Portfolio — Codeebe | Products We've Engineered",
  description:
    "Explore SaaS platforms, e-commerce stores, marketplaces, and custom software projects delivered by Codeebe.",
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="bg-[#0a0a0a]">
      <PortfolioHero count={projects.length} />
      <PortfolioList projects={projects} />
      <PortfolioCta />
    </main>
  );
}
