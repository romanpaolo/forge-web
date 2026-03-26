"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Smartphone, Mic, Bot, ClipboardList } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

const BULLET_POINTS = [
  "20–40 min wasted per job walk",
  "Data scattered across 4 tools",
  "Inconsistent formatting every time",
  "Critical details lost in translation",
];

const FLOW_CARDS = [
  { name: "Meta Glasses", Icon: Smartphone },
  { name: "Otter.ai", Icon: Mic },
  { name: "ChatGPT", Icon: Bot },
  { name: "Buildertrend", Icon: ClipboardList },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
      delay: i * 0.15,
    },
  }),
};

const strikeVariants: Variants = {
  hidden: { width: "0%" },
  visible: {
    width: "100%",
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
      delay: FLOW_CARDS.length * 0.15 + 0.3,
    },
  },
};

export default function Problem() {
  return (
    <section id="product" className="py-24 md:py-32 bg-forge-iron">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column */}
          <motion.div
            {...fadeUp}
            className="flex flex-col gap-6"
          >
            <SectionLabel>THE PROBLEM</SectionLabel>

            <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.01em] uppercase text-forge-white leading-tight">
              Your Job Walks Are Costing You Hours, Not Minutes
            </h2>

            <p className="text-forge-smoke text-lg leading-relaxed">
              Every walk means juggling 4+ tools, copying notes between apps,
              and reformatting everything before your PM can even touch it.
            </p>

            <ul className="flex flex-col gap-3 mt-2">
              {BULLET_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <ArrowRight
                    size={18}
                    className="text-forge-cyan flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-forge-ash">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right column — animated flow diagram */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            {/* 2x2 card grid */}
            <div className="grid grid-cols-2 gap-4 relative">
              {FLOW_CARDS.map(({ name, Icon }, i) => (
                <motion.div
                  key={name}
                  custom={i}
                  variants={cardVariants}
                  className="bg-forge-steel/50 border border-forge-smoke/20 rounded-xl p-6 flex flex-col items-center gap-3 text-center"
                >
                  <Icon size={28} className="text-forge-smoke" aria-hidden="true" />
                  <span className="text-forge-ash text-sm font-medium">{name}</span>
                </motion.div>
              ))}

              {/* Strikethrough line — centered vertically across the grid */}
              <div
                className="absolute inset-0 flex items-center pointer-events-none"
                aria-hidden="true"
              >
                <motion.div
                  variants={strikeVariants}
                  className="h-0.5 bg-forge-cyan rounded-full"
                  style={{ width: "0%" }}
                />
              </div>
            </div>

            {/* Dashed connectors between columns (horizontal center line) */}
            <div
              className="absolute top-1/2 left-0 right-0 -translate-y-1/2 border-t border-dashed border-forge-smoke/20 pointer-events-none -z-10"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 border-l border-dashed border-forge-smoke/20 pointer-events-none -z-10"
              aria-hidden="true"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
