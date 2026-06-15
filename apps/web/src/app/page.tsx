import { HeroPremium } from "@/components/landing/HeroPremium";
import { TrustMarquee } from "@/components/landing/TrustMarquee";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { ExpertiseSection } from "@/components/landing/ExpertiseSection";
import { WhyCodeebeSection } from "@/components/landing/WhyCodeebeSection";
import { ProcessTimeline } from "@/components/landing/ProcessTimeline";
import { PortfolioGrid } from "@/components/landing/PortfolioGrid";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { FinalCta } from "@/components/landing/FinalCta";
import { NeedHelpButton } from "@/components/landing/NeedHelpButton";
import { showcaseSlugs } from "@/data/landing";
import { getProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

export const revalidate = 60;

function orderShowcase(projects: Project[]): Project[] {
  return showcaseSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));
}

export default async function HomePage() {
  const projects = await getProjects();
  const showcase = orderShowcase(projects);

  return (
    <div className="landing-page font-[family-name:var(--font-family-body)] selection:bg-[#ff6b00] selection:text-[#1a0a00]">
      <HeroPremium />
      <TrustMarquee />
      <BentoGrid />
      <ExpertiseSection />
      <WhyCodeebeSection />
      <ProcessTimeline />
      <PortfolioGrid projects={showcase.length > 0 ? showcase : projects.slice(0, 6)} />
      <FaqAccordion />
      <FinalCta />
      <NeedHelpButton />
    </div>
  );
}
