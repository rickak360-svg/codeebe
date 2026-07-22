"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import {
  packages,
  comparisonFeatureLabels,
  packageHasFeature,
} from "@/data/packages";

export function PackagesCompare() {
  return (
    <section id="compare" className="scroll-mt-28 border-t border-white/[0.06] py-16 sm:py-20">
      <div className="site-container">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">
            Compare
          </p>
          <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white sm:text-4xl">
            Side-by-side checklist
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-white/45">
            See exactly what&apos;s included in each package before you decide.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02]"
        >
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  Feature
                </th>
                {packages.map((pkg) => (
                  <th key={pkg.id} className="px-4 py-4 text-center">
                    <span
                      className="mb-1 block text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: `${pkg.color}cc` }}
                    >
                      {pkg.popular ? "Popular" : "\u00a0"}
                    </span>
                    <span className="block text-[13px] font-semibold text-white">{pkg.name}</span>
                    <span className="mt-0.5 block text-[11px] text-white/35">{pkg.priceFrom}+</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatureLabels.map((label, i) => (
                <tr
                  key={label}
                  className={i % 2 === 0 ? "bg-white/[0.015]" : ""}
                >
                  <td className="px-5 py-3.5 text-[13px] text-white/60">{label}</td>
                  {packages.map((pkg) => {
                    const ok = packageHasFeature(pkg, label);
                    return (
                      <td key={pkg.id} className="px-4 py-3.5 text-center">
                        <span
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                          style={{
                            background: ok ? `${pkg.color}20` : "rgba(255,255,255,0.03)",
                            color: ok ? pkg.color : "rgba(255,255,255,0.18)",
                          }}
                        >
                          <MaterialIcon
                            name={ok ? "check" : "remove"}
                            className="!text-[14px]"
                          />
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: `${pkg.color}bb` }}>
                Best for
              </p>
              <div className="flex flex-wrap gap-1.5">
                {pkg.bestFor.map((b) => (
                  <span
                    key={b}
                    className="rounded-md border border-white/[0.06] px-2 py-0.5 text-[11px] text-white/50"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
