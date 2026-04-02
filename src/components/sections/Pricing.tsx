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
    <section id="pricing" className="relative py-24 md:py-32 bg-transparent overflow-hidden">
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

      {/* Scanning line animation — parallax layer */}
      <motion.div
        data-speed="0.7"
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-forge-cyan/30 to-transparent pointer-events-none z-10"
        aria-hidden="true"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>FOUNDERS COUNCIL</SectionLabel>
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-[-0.01em] uppercase text-forge-white mt-6"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Join the First 30
        </motion.h2>

        <motion.p
          className="text-forge-smoke text-lg max-w-2xl mx-auto mt-4"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          We&rsquo;re hand-picking 30 contractors to shape Forge from day one. Free for the
          entire beta period. No credit card. No commitment.
        </motion.p>

        <motion.div
          className="max-w-lg mx-auto mt-16"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {/* Spatial frame around pricing card */}
          <div className="relative">
            {/* Outer corner brackets */}
            <div className="absolute -inset-4 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-forge-graphite/50" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-forge-graphite/50" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-forge-graphite/50" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-forge-graphite/50" />
            </div>

            {/* Status label top-right */}
            <div className="absolute -top-7 right-0 flex items-center gap-2" aria-hidden="true">
              <div className="w-1.5 h-1.5 rounded-full bg-forge-cyan animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-smoke">18 spots remaining</span>
            </div>

            <Card className="border-forge-graphite/50 shadow-[0_0_80px_rgba(14,165,233,0.05)] p-10 flex flex-col items-center gap-6">
              {/* Badge */}
              <span className="bg-forge-white/5 text-forge-ash px-4 py-1.5 text-sm font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-mono)]">
                Founders Council
              </span>

              {/* Benefits list */}
              <ul className="w-full flex flex-col gap-3 mt-2">
                {BENEFITS.map((benefit, index) => (
                  <li key={benefit} className="flex items-center gap-3 text-left">
                    <Check
                      size={18}
                      className="text-forge-ash flex-shrink-0"
                      strokeWidth={2.5}
                    />
                    <span className="text-forge-white">{benefit}</span>
                    <span className="ml-auto text-[8px] font-mono text-forge-graphite" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA button with glow pulse */}
              <motion.div
                className="w-full mt-2"
                animate={glowPulse.animate}
                transition={glowPulse.transition}
                style={{ borderRadius: "0px" }}
              >
                <Button
                  href="mailto:hello@forgebuild.io"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Join Founders Council
                </Button>
              </motion.div>

              {/* Spots remaining */}
              <p className="text-forge-smoke font-medium text-sm font-[family-name:var(--font-mono)]">
                18 of 30 spots remaining
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
