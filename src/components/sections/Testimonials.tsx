"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

const cardVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-forge-steel">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>FROM THE FIELD</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)] text-forge-white mt-6"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Contractors Are Already Talking
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-16"
          {...staggerContainer}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariant}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
            >
              <Card className="h-full flex flex-col gap-5 text-left">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-forge-spark"
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg italic text-forge-white leading-relaxed flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Attribution */}
                <p className="text-forge-smoke text-sm font-medium">
                  — {testimonial.name}, {testimonial.title}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
