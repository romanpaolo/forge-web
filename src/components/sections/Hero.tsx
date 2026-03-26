"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

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
      className="relative overflow-hidden py-24 md:py-40 pt-32"
      style={{
        background:
          "radial-gradient(ellipse at 50% 120%, rgba(14,165,233,0.08) 0%, transparent 60%), linear-gradient(to bottom, #050507, #0A0A0F)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          className="text-forge-smoke text-sm uppercase tracking-[0.2em] font-medium font-[family-name:var(--font-mono)]"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transition(0)}
        >
          The Operating System for Field Intelligence
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.02em] leading-[1.0] mt-8 text-forge-white uppercase"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transition(0.1)}
        >
          One Walk. Zero Typing.
          <br />
          <span className="text-forge-ash">Job-Ready Data.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-forge-smoke text-lg md:text-xl leading-relaxed mt-8 max-w-2xl mx-auto"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transition(0.2)}
        >
          Forge turns a single job walk into structured scope, tasks by trade, and
          export-ready packets — no clipboard, no copy-paste, no wasted hours.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={transition(0.3)}
        >
          <Button href="#pricing" variant="primary" size="md">
            Join Founders Council
          </Button>
          <Button href="#how-it-works" variant="secondary" size="md">
            See How It Works
          </Button>
        </motion.div>

        {/* Social proof quote */}
        <motion.blockquote
          className="border-t border-forge-graphite/50 pt-8 mt-16 max-w-2xl mx-auto"
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
