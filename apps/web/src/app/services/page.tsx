import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ServicesTechStack } from "@/components/services/ServicesTechStack";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesCta } from "@/components/services/ServicesCta";

export const metadata = {
  title: "Services — Codeebe | Product Engineering Studio",
  description:
    "End-to-end product engineering — SaaS, AI workflows, e-commerce, mobile apps, WordPress, and custom full-stack development.",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#0a0a0a]">
      <ServicesHero />
      <ServicesGrid />
      <ServicesTechStack />
      <ServicesProcess />
      <ServicesFaq />
      <ServicesCta />
    </main>
  );
}
