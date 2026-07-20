import { PackagesHero } from "@/components/packages/PackagesHero";
import { PackageConfigurator } from "@/components/packages/PackageConfigurator";
import { PackagesCta } from "@/components/packages/PackagesCta";

export const metadata = {
  title: "Packages — Codeebe | Configure Your Project",
  description:
    "Configure your web, e-commerce, SaaS, AI, mobile, or cloud project. Choose your service, project type, and package for an instant estimate.",
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[#090909]">
      <PackagesHero />
      <PackageConfigurator />
      <PackagesCta />
    </div>
  );
}
