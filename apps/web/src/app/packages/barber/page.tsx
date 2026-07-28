import { IndustryPage } from "@/components/industry/IndustryPage";
import { barberConfig } from "@/data/industries/barber";

export const metadata = {
  title: barberConfig.meta.title,
  description: barberConfig.meta.description,
  openGraph: { title: barberConfig.meta.title, description: barberConfig.meta.description },
};

export default function BarberServicePage() {
  return <IndustryPage config={barberConfig} />;
}
