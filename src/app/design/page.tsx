"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Mic,
  Brain,
  Send,
  FolderPlus,
  Star,
  ChevronDown,
  Smartphone,
  Menu,
  X,
  Zap,
  Target,
  Layers,
  Shield,
  Users,
  Hexagon,
  Type,
  LayoutTemplate,
  Printer,
  Archive,
  ClipboardCheck,
  BookOpen,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  Film,
  Package,
  FileText,
  Folder,
  Lock,
  Globe,
} from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import {
  LogoNutClassic,
  LogoNutThreaded,
  LogoNutBeveled,
  LogoNutCrosshair,
  LogoNutDouble,
  LogoNutSplit,
  LogoNutMinimal,
  LogoNutHeavy,
  LogoHexSocket,
  LogoNutData,
  LogoNutWrench,
  LogoNutPerspective,
} from "@/components/logos/ForgeLogos";
import {
  Logo3DNutMetallic,
  Logo3DNutIsometric,
  Logo3DNutGlow,
  Logo3DNutWireframe,
  Logo3DNutChrome,
  Logo3DNutFloating,
  Logo3DNutEmbossed,
  Logo3DNutHologram,
  Logo3DNutStacked,
  Logo3DNutExploded,
  Logo3DNutOrbital,
  Logo3DNutTargeting,
} from "@/components/logos/ForgeLogos3D";
import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/animations";

// ─── Nav sections ─────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "brand-foundation", label: "Brand Foundation & Strategy" },
  { id: "mission-vision", label: "Mission, Vision & Values" },
  { id: "target-audience", label: "Target Audience & Positioning" },
  { id: "brand-personality", label: "Brand Personality & Voice" },
  { id: "logo-system", label: "Logo System" },
  { id: "color-palette", label: "Color Palette" },
  { id: "typography", label: "Typography" },
  { id: "imagery", label: "Imagery & Photography Style" },
  { id: "iconography", label: "Iconography & Graphic Elements" },
  { id: "layout-grid", label: "Layout & Grid Systems" },
  { id: "spatial-design", label: "Spatial Design System" },
  { id: "digital-guidelines", label: "Digital Guidelines" },
  { id: "brand-asset-management", label: "Brand Asset Management" },
  { id: "appendix-landing", label: "Appendix A: Landing Page Structure" },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLOR_SWATCHES = [
  {
    name: "Primary BG",
    hex: "#0A0A0F",
    variable: "--color-forge-iron",
    label: "Deep Black",
    textLight: true,
  },
  {
    name: "Body BG",
    hex: "#050507",
    variable: "--color-forge-body",
    label: "True Dark",
    textLight: true,
  },
  {
    name: "Primary Accent",
    hex: "#0EA5E9",
    variable: "--color-forge-cyan",
    label: "Cyan / Electric Blue",
    textLight: false,
  },
  {
    name: "Secondary Accent",
    hex: "#14B8A6",
    variable: "--color-forge-teal",
    label: "Teal",
    textLight: false,
  },
  {
    name: "Cards / Surfaces",
    hex: "#1E293B",
    variable: "--color-forge-steel",
    label: "Dark Slate",
    textLight: true,
  },
  {
    name: "Dark Neutral",
    hex: "#111827",
    variable: "--color-forge-charcoal",
    label: "Charcoal",
    textLight: true,
  },
  {
    name: "Primary Text",
    hex: "#F8FAFC",
    variable: "--color-forge-white",
    label: "Near White",
    textLight: false,
  },
  {
    name: "Secondary Text",
    hex: "#94A3B8",
    variable: "--color-forge-smoke",
    label: "Slate Gray",
    textLight: false,
  },
];

const CONTRAST_RATIOS = [
  {
    fg: "#F8FAFC",
    bg: "#0A0A0F",
    fgLabel: "#F8FAFC",
    bgLabel: "#0A0A0F",
    ratio: "18.4:1",
    level: "AAA",
  },
  {
    fg: "#94A3B8",
    bg: "#0A0A0F",
    fgLabel: "#94A3B8",
    bgLabel: "#0A0A0F",
    ratio: "7.1:1",
    level: "AA",
  },
  {
    fg: "#0EA5E9",
    bg: "#0A0A0F",
    fgLabel: "#0EA5E9",
    bgLabel: "#0A0A0F",
    ratio: "5.8:1",
    level: "AA",
  },
];

const PERSONALITY_SPECTRUM = [
  { left: "Formal", right: "Casual", position: 35 },
  { left: "Serious", right: "Playful", position: 25 },
  { left: "Luxurious", right: "Affordable", position: 50 },
  { left: "Traditional", right: "Modern", position: 70 },
  { left: "Bold", right: "Subtle", position: 20 },
  { left: "Corporate", right: "Friendly", position: 50 },
  { left: "Authoritative", right: "Approachable", position: 50 },
  { left: "Minimalist", right: "Expressive", position: 30 },
];

const VOICE_ATTRIBUTES = [
  {
    label: "Direct",
    description: "No fluff, no jargon. Say what the product does.",
  },
  {
    label: "Confident",
    description: "We know the problem and we built the fix.",
  },
  {
    label: "Practical",
    description: "Speak the language of the jobsite, not the boardroom.",
  },
  {
    label: "Empathetic",
    description: "We get the grind. We respect the trade.",
  },
  {
    label: "Bold",
    description: "Make strong claims backed by real results.",
  },
];

const CORE_VALUES = [
  {
    label: "Efficiency",
    icon: Zap,
    description: "Every feature must save real time in the field",
  },
  {
    label: "Accuracy",
    icon: Target,
    description: "AI should structure, never assume. Flag uncertainty, don't hide it",
  },
  {
    label: "Simplicity",
    icon: Layers,
    description: "If it takes more than one tap, it's too complicated",
  },
  {
    label: "Trade First",
    icon: Users,
    description: "Built by people who understand the jobsite, not just the office",
  },
  {
    label: "Trust",
    icon: Shield,
    description: "Contractors stake their reputation on our data. We earn that daily",
  },
];

