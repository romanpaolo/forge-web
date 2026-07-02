"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUp } from "@/lib/animations";

// No invented people, no fabricated quotes — a single neutral line until we
// have real, attributable testimonials from the Founders Council.
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

        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-[-0.01em] text-forge-white max-w-3xl mx-auto mt-8"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Built in the field with our founding contractors.
        </motion.p>
      </div>
    </section>
  );
}
