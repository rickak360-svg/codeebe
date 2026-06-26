"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "50+",  label: "Projects Delivered",  desc: "Across 8+ industries" },
  { value: "4+",   label: "Years Experience",     desc: "Product engineering" },
  { value: "98%",  label: "Client Satisfaction",  desc: "Based on reviews" },
  { value: "24h",  label: "Response Time",        desc: "Average first reply" },
  { value: "15+",  label: "Tech Specialisations", desc: "Frontend to cloud" },
  { value: "100%", label: "IP Ownership",         desc: "Transferred to you" },
];

export function AboutStats() {
  return (
    <section className="border-b border-white/[0.06] bg-white/[0.015]">
      <div className="site-container py-12">
        <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="flex flex-col items-center gap-1 p-5 text-center"
            >
              <p className="text-3xl font-extrabold text-[#ff6b00] sm:text-4xl">{s.value}</p>
              <p className="text-[12.5px] font-semibold text-white/70">{s.label}</p>
              <p className="text-[11px] text-white/30">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