const TYPE_SCALE = [
  {
    label: "H1",
    spec: "48 to 64px · Bold · 0.02em",
    className: "text-5xl font-bold tracking-tight leading-tight",
    sample: "Build Faster. Scope Smarter.",
  },
  {
    label: "H2",
    spec: "32 to 40px · Semibold · 0.01em",
    className: "text-4xl font-semibold tracking-tight leading-snug",
    sample: "Walk the Job. We'll Handle the Notes.",
  },
  {
    label: "H3",
    spec: "24 to 28px · Medium",
    className: "text-2xl font-medium leading-snug",
    sample: "Raw Walk to Structured Scope",
  },
  {
    label: "Body",
    spec: "16 to 18px · Regular · 1.6 line-height",
    className: "text-base font-normal leading-relaxed",
    sample: "Forge records audio up to 90 minutes and photos you can voice tag on the fly.",
  },
  {
    label: "Caption",
    spec: "12 to 14px · Medium · uppercase",
    className: "text-sm font-medium uppercase tracking-[0.15em]",
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
  { name: "Smartphone", component: Smartphone },
  { name: "Menu", component: Menu },
  { name: "X", component: X },
];

const COMPETITORS = [
  {
    name: "Buildertrend",
    positioning: "Established trust, comprehensive construction management features",
    lacks: "Not built for field capture, generic brand identity, no walk-to-handoff workflow",
    tier: "Established",
  },
  {
    name: "Procore",
    positioning: "Premium positioning, enterprise credibility, deep integrations",
    lacks: "Too enterprise-heavy, expensive for smaller GCs, not focused on walk-to-handoff",
    tier: "Enterprise",
  },
  {
    name: "Manual Workflow",
    positioning: "Otter.ai + ChatGPT + Buildertrend: flexible, familiar tools",
    lacks: "No integration between tools, massive time waste (20 to 40 min/walk), zero consistency",
    tier: "Status Quo",
  },
];

const LOGO_INSPIRATION = [
  { name: "Tesla", note: "Clean, futuristic, premium tech" },
  { name: "Palantir", note: "Dark, commanding, intelligence-focused" },
  { name: "Linear", note: "Developer-tool precision" },
  { name: "Vercel", note: "Minimal, modern" },
  { name: "Arc Browser", note: "Bold wordmark + distinctive icon" },
];

const PRINT_COLLATERAL = [
  { label: "Business Cards", checked: true },
  { label: "Letterhead & Envelopes", checked: false },
  { label: "Presentation Templates (PowerPoint / Keynote)", checked: true },
  { label: "Brochures / Flyers", checked: false },
  { label: "Packaging Design", checked: false },
  { label: "Signage / Wayfinding", checked: false },
  { label: "Trade Show / Event Materials", checked: true },
  { label: "Merchandise / Swag", checked: true },
  { label: "Vehicle Wraps", checked: false },
  { label: "Uniforms / Apparel", checked: true },
];

const ASSET_FILE_FORMATS = [
  { label: "SVG", checked: true },
  { label: "PNG", checked: true },
  { label: "JPG", checked: true },
  { label: "PDF", checked: true },
  { label: "EPS / AI", checked: true },
  { label: "WEBP", checked: true },
];

const FINAL_CHECKLIST = [
  "Brand foundation and strategy defined",
  "Mission, vision, and values documented",
  "Target audience and positioning clear",
  "Brand personality and voice established",
  "Logo system requirements defined",
  "Color palette selected with usage rules",
  "Typography system chosen with type scale",
  "Imagery and photography style set",
  "Iconography and graphic elements defined",
  "Layout and grid systems established",
  "Digital guidelines documented",
  "Print applications identified",
  "Brand asset management plan in place",
];

const LANDING_PAGE_SECTIONS = [
  {
    num: "01",
    title: "Hero Section",
    desc: '"One Walk. Zero Typing. Job-Ready Data." + primary CTA to book demo',
  },
  {
    num: "02",
    title: "Problem Section",
    desc: "Identify the 4-tool juggling problem",
  },
  {
    num: "03",
    title: "Features Showcase",
    desc: "High-fidelity app mockups showing ScopeSnap",
  },
  {
    num: "04",
    title: '"The Forge Way"',
    desc: "Visual workflow: Capture → Structure → Export",
  },
  {
    num: "05",
    title: "Impact Metrics",
    desc: "$39B+ TAM, $3.1B SAM, $62M 5-Year SOM",
  },
  {
    num: "06",
    title: "Testimonials",
    desc: "Customer quotes with photos and real names",
  },
  {
    num: "07",
    title: "Pricing Section",
    desc: "Content from Christian",
  },
  {
    num: "08",
    title: "Final CTA",
    desc: "Link to Christian's Calendly",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // silently fail
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs font-mono text-forge-smoke hover:text-forge-cyan transition-colors cursor-pointer select-none"
      title={`Copy ${text}`}
    >
      {copied ? "copied ✓" : text}
    </button>
  );
}

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
    <motion.section
      id={id}
      className="scroll-mt-24 py-16 border-b border-white/5"
      {...fadeUp}
    >
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
    </motion.section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5 flex items-center gap-3">
        <span className="flex-1 h-px bg-white/5" />
        <span>{title}</span>
        <span className="flex-1 h-px bg-white/5" />
      </h3>
      {children}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DesignPage() {
  const [activeSection, setActiveSection] = useState("brand-foundation");
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

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
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
            <span className="text-forge-smoke text-sm font-medium">Design Guideline</span>
          </div>

          <button
            className="md:hidden text-forge-smoke hover:text-forge-white transition-colors"
            onClick={() => setMobileSidebarOpen((o) => !o)}
            aria-label="Toggle section navigation"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile overlay nav ───────────────────────────────────────────────── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-16">
          <div
            className="absolute inset-0 bg-forge-iron/95 backdrop-blur-md"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <nav className="relative px-6 py-6 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {NAV_SECTIONS.map((section, i) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-3 ${
                  activeSection === section.id
                    ? "text-forge-cyan"
                    : "text-forge-smoke hover:text-forge-white"
                }`}
              >
                <span className="font-mono text-forge-graphite text-xs w-5 flex-shrink-0">
                  {i < 14 ? String(i + 1).padStart(2, "0") : "A"}
                </span>
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24 flex gap-16">

        {/* ── Sticky sidebar ───────────────────────────────────────────────── */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-40 max-h-[calc(100vh-12rem)] flex flex-col">
            <p className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4 px-4 font-mono flex-shrink-0">
              Contents
            </p>
            <nav className="flex flex-col gap-0.5 overflow-y-auto scrollbar-thin pr-2" aria-label="Design guideline sections" style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}>
              {NAV_SECTIONS.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`text-left px-4 py-2.5 text-sm font-medium transition-all duration-150 flex items-center gap-3 ${
                    activeSection === section.id
                      ? "bg-forge-cyan/10 text-forge-cyan border-l-2 border-forge-cyan"
                      : "text-forge-smoke hover:text-forge-white hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                >
                  <span className="font-mono text-xs opacity-40 w-4 flex-shrink-0">
                    {i < 14 ? String(i + 1).padStart(2, "0") : "A"}
                  </span>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">

          {/* Page header */}
          <motion.div className="mb-16 pb-16 border-b border-white/5" {...fadeUp}>
            <SectionLabel>Forge Brand</SectionLabel>
            <h1 className="text-5xl font-bold text-forge-white mt-5 mb-4 tracking-tight leading-tight">
              Brand Design Guideline
            </h1>
            <p className="text-forge-smoke text-lg leading-relaxed max-w-2xl mb-6">
              The complete brand workbook for Forge, covering foundation, personality,
              visual identity, and digital guidelines. Use this as the single source of
              truth for all design and communications.
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-mono text-forge-smoke">
              <span>Forge Equipment Inc.</span>
              <span className="text-forge-graphite">·</span>
              <span>forgeequipment.com</span>
              <span className="text-forge-graphite">·</span>
              <span>Founded 2026</span>
              <span className="text-forge-graphite">·</span>
              <span>Version 1.0 · March 2026</span>
            </div>
          </motion.div>

          {/* ── 1. Brand Foundation ──────────────────────────────────────────── */}
          <Section
            id="brand-foundation"
            tag="01 · Foundation"
            title="Brand Foundation & Strategy"
            description="The core facts, origin story, and context that define who Forge is and why it exists."
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: "Company", value: "Forge" },
                { label: "Domain", value: "forgeequipment.com" },
                { label: "Industry", value: "Construction Technology (ConTech) / SaaS" },
                { label: "Founded", value: "2026" },
                { label: "Type", value: "B2B" },
                { label: "Market", value: "General Contractors, Project Managers, Construction Firms" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 p-5 bg-forge-steel/30 border border-white/5 rounded-xl"
                >
                  <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.15em]">
                    {item.label}
                  </span>
                  <span className="text-forge-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-4 bg-forge-cyan rounded-full" />
                  <h3 className="text-sm font-medium text-forge-white uppercase tracking-[0.12em] font-mono">
                    Brand Story
                  </h3>
                </div>
                <p className="text-forge-smoke text-sm leading-relaxed">
                  Contractors waste 20 to 40 minutes after every job walk juggling 4+ tools
                  (Meta Glasses, Otter.ai, ChatGPT, Buildertrend) just to organize notes,
                  reformat scope, and hand off data to their PM. Critical details get lost in
                  translation, formatting is inconsistent, and the process is entirely manual.
                  Forge was built to eliminate that post walk chaos, turning a single job walk
                  into structured, export ready data with zero typing.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-4 bg-forge-teal rounded-full" />
                  <h3 className="text-sm font-medium text-forge-white uppercase tracking-[0.12em] font-mono">
                    Origin
                  </h3>
                </div>
                <p className="text-forge-smoke text-sm leading-relaxed">
                  Born from firsthand frustration on real job sites. The founding team saw
                  contractors repeatedly losing time and accuracy between the field and the
                  office. The name &ldquo;Forge&rdquo; represents taking raw, unstructured
                  field data and shaping it into something solid and useful, like metal
                  through a forge.
                </p>
              </Card>
            </div>
          </Section>

          {/* ── 2. Mission, Vision & Values ──────────────────────────────────── */}
          <Section
            id="mission-vision"
            tag="02 · Purpose"
            title="Mission, Vision & Values"
          >
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <Card className="p-6 border-forge-cyan/20">
                <SectionLabel>Mission</SectionLabel>
                <p className="text-forge-white text-lg font-medium leading-relaxed mt-4">
                  &ldquo;To give contractors back their time by turning raw job walks into
                  structured, job ready data. No typing, no reformatting, no wasted hours.&rdquo;
                </p>
              </Card>
              <Card className="p-6">
                <SectionLabel>Vision</SectionLabel>
                <p className="text-forge-ash text-base leading-relaxed mt-4">
                  &ldquo;Forge becomes the operating system for field intelligence, the single
                  platform where every job walk, site visit, and field observation is
                  automatically captured, structured, and routed to the right people and
                  systems.&rdquo;
                </p>
              </Card>
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Core Values
            </h3>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
              {...staggerContainer}
            >
              {CORE_VALUES.map(({ label, icon: Icon, description }) => (
                <motion.div
                  key={label}
                  className="flex flex-col gap-3 p-5 bg-forge-steel/40 border border-white/5 rounded-xl hover:border-forge-cyan/20 transition-colors"
                  {...fadeUp}
                >
                  <div className="w-10 h-10 rounded-lg bg-forge-cyan/10 flex items-center justify-center">
                    <Icon size={18} strokeWidth={1.5} className="text-forge-cyan" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-forge-white font-semibold text-sm mb-1">{label}</p>
                    <p className="text-forge-smoke text-xs leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Section>

          {/* ── 3. Target Audience ───────────────────────────────────────────── */}
          <Section
            id="target-audience"
            tag="03 · Audience"
            title="Target Audience & Positioning"
            description="Who Forge is built for: their profile, pain points, and goals."
          >
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Primary Audience
                </h3>
                <Card className="p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs font-mono text-forge-smoke uppercase tracking-[0.12em] mb-1">Roles</p>
                      <p className="text-forge-white text-sm">GCs, PMs, Construction Firm Owners</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-forge-smoke uppercase tracking-[0.12em] mb-1">Age</p>
                      <p className="text-forge-white text-sm">30 to 55 years</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-forge-smoke uppercase tracking-[0.12em] mb-1">Income</p>
                      <p className="text-forge-white text-sm">$75K to $200K+</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-forge-smoke uppercase tracking-[0.12em] mb-1">Geography</p>
                      <p className="text-forge-white text-sm">Austin TX / Denver CO, expanding nationally</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Secondary Audience
                </h3>
                <Card className="p-6">
                  <div className="flex flex-col gap-3">
                    {["Project Managers", "Subcontractors", "Operations Managers"].map((role) => (
                      <div key={role} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-forge-teal flex-shrink-0" />
                        <span className="text-forge-ash text-sm">{role}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Pain Points
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    "Post walk data entry taking 20 to 40 min per job",
                    "Juggling 4+ disconnected tools",
                    "Inconsistent formatting across projects",
                    "Critical details lost between field and office",
                    "PM handoff friction and follow-up calls",
                  ].map((pain) => (
                    <div
                      key={pain}
                      className="flex items-start gap-3 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0 mt-1.5" />
                      <span className="text-forge-smoke text-sm">{pain}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Goals
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    "Run more jobs with less admin overhead",
                    "Deliver clean, professional scope documents",
                    "Look professional to clients and subs",
                    "Scale without adding headcount",
                  ].map((goal) => (
                    <div
                      key={goal}
                      className="flex items-start gap-3 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg"
                    >
                      <Check size={14} strokeWidth={2} className="text-forge-cyan flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-forge-smoke text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card className="p-6 border-forge-cyan/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4 bg-forge-cyan rounded-full" />
                <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.15em]">Positioning Statement</span>
              </div>
              <p className="text-forge-ash text-base leading-relaxed italic">
                &ldquo;For general contractors and project managers, Forge is the AI powered
                field intelligence platform that turns a single job walk into structured,
                export ready data, because it replaces four disconnected tools with one
                seamless workflow that saves 20+ minutes per walk with zero typing required.&rdquo;
              </p>
            </Card>
          </Section>

          {/* ── 4. Brand Personality & Voice ─────────────────────────────────── */}
          <Section
            id="brand-personality"
            tag="04 · Personality"
            title="Brand Personality & Voice"
            description="How Forge sounds and feels across all touchpoints, from marketing copy to in app microcopy."
          >
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-6">
              Personality Spectrum
            </h3>
            <div className="flex flex-col gap-5 mb-12">
              {PERSONALITY_SPECTRUM.map(({ left, right, position }) => (
                <div key={left} className="flex items-center gap-4">
                  <span className="w-28 text-right text-sm text-forge-ash flex-shrink-0">{left}</span>
                  <div className="flex-1 relative h-1.5 bg-forge-steel/60 rounded-full">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-forge-cyan border-2 border-forge-iron shadow-[0_0_8px_rgba(14,165,233,0.6)]"
                      style={{ left: `calc(${position}% - 6px)` }}
                    />
                    <div
                      className="h-full bg-forge-cyan/30 rounded-l-full"
                      style={{ width: `${position}%` }}
                    />
                  </div>
                  <span className="w-28 text-sm text-forge-smoke flex-shrink-0">{right}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Voice Attributes
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {VOICE_ATTRIBUTES.map((attr) => (
                <Card key={attr.label} className="p-6">
                  <h4 className="text-forge-white font-semibold text-base mb-2">{attr.label}</h4>
                  <p className="text-forge-smoke text-sm leading-relaxed">{attr.description}</p>
                </Card>
              ))}
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Tone Don&apos;ts
            </h3>
            <Card className="p-6">
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Never use \"revolutionize,\" \"synergy,\" \"paradigm shift\"",
                  "Avoid all corporate buzzwords and MBA-speak",
                  "Never talk down to tradespeople",
                  "Avoid overly technical AI language",
                  "No exclamation-heavy hype writing",
                  "Never make the product sound like magic. Make it sound like a tool",
                ].map((rule) => (
                  <div key={rule} className="flex items-start gap-2.5">
                    <X size={14} strokeWidth={2} className="text-red-400/70 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-forge-smoke text-sm">{rule}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Section>

          {/* ── 5. Logo System ───────────────────────────────────────────────── */}
          <Section
            id="logo-system"
            tag="05 · Logo"
            title="Logo System"
            description="Current logo is a wordmark 'FORGE' paired with an abstract hexagonal ring shape, combining industrial construction references with a modern, geometric aesthetic. Direction: refine into a full logo system."
          >
            {/* ── Custom Logo Iterations: Hex Nut Concepts ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-3">
              Custom Icon Mark Iterations: Hex Nut Concepts
            </h3>
            <p className="text-forge-smoke text-sm mb-6">
              12 hex nut variations exploring the construction hardware motif. Each connects to the &ldquo;Forge&rdquo; brand story: raw material shaped into something precise and useful.
            </p>

            {/* Icon marks grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {[
                { Component: LogoNutClassic, name: "Classic Nut", desc: "Clean hex + bore hole" },
                { Component: LogoNutThreaded, name: "Threaded", desc: "Internal thread rings" },
                { Component: LogoNutBeveled, name: "Beveled", desc: "Chamfered depth lines" },
                { Component: LogoNutCrosshair, name: "Crosshair", desc: "Precision targeting" },
                { Component: LogoNutDouble, name: "Double Hex", desc: "Rotated lock washer" },
                { Component: LogoNutSplit, name: "Split", desc: "Raw to refined gap" },
                { Component: LogoNutMinimal, name: "Minimal", desc: "Ultra-clean single weight" },
                { Component: LogoNutHeavy, name: "Heavy", desc: "Bold industrial presence" },
                { Component: LogoHexSocket, name: "Socket", desc: "Allen key / hex socket" },
                { Component: LogoNutData, name: "Data Lines", desc: "Hardware meets data" },
                { Component: LogoNutWrench, name: "Wrench Flats", desc: "Wrench grip indicators" },
                { Component: LogoNutPerspective, name: "Perspective", desc: "3D angled view" },
              ].map(({ Component, name, desc }) => (
                <Card key={name} className="p-5 flex flex-col items-center justify-center gap-3 min-h-[160px] hover:border-forge-cyan/30 transition-colors">
                  <Component size={56} color="#F8FAFC" />
                  <div className="text-center">
                    <p className="text-xs font-medium text-forge-white">{name}</p>
                    <p className="text-[10px] text-forge-smoke mt-0.5">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Combo marks with each icon */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-3 mt-10">
              Combination Marks: Icon + Wordmark
            </h3>
            <p className="text-forge-smoke text-sm mb-6">
              Each hex nut icon paired with the FORGE wordmark in horizontal layout.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { Component: LogoNutClassic, name: "Classic" },
                { Component: LogoNutThreaded, name: "Threaded" },
                { Component: LogoNutCrosshair, name: "Crosshair" },
                { Component: LogoNutDouble, name: "Double Hex" },
                { Component: LogoNutMinimal, name: "Minimal" },
                { Component: LogoHexSocket, name: "Socket" },
                { Component: LogoNutData, name: "Data Lines" },
                { Component: LogoNutPerspective, name: "Perspective" },
              ].map(({ Component, name }) => (
                <Card key={name} className="p-6 flex items-center justify-between min-h-[100px] hover:border-forge-cyan/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <Component size={36} color="#F8FAFC" />
                    <span className="text-2xl font-medium text-forge-white tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                      FORGE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest">{name}</span>
                </Card>
              ))}
            </div>

            {/* Light BG versions of top picks */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-3 mt-10">
              Light Background Versions
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {[
                { Component: LogoNutClassic, name: "Classic" },
                { Component: LogoNutCrosshair, name: "Crosshair" },
                { Component: LogoNutDouble, name: "Double Hex" },
              ].map(({ Component, name }) => (
                <div key={name} className="bg-forge-white rounded-xl p-6 flex flex-col items-center justify-center gap-3 min-h-[140px]">
                  <div className="flex items-center gap-3">
                    <Component size={28} color="#0A0A0F" />
                    <span className="text-xl font-medium text-forge-iron tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                      FORGE
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-forge-graphite uppercase tracking-widest">{name} · Light</p>
                </div>
              ))}
            </div>

            {/* ── 3D Logo Iterations ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-3 mt-12">
              3D Hex Nut Iterations
            </h3>
            <p className="text-forge-smoke text-sm mb-6">
              Dimensional variations with metallic gradients, holographic effects, and isometric perspectives. Aligned with the brand&apos;s sci-fi / premium tech aesthetic.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {[
                { Component: Logo3DNutMetallic, name: "Metallic", desc: "Polished metal gradients" },
                { Component: Logo3DNutIsometric, name: "Isometric", desc: "Clean technical illustration" },
                { Component: Logo3DNutGlow, name: "Cyan Glow", desc: "Sci-fi edge lighting" },
                { Component: Logo3DNutWireframe, name: "Wireframe", desc: "Transparent blueprint" },
                { Component: Logo3DNutChrome, name: "Chrome", desc: "High-polish reflections" },
                { Component: Logo3DNutFloating, name: "Floating", desc: "Elevated with glow shadow" },
                { Component: Logo3DNutEmbossed, name: "Embossed", desc: "Stamped depth relief" },
                { Component: Logo3DNutHologram, name: "Hologram", desc: "Scan-line holographic" },
                { Component: Logo3DNutStacked, name: "Stacked", desc: "Layered double nut" },
                { Component: Logo3DNutExploded, name: "Exploded", desc: "Separated assembly view" },
                { Component: Logo3DNutOrbital, name: "Orbital", desc: "Ring orbit + nut" },
                { Component: Logo3DNutTargeting, name: "Targeting", desc: "Crosshair + brackets" },
              ].map(({ Component, name, desc }) => (
                <Card key={name} className="p-5 flex flex-col items-center justify-center gap-3 min-h-[170px] hover:border-forge-cyan/30 transition-colors">
                  <Component size={64} />
                  <div className="text-center">
                    <p className="text-xs font-medium text-forge-white">{name}</p>
                    <p className="text-[10px] text-forge-smoke mt-0.5">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* 3D Combo marks */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-3 mt-10">
              3D Combination Marks: Icon + Wordmark
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { Component: Logo3DNutChrome, name: "Chrome" },
                { Component: Logo3DNutGlow, name: "Cyan Glow" },
                { Component: Logo3DNutHologram, name: "Hologram" },
                { Component: Logo3DNutOrbital, name: "Orbital" },
                { Component: Logo3DNutMetallic, name: "Metallic" },
                { Component: Logo3DNutTargeting, name: "Targeting" },
              ].map(({ Component, name }) => (
                <Card key={name} className="p-6 flex items-center justify-between min-h-[100px] hover:border-forge-cyan/30 transition-colors">
                  <div className="flex items-center gap-5">
                    <Component size={44} />
                    <span className="text-2xl font-medium text-forge-white tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                      FORGE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest">{name}</span>
                </Card>
              ))}
            </div>

            {/* ── Logo Configurations ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-6">
              Logo Configurations
            </h3>

            {/* Combination Mark — Dark BG */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Horizontal — with icon */}
              <Card className="p-8 flex flex-col items-center justify-center gap-2 min-h-[160px]">
                <div className="flex items-center gap-3">
                  <Hexagon size={28} strokeWidth={1.5} className="text-forge-ash" aria-hidden="true" />
                  <span className="text-3xl font-medium text-forge-white tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    FORGE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest mt-3">Combination Mark · Horizontal · Dark BG</p>
              </Card>

              {/* Stacked — with icon */}
              <Card className="p-8 flex flex-col items-center justify-center gap-2 min-h-[160px]">
                <div className="flex flex-col items-center gap-2">
                  <Hexagon size={36} strokeWidth={1.5} className="text-forge-ash" aria-hidden="true" />
                  <span className="text-2xl font-medium text-forge-white tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    FORGE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest mt-3">Combination Mark · Stacked · Dark BG</p>
              </Card>
            </div>

            {/* All 5 Logo Types */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4 mt-2">
              All Logo Types
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {/* Wordmark only */}
              <Card className="p-8 flex flex-col items-center justify-center gap-2 min-h-[160px] border-forge-cyan/20">
                <span className="text-3xl font-medium text-forge-white tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                  FORGE
                </span>
                <p className="text-[10px] font-mono text-forge-cyan uppercase tracking-widest mt-3">Wordmark · Selected</p>
              </Card>

              {/* Icon / Symbol only */}
              <Card className="p-8 flex flex-col items-center justify-center gap-2 min-h-[160px] border-forge-cyan/20">
                <Hexagon size={52} strokeWidth={1.5} className="text-forge-white" aria-hidden="true" />
                <p className="text-[10px] font-mono text-forge-cyan uppercase tracking-widest mt-3">Icon / Symbol · Selected</p>
              </Card>

              {/* Combination Mark — PREFERRED */}
              <Card className="p-8 flex flex-col items-center justify-center gap-2 min-h-[160px] border-forge-cyan/30 bg-forge-cyan/5">
                <div className="flex items-center gap-3">
                  <Hexagon size={28} strokeWidth={1.5} className="text-forge-ash" aria-hidden="true" />
                  <span className="text-3xl font-medium text-forge-white tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    FORGE
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <p className="text-[10px] font-mono text-forge-cyan uppercase tracking-widest">Combination Mark · Preferred</p>
                </div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Lettermark — not selected */}
              <div className="p-8 flex flex-col items-center justify-center gap-2 min-h-[160px] border border-white/5 rounded-xl opacity-50">
                <div className="flex items-center gap-1">
                  <Hexagon size={18} strokeWidth={1.5} className="text-forge-smoke" aria-hidden="true" />
                  <span className="text-4xl font-medium text-forge-smoke tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    F
                  </span>
                </div>
                <p className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest mt-3">Lettermark · Not Selected</p>
              </div>

              {/* Emblem — not selected */}
              <div className="p-8 flex flex-col items-center justify-center gap-2 min-h-[160px] border border-white/5 rounded-xl opacity-50">
                <div className="relative flex items-center justify-center">
                  <Hexagon size={80} strokeWidth={1} className="text-forge-smoke" aria-hidden="true" />
                  <span className="absolute text-[9px] font-bold text-forge-smoke tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    FORGE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest mt-3">Emblem · Not Selected</p>
              </div>
            </div>

            {/* Dark vs Light BG versions */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4 mt-8">
              Color Mode Versions
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Dark BG */}
              <Card className="p-8 flex flex-col items-center justify-center gap-3 min-h-[160px]">
                <div className="flex items-center gap-3">
                  <Hexagon size={24} strokeWidth={1.5} className="text-forge-ash" aria-hidden="true" />
                  <span className="text-2xl font-medium text-forge-white tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    FORGE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest">White on Dark · Primary</p>
              </Card>

              {/* Light BG */}
              <div className="bg-forge-white border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 min-h-[160px]">
                <div className="flex items-center gap-3">
                  <Hexagon size={24} strokeWidth={1.5} className="text-forge-iron" aria-hidden="true" />
                  <span className="text-2xl font-medium text-forge-iron tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    FORGE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-forge-graphite uppercase tracking-widest">Dark on Light · Secondary</p>
              </div>
            </div>

            {/* One-color versions */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="p-6 flex flex-col items-center justify-center gap-2 min-h-[120px]">
                <div className="flex items-center gap-2.5">
                  <Hexagon size={20} strokeWidth={1.5} className="text-white" aria-hidden="true" />
                  <span className="text-xl font-medium text-white tracking-[0.2em] uppercase">FORGE</span>
                </div>
                <p className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest mt-2">One-Color White</p>
              </Card>

              <div className="bg-forge-white rounded-xl p-6 flex flex-col items-center justify-center gap-2 min-h-[120px]">
                <div className="flex items-center gap-2.5">
                  <Hexagon size={20} strokeWidth={1.5} className="text-black" aria-hidden="true" />
                  <span className="text-xl font-medium text-black tracking-[0.2em] uppercase">FORGE</span>
                </div>
                <p className="text-[10px] font-mono text-forge-graphite uppercase tracking-widest mt-2">One-Color Black</p>
              </div>

              <div className="bg-forge-steel rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center gap-2 min-h-[120px]">
                <div className="flex items-center gap-2.5">
                  <Hexagon size={20} strokeWidth={1.5} className="text-forge-cyan" aria-hidden="true" />
                  <span className="text-xl font-medium text-forge-cyan tracking-[0.2em] uppercase">FORGE</span>
                </div>
                <p className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest mt-2">One-Color Cyan</p>
              </div>
            </div>

            {/* ── Logo with Font Variations ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-6 mt-12">
              Wordmark Font Explorations
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { font: "var(--font-body)", name: "Inter", note: "Current: clean, neutral, universal readability" },
                { font: "var(--font-space-grotesk)", name: "Space Grotesk", note: "Angular terminals, sharper tech feel" },
                { font: "var(--font-outfit)", name: "Outfit", note: "Wide geometric, premium uppercase presence" },
                { font: "var(--font-mono)", name: "JetBrains Mono", note: "Technical, code-native, developer aesthetic" },
              ].map(({ font, name, note }) => (
                <Card key={name} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Hexagon size={22} strokeWidth={1.5} className="text-forge-ash" aria-hidden="true" />
                    <span
                      className="text-3xl font-medium text-forge-white tracking-[0.2em] uppercase"
                      style={{ fontFamily: font }}
                    >
                      FORGE
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-forge-cyan uppercase tracking-widest">{name}</span>
                    <span className="text-xs text-forge-smoke">{note}</span>
                  </div>
                  {/* Tagline preview */}
                  <p className="text-forge-smoke text-sm mt-3" style={{ fontFamily: font }}>
                    The Operating System for Field Intelligence
                  </p>
                </Card>
              ))}
            </div>

            {/* ── Logo with Font + Weight Combos ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-6">
              Weight &amp; Tracking Variations
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {[
                { weight: "font-light", tracking: "tracking-[0.3em]", label: "Light · Wide" },
                { weight: "font-normal", tracking: "tracking-[0.2em]", label: "Regular · Standard" },
                { weight: "font-medium", tracking: "tracking-[0.15em]", label: "Medium · Moderate" },
                { weight: "font-semibold", tracking: "tracking-[0.1em]", label: "Semibold · Tight" },
                { weight: "font-bold", tracking: "tracking-[0.05em]", label: "Bold · Compact" },
                { weight: "font-bold", tracking: "tracking-[0.2em]", label: "Bold · Wide" },
              ].map(({ weight, tracking, label }) => (
                <Card key={label} className="p-6 flex flex-col items-center justify-center min-h-[120px]">
                  <div className="flex items-center gap-2.5">
                    <Hexagon size={18} strokeWidth={1.5} className="text-forge-ash" aria-hidden="true" />
                    <span className={`text-2xl ${weight} ${tracking} text-forge-white uppercase`} style={{ fontFamily: "var(--font-body)" }}>
                      FORGE
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest mt-3">{label}</p>
                </Card>
              ))}
            </div>

            {/* ── Logo Types Checklist ── */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Logo Types
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Wordmark (text-only)", checked: true },
                    { label: "Lettermark (initials)", checked: false },
                    { label: "Icon / Symbol (standalone graphic)", checked: true },
                    { label: "Combination Mark (icon + text)", checked: true, preferred: true },
                    { label: "Emblem (text inside symbol)", checked: false },
                  ].map(({ label, checked, preferred }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-3 p-3.5 border rounded-lg transition-colors ${
                        preferred
                          ? "bg-forge-cyan/5 border-forge-cyan/20"
                          : "bg-forge-steel/20 border-white/5"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                          checked
                            ? "bg-forge-cyan border-forge-cyan"
                            : "border-forge-graphite bg-transparent"
                        }`}
                      >
                        {checked && <Check size={10} strokeWidth={3} className="text-forge-iron" />}
                      </div>
                      <span className={`text-sm ${checked ? "text-forge-ash" : "text-forge-smoke/50"}`}>
                        {label}
                      </span>
                      {preferred && (
                        <span className="ml-auto text-xs font-mono text-forge-cyan uppercase tracking-wider">
                          Preferred
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Usage Requirements
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Primary BG", value: "Dark (primary). Must also work on light." },
                    { label: "Minimum Size", value: "Favicon 16px · Mobile icon 1024px · Header & vehicle scale" },
                    { label: "One-Color", value: "White on dark backgrounds, dark on light backgrounds" },
                    { label: "Orientation", value: "Horizontal for nav/header, stacked for app icon/social" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-3 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg">
                      <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.1em] w-24 flex-shrink-0 pt-0.5">
                        {label}
                      </span>
                      <span className="text-forge-ash text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Logo Inspiration + Don'ts ── */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Logo Inspiration
                </h3>
                <div className="flex flex-col gap-2">
                  {LOGO_INSPIRATION.map(({ name, note }) => (
                    <div key={name} className="flex items-center gap-3 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg">
                      <span className="text-forge-white font-semibold text-sm w-24 flex-shrink-0">{name}</span>
                      <span className="text-forge-smoke text-sm">{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Logo Don&apos;ts
                </h3>
                <Card className="p-6">
                  <div className="flex flex-col gap-3">
                    {[
                      "No hard hats, hammers, or literal construction clip-art",
                      "No cartoon illustrations",
                      "No generic SaaS look",
                      "No playful or rounded aesthetics",
                      "Brand is sharp, precise, technical. Reflect that",
                      "Never stretch, distort, or recolor the logo mark",
                    ].map((rule) => (
                      <div key={rule} className="flex items-start gap-2.5">
                        <X size={14} strokeWidth={2} className="text-red-400/70 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-forge-smoke text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </Section>

          {/* ── 6. Color Palette ─────────────────────────────────────────────── */}
          <Section
            id="color-palette"
            tag="06 · Colors"
            title="Color Palette"
            description="All design tokens are CSS custom properties. Cyan is for primary CTAs and key highlights. Never use it for large background fills."
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
              {COLOR_SWATCHES.map((swatch) => (
                <div key={swatch.variable} className="rounded-xl overflow-hidden border border-white/5">
                  <div
                    className="h-20 w-full"
                    style={{ backgroundColor: swatch.hex }}
                    aria-hidden="true"
                  />
                  <div className="bg-forge-steel/60 px-3 py-3">
                    <p className="text-forge-white text-sm font-medium mb-0.5">{swatch.name}</p>
                    <p className="text-forge-smoke text-xs mb-1">{swatch.label}</p>
                    <CopyButton text={swatch.hex} />
                    <p className="text-xs text-forge-graphite font-mono mt-1 truncate">
                      {swatch.variable}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Usage Rules
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { dot: "bg-forge-cyan", rule: "Cyan: primary CTAs, interactive elements, key highlights. Never large bg fills." },
                    { dot: "bg-forge-teal", rule: "Teal: secondary UI, success states, data visualization." },
                    { dot: "bg-forge-white", rule: "Body text: always near-white or slate gray on dark backgrounds." },
                  ].map(({ dot, rule }) => (
                    <div key={rule} className="flex items-start gap-3 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${dot} flex-shrink-0 mt-0.5`} />
                      <span className="text-forge-smoke text-sm">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Accessibility: Contrast Ratios
                </h3>
                <div className="flex flex-col gap-2">
                  {CONTRAST_RATIOS.map((cr) => (
                    <div
                      key={cr.fgLabel}
                      className="flex items-center gap-3 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg"
                      style={{ backgroundColor: cr.bg }}
                    >
                      <span
                        className="text-sm font-mono font-semibold"
                        style={{ color: cr.fg }}
                      >
                        {cr.fgLabel}
                      </span>
                      <span className="text-forge-graphite text-xs">on {cr.bgLabel}</span>
                      <div className="ml-auto flex items-center gap-2">
                        <span className="text-forge-ash font-mono text-sm font-semibold">{cr.ratio}</span>
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded font-semibold ${
                            cr.level === "AAA"
                              ? "bg-forge-teal/20 text-forge-teal"
                              : "bg-forge-cyan/20 text-forge-cyan"
                          }`}
                        >
                          {cr.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ── 7. Typography ────────────────────────────────────────────────── */}
          <Section
            id="typography"
            tag="07 · Type"
            title="Typography"
            description="Inter is the primary typeface for headings and body. JetBrains Mono is reserved for code, metrics, labels, and technical references."
          >
            <div className="flex flex-col gap-1 mb-12">
              {TYPE_SCALE.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 py-6 border-b border-white/5 last:border-0"
                >
                  <div className="sm:w-28 flex-shrink-0">
                    <span className="text-xs font-mono text-forge-smoke uppercase tracking-widest">
                      {item.label}
                    </span>
                    <p className="text-xs text-forge-graphite mt-0.5 hidden sm:block leading-relaxed">
                      {item.spec}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`${item.className} text-forge-white`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.sample}
                    </p>
                    <p className="text-xs text-forge-graphite mt-1 sm:hidden">{item.spec}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Font Specimens: Current System
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              <Card>
                <p className="text-xs font-mono text-forge-smoke uppercase tracking-widest mb-3">
                  Inter: Primary Typeface
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
                  0123456789 !@#$%&amp;
                </p>
                <p className="text-xs text-forge-smoke mt-4">
                  Weights: 400 Regular · 500 Medium · 600 Semibold · 700 Bold
                </p>
              </Card>

              <Card>
                <p className="text-xs font-mono text-forge-smoke uppercase tracking-widest mb-3">
                  JetBrains Mono: Accent &amp; Display
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
                  0123456789 !@#$%&amp;
                </p>
                <p className="text-xs text-forge-smoke mt-4">
                  Usage: code · data labels · metric values · variable names · section tags
                </p>
              </Card>
            </div>

            {/* ── Alternative Font Explorations ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Alternative Heading Font Explorations
            </h3>
            <p className="text-forge-smoke text-sm mb-6">
              Three additional font options under consideration for headings and the wordmark. All are open-source and compatible with next/font.
            </p>

            <div className="flex flex-col gap-6 mb-12">
              {[
                {
                  font: "var(--font-space-grotesk)",
                  name: "Space Grotesk",
                  category: "Grotesque Sans-Serif",
                  description: "Angular terminals with a sharper, more distinctive tech feel. Previously used on the Forge site. Slightly more character than Inter with geometric precision.",
                  weights: "300 Light · 400 Regular · 500 Medium · 600 Semibold · 700 Bold",
                },
                {
                  font: "var(--font-outfit)",
                  name: "Outfit",
                  category: "Geometric Sans-Serif",
                  description: "Wide character widths that look excellent in uppercase with generous tracking. Premium, modern feel similar to Palantir and Tesla branding. Clean and authoritative.",
                  weights: "100 Thin · 300 Light · 400 Regular · 500 Medium · 600 Semibold · 700 Bold · 900 Black",
                },
                {
                  font: "var(--font-mono)",
                  name: "JetBrains Mono",
                  category: "Monospace",
                  description: "Developer native typeface. Creates a highly technical, code first impression when used for headings. Best for data-heavy contexts or a strongly engineering-focused brand position.",
                  weights: "400 Regular · 500 Medium · 700 Bold",
                },
              ].map(({ font, name, category, description, weights }) => (
                <Card key={name} className="p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-forge-cyan uppercase tracking-widest">{name}</span>
                    <span className="text-xs text-forge-graphite">·</span>
                    <span className="text-xs text-forge-smoke">{category}</span>
                  </div>

                  {/* Specimen */}
                  <p
                    className="text-4xl md:text-5xl font-bold text-forge-white mb-1 tracking-tight"
                    style={{ fontFamily: font }}
                  >
                    Aa Bb Cc Dd Ee
                  </p>
                  <p
                    className="text-forge-ash text-sm leading-relaxed mb-4"
                    style={{ fontFamily: font }}
                  >
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                  </p>

                  {/* Heading previews at different weights */}
                  <div className="border-t border-white/5 pt-4 mb-4">
                    <p className="text-[10px] font-mono text-forge-smoke uppercase tracking-widest mb-3">Heading Previews</p>
                    <div className="flex flex-col gap-2">
                      <p className="text-3xl font-bold text-forge-white tracking-[-0.01em] uppercase" style={{ fontFamily: font }}>
                        The Operating System for Field Intelligence
                      </p>
                      <p className="text-xl font-medium text-forge-ash tracking-[-0.01em]" style={{ fontFamily: font }}>
                        One Walk. Zero Typing. Job-Ready Data.
                      </p>
                      <p className="text-base text-forge-smoke" style={{ fontFamily: font }}>
                        Forge turns a single job walk into structured scope, tasks by trade, and export-ready packets.
                      </p>
                    </div>
                  </div>

                  <p className="text-forge-smoke text-sm leading-relaxed mb-3">{description}</p>
                  <p className="text-xs text-forge-graphite">{weights}</p>
                </Card>
              ))}
            </div>

            {/* ── Font Pairing Combinations ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Font Pairing Combinations
            </h3>
            <p className="text-forge-smoke text-sm mb-6">
              How each heading font pairs with Inter body text and JetBrains Mono labels.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { heading: "var(--font-body)", name: "Inter + Inter", label: "Current System" },
                { heading: "var(--font-space-grotesk)", name: "Space Grotesk + Inter", label: "Option A" },
                { heading: "var(--font-outfit)", name: "Outfit + Inter", label: "Option B" },
                { heading: "var(--font-mono)", name: "JetBrains Mono + Inter", label: "Option C" },
              ].map(({ heading, name, label }) => (
                <Card key={name} className="p-6">
                  <p className="text-[10px] font-mono text-forge-cyan uppercase tracking-widest mb-4">{label}: {name}</p>

                  {/* Simulated page section */}
                  <div className="bg-forge-iron/50 border border-white/5 rounded-lg p-5">
                    <p className="text-[9px] font-mono text-forge-smoke uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      EARLY ACCESS
                    </p>
                    <p className="text-xl font-medium text-forge-white uppercase tracking-[-0.01em] mb-2" style={{ fontFamily: heading }}>
                      Join Founders Council
                    </p>
                    <p className="text-sm text-forge-smoke leading-relaxed mb-3" style={{ fontFamily: "var(--font-body)" }}>
                      We&apos;re hand picking 20 contractors to shape Forge from day one.
                    </p>
                    <div className="inline-block bg-forge-white px-4 py-2">
                      <span className="text-xs font-medium text-forge-iron uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-mono)" }}>
                        Join Founders Council
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* ── 8. Imagery Style ─────────────────────────────────────────────── */}
          <Section
            id="imagery"
            tag="08 · Imagery"
            title="Imagery & Photography Style"
            description="Visual direction for photography, illustrations, and graphic elements across all Forge touchpoints."
          >
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-2">
                  Photography Direction
                </h3>
                {[
                  { label: "Aesthetic", value: "Dark, cinematic, high-contrast. Sci-fi / tech-noir." },
                  { label: "Color", value: "Desaturated with selective cyan and teal color accents." },
                  { label: "Lighting", value: "Dramatic rim lighting, low-key with selective highlights." },
                  { label: "Subject", value: "Real job sites, tradespeople, technology in field context." },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg">
                    <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.1em] w-20 flex-shrink-0 pt-0.5">
                      {label}
                    </span>
                    <span className="text-forge-ash text-sm">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-2">
                  Illustrations &amp; 3D
                </h3>
                {[
                  { label: "Style", value: "3D rendered graphics, orbital rings, glowing circular elements." },
                  { label: "UI Mockups", value: "Holographic UI mockups, floating interface panels." },
                  { label: "Palette", value: "Dark backgrounds with cyan/teal glow and depth." },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg">
                    <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.1em] w-20 flex-shrink-0 pt-0.5">
                      {label}
                    </span>
                    <span className="text-forge-ash text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Image Don&apos;ts
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Generic stock photos with bright, cheerful lighting",
                "Flat or cartoon-style illustrations",
                "Colorful infographics or data charts",
                "Clip-art or icon-heavy decorative imagery",
                "Isometric illustrations",
                "Photos that don't feel grounded in real construction",
              ].map((rule) => (
                <div key={rule} className="flex items-start gap-2.5 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg">
                  <X size={14} strokeWidth={2} className="text-red-400/70 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-forge-smoke text-sm">{rule}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 9. Iconography ───────────────────────────────────────────────── */}
          <Section
            id="iconography"
            tag="09 · Icons"
            title="Iconography & Graphic Elements"
            description="All icons use Lucide React. Outlined style, 1.5px stroke weight, 2px corner radius. Never filled."
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-8">
              {ICONS.map(({ name, component: Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-3 p-4 bg-forge-steel/40 border border-white/5 rounded-xl hover:bg-forge-steel/60 hover:border-forge-cyan/20 transition-colors"
                >
                  <Icon size={24} strokeWidth={1.5} className="text-forge-ash" aria-hidden="true" />
                  <span className="text-xs text-forge-smoke text-center leading-tight font-mono">
                    {name}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Style", value: "Outlined, never filled" },
                { label: "Stroke", value: "1.5px decorative · 2px interactive" },
                { label: "Size", value: "24px standalone · 20px nav · 16px buttons" },
                { label: "Corner", value: "2px radius on path corners" },
                { label: "Library", value: "Lucide React exclusively" },
                { label: "Pairing", value: "Always label icons in interactive contexts" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex gap-3 p-4 bg-forge-steel/20 border border-white/5 rounded-xl"
                >
                  <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.1em] w-16 flex-shrink-0">
                    {label}
                  </span>
                  <span className="text-forge-ash text-sm">{value}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 10. Layout & Grid ─────────────────────────────────────────────── */}
          <Section
            id="layout-grid"
            tag="10 · Layout"
            title="Layout & Grid Systems"
            description="All spacing follows an 8px base unit. Max content width is 1280px. Layouts use a 12-column grid system."
          >
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Grid System
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Columns", value: "12-column grid" },
                    { label: "Max Width", value: "1280px (max-w-7xl)" },
                    { label: "Base Unit", value: "8px" },
                    { label: "Gutter", value: "16px between columns" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg">
                      <span className="text-forge-smoke text-sm">{label}</span>
                      <span className="text-forge-white text-sm font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Margins
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Mobile", value: "24px (px-6)" },
                    { label: "Tablet", value: "48px (px-12)" },
                    { label: "Desktop", value: "80px (px-20)" },
                    { label: "Section Spacing", value: "120 to 160px vertical" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg">
                      <span className="text-forge-smoke text-sm">{label}</span>
                      <span className="text-forge-white text-sm font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Spacing Scale (8px base)
            </h3>
            <div className="flex flex-col gap-2.5 mb-10">
              {[
                { label: "4px", tw: "space-1", px: 4 },
                { label: "8px", tw: "space-2", px: 8 },
                { label: "16px", tw: "space-4", px: 16 },
                { label: "24px", tw: "space-6", px: 24 },
                { label: "32px", tw: "space-8", px: 32 },
                { label: "48px", tw: "space-12", px: 48 },
                { label: "64px", tw: "space-16", px: 64 },
                { label: "80px", tw: "space-20", px: 80 },
                { label: "96px", tw: "space-24", px: 96 },
              ].map(({ label, tw, px }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="w-16 text-right text-xs font-mono text-forge-smoke flex-shrink-0">
                    {label}
                  </span>
                  <div
                    className="bg-forge-cyan/25 rounded-sm h-5 flex-shrink-0"
                    style={{ width: Math.min(px * 2, 300) }}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-mono text-forge-graphite">{tw}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Card Specifications
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Padding", value: "24px internal" },
                { label: "Gap", value: "16px between cards" },
                { label: "Alignment", value: "Center heroes · Left body" },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 bg-forge-steel/20 border border-white/5 rounded-xl text-center">
                  <p className="text-forge-white font-semibold text-sm mb-1">{value}</p>
                  <p className="text-forge-smoke text-xs">{label}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Spatial Design System ──────────────────────────────────────── */}
          <Section
            id="spatial-design"
            tag="SP · Spatial"
            title="Spatial Design System"
            description="Design patterns for AR/spatial computing interfaces used across the Forge landing page and product. These elements create a unified field-intelligence aesthetic."
          >
            {/* ── Dot Grid Pattern ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Dot Grid Background
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <Card className="relative p-6 overflow-hidden min-h-[180px]">
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #94A3B8 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative">
                  <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-2">Pattern</p>
                  <p className="text-forge-ash text-sm leading-relaxed mb-3">
                    Subtle radial dot grid applied to every section background. Creates spatial awareness and depth without distraction.
                  </p>
                  <div className="flex flex-col gap-1.5 text-xs font-mono text-forge-smoke">
                    <span>radial-gradient(circle, #94A3B8 1px, transparent 1px)</span>
                    <span>background-size: 24px 24px</span>
                    <span>opacity: 0.04</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-2">Usage Rules</p>
                <ul className="flex flex-col gap-2">
                  {[
                    "Apply to every section as a background layer",
                    "Always use pointer-events-none and aria-hidden",
                    "Pair with overflow-hidden on the section element",
                    "Opacity must stay at 0.04. Never increase",
                    "Grid spacing fixed at 24px. Do not vary",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-2">
                      <span className="text-forge-graphite mt-1">·</span>
                      <span className="text-forge-ash text-sm">{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* ── Corner Brackets ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Corner Brackets
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {/* Demo */}
              <Card className="relative p-8 min-h-[160px] flex items-center justify-center col-span-1">
                <div className="absolute -inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-forge-graphite/50" />
                  <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-forge-graphite/50" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-forge-graphite/50" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-forge-graphite/50" />
                </div>
                <span className="text-forge-ash text-sm font-mono">Content Area</span>
              </Card>
              <div className="col-span-2">
                <Card className="p-6 h-full">
                  <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-2">Specification</p>
                  <p className="text-forge-ash text-sm leading-relaxed mb-3">
                    L-shaped bracket elements placed at corners of key containers. Creates an AR viewport / targeting frame effect.
                  </p>
                  <div className="flex flex-col gap-1.5 text-xs font-mono text-forge-smoke">
                    <span>Position: absolute, -inset-3 to -inset-6</span>
                    <span>Size: w-5 h-5 (standard) or w-6 h-6 (large)</span>
                    <span>Border: border-forge-graphite/50 (1px)</span>
                    <span>Always: pointer-events-none + aria-hidden</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* ── Scanning Line ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Scanning Line
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <Card className="relative p-6 overflow-hidden min-h-[160px]">
                {/* Live demo */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-forge-cyan/40 to-transparent pointer-events-none"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative">
                  <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-2">Live Preview</p>
                  <p className="text-forge-ash text-sm">Horizontal gradient line animating vertically through the section. Suggests active scanning / data processing.</p>
                </div>
              </Card>
              <Card className="p-6">
                <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-2">Specification</p>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-forge-smoke">
                  <span>Height: 1px</span>
                  <span>Gradient: from-transparent via-forge-cyan/30 to-transparent</span>
                  <span>Animation: top 0% → 100% → 0%, linear</span>
                  <span>Duration: 6-10s, infinite repeat</span>
                  <span>Use sparingly. Max 2 to 3 sections per page</span>
                  <span>Position: absolute, z-10</span>
                </div>
              </Card>
            </div>

            {/* ── Corner Dots ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Corner Dots &amp; Index Numbers
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <Card className="relative p-8 min-h-[140px]">
                {/* Corner dots */}
                <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                {/* Index */}
                <span className="absolute top-2 right-3 text-[8px] font-mono text-forge-graphite">01</span>
                <p className="text-forge-ash text-sm">Card with corner dots and index number, applied to all repeating card elements.</p>
              </Card>
              <Card className="p-6">
                <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-2">Specification</p>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-forge-ash text-sm font-medium mb-1">Corner Dots</p>
                    <div className="flex flex-col gap-1 text-xs font-mono text-forge-smoke">
                      <span>Size: w-1 h-1 (4px)</span>
                      <span>Color: bg-forge-graphite</span>
                      <span>Position: 6px from each corner edge</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-forge-ash text-sm font-medium mb-1">Index Numbers</p>
                    <div className="flex flex-col gap-1 text-xs font-mono text-forge-smoke">
                      <span>Font: font-mono, 8px</span>
                      <span>Color: text-forge-graphite</span>
                      <span>Format: zero-padded (01, 02, 03...)</span>
                      <span>Position: top-2 right-3 or top-2 left-3</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* ── Status Indicators ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Status Indicators &amp; Mono Labels
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {/* Active */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-forge-cyan animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-smoke">active signal</span>
                </div>
                <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-1">Active / Pulsing</p>
                <p className="text-forge-smoke text-sm">Cyan dot with animate-pulse. Used for live status, active counts.</p>
              </Card>
              {/* Warning */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400/70 animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-smoke">4 tools detected</span>
                </div>
                <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-1">Warning / Alert</p>
                <p className="text-forge-smoke text-sm">Red dot for problem states, fragmented workflows, alerts.</p>
              </Card>
              {/* Divider label */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-px bg-forge-graphite" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-graphite">section label</span>
                  <div className="w-8 h-px bg-forge-graphite" />
                </div>
                <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-1">Divider Label</p>
                <p className="text-forge-smoke text-sm">Centered mono label flanked by hairline rules. Used at section bottoms.</p>
              </Card>
            </div>

            {/* ── Spatial Cards vs Standard Cards ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Card Styles Comparison
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-graphite mb-2">Standard Card</p>
                <Card className="p-6">
                  <p className="text-forge-ash text-sm">Default card with backdrop blur, subtle border, rounded corners. Used as base container.</p>
                </Card>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-forge-graphite mb-2">Spatial Card</p>
                <Card className="relative p-6">
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                  <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                  <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                  <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-forge-graphite" />
                  <span className="absolute top-2 right-3 text-[8px] font-mono text-forge-graphite">01</span>
                  <p className="text-forge-ash text-sm">Card with corner dots, index number, and optional corner brackets. Used for repeating elements in spatial UI.</p>
                </Card>
              </div>
            </div>

            {/* ── AR Viewport Frame ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              AR Viewport Frame
            </h3>
            <Card className="relative p-8 mb-10">
              <div className="bg-forge-steel/20 border border-forge-graphite/30 p-6 md:p-8">
                {/* Viewport header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-forge-teal animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-forge-smoke">spatial view / active</span>
                  </div>
                  <span className="text-[9px] font-mono text-forge-graphite">forge v1.0</span>
                </div>
                <p className="text-forge-ash text-sm leading-relaxed mb-4">
                  Full-width bordered container with header status bar. Used for showcasing spatial workflows, data visualizations, and AR-style interfaces. Dark fill with subtle border creates a &ldquo;viewport&rdquo; effect.
                </p>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-forge-smoke">
                  <span>Background: bg-forge-steel/20</span>
                  <span>Border: border-forge-graphite/30</span>
                  <span>Header: status dot + mono label + version tag</span>
                  <span>No border radius. Sharp edges throughout</span>
                </div>
              </div>
            </Card>

            {/* ── Radial Glow ── */}
            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
              Radial Glow Effects
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="relative p-6 overflow-hidden min-h-[140px]">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)" }}
                />
                <div className="relative">
                  <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-2">Cyan Glow</p>
                  <p className="text-forge-smoke text-sm">Subtle radial gradient centered on key content areas. Draws focus without overwhelming.</p>
                </div>
              </Card>
              <Card className="p-6">
                <p className="text-xs font-mono text-forge-cyan uppercase tracking-widest mb-2">Specification</p>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-forge-smoke">
                  <span>Shape: radial-gradient, circle</span>
                  <span>Color: rgba(14,165,233,0.04) to transparent</span>
                  <span>Size: 400-800px diameter</span>
                  <span>Max opacity: 0.06. Never higher</span>
                  <span>Use: 1-2 per section, centered on focal points</span>
                </div>
              </Card>
            </div>
          </Section>

          {/* ── 11. Digital Guidelines ───────────────────────────────────────── */}
          <Section
            id="digital-guidelines"
            tag="11 · Digital"
            title="Digital Guidelines"
            description="UI standards for buttons, links, forms, border radius, animation, social media, email, and motion across Forge web and app interfaces."
          >
            {/* Buttons & Border Radius */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
                  Buttons
                </h3>
                <div className="flex flex-wrap gap-3 mb-5">
                  <Button variant="primary" size="sm">Primary CTA</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="primary" size="sm" disabled>Disabled</Button>
                </div>
                <div className="flex flex-col gap-2 text-sm text-forge-smoke">
                  <div className="flex items-start gap-2">
                    <Check size={14} strokeWidth={2} className="text-forge-cyan mt-0.5 flex-shrink-0" />
                    <span>Square corners. 0px border radius</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} strokeWidth={2} className="text-forge-cyan mt-0.5 flex-shrink-0" />
                    <span>Uppercase label, mono font, 0.1em letter-spacing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} strokeWidth={2} className="text-forge-cyan mt-0.5 flex-shrink-0" />
                    <span>Primary: white bg, dark text; Secondary: outlined</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
                  Border Radius
                </h3>
                <div className="flex items-end gap-6">
                  {[
                    { label: "Buttons", radius: "0px", style: { borderRadius: 0 } },
                    { label: "Small elements", radius: "4px", style: { borderRadius: 4 } },
                    { label: "Cards", radius: "12px", style: { borderRadius: 12 } },
                  ].map(({ label, radius, style }) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <div
                        className="w-14 h-14 bg-forge-steel border border-forge-graphite"
                        style={style}
                        aria-hidden="true"
                      />
                      <p className="text-xs font-mono text-forge-ash text-center">{radius}</p>
                      <p className="text-xs text-forge-smoke text-center leading-tight">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Links & Forms */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Links
                </h3>
                <div className="p-5 bg-forge-steel/20 border border-white/5 rounded-xl">
                  <p className="text-forge-smoke text-sm mb-3">
                    Visit{" "}
                    <a className="text-forge-cyan no-underline hover:underline cursor-pointer">
                      forgeequipment.com
                    </a>{" "}
                    to get started
                  </p>
                  <div className="flex flex-col gap-1.5 mt-4 text-xs text-forge-smoke">
                    <span>Color: #0EA5E9 (forge-cyan)</span>
                    <span>Default: no underline</span>
                    <span>Hover: underline</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Form Fields
                </h3>
                <div className="p-5 bg-forge-steel/20 border border-white/5 rounded-xl">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="w-full bg-forge-steel border border-forge-graphite text-forge-white placeholder-forge-smoke text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-forge-cyan transition-colors"
                    readOnly
                  />
                  <div className="flex flex-col gap-1.5 mt-4 text-xs text-forge-smoke">
                    <span>Fill: #1E293B (forge-steel)</span>
                    <span>Border: #334155 (forge-graphite)</span>
                    <span>Focus border: #0EA5E9 (forge-cyan)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <SubSection title="Social Media">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-3">
                    Primary Platforms
                  </h4>
                  <div className="flex flex-col gap-2">
                    {[
                      { icon: Twitter, label: "Twitter / X", note: "Product updates, founder voice" },
                      { icon: Linkedin, label: "LinkedIn", note: "Primary B2B channel" },
                      { icon: Youtube, label: "YouTube", note: "Product demos, walkthroughs" },
                      { icon: Instagram, label: "Instagram", note: "Jobsite content, brand culture" },
                    ].map(({ icon: Icon, label, note }) => (
                      <div key={label} className="flex items-center gap-3 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg">
                        <Icon size={16} strokeWidth={1.5} className="text-forge-cyan flex-shrink-0" />
                        <span className="text-forge-white text-sm font-medium w-28 flex-shrink-0">{label}</span>
                        <span className="text-forge-smoke text-sm">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-3">
                    Content Standards
                  </h4>
                  <div className="flex flex-col gap-2 mb-4">
                    {[
                      { label: "Profile Image", value: "Forge icon mark (compass/crosshair) on dark background" },
                      { label: "Post Templates", value: "Dark themed for testimonials, feature highlights, metrics" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex gap-3 p-3.5 bg-forge-steel/20 border border-white/5 rounded-lg">
                        <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.1em] w-24 flex-shrink-0 pt-0.5">{label}</span>
                        <span className="text-forge-ash text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                  <h4 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-3">
                    Brand Hashtags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["#BuiltForTheTrades", "#ForgeAI", "#FieldIntelligence", "#ScopeSnap", "#ZeroTyping"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-forge-cyan bg-forge-cyan/10 border border-forge-cyan/20 px-3 py-1.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SubSection>

            {/* Email */}
            <SubSection title="Email">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    icon: Mail,
                    label: "Email Signature",
                    value: "Dark themed with Forge logo, name, title, and \"Join Founders Council\" CTA",
                  },
                  {
                    icon: FileText,
                    label: "Newsletter",
                    value: "Dark background, structured layout matching web aesthetic and brand voice",
                  },
                  {
                    icon: Type,
                    label: "Email Header",
                    value: "Forge wordmark on dark background with subtle gradient border",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <Card key={label} className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={16} strokeWidth={1.5} className="text-forge-cyan" />
                      <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.12em]">{label}</span>
                    </div>
                    <p className="text-forge-ash text-sm leading-relaxed">{value}</p>
                  </Card>
                ))}
              </div>
            </SubSection>

            {/* Motion & Animation */}
            <SubSection title="Motion & Animation">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Easing", value: "ease-in-out" },
                  { label: "Duration", value: "300 to 500ms" },
                  { label: "Scroll reveals", value: "Smooth slide-up fade" },
                  { label: "Parallax", value: "Subtle depth on 3D elements" },
                  { label: "Glow pulse", value: "Subtle pulse on key metrics and CTAs" },
                  { label: "Library", value: "Framer Motion" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 p-4 bg-forge-steel/20 border border-white/5 rounded-xl">
                    <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.1em] w-20 flex-shrink-0">
                      {label}
                    </span>
                    <span className="text-forge-ash text-sm">{value}</span>
                  </div>
                ))}
              </div>
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Film size={16} strokeWidth={1.5} className="text-red-400/70" />
                  <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.12em]">Animation Don&apos;ts</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "No bouncy or elastic spring animations",
                    "No playful or cartoon-like transitions",
                    "Never block content with loading animations",
                    "Avoid excessive motion that distracts from content",
                  ].map((rule) => (
                    <div key={rule} className="flex items-start gap-2.5">
                      <X size={14} strokeWidth={2} className="text-red-400/70 flex-shrink-0 mt-0.5" />
                      <span className="text-forge-smoke text-sm">{rule}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </SubSection>

            {/* Competitive Landscape — kept from original section 11 */}
            <SubSection title="Competitive Landscape">
              <div className="flex flex-col gap-4 mb-6">
                {COMPETITORS.map((comp) => (
                  <Card key={comp.name} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="sm:w-40 flex-shrink-0">
                        <p className="text-forge-white font-semibold text-base">{comp.name}</p>
                        <span className="text-xs font-mono text-forge-smoke mt-1 inline-block">
                          {comp.tier}
                        </span>
                      </div>
                      <div className="flex-1 grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-mono text-forge-smoke uppercase tracking-[0.12em] mb-2">
                            Strengths
                          </p>
                          <p className="text-forge-ash text-sm leading-relaxed">{comp.positioning}</p>
                        </div>
                        <div>
                          <p className="text-xs font-mono text-red-400/70 uppercase tracking-[0.12em] mb-2">
                            Gaps
                          </p>
                          <p className="text-forge-smoke text-sm leading-relaxed">{comp.lacks}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 border-forge-cyan/20">
                <div className="flex items-center gap-2 mb-4">
                  <Hexagon size={16} strokeWidth={2} className="text-forge-cyan" aria-hidden="true" />
                  <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.15em]">
                    Forge&apos;s Differentiation
                  </span>
                </div>
                <p className="text-forge-ash text-base leading-relaxed mb-4">
                  No existing tool is purpose-built for the walk-to-handoff workflow. Forge owns
                  the 20 to 40 minutes after every job walk, the gap between the field and the office
                  that every other tool ignores.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: "Walk capture", value: "Native audio + photo, voice tagged" },
                    { label: "AI structure", value: "Scope, tasks, flags: zero typing" },
                    { label: "Export", value: "Buildertrend ready, PDF, PM handoff" },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3.5 bg-forge-cyan/5 border border-forge-cyan/15 rounded-lg">
                      <p className="text-forge-cyan text-xs font-mono uppercase tracking-[0.1em] mb-1">{label}</p>
                      <p className="text-forge-ash text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </SubSection>
          </Section>

          {/* ── 13. Brand Asset Management ───────────────────────────────────── */}
          <Section
            id="brand-asset-management"
            tag="13 · Assets"
            title="Brand Asset Management"
            description="File organization, naming conventions, version control, and access permissions for all Forge brand assets."
          >
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  File Organization
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      icon: Folder,
                      label: "Cloud Storage",
                      value: "Google Drive (shared team folder) + GitHub repo for web assets",
                    },
                    {
                      icon: FileText,
                      label: "File Naming",
                      value: "forge_[asset]_[variant]_[colormode].[ext]",
                    },
                    {
                      icon: Archive,
                      label: "Version Control",
                      value: "Git for code/web assets, date-based (v2026-03) for design files",
                    },
                    {
                      icon: Users,
                      label: "Asset Manager",
                      value: "Design lead with shared access for founding team",
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-3 p-4 bg-forge-steel/20 border border-white/5 rounded-lg">
                      <Icon size={15} strokeWidth={1.5} className="text-forge-cyan flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-mono text-forge-smoke uppercase tracking-[0.1em] mb-1">{label}</p>
                        <p className="text-forge-ash text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-4 bg-forge-steel/20 border border-white/5 rounded-lg">
                  <p className="text-xs font-mono text-forge-smoke uppercase tracking-[0.12em] mb-2">File Naming Example</p>
                  <p
                    className="text-forge-cyan text-sm font-mono"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    forge_logo_horizontal_dark.svg
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Required File Formats
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {ASSET_FILE_FORMATS.map(({ label, checked }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 p-3 bg-forge-steel/20 border border-white/5 rounded-lg"
                    >
                      <div className="w-4 h-4 rounded-sm border bg-forge-cyan border-forge-cyan flex items-center justify-center flex-shrink-0">
                        {checked && <Check size={10} strokeWidth={3} className="text-forge-iron" />}
                      </div>
                      <span className="text-forge-ash text-sm font-mono">{label}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-4">
                  Access & Permissions
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      icon: Lock,
                      label: "Internal",
                      value: "Founding team (full access), contracted designers (logo/brand folder only)",
                    },
                    {
                      icon: Globe,
                      label: "External",
                      value: "Brand portal needed once beta scales, for press, partners, integration partners",
                    },
                    {
                      icon: FileText,
                      label: "Guidelines PDF",
                      value: "Polished PDF version of workbook for external distribution",
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <Card key={label} className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={14} strokeWidth={1.5} className="text-forge-cyan" />
                        <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.12em]">{label}</span>
                      </div>
                      <p className="text-forge-ash text-sm leading-relaxed">{value}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ── Appendix A: Landing Page Structure ───────────────────────────── */}
          <Section
            id="appendix-landing"
            tag="A · Appendix"
            title="Appendix A: Approved Landing Page Structure"
            description="The approved section order and content brief for the Forge public landing page at forgeequipment.com."
          >
            <div className="flex flex-col gap-3 mb-10">
              {LANDING_PAGE_SECTIONS.map(({ num, title, desc }) => (
                <motion.div
                  key={num}
                  className="flex gap-4 p-5 bg-forge-steel/20 border border-white/5 rounded-xl hover:border-forge-cyan/15 transition-colors"
                  {...fadeUp}
                >
                  <div className="w-10 h-10 rounded-lg bg-forge-cyan/10 border border-forge-cyan/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-forge-cyan font-mono text-sm font-bold">{num}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-forge-white font-semibold text-sm mb-1">{title}</p>
                    <p className="text-forge-smoke text-sm leading-relaxed">{desc}</p>
                  </div>
                  <ArrowRight size={16} strokeWidth={1.5} className="text-forge-graphite flex-shrink-0 self-center" aria-hidden="true" />
                </motion.div>
              ))}
            </div>

            <h3 className="text-xs font-medium text-forge-smoke uppercase tracking-widest mb-5">
              Immediate Next Steps
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                {
                  owner: "Roman Paolo",
                  tasks: [
                    "Deliver brand guideline workbook",
                    "Two landing page iterations",
                  ],
                },
                {
                  owner: "Christian",
                  tasks: [
                    "Provide pricing content",
                    "Customer interview transcripts",
                  ],
                },
                {
                  owner: "Shared",
                  tasks: [
                    "Set up Google Drive folder for brand assets",
                  ],
                },
                {
                  owner: "Future",
                  tasks: [
                    "Sales deck presentation template",
                  ],
                },
              ].map(({ owner, tasks }) => (
                <Card key={owner} className="p-5">
                  <p className="text-xs font-mono text-forge-cyan uppercase tracking-[0.15em] mb-3">{owner}</p>
                  <div className="flex flex-col gap-2">
                    {tasks.map((task) => (
                      <div key={task} className="flex items-start gap-2.5">
                        <ArrowRight size={13} strokeWidth={2} className="text-forge-cyan flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-forge-ash text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 border-forge-cyan/20">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} strokeWidth={1.5} className="text-forge-cyan" aria-hidden="true" />
                <span className="text-xs font-mono text-forge-smoke uppercase tracking-[0.15em]">
                  Key Landing Page Principle
                </span>
              </div>
              <p className="text-forge-ash text-base leading-relaxed">
                Every section of the landing page should answer one question for the visitor:
                &ldquo;Why should I trust Forge with my job walks?&rdquo; Lead with the outcome
                (zero typing, job-ready data), prove it with workflow and metrics, then make the
                next step frictionless.
              </p>
            </Card>
          </Section>

          {/* Footer */}
          <div className="pt-16 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Hexagon size={16} strokeWidth={2} className="text-forge-cyan" aria-hidden="true" />
              <span className="font-bold text-forge-white tracking-tight">FORGE</span>
            </div>
            <p className="text-forge-smoke text-sm font-mono mb-1">
              Brand Design Guideline Workbook · Version 1.0 · March 2026
            </p>
            <p className="text-forge-graphite text-xs">
              Prepared by Roman Paolo · Authorized by Christian (Forge Founding Team)
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
