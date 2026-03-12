"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { fadeUp } from "@/lib/animations";

export default function FinalCTA() {
  return (
    <section
      className="py-24 md:py-32 text-center bg-forge-iron"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.2) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)] text-forge-white"
          {...fadeUp}
        >
          Stop Wasting Time After the Walk.
        </motion.h2>

        <motion.p
          className="text-forge-smoke text-lg max-w-2xl mx-auto mt-6"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Forge gives you back 20+ minutes per job &mdash; and your PM gets clean,
          structured data every single time.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <Button href="#pricing" variant="primary" size="lg">
            Get Early Access &mdash; It&rsquo;s Free
          </Button>

          <p className="text-forge-smoke text-sm mt-4">
            No credit card required. 20 spots only.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
