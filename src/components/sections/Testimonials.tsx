"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { fadeUp } from "@/lib/animations";

// PRD 9.8 — Will's trial-user quote (cleared for use: Will confirmed
// name/text). Follows the Harris & Sons case-study teaser per 10.5: concrete
// stats first, plain-spoken no-financial-stake reaction second.
export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 bg-transparent section-depth-a overflow-hidden">
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

        <motion.blockquote
          className="max-w-3xl mx-auto mt-8"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-[-0.01em] text-forge-white leading-snug">
            &ldquo;It was good, I&rsquo;m impressed. It was super quick and pretty accurate.
            I just talked into it, and all the scopes it spat out were pretty
            darn good.&rdquo;
          </p>
          <footer className="text-forge-smoke text-base mt-8">
            Will L., General Contractor, trial user
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
