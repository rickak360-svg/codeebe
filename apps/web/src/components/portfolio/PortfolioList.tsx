"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { MaterialIcon } from "@/components/home/MaterialIcon";

const ALL = "All";

function DesktopCategoryFilter({
  categories,
  active,
  onChange,
  projectCount,
  countsByCategory,
}: {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  projectCount: number;
  countsByCategory: Record<string, number>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const visibleCount =
    active === ALL ? projectCount : countsByCategory[active] ?? 0;

  const updateScrollState = () => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 4);
    setCanScrollRight(track.scrollLeft < maxScroll - 4);
  };

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);

    return () => observer.disconnect();
  }, [categories]);

  const scrollByAmount = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const amount = Math.max(220, track.clientWidth * 0.55);
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const scrollActiveIntoView = (category: string) => {
    const track = trackRef.current;
    if (!track) return;

    const index = categories.indexOf(category);
    const tab = track.children[index] as HTMLElement | undefined;
    if (!tab) return;

    const target =
      tab.offsetLeft - (track.clientWidth - tab.offsetWidth) / 2;

    track.scrollTo({
      left: Math.max(0, target),
      behavior: "smooth",
    });
  };

  const handleCategorySelect = (category: string) => {
    if (dragRef.current.moved) return;
    onChange(category);
    scrollActiveIntoView(category);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    event.preventDefault();
    track.scrollLeft += event.deltaY;
    updateScrollState();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || event.button !== 0) return;

    dragRef.current = {
      active: true,
      startX: event.pageX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const track = trackRef.current;
      const drag = dragRef.current;
      if (!track || !drag.active) return;

      const delta = event.pageX - drag.startX;
      if (Math.abs(delta) > 4) drag.moved = true;

      track.scrollLeft = drag.startScrollLeft - delta;
      updateScrollState();
    };

    const handleMouseUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      setIsDragging(false);
      window.setTimeout(() => {
        dragRef.current.moved = false;
      }, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="mb-8 hidden md:block">
      <div className="flex items-end justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff6b00]/10 ring-1 ring-[#ff6b00]/20">
            <MaterialIcon name="category" className="!text-[18px] text-[#ff6b00]" />
          </div>
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff6b00]/70">
              Categories
            </p>
            <p className="text-sm font-medium text-white/75">Browse by project type</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="font-mono text-[11px] text-white/35">
            Showing{" "}
            <span className="text-[#ff6b00]/80">{visibleCount}</span>
            {" "}of {projectCount}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Scroll categories left"
              disabled={!canScrollLeft}
              onClick={() => scrollByAmount("left")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-[#ff6b00]/40 hover:text-[#ff6b00] disabled:pointer-events-none disabled:opacity-30"
            >
              <MaterialIcon name="chevron_left" className="!text-[20px]" />
            </button>
            <button
              type="button"
              aria-label="Scroll categories right"
              disabled={!canScrollRight}
              onClick={() => scrollByAmount("right")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-[#ff6b00]/40 hover:text-[#ff6b00] disabled:pointer-events-none disabled:opacity-30"
            >
              <MaterialIcon name="chevron_right" className="!text-[20px]" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0a0a0a] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0a0a0a] to-transparent"
          aria-hidden
        />

        <div
          ref={trackRef}
          role="tablist"
          aria-label="Project categories"
          onScroll={updateScrollState}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          className={[
            "flex gap-2 overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          ].join(" ")}
        >
          {categories.map((cat) => {
            const selected = active === cat;
            const count = countsByCategory[cat] ?? 0;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => handleCategorySelect(cat)}
                className="relative shrink-0 rounded-xl px-4 py-2.5 transition-colors hover:text-white"
              >
                {selected ? (
                  <motion.span
                    layoutId="portfolio-category-active"
                    className="absolute inset-0 rounded-xl bg-[#ff6b00] shadow-[0_8px_24px_-10px_rgba(255,107,0,0.65)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span
                  className={[
                    "relative flex items-center gap-2.5",
                    selected ? "text-[#1a0a00]" : "text-white/55",
                  ].join(" ")}
                >
                  <span className="whitespace-nowrap text-[13px] font-medium">{cat}</span>
                  <span
                    className={[
                      "rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                      selected
                        ? "bg-black/10 text-[#1a0a00]/70"
                        : "bg-white/[0.04] text-white/35",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/25">
          Drag or use arrows to browse categories
        </p>
      </div>
    </div>
  );
}

function MobileCategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative mb-6 md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-left transition hover:border-white/[0.14] hover:bg-white/[0.05]"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff6b00]/10 ring-1 ring-[#ff6b00]/20">
            <MaterialIcon name="tune" className="!text-[18px] text-[#ff6b00]" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Filter by category
            </p>
            <p className="truncate text-sm font-medium text-white">{active}</p>
          </div>
        </div>
        <MaterialIcon
          name={open ? "expand_less" : "expand_more"}
          className="!text-[22px] shrink-0 text-white/45"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <button
              type="button"
              aria-label="Close category filter"
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[1px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              role="listbox"
              aria-label="Project categories"
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 max-h-[min(20rem,60vh)] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#101010] p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]"
            >
              {categories.map((cat) => {
                const selected = active === cat;

                return (
                  <button
                    key={cat}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(cat);
                      setOpen(false);
                    }}
                    className={[
                      "flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition",
                      selected
                        ? "bg-[#ff6b00]/12 text-white"
                        : "text-white/65 hover:bg-white/[0.04] hover:text-white",
                    ].join(" ")}
                  >
                    <span className="truncate">{cat}</span>
                    {selected ? (
                      <MaterialIcon name="check" className="!text-[18px] shrink-0 text-[#ff6b00]" />
                    ) : null}
                  </button>
                );
              })}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function PortfolioList({ projects }: { projects: Project[] }) {
  const categories = [ALL, ...Array.from(new Set(projects.map((p) => p.category))).sort()];
  const [active, setActive] = useState(ALL);

  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = { [ALL]: projects.length };
    for (const project of projects) {
      counts[project.category] = (counts[project.category] ?? 0) + 1;
    }
    return counts;
  }, [projects]);

  const filtered = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="pt-[9rem] pb-16 sm:pt-[10rem]">
      <div className="site-container">

        {/* ── page heading (centered) ──────────────────────────── */}
        <div className="mb-8 border-b border-white/[0.06] pb-8 text-center">
          {/* eyebrow */}
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#ff6b00]/30" />
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#ff6b00]/70">
              Case Studies
            </p>
            <span className="h-px w-8 bg-[#ff6b00]/30" />
          </div>

          {/* title */}
          <h1 className="font-[family-name:var(--font-family-display)] text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Products we&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#ff6b00] to-[#ff9a00] bg-clip-text text-transparent">
              engineered
            </span>
          </h1>

          {/* description */}
          <p className="mx-auto mt-3 max-w-lg text-[13.5px] leading-relaxed text-white/40">
            From zero-to-one MVPs to full-scale production rewrites —
            every project ships with a detailed case study.
          </p>

          {/* meta chips */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5">
              <MaterialIcon name="folder_open" className="!text-[13px] text-[#ff6b00]/60" />
              <span className="font-mono text-[11px] text-white/45">{projects.length} projects</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5">
              <MaterialIcon name="category" className="!text-[13px] text-[#ff6b00]/60" />
              <span className="font-mono text-[11px] text-white/45">{categories.length - 1} categories</span>
            </div>
          </div>
        </div>

        <MobileCategoryFilter
          categories={categories}
          active={active}
          onChange={setActive}
        />
        <DesktopCategoryFilter
          categories={categories}
          active={active}
          onChange={setActive}
          projectCount={projects.length}
          countsByCategory={countsByCategory}
        />

        {/* ── grid ────────────────────────────────────────────── */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <MaterialIcon name="folder_open" className="!text-4xl text-white/20" />
            <p className="text-[14px] text-white/30">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
