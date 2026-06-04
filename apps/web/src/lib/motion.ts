export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const floatY = (distance = 8, duration = 5) => ({
  y: [0, -distance, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

export const defaultTransition = (reduced: boolean) => ({
  duration: reduced ? 0.01 : 0.55,
  ease: easeOut,
});
