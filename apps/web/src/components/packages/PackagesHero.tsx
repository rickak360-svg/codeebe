"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";

export function PackagesHero() {
  return (
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
        className="pointer-events-none absolute -right-24 top-40 h-48 w-48 rounded-full opacity-20 blur-[80px]"
        style={{ background: "rgba(255,122,0,0.1)" }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div className="site-container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#FF7A00]/30" />
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#FF7A00]/70">
              Project Configurator
            </p>
            <span className="h-px w-10 bg-[#FF7A00]/30" />
          </div>

          <h1 className="font-[family-name:var(--font-family-display)] text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
            Configure your{" "}
            <span className="bg-gradient-to-r from-[#FF7A00] to-[#FF9333] bg-clip-text text-transparent">
              perfect build
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#9CA3AF]">
            A premium step-by-step configurator — choose your service, project type,
            and package. Get an instant estimate tailored to your scope.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            {[
              { icon: "tune", label: "3-step flow" },
              { icon: "payments", label: "Instant pricing" },
              { icon: "schedule", label: "Live timelines" },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.03, y: -1 }}
                className="flex items-center gap-1.5 rounded-xl px-3.5 py-2"
                style={{
                  background: "rgba(18,18,18,0.8)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <MaterialIcon name={item.icon} className="!text-[13px] text-[#FF7A00]/70" />
                <span className="font-mono text-[11px] text-[#9CA3AF]">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
