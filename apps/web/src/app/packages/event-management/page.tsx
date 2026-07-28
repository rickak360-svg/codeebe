import { IndustryPage } from "@/components/industry/IndustryPage";
import { eventConfig } from "@/data/industries/event";

export const metadata = {
  title: eventConfig.meta.title,
  description: eventConfig.meta.description,
  openGraph: { title: eventConfig.meta.title, description: eventConfig.meta.description },
};

export default function EventServicePage() {
  return <IndustryPage config={eventConfig} />;
}
