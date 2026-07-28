"use client";

import { motion } from "framer-motion";
import { MaterialIcon } from "@/components/home/MaterialIcon";
import { useTheme } from "./theme";

/* A signature background animation per industry, driven by theme.motif.
   All are purely decorative and pointer-events-none. */
export function HeroMotif() {
  const t = useTheme();
  switch (t.motif) {
    case "pulse":
      return <PulseMotif />;
    case "heartbeat":
      return <HeartbeatMotif />;
    case "shimmer":
      return <ShimmerMotif />;
    case "confetti":
      return <ConfettiMotif />;
    default:
      return null;
  }
}

/* ── Gym: expanding energy rings + neon pulse ── */
function PulseMotif() {
  const t = useTheme();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/3 rounded-full border"
          style={{ borderColor: t.primary, width: 200, height: 200, x: "-50%", y: "-50%" }}
          initial={{ scale: 0.4, opacity: 0.5 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
        />
      ))}
      <div className="absolute bottom-0 left-0 flex h-40 w-full items-end justify-around opacity-[0.12]">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-t-full"
            style={{ background: t.primary }}
            animate={{ height: [8, 20 + (i % 7) * 10, 8] }}
            transition={{ duration: 1 + (i % 5) * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Clinic: animated ECG heartbeat line ── */
function HeartbeatMotif() {
  const t = useTheme();
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[38%] overflow-hidden opacity-70">
      <svg viewBox="0 0 1200 120" className="w-full" preserveAspectRatio="none" height={120}>
        <motion.path
          d="M0,60 L280,60 L310,60 L330,20 L360,100 L390,40 L410,60 L700,60 L730,60 L750,25 L780,95 L810,45 L830,60 L1200,60"
          fill="none"
          stroke={t.primary}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ── Barber: drifting gold grooming icons + shimmer ── */
function ShimmerMotif() {
  const t = useTheme();
  const icons = ["content_cut", "brush", "styler", "content_cut", "auto_awesome"];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {icons.map((ic, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${8 + i * 20}%`, top: `${20 + (i % 3) * 22}%`, color: t.primary, opacity: 0.14 }}
          animate={{ y: [0, -22, 0], rotate: [0, i % 2 ? 12 : -12, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        >
          <MaterialIcon name={ic} className="!text-[38px]" />
        </motion.div>
      ))}
      <motion.div
        className="absolute -top-1/3 left-1/4 h-[160%] w-40 rotate-12"
        style={{ background: `linear-gradient(90deg, transparent, ${t.glow}, transparent)` }}
        animate={{ x: ["-20%", "260%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ── Event: falling confetti + spotlight sweep ── */
function ConfettiMotif() {
  const t = useTheme();
  const colors = [t.primary, t.secondary, "#ffffff", t.primary];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute top-[-6%] rounded-[2px]"
          style={{
            left: `${(i * 4.6) % 100}%`,
            width: i % 3 ? 6 : 8,
            height: i % 3 ? 10 : 6,
            background: colors[i % colors.length],
            opacity: 0.5,
          }}
          animate={{ y: ["0vh", "115vh"], rotate: [0, 360], x: [0, i % 2 ? 30 : -30, 0] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: "linear", delay: i * 0.4 }}
        />
      ))}
      <motion.div
        className="absolute -top-24 left-1/2 h-[140%] w-64 -translate-x-1/2"
        style={{ background: `conic-gradient(from 180deg at 50% 0%, transparent, ${t.glow}, transparent)`, filter: "blur(6px)" }}
        animate={{ rotate: [-14, 14, -14] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
