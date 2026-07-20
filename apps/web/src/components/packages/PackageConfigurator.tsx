"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import {
  services,
  projectTypesByService,
  packageTiers,
  comparisonRows,
  calculateEstimate,
  buildEstimateUrl,
  buildContactUrl,
  formatINR,
  getBuildApproaches,
  serviceNeedsBuildApproach,
  type ServiceId,
  type PackageTierId,
  type BuildApproachId,
  type BuildApproach,
} from "@/data/configurator";

const PRIMARY = "#FF7A00";
const PRIMARY_HOVER = "#FF9333";
const SUCCESS = "#22C55E";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function ProgressIndicator({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: { num: number; label: string; done: boolean }[];
}) {
  return (
    <div className="mb-10 flex items-center justify-center gap-0 sm:gap-2">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center"
        >
          <motion.div
            className="flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2"
            animate={{
              background:
                currentStep === step.num
                  ? "rgba(255,122,0,0.12)"
                  : step.done
                    ? "rgba(34,197,94,0.08)"
                    : "rgba(255,255,255,0.03)",
              borderColor:
                currentStep === step.num
                  ? "rgba(255,122,0,0.4)"
                  : step.done
                    ? "rgba(34,197,94,0.3)"
                    : "rgba(255,255,255,0.08)",
            }}
            style={{ border: "1px solid" }}
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold"
              style={{
                background:
                  currentStep === step.num
                    ? PRIMARY
                    : step.done
                      ? SUCCESS
                      : "rgba(255,255,255,0.08)",
                color: currentStep === step.num || step.done ? "#090909" : "#9CA3AF",
              }}
            >
              {step.done && currentStep !== step.num ? (
                <MaterialIcon name="check" className="!text-[14px]" />
              ) : (
                step.num
              )}
            </span>
            <span
              className="hidden text-[12px] font-medium sm:inline"
              style={{ color: currentStep === step.num ? "#FFFFFF" : "#9CA3AF" }}
            >
              {step.label}
            </span>
          </motion.div>
          {i < steps.length - 1 && (
            <div
              className="mx-1 h-px w-6 transition-colors duration-300 sm:mx-2 sm:w-12"
              style={{
                background: step.done ? SUCCESS : "rgba(255,255,255,0.08)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function ServiceCard({
  service,
  selected,
  onSelect,
  index,
}: {
  service: (typeof services)[0];
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="group relative w-full overflow-hidden rounded-[24px] p-6 text-left transition-shadow duration-300"
      style={{
        background: selected
          ? "linear-gradient(135deg, rgba(255,122,0,0.12) 0%, rgba(18,18,18,0.95) 60%)"
          : "rgba(18,18,18,0.7)",
        border: selected
          ? `1.5px solid ${PRIMARY}`
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: selected
          ? "0 0 48px -12px rgba(255,122,0,0.45), 0 24px 48px -24px rgba(0,0,0,0.8)"
          : "0 8px 32px -16px rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,122,0,0.08), transparent)",
        }}
      />

      <motion.div
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full"
        animate={{
          background: selected ? PRIMARY : "rgba(255,255,255,0.06)",
          scale: selected ? 1 : 0.9,
        }}
      >
        {selected && <MaterialIcon name="check" className="!text-[16px] text-[#090909]" />}
      </motion.div>

      <div className="relative">
        <motion.div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: "rgba(255,122,0,0.12)" }}
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          <MaterialIcon name={service.icon} className="!text-[24px]" style={{ color: PRIMARY }} />
        </motion.div>

        <h3 className="mb-2 font-[family-name:var(--font-family-display)] text-lg font-bold text-white sm:text-xl">
          {service.title}
        </h3>
        <p className="mb-5 text-[13px] leading-relaxed text-[#9CA3AF]">{service.description}</p>

        <motion.div
          className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">From</span>
          <span className="font-[family-name:var(--font-family-display)] text-base font-bold text-white">
            {formatINR(service.startingPrice)}
          </span>
        </motion.div>
      </div>
    </motion.button>
  );
}

const PREVIEW_PROJECT_BY_SERVICE: Partial<Record<ServiceId, string>> = {
  "web-development": "business-website",
  ecommerce: "fashion-store",
};

function BuildApproachCard({
  approach,
  selected,
  onSelect,
  serviceId,
  index,
}: {
  approach: BuildApproach;
  selected: boolean;
  onSelect: () => void;
  serviceId: ServiceId;
  index: number;
}) {
  const previewProject = PREVIEW_PROJECT_BY_SERVICE[serviceId];
  const previewEstimate = previewProject
    ? calculateEstimate(serviceId, previewProject, "basic", approach.id)
    : null;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="group relative w-full overflow-hidden rounded-[24px] p-6 text-left sm:p-7"
      style={{
        background: selected
          ? "linear-gradient(135deg, rgba(255,122,0,0.12) 0%, rgba(18,18,18,0.95) 60%)"
          : "rgba(18,18,18,0.8)",
        border: selected
          ? `1.5px solid ${PRIMARY}`
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: selected
          ? "0 0 40px -12px rgba(255,122,0,0.4)"
          : "0 8px 32px -16px rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px)",
      }}
    >
      {approach.savingsLabel && (
        <span
          className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
          style={{ background: "rgba(34,197,94,0.15)", color: SUCCESS }}
        >
          {approach.savingsLabel}
        </span>
      )}

      <motion.div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ background: "rgba(255,122,0,0.12)" }}
      >
        <MaterialIcon name={approach.icon} className="!text-[24px]" style={{ color: PRIMARY }} />
      </motion.div>

      <h3 className="mb-2 font-[family-name:var(--font-family-display)] text-xl font-bold text-white">
        {approach.label}
      </h3>
      <p className="mb-4 text-[13px] leading-relaxed text-[#9CA3AF]">{approach.description}</p>

      <motion.div className="mb-4 flex flex-wrap gap-1.5">
        {approach.platforms.map((platform) => (
          <span
            key={platform}
            className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-white/60"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {platform}
          </span>
        ))}
      </motion.div>

      {previewEstimate && (
        <motion.div
          className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">From</span>
          <span className="font-[family-name:var(--font-family-display)] text-base font-bold text-white">
            {previewEstimate.priceFormatted}
          </span>
        </motion.div>
      )}
    </motion.button>
  );
}

