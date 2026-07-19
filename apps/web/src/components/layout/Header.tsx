"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { useReducedMotion } from "@/components/landing/useReducedMotion";

type NavChild = { label: string; href: string; icon: string; desc: string };
type NavLink  = { label: string; href: string; children?: NavChild[] };

const navItems: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us",    href: "/about#mission", icon: "info",         desc: "Who we are & our mission"      },
      { label: "Our Process", href: "/about#process", icon: "account_tree", desc: "How we take a brief to launch" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services#capabilities", icon: "widgets", desc: "SaaS, AI, mobile & more"  },
      { label: "Tech Stack",   href: "/services#tech", icon: "memory",  desc: "Tools & frameworks we use" },
      { label: "FAQ",          href: "/services#faq",  icon: "quiz",    desc: "Common questions answered" },
    ],
  },
  {
    label: "Packages",
    href: "/packages",
    children: [
      { label: "All Packages",     href: "/packages#plans",   icon: "inventory_2", desc: "Web, e-commerce & full build" },
      { label: "Web Development", href: "/packages#plans",   icon: "language",    desc: "Business & marketing sites"   },
      { label: "E-Commerce",      href: "/packages#plans",   icon: "storefront",  desc: "Stores & checkout flows"     },
      { label: "Compare",         href: "/packages#compare", icon: "compare",     desc: "Side-by-side feature checklist" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact",   href: "/contact"   },
];

/* Same-page nav clicks (no hash) should return to the top, since the App
   Router treats a click to the current URL as a no-op and won't scroll. */
function scrollTopIfSamePath(href: string, pathname: string) {
  const [path, hashPart] = href.split("#");
  if (!hashPart && (path || "/") === pathname) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/* ── Animated hamburger ↔ X (SVG morph, GPU only) ───────────────────────── */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <motion.line
        x1="3" y1="6" x2="19" y2="6"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        animate={open ? { x1: 4, y1: 4, x2: 18, y2: 18 } : { x1: 3, y1: 6, x2: 19, y2: 6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.line
        x1="3" y1="11" x2="19" y2="11"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        style={{ transformOrigin: "11px 11px" }}
      />
      <motion.line
        x1="3" y1="16" x2="19" y2="16"
        stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
        animate={open ? { x1: 4, y1: 18, x2: 18, y2: 4 } : { x1: 3, y1: 16, x2: 19, y2: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/* ── Desktop dropdown ────────────────────────────────────────────────────── */
function NavDropdown({ item, active }: { item: NavLink; active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasChildren = Boolean(item.children?.length);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  const openMenu  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setOpen(false), 120); };
  const linkClass = `header-nav-link ${active ? "header-nav-link--active" : ""}`;

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href}
          className={linkClass}
          onClick={() => scrollTopIfSamePath(item.href, pathname)}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <Link
        href={item.href}
        className={linkClass}
        aria-expanded={open}
        onClick={() => scrollTopIfSamePath(item.href, pathname)}
      >
        <span>{item.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          className="inline-flex"
        >
          <MaterialIcon name="keyboard_arrow_down" className="header-nav-chevron !text-[14px]" />
        </motion.span>
      </Link>
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
            <div className="mx-auto mb-[-1px] flex justify-center">
              <div className="h-2 w-4 overflow-hidden">
                <div className="mx-auto h-2.5 w-2.5 rotate-45 border-l border-t border-[#ff6b00]/30 bg-[#131313]" />
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#ff6b00]/20 bg-[#0f0f0f] shadow-[0_16px_48px_-8px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,107,0,0.06)]">
              <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-2.5">
                <span className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                  <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                  <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                </span>
                <span className="font-mono text-[10px] text-white/25">~/{item.label.toLowerCase()}</span>
              </div>
              <div className="p-1.5">
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[#ff6b00]/[0.08]"
                    onClick={() => { setOpen(false); scrollTopIfSamePath(child.href, pathname); }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] transition-colors group-hover:border-[#ff6b00]/30 group-hover:bg-[#ff6b00]/10">
                      <MaterialIcon name={child.icon} className="!text-[15px] text-white/40 transition-colors group-hover:text-[#ff6b00]" />
                    </div>
                    <div className="min-w-[140px]">
                      <p className="text-[13px] font-medium text-white/80 group-hover:text-white">{child.label}</p>
                      <p className="mt-0.5 font-mono text-[10.5px] text-white/30 group-hover:text-white/45">{child.desc}</p>
                    </div>
                    <MaterialIcon name="arrow_forward" className="!text-[13px] ml-auto text-white/0 transition-all group-hover:translate-x-0.5 group-hover:text-[#ff6b00]/60" />
                  </Link>
                ))}
              </div>
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

/* ── Mobile accordion sub-items ─────────────────────────────────────────── */
function MobileAccordionItem({
  item, active, onClose,
}: {
  item: NavLink; active: boolean; onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Boolean(item.children?.length);
  const pathname = usePathname();

  return (
    <li>
      <div className="flex items-center">
        <Link
          href={item.href}
          onClick={() => { if (!hasChildren) { scrollTopIfSamePath(item.href, pathname); onClose(); } }}
          className={`flex-1 py-4 font-[family-name:var(--font-family-ethno)] text-[1.1rem] uppercase tracking-wider transition-colors duration-150 ${
            active ? "text-[#ff6b00]" : "text-white/90 hover:text-white"
          }`}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
          >
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex"
            >
              <MaterialIcon name="keyboard_arrow_down" className="!text-[20px]" />
            </motion.span>
          </button>
        )}
      </div>
      <div className="h-px bg-white/[0.06]" />
      <AnimatePresence initial={false}>
        {expanded && hasChildren && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {item.children!.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={() => { scrollTopIfSamePath(child.href, pathname); onClose(); }}
                  className="group flex items-center gap-3 py-3 pl-4 text-white/50 transition-colors hover:text-white"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.04] transition-colors group-hover:border-[#ff6b00]/30 group-hover:bg-[#ff6b00]/10">
                    <MaterialIcon name={child.icon} className="!text-[13px] transition-colors group-hover:text-[#ff6b00]" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white/75 group-hover:text-white">{child.label}</p>
                    <p className="text-[11px] text-white/30">{child.desc}</p>
                  </div>
                </Link>
              </li>
            ))}
            <li className="h-2" />
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ── Hash helper ─────────────────────────────────────────────────────────── */
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

/* ── Header ──────────────────────────────────────────────────────────────── */
export function Header() {
  const pathname = usePathname();
  const hash = useHash(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function isNavActive(item: NavLink): boolean {
    if (item.href === "/") return pathname === "/" && !hash;
    if (item.href === "/projects") return pathname === "/projects" || pathname.startsWith("/projects/");
    const cleanHref = item.href.split("#")[0];
    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
  }

  return (
    <>
      {/* Top scrim — fades page content beneath the floating header */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-36 bg-gradient-to-b from-[#0a0b0b] from-15% via-[#0a0b0b]/75 via-50% to-transparent sm:h-40 lg:h-44"
        aria-hidden
      />

      {/* ── Floating pill header ── */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] bg-transparent pt-5 sm:pt-8">
        <motion.div
          className="floating-header-wrap pointer-events-auto"
          initial={reduced ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="floating-header-shell">
            <div className="floating-header-shadow" aria-hidden />
            <div className="floating-header-pill pb-2 pt-2">
              <div className="relative flex h-14 items-center px-4 sm:h-[4.125rem] sm:px-5 lg:px-6">

                {/* Hamburger — left on mobile */}
                <button
                  type="button"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                  className="z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--header-nav-fg)] transition-colors hover:bg-white/5 hover:text-white lg:hidden"
                >
                  <MenuIcon open={mobileOpen} />
                </button>

                {/* Logo: centered on mobile, left on desktop */}
                <div className="absolute left-1/2 top-1/2 flex h-9 -translate-x-1/2 -translate-y-1/2 items-center lg:static lg:translate-x-0 lg:translate-y-0 lg:shrink-0">
                  <BrandLogo variant="header" />
                </div>

                {/* Desktop nav */}
                <nav className="hidden flex-1 items-center justify-center lg:flex" aria-label="Main">
                  <ul className="header-nav-rail">
                    {navItems.map((item) => (
                      <NavDropdown key={item.label} item={item} active={isNavActive(item)} />
                    ))}
                  </ul>
                </nav>

                {/* Desktop right */}
                <div className="hidden shrink-0 items-center gap-1.5 xl:gap-2 lg:flex">
                  <div className="flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/8 px-2 py-1.5 xl:px-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                    </span>
                    <span className="hidden text-[11px] font-medium text-green-400 xl:inline">Accepting Projects</span>
                    <span className="text-[10px] font-medium text-green-400 xl:hidden">Open</span>
                  </div>
                  <div className="mx-0.5 h-5 w-px bg-[var(--landing-border)] xl:mx-1" aria-hidden />
                  <Link
                    href="/estimate"
                    className="flex items-center gap-1 rounded-full bg-[#ff6b00] px-3 py-1.5 text-[12px] font-semibold text-[#1a0a00] transition-colors hover:bg-[#ff8533] xl:gap-1.5 xl:px-4 xl:py-2 xl:text-[13px]"
                  >
                    <MaterialIcon name="edit_note" className="!text-[14px] xl:!text-[15px]" />
                    Get a Quote
                  </Link>
                </div>

                {/* Right spacer so logo stays centered on mobile */}
                <span className="ml-auto h-10 w-10 shrink-0 lg:hidden" aria-hidden />
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* ── Mobile nav overlay — always in DOM, driven by CSS transition only ── */}
      <div
        aria-hidden={!mobileOpen}
        className={[
          "fixed inset-0 z-[45] flex flex-col bg-[#0a0b0b] lg:hidden",
          "transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          "will-change-[opacity,transform]",
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none",
        ].join(" ")}
      >
        {/* Background glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#ff6b00]/12 blur-[90px]" aria-hidden />
        <div className="pointer-events-none absolute bottom-10 right-0 h-56 w-56 rounded-full bg-[#ff6b00]/7 blur-[80px]" aria-hidden />

        {/* Dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          aria-hidden
        />

        {/* Horizontal accent line — scales in from left */}
        <div
          className="pointer-events-none absolute left-6 right-6 top-24 h-px origin-left bg-gradient-to-r from-[#ff6b00]/40 via-[#ff6b00]/15 to-transparent transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transitionDelay: mobileOpen ? "120ms" : "0ms",
            transform: mobileOpen ? "scaleX(1)" : "scaleX(0)",
            opacity: mobileOpen ? 1 : 0,
          }}
          aria-hidden
        />

        {/* Decorative rings — scale in from top-right */}
        <div
          className="pointer-events-none absolute -right-10 top-20 h-44 w-44 rounded-full border border-white/[0.06] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transitionDelay: mobileOpen ? "150ms" : "0ms",
            transform: mobileOpen ? "scale(1)" : "scale(0.4)",
            opacity: mobileOpen ? 1 : 0,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-14 h-64 w-64 rounded-full border border-[#ff6b00]/[0.08] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transitionDelay: mobileOpen ? "200ms" : "0ms",
            transform: mobileOpen ? "scale(1)" : "scale(0.5)",
            opacity: mobileOpen ? 1 : 0,
          }}
          aria-hidden
        />

        {/* Floating tech badges — stagger in from right */}
        <div className="pointer-events-none absolute right-6 top-32 flex flex-col items-end gap-2.5" aria-hidden>
          {(["React", "Node.js", "AI", "SaaS", "Cloud"] as const).map((tag, i) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-white/25 transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transitionDuration: "380ms",
                transitionDelay: mobileOpen ? `${220 + i * 55}ms` : "0ms",
                transform: mobileOpen ? "translateX(0)" : "translateX(24px)",
                opacity: mobileOpen ? 1 - i * 0.15 : 0,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Terminal card — slides up from below */}
        <div
          className="pointer-events-none absolute bottom-28 right-5 select-none transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transitionDelay: mobileOpen ? "420ms" : "0ms",
            transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
            opacity: mobileOpen ? 1 : 0,
          }}
          aria-hidden
        >
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2">
            <p className="font-mono text-[9px] leading-relaxed text-white/20">
              <span className="text-[#ff6b00]/50">$</span> ship --fast<br />
              <span className="text-[#ff6b00]/50">→</span> production ready
            </p>
          </div>
        </div>

        {/* Large faded brand tagline — fades up */}
        <div
          className="pointer-events-none absolute bottom-36 left-0 right-0 select-none overflow-hidden transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transitionDelay: mobileOpen ? "180ms" : "0ms",
            transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
            opacity: mobileOpen ? 1 : 0,
          }}
          aria-hidden
        >
          <p className="whitespace-nowrap text-center font-[family-name:var(--font-family-display)] text-[4.5rem] font-black uppercase leading-none tracking-[-0.04em] text-white opacity-[0.03]">
            BUILD.SCALE.DOMINATE
          </p>
        </div>

        {/* Scrollable content */}
        <div
          className={[
            "relative flex flex-1 flex-col overflow-y-auto px-6 pb-10 pt-28",
            "transition-[opacity,transform] duration-[350ms] delay-[60ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          ].join(" ")}
        >
          {/* Orange accent line */}
          <div
            className={[
              "absolute left-6 top-28 w-px bg-gradient-to-b from-[#ff6b00]/50 via-[#ff6b00]/20 to-transparent",
              "transition-[transform,opacity] duration-[400ms] delay-[80ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              "origin-top",
              mobileOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
            ].join(" ")}
            style={{ bottom: "2.5rem" }}
            aria-hidden
          />

          {/* Nav items */}
          <ul className="ml-5 space-y-0" role="list">
            {navItems.map((item, i) => (
              <div
                key={item.href}
                className={[
                  "transition-[opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                ].join(" ")}
                style={{
                  transitionDuration: "300ms",
                  transitionDelay: mobileOpen ? `${80 + i * 40}ms` : "0ms",
                }}
              >
                <MobileAccordionItem
                  item={item}
                  active={isNavActive(item)}
                  onClose={() => setMobileOpen(false)}
                />
              </div>
            ))}
          </ul>

          {/* Bottom CTA */}
          <div
            className={[
              "mt-auto pt-10",
              "transition-[opacity,transform] duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDelay: mobileOpen ? `${80 + navItems.length * 40}ms` : "0ms" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-xs font-medium text-green-400">Currently accepting new projects</span>
            </div>
            <Link
              href="/estimate"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ff6b00] py-4 text-[15px] font-semibold text-[#1a0a00] shadow-[0_12px_40px_-10px_rgba(255,107,0,0.5)] transition-colors hover:bg-[#ff8533]"
            >
              <MaterialIcon name="edit_note" className="!text-[18px]" />
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
