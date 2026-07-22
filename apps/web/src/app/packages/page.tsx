import { PackagesHero } from "@/components/packages/PackagesHero";
import { PackageConfigurator } from "@/components/packages/PackageConfigurator";
import { PackagesCta } from "@/components/packages/PackagesCta";

export const metadata = {
  title: "Packages — Codeebe | Configure Your Project",
  description:
    "Configure consulting sites, booking, eCommerce, car rental, or management systems. Choose a plan for fixed pricing with hosting and support included.",
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
