"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { METRICS } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

export default function Metrics() {
  return (
    <section className="py-24 md:py-32 bg-forge-steel">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>THE IMPACT</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)] text-forge-white mt-6"
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
      </div>
    </section>
  );
}
