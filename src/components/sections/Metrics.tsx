"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { METRICS, MARKET_DATA } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

export default function Metrics() {
  return (
    <section className="py-24 md:py-32 bg-forge-steel">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>THE IMPACT</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-medium tracking-[-0.01em] uppercase text-forge-white mt-6"
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
              <Card className="flex flex-col items-center justify-center">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {MARKET_DATA.map((item, index) => (
              <motion.div
                key={item.label}
                {...fadeUp}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-4xl md:text-5xl font-medium text-forge-white font-[family-name:var(--font-mono)] tracking-tight">
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
