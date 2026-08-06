"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Flag } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { CALENDLY_URL } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

/* ────────────────────────────────────────────────────────────────────────────
 * Phase 1 interactive demo (PRD 9.6 + Section 6): a scripted, timed replay of
 * what the product does after you stop recording — transcript → scope by
 * trade → priced estimate with confidence flags. NO LLM calls, NO audio.
 *
 * SWAP-IN POINT: the dataset below is an authored, realistic kitchen-remodel
 * walk modeled on the product's actual output structure (backend
 * GeneratedDocument.lineItems → LineItem { trade, qty, unit, unitCost,
 * totalCost } and EstimateConfidenceDto confidenceByTrade buckets
 * low | med | high). When Christian's real anonymized recording asset lands,
 * replace TRANSCRIPT_LINES / SCOPE_GROUPS / ESTIMATE_ITEMS with the
 * transcript + output of that walk — the reveal machinery needs no changes.
 * ──────────────────────────────────────────────────────────────────────────── */

const TRANSCRIPT_LINES = [
  { t: "00:04", text: "Alright, kitchen remodel at the Hendersons'. Full gut, about two twenty square feet." },
  { t: "00:19", text: "Demo the existing cabinets, tops, and the tile floor. Soffit above the uppers comes out too." },
  { t: "00:41", text: "Client wants shaker cabinets and quartz counters, call it thirty-two linear feet of run." },
  { t: "01:08", text: "Sink moves about three feet left into the island, so plumbing rough in shifts. New supply and drain." },
  { t: "01:32", text: "Dedicated twenty amp circuit for the island outlets, four recessed cans, under cabinet lighting." },
  { t: "01:57", text: "Flooring is LVP, maybe seven fifty square feet if we run it into the dining room. Need to confirm with the client." },
];

type Confidence = "high" | "med" | "low";

const SCOPE_GROUPS: { trade: string; items: string[]; confidence: Confidence }[] = [
  { trade: "Demolition", items: ["Remove cabinets, counters & soffit", "Tear out tile floor", "Haul off & disposal"], confidence: "high" },
  { trade: "Cabinetry & Counters", items: ["32 LF shaker cabinets", "Quartz countertops", "Island install"], confidence: "high" },
  { trade: "Plumbing", items: ["Relocate sink 3 ft to island", "New supply + drain rough in", "Dishwasher hookup"], confidence: "med" },
  { trade: "Electrical", items: ["Dedicated 20A island circuit", "4 recessed cans", "Under cabinet lighting"], confidence: "high" },
  { trade: "Flooring", items: ["LVP supply + install", "Underlayment prep"], confidence: "low" },
];

const ESTIMATE_ITEMS: {
  description: string;
  trade: string;
  qty: number;
  unit: string;
  unitCost: number;
  total: number;
  confidence: Confidence;
  flag?: string;
}[] = [
  { description: "Demolition & disposal", trade: "Demolition", qty: 1, unit: "LS", unitCost: 2800, total: 2800, confidence: "high" },
  { description: "Shaker cabinets, supply + install", trade: "Cabinetry", qty: 32, unit: "LF", unitCost: 310, total: 9920, confidence: "high" },
  { description: "Quartz countertops, fab + install", trade: "Counters", qty: 58, unit: "SF", unitCost: 85, total: 4930, confidence: "high" },
  { description: "Sink relocation: rough in + trim", trade: "Plumbing", qty: 1, unit: "LS", unitCost: 2400, total: 2400, confidence: "med", flag: "Slab vs. crawlspace not confirmed on walk" },
  { description: "Island circuit, 4 cans, UC lighting", trade: "Electrical", qty: 1, unit: "LS", unitCost: 2150, total: 2150, confidence: "high" },
  { description: "LVP flooring, supply + install", trade: "Flooring", qty: 750, unit: "SF", unitCost: 6.5, total: 4875, confidence: "low", flag: "Confirm dining room area with client" },
];

const GRAND_TOTAL = ESTIMATE_ITEMS.reduce((sum, li) => sum + li.total, 0);

