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

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>FROM THE FIELD</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-medium tracking-[-0.01em] uppercase text-forge-white mt-6"
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
              <Card className="relative h-full flex flex-col gap-5 text-left">
                {/* Corner dots */}
                <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-forge-graphite" aria-hidden="true" />
                <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-forge-graphite" aria-hidden="true" />
                <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-forge-graphite" aria-hidden="true" />
                <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-forge-graphite" aria-hidden="true" />

                {/* Index number */}
                <span className="absolute top-2 right-3 text-[8px] font-mono text-forge-graphite" aria-hidden="true">
                  0{index + 1}
                </span>

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-forge-teal"
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg italic text-forge-white leading-relaxed flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="flex flex-col gap-1">
                  <p className="text-forge-smoke text-sm font-medium">
                    — {testimonial.name}, {testimonial.title}
                  </p>
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-graphite">
                    verified contractor
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
