import { PackagesHero } from "@/components/packages/PackagesHero";
import { PackagesGrid } from "@/components/packages/PackagesGrid";
import { PackagesCompare } from "@/components/packages/PackagesCompare";
import { PackagesCta } from "@/components/packages/PackagesCta";

export const metadata = {
  title: "Packages — Codeebe | Web, E-Commerce & Full Build",
  description:
    "Compare Codeebe packages for web development, e-commerce stores, and full product engineering. Clear starting prices and timelines.",
};

export default function PackagesPage() {
  return (
    <main className="bg-[#0a0a0a]">
      <PackagesHero />
      <PackagesGrid />
      <PackagesCompare />
      <PackagesCta />
    </main>
  );
}
