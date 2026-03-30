"use client";

import { useState } from "react";
import { Layers, Monitor } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Hero3D from "@/components/sections/Hero3D";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Features from "@/components/sections/Features";
import Metrics from "@/components/sections/Metrics";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [mode, setMode] = useState<"classic" | "spatial">("spatial");

  return (
    <main>
      <Navbar />

      {/* Mode toggle — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMode(mode === "classic" ? "spatial" : "classic")}
          className="flex items-center gap-2.5 bg-forge-iron/90 backdrop-blur-md border border-forge-graphite/50 px-4 py-2.5 text-sm font-medium text-forge-ash hover:text-forge-white hover:border-forge-smoke/50 transition-all font-[family-name:var(--font-mono)] uppercase tracking-[0.1em] group"
        >
          {mode === "classic" ? (
            <>
              <Layers size={16} strokeWidth={1.5} className="text-forge-cyan group-hover:text-forge-cyan-light transition-colors" />
              <span>Spatial View</span>
            </>
          ) : (
            <>
              <Monitor size={16} strokeWidth={1.5} className="text-forge-ash group-hover:text-forge-white transition-colors" />
              <span>Classic View</span>
            </>
          )}
        </button>
      </div>

      {/* Hero — swaps based on mode */}
      {mode === "classic" ? <Hero /> : <Hero3D />}

      <Problem />
      <Solution />
      <Features />
      <Metrics />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
