"use client";

import { motion } from "framer-motion";
import { whyCodeebeItems } from "@/data/landing";
import { MaterialIcon } from "@/components/home/MaterialIcon";

export function AboutValues() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-24">
      <div className="site-container">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">Why Codeebe</p>
          <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white sm:text-4xl">
            Built for founders who need a{" "}
            <span className="text-[#ff6b00]">real engineering partner</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyCodeebeItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.38 }}
              className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff6b00]/12">
                <MaterialIcon name={item.icon} className="!text-[22px] text-[#ff6b00]" />
              </div>
              <h3 className="mb-2 text-[14px] font-semibold text-white/90">{item.title}</h3>
              <p className="text-[13px] leading-relaxed text-white/45">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
