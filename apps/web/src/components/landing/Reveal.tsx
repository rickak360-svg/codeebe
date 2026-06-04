"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, defaultTransition } from "@/lib/motion";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
  variants?: Variants;
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variants = fadeUp,
}: Props) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      transition={{ ...defaultTransition(reduced), delay: reduced ? 0 : delay }}
    >
      {children}
    </Component>
  );
}