/* Step timeline — each entry is the delay (ms) BEFORE advancing past that step. */
const N_T = TRANSCRIPT_LINES.length; // steps 1..6   transcript lines
const N_S = SCOPE_GROUPS.length; //     steps 8..12  scope groups (7 = "structuring…")
const N_E = ESTIMATE_ITEMS.length; //   steps 14..19 estimate rows (13 = "pricing…")
const MAX_STEP = N_T + 1 + N_S + 1 + N_E + 1; // + grand total

function delayForStep(step: number): number {
  if (step < N_T) return 950; // transcript cadence
  if (step === N_T) return 1100; // "structuring scope…"
  if (step <= N_T + N_S) return 600; // scope groups
  if (step === N_T + N_S + 1) return 1100; // "pricing estimate…"
  return 700; // estimate rows + total
}

const CONFIDENCE_STYLE: Record<Confidence, string> = {
  high: "text-forge-teal border-forge-teal/40 bg-forge-teal/10",
  med: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  low: "text-red-400 border-red-400/40 bg-red-400/10",
};

function ConfidenceChip({ level }: { level: Confidence }) {
  return (
    <span
      className={`inline-flex items-center border px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-[0.15em] ${CONFIDENCE_STYLE[level]}`}
    >
      {level}
    </span>
  );
}

function usd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

