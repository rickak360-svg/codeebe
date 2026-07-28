"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { api } from "@/lib/api";
import {
  formatINR,
  type Service,
  type ServicePlan,
  type PlanId,
} from "@/data/configurator";
import { getServiceLanding, type ServiceLanding, type ShowcaseImage } from "@/data/packageLanding";

const PRIMARY = "#FF7A00";
const PRIMARY_HOVER = "#FF9333";

/* ─────────────── helpers ── */
const INPUT_CLASS =
  "w-full rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-3.5 text-[14px] text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:border-[#FF7A00]/50 focus:bg-black/55 focus:shadow-[0_0_0_3px_rgba(255,122,0,0.12)]";

/* ─────────────── Hero ── */
function Hero({ service, landing }: { service: Service; landing: ServiceLanding }) {
  return (
    <section className="relative overflow-hidden pt-[9rem] pb-16 sm:pt-[10.5rem] sm:pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255,122,0,0.09), transparent 65%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full opacity-20 blur-[120px]"
        style={{ background: "rgba(255,122,0,0.25)" }}
        animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-10 h-56 w-56 rounded-full opacity-15 blur-[100px]"
        style={{ background: "rgba(255,122,0,0.2)" }}
        animate={{ x: [0, -18, 0], y: [0, 14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="site-container relative">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 text-[12px] text-[#9CA3AF]"
        >
          <Link href="/packages" className="hover:text-white transition-colors">
            Packages
          </Link>
          <MaterialIcon name="chevron_right" className="!text-[14px] opacity-40" />
          <span className="text-white/60">{service.title}</span>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF7A00]/20 bg-[#FF7A00]/8 px-4 py-2">
              <MaterialIcon name={service.icon} className="!text-[14px]" style={{ color: PRIMARY }} />
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#FF7A00]/80">
                {service.emoji} {service.title} Packages
              </span>
            </div>

            <h1 className="mt-4 font-[family-name:var(--font-family-display)] text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              {landing.heroTitle}{" "}
              <span className="bg-gradient-to-r from-[#FF7A00] to-[#FF9333] bg-clip-text text-transparent">
                {landing.heroTitleHighlight}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#9CA3AF]">
              {landing.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-[14px] font-bold text-[#090909] shadow-[0_8px_32px_-8px_rgba(255,122,0,0.55)] transition-all hover:shadow-[0_12px_40px_-8px_rgba(255,122,0,0.65)]"
                style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_HOVER})` }}
              >
                <MaterialIcon name="send" className="!text-[16px]" />
                Get a free quote
              </a>
              <a
                href="#plans"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-6 py-3.5 text-[14px] font-medium text-white/70 transition-all hover:border-white/20 hover:text-white"
              >
                <MaterialIcon name="expand_more" className="!text-[16px]" />
                View pricing
              </a>
            </div>
          </motion.div>

          {/* Right: stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="grid grid-cols-2 gap-4"
          >
            {landing.heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="rounded-[20px] p-5"
                style={{
                  background: "rgba(18,18,18,0.8)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <p
                  className="font-[family-name:var(--font-family-display)] text-3xl font-bold"
                  style={{ color: PRIMARY }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-[12px] text-[#9CA3AF]">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Lightbox ── */
function Lightbox({ images, startIndex, onClose }: {
  images: ShowcaseImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px]">
          <Image
            src={images[current].url}
            alt={images[current].alt}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 80vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
            <span
              className="mr-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              style={{ background: PRIMARY, color: "#090909" }}
            >
              {images[current].tag}
            </span>
            <span className="text-[14px] font-medium text-white">{images[current].caption}</span>
          </div>
        </div>

        {/* Controls */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
        >
          <MaterialIcon name="chevron_left" className="!text-[22px]" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
        >
          <MaterialIcon name="chevron_right" className="!text-[22px]" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
        >
          <MaterialIcon name="close" className="!text-[18px]" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === current ? "20px" : "6px",
                background: i === current ? PRIMARY : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── Showcase Gallery ── */
function ShowcaseSection({ landing, service }: { landing: ServiceLanding; service: Service }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const imgs = landing.showcaseImages;

  return (
    <section className="py-16 sm:py-20">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: `${PRIMARY}cc` }}>
              Our recent work
            </p>
            <h2 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl">
              {service.title} websites we&apos;ve built
            </h2>
            <p className="mt-2 text-[14px] text-[#9CA3AF]">
              Click any screenshot to view full size.
            </p>
          </div>
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "rgba(255,122,0,0.08)", border: "1px solid rgba(255,122,0,0.2)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-[12px] font-medium text-green-400">Accepting projects</span>
          </div>
        </motion.div>

        {/* Featured + grid layout */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Featured image (first) */}
          {imgs[0] && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.45 }}
              onClick={() => setLightboxIndex(0)}
              className="group relative overflow-hidden rounded-[20px] lg:row-span-2"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Browser chrome bar */}
              <div
                className="flex items-center gap-1.5 px-4 py-2.5"
                style={{ background: "rgba(14,14,14,0.95)" }}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 flex flex-1 items-center gap-1 rounded bg-white/[0.06] px-2 py-1 text-[10px] text-white/30">
                  <MaterialIcon name="lock" className="!text-[10px]" />
                  codeebe.com · {service.title.toLowerCase()}
                </span>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={imgs[0].url}
                  alt={imgs[0].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-sm"
                    style={{ background: "rgba(255,122,0,0.85)" }}
                  >
                    <MaterialIcon name="zoom_in" className="!text-[16px]" />
                    View full size
                  </div>
                </div>
              </div>
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ background: "rgba(14,14,14,0.95)" }}
              >
                <span className="text-[13px] font-medium text-white/80">{imgs[0].caption}</span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  style={{ background: "rgba(255,122,0,0.15)", color: PRIMARY }}
                >
                  {imgs[0].tag}
                </span>
              </div>
            </motion.button>
          )}

          {/* Remaining 3 images in a stacked grid */}
          <div className="grid gap-4">
            {imgs.slice(1).map((img, i) => (
              <motion.button
                key={img.caption}
                type="button"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setLightboxIndex(i + 1)}
                className="group relative overflow-hidden rounded-[16px]"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* mini browser bar */}
                <div
                  className="flex items-center gap-1 px-3 py-1.5"
                  style={{ background: "rgba(14,14,14,0.95)" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-[9px] text-white/20">{img.caption}</span>
                </div>
                <div className="relative aspect-[16/7] w-full overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <MaterialIcon name="zoom_in" className="!text-[22px] text-white drop-shadow-lg" />
                  </div>
                </div>
                <div
                  className="flex items-center justify-between px-3 py-2"
                  style={{ background: "rgba(14,14,14,0.95)" }}
                >
                  <span className="text-[12px] text-white/70">{img.caption}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
                    style={{ background: "rgba(255,122,0,0.12)", color: PRIMARY }}
                  >
                    {img.tag}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={imgs} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────── Live Preview ── */
function LivePreviewSection({ landing, service }: { landing: ServiceLanding; service: Service }) {
  const [expanded, setExpanded] = useState(false);
  if (!landing.livePreviewUrl) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p
                className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: `${PRIMARY}cc` }}
              >
                Live client website
              </p>
              <h2 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl">
                See a real {service.title} site in action
              </h2>
              <p className="mt-2 text-[14px] text-[#9CA3AF]">
                {landing.livePreviewLabel ?? landing.livePreviewUrl}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <a
                href={landing.livePreviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-2xl border border-white/10 px-4 py-2 text-[13px] text-white/70 transition-all hover:border-white/20 hover:text-white"
              >
                <MaterialIcon name="open_in_new" className="!text-[14px]" />
                Open in new tab
              </a>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-2xl px-4 py-2 text-[13px] font-semibold text-[#090909] transition-all"
                style={{ background: PRIMARY }}
              >
                <MaterialIcon name={expanded ? "fullscreen_exit" : "fullscreen"} className="!text-[14px]" />
                {expanded ? "Compact" : "Expand"}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="overflow-hidden rounded-[24px] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)]"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background: "rgba(14,14,14,0.98)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>

            {/* Nav arrows */}
            <div className="ml-2 flex gap-1 text-white/20">
              <MaterialIcon name="chevron_left" className="!text-[16px]" />
              <MaterialIcon name="chevron_right" className="!text-[16px]" />
            </div>

            {/* Address bar */}
            <div
              className="ml-2 flex flex-1 items-center gap-2 rounded-lg px-3 py-1.5"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <MaterialIcon name="lock" className="!text-[11px]" style={{ color: PRIMARY }} />
              <span className="flex-1 truncate text-[12px] text-white/50">
                {landing.livePreviewUrl}
              </span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-green-400"
              />
              <span className="text-[10px] text-green-400">Live</span>
            </div>

            {/* Right icons */}
            <div className="ml-2 flex items-center gap-2 text-white/20">
              <MaterialIcon name="refresh" className="!text-[16px]" />
              <MaterialIcon name="more_vert" className="!text-[16px]" />
            </div>
          </div>

          {/* Toolbar tabs row */}
          <div
            className="flex items-center gap-0 overflow-x-auto px-4 py-0"
            style={{ background: "rgba(18,18,18,0.95)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
          >
            <div
              className="flex items-center gap-2 border-b-2 px-4 py-2.5 text-[12px] font-medium text-white"
              style={{ borderColor: PRIMARY }}
            >
              <MaterialIcon name={service.icon} className="!text-[12px]" style={{ color: PRIMARY }} />
              {landing.livePreviewLabel ?? "Client Site"}
            </div>
            <div className="px-4 py-2.5 text-[12px] text-white/25">+ New Tab</div>
          </div>

          {/* iframe */}
          <div
            className="relative w-full transition-all duration-500"
            style={{ height: expanded ? "85vh" : "620px" }}
          >
            <iframe
              src={landing.livePreviewUrl}
              title={landing.livePreviewLabel ?? `${service.title} live site`}
              className="h-full w-full"
              style={{ border: "none" }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
            />

            {/* Overlay gradient at bottom for non-expanded */}
            {!expanded && (
              <div
                className="pointer-events-none absolute bottom-0 inset-x-0 h-24"
                style={{
                  background: "linear-gradient(to top, rgba(9,9,9,0.9) 0%, transparent 100%)",
                }}
              />
            )}
          </div>

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{
              background: "rgba(14,14,14,0.98)",
              borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[11px] text-white/30">
                <MaterialIcon name="verified" className="!text-[12px]" style={{ color: PRIMARY }} />
                Real client site built by Codeebe
              </span>
            </div>
            <a
              href="#inquiry"
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold text-[#090909] transition-all hover:opacity-90"
              style={{ background: PRIMARY }}
            >
              <MaterialIcon name="send" className="!text-[12px]" />
              Get one like this
            </a>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4 text-center text-[12px] text-white/25"
        >
          Live preview of{" "}
          <a
            href={landing.livePreviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/50 transition-colors"
          >
            {landing.livePreviewUrl}
          </a>{" "}
          — a real car rental website built by Codeebe.
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────── Video Section ── */
function VideoSection({ landing, service }: { landing: ServiceLanding; service: Service }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-16 sm:py-20">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: `${PRIMARY}cc` }}>
            See it in action
          </p>
          <h2 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl">
            Watch how we build {service.title} websites
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[14px] text-[#9CA3AF]">
            A quick walkthrough of what you get — from design to deployment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[24px]"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Browser top bar */}
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{ background: "rgba(14,14,14,0.98)" }}
          >
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 flex items-center gap-1.5 rounded bg-white/[0.06] px-3 py-1 text-[10px] text-white/30">
              <MaterialIcon name="play_circle" className="!text-[11px]" style={{ color: PRIMARY }} />
              codeebe.com · {service.title.toLowerCase()} demo
            </span>
          </div>

          {/* Video area */}
          <div className="relative aspect-video w-full bg-[#0a0a0a]">
            {landing.demoVideoId && playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${landing.demoVideoId}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <>
                {/* Gradient placeholder */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,122,0,0.12) 0%, rgba(9,9,9,0.95) 70%)",
                  }}
                />
                {/* Grid lines overlay */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,122,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />

                {/* Floating screenshot thumbnails */}
                <div className="absolute inset-0 overflow-hidden">
                  {landing.showcaseImages.slice(0, 3).map((img, i) => (
                    <motion.div
                      key={img.caption}
                      className="absolute overflow-hidden rounded-lg shadow-2xl"
                      style={{
                        width: i === 0 ? "42%" : "28%",
                        top: i === 0 ? "15%" : i === 1 ? "10%" : "52%",
                        left: i === 0 ? "6%" : i === 1 ? "54%" : "66%",
                        border: "1px solid rgba(255,255,255,0.1)",
                        opacity: 0.55,
                        transform: i === 0 ? "rotate(-2deg)" : i === 1 ? "rotate(1.5deg)" : "rotate(-1deg)",
                      }}
                      animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        width={360}
                        height={220}
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => landing.demoVideoId ? setPlaying(true) : undefined}
                    className="relative flex h-20 w-20 items-center justify-center rounded-full shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_HOVER})`,
                      boxShadow: "0 0 0 12px rgba(255,122,0,0.15), 0 20px 60px -10px rgba(255,122,0,0.5)",
                      cursor: landing.demoVideoId ? "pointer" : "default",
                    }}
                  >
                    <MaterialIcon name="play_arrow" className="!text-[40px] ml-1 text-[#090909]" />
                    {/* Pulse ring */}
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${PRIMARY}` }}
                      animate={{ scale: [1, 1.5, 1.5], opacity: [0.8, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>

                  <div className="mt-6 text-center">
                    <p className="font-[family-name:var(--font-family-display)] text-xl font-bold text-white">
                      {service.title} Demo
                    </p>
                    {landing.demoVideoId ? (
                      <p className="mt-1 text-[13px] text-[#9CA3AF]">Click to watch · 2–3 minutes</p>
                    ) : (
                      <p className="mt-1 text-[13px] text-[#9CA3AF]">
                        Demo video coming soon —{" "}
                        <a href="#inquiry" className="underline" style={{ color: PRIMARY }}>
                          request a live walkthrough
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
            style={{ background: "rgba(14,14,14,0.98)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(255,122,0,0.12)" }}
              >
                <MaterialIcon name={service.icon} className="!text-[16px]" style={{ color: PRIMARY }} />
              </div>
              <div>
                <p className="text-[12px] font-medium text-white">{service.title} Walkthrough</p>
                <p className="text-[10px] text-[#9CA3AF]">by Codeebe</p>
              </div>
            </div>
            <div className="flex gap-2">
              {["Full demo", "Feature tour", "Pricing overview"].map((label) => (
                <span
                  key={label}
                  className="rounded-full px-2.5 py-1 text-[10px] text-white/40"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── Features ── */
function FeaturesSection({ landing }: { landing: ServiceLanding }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p
            className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: `${PRIMARY}cc` }}
          >
            What&apos;s included
          </p>
          <h2 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {landing.features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="group rounded-[20px] p-6 transition-colors"
              style={{
                background: "rgba(18,18,18,0.7)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl transition-colors group-hover:scale-105"
                style={{ background: "rgba(255,122,0,0.12)" }}
              >
                <MaterialIcon name={feat.icon} className="!text-[22px]" style={{ color: PRIMARY }} />
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-family-display)] text-[16px] font-bold text-white">
                {feat.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-[#9CA3AF]">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Benefits ── */
function BenefitsSection({ landing }: { landing: ServiceLanding }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="site-container">
        <div className="overflow-hidden rounded-[32px] p-8 sm:p-12 lg:p-16"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,122,0,0.07) 0%, rgba(18,18,18,0.9) 50%, rgba(18,18,18,0.95) 100%)",
            border: "1px solid rgba(255,122,0,0.15)",
            backdropFilter: "blur(20px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl">
              {landing.benefitHeading}
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {landing.benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                className="text-center"
              >
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(255,122,0,0.12)", border: "1px solid rgba(255,122,0,0.2)" }}
                >
                  <MaterialIcon name={b.icon} className="!text-[22px]" style={{ color: PRIMARY }} />
                </div>
                <h3 className="mb-1.5 text-[15px] font-bold text-white">{b.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#9CA3AF]">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Plan Card ── */
function PlanCard({
  plan,
  selected,
  onSelect,
  index,
}: {
  plan: ServicePlan;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  const isPopular = !!plan.popular;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: isPopular ? -8 : -4 }}
      onClick={onSelect}
      className="relative flex cursor-pointer flex-col rounded-[24px] p-6 transition-all duration-300 sm:p-7"
      style={{
        background: selected
          ? "linear-gradient(180deg, rgba(255,122,0,0.1) 0%, rgba(18,18,18,0.95) 40%)"
          : "rgba(18,18,18,0.8)",
        border: selected
          ? `2px solid ${PRIMARY}`
          : isPopular
            ? `1.5px solid rgba(255,122,0,0.5)`
            : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isPopular
          ? "0 0 60px -12px rgba(255,122,0,0.35), 0 32px 64px -32px rgba(0,0,0,0.8)"
          : selected
            ? "0 0 40px -12px rgba(255,122,0,0.3)"
            : "0 16px 48px -24px rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
        transform: isPopular ? "scale(1.02)" : undefined,
      }}
    >
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_HOVER})`,
            color: "#090909",
            boxShadow: "0 4px 20px -4px rgba(255,122,0,0.6)",
          }}
        >
          {plan.badge}
        </motion.div>
      )}

      {!isPopular && (
        <span
          className="mb-4 inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#9CA3AF",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {plan.badge}
        </span>
      )}

      {isPopular && <div className="mb-4 h-3" />}

      <h3 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white">
        {plan.name}
      </h3>
      <p className="mt-1 text-[13px] text-[#9CA3AF]">{plan.tagline}</p>

      <div
        className="my-5 rounded-2xl p-4"
        style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white">
          {formatINR(plan.price)}
        </p>
        <p className="mt-1 text-[12px] text-[#9CA3AF]">
          <MaterialIcon name="schedule" className="!text-[13px] mr-1 align-middle" style={{ color: PRIMARY }} />
          {plan.timeline}
        </p>
      </div>

      <p className="mb-4 text-[12.5px] leading-relaxed text-white/55">{plan.deliverables}</p>

      <ul className="mb-6 flex-1 space-y-2.5">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-[12.5px] text-white/65">
            <MaterialIcon name="check_circle" className="!text-[14px] mt-0.5 shrink-0" style={{ color: PRIMARY }} />
            {h}
          </li>
        ))}
      </ul>

      <div className="mb-5 grid grid-cols-2 gap-2">
        <MetaChip icon="cloud" label="Hosting" value={plan.hosting} />
        <MetaChip icon="support_agent" label="Support" value={plan.support} />
      </div>

      <a
        href="#inquiry"
        onClick={onSelect}
        className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition-colors"
        style={{
          background: selected ? PRIMARY : "rgba(255,255,255,0.05)",
          color: selected ? "#090909" : "#FFFFFF",
          border: selected ? "none" : "1px solid rgba(255,255,255,0.1)",
          boxShadow: selected ? "0 8px 32px -8px rgba(255,122,0,0.5)" : "none",
        }}
      >
        <MaterialIcon name={selected ? "check_circle" : "arrow_forward"} className="!text-[16px]" />
        {selected ? "Selected — get quote" : "Get started"}
      </a>
    </motion.article>
  );
}

