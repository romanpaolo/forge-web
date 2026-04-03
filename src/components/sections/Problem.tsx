"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Smartphone, Mic, FileSpreadsheet, ClipboardList } from "lucide-react";
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
  { name: "LLM-Embedded", Icon: FileSpreadsheet },
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
    <section
      id="product"
      className="relative py-24 md:py-32 bg-transparent overflow-hidden"
    >
      {/* Spatial dot grid background — parallax layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" data-speed="0.85">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #94A3B8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Subtle radial glow */}
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left column */}
          <motion.div
            {...fadeUp}
            className="flex flex-col gap-6"
          >
            <SectionLabel>THE PROBLEM</SectionLabel>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-[-0.01em] uppercase text-forge-white leading-tight">
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

          {/* Right column — spatial flow diagram */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            {/* Scanning line animation */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-forge-cyan/40 to-transparent pointer-events-none z-10"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Corner brackets — spatial UI frame */}
            <div className="absolute -inset-3 pointer-events-none" aria-hidden="true">
              {/* Top-left */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-forge-graphite/50" />
              {/* Top-right */}
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-forge-graphite/50" />
              {/* Bottom-left */}
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-forge-graphite/50" />
              {/* Bottom-right */}
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-forge-graphite/50" />
            </div>

            {/* Status indicator — top right */}
            <div className="absolute -top-6 right-0 flex items-center gap-2 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400/70 animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-smoke">4 tools detected</span>
            </div>

            {/* 2x2 card grid */}
            <div className="grid grid-cols-2 gap-3 relative">
              {FLOW_CARDS.map(({ name, Icon }, i) => (
                <motion.div
                  key={name}
                  custom={i}
                  variants={cardVariants}
                  className="relative bg-forge-steel/30 backdrop-blur-sm border border-forge-smoke/10 p-6 flex flex-col items-center gap-3 text-center group"
                >
                  {/* Corner dots */}
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                  <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                  <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                  <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-forge-graphite" />

                  <Icon size={28} className="text-forge-smoke/70" aria-hidden="true" />
                  <span className="text-forge-ash text-sm font-medium font-[family-name:var(--font-mono)] uppercase tracking-wider">{name}</span>

                  {/* Tool index */}
                  <span className="absolute top-2 right-3 text-[8px] font-mono text-forge-graphite">0{i + 1}</span>
                </motion.div>
              ))}

              {/* Strikethrough line */}
              <div
                className="absolute inset-0 flex items-center pointer-events-none"
                aria-hidden="true"
              >
                <motion.div
                  variants={strikeVariants}
                  className="h-0.5 bg-gradient-to-r from-forge-cyan via-forge-cyan to-forge-cyan/30 rounded-full"
                  style={{ width: "0%" }}
                />
              </div>
            </div>

            {/* Dashed connectors */}
            <div
              className="absolute top-1/2 left-0 right-0 -translate-y-1/2 border-t border-dashed border-forge-smoke/10 pointer-events-none -z-10"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 border-l border-dashed border-forge-smoke/10 pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Bottom label */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-8 h-px bg-forge-graphite" />
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-graphite">fragmented workflow</span>
              <div className="w-8 h-px bg-forge-graphite" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
