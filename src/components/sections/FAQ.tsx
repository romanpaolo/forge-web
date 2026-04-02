"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { FAQ_ITEMS } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

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

      <div className="relative max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <motion.div {...fadeUp}>
            <SectionLabel>FAQ</SectionLabel>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-medium tracking-[-0.01em] uppercase text-forge-white mt-6"
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Got Questions?
          </motion.h2>
        </div>

        {/* Spatial frame around accordion */}
        <motion.div
          className="relative mt-16"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {/* Corner brackets */}
          <div className="absolute -inset-4 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-forge-graphite/40" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-forge-graphite/40" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-forge-graphite/40" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-forge-graphite/40" />
          </div>

          {/* Mono label */}
          <div className="flex items-center gap-2 mb-4" aria-hidden="true">
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-graphite">
              {FAQ_ITEMS.length} questions
            </span>
            <div className="flex-1 h-px bg-forge-graphite/30" />
          </div>

          {FAQ_ITEMS.map((item, index) => (
            <div
              key={item.question}
              className="border-b border-forge-graphite"
            >
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-forge-white hover:text-forge-cyan transition-colors"
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[8px] font-mono text-forge-graphite shrink-0" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.question}</span>
                </div>
                <ChevronDown
                  size={20}
                  strokeWidth={2}
                  className="flex-shrink-0 text-forge-smoke transition-transform duration-300"
                  style={{
                    transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="text-forge-smoke pb-5 leading-relaxed pl-7">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
