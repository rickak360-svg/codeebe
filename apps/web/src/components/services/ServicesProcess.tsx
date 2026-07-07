"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";

const STEPS = [
  { icon: "record_voice_over", color: "#ff6b00", step: "01", title: "Discovery Call",       desc: "30-min session to understand your vision, users, and constraints. We ask the hard questions early so the build goes smoothly." },
  { icon: "assignment",        color: "#8b5cf6", step: "02", title: "SRS & Proposal",        desc: "We create a structured SRS document with feature scope, tech decisions, timeline, and a line-item estimate before any code is written." },
  { icon: "design_services",   color: "#10b981", step: "03", title: "UI/UX Design",          desc: "Figma designs for every screen. You approve flows and visuals before we build — zero surprises in the frontend." },
  { icon: "code",              color: "#3b82f6", step: "04", title: "Sprint-based Build",    desc: "Two-week sprints with demos, a shared task board, and daily status updates. You always know exactly where we are." },
  { icon: "bug_report",        color: "#f59e0b", step: "05", title: "QA & Hardening",        desc: "Automated tests, cross-browser checks, load testing, and a security sweep before we touch production." },
  { icon: "rocket_launch",     color: "#ef4444", step: "06", title: "Launch & Handover",     desc: "Deployment, domain setup, monitoring, and a full handover package — including documentation and a recorded walkthrough." },
];

export function ServicesProcess() {
  return (
    <section id="process" className="scroll-mt-28 py-20 sm:py-24">
      <div className="site-container">
        <div className="mb-12 text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b00]/80">Delivery Model</p>
          <h2 className="font-[family-name:var(--font-family-display)] text-3xl font-bold text-white sm:text-4xl">
            How we deliver
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[14px] text-white/45">
            A transparent, phased process that keeps your project on track from brief to launch.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.38 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              {/* step number watermark */}
              <p className="absolute -right-2 -top-3 select-none font-mono text-6xl font-extrabold text-white/[0.03]">
                {step.step}
              </p>
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{ background: `${step.color}18` }}
              >
                <MaterialIcon name={step.icon} className="!text-[20px]" style={{ color: step.color }} />
              </div>
              <p className="mb-0.5 font-mono text-[10px] font-bold tracking-widest" style={{ color: step.color }}>
                STEP {step.step}
              </p>
              <h3 className="mb-2 text-[14px] font-semibold text-white/90">{step.title}</h3>
              <p className="text-[12.5px] leading-relaxed text-white/45">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
