import { PackagesHub } from "@/components/packages/PackagesHub";

export const metadata = {
  title: "Packages — Codeebe | Fixed-Price Project Packages",
  description:
    "Explore our fixed-price packages for consulting sites, eCommerce, car rental, gym, clinic, event management and more. Hosting and support included.",
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[#090909]">
      <PackagesHub />
    </div>
  );
}
