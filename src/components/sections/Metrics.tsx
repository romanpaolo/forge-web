"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { METRICS, MARKET_DATA } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

export default function Metrics() {
  return (
    <section className="relative py-24 md:py-32 bg-transparent overflow-hidden">
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

      {/* Scanning line animation — parallax layer */}
      <motion.div
        data-speed="0.7"
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-forge-cyan/30 to-transparent pointer-events-none z-10"
        aria-hidden="true"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>THE IMPACT</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-[-0.01em] uppercase text-forge-white mt-6"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Built for the Way You Actually Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              {...fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + index * 0.12 }}
            >
              <Card className="relative flex flex-col items-center justify-center">
                {/* Corner brackets */}
                <div className="absolute -inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-forge-graphite/50" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-forge-graphite/50" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-forge-graphite/50" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-forge-graphite/50" />
                </div>

                {/* Index number */}
                <span className="absolute top-2 left-3 text-[8px] font-mono text-forge-graphite" aria-hidden="true">
                  0{index + 1}
                </span>

                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  unit={metric.unit}
                />
                <p className="text-forge-smoke text-lg mt-4">{metric.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Market data — matching Forge team design */}
        <motion.div
          className="mt-20"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-medium tracking-[-0.01em] uppercase text-forge-white">
            The Future of Field Intelligence
          </h3>

          {/* Mono status label */}
          <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
            <div className="w-1.5 h-1.5 rounded-full bg-forge-cyan/60 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-graphite">market signal</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {MARKET_DATA.map((item, index) => (
              <motion.div
                key={item.label}
                {...fadeUp}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 + index * 0.1 }}
                className="relative flex flex-col items-center"
              >
                <span className="text-2xl sm:text-4xl md:text-5xl font-medium text-forge-white font-[family-name:var(--font-mono)] tracking-tight">
                  {item.value}
                </span>
                <span className="text-forge-smoke text-sm uppercase tracking-[0.1em] mt-3">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
