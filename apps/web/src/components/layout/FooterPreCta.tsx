"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

/** Hides the competing “Ready to build” CTA on focused conversion pages. */
export function FooterPreCta() {
  const pathname = usePathname();
  if (pathname?.startsWith("/packages/inquiry")) return null;

  return (
    <div className="relative border-b border-white/[0.06]">
      <div className="site-container py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2 rounded-full border border-[#ff6b00]/20 bg-[#ff6b00]/8 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-[12px] font-medium text-green-400">
              Currently accepting new projects
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Ready to build something{" "}
            <span className="bg-gradient-to-r from-[#ff6b00] to-[#ff9a00] bg-clip-text text-transparent">
              great?
            </span>
          </h2>

          <p className="max-w-md text-[15px] leading-relaxed text-white/50">
            Describe your project in 2 minutes and get a detailed SRS, quotation, and delivery
            roadmap — free.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/estimate"
              className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-6 py-3 text-sm font-semibold text-[#1a0a00] shadow-[0_8px_28px_-8px_rgba(255,107,0,0.55)] transition-all hover:bg-[#ff8533] hover:shadow-[0_10px_32px_-8px_rgba(255,107,0,0.65)]"
            >
              <span className="material-symbols-outlined !text-[16px]">rocket_launch</span>
              Start a Project Brief
            </Link>
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white"
            >
              <span className="material-symbols-outlined !text-[16px]">calendar_today</span>
              Book a Free Discovery Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
