import { AboutHero } from "@/components/about/AboutHero";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutProcess } from "@/components/about/AboutProcess";
import { AboutCta } from "@/components/about/AboutCta";

export const metadata = {
  title: "About Codeebe — Premium Product Engineering Studio",
  description:
    "Learn who we are, how we work, and why founders choose Codeebe to build their products.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0a]">
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutValues />
      <AboutProcess />
      <AboutCta />
    </main>
  );
}
