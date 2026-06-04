"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { useReducedMotion } from "@/components/landing/useReducedMotion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navItems: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/#about",
    children: [
      { label: "Why Codeebe", href: "/#about" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    label: "Services",
    href: "/#expertise",
    children: [
      { label: "Expertise", href: "/#expertise" },
      { label: "Process", href: "/#process" },
    ],
  },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Case Study", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

function NavDropdown({ item, active }: { item: NavLink; active: boolean }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  const linkClass = `header-nav-link ${active ? "header-nav-link--active" : ""}`;

  if (!hasChildren) {
    return (
      <li>
        <Link href={item.href} className={linkClass}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={item.href} className={linkClass} aria-expanded={open}>
        <span>{item.label}</span>
        <MaterialIcon
          name="keyboard_arrow_down"
          className={`header-nav-chevron !text-[18px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Link>
      {open && (
        <div className="header-nav-dropdown absolute left-1/2 top-[calc(100%+10px)] z-50 min-w-[220px] -translate-x-1/2 overflow-hidden rounded-2xl py-2 shadow-2xl">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="header-nav-dropdown-link block px-4 py-2.5 text-[13px] font-medium transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
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
    if (item.href === "/#portfolio") {
      return pathname === "/" && hash === "#portfolio";
    }
    if (item.href === "/projects") {
      return pathname === "/projects" || pathname.startsWith("/projects/");
    }
    if (item.href.startsWith("/#")) {
      return pathname === "/" && hash === item.href.replace("/", "");
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
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

              <div className="flex h-9 shrink-0 items-center justify-end gap-2">
                <ThemeToggle className="hidden lg:inline-flex" />
                <Link
                  href="/contact"
                  className="header-ghost-btn hidden h-9 items-center rounded-full px-4 text-sm font-medium transition-colors sm:inline-flex"
                >
                  Log in
                </Link>
                <Link
                  href="/estimate"
                  className="hidden h-9 items-center rounded-full bg-[#ff6b00] px-5 text-sm font-semibold text-[#1a0a00] transition-colors hover:bg-[#ff8533] sm:inline-flex"
                >
                  Try it free
                </Link>
                <ThemeToggle className="lg:hidden" />
                <button
                  type="button"
                  className="header-theme-toggle flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden"
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
                <div className="mb-3 flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <span className="text-sm font-medium text-[#8a756c]">Appearance</span>
                  <ThemeToggle />
                </div>
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
                <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.08] pt-3">
                  <Link
                    href="/contact"
                    className="rounded-full border border-white/15 py-2.5 text-center text-sm font-medium text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/estimate"
                    className="rounded-full bg-[#ff6b00] py-2.5 text-center text-sm font-semibold text-[#1a0a00]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Try it free
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </motion.div>
    </header>
  );
}
