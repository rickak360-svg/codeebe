import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { siteConfig } from "@/config/site";

const footerLinkClass =
  "font-mono text-xs uppercase tracking-wider text-[var(--muted)] opacity-80 transition-colors hover:text-[#ff6b00]";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="site-container flex flex-col items-center justify-between gap-8 py-6 md:flex-row">
        <BrandLogo size="lg" />
        <div className="flex flex-wrap justify-center gap-8">
          <Link href="/contact" className={footerLinkClass}>
            Contact
          </Link>
          <Link href="/projects" className={footerLinkClass}>
            Projects
          </Link>
          <Link href="/estimate" className={footerLinkClass}>
            Estimate
          </Link>
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            Book a call
          </a>
        </div>
        <p className="text-center font-mono text-xs text-[var(--muted)] opacity-60 md:text-right">
          © {new Date().getFullYear()} {siteConfig.name} Product Engineering. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
