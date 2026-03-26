"use client";

import { motion } from "framer-motion";
import { Eye, Scan, Layers, Radio, Compass, Database } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import { fadeUp } from "@/lib/animations";

const SPATIAL_FEATURES = [
  {
    icon: Eye,
    title: "Spatial Capture",
    description: "Walk the job with AR-enabled glasses or your phone. Every surface, measurement, and observation is spatially anchored to the real world.",
    tag: "capture",
  },
  {
    icon: Scan,
    title: "Real-Time Scanning",
    description: "Forge scans your environment as you walk — identifying rooms, surfaces, and conditions in real time. No typing, no manual tagging.",
    tag: "scan",
  },
  {
    icon: Layers,
    title: "Layered Intelligence",
    description: "Scope items, tasks by trade, and open questions are structured in spatial layers — each one anchored to the exact location it references.",
    tag: "layers",
  },
  {
    icon: Radio,
    title: "Field-to-Office Sync",
    description: "Data flows from the field to your PM in real time. No reformatting, no copy-paste. The office sees what you see, structured and ready.",
    tag: "sync",
  },
  {
    icon: Compass,
    title: "Spatial Navigation",
    description: "Revisit any job walk in a spatial timeline. Tap a room to see every note, photo, and task associated with that exact location.",
    tag: "navigate",
  },
  {
    icon: Database,
    title: "Structured Export",
    description: "One tap to export spatially organized data into Buildertrend, PDF packets, or PM handoff emails — with every detail in context.",
    tag: "export",
  },
];

export default function SpatialVision() {
  return (
    <section className="relative py-24 md:py-32 bg-forge-iron overflow-hidden">
      {/* Spatial dot grid background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #94A3B8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-forge-cyan/30 to-transparent pointer-events-none z-10"
        aria-hidden="true"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <motion.div {...fadeUp}>
            <SectionLabel>SPATIAL COMPUTING</SectionLabel>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-medium tracking-[-0.01em] uppercase text-forge-white mt-6"
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Built for the Next Era of Field Work
          </motion.h2>

          <motion.p
            className="text-forge-smoke text-lg max-w-2xl mx-auto mt-4"
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Forge is designed from the ground up for spatial computing — where your job walk data
            isn&apos;t just structured, it&apos;s spatially anchored to the real world.
          </motion.p>

          {/* Status indicator */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-4"
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            aria-hidden="true"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-forge-teal animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-smoke">spatial-ready architecture</span>
          </motion.div>
        </div>

        {/* Spatial workflow visualization */}
        <motion.div
          className="relative mt-16 mb-20"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <div className="relative max-w-3xl mx-auto">
            {/* Corner brackets */}
            <div className="absolute -inset-6 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-forge-graphite/50" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-forge-graphite/50" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-forge-graphite/50" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-forge-graphite/50" />
            </div>

            {/* AR viewport simulation */}
            <div className="bg-forge-steel/20 border border-forge-graphite/30 p-8 md:p-12">
              {/* Viewport header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-forge-teal animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-forge-smoke">spatial view / active</span>
                </div>
                <span className="text-[9px] font-mono text-forge-graphite">forge v1.0</span>
              </div>

              {/* Spatial data flow */}
              <div className="flex items-center justify-center gap-4 md:gap-8">
                {["Walk", "Scan", "Structure", "Export"].map((step, i) => (
                  <div key={step} className="flex items-center gap-4 md:gap-8">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 md:w-12 md:h-12 border flex items-center justify-center ${
                        i === 0 ? "border-forge-cyan/40 bg-forge-cyan/5" : "border-forge-graphite/40 bg-forge-steel/30"
                      }`}>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-forge-ash">0{i + 1}</span>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-forge-smoke">{step}</span>
                    </div>
                    {i < 3 && (
                      <div className="w-6 md:w-12 h-px bg-gradient-to-r from-forge-graphite/50 to-forge-graphite/20" />
                    )}
                  </div>
                ))}
              </div>

              {/* Viewport metrics bar */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-forge-graphite/20">
                {[
                  { label: "LATENCY", value: "<50ms" },
                  { label: "ACCURACY", value: "99.2%" },
                  { label: "SPATIAL RES", value: "1cm" },
                  { label: "SYNC", value: "REAL-TIME" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span className="text-sm md:text-base font-mono text-forge-white">{value}</span>
                    <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-forge-graphite">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPATIAL_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.tag}
                {...fadeUp}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + index * 0.08 }}
              >
                <Card className="relative h-full p-6">
                  {/* Corner dots */}
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-forge-graphite" aria-hidden="true" />
                  <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-forge-graphite" aria-hidden="true" />
                  <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-forge-graphite" aria-hidden="true" />
                  <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-forge-graphite" aria-hidden="true" />

                  {/* Index */}
                  <span className="absolute top-2 right-3 text-[8px] font-mono text-forge-graphite" aria-hidden="true">
                    0{index + 1}
                  </span>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-forge-cyan/5 border border-forge-cyan/15">
                      <Icon size={18} strokeWidth={1.5} className="text-forge-cyan" />
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-graphite">{feature.tag}</span>
                  </div>

                  <h3 className="text-lg font-medium text-forge-white mb-2">{feature.title}</h3>
                  <p className="text-forge-smoke text-sm leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-12"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          aria-hidden="true"
        >
          <div className="w-8 h-px bg-forge-graphite" />
          <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-graphite">spatial-first by design</span>
          <div className="w-8 h-px bg-forge-graphite" />
        </motion.div>
      </div>
    </section>
  );
}
