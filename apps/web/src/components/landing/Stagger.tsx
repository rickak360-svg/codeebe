"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, defaultTransition } from "@/lib/motion";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
};

export function Stagger({ children, className, once = true }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={defaultTransition(reduced)}
    >
      {children}
    </motion.div>
  );
}
