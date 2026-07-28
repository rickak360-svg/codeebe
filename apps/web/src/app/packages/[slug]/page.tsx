import { notFound } from "next/navigation";
import { services } from "@/data/configurator";
import { PackageCategoryTemplate } from "@/components/packages/PackageCategoryTemplate";

// These industries have their own dedicated premium landing routes under
// /packages/<slug> and must not be handled by the generic template.
const PREMIUM_SLUGS = new Set(["car-rental", "gym", "clinic", "event-management"]);

export async function generateStaticParams() {
  return services.filter((s) => !PREMIUM_SLUGS.has(s.id)).map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return {};
  return {
    title: `${service.title} Packages — Codeebe`,
    description: `${service.description} Starting from ${service.startingPrice.toLocaleString("en-IN")} with hosting and support included.`,
  };
}

export default async function PackageCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-[#090909]">
      <PackageCategoryTemplate service={service} />
    </div>
  );
}
