import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { siteConfig } from "@/config/site";

// ─── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",           href: "/" },
  { label: "About",          href: "/about" },
  { label: "Services",       href: "/services" },
  { label: "Packages",       href: "/packages" },
  { label: "Portfolio",      href: "/portfolio" },
  { label: "FAQ",            href: "/services#faq" },
  { label: "Contact",        href: "/contact" },
  { label: "Client Portal",  href: "/portal" },
];

const SERVICE_LINKS = [
  { label: "SaaS Product Development", href: "/services" },
  { label: "AI & Automation Systems",  href: "/services" },
  { label: "Marketplace Platforms",    href: "/services" },
  { label: "WordPress & Websites",     href: "/services" },
  { label: "Cloud Infrastructure",     href: "/services" },
  { label: "Data Dashboards",          href: "/services" },
];

const TECH = [
  "Next.js", "React", "Node.js", "NestJS",
  "TypeScript", "PostgreSQL", "Redis", "Prisma",
  "AWS", "Vercel", "Docker", "Tailwind CSS",
];

// ─── SVG icons ─────────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function UpworkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

// ─── Shared sub-components ─────────────────────────────────────────────────────

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#ff6b00]/70">
        {children}
      </p>
      <div className="mt-2 h-px w-6 bg-[#ff6b00]/40" />
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  const cls =
    "group flex items-center gap-1.5 text-[13px] text-white/45 transition-all duration-150 hover:text-white/90";
  const arrow = (
    <span className="translate-x-0 opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100 text-[#ff6b00]">
      →
    </span>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a]">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#ff6b00]/[0.04] blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#ff6b00]/[0.03] blur-[100px]" aria-hidden />

      {/* ── Pre-footer CTA ── */}
      <div className="relative border-b border-white/[0.06]">
        <div className="site-container py-16 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            {/* Badge */}
            <div className="flex items-center gap-2 rounded-full border border-[#ff6b00]/20 bg-[#ff6b00]/8 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-[12px] font-medium text-green-400">Currently accepting new projects</span>
            </div>

            <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Ready to build something{" "}
              <span className="bg-gradient-to-r from-[#ff6b00] to-[#ff9a00] bg-clip-text text-transparent">
                great?
              </span>
            </h2>

            <p className="max-w-md text-[15px] leading-relaxed text-white/50">
              Describe your project in 2 minutes and get a detailed SRS, quotation, and delivery roadmap — free.
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

      {/* ── Main columns ── */}
      <div className="site-container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.3fr]">

          {/* Brand */}
          <div className="flex flex-col gap-6 lg:pl-[17px]">
            <BrandLogo size="lg" />

            <p className="max-w-[260px] text-[13px] leading-relaxed text-white/40">
              Premium product engineering studio building SaaS, AI workflows, marketplaces, and platforms — with product-first thinking and launch-ready delivery.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {[
                { label: "LinkedIn",  href: siteConfig.linkedInUrl,  Icon: LinkedInIcon  },
                { label: "WhatsApp",  href: siteConfig.whatsappUrl,  Icon: WhatsAppIcon  },
                { label: "Upwork",    href: siteConfig.upworkUrl,    Icon: UpworkIcon    },
                { label: "Instagram", href: siteConfig.instagramUrl, Icon: InstagramIcon },
                { label: "Facebook",  href: siteConfig.facebookUrl,  Icon: FacebookIcon  },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/40 transition-all hover:border-[#ff6b00]/40 hover:bg-[#ff6b00]/10 hover:text-[#ff6b00]"
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-2">
              {[
                { icon: "mail", label: siteConfig.email,       href: `mailto:${siteConfig.email}` },
                { icon: "chat", label: "Chat on WhatsApp",     href: siteConfig.whatsappUrl },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2 text-[12.5px] text-white/35 transition-colors hover:text-[#ff6b00]"
                >
                  <span className="material-symbols-outlined !text-[14px] text-white/20 transition-colors group-hover:text-[#ff6b00]">{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <ColHeading>Navigation</ColHeading>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}><FooterLink href={l.href}>{l.label}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <ColHeading>Services</ColHeading>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}><FooterLink href={l.href}>{l.label}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <ColHeading>Tech Stack</ColHeading>
            <div className="flex flex-wrap gap-1.5">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/40 transition-colors hover:border-[#ff6b00]/30 hover:text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Stats strip */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "4+",  label: "Years Experience"   },
                { value: "98%", label: "Client Satisfaction" },
                { value: "24h", label: "Avg. Response Time"  },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                  <p className="text-xl font-bold text-[#ff6b00]">{value}</p>
                  <p className="mt-0.5 text-[10px] text-white/35">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.05]">
        <div className="site-container flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-[11.5px] text-white/25">
            © {year} {siteConfig.name} · Premium Product Engineering Studio
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11.5px] text-white/25">
            <Link href="/privacy-policy" className="transition-colors hover:text-[#ff6b00]">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-[#ff6b00]">Terms & Conditions</Link>
            <Link href="/refund-policy" className="transition-colors hover:text-[#ff6b00]">Refund Policy</Link>
            <Link href="/disclaimer" className="transition-colors hover:text-[#ff6b00]">Disclaimer</Link>
            <span className="flex items-center gap-1">
              Made with
              <span className="text-[#ff6b00]">♥</span>
              in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
