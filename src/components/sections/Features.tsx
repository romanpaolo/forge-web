"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { FEATURES } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

/* ─── Phone screen content ─────────────────────────────────── */

function CaptureScreen() {
  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      {/* Recording indicator */}
      <div className="flex items-center gap-2 bg-forge-graphite/60 rounded-xl px-3 py-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
        <span className="text-forge-white text-xs font-medium">Recording…</span>
        <span className="ml-auto text-forge-smoke text-xs">02:14</span>
      </div>

      {/* Waveform */}
      <div className="flex items-end justify-center gap-[3px] h-12 px-2">
        {[18, 32, 24, 40, 28, 16, 36, 22, 38, 20, 30, 14, 34, 26, 42].map(
          (h, i) => (
            <motion.div
              key={i}
              className="w-[5px] rounded-full bg-forge-cyan"
              style={{ height: h }}
              animate={{ scaleY: [1, 0.4 + Math.random() * 0.8, 1] }}
              transition={{
                duration: 0.6 + (i % 4) * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
            />
          )
        )}
      </div>

      {/* Voice tag */}
      <div className="bg-forge-graphite/40 border border-white/5 rounded-xl px-3 py-2">
        <p className="text-forge-smoke text-[10px] uppercase tracking-widest mb-1">
          Latest tag
        </p>
        <p className="text-forge-ash text-xs italic">
          &ldquo;Photo: kitchen sink wall&rdquo;
        </p>
      </div>

      {/* Photo thumbnails */}
      <div className="grid grid-cols-3 gap-1.5">
        {["Kitchen", "Bath", "Hallway"].map((label) => (
          <div
            key={label}
            className="aspect-square rounded-lg bg-forge-graphite/60 border border-white/5 flex flex-col items-center justify-center gap-1"
          >
            <div className="w-4 h-3 rounded bg-forge-smoke/30" />
            <span className="text-[8px] text-forge-smoke">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiEngineScreen() {
  const trades = [
    { name: "Kitchen", tasks: 4, color: "bg-forge-cyan" },
    { name: "Bathroom", tasks: 3, color: "bg-forge-teal" },
    { name: "Electrical", tasks: 2, color: "bg-blue-400" },
  ];

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-4 rounded-full bg-forge-cyan" />
        <span className="text-forge-white text-xs font-semibold tracking-wide">
          Scope by Area
        </span>
      </div>

      {/* Trade sections */}
      {trades.map((trade) => (
        <div
          key={trade.name}
          className="bg-forge-graphite/50 border border-white/5 rounded-xl px-3 py-2.5"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${trade.color}`} />
              <span className="text-forge-ash text-xs font-medium">
                {trade.name}
              </span>
            </div>
            <span className="text-forge-smoke text-[10px]">
              {trade.tasks} tasks
            </span>
          </div>
          {/* Skeleton task rows */}
          <div className="flex flex-col gap-1 pl-4">
            {Array.from({ length: Math.min(trade.tasks, 2) }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-forge-smoke/20"
                style={{ width: `${60 + i * 15}%` }}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Open questions pill */}
      <div className="mt-auto bg-forge-teal/10 border border-forge-teal/20 rounded-xl px-3 py-2 flex items-center gap-2">
        <span className="text-forge-teal text-[10px] font-semibold uppercase tracking-widest">
          2 Open Questions
        </span>
      </div>
    </div>
  );
}

function ExportScreen() {
  const items = [
    { label: "Scope summary", checked: true },
    { label: "Tasks by trade", checked: true },
    { label: "Photo packet", checked: true },
    { label: "PM handoff email", checked: false },
  ];

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      {/* PDF preview placeholder */}
      <div className="bg-forge-graphite/50 border border-white/5 rounded-xl p-3 flex gap-3 items-start">
        <div className="flex-shrink-0 w-10 h-12 rounded bg-forge-smoke/20 flex items-center justify-center">
          <span className="text-[8px] text-forge-smoke font-bold">PDF</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 pt-1">
          <div className="h-1.5 rounded-full bg-forge-smoke/30 w-3/4" />
          <div className="h-1.5 rounded-full bg-forge-smoke/20 w-1/2" />
          <div className="h-1.5 rounded-full bg-forge-smoke/20 w-2/3" />
        </div>
      </div>

      {/* Checklist */}
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <div
              className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                item.checked
                  ? "bg-forge-cyan border-forge-cyan"
                  : "bg-transparent border-forge-smoke/40"
              }`}
            >
              {item.checked && (
                <Check className="w-2.5 h-2.5 text-forge-white" strokeWidth={3} />
              )}
            </div>
            <span
              className={`text-xs ${
                item.checked ? "text-forge-ash" : "text-forge-smoke"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div className="mt-auto">
        <div className="bg-forge-cyan rounded-xl px-3 py-2.5 text-center">
          <span className="text-forge-white text-xs font-semibold">
            Copy to Buildertrend
          </span>
        </div>
      </div>
    </div>
  );
}

const PHONE_SCREENS = [CaptureScreen, AiEngineScreen, ExportScreen];

/* ─── Main component ────────────────────────────────────────── */

export default function Features() {
  return (
    <section id="product" className="relative py-24 md:py-32 bg-transparent section-depth-b overflow-hidden">
      {/* Spatial dot grid background - parallax layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" data-speed="0.85">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #94A3B8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {FEATURES.map((feature, index) => {
        const isEven = index % 2 === 1;
        const PhoneScreen = PHONE_SCREENS[index];

        return (
          <motion.div
            key={feature.label}
            className="relative max-w-7xl mx-auto px-6 mb-24 last:mb-0"
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                isEven ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
              }`}
            >
              {/* Text side */}
              <div className="flex flex-col gap-6">
                <SectionLabel>{feature.label}</SectionLabel>

                <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-[-0.01em] text-forge-white">
                  {feature.title}
                </h2>

                <p className="text-forge-smoke text-lg leading-relaxed">
                  {feature.description}
                </p>

                <ul className="flex flex-col gap-3">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <Check
                        className="text-forge-cyan mt-0.5 shrink-0 w-5 h-5"
                        strokeWidth={2.5}
                      />
                      <span className="text-forge-ash text-base">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mockup side */}
              <div className="flex items-center justify-center">
                {/* Spatial frame around phone mockup */}
                <div className="relative">
                  {/* Corner brackets */}
                  <div className="absolute -inset-4 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-forge-graphite/50" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-forge-graphite/50" />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-forge-graphite/50" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-forge-graphite/50" />
                  </div>

                  {/* Feature index label */}
                  <div className="absolute -top-7 left-0 flex items-center gap-2" aria-hidden="true">
                    <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-graphite">
                      module 0{index + 1}
                    </span>
                  </div>

                  <PhoneMockup>
                    {PhoneScreen && <PhoneScreen />}
                  </PhoneMockup>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
