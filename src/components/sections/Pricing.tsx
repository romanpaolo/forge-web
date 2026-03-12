"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { fadeUp, glowPulse } from "@/lib/animations";

const BENEFITS = [
  "Full ScopeSnap access",
  "Unlimited job walks",
  "Direct line to the dev team",
  "Lock in founding member pricing",
  "Free during entire beta",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-forge-iron">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>EARLY ACCESS</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-tight font-[family-name:var(--font-heading)] text-forge-white mt-6"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Be Part of the First 20
        </motion.h2>

        <motion.p
          className="text-forge-smoke text-lg max-w-2xl mx-auto mt-4"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          We&rsquo;re hand-picking 20 contractors to shape Forge from day one. Free for the
          entire beta period. No credit card. No commitment.
        </motion.p>

        <motion.div
          className="max-w-lg mx-auto mt-16"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <Card className="border-forge-orange/30 shadow-[0_0_60px_rgba(249,115,22,0.1)] p-10 flex flex-col items-center gap-6">
            {/* Badge */}
            <span className="bg-forge-spark/10 text-forge-spark px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest">
              Founding Contractor
            </span>

            {/* Benefits list */}
            <ul className="w-full flex flex-col gap-3 mt-2">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-left">
                  <Check
                    size={18}
                    className="text-forge-orange flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <span className="text-forge-white">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA button with glow pulse */}
            <motion.div
              className="w-full mt-2"
              animate={glowPulse.animate}
              transition={glowPulse.transition}
              style={{ borderRadius: "9999px" }}
            >
              <Button
                href="mailto:hello@forgebuild.io"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Claim Your Spot
              </Button>
            </motion.div>

            {/* Spots remaining */}
            <p className="text-forge-orange font-bold text-sm">
              8 of 20 spots remaining
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