function ProjectTypeChip({
  label,
  selected,
  onSelect,
  index,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className="relative rounded-2xl px-4 py-3 text-[13px] font-medium transition-all duration-200"
      style={{
        background: selected ? "rgba(255,122,0,0.15)" : "rgba(18,18,18,0.8)",
        border: selected ? `1.5px solid ${PRIMARY}` : "1px solid rgba(255,255,255,0.08)",
        color: selected ? "#FFFFFF" : "#9CA3AF",
        boxShadow: selected ? "0 0 24px -6px rgba(255,122,0,0.4)" : "none",
        backdropFilter: "blur(12px)",
      }}
    >
      {selected && (
        <motion.span
          layoutId="type-indicator"
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full"
          style={{ background: PRIMARY }}
        >
          <MaterialIcon name="check" className="!text-[12px] text-[#090909]" />
        </motion.span>
      )}
      {label}
    </motion.button>
  );
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full"
        style={{ background: "rgba(34,197,94,0.15)", color: SUCCESS }}
      >
        <MaterialIcon name="check" className="!text-[14px]" />
      </motion.span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04] text-white/20">
        <MaterialIcon name="remove" className="!text-[14px]" />
      </span>
    );
  }
  return (
    <span className="text-[12px] font-medium text-white/70">{value}</span>
  );
}

function PackageCard({
  pkg,
  selected,
  onSelect,
  estimate,
  index,
}: {
  pkg: (typeof packageTiers)[0];
  selected: boolean;
  onSelect: () => void;
  estimate: { priceFormatted: string; timeline: string };
  index: number;
}) {
  const isPopular = pkg.popular;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
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
        minHeight: isPopular ? "auto" : undefined,
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
          {pkg.badge}
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
          {pkg.badge}
        </span>
      )}

      {isPopular && <motion.div className="mb-4 h-3" />}

      <h3 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white">
        {pkg.name}
      </h3>
      <p className="mt-1 text-[13px] text-[#9CA3AF]">{pkg.tagline}</p>

      <div className="my-5 rounded-2xl p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white">
          {estimate.priceFormatted}
        </p>
        <p className="mt-1 text-[12px] text-[#9CA3AF]">
          <MaterialIcon name="schedule" className="!text-[13px] mr-1 align-middle" style={{ color: PRIMARY }} />
          {estimate.timeline}
        </p>
      </div>

      <ul className="mb-6 flex-1 space-y-2">
        {pkg.highlights.map((h) => (
          <li key={h} className="flex items-center gap-2 text-[12.5px] text-white/60">
            <span className="h-1 w-1 rounded-full" style={{ background: PRIMARY }} />
            {h}
          </li>
        ))}
      </ul>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition-colors"
        style={{
          background: selected ? PRIMARY : "rgba(255,255,255,0.05)",
          color: selected ? "#090909" : "#FFFFFF",
          border: selected ? "none" : "1px solid rgba(255,255,255,0.1)",
          boxShadow: selected ? "0 8px 32px -8px rgba(255,122,0,0.5)" : "none",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <MaterialIcon name={selected ? "check_circle" : "add_circle"} className="!text-[16px]" />
        {selected ? "Selected" : "Select package"}
      </motion.button>
    </motion.article>
  );
}

