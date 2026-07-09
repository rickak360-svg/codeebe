"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";

type Props = {
  images: string[];
  name: string;
};

const AUTOPLAY_MS = 4500;

function labelFromSrc(src: string): string {
  const file = src.split("/").pop() ?? "";
  return file
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^\d+[-_]?/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function ProjectGallery({ images, name }: Props) {
  // Drop images that fail to load so the carousel never shows a broken slide.
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const valid = useMemo(() => images.filter((src) => !broken[src]), [images, broken]);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const count = valid.length;

  const goTo = useCallback(
    (next: number, dir: number) => {
      if (count === 0) return;
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  // Keep index in range when images get filtered out.
  useEffect(() => {
    if (index > count - 1) setIndex(Math.max(0, count - 1));
  }, [count, index]);

  // Autoplay.
  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, count]);

  // Keep the active thumbnail in view (horizontal strip only — never scroll the page).
  useEffect(() => {
    const track = thumbsRef.current;
    if (!track) return;
    const active = track.children[index] as HTMLElement | undefined;
    if (!active) return;

    const targetLeft =
      active.offsetLeft - track.clientWidth / 2 + active.clientWidth / 2;
    track.scrollTo({
      left: Math.max(0, Math.min(targetLeft, track.scrollWidth - track.clientWidth)),
      behavior: "smooth",
    });
  }, [index]);

  if (count === 0) return null;

  const current = valid[index];

  return (
    <div
      className="not-prose"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* main stage (vintage frame) */}
      <div className="group relative h-[clamp(420px,74vh,780px)] w-full overflow-hidden rounded-2xl border-[3px] border-[#d9c4a3]/25 bg-[#0d0d0d] p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] ring-1 ring-black/40">
        {/* inner framed area */}
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#e9d9bd]/15">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={current}
              src={current}
              alt={`${name} — ${labelFromSrc(current)}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onError={() => setBroken((b) => ({ ...b, [current]: true }))}
            className="absolute inset-0 h-full w-full object-contain [filter:sepia(0.22)_saturate(1.1)_contrast(1.06)_brightness(0.96)]"
            loading="lazy"
          />
        </AnimatePresence>

          {/* vignette */}
          <div className="pointer-events-none absolute inset-0 z-[2] [box-shadow:inset_0_0_120px_35px_rgba(20,20,20,0.5)]" />
        </div>

        {/* bottom gradient + caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/55 px-3.5 py-2 backdrop-blur-md">
            <span className="h-4 w-1 rounded-full bg-gradient-to-b from-[#ff6b00] to-[#ff9a00]" />
            <span className="font-[family-name:var(--font-family-display)] text-[13px] font-bold uppercase tracking-wide text-white sm:text-[14px]">
              {labelFromSrc(current)}
            </span>
          </div>
          <span className="rounded-xl border border-white/10 bg-black/55 px-3 py-2 font-mono text-[12px] font-bold text-white/80 backdrop-blur-md">
            <span className="text-[#ff6b00]">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-0.5 text-white/30">/</span>
            {String(count).padStart(2, "0")}
          </span>
        </div>

        {/* arrows */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 opacity-0 backdrop-blur-sm transition-all hover:border-[#ff6b00]/40 hover:bg-[#ff6b00]/20 hover:text-white group-hover:opacity-100"
            >
              <MaterialIcon name="chevron_left" className="!text-[22px]" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 opacity-0 backdrop-blur-sm transition-all hover:border-[#ff6b00]/40 hover:bg-[#ff6b00]/20 hover:text-white group-hover:opacity-100"
            >
              <MaterialIcon name="chevron_right" className="!text-[22px]" />
            </button>
          </>
        )}
      </div>

      {/* thumbnail strip */}
      {count > 1 && (
        <div
          ref={thumbsRef}
          className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {valid.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-[16/10] h-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === index
                  ? "border-[#ff6b00] ring-1 ring-[#ff6b00]/40"
                  : "border-[#d9c4a3]/25 opacity-55 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt=""
                onError={() => setBroken((b) => ({ ...b, [src]: true }))}
                className="h-full w-full object-cover object-top [filter:sepia(0.22)_saturate(1.1)_contrast(1.06)_brightness(0.96)]"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
