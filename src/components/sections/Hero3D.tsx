"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";

const HexNutScene = dynamic(() => import("@/components/three/HexNutScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-forge-body" />,
});

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function CharacterReveal({ text, className, delay = 0, stagger = 0.03 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const containerVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const wordVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: stagger },
    },
  };
  const child = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      aria-label={text}
    >
      {words.map((word, wi) => (
        <motion.span key={wi} variants={wordVariants} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, ci) => (
            <motion.span key={ci} variants={child} style={{ display: "inline-block" }}>
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </motion.span>
      ))}
    </motion.span>
  );
}

const transition = (delay: number) => ({
  duration: 0.8,
  ease: "easeOut" as const,
  delay,
});

export default function Hero3D() {
  return (
    <section id="hero" className="relative overflow-hidden h-screen flex flex-col">
      {/* 3D Background — fills entire viewport */}
      <Suspense fallback={<div className="absolute inset-0 bg-forge-body" />}>
        <HexNutScene />
      </Suspense>

      {/* Bottom-anchored content — sits below the 3D scene */}
      <div className="relative z-10 mt-auto pb-16 md:pb-20">
        {/* Gradient fade from transparent to dark at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-forge-body via-forge-body/80 to-transparent pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Workflow indicator — spatial UI style */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={transition(0.2)}
          >
            {["CAPTURE", "STRUCTURE", "EXPORT"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                {i > 0 && <div className="w-8 h-px bg-forge-graphite" />}
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-forge-cyan" : i === 1 ? "bg-forge-teal" : "bg-forge-ash/40"}`} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-forge-smoke">{step}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Headline — left-aligned, big, cinematic with character animation */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-medium tracking-[-0.03em] leading-[0.9] text-forge-white uppercase">
            <CharacterReveal text="One Walk." delay={0.4} stagger={0.04} />
            <br />
            <CharacterReveal text="Zero Typing." delay={0.8} stagger={0.04} className="text-forge-ash/40" />
          </h1>

          {/* Subtext + CTA row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-8">
            <motion.p
              className="text-forge-smoke text-base md:text-lg leading-relaxed max-w-md"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={transition(0.6)}
            >
              Forge captures, structures, and exports your job walk,
              replacing four tools with one spatial workflow.
            </motion.p>

            <motion.div
              className="flex items-center gap-3"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={transition(0.8)}
            >
              <Button href="https://calendly.com/christian-forge/30min" target="_blank" rel="noopener noreferrer" variant="primary" size="md">
                Join Founders Council
              </Button>
              <Button href="#how-it-works" variant="secondary" size="md">
                How It Works
              </Button>
            </motion.div>
          </div>

          {/* Bottom stat bar — AR-style data readout */}
          <motion.div
            className="flex items-center gap-8 mt-12 pt-6 border-t border-forge-graphite/30"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={transition(1.0)}
          >
            {[
              { value: "20+", label: "MIN SAVED" },
              { value: "1", label: "WORKFLOW" },
              { value: "0", label: "TYPING" },
              { value: "6", label: "TRADES" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-medium text-forge-white font-[family-name:var(--font-mono)]">{value}</span>
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-smoke">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
