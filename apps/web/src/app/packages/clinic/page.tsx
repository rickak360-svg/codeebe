import { IndustryPage } from "@/components/industry/IndustryPage";
import { clinicConfig } from "@/data/industries/clinic";

export const metadata = {
  title: clinicConfig.meta.title,
  description: clinicConfig.meta.description,
  openGraph: { title: clinicConfig.meta.title, description: clinicConfig.meta.description },
};

export default function ClinicServicePage() {
  return <IndustryPage config={clinicConfig} />;
}