function MetaChip({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div
      className="rounded-xl px-3 py-2"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#9CA3AF]">
        <MaterialIcon name={icon} className="!text-[11px]" style={{ color: PRIMARY }} />
        {label}
      </p>
      <p className="mt-0.5 text-[12px] font-medium text-white/80">{value}</p>
    </div>
  );
}

/* ─────────────── Comparison Table ── */
function ComparisonSection({ plans, selectedPlan }: { plans: ServicePlan[]; selectedPlan: PlanId | null }) {
  const [expanded, setExpanded] = useState(true);

  const rows = [
    { key: "price", label: "Price", render: (p: ServicePlan) => formatINR(p.price) },
    { key: "timeline", label: "Timeline", render: (p: ServicePlan) => p.timeline },
    { key: "hosting", label: "Hosting", render: (p: ServicePlan) => p.hosting },
    { key: "support", label: "Support", render: (p: ServicePlan) => p.support },
    { key: "deliverables", label: "What&apos;s included", render: (p: ServicePlan) => p.deliverables },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
      className="mt-12 overflow-hidden rounded-[24px]"
      style={{
        background: "rgba(18,18,18,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: `${PRIMARY}cc` }}>
            Side-by-side comparison
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-family-display)] text-xl font-bold text-white">
            Plan breakdown
          </h3>
        </div>
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04]">
          <MaterialIcon name="expand_more" className="!text-[20px] text-white/50" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto px-4 pb-6 sm:px-6">
              <table className="w-full min-w-[540px] border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-3 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      Detail
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className="px-3 py-4 text-center"
                        style={{
                          background:
                            selectedPlan === plan.id
                              ? "rgba(255,122,0,0.06)"
                              : plan.popular
                                ? "rgba(255,122,0,0.03)"
                                : undefined,
                        }}
                      >
                        <span className="block text-[13px] font-semibold" style={{ color: plan.popular ? PRIMARY : "#FFFFFF" }}>
                          {plan.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.key} className={i % 2 === 0 ? "bg-white/[0.015]" : ""}>
                      <td className="px-3 py-3.5 text-[13px] text-white/70">{row.label}</td>
                      {plans.map((plan) => (
                        <td
                          key={plan.id}
                          className="px-3 py-3.5 text-center text-[12px] text-white/70"
                          style={{
                            background: selectedPlan === plan.id ? "rgba(255,122,0,0.04)" : undefined,
                            fontWeight: row.key === "price" ? 600 : undefined,
                            color: row.key === "price" ? "#FFFFFF" : undefined,
                          }}
                        >
                          {row.render(plan)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────── FAQ ── */
function FaqSection({ landing }: { landing: ServiceLanding }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: `${PRIMARY}cc` }}>
            FAQ
          </p>
          <h2 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl">
            Common questions
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {landing.faq.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="overflow-hidden rounded-[18px]"
              style={{
                background: open === i ? "rgba(255,122,0,0.05)" : "rgba(18,18,18,0.7)",
                border: open === i ? "1px solid rgba(255,122,0,0.2)" : "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-[14px] font-medium text-white">{item.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.05]"
                >
                  <MaterialIcon name="expand_more" className="!text-[16px] text-white/50" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pt-1 text-[13.5px] leading-relaxed text-[#9CA3AF]">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Field ── */
function Field({ label, required, htmlFor, children }: {
  label: string; required?: boolean; htmlFor: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[12px] font-medium text-white/55">
        {label}{required && <span className="text-[#FF7A00]"> *</span>}
      </label>
      {children}
    </div>
  );
}

/* ─────────────── Inquiry Form ── */
function InquiryForm({
  service,
  landing,
  selectedPlan,
  onPlanChange,
}: {
  service: Service;
  landing: ServiceLanding;
  selectedPlan: PlanId | null;
  onPlanChange: (id: PlanId) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const activePlan =
    service.plans.find((p) => p.id === selectedPlan) ??
    service.plans.find((p) => p.popular) ??
    service.plans[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);

    const summaryLines = [
      `Package inquiry — ${service.title}`,
      `Package: ${activePlan.name}`,
      `Deliverables: ${activePlan.deliverables}`,
      `Price: ${formatINR(activePlan.price)}`,
      `Timeline: ${activePlan.timeline}`,
      `Hosting: ${activePlan.hosting}`,
      `Support: ${activePlan.support}`,
      "",
      `Message:`,
      String(fd.get("message") || ""),
    ];

    try {
      await api.createLead({
        fullName: String(fd.get("fullName")),
        email: String(fd.get("email")),
        phone: String(fd.get("phone")),
        companyName: String(fd.get("companyName") || "") || undefined,
        projectType: service.title,
        description: summaryLines.join("\n"),
        features: [service.title, activePlan.name, activePlan.deliverables],
        timeline: activePlan.timeline,
        budgetRange: formatINR(activePlan.price),
        source: "contact",
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send inquiry");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-[28px] border border-[#22C55E]/20 p-8 text-center sm:p-10"
        style={{ background: "linear-gradient(180deg, rgba(34,197,94,0.08) 0%, rgba(18,18,18,0.95) 40%)" }}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]/15 ring-1 ring-[#22C55E]/30">
          <MaterialIcon name="check_circle" className="!text-[36px] text-[#22C55E]" />
        </div>
        <h3 className="mt-6 font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl">
          We&apos;ve got your inquiry!
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-[#9CA3AF]">
          Your inquiry for{" "}
          <span className="text-white">{service.title} — {activePlan.name}</span> has been received.
          Our team will reach out within 24 hours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-2xl bg-[#FF7A00] px-6 py-3 text-sm font-semibold text-[#090909]">
            Back to home
          </Link>
          <Link href="/packages" className="rounded-2xl border border-white/10 px-6 py-3 text-sm text-white/70 hover:text-white">
            View all packages
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 text-center">
        <p className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#FF7A00]/75">
          Get started today
        </p>
        <h2 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl">
          {landing.formHeading}
        </h2>
        <p className="mt-2 text-[14px] text-[#9CA3AF]">{landing.formSubtitle}</p>
      </div>

      {/* Plan selector */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {service.plans.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onPlanChange(p.id as PlanId)}
            className="relative rounded-2xl p-4 text-left transition-all duration-200 hover:border-[#FF7A00]/40"
            style={{
              background:
                (selectedPlan ?? service.plans.find((x) => x.popular)?.id) === p.id
                  ? "linear-gradient(135deg, rgba(255,122,0,0.12), rgba(18,18,18,0.9))"
                  : "rgba(18,18,18,0.7)",
              border:
                (selectedPlan ?? service.plans.find((x) => x.popular)?.id) === p.id
                  ? `1.5px solid ${PRIMARY}`
                  : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {p.popular && (
              <span
                className="mb-1.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                style={{ background: PRIMARY, color: "#090909" }}
              >
                Most Popular
              </span>
            )}
            <p className="text-[14px] font-semibold text-white">{p.name}</p>
            <p className="mt-0.5 text-[12px] font-medium" style={{ color: PRIMARY }}>{formatINR(p.price)}</p>
            <p className="mt-0.5 text-[11px] text-[#9CA3AF]">{p.timeline}</p>
          </button>
        ))}
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-[28px] border border-white/[0.08] p-6 sm:p-8"
        style={{
          background: "linear-gradient(165deg, rgba(255,122,0,0.07) 0%, rgba(18,18,18,0.92) 28%, rgba(18,18,18,0.96) 100%)",
          boxShadow: "0 32px 80px -40px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.03) inset",
          backdropFilter: "blur(24px)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,122,0,0.45), transparent)" }}
          aria-hidden
        />

        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-[#FF7A00]/15 bg-[#FF7A00]/5 px-4 py-3">
          <MaterialIcon name="inventory_2" className="!text-[16px]" style={{ color: PRIMARY }} />
          <p className="text-[13px] text-white/70">
            Selected: <span className="font-semibold text-white">{activePlan.name}</span>
            <span className="mx-2 text-[#FF7A00]">{formatINR(activePlan.price)}</span>
            <span className="text-[#9CA3AF]">· {activePlan.timeline}</span>
          </p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[13px] text-red-300">
            <MaterialIcon name="error" className="!text-[18px] mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" required htmlFor="fullName">
            <input id="fullName" name="fullName" required autoComplete="name" placeholder="Your name" className={INPUT_CLASS} />
          </Field>
          <Field label="Email" required htmlFor="email">
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={INPUT_CLASS} />
          </Field>
          <Field label="Phone" required htmlFor="phone">
            <input id="phone" name="phone" required autoComplete="tel" placeholder="+91 98765 43210" className={INPUT_CLASS} />
          </Field>
          <Field label="Company / Business" htmlFor="companyName">
            <input id="companyName" name="companyName" autoComplete="organization" placeholder="Optional" className={INPUT_CLASS} />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Message" required htmlFor="message">
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell us about your project, goals, or any specific requirements…"
              className={`${INPUT_CLASS} resize-none`}
              defaultValue={`I'm interested in the ${service.title} — ${activePlan.name} package.`}
            />
          </Field>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.985 }}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-[15px] font-bold text-[#090909] transition-colors disabled:opacity-60"
          style={{
            background: `linear-gradient(135deg, ${PRIMARY}, #FF9333)`,
            boxShadow: "0 12px 40px -10px rgba(255,122,0,0.55)",
          }}
        >
          <MaterialIcon name={loading ? "hourglass_top" : "send"} className="!text-[18px]" />
          {loading ? "Sending…" : "Send my inquiry"}
        </motion.button>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-[#9CA3AF]">
          <span className="inline-flex items-center gap-1.5">
            <MaterialIcon name="lock" className="!text-[14px] text-[#FF7A00]/70" />
            Private & secure
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MaterialIcon name="schedule" className="!text-[14px] text-[#FF7A00]/70" />
            Reply within 24h
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MaterialIcon name="payments" className="!text-[14px] text-[#FF7A00]/70" />
            Final price is negotiable
          </span>
        </div>
      </motion.form>
    </motion.div>
  );
}

/* ─────────────── Main export ── */
export function PackageCategoryTemplate({ service }: { service: Service }) {
  const landing = getServiceLanding(service.id);
  const defaultPlan = (service.plans.find((p) => p.popular)?.id ?? service.plans[0]?.id) as PlanId;
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(defaultPlan);

  const planGridClass =
    service.plans.length === 2
      ? "grid items-start gap-6 sm:grid-cols-2 lg:max-w-3xl lg:mx-auto"
      : "grid items-start gap-6 lg:grid-cols-3 lg:gap-5";

  return (
    <>
      <Hero service={service} landing={landing} />

      <ShowcaseSection service={service} landing={landing} />

      <LivePreviewSection service={service} landing={landing} />

      <VideoSection service={service} landing={landing} />

      <FeaturesSection landing={landing} />

      <BenefitsSection landing={landing} />

      {/* Pricing */}
      <section id="plans" className="scroll-mt-28 py-16 sm:py-20">
        <div
          className="pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,122,0,0.07), transparent)",
            height: "180px",
            marginTop: "-180px",
          }}
          aria-hidden
        />
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: `${PRIMARY}cc` }}>
              Transparent pricing
            </p>
            <h2 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Choose your plan
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[14px] text-[#9CA3AF]">
              Fixed packages with hosting and support included. No hidden costs, no surprise invoices.
            </p>
          </motion.div>

          <div className={planGridClass}>
            {service.plans.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id as PlanId)}
                index={i}
              />
            ))}
          </div>

          <ComparisonSection plans={service.plans} selectedPlan={selectedPlan} />
        </div>
      </section>

      <FaqSection landing={landing} />

      {/* Inquiry Form */}
      <section id="inquiry" className="scroll-mt-20 pb-24 sm:pb-32">
        <div className="site-container">
          <div className="mx-auto max-w-2xl">
            <InquiryForm
              service={service}
              landing={landing}
              selectedPlan={selectedPlan}
              onPlanChange={(id) => setSelectedPlan(id)}
            />
          </div>
        </div>
      </section>
    </>
  );
}
