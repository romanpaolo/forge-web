"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const transition = (delay: number) => ({
  duration: 0.6,
  ease: "easeOut" as const,
  delay,
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden py-24 md:py-32 pt-32"
      style={{
        background:
          "radial-gradient(ellipse at 50% 120%, rgba(249,115,22,0.15) 0%, transparent 60%), linear-gradient(to bottom, #0F172A, #1E293B)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transition(0)}
        >
          <SectionLabel>Built for Contractors. Powered by AI.</SectionLabel>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mt-8"
          style={{ fontFamily: "var(--font-heading)" }}
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transition(0)}
        >
          <span className="text-forge-white block">One Walk. Zero Typing.</span>
          <span className="text-forge-orange block">Job-Ready Data.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-forge-smoke text-lg md:text-xl leading-relaxed mt-6 max-w-2xl mx-auto"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transition(0.15)}
        >
          Forge turns a single job walk into structured scope, tasks by trade, and
          export-ready packets — no clipboard, no copy-paste, no wasted hours.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transition(0.3)}
        >
          <Button href="#pricing" variant="primary" size="md">
            Get Early Access
          </Button>
          <Button href="#how-it-works" variant="secondary" size="md">
            See How It Works
          </Button>
        </motion.div>

        {/* Social proof quote */}
        <motion.blockquote
          className="border-t border-forge-graphite pt-8 mt-12 max-w-2xl mx-auto"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transition(0.45)}
        >
          <p className="text-forge-smoke italic text-base md:text-lg leading-relaxed">
            &ldquo;We were wasting 30 minutes after every walk just getting notes into
            Buildertrend. That&apos;s gone now.&rdquo; &mdash; Christian, General Contractor
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
