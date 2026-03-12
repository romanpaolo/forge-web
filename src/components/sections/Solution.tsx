"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Brain, CheckCircle, Send, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import { fadeUp, staggerContainer } from "@/lib/animations";

const STEPS = [
  {
    icon: Smartphone,
    title: "Walk & Capture",
    desc: "Audio + Photos tagged by voice",
  },
  {
    icon: Brain,
    title: "AI Structures",
    desc: "Scope, Questions, Tasks by Trade",
  },
  {
    icon: CheckCircle,
    title: "Review & Approve",
    desc: "Edit inline, add/remove tasks",
  },
  {
    icon: Send,
    title: "Export to BT",
    desc: "One-tap copy, PDF + email",
  },
];

const cardVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

export default function Solution() {
  return (
    <section className="py-24 md:py-32 bg-forge-steel">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>THE FORGE WAY</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight mt-6 font-[family-name:var(--font-heading)]"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          One Walk In. Everything Out.
        </motion.h2>

        <motion.p
          className="text-forge-smoke text-lg max-w-2xl mx-auto mt-4"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Walk the job. Forge handles the rest — AI structures your scope,
          organizes tasks by trade, and packages everything for handoff.
        </motion.p>

        {/* Step cards with interleaved arrow connectors on lg */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-6 lg:gap-3 items-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
        >
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;

            return (
              <React.Fragment key={step.title}>
                <motion.div
                  variants={cardVariant}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.12,
                  }}
                >
                  <Card className="text-center h-full">
                    <Icon className="text-forge-orange w-8 h-8 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-forge-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-forge-smoke text-sm">{step.desc}</p>
                  </Card>
                </motion.div>

                {/* Arrow connector between cards — desktop only */}
                {!isLast && (
                  <motion.div
                    className="hidden lg:flex items-center justify-center"
                    variants={cardVariant}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.12 + 0.06,
                    }}
                  >
                    <ArrowRight className="text-forge-orange w-5 h-5 shrink-0" />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
