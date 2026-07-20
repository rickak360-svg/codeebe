import { Suspense } from "react";
import { PackageInquiryForm } from "@/components/packages/PackageInquiryForm";

export const metadata = {
  title: "Package Inquiry — Codeebe",
  description:
    "Share your contact details to receive your configured package estimate by email.",
};

export default function PackageInquiryPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090909] pb-24 pt-[8rem] sm:pb-28 sm:pt-[9.5rem]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,122,0,0.07), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="site-container relative">
        <Suspense
          fallback={
            <div className="mx-auto max-w-3xl animate-pulse rounded-[28px] border border-white/[0.06] bg-[#121212] p-16 text-center text-[#9CA3AF]">
              Loading…
            </div>
          }
        >
          <PackageInquiryForm />
        </Suspense>
      </div>
    </div>
  );
}
