"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function GlassCard({ children, className = "", hover = true }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={
        hover && !reduced
          ? {
              y: -4,
              borderColor: "rgba(255, 107, 0, 0.35)",
              boxShadow: "0 20px 50px rgba(255, 107, 0, 0.12)",
            }
          : undefined
      }
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
