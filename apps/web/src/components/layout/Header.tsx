"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/components/landing/useReducedMotion";

type NavChild = { label: string; href: string; icon: string; desc: string };
type NavLink  = { label: string; href: string; children?: NavChild[] };

const navItems: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us",     href: "/about",          icon: "info",          desc: "Who we are & our mission"   },
      { label: "Our Process",  href: "/about#process",  icon: "account_tree",  desc: "How we take a brief to launch" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services",       icon: "widgets",       desc: "SaaS, AI, mobile & more"    },
      { label: "Tech Stack",   href: "/services#tech",  icon: "memory",        desc: "Tools & frameworks we use"   },
      { label: "FAQ",          href: "/services#faq",   icon: "quiz",          desc: "Common questions answered"   },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact",   href: "/contact"   },
];

function NavDropdown({ item, active }: { item: NavLink; active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasChildren = Boolean(item.children?.length);
  const reduced = useReducedMotion();

  const openMenu  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setOpen(false), 120); };

  const linkClass = `header-nav-link ${active ? "header-nav-link--active" : ""}`;

  if (!hasChildren) {
    return (
      <li>
        <Link href={item.href} className={linkClass}>{item.label}</Link>
      </li>
    );
  }

  return (
    <li className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <Link href={item.href} className={linkClass} aria-expanded={open}>
        <span>{item.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          className="inline-flex"
        >
          <MaterialIcon name="keyboard_arrow_down" className="header-nav-chevron !text-[18px]" />
        </motion.span>
      </Link>

      {/* invisible bridge between trigger and panel to prevent accidental close */}
      {open && <div className="absolute left-0 top-full h-3 w-full" />}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[calc(100%+12px)] z-50 -translate-x-1/2"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            {/* caret */}
            <div className="mx-auto mb-[-1px] flex justify-center">
              <div className="h-2 w-4 overflow-hidden">
                <div className="mx-auto h-2.5 w-2.5 rotate-45 border-l border-t border-[#ff6b00]/30 bg-[#131313]" />
              </div>
            </div>

            {/* panel */}
            <div className="overflow-hidden rounded-xl border border-[#ff6b00]/20 bg-[#0f0f0f] shadow-[0_16px_48px_-8px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,107,0,0.06)]">
              {/* panel header */}
              <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-2.5">
                <span className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                  <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                  <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                </span>
                <span className="font-mono text-[10px] text-white/25">
                  ~/{item.label.toLowerCase()}
                </span>
              </div>

              {/* links */}
              <div className="p-1.5">
                {item.children!.map((child, i) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[#ff6b00]/[0.08]"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] transition-colors group-hover:border-[#ff6b00]/30 group-hover:bg-[#ff6b00]/10">
                      <MaterialIcon name={child.icon} className="!text-[15px] text-white/40 transition-colors group-hover:text-[#ff6b00]" />
                    </div>
                    <div className="min-w-[140px]">
                      <p className="text-[13px] font-medium text-white/80 group-hover:text-white">
                        {child.label}
                      </p>
                      <p className="mt-0.5 font-mono text-[10.5px] text-white/30 group-hover:text-white/45">
                        {child.desc}
                      </p>
                    </div>
                    <MaterialIcon
                      name="arrow_forward"
                      className="!text-[13px] ml-auto text-white/0 transition-all group-hover:translate-x-0.5 group-hover:text-[#ff6b00]/60"
                    />
                  </Link>
                ))}
              </div>

              {/* footer hint */}
              <div className="border-t border-white/[0.04] px-4 py-2">
                <span className="font-mono text-[9.5px] text-white/20">
                  <span className="text-[#ff6b00]/40">→</span> press enter to navigate
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function useHash(pathname: string) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  return hash;
}

export function Header() {
  const pathname = usePathname();
  const hash = useHash(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();

  function isNavActive(item: NavLink): boolean {
    if (item.href === "/") return pathname === "/" && !hash;
    if (item.href === "/projects") {
      return pathname === "/projects" || pathname.startsWith("/projects/");
    }
    const cleanHref = item.href.split("#")[0];
    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent pt-5 sm:pt-8">
      <motion.div
        className="floating-header-wrap pointer-events-auto"
        initial={reduced ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="floating-header-shell ">
          <div className="floating-header-shadow" aria-hidden />
          <div className="floating-header-pill pt-2 pb-2">
            <div className="flex h-14 items-center gap-3 px-4 sm:h-[4.125rem] sm:gap-4 sm:px-5 lg:px-6">
              <div className="flex h-9 shrink-0 items-center">
                <BrandLogo variant="header" />
              </div>

              <nav
                className="hidden flex-1 items-center justify-center lg:flex"
                aria-label="Main"
              >
                <ul className="header-nav-rail">
                  {navItems.map((item) => (
                    <NavDropdown key={item.label} item={item} active={isNavActive(item)} />
                  ))}
                </ul>
              </nav>

              {/* Desktop right: WhatsApp + availability badge + CTA */}
              <div className="hidden shrink-0 items-center gap-2 lg:flex">
                {/* Availability pill */}
                <div className="flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/8 px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  <span className="text-[11.5px] font-medium text-green-400">Accepting Projects</span>
                </div>

                <div className="mx-1 h-5 w-px bg-[var(--landing-border)]" aria-hidden />

                {/* WhatsApp */}
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--landing-border)] text-[var(--header-nav-fg)] transition-colors hover:border-green-500/40 hover:bg-green-500/8 hover:text-green-400"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>

                <div className="mx-1 h-5 w-px bg-[var(--landing-border)]" aria-hidden />

                <Link
                  href="/estimate"
                  className="flex items-center gap-1.5 rounded-full bg-[#ff6b00] px-4 py-2 text-[13px] font-semibold text-[#1a0a00] transition-colors hover:bg-[#ff8533]"
                >
                  <MaterialIcon name="edit_note" className="!text-[15px]" />
                  Get a Quote
                </Link>
              </div>

              {/* Mobile right: WhatsApp + hamburger */}
              <div className="flex h-9 shrink-0 items-center justify-end gap-1.5 lg:hidden">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--landing-border)] text-[var(--header-nav-fg)] hover:border-green-500/40 hover:text-green-400"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <button
                  type="button"
                  className="header-theme-toggle flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen((v) => !v)}
                >
                  <MaterialIcon name={mobileOpen ? "close" : "menu"} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="floating-header-shell mt-2.5 lg:hidden">
            <div className="floating-header-shadow" aria-hidden />
            <div className="floating-header-pill">
              <nav className="px-4 py-3" aria-label="Mobile">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`header-mobile-link block rounded-xl px-3 py-3 text-[15px] font-medium ${
                          isNavActive(item) ? "header-mobile-link--active" : ""
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="header-mobile-sublink block rounded-lg py-2.5 pl-8 pr-3 text-sm"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </motion.div>
    </header>
  );
}
