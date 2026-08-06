"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import { CASE_STUDY_PATH } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

// Homepage case-study teaser module — PRD 10.7, word-for-word. Sits between
// Differentiation (9.7) and Proof (9.8) per 10.5. Numbers are self-reported
// from Harris & Sons' own books — full disclosure lives on the case study page.
const TEASER_STATS = [
  { value: "75%", label: "less time estimating" },
  { value: "$330K", label: "Forge attributed revenue" },
  { value: "$40K", label: "scope dispute loss prevented" },
];

export default function CaseStudyTeaser() {
  return (
    <section className="relative py-24 md:py-32 bg-transparent section-depth-c overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>RESULTS</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-[-0.01em] text-forge-white mt-6"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Two weeks to three days.
        </motion.h2>

        <motion.p
          className="text-forge-smoke text-lg max-w-2xl mx-auto mt-4"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Harris &amp; Sons Construction cut estimating time 75%, prevented a
          $40,000 scope dispute loss, and grew projected revenue 60%, in
          their first 90 days on Forge.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 max-w-4xl mx-auto">
          {TEASER_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + index * 0.12 }}
            >
              <Card className="relative flex flex-col items-center justify-center gap-3 py-10">
                {/* Corner brackets */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-forge-graphite/50" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-forge-graphite/50" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-forge-graphite/50" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-forge-graphite/50" />
                </div>

                <span className="text-4xl md:text-5xl font-medium text-forge-cyan font-[family-name:var(--font-mono)] tabular-nums">
                  {stat.value}
                </span>
                <p className="text-forge-smoke text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <a
            href={CASE_STUDY_PATH}
            className="inline-block text-forge-white hover:text-forge-cyan transition-colors text-base font-medium underline underline-offset-4 decoration-forge-graphite"
          >
            Read the full story →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
