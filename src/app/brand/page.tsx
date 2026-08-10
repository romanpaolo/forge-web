"use client";

import { useState, useEffect, useRef } from "react";
import {
  Hexagon,
  Check,
  ArrowRight,
  Mic,
  Brain,
  Send,
  FolderPlus,
  Star,
  ChevronDown,
  Menu,
  X,
  Zap,
  Target,
  Layers,
  Shield,
  Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Navbar from "@/components/sections/Navbar";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";

// ─── Data ────────────────────────────────────────────────────────────────────

const COLORS = [
  {
    group: "Primary",
    swatches: [
      { name: "Cyan", variable: "--color-forge-cyan", hex: "#0EA5E9", bg: "bg-forge-cyan", textDark: true },
      { name: "Cyan Light", variable: "--color-forge-cyan-light", hex: "#38BDF8", bg: "bg-forge-cyan-light", textDark: true },
      { name: "Cyan Dark", variable: "--color-forge-cyan-dark", hex: "#0284C7", bg: "bg-forge-cyan-dark", textDark: false },
      { name: "Teal", variable: "--color-forge-teal", hex: "#14B8A6", bg: "bg-forge-teal", textDark: true },
    ],
  },
  {
    group: "Neutrals",
    swatches: [
      { name: "Body", variable: "--color-forge-body", hex: "#050507", bg: "bg-forge-body", textDark: false },
      { name: "Iron", variable: "--color-forge-iron", hex: "#0A0A0F", bg: "bg-forge-iron", textDark: false },
      { name: "Charcoal", variable: "--color-forge-charcoal", hex: "#111827", bg: "bg-forge-charcoal", textDark: false },
      { name: "Steel", variable: "--color-forge-steel", hex: "#1E293B", bg: "bg-forge-steel", textDark: false },
      { name: "Graphite", variable: "--color-forge-graphite", hex: "#334155", bg: "bg-forge-graphite", textDark: false },
    ],
  },
  {
    group: "Text",
    swatches: [
      { name: "Smoke", variable: "--color-forge-smoke", hex: "#94A3B8", bg: "bg-forge-smoke", textDark: true },
      { name: "Ash", variable: "--color-forge-ash", hex: "#CBD5E1", bg: "bg-forge-ash", textDark: true },
      { name: "White", variable: "--color-forge-white", hex: "#F8FAFC", bg: "bg-forge-white", textDark: true },
    ],
  },
];

const TYPE_SCALE = [
  {
    label: "H1",
    size: "text-5xl",
    weight: "font-bold",
    tracking: "tracking-tight",
    lineHeight: "leading-tight",
    spec: "48 to 64px · Bold · 0.02em",
    sample: "Build Faster. Scope Smarter.",
  },
  {
    label: "H2",
    size: "text-4xl",
    weight: "font-semibold",
    tracking: "tracking-tight",
    lineHeight: "leading-snug",
    spec: "32 to 40px · Semibold · 0.01em",
    sample: "Walk the Job. We'll Handle the Notes.",
  },
  {
    label: "H3",
    size: "text-2xl",
    weight: "font-medium",
    tracking: "tracking-normal",
    lineHeight: "leading-snug",
    spec: "24 to 28px · Medium · 0em",
    sample: "Raw Walk to Structured Scope",
  },
  {
    label: "H4",
    size: "text-xl",
    weight: "font-semibold",
    tracking: "tracking-normal",
    lineHeight: "leading-normal",
    spec: "20px · Semibold · 0em",
    sample: "One Tap to Buildertrend Ready",
  },
  {
    label: "Body Large",
    size: "text-lg",
    weight: "font-normal",
    tracking: "tracking-normal",
    lineHeight: "leading-relaxed",
    spec: "18px · Regular · 1.6 line-height",
    sample: "Forge records everything: audio up to 90 minutes, plus photos you can voice-tag on the fly.",
  },
  {
    label: "Body",
    size: "text-base",
    weight: "font-normal",
    tracking: "tracking-normal",
    lineHeight: "leading-relaxed",
    spec: "16px · Regular · 1.6 line-height",
    sample: "No special hardware required. Forge runs on your iPhone, with a full web dashboard in any browser.",
  },
  {
    label: "Caption",
    size: "text-sm",
    weight: "font-normal",
    tracking: "tracking-wide",
    lineHeight: "leading-normal",
    spec: "14px · Regular · 0.025em",
    sample: "Version 1.0 · Last updated March 2026",
  },
];

const ICONS = [
  { name: "Hexagon", component: Hexagon },
  { name: "Check", component: Check },
  { name: "ArrowRight", component: ArrowRight },
  { name: "Mic", component: Mic },
  { name: "Brain", component: Brain },
  { name: "Send", component: Send },
  { name: "FolderPlus", component: FolderPlus },
  { name: "Star", component: Star },
  { name: "ChevronDown", component: ChevronDown },
];

const VOICE_ATTRIBUTES = [
  {
    label: "Direct",
    description: "No fluff, no jargon. Say exactly what needs to be said and move on.",
    example: "\"Walk the job. We'll handle the notes.\"",
  },
  {
    label: "Confident",
    description: "Assured without arrogance. We know what we're building and why it matters.",
    example: "\"Forge doesn't guess. It organizes.\"",
  },
  {
    label: "Practical",
    description: "Grounded in real contractor workflows. Every feature solves a real problem.",
    example: "\"One tap copy to Buildertrend. Done.\"",
  },
  {
    label: "Empathetic",
    description: "We understand the job site. We speak the language of the people we serve.",
    example: "\"We used to spend the drive home just organizing notes.\"",
  },
  {
    label: "Bold",
    description: "We're not building incremental improvements. We're changing how scoping works.",
    example: "\"Zero typing required.\"",
  },
];

const CORE_VALUES = [
  { label: "Efficiency", icon: Zap, description: "Save time on every walk, every project." },
  { label: "Accuracy", icon: Target, description: "Flag uncertainty. Never guess. Always verify." },
  { label: "Simplicity", icon: Layers, description: "One workflow replaces four." },
  { label: "Trade First", icon: Users, description: "Built for how contractors actually work." },
  { label: "Trust", icon: Shield, description: "You review and approve everything before export." },
];

const SPACING_SCALE = [
  { value: "1", px: "4px", label: "xs" },
  { value: "2", px: "8px", label: "sm" },
  { value: "3", px: "12px", label: "md" },
  { value: "4", px: "16px", label: "base" },
  { value: "5", px: "20px", label: "lg" },
  { value: "6", px: "24px", label: "xl" },
  { value: "8", px: "32px", label: "2xl" },
  { value: "10", px: "40px", label: "3xl" },
  { value: "12", px: "48px", label: "4xl" },
  { value: "16", px: "64px", label: "5xl" },
  { value: "20", px: "80px", label: "6xl" },
  { value: "24", px: "96px", label: "7xl" },
];

const NAV_SECTIONS = [
  { id: "colors", label: "Color Palette" },
  { id: "typography", label: "Typography" },
  { id: "components", label: "Components" },
  { id: "iconography", label: "Iconography" },
  { id: "voice", label: "Brand Voice" },
  { id: "spacing", label: "Spacing" },
];

// ─── Copy-to-clipboard helper ─────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // silently fail on non-secure contexts
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs font-mono text-forge-smoke hover:text-forge-cyan transition-colors mt-1 cursor-pointer select-none"
      title={`Copy ${text}`}
    >
      {copied ? "copied" : text}
    </button>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  id,
  tag,
  title,
  description,
  children,
}: {
  id: string;
  tag: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 border-b border-white/5">
      <div className="mb-10">
        <SectionLabel>{tag}</SectionLabel>
        <h2 className="text-3xl font-semibold text-forge-white mt-4 mb-3 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-forge-smoke text-base leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function BrandPage() {
  const [activeSection, setActiveSection] = useState("colors");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionEls = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => el && observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-forge-body text-forge-white">
      <Navbar />
      {/* ── Top nav bar ─────────────────────────────────────────────────── */}
      <header className="fixed top-16 left-0 right-0 z-40 bg-forge-iron/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-forge-smoke hover:text-forge-white transition-colors"
              aria-label="Back to Forge home"
            >
              <Hexagon size={18} strokeWidth={2} className="text-forge-cyan" aria-hidden="true" />
              <span className="font-bold text-forge-white tracking-tight">FORGE</span>
            </a>
            <span className="text-forge-graphite select-none">/</span>
            <span className="text-forge-smoke text-sm font-medium">Design System</span>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-forge-smoke hover:text-forge-white transition-colors"
            onClick={() => setMobileSidebarOpen((o) => !o)}
            aria-label="Toggle section navigation"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile section nav overlay ──────────────────────────────────── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-16">
          <div
            className="absolute inset-0 bg-forge-iron/95 backdrop-blur-md"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <nav className="relative px-6 py-6 flex flex-col gap-1">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-forge-cyan/10 text-forge-cyan"
                    : "text-forge-smoke hover:text-forge-white hover:bg-white/5"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 flex gap-16">
        {/* ── Sticky sidebar ──────────────────────────────────────────────── */}
        <aside className="hidden md:block w-52 flex-shrink-0">
          <div className="sticky top-40">
            <p className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4 px-4">
              Sections
            </p>
            <nav className="flex flex-col gap-0.5" aria-label="Brand page sections">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    activeSection === section.id
                      ? "bg-forge-cyan/10 text-forge-cyan border-l-2 border-forge-cyan"
                      : "text-forge-smoke hover:text-forge-white hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Main content ────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {/* Page header */}
          <div className="mb-16 pb-16 border-b border-white/5">
            <SectionLabel>Forge</SectionLabel>
            <h1 className="text-5xl font-bold text-forge-white mt-5 mb-4 tracking-tight leading-tight">
              Design System
            </h1>
            <p className="text-forge-smoke text-lg leading-relaxed max-w-2xl">
              A reference for the visual language, typography, components, and brand principles
              that define Forge. Use this as the single source of truth when building product,
              marketing, and communications.
            </p>
          </div>

          {/* ── 1. Color Palette ──────────────────────────────────────────── */}
          <Section
            id="colors"
            tag="Tokens"
            title="Color Palette"
            description="All design tokens are defined as CSS custom properties and mapped through Tailwind v4. Use the variable names when writing custom CSS."
          >
            <div className="flex flex-col gap-10">
              {COLORS.map((group) => (
                <div key={group.group}>
                  <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                    {group.group}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {group.swatches.map((swatch) => (
                      <div
                        key={swatch.variable}
                        className="rounded-xl overflow-hidden border border-white/5"
                      >
                        <div
                          className={`${swatch.bg} h-20 w-full`}
                          aria-hidden="true"
                        />
                        <div className="bg-forge-steel/60 px-3 py-3">
                          <p
                            className={`text-sm font-medium ${
                              swatch.textDark ? "text-forge-white" : "text-forge-white"
                            }`}
                          >
                            {swatch.name}
                          </p>
                          <CopyButton text={swatch.hex} />
                          <p className="text-xs text-forge-graphite font-mono mt-1 truncate">
                            {swatch.variable}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 2. Typography ─────────────────────────────────────────────── */}
          <Section
            id="typography"
            tag="Type"
            title="Typography"
            description="Inter is the primary typeface across all headings and body text. JetBrains Mono is reserved for code, metrics, and technical references."
          >
            {/* Type scale */}
            <div className="flex flex-col gap-1 mb-12">
              {TYPE_SCALE.map((item) => (
                <div
                  key={item.label}
                  className="group flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 py-5 border-b border-white/5 last:border-0"
                >
                  <div className="sm:w-28 flex-shrink-0">
                    <span className="text-xs font-mono text-forge-smoke uppercase tracking-widest">
                      {item.label}
                    </span>
                    <p className="text-xs text-forge-graphite mt-0.5 hidden sm:block">
                      {item.spec}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`${item.size} ${item.weight} ${item.tracking} ${item.lineHeight} text-forge-white truncate`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.sample}
                    </p>
                    <p className="text-xs text-forge-graphite mt-1 sm:hidden">{item.spec}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Font specimens */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Font Specimens
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <p className="text-xs font-mono text-forge-smoke uppercase tracking-widest mb-3">
                  Inter: Primary
                </p>
                <p
                  className="text-3xl font-bold text-forge-white mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Aa Bb Cc
                </p>
                <p
                  className="text-forge-ash text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  0123456789 !@#$%&
                </p>
                <p className="text-xs text-forge-smoke mt-4">
                  Weights: 400 Regular · 500 Medium · 600 Semibold · 700 Bold
                </p>
              </Card>

              <Card>
                <p className="text-xs font-mono text-forge-smoke uppercase tracking-widest mb-3">
                  JetBrains Mono: Code &amp; Metrics
                </p>
                <p
                  className="text-3xl font-bold text-forge-cyan mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Aa Bb Cc
                </p>
                <p
                  className="text-forge-ash text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  0123456789 !@#$%&
                </p>
                <p className="text-xs text-forge-smoke mt-4">
                  Usage: code blocks · data labels · metric values · variable names
                </p>
              </Card>
            </div>
          </Section>

          {/* ── 3. Buttons & Components ───────────────────────────────────── */}
          <Section
            id="components"
            tag="UI"
            title="Buttons &amp; Components"
            description="Core interactive and layout primitives. All components follow the 8px border-radius standard for buttons and 12px for larger containers."
          >
            {/* Buttons */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Button: Variants
            </h3>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button variant="primary" size="md">Primary Button</Button>
              <Button variant="secondary" size="md">Secondary Button</Button>
              <Button variant="primary" size="md" disabled>Disabled</Button>
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Button: Sizes
            </h3>
            <div className="flex flex-wrap items-end gap-4 mb-12">
              <div className="text-center">
                <Button variant="primary" size="sm">Small</Button>
                <p className="text-xs text-forge-graphite mt-2">sm</p>
              </div>
              <div className="text-center">
                <Button variant="primary" size="md">Medium</Button>
                <p className="text-xs text-forge-graphite mt-2">md</p>
              </div>
              <div className="text-center">
                <Button variant="primary" size="lg">Large</Button>
                <p className="text-xs text-forge-graphite mt-2">lg</p>
              </div>
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Button: With Icons
            </h3>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button variant="primary" size="md">
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                Start Free Trial
              </Button>
              <Button variant="secondary" size="md">
                <Mic size={16} strokeWidth={2} aria-hidden="true" />
                Start Recording
              </Button>
            </div>

            {/* Card */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Card
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              <Card>
                <SectionLabel>Feature</SectionLabel>
                <h4 className="text-lg font-semibold text-forge-white mt-4 mb-2">
                  Voice-Tagged Photos
                </h4>
                <p className="text-forge-smoke text-sm leading-relaxed">
                  Say "Photo: kitchen sink wall" and it's indexed automatically under the right
                  project area.
                </p>
                <div className="mt-5 flex items-center gap-2 text-forge-cyan text-sm font-medium">
                  <span>Learn more</span>
                  <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </div>
              </Card>
              <Card className="border-forge-cyan/20">
                <div className="flex items-center gap-2 mb-4">
                  <Check
                    size={18}
                    strokeWidth={2}
                    className="text-forge-cyan flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-forge-white font-medium">Card with accent border</span>
                </div>
                <p className="text-forge-smoke text-sm leading-relaxed">
                  Cards can receive a custom className to add accent borders, adjust padding, or
                  extend background treatment for special contexts.
                </p>
              </Card>
            </div>

            {/* SectionLabel */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              SectionLabel
            </h3>
            <div className="flex flex-wrap gap-3">
              <SectionLabel>Capture</SectionLabel>
              <SectionLabel>AI Engine</SectionLabel>
              <SectionLabel>Export</SectionLabel>
              <SectionLabel>Trial</SectionLabel>
              <SectionLabel>New</SectionLabel>
            </div>
          </Section>

          {/* ── 4. Iconography ────────────────────────────────────────────── */}
          <Section
            id="iconography"
            tag="Icons"
            title="Iconography"
            description="All icons are from Lucide React. Use outlined style with 1.5 to 2px stroke weight. Default size is 20px for UI, 16px for inline/button usage."
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-10">
              {ICONS.map(({ name, component: Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-3 p-4 bg-forge-steel/40 border border-white/5 rounded-xl hover:bg-forge-steel/60 hover:border-forge-cyan/20 transition-colors"
                >
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="text-forge-ash"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-forge-smoke text-center leading-tight font-mono">
                    {name}
                  </span>
                </div>
              ))}
            </div>

            <Card className="p-6">
              <h4 className="text-sm font-medium text-forge-white mb-4">Usage Guidelines</h4>
              <ul className="flex flex-col gap-2.5 text-sm text-forge-smoke">
                {[
                  "Use Lucide React exclusively. Do not mix icon libraries.",
                  "Stroke weight: 1.5px for decorative/large icons, 2px for UI controls and inline usage.",
                  "Icon size: 24px standalone, 20px in navigation, 16px inside buttons.",
                  "Never fill icons. Always use the outlined variant.",
                  "Pair icons with text labels in all interactive contexts for accessibility.",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check
                      size={14}
                      strokeWidth={2}
                      className="text-forge-cyan mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {rule}
                  </li>
                ))}
              </ul>
            </Card>
          </Section>

          {/* ── 5. Brand Voice ────────────────────────────────────────────── */}
          <Section
            id="voice"
            tag="Brand"
            title="Brand Voice &amp; Values"
            description="Every word Forge publishes should feel like it came from the same person: a contractor who also happens to build software. Direct, practical, and unafraid."
          >
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Voice Attributes
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {VOICE_ATTRIBUTES.map((attr) => (
                <Card key={attr.label} className="p-6">
                  <h4 className="text-lg font-semibold text-forge-white mb-2">{attr.label}</h4>
                  <p className="text-forge-smoke text-sm leading-relaxed mb-4">
                    {attr.description}
                  </p>
                  <blockquote
                    className="text-forge-cyan text-sm font-mono border-l-2 border-forge-cyan/40 pl-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {attr.example}
                  </blockquote>
                </Card>
              ))}
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Core Values
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {CORE_VALUES.map(({ label, icon: Icon, description }) => (
                <div
                  key={label}
                  className="flex flex-col gap-3 p-5 bg-forge-steel/40 border border-white/5 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-forge-cyan/10 flex items-center justify-center">
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="text-forge-cyan"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-forge-white font-semibold text-sm mb-1">{label}</p>
                    <p className="text-forge-smoke text-xs leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 6. Spacing & Layout ───────────────────────────────────────── */}
          <Section
            id="spacing"
            tag="Layout"
            title="Spacing &amp; Layout"
            description="All spacing follows an 8px base unit system. Use multiples of 4px for fine-grained adjustments. The max content width is 1280px (max-w-7xl)."
          >
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Spacing Scale
            </h3>

            <div className="flex flex-col gap-3 mb-12">
              {SPACING_SCALE.map((step) => (
                <div key={step.value} className="flex items-center gap-4">
                  <div className="w-20 flex-shrink-0 text-right">
                    <span className="text-xs font-mono text-forge-smoke">{step.label}</span>
                  </div>
                  <div
                    className="bg-forge-cyan/30 rounded-sm flex-shrink-0 h-6"
                    style={{ width: step.px }}
                    aria-hidden="true"
                  />
                  <div className="flex gap-4 text-xs font-mono text-forge-graphite">
                    <span className="text-forge-smoke">{step.px}</span>
                    <span>space-{step.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Border Radius
            </h3>
            <div className="flex flex-wrap gap-6 mb-12">
              {[
                { label: "rounded-lg", value: "8px", usage: "Buttons, inputs" },
                { label: "rounded-xl", value: "12px", usage: "Cards, containers" },
                { label: "rounded-2xl", value: "16px", usage: "Modals, large surfaces" },
                { label: "rounded-full", value: "9999px", usage: "Pills, badges" },
              ].map((r) => (
                <div key={r.label} className="flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 bg-forge-steel border border-forge-graphite flex items-center justify-center"
                    style={{
                      borderRadius:
                        r.label === "rounded-full"
                          ? "9999px"
                          : r.label === "rounded-2xl"
                          ? "16px"
                          : r.label === "rounded-xl"
                          ? "12px"
                          : "8px",
                    }}
                    aria-hidden="true"
                  />
                  <div className="text-center">
                    <p className="text-xs font-mono text-forge-ash">{r.label}</p>
                    <p className="text-xs text-forge-graphite">{r.value}</p>
                    <p className="text-xs text-forge-smoke mt-0.5">{r.usage}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Layout Widths
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "max-w-7xl", value: "1280px", usage: "Page container" },
                { label: "max-w-5xl", value: "1024px", usage: "Content sections" },
                { label: "max-w-3xl", value: "768px", usage: "Text-heavy blocks" },
                { label: "max-w-2xl", value: "672px", usage: "Narrow prose, descriptions" },
              ].map((w) => (
                <div key={w.label} className="flex items-center gap-4">
                  <div className="w-32 flex-shrink-0">
                    <span className="text-xs font-mono text-forge-smoke">{w.label}</span>
                  </div>
                  <div className="flex-1 bg-forge-iron rounded-sm h-6 relative overflow-hidden border border-white/5">
                    <div
                      className="absolute left-0 top-0 h-full bg-forge-cyan/20 border-r border-forge-cyan/40"
                      style={{
                        width:
                          w.label === "max-w-7xl"
                            ? "100%"
                            : w.label === "max-w-5xl"
                            ? "80%"
                            : w.label === "max-w-3xl"
                            ? "60%"
                            : "52%",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="w-36 flex-shrink-0 text-xs font-mono text-forge-graphite">
                    {w.value} · {w.usage}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Footer note */}
          <div className="pt-16 text-center">
            <p className="text-forge-smoke text-sm">
              Forge Design System · Updated March 2026
            </p>
            <p className="text-forge-graphite text-xs mt-1">
              Maintained by the Forge product team. For questions, open a design review.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
