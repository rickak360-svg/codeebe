"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";

const PILLARS = [
  { icon: "lightbulb",    color: "#ff6b00", title: "Product-First Thinking",   body: "We start with outcomes and user journeys — not a feature list. Every technical decision traces back to product goals." },
  { icon: "account_tree", color: "#8b5cf6", title: "Clean Architecture",        body: "Modular systems you can extend in a year without rewriting everything. We design for the team that comes after us." },
  { icon: "speed",        color: "#10b981", title: "Scalable MVP Approach",     body: "Launch fast with foundations that support real growth. No throwaway prototypes — every line of code earns its place." },
  { icon: "handshake",    color: "#06b6d4", title: "Transparent Partnership",   body: "Weekly visibility, honest timelines, and clear assumptions before any build begins. No surprises at invoice time." },
];

export function AboutMission() {
  return (
    <section id="mission" className="scroll-mt-28 py-20 sm:py-24">
      <div className="site-container">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Left: story */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">
              Our Mission
            </p>
            <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold leading-tight text-white sm:text-4xl">
              Engineering partners,{" "}
              <span className="text-[#ff6b00]">not just vendors</span>
            </h2>
            <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-white/50">
              <p>
                Codeebe was built out of frustration. Too many founders came to us after being burned
                by agencies that over-promised, under-delivered, and left them with unmaintainable code.
              </p>
              <p>
                We set out to do it differently — to be the engineering team you actually want: one
                that understands product, communicates clearly, and builds things that last.
              </p>
              <p>
                Today we partner with founders, startups, and scaling businesses across India and
                globally to build SaaS products, AI systems, marketplaces, and custom platforms
                with the care and rigor of an in-house team.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["A", "R", "S"].map((l) => (
                  <div key={l} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-[#ff6b00]/20 text-xs font-bold text-[#ff6b00]">
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/40">Core team of engineers, designers & product thinkers</p>
            </div>
          </motion.div>

          {/* Right: pillars */}
          <div className="grid gap-3 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.38 }}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-white/10"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${p.color}18` }}>
                  <MaterialIcon name={p.icon} className="!text-[18px]" style={{ color: p.color }} />
                </div>
                <p className="mb-1.5 text-[13px] font-semibold text-white/85">{p.title}</p>
                <p className="text-[12px] leading-relaxed text-white/40">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
