export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(249,115,22,0.2)",
      "0 0 40px rgba(249,115,22,0.4)",
      "0 0 20px rgba(249,115,22,0.2)",
    ],
  },
  transition: { duration: 2, repeat: Infinity },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};
