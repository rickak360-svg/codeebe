"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProjectBriefModal } from "@/components/landing/ProjectBriefModal";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { siteConfig } from "@/config/site";

const BENEFITS = [
  {
    icon: "auto_awesome",
    color: "#ff6b00",
    title: "AI-Powered Analysis",
    desc: "Your brief is analyzed instantly — project type, features, and timeline are pre-filled for you.",
  },
  {
    icon: "description",
    color: "#8b5cf6",
    title: "Full SRS Document",
    desc: "Receive a structured Software Requirements Specification with scope, tech stack, and functional requirements.",
  },
  {
    icon: "payments",
    color: "#10b981",
    title: "Transparent Estimate",
    desc: "Get a realistic INR cost range based on your selections — no hidden fees, no vague ballparks.",
  },
  {
    icon: "leaderboard",
    color: "#06b6d4",
    title: "Market Comparison",
    desc: "See how Codeebe compares to freelancers and large agencies in price, timeline, and what's included.",
  },
  {
    icon: "alt_route",
    color: "#f59e0b",
    title: "Delivery Roadmap",
    desc: "A phase-by-phase breakdown of how your project gets built and delivered.",
  },
  {
    icon: "mark_email_read",
    color: "#ec4899",
    title: "Sent to Your Inbox",
    desc: "Everything is emailed as a private quotation link valid for 24 hours — review it anytime.",
  },
];

const STEPS = [
  { step: "01", label: "What are you building?"  },
  { step: "02", label: "Platform & technology"   },
  { step: "03", label: "Key features"            },
  { step: "04", label: "Timeline"                },
  { step: "05", label: "Describe & submit"       },
];

export function EstimateLanding() {
  const [modalOpen, setModalOpen] = useState(false);

  // Auto-open wizard when landing on this page
  useEffect(() => {
    const t = setTimeout(() => setModalOpen(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <ProjectBriefModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#ff6b00]/[0.06] blur-[120px]" aria-hidden />
        <div className="pointer-events-none absolute -left-20 top-1/2 h-[300px] w-[300px] rounded-full bg-[#8b5cf6]/[0.04] blur-[100px]" aria-hidden />

        <div className="site-container relative z-10 pt-[8rem] pb-20 sm:pt-[9rem]">

          {/* ── Hero ── */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff6b00]/20 bg-[#ff6b00]/8 px-4 py-1.5"
            >
              <MaterialIcon name="bolt" className="!text-[14px] text-[#ff6b00]" />
              <span className="text-[12px] font-semibold text-[#ff6b00]">Free · No commitment · Under 2 minutes</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.4 }}
              className="font-[family-name:var(--font-family-display)] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.25rem]"
            >
              Get your project{" "}
              <span className="bg-gradient-to-r from-[#ff6b00] to-[#ff9a00] bg-clip-text text-transparent">
                estimate & SRS
              </span>{" "}
              in minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.38 }}
              className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/50"
            >
              Answer 5 guided questions about your project. Our system instantly generates a detailed
              quotation, SRS, market comparison, and delivery roadmap — sent straight to your inbox.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.36 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <motion.button
                type="button"
                onClick={() => setModalOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-7 py-3.5 text-[15px] font-semibold text-[#1a0a00] shadow-[0_8px_32px_-8px_rgba(255,107,0,0.6)] transition-colors hover:bg-[#ff8533]"
              >
                <MaterialIcon name="rocket_launch" className="!text-[17px]" />
                Start My Project Brief
              </motion.button>
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/10 px-7 py-3.5 text-[15px] font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
              >
                <MaterialIcon name="calendar_today" className="!text-[16px]" />
                Book a Discovery Call
              </a>
            </motion.div>
          </div>

          {/* ── Process steps ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.4 }}
            className="mx-auto mb-16 max-w-3xl"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                How it works — 5 steps
              </p>
              <div className="flex flex-wrap items-center gap-y-3">
                {STEPS.map((s, i) => (
                  <div key={s.step} className="flex items-center">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff6b00]/15 text-[10px] font-bold text-[#ff6b00]">
                        {s.step}
                      </span>
                      <span className="text-[12.5px] font-medium text-white/65">{s.label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <span className="mx-3 text-white/15">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Benefits grid ── */}
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
                What you receive
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 + i * 0.06, duration: 0.36 }}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                >
                  {/* Subtle color glow */}
                  <div
                    className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                    style={{ background: b.color }}
                    aria-hidden
                  />
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${b.color}18` }}
                  >
                    <MaterialIcon name={b.icon} className="!text-[20px]" style={{ color: b.color }} />
                  </div>
                  <p className="mb-1.5 text-[13.5px] font-semibold text-white/85">{b.title}</p>
                  <p className="text-[12.5px] leading-relaxed text-white/40">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="mx-auto mt-14 max-w-lg text-center"
          >
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#ff6b00]/20 bg-[#ff6b00]/8 py-4 text-sm font-semibold text-[#ff6b00] transition-all hover:bg-[#ff6b00]/15"
            >
              <MaterialIcon name="auto_awesome" className="!text-[16px] transition-transform group-hover:rotate-12" />
              Open Project Brief Wizard
              <MaterialIcon name="arrow_forward" className="!text-[15px] transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-[11px] text-white/25">
              Free · No sign-up required · Quotation link expires in 24h
            </p>
          </motion.div>

        </div>
      </div>
    </>
  );
}
