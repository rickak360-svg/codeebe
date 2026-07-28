"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { services, formatINR } from "@/data/configurator";

const PRIMARY = "#FF7A00";

export function PackagesHub() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[9rem] pb-4 sm:pt-[10rem] sm:pb-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,122,0,0.06), transparent 70%)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full opacity-30 blur-[100px]"
          style={{ background: "rgba(255,122,0,0.15)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="site-container relative mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#FF7A00]/30" />
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#FF7A00]/70">
              Fixed-price packages
            </p>
            <span className="h-px w-10 bg-[#FF7A00]/30" />
          </div>

          <h1 className="font-[family-name:var(--font-family-display)] text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
            All{" "}
            <span className="bg-gradient-to-r from-[#FF7A00] to-[#FF9333] bg-clip-text text-transparent">
              Packages
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#9CA3AF]">
            Choose your industry or project type — every package includes hosting and support with clear, fixed pricing.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            {[
              { icon: "payments", label: "Fixed pricing" },
              { icon: "cloud", label: "1 year hosting" },
              { icon: "support_agent", label: "Support included" },
              { icon: "inventory_2", label: `${services.length} categories` },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5 rounded-xl px-3.5 py-2"
                style={{
                  background: "rgba(18,18,18,0.8)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <MaterialIcon name={item.icon} className="!text-[13px] text-[#FF7A00]/70" />
                <span className="font-mono text-[11px] text-[#9CA3AF]">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Package grid */}
      <section className="pb-24 pt-8 sm:pb-32 sm:pt-12">
        <div className="site-container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[24px] p-6"
                style={{
                  background: "rgba(18,18,18,0.7)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,122,0,0.07), transparent)",
                  }}
                />

                {/* Popular badge */}
                {service.plans.some((p) => p.popular) && (
                  <div
                    className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
                    style={{ background: "rgba(255,122,0,0.15)", color: PRIMARY }}
                  >
                    Popular
                  </div>
                )}

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: "rgba(255,122,0,0.12)" }}
                  >
                    <MaterialIcon
                      name={service.icon}
                      className="!text-[24px]"
                      style={{ color: PRIMARY }}
                    />
                  </div>

                  {/* Emoji + title */}
                  <h3 className="mb-1 font-[family-name:var(--font-family-display)] text-lg font-bold text-white sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mb-5 text-[13px] leading-relaxed text-[#9CA3AF]">
                    {service.description}
                  </p>

                  {/* Price + plan count */}
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">From</span>
                      <span className="font-[family-name:var(--font-family-display)] text-base font-bold text-white">
                        {formatINR(service.startingPrice)}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#9CA3AF]">
                      {service.plans.length} plan{service.plans.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Plan name chips */}
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {service.plans.map((p) => (
                      <span
                        key={p.id}
                        className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                        style={{
                          background: p.popular ? "rgba(255,122,0,0.12)" : "rgba(255,255,255,0.04)",
                          color: p.popular ? PRIMARY : "#9CA3AF",
                          border: p.popular
                            ? "1px solid rgba(255,122,0,0.2)"
                            : "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/packages/${service.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition-all duration-200 group-hover:shadow-[0_8px_32px_-8px_rgba(255,122,0,0.4)]"
                    style={{
                      background: "rgba(255,122,0,0.1)",
                      color: PRIMARY,
                      border: "1px solid rgba(255,122,0,0.2)",
                    }}
                  >
                    View packages
                    <MaterialIcon
                      name="arrow_forward"
                      className="!text-[16px] transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="mt-16 text-center"
          >
            <div
              className="inline-block rounded-[24px] p-8 sm:p-10"
              style={{
                background:
                  "linear-gradient(165deg, rgba(255,122,0,0.08) 0%, rgba(18,18,18,0.9) 60%)",
                border: "1px solid rgba(255,122,0,0.15)",
                backdropFilter: "blur(20px)",
              }}
            >
              <MaterialIcon name="support_agent" className="!text-[32px] mb-4" style={{ color: PRIMARY }} />
              <h3 className="font-[family-name:var(--font-family-display)] text-xl font-bold text-white sm:text-2xl">
                Not sure which package fits?
              </h3>
              <p className="mt-2 text-[14px] text-[#9CA3AF]">
                Use our configurator to explore all options or talk to an expert.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/packages/configurator"
                  className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-[#090909]"
                  style={{ background: PRIMARY }}
                >
                  <MaterialIcon name="tune" className="!text-[16px]" />
                  Open configurator
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-sm text-white/70 hover:text-white"
                >
                  <MaterialIcon name="chat" className="!text-[16px]" />
                  Talk to us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
