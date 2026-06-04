import { SectionHeading } from "@/components/brand/SectionHeading";
import { EstimateForm } from "@/components/estimate/EstimateForm";

export const metadata = {
  title: "Instant Estimate — Codeebe",
  description: "Get a basic project estimate in minutes.",
};

export default function EstimatePage() {
  return (
    <div className="page-below-header mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20">
      <SectionHeading
        eyebrow="Estimate"
        title="Project requirement &"
        titleAccent="estimate"
        description="Share your needs and receive a transparent ballpark range. Final pricing follows a discovery call."
      />
      <div className="mt-10">
        <EstimateForm />
      </div>
    </div>
  );
}
