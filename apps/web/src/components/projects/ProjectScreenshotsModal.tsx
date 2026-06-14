"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { useReducedMotion } from "@/components/landing/useReducedMotion";

type Props = {
  open: boolean;
  onClose: () => void;
  projectName: string;
  screenshots: string[];
};

export function ProjectScreenshotsModal({
  open,
  onClose,
  projectName,
  screenshots,
}: Props) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || screenshots.length === 0) return current;
      return (current - 1 + screenshots.length) % screenshots.length;
    });
  }, [screenshots.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || screenshots.length === 0) return current;
      return (current + 1) % screenshots.length;
    });
  }, [screenshots.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setActiveIndex(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (activeIndex !== null) {
          closeLightbox();
        } else {
          onClose();
        }
        return;
      }

      if (activeIndex === null) return;

      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, activeIndex, closeLightbox, onClose, showNext, showPrevious]);

  const activeSrc = activeIndex !== null ? screenshots[activeIndex] : null;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close gallery"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-screenshots-title"
            className="glass-card relative z-10 flex max-h-[min(90vh,820px)] w-[min(calc(100vw-2rem),48rem)] shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--landing-border)]"
            initial={reduced ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--landing-border-subtle)] px-5 py-4 sm:px-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#ff6b00]">
                  Project screenshots
                </p>
                <h2
                  id="project-screenshots-title"
                  className="landing-title mt-1 text-lg font-bold sm:text-xl"
                >
                  {projectName}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--landing-border)] text-[var(--landing-muted)] transition hover:border-[#ff6b00]/40 hover:text-[#ff6b00]"
                aria-label="Close"
              >
                <MaterialIcon name="close" className="text-xl" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              {screenshots.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {screenshots.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="group relative overflow-hidden rounded-xl border border-[var(--landing-border-subtle)] bg-black/20 text-left transition hover:border-[#ff6b00]/40 hover:shadow-[0_12px_32px_rgba(255,107,0,0.12)]"
                      aria-label={`Open screenshot ${index + 1} of ${screenshots.length}`}
                    >
                      <Image
                        src={src}
                        alt={`${projectName} screenshot ${index + 1}`}
                        width={1200}
                        height={750}
                        className="h-auto w-full object-contain transition duration-300 group-hover:scale-[1.01]"
                      />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-white opacity-0 transition group-hover:opacity-100">
                        <MaterialIcon name="zoom_in" className="text-sm text-[#ff6b00]" />
                        View full size
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--landing-border-subtle)] px-6 py-14 text-center">
                  <MaterialIcon name="photo_library" className="text-4xl text-[#ff6b00]/70" />
                  <p className="landing-title mt-4 font-semibold">Screenshots coming soon</p>
                  <p className="landing-muted mt-2 max-w-sm text-sm leading-relaxed opacity-70">
                    We&apos;re preparing project visuals for this case study. Check back shortly.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {activeSrc && activeIndex !== null && (
              <motion.div
                className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                onClick={closeLightbox}
              >
                <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${projectName} screenshot ${activeIndex + 1}`}
                  className="relative z-10 flex h-[min(96vh,980px)] w-[min(calc(100vw-1.5rem),90rem)] shrink-0 flex-col"
                  initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="mb-2 flex items-center justify-between gap-4 px-2 sm:px-3">
                    <p className="font-mono text-xs uppercase tracking-wider text-white/70">
                      {activeIndex + 1} / {screenshots.length}
                    </p>
                    <button
                      type="button"
                      onClick={closeLightbox}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:border-[#ff6b00]/50 hover:text-[#ff6b00]"
                      aria-label="Close full size view"
                    >
                      <MaterialIcon name="close" className="text-xl" />
                    </button>
                  </div>

                  <div className="relative flex min-h-0 flex-1 items-center justify-center px-10 sm:px-14">
                    {screenshots.length > 1 && (
                      <button
                        type="button"
                        onClick={showPrevious}
                        className="absolute left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:border-[#ff6b00]/50 hover:text-[#ff6b00] sm:h-12 sm:w-12"
                        aria-label="Previous screenshot"
                      >
                        <MaterialIcon name="chevron_left" className="text-2xl" />
                      </button>
                    )}

                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                      <Image
                        src={activeSrc}
                        alt={`${projectName} screenshot ${activeIndex + 1}`}
                        width={1920}
                        height={1080}
                        className="h-auto max-h-[calc(96vh-4.5rem)] w-full max-w-full object-contain"
                        priority
                        sizes="(max-width: 768px) 95vw, 1400px"
                      />
                    </div>

                    {screenshots.length > 1 && (
                      <button
                        type="button"
                        onClick={showNext}
                        className="absolute right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:border-[#ff6b00]/50 hover:text-[#ff6b00] sm:h-12 sm:w-12"
                        aria-label="Next screenshot"
                      >
                        <MaterialIcon name="chevron_right" className="text-2xl" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
