import { CarRentalHero } from "@/components/car-rental/CarRentalHero";
import { TrustedBy, WhyChoose } from "@/components/car-rental/TrustedAndStats";
import { ProblemsSolved, PlatformFeatures } from "@/components/car-rental/ProblemsAndFeatures";
import { ProductShowcase, ProcessTimeline } from "@/components/car-rental/ShowcaseAndProcess";
import { CostEstimator } from "@/components/car-rental/CostEstimator";
import { PricingPlans, Testimonials, CarRentalFaq } from "@/components/car-rental/PricingTestimonialsFaq";
import { ConsultationForm, CarRentalSubNav } from "@/components/car-rental/ConsultationAndNav";

export const metadata = {
  title: "Car Rental Platform Development — Codeebe | Enterprise Booking Systems",
  description:
    "Codeebe builds scalable, enterprise-grade car rental platforms with online booking, fleet management, customer portals, analytics, payment gateways, AI automation, and custom admin dashboards. Get an instant AI cost estimate.",
  openGraph: {
    title: "Car Rental Platform Development — Codeebe",
    description:
      "Enterprise-grade car rental platforms with booking, fleet management, AI automation and analytics. Get an instant AI estimate.",
  },
};

export default function CarRentalServicePage() {
  return (
    <main className="relative overflow-x-clip" style={{ background: "#070707" }}>
      <CarRentalHero />
      <CarRentalSubNav />
      <TrustedBy />
      <ProblemsSolved />
      <PlatformFeatures />
      <ProductShowcase />
      <ProcessTimeline />
      <CostEstimator />
      <PricingPlans />
      <WhyChoose />
      <Testimonials />
      <CarRentalFaq />
      <ConsultationForm />
    </main>
  );
}
