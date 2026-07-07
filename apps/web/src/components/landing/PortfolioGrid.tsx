"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { PortfolioShowcaseCard } from "./PortfolioShowcaseCard";
import { Reveal } from "./Reveal";
import { useReducedMotion } from "./useReducedMotion";

const AUTO_INTERVAL_MS = 6000;
const SCROLL_DURATION_MS = 2600;
const MIN_SCALE = 0.78;
const MAX_SCALE = 0.98;
const MIN_OPACITY = 0.32;

function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function animateScrollLeft(
  element: HTMLElement,
  target: number,
  duration: number,
  onComplete?: () => void,
) {
  const start = element.scrollLeft;
  const change = target - start;
  if (Math.abs(change) < 1) {
    onComplete?.();
    return;
  }

  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    element.scrollLeft = start + change * easeInOutQuint(progress);
    if (progress < 1) requestAnimationFrame(step);
    else onComplete?.();
  }

  requestAnimationFrame(step);
}

function buildLoopProjects(projects: Project[]) {
  if (projects.length === 0) return [];
  if (projects.length === 1) return projects;
  return [...projects, ...projects, ...projects];
}

type ViewMode = "carousel" | "grid";

function ViewToggle({
  viewMode,
  onChange,
}: {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  const btnClass = (active: boolean) =>
    `inline-flex h-9 w-9 items-center justify-center rounded-full transition ${
      active
        ? "bg-[#ff6b00]/15 text-[#ff6b00] ring-1 ring-[#ff6b00]/30"
        : "text-white/45 hover:bg-white/[0.05] hover:text-white/75"
    }`;

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
      role="group"
      aria-label="Portfolio view"
    >
      <button
        type="button"
        aria-label="Carousel view"
        aria-pressed={viewMode === "carousel"}
        onClick={() => onChange("carousel")}
        className={btnClass(viewMode === "carousel")}
      >
        <MaterialIcon name="view_carousel" className="!text-[18px]" />
      </button>
      <button
        type="button"
        aria-label="Grid view"
        aria-pressed={viewMode === "grid"}
        onClick={() => onChange("grid")}
        className={btnClass(viewMode === "grid")}
      >
        <MaterialIcon name="grid_view" className="!text-[18px]" />
      </button>
    </div>
  );
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const visualIndexRef = useRef(0);
  const pausedRef = useRef(false);
  const animatingRef = useRef(false);
  const hasInitializedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("carousel");
  const [sidePadding, setSidePadding] = useState(20);

  const loopProjects = useMemo(() => buildLoopProjects(projects), [projects]);
  const loopOffset = projects.length > 1 ? projects.length : 0;
  const isCarousel = viewMode === "carousel";

  const getSlides = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-slide]"));
  }, []);

  const applyCardTransforms = useCallback(() => {
    const track = trackRef.current;
    const slides = getSlides();
    if (!track || slides.length === 0) return;

    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    const falloff = track.clientWidth * 0.52;

    slides.forEach((slide) => {
      const card = slide.querySelector<HTMLElement>("[data-carousel-card]");
      const glow = slide.querySelector<HTMLElement>("[data-carousel-glow]");
      if (!card) return;

      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
      const proximity = Math.max(0, 1 - distance / falloff);
      const eased = proximity * proximity * (3 - 2 * proximity);
      const scale = MIN_SCALE + eased * (MAX_SCALE - MIN_SCALE);
      const opacity = MIN_OPACITY + eased * (1 - MIN_OPACITY);

      card.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
      card.style.opacity = String(opacity);
      card.style.zIndex = eased > 0.5 ? "2" : "1";
      card.style.borderColor = `rgba(255, 107, 0, ${eased * 0.4})`;
      card.style.boxShadow =
        eased > 0.75
          ? `0 20px 50px -28px rgba(255, 107, 0, ${eased * 0.4})`
          : "none";

      if (glow) glow.style.opacity = String(eased * 0.95);
    });
  }, [getSlides]);

  const getScrollTargetForIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const slides = getSlides();
      const slide = slides[index];
      if (!track || !slide) return null;
      return slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    },
    [getSlides],
  );

  const normalizeLoopIndex = useCallback(
    (index: number) => {
      if (projects.length <= 1) return index;

      let normalized = index;
      if (normalized >= loopOffset * 2) normalized -= loopOffset;
      else if (normalized < loopOffset) normalized += loopOffset;

      if (normalized !== index) {
        const track = trackRef.current;
        const target = getScrollTargetForIndex(normalized);
        if (track && target !== null) track.scrollLeft = Math.max(0, target);
        visualIndexRef.current = normalized;
      }

      return normalized;
    },
    [getScrollTargetForIndex, loopOffset, projects.length],
  );

  const updateSidePadding = useCallback(() => {
    const track = trackRef.current;
    const slide = getSlides()[0];
    if (!track || !slide) return;
    setSidePadding(Math.max(20, (track.clientWidth - slide.offsetWidth) / 2));
  }, [getSlides]);

  const scrollToIndex = useCallback(
    (index: number, duration = SCROLL_DURATION_MS) => {
      const track = trackRef.current;
      const target = getScrollTargetForIndex(index);
      if (!track || target === null) return;

      animatingRef.current = true;
      visualIndexRef.current = index;
      track.style.scrollSnapType = "none";

      animateScrollLeft(track, Math.max(0, target), reduced ? 0 : duration, () => {
        animatingRef.current = false;
        track.style.scrollSnapType = "x mandatory";
        const normalized = normalizeLoopIndex(visualIndexRef.current);
        visualIndexRef.current = normalized;
        applyCardTransforms();
      });
    },
    [applyCardTransforms, getScrollTargetForIndex, normalizeLoopIndex, reduced],
  );

  useEffect(() => {
    if (!isCarousel) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const tick = () => {
      applyCardTransforms();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [applyCardTransforms, isCarousel]);

  useEffect(() => {
    if (!isCarousel) {
      hasInitializedRef.current = false;
      return;
    }
    if (hasInitializedRef.current || loopProjects.length === 0) return;

    const init = () => {
      updateSidePadding();
      const startIndex = loopOffset;
      visualIndexRef.current = startIndex;
      const target = getScrollTargetForIndex(startIndex);
      const track = trackRef.current;
      if (track && target !== null) track.scrollLeft = Math.max(0, target);
      applyCardTransforms();
      hasInitializedRef.current = true;
    };

    const frame = requestAnimationFrame(init);
    return () => cancelAnimationFrame(frame);
  }, [applyCardTransforms, getScrollTargetForIndex, isCarousel, loopOffset, loopProjects.length, updateSidePadding]);

  useEffect(() => {
    if (!isCarousel) return;

    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (!animatingRef.current) {
        const slides = getSlides();
        const viewportCenter = track.scrollLeft + track.clientWidth / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        slides.forEach((slide, index) => {
          const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
          const distance = Math.abs(slideCenter - viewportCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        visualIndexRef.current = closestIndex;
      }
    };

    const onResize = () => {
      updateSidePadding();
      const target = getScrollTargetForIndex(visualIndexRef.current);
      if (target !== null) track.scrollLeft = Math.max(0, target);
      applyCardTransforms();
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [applyCardTransforms, getScrollTargetForIndex, getSlides, isCarousel, updateSidePadding]);

  useEffect(() => {
    if (!isCarousel || reduced || projects.length <= 1) return;

    const timer = window.setInterval(() => {
      if (pausedRef.current || animatingRef.current) return;
      scrollToIndex(visualIndexRef.current + 1);
    }, AUTO_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isCarousel, projects.length, reduced, scrollToIndex]);

  const scrollByCard = (direction: "prev" | "next") => {
    const delta = direction === "next" ? 1 : -1;
    scrollToIndex(visualIndexRef.current + delta);
  };

  const canLoop = projects.length > 1;

  return (
    <section id="portfolio" className="landing-section-gap relative z-10 isolate scroll-mt-28">
      <div className="site-container">
        <Reveal className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff6b00]">Case studies</p>
            <h2 className="landing-title mt-3 font-[family-name:var(--font-family-display)] text-3xl font-bold sm:text-4xl">
              Products we&apos;ve engineered
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start sm:gap-4 md:self-auto">
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />

            {isCarousel && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous projects"
                  disabled={!canLoop}
                  onClick={() => scrollByCard("prev")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-[#ff6b00]/40 hover:text-[#ff6b00] disabled:pointer-events-none disabled:opacity-30"
                >
                  <MaterialIcon name="arrow_back" className="!text-[18px]" />
                </button>
                <button
                  type="button"
                  aria-label="Next projects"
                  disabled={!canLoop}
                  onClick={() => scrollByCard("next")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-[#ff6b00]/40 hover:text-[#ff6b00] disabled:pointer-events-none disabled:opacity-30"
                >
                  <MaterialIcon name="arrow_forward" className="!text-[18px]" />
                </button>
              </div>
            )}

            <Link
              href="/portfolio"
              className="landing-link hidden items-center gap-2 font-mono text-sm sm:inline-flex"
            >
              View all
              <MaterialIcon name="north_east" className="text-base" />
            </Link>
          </div>
        </Reveal>
      </div>

      {isCarousel ? (
        <div
          className="site-container relative min-w-0 overflow-hidden py-2 sm:py-4"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onFocusCapture={() => {
            pausedRef.current = true;
          }}
          onBlurCapture={() => {
            pausedRef.current = false;
          }}
        >
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory items-center gap-4 overflow-x-auto pb-2 sm:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              paddingLeft: sidePadding,
              paddingRight: sidePadding,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {loopProjects.map((project, index) => {
              const copyIndex = Math.floor(index / Math.max(projects.length, 1));

              return (
                <div
                  key={`${project.slug}-${copyIndex}-${index}`}
                  data-carousel-slide
                  className="flex w-[min(100%,34rem)] max-w-full shrink-0 snap-center items-center justify-center sm:w-[min(100%,38rem)] lg:w-[min(100%,44rem)]"
                >
                  <PortfolioShowcaseCard
                    project={project}
                    priority={copyIndex === 1 && index - loopOffset < 2}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="site-container py-2">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {projects.map((project, index) => (
              <PortfolioShowcaseCard
                key={project.slug}
                project={project}
                priority={index < 3}
                variant="grid"
              />
            ))}
          </div>
        </div>
      )}

      <div className="site-container mt-6 sm:hidden">
        <Link href="/portfolio" className="landing-link inline-flex items-center gap-2 font-mono text-sm">
          View all
          <MaterialIcon name="north_east" className="text-base" />
        </Link>
      </div>
    </section>
  );
}
