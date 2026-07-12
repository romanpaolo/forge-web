"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUp } from "@/lib/animations";

// PRD 9.7 — differentiation vs. CompanyCam (a clear lane, not a takedown),
// plus Christian's "speed wins jobs" paragraph as a sub-block.
export default function Differentiation() {
  return (
    <section className="relative py-24 md:py-32 bg-transparent section-depth-b overflow-hidden">
      {/* Spatial dot grid background — parallax layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" data-speed="0.85">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #94A3B8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>NOT ANOTHER PHOTO APP</SectionLabel>
        </motion.div>

        <motion.p
          className="text-forge-smoke text-lg leading-relaxed mt-8"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          CompanyCam and tools like it are great at documenting a job once
          you&rsquo;re building it. Forge is built for the walk before that — the
          one where you have to turn what you saw into a number the client
          can sign.
        </motion.p>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-[-0.01em] text-forge-white mt-8 leading-snug"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          Record the walk. Forge hands you the scope and the estimate.
          That&rsquo;s the whole difference.
        </motion.h2>

        {/* Christian's speed-wins-jobs sub-block */}
        <motion.div
          className="relative mt-14 text-left"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {/* Corner brackets */}
          <div className="absolute -inset-4 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-forge-graphite/50" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-forge-graphite/50" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-forge-graphite/50" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-forge-graphite/50" />
          </div>

          <div className="bg-forge-steel/30 backdrop-blur-sm border border-forge-smoke/10 p-6 md:p-8 flex gap-4">
            <div className="shrink-0 p-2 h-fit rounded-lg bg-forge-cyan/10 border border-forge-cyan/20">
              <Zap className="w-5 h-5 text-forge-cyan" aria-hidden="true" />
            </div>
            <p className="text-forge-ash text-base md:text-lg leading-relaxed">
              <span className="text-forge-white font-semibold">Speed wins jobs.</span>{" "}
              Walk the house, get in your truck, and the estimate is already
              built by the time you&rsquo;re back at the office — same day,
              sometimes the same meeting. The next three bids haven&rsquo;t even
              gone out yet.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
