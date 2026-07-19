"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { packages, type PackageId, type PackageTier } from "@/data/packages";

function FeatureRow({ label, included, accent }: { label: string; included: boolean; accent: string }) {
  return (
    <li className="flex items-start gap-2.5 text-[12.5px]">
      <span
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
        style={{
          background: included ? `${accent}22` : "rgba(255,255,255,0.04)",
          color: included ? accent : "rgba(255,255,255,0.2)",
        }}
      >
        <MaterialIcon
          name={included ? "check" : "close"}
          className="!text-[11px]"
        />
      </span>
      <span className={included ? "text-white/70" : "text-white/25 line-through decoration-white/15"}>
        {label}
      </span>
    </li>
  );
}

function PackageCard({
  pkg,
  selected,
  onSelect,
  index,
}: {
  pkg: PackageTier;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className={`group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
        selected
          ? "border-[#ff6b00]/45 bg-[#ff6b00]/[0.06] shadow-[0_0_40px_-12px_rgba(255,107,0,0.45)]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.035]"
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ff6b00] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1a0a00]">
          Most popular
        </span>
      )}

      {/* Select control */}
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border transition-all"
        style={{
          borderColor: selected ? "#ff6b00" : "rgba(255,255,255,0.1)",
          background: selected ? "rgba(255,107,0,0.15)" : "rgba(255,255,255,0.03)",
          color: selected ? "#ff6b00" : "rgba(255,255,255,0.35)",
        }}
        aria-label={selected ? `Deselect ${pkg.name}` : `Select ${pkg.name}`}
      >
        <MaterialIcon name={selected ? "check_box" : "check_box_outline_blank"} className="!text-[18px]" />
      </button>

      <div
        className="mb-5 h-0.5 w-10 rounded-full transition-all group-hover:w-16"
        style={{ background: pkg.color }}
      />

      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${pkg.color}18` }}
      >
        <MaterialIcon name={pkg.icon} className="!text-[22px]" style={{ color: pkg.color }} />
      </div>

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: `${pkg.color}cc` }}>
        {pkg.tagline}
      </p>
      <h3 className="mb-2 font-[family-name:var(--font-family-display)] text-xl font-bold text-white">
        {pkg.name}
      </h3>
      <p className="mb-5 text-[12.5px] leading-relaxed text-white/45">{pkg.description}</p>

      <div className="mb-5 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">
        <p className="text-[10px] uppercase tracking-wider text-white/35">{pkg.priceNote}</p>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white">
            {pkg.priceFrom}
          </span>
          <span className="text-[11px] text-white/35">· {pkg.timeline}</span>
        </div>
      </div>

      <ul className="mb-4 space-y-2">
        {pkg.highlights.map((h) => (
          <li key={h} className="flex items-center gap-2 text-[12px] text-white/55">
            <span className="h-1 w-1 rounded-full" style={{ background: pkg.color }} />
            {h}
          </li>
        ))}
      </ul>

      <div className="mb-5 border-t border-white/[0.05] pt-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
          What&apos;s included
        </p>
        <ul className="space-y-2">
          {pkg.features.slice(0, 8).map((f) => (
            <FeatureRow key={f.label} label={f.label} included={f.included} accent={pkg.color} />
          ))}
        </ul>
        {pkg.features.length > 8 && (
          <p className="mt-2 text-[11px] text-white/30">
            +{pkg.features.length - 8} more in comparison below
          </p>
        )}
      </div>

      <div className="mt-auto space-y-2">
        <button
          type="button"
          onClick={onSelect}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
            selected
              ? "bg-[#ff6b00] text-[#1a0a00] shadow-[0_6px_24px_-6px_rgba(255,107,0,0.55)]"
              : "border border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:text-white"
          }`}
        >
          <MaterialIcon name={selected ? "check_circle" : "add_circle"} className="!text-[16px]" />
          {selected ? "Package selected" : "Check this package"}
        </button>
        <Link
          href={`${pkg.ctaHref}?package=${pkg.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-white/50 transition-all hover:border-[#ff6b00]/30 hover:text-[#ff9a00]"
        >
          <MaterialIcon name="arrow_forward" className="!text-[15px]" />
          Get estimate
        </Link>
      </div>
    </motion.article>
  );
}

export function PackagesGrid() {
  const [selected, setSelected] = useState<PackageId | null>("ecommerce");

  const toggle = (id: PackageId) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const selectedPkg = packages.find((p) => p.id === selected) ?? null;

  return (
    <section id="plans" className="scroll-mt-28 pt-8 pb-16 sm:pt-10 sm:pb-20">
      <div className="site-container">
        <div className="mb-10">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">
            Packages
          </p>
          <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white sm:text-4xl">
            Pick what you need
          </h2>
          <p className="mt-3 max-w-xl text-[14px] text-white/45">
            Tap <span className="text-white/70">Check this package</span> to select a plan,
            then continue to a tailored estimate.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={i}
              selected={selected === pkg.id}
              onSelect={() => toggle(pkg.id)}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedPkg && (
            <motion.div
              initial={{ opacity: 0, y: 12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 8, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-8 flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-[#ff6b00]/25 bg-[#ff6b00]/[0.06] p-5 sm:flex-row sm:items-center sm:p-6">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${selectedPkg.color}22` }}
                  >
                    <MaterialIcon
                      name={selectedPkg.icon}
                      className="!text-[20px]"
                      style={{ color: selectedPkg.color }}
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff6b00]/80">
                      Selected package
                    </p>
                    <p className="mt-0.5 text-lg font-semibold text-white">{selectedPkg.name}</p>
                    <p className="text-[13px] text-white/45">
                      From {selectedPkg.priceFrom} · {selectedPkg.timeline}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/estimate?package=${selectedPkg.id}`}
                    className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-5 py-2.5 text-sm font-semibold text-[#1a0a00] shadow-[0_6px_24px_-6px_rgba(255,107,0,0.5)] hover:bg-[#ff8533] transition-colors"
                  >
                    <MaterialIcon name="calculate" className="!text-[15px]" />
                    Continue to estimate
                  </Link>
                  <Link
                    href={`/contact?package=${selectedPkg.id}`}
                    className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/60 hover:border-white/20 hover:text-white transition-all"
                  >
                    Talk to us
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
