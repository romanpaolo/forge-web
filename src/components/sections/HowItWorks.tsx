"use client";

import { motion } from "framer-motion";
import { FolderPlus, Mic, Brain, Send } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { STEPS } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

const STEP_ICONS = [FolderPlus, Mic, Brain, Send];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-forge-iron">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <motion.div {...fadeUp}>
            <SectionLabel>HOW IT WORKS</SectionLabel>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-medium tracking-[-0.01em] uppercase text-forge-white mt-6"
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            From Walk to Handoff in Four Steps
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Vertical orange line */}
          {/* Mobile: left edge. Desktop: center */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-forge-cyan/30 md:-translate-x-px" />

          <div className="flex flex-col gap-16">
            {STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  {...fadeUp}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + index * 0.14 }}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card — takes half width on desktop */}
                  <div
                    className={`pl-14 md:pl-0 md:w-[calc(50%-2.5rem)] ${
                      isEven ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"
                    }`}
                  >
                    {/* Icon + title row */}
                    <div
                      className={`flex items-center gap-3 mb-3 ${
                        isEven ? "md:flex-row-reverse md:justify-start" : "flex-row"
                      }`}
                    >
                      <div className="flex-shrink-0 p-2 rounded-lg bg-forge-cyan/10 border border-forge-cyan/20">
                        <Icon className="w-5 h-5 text-forge-cyan" />
                      </div>
                      <h3 className="text-xl font-semibold text-forge-white">{step.title}</h3>
                    </div>

                    <p className="text-forge-smoke leading-relaxed">{step.description}</p>
                  </div>

                  {/* Center dot + step number — absolute on desktop, inline on mobile */}
                  <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-1.5">
                    {/* Orange dot on the line */}
                    <div className="w-4 h-4 rounded-full bg-forge-cyan border-2 border-forge-iron shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                  </div>

                  {/* Step number — desktop only, opposite side of card */}
                  <div
                    className={`hidden md:flex md:w-[calc(50%-2.5rem)] items-start ${
                      isEven ? "md:pl-16" : "md:pr-16 md:justify-end"
                    }`}
                  >
                    <span className="text-5xl font-medium text-forge-ash/30 font-[family-name:var(--font-mono)] leading-none select-none opacity-60">
                      {step.number}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
