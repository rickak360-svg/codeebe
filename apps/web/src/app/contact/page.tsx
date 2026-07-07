import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata = {
  title: "Contact — Codeebe",
  description: "Get in touch with Codeebe. Let's build something extraordinary together.",
};

export default function ContactPage() {
  return (
    <div className="relative page-below-header overflow-x-hidden pb-12 sm:pb-20">

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#ff6b00]/[0.04] blur-[150px]" />
        <div className="absolute -left-40 bottom-40 h-[400px] w-[400px] rounded-full bg-[#ff6b00]/[0.03] blur-[120px]" />
      </div>

      <div className="site-container relative min-w-0 pt-4 sm:pt-8">

        {/* Hero heading */}
        <div className="mb-8 max-w-2xl sm:mb-12">
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff6b00]/10 ring-1 ring-[#ff6b00]/20">
              <span className="material-symbols-outlined !text-[16px] text-[#ff6b00]">chat_bubble</span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6b00] sm:text-sm">Contact</span>
          </div>
          <h1 className="font-[family-name:var(--font-family-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-[#ff6b00] via-[#ff9a00] to-[#ffcc00] bg-clip-text text-transparent">talk</span>
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-white/50 sm:mt-3 sm:text-base">
            Have a project in mind? Fill out the form or reach out through any channel below.
          </p>
        </div>

        {/* Main grid: Form left, Cards right */}
        <div className="grid min-w-0 items-stretch gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">

          {/* Left: Form card */}
          <div className="min-w-0 rounded-2xl border border-[#ff6b00]/15 bg-white/[0.02] p-4 shadow-[0_0_40px_-12px_rgba(255,107,0,0.12)] backdrop-blur-sm sm:p-6 lg:p-8">
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b00]/20 to-[#ff6b00]/5 ring-1 ring-[#ff6b00]/20">
                <span className="material-symbols-outlined !text-[18px] text-[#ff6b00]">edit_square</span>
              </div>
              <h2 className="text-base font-semibold text-white sm:text-lg">Send a message</h2>
            </div>
            <ContactForm />
          </div>

          {/* Right: Contact cards grid */}
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

            {/* Email */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#ff6b00]/25 hover:bg-[#ff6b00]/[0.03] sm:p-5"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#ff6b00]/[0.06] blur-[25px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/[0.06] transition-all duration-300 group-hover:border-[#ff6b00]/40 group-hover:shadow-[0_0_16px_-4px_rgba(255,107,0,0.4)]">
                <span className="material-symbols-outlined !text-[22px] text-[#ff6b00]">mail</span>
              </div>
              <h3 className="font-semibold text-white">Email</h3>
              <p className="mt-1.5 text-[13px] text-[#ff6b00] transition-colors group-hover:underline">{siteConfig.email}</p>
            </a>

            {/* Book a meeting */}
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#ff6b00]/25 hover:bg-[#ff6b00]/[0.03] sm:p-5"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#ff6b00]/[0.06] blur-[25px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/[0.06] transition-all duration-300 group-hover:border-[#ff6b00]/40 group-hover:shadow-[0_0_16px_-4px_rgba(255,107,0,0.4)]">
                <span className="material-symbols-outlined !text-[22px] text-[#ff6b00]">calendar_month</span>
              </div>
              <h3 className="font-semibold text-white">Book a meeting</h3>
              <p className="mt-1.5 text-[13px] text-white/45">Schedule a discovery call on Calendly.</p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-lg border border-[#ff6b00]/30 bg-[#ff6b00]/[0.08] px-3 py-1.5 text-[12px] font-semibold text-[#ff6b00] transition-all duration-200 group-hover:bg-[#ff6b00]/15">
                Open Calendly
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#ff6b00]/25 hover:bg-[#ff6b00]/[0.03] sm:p-5"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#ff6b00]/[0.06] blur-[25px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/[0.06] transition-all duration-300 group-hover:border-[#ff6b00]/40 group-hover:shadow-[0_0_16px_-4px_rgba(255,107,0,0.4)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#ff6b00]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">WhatsApp</h3>
              <p className="mt-1.5 text-[13px] text-white/45">Chat with us on WhatsApp for quick project questions.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-[#ff6b00]">
                Open WhatsApp &rarr;
              </span>
            </a>

            {/* Live Chat */}
            <a
              href="#"
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#ff6b00]/25 hover:bg-[#ff6b00]/[0.03] sm:p-5"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#ff6b00]/[0.06] blur-[25px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/[0.06] transition-all duration-300 group-hover:border-[#ff6b00]/40 group-hover:shadow-[0_0_16px_-4px_rgba(255,107,0,0.4)]">
                <span className="material-symbols-outlined !text-[22px] text-[#ff6b00]">support_agent</span>
              </div>
              <h3 className="font-semibold text-white">Live Chat</h3>
              <p className="mt-1.5 text-[13px] text-white/45">Live Chat with Support</p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-lg border border-[#ff6b00]/30 bg-[#ff6b00]/[0.08] px-3 py-1.5 text-[12px] font-semibold text-[#ff6b00] transition-all duration-200 group-hover:bg-[#ff6b00]/15">
                Open Live Chat
              </span>
            </a>

            {/* Phone - spans full width below the 2x2 grid */}
            <a
              href={`tel:${siteConfig.phone?.replace(/\\s/g, "")}`}
              className="group relative col-span-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#ff6b00]/25 hover:bg-[#ff6b00]/[0.03] sm:col-span-2 sm:p-5"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#ff6b00]/[0.06] blur-[25px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/[0.06] transition-all duration-300 group-hover:border-[#ff6b00]/40 group-hover:shadow-[0_0_16px_-4px_rgba(255,107,0,0.4)]">
                  <span className="material-symbols-outlined !text-[22px] text-[#ff6b00]">call</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <p className="mt-0.5 text-[14px] font-medium text-[#ff6b00]">{siteConfig.phone}</p>
                  <p className="mt-0.5 text-[12px] text-white/35">Mon – Sat, 10 AM – 7 PM IST</p>
                </div>
              </div>
            </a>

          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 sm:mt-14 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 sm:px-6 sm:py-5 lg:gap-10">
          {[
            { icon: "verified", label: "50+ Projects Delivered" },
            { icon: "star", label: "98% Client Satisfaction" },
            { icon: "schedule", label: "On-time Delivery" },
            { icon: "support_agent", label: "Dedicated Support" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="material-symbols-outlined !text-[16px] text-[#ff6b00] sm:!text-[18px]">{icon}</span>
              <span className="text-[11px] font-medium leading-snug text-white/50 sm:text-[13px]">{label}</span>
            </div>
          ))}
        </div>

        {/* FAQ shortcut */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/40">
            Have questions?{" "}
            <Link href="/services#faq" className="font-medium text-[#ff6b00] hover:underline">
              Check our FAQ
            </Link>{" "}
            or reach out directly.
          </p>
        </div>
      </div>
    </div>
  );
}
