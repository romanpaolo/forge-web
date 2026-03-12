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
    <section className="py-24 md:py-32 bg-forge-steel">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <motion.div {...fadeUp}>
            <SectionLabel>FAQ</SectionLabel>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)] text-forge-white mt-6"
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Got Questions?
          </motion.h2>
        </div>

        {/* Accordion */}
        <motion.div
          className="mt-16"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={item.question}
              className="border-b border-forge-graphite"
            >
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-forge-white hover:text-forge-orange transition-colors"
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
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
                    <p className="text-forge-smoke pb-5 leading-relaxed">
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