function ComparisonSection({
  selectedPackage,
  estimates,
}: {
  selectedPackage: PackageTierId | null;
  estimates: Record<PackageTierId, ReturnType<typeof calculateEstimate>>;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
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
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <motion.div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: `${PRIMARY}cc` }}>
            Full comparison
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-family-display)] text-xl font-bold text-white">
            Package feature breakdown
          </h3>
        </motion.div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04]"
        >
          <MaterialIcon name="expand_more" className="!text-[20px] text-white/50" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              className="overflow-x-auto px-4 pb-6 sm:px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-3 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      Feature
                    </th>
                    {packageTiers.map((pkg) => (
                      <th
                        key={pkg.id}
                        className="px-3 py-4 text-center"
                        style={{
                          background:
                            selectedPackage === pkg.id
                              ? "rgba(255,122,0,0.06)"
                              : pkg.popular
                                ? "rgba(255,122,0,0.03)"
                                : undefined,
                        }}
                      >
                        <span
                          className="block text-[13px] font-semibold"
                          style={{
                            color: pkg.popular ? PRIMARY : "#FFFFFF",
                          }}
                        >
                          {pkg.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/[0.04] bg-white/[0.02]">
                    <td className="px-3 py-3 text-[12px] font-medium text-[#9CA3AF]">Price</td>
                    {packageTiers.map((pkg) => (
                      <td key={pkg.id} className="px-3 py-3 text-center text-[12px] font-semibold text-white">
                        {estimates[pkg.id].priceFormatted}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="px-3 py-3 text-[12px] font-medium text-[#9CA3AF]">Timeline</td>
                    {packageTiers.map((pkg) => (
                      <td key={pkg.id} className="px-3 py-3 text-center text-[12px] text-white/60">
                        {estimates[pkg.id].timeline}
                      </td>
                    ))}
                  </tr>
                  {comparisonRows.map((row, i) => (
                    <motion.tr
                      key={row.key}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className={i % 2 === 0 ? "bg-white/[0.015]" : ""}
                    >
                      <td className="px-3 py-3.5 text-[13px] text-white/70">{row.label}</td>
                      {packageTiers.map((pkg) => (
                        <td
                          key={pkg.id}
                          className="px-3 py-3.5 text-center"
                          style={{
                            background:
                              selectedPackage === pkg.id ? "rgba(255,122,0,0.04)" : undefined,
                          }}
                        >
                          <FeatureValue value={pkg.features[row.key]} />
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StickySummary({
  serviceTitle,
  buildLabel,
  projectLabel,
  packageName,
  priceFormatted,
  timeline,
  estimateUrl,
  contactUrl,
}: {
  serviceTitle: string;
  buildLabel?: string;
  projectLabel: string;
  packageName: string;
  priceFormatted: string;
  timeline: string;
  estimateUrl: string;
  contactUrl: string;
}) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-[120]"
      style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(9,9,9,0.95) 20%)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="mx-auto max-w-[1440px] px-4 pb-4 sm:px-6"
        style={{ paddingLeft: "max(1rem, env(safe-area-inset-left))", paddingRight: "max(1rem, env(safe-area-inset-right))" }}
      >
        <div
          className="flex flex-col gap-4 rounded-[24px] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
          style={{
            background: "rgba(18,18,18,0.95)",
            border: `1px solid rgba(255,122,0,0.25)`,
            backdropFilter: "blur(24px)",
            boxShadow: "0 -8px 48px -12px rgba(255,122,0,0.2), 0 24px 48px -24px rgba(0,0,0,0.8)",
          }}
        >
          <motion.div
            className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-6"
            layout
          >
            <SummaryItem label="Service" value={serviceTitle} />
            {buildLabel && <SummaryItem label="Build" value={buildLabel} />}
            <SummaryItem label="Project" value={projectLabel} />
            <SummaryItem label="Package" value={packageName} highlight />
            <SummaryItem label="Estimated Price" value={priceFormatted} highlight large />
            <SummaryItem label="Timeline" value={timeline} />
          </motion.div>

          <motion.div className="flex shrink-0 flex-wrap gap-2 sm:gap-3" layout>
            <Link
              href={estimateUrl}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-colors sm:flex-none"
              style={{
                background: PRIMARY,
                color: "#090909",
                boxShadow: "0 8px 32px -8px rgba(255,122,0,0.5)",
              }}
            >
              <MaterialIcon name="arrow_forward" className="!text-[16px]" />
              Continue
            </Link>
            <Link
              href={contactUrl}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white sm:flex-none"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              <MaterialIcon name="support_agent" className="!text-[16px]" />
              Talk to Expert
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function SummaryItem({
  label,
  value,
  highlight,
  large,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  large?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">{label}</p>
      <p
        className={`font-medium ${large ? "text-lg" : "text-[13px]"}`}
        style={{ color: highlight ? PRIMARY : "#FFFFFF" }}
      >
        {value}
      </p>
    </div>
  );
}

export function PackageConfigurator() {
  const isMobile = useIsMobile();
  const [serviceId, setServiceId] = useState<ServiceId | null>(null);
  const [buildApproachId, setBuildApproachId] = useState<BuildApproachId | null>(null);
  const [projectTypeId, setProjectTypeId] = useState<string | null>(null);
  const [packageId, setPackageId] = useState<PackageTierId | null>(null);
  const [typeSearch, setTypeSearch] = useState("");
  const [mobileStep, setMobileStep] = useState(1);

  const needsBuildApproach = serviceId ? serviceNeedsBuildApproach(serviceId) : false;
  const buildApproaches = serviceId ? getBuildApproaches(serviceId) : [];
  const typeStepNum = needsBuildApproach ? 3 : 2;
  const packageStepNum = needsBuildApproach ? 4 : 3;

  const activeStep = useMemo(() => {
    if (!serviceId) return 1;
    if (needsBuildApproach && !buildApproachId) return 2;
    if (!projectTypeId) return typeStepNum;
    return packageStepNum;
  }, [serviceId, needsBuildApproach, buildApproachId, projectTypeId, typeStepNum, packageStepNum]);

  const progressSteps = useMemo(() => {
    if (needsBuildApproach) {
      return [
        { num: 1, label: "Service", done: !!serviceId },
        { num: 2, label: "Build", done: !!buildApproachId },
        { num: 3, label: "Type", done: !!projectTypeId },
        { num: 4, label: "Package", done: !!packageId },
      ];
    }
    return [
      { num: 1, label: "Service", done: !!serviceId },
      { num: 2, label: "Type", done: !!projectTypeId },
      { num: 3, label: "Package", done: !!packageId },
    ];
  }, [needsBuildApproach, serviceId, buildApproachId, projectTypeId, packageId]);

  const displayStep = isMobile ? mobileStep : activeStep;
  const typeStepReady = !!serviceId && (!needsBuildApproach || !!buildApproachId);

  const projectTypes = serviceId ? projectTypesByService[serviceId] : [];
  const filteredTypes = useMemo(
    () =>
      projectTypes.filter((t) =>
        t.label.toLowerCase().includes(typeSearch.toLowerCase()),
      ),
    [projectTypes, typeSearch],
  );

  const selectedService = services.find((s) => s.id === serviceId);
  const selectedBuildApproach = buildApproaches.find((b) => b.id === buildApproachId);
  const selectedProject = projectTypes.find((p) => p.id === projectTypeId);
  const selectedPackage = packageTiers.find((p) => p.id === packageId);

  const handleServiceSelect = useCallback((id: ServiceId) => {
    setServiceId(id);
    setBuildApproachId(null);
    setProjectTypeId(null);
    setPackageId(null);
    setTypeSearch("");
    if (isMobile) setMobileStep(2);
  }, [isMobile]);

  const handleBuildSelect = useCallback((id: BuildApproachId) => {
    setBuildApproachId(id);
    setProjectTypeId(null);
    setPackageId(null);
    if (isMobile) setMobileStep(3);
  }, [isMobile]);

  const handleTypeSelect = useCallback((id: string) => {
    setProjectTypeId(id);
    setPackageId(null);
    if (isMobile) setMobileStep(packageStepNum);
  }, [isMobile, packageStepNum]);

  const estimates = useMemo(() => {
    if (!serviceId || !projectTypeId) return null;
    if (needsBuildApproach && !buildApproachId) return null;
    return Object.fromEntries(
      packageTiers.map((pkg) => [
        pkg.id,
        calculateEstimate(serviceId, projectTypeId, pkg.id, buildApproachId),
      ]),
    ) as Record<PackageTierId, ReturnType<typeof calculateEstimate>>;
  }, [serviceId, projectTypeId, buildApproachId, needsBuildApproach]);

  const activeEstimate =
    serviceId && projectTypeId && packageId
      ? calculateEstimate(serviceId, projectTypeId, packageId, buildApproachId)
      : null;

  const showSticky = !!(serviceId && projectTypeId && packageId && activeEstimate);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
  };

  const showStep = (step: number) => !isMobile || displayStep === step;

  return (
    <section
      id="plans"
      className={`relative scroll-mt-28 pt-4 sm:pt-6 ${showSticky ? "pb-44 sm:pb-48" : "pb-24 sm:pb-32"}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,122,0,0.08), transparent)",
        }}
      />

      <motion.div className="site-container relative">
        <ProgressIndicator currentStep={displayStep} steps={progressSteps} />

        {isMobile && displayStep > 1 && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMobileStep((s) => Math.max(1, s - 1))}
            className="mb-6 flex items-center gap-1.5 text-[13px] text-[#9CA3AF] transition-colors hover:text-white"
          >
            <MaterialIcon name="arrow_back" className="!text-[16px]" />
            Back
          </motion.button>
        )}

        {/* STEP 1 — Service */}
        <AnimatePresence mode="wait">
          {showStep(1) && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-12"
            >
              <StepHeader
                step={1}
                title="Choose your service"
                subtitle="Select the category that best matches your project vision."
              />
              <motion.div
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {services.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={serviceId === service.id}
                    onSelect={() => handleServiceSelect(service.id)}
                    index={i}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 2 — Build approach (Web & E-Commerce only) */}
        <AnimatePresence>
          {serviceId && needsBuildApproach && showStep(2) && (
            <motion.div
              key="step-build"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="mb-12"
            >
              <StepHeader
                step={2}
                title="Choose build approach"
                subtitle="CMS platforms cost less and launch faster. Custom builds offer full flexibility."
                selectedLabel={selectedService?.title}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {buildApproaches.map((approach, i) => (
                  <BuildApproachCard
                    key={approach.id}
                    approach={approach}
                    serviceId={serviceId}
                    selected={buildApproachId === approach.id}
                    onSelect={() => handleBuildSelect(approach.id)}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP — Project Type */}
        <AnimatePresence>
          {typeStepReady && showStep(typeStepNum) && (
            <motion.div
              key="step-type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="mb-12"
            >
              <StepHeader
                step={typeStepNum}
                title="Choose project type"
                subtitle={
                  selectedService
                    ? `What kind of ${selectedService.title.toLowerCase()} project are you building?`
                    : ""
                }
                selectedLabel={selectedService?.title}
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-5 flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{
                  background: "rgba(18,18,18,0.8)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <MaterialIcon name="search" className="!text-[18px] text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search project types..."
                  value={typeSearch}
                  onChange={(e) => setTypeSearch(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-[#9CA3AF]/60"
                />
                {typeSearch && (
                  <button
                    type="button"
                    onClick={() => setTypeSearch("")}
                    className="text-[#9CA3AF] hover:text-white"
                  >
                    <MaterialIcon name="close" className="!text-[16px]" />
                  </button>
                )}
              </motion.div>

              <motion.div className="flex flex-wrap gap-2.5 sm:gap-3" layout>
                {filteredTypes.map((type, i) => (
                  <ProjectTypeChip
                    key={type.id}
                    label={type.label}
                    selected={projectTypeId === type.id}
                    onSelect={() => handleTypeSelect(type.id)}
                    index={i}
                  />
                ))}
                {filteredTypes.length === 0 && (
                  <p className="py-8 text-center text-[14px] text-[#9CA3AF]">
                    No project types match your search.
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP — Packages */}
        <AnimatePresence>
          {projectTypeId && serviceId && typeStepReady && showStep(packageStepNum) && estimates && (
            <motion.div
              key="step-package"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              <StepHeader
                step={packageStepNum}
                title="Choose your package"
                subtitle="Three tiers designed for every stage of growth."
                selectedLabel={selectedProject?.label}
              />

              <div className="grid items-start gap-6 lg:grid-cols-3 lg:gap-5">
                {packageTiers.map((pkg, i) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    selected={packageId === pkg.id}
                    onSelect={() => setPackageId(pkg.id)}
                    estimate={estimates[pkg.id]}
                    index={i}
                  />
                ))}
              </div>

              <ComparisonSection
                selectedPackage={packageId}
                estimates={estimates}
              />

              {/* Live estimate preview before package selection */}
              {!packageId && estimates && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 rounded-[24px] p-5 text-center"
                  style={{
                    background: "rgba(255,122,0,0.06)",
                    border: "1px solid rgba(255,122,0,0.15)",
                  }}
                >
                  <p className="text-[13px] text-[#9CA3AF]">
                    Professional estimate:{" "}
                    <span className="font-semibold text-white">
                      {estimates.professional.priceFormatted}
                    </span>
                    {" · "}
                    <span className="text-white/70">{estimates.professional.timeline}</span>
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop: show collapsed step summaries */}
        {!isMobile && serviceId && activeStep > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <SelectedPill
              label={selectedService?.title ?? ""}
              onEdit={() => {
                setServiceId(null);
                setBuildApproachId(null);
                setProjectTypeId(null);
                setPackageId(null);
                setMobileStep(1);
              }}
            />
            {needsBuildApproach && buildApproachId && activeStep > 2 && (
              <SelectedPill
                label={selectedBuildApproach?.label ?? ""}
                onEdit={() => {
                  setBuildApproachId(null);
                  setProjectTypeId(null);
                  setPackageId(null);
                }}
              />
            )}
            {projectTypeId && activeStep > typeStepNum && (
              <SelectedPill
                label={selectedProject?.label ?? ""}
                onEdit={() => {
                  setProjectTypeId(null);
                  setPackageId(null);
                }}
              />
            )}
          </motion.div>
        )}
      </motion.div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {showSticky &&
              serviceId &&
              projectTypeId &&
              packageId &&
              activeEstimate &&
              selectedService &&
              selectedProject &&
              selectedPackage && (
                <StickySummary
                  serviceTitle={selectedService.title}
                  buildLabel={selectedBuildApproach?.label}
                  projectLabel={selectedProject.label}
                  packageName={selectedPackage.name}
                  priceFormatted={activeEstimate.priceFormatted}
                  timeline={activeEstimate.timeline}
                  estimateUrl={buildEstimateUrl(serviceId, projectTypeId, packageId, buildApproachId)}
                  contactUrl={buildContactUrl(serviceId, projectTypeId, packageId, buildApproachId)}
                />
              )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

function StepHeader({
  step,
  title,
  subtitle,
  selectedLabel,
}: {
  step: number;
  title: string;
  subtitle: string;
  selectedLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-xl text-[13px] font-bold"
          style={{ background: "rgba(255,122,0,0.15)", color: PRIMARY }}
        >
          {step}
        </span>
        {selectedLabel && (
          <span
            className="rounded-full px-3 py-1 text-[11px] font-medium"
            style={{
              background: "rgba(255,122,0,0.1)",
              color: PRIMARY,
              border: "1px solid rgba(255,122,0,0.2)",
            }}
          >
            {selectedLabel}
          </span>
        )}
      </div>
      <h2 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#9CA3AF]">{subtitle}</p>
    </motion.div>
  );
}

function SelectedPill({ label, onEdit }: { label: string; onEdit: () => void }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onEdit}
      className="flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium text-white/70 transition-colors hover:text-white"
      style={{
        background: "rgba(18,18,18,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <MaterialIcon name="check_circle" className="!text-[14px]" style={{ color: SUCCESS }} />
      {label}
      <MaterialIcon name="edit" className="!text-[13px] text-[#9CA3AF]" />
    </motion.button>
  );
}
