import { IndustryPage } from "@/components/industry/IndustryPage";
import { gymConfig } from "@/data/industries/gym";

export const metadata = {
  title: gymConfig.meta.title,
  description: gymConfig.meta.description,
  openGraph: { title: gymConfig.meta.title, description: gymConfig.meta.description },
};

export default function GymServicePage() {
  return <IndustryPage config={gymConfig} />;
}
