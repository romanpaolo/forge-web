"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const LOGOS = [
  { name: "Buildertrend" },
  { name: "Procore" },
  { name: "CoConstruct" },
  { name: "Jobber" },
];

export default function TrustBar() {
  return (
    <section className="py-16 bg-forge-iron border-y border-forge-graphite/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          {...fadeUp}
          className="text-center text-forge-smoke text-sm uppercase tracking-widest mb-10"
        >
          Trusted by contractors using
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-12 items-center"
        >
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="opacity-40 hover:opacity-70 transition-opacity duration-300 cursor-default select-none"
            >
              <span className="text-forge-smoke text-lg font-semibold tracking-wide">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