/** Counts up to `value` once mounted — used for the grand total. */
function CountUpTotal({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round(value * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // rAF is throttled/paused in hidden tabs — guarantee the final value lands.
    const settle = setTimeout(() => setCount(value), duration + 200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [value]);
  return <span className="tabular-nums">{usd(count)}</span>;
}

const paneClass =
  "bg-forge-steel/30 backdrop-blur-sm border border-forge-smoke/10 p-4 flex flex-col gap-3 min-h-[320px]";
const paneHeaderClass =
  "text-[9px] font-mono uppercase tracking-[0.15em] text-forge-smoke flex items-center gap-2";

export default function SampleWalkDemo() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  // `playing` is derived, never set in the effect (react-hooks/set-state-in-effect):
  // the run is live from start() until the step counter walks off the end.
  const playing = started && step < MAX_STEP;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setStep((s) => s + 1), delayForStep(step));
    return () => clearTimeout(timer);
  }, [playing, step]);

  const start = () => {
    setStarted(true);
    setStep(0);
  };

  const transcriptShown = Math.min(step, N_T);
  const structuring = step === N_T && playing;
  const scopeShown = Math.max(0, Math.min(step - N_T - 1, N_S));
  const pricing = step === N_T + N_S + 1 && playing;
  const estimateShown = Math.max(0, Math.min(step - N_T - N_S - 2, N_E));
  const showTotal = step >= MAX_STEP;

  return (
    <section id="demo" className="relative py-24 md:py-32 bg-transparent section-depth-a overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header — PRD 9.6, word-for-word */}
        <div className="text-center">
          <motion.div {...fadeUp}>
            <SectionLabel>SEE IT WORK</SectionLabel>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-[-0.01em] text-forge-white mt-6"
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Watch Forge structure a real job walk.
          </motion.h2>

          <motion.p
            className="text-forge-smoke text-lg max-w-2xl mx-auto mt-4"
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Press play on an actual scope-walk recording and watch it turn into
            a trade-by-trade scope and priced estimate in real time,
            right here, no sign-up required.
          </motion.p>
        </div>

        {/* Demo stage */}
        <motion.div
          className="relative mt-14"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        >
          {/* Corner brackets — spatial UI frame */}
          <div className="absolute -inset-4 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-forge-graphite/50" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-forge-graphite/50" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-forge-graphite/50" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-forge-graphite/50" />
          </div>

          {/* Stage header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2" aria-hidden="true">
              <div className={`w-1.5 h-1.5 rounded-full ${playing ? "bg-forge-cyan animate-pulse" : "bg-forge-graphite"}`} />
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-smoke">
                sample walk / kitchen remodel / pre-recorded output
              </span>
            </div>

            {!started ? (
              <Button onClick={start} variant="primary" size="md">
                <Play size={18} strokeWidth={2} aria-hidden="true" />
                Try a sample walk
              </Button>
            ) : (
              <Button onClick={start} variant="secondary" size="sm" disabled={playing && step < 2}>
                <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
                Replay
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Pane 1 — transcript */}
            <div className={paneClass}>
              <div className={paneHeaderClass}>
                <span className="text-forge-cyan">01</span> transcript
                {playing && step < N_T && (
                  <span className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/80 animate-pulse" />
                    transcribing
                  </span>
                )}
              </div>

              {!started && (
                <p className="text-forge-graphite text-sm m-auto text-center px-4">
                  Press &ldquo;Try a sample walk&rdquo; to replay a recorded
                  kitchen-remodel walkthrough.
                </p>
              )}

              <AnimatePresence>
                {TRANSCRIPT_LINES.slice(0, transcriptShown).map((line) => (
                  <motion.div
                    key={line.t}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex gap-3"
                  >
                    <span className="text-[9px] font-mono text-forge-graphite pt-1 shrink-0">{line.t}</span>
                    <p className="text-forge-ash text-sm leading-relaxed">{line.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pane 2 — scope by trade */}
            <div className={paneClass}>
              <div className={paneHeaderClass}>
                <span className="text-forge-cyan">02</span> scope by trade
                {structuring && (
                  <span className="ml-auto flex items-center gap-1.5 text-forge-cyan">
                    <span className="w-1.5 h-1.5 rounded-full bg-forge-cyan animate-pulse" />
                    structuring…
                  </span>
                )}
              </div>

              <AnimatePresence>
                {SCOPE_GROUPS.slice(0, scopeShown).map((group) => (
                  <motion.div
                    key={group.trade}
                    initial={{ opacity: 0, scale: 0.96, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="bg-forge-graphite/40 border border-white/5 px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-forge-white text-xs font-semibold">{group.trade}</span>
                      <ConfidenceChip level={group.confidence} />
                    </div>
                    <ul className="flex flex-col gap-1">
                      {group.items.map((item) => (
                        <li key={item} className="text-forge-smoke text-xs flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-forge-cyan/60 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pane 3 — priced estimate */}
            <div className={paneClass}>
              <div className={paneHeaderClass}>
                <span className="text-forge-cyan">03</span> priced estimate
                {pricing && (
                  <span className="ml-auto flex items-center gap-1.5 text-forge-cyan">
                    <span className="w-1.5 h-1.5 rounded-full bg-forge-cyan animate-pulse" />
                    pricing…
                  </span>
                )}
              </div>

              <AnimatePresence>
                {ESTIMATE_ITEMS.slice(0, estimateShown).map((li) => (
                  <motion.div
                    key={li.description}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="border-b border-white/5 pb-2"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-forge-ash text-xs">{li.description}</span>
                      <span className="text-forge-white text-xs font-medium font-[family-name:var(--font-mono)] tabular-nums shrink-0">
                        {usd(li.total)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-mono text-forge-graphite">
                        {li.qty} {li.unit} × {usd(li.unitCost)}
                      </span>
                      <ConfidenceChip level={li.confidence} />
                      {li.flag && (
                        <span className="flex items-center gap-1 text-[9px] text-amber-400/90">
                          <Flag size={9} aria-hidden="true" />
                          {li.flag}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {showTotal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-auto pt-3 flex items-baseline justify-between border-t border-forge-cyan/30"
                >
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-smoke">
                    estimate total
                  </span>
                  <span className="text-forge-white text-xl font-medium font-[family-name:var(--font-mono)]">
                    <CountUpTotal value={GRAND_TOTAL} />
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bridge to the sales-assisted path — PRD 9.6 */}
        <motion.div
          className="text-center mt-12"
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <p className="text-forge-smoke text-base">
            Want to see it on one of your own jobs instead?
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-forge-white hover:text-forge-cyan transition-colors text-base font-medium underline underline-offset-4 decoration-forge-graphite"
          >
            Book a live walkthrough →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
