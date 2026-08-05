import type { Metadata } from "next";
import { FileDown } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { CALENDLY_URL, trialSignupUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Harris & Sons Construction | Forge Customer Story",
  description:
    "How a family remodeling contractor cut estimating time 75%, prevented a $40,000 scope loss, and grew projected revenue 60%. All in 90 days on Forge.",
  openGraph: {
    title: "Two weeks to three days | Harris & Sons on Forge",
    description:
      "75% less estimating time, $330K in Forge-attributed revenue, a $40K scope-dispute loss prevented. All in the first 90 days.",
    type: "article",
    url: "https://www.forge.equipment/customers/harris-and-sons",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// The committed PDF is generated from THIS page via headless Chrome print
// styling (see the @media print block below). Christian's designed case-study
// PDF can replace the file at public/harris-and-sons-case-study.pdf any time -
// no code change needed.
const PDF_PATH = "/harris-and-sons-case-study.pdf";

// PRD 10.1 / 10.7 - key metrics. The ~$4M is a PROJECTION, distinct from
// actuals (Michael's audit); the footnote below the grid is load-bearing.
const KEY_METRICS = [
  { value: "$330K", label: "Revenue directly attributed to Forge" },
  { value: "75%", label: "Reduction in estimating & documentation time" },
  { value: "$2K–$3K/mo", label: "Monthly admin savings across 20–30 estimates" },
  { value: "~$4M*", label: "Projected* annual revenue, up from $2.5M actual" },
];

const BEFORE_AFTER: { dimension: string; before: string; after: string }[] = [
  { dimension: "Estimate delivery", before: "Up to 2 weeks", after: "Under 3 days" },
  { dimension: "Notes workflow", before: "4+ tools, manual", after: "1 walk. Done." },
  { dimension: "Team output", before: "Baseline capacity", after: "2–3x in 90 days" },
  { dimension: "Change order risk", before: "High: details lost", after: "$40K loss prevented" },
  { dimension: "Annual projection", before: "$2.5M", after: "~$4M" },
  { dimension: "Sales reps", before: "1", after: "2 (and growing)" },
];

const WHAT_CHANGED: { lead: string; rest: string }[] = [
  {
    lead: "Estimates land faster than competitors.",
    rest: "Turnaround dropped from two weeks to under three days. Harris & Sons' proposals are now more detailed than anyone else bidding the job.",
  },
  {
    lead: "Forge documentation stopped a $40,000 loss.",
    rest: "When a scope dispute came up, the structured job-walk record gave them an unambiguous paper trail. Clean change order. No absorbed cost.",
  },
  {
    lead: "Team output grew 2–3x in 90 days.",
    rest: "The efficiency freed up enough capacity to hire a second sales representative. That's a move the business couldn't justify before.",
  },
  {
    lead: "Revenue projection jumped 60%. Same overhead.",
    rest: "From $2.5M to nearly $4M for the upcoming year. Same ad spend. Forge let them scale safely without compromising their reputation.",
  },
];

function CaseSectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-forge-cyan">
        {children}
      </span>
      <div className="flex-1 h-px bg-forge-graphite/40" />
    </div>
  );
}

export default function HarrisAndSonsPage() {
  return (
    <div className="min-h-screen bg-forge-body text-forge-white">
      {/* Print styling for the committed PDF (headless Chrome --print-to-pdf).
          Keeps the dark Forge brand; drops nav/footer/interactive chrome. */}
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body { background: #050507 !important; }
          .print-hidden { display: none !important; }
          .print-article { padding-top: 3rem !important; }
          section, table { break-inside: avoid; }
        }
      `}</style>

      <div className="print-hidden">
        <Navbar />
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-40 pb-24 print-article">
        {/* ── Header - PRD 10.7, word-for-word ─────────────────────────── */}
        <header>
          <SectionLabel>CUSTOMER STORY · HARRIS &amp; SONS CONSTRUCTION · BEND, OR</SectionLabel>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-[-0.02em] leading-tight text-forge-white mt-8">
            Two weeks to three days.
            <br />
            <span className="text-forge-ash/60">A $4M year ahead.</span>
          </h1>

          <p className="text-forge-smoke text-lg md:text-xl leading-relaxed mt-8 max-w-2xl">
            How a family remodeling contractor cut estimating time 75%,
            prevented a $40,000 scope loss, and grew projected revenue 60%.
            All in 90 days.
          </p>

          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-forge-graphite mt-8">
            RESIDENTIAL REMODELING · GENERAL CONTRACTING · BEND, OREGON · FAMILY-OWNED
          </p>

          {/* Disclosure - PRD 10.3, must ship with the page */}
          <p className="text-forge-smoke text-sm leading-relaxed border-l-2 border-forge-cyan/50 pl-4 mt-8 max-w-2xl">
            Harris &amp; Sons Construction is owned by Forge cofounder Christian
            Harris. The results below are from Harris &amp; Sons&rsquo; own books.
          </p>

          <a
            href={PDF_PATH}
            download
            className="print-hidden inline-flex items-center gap-2 mt-8 border border-forge-graphite text-forge-ash hover:text-forge-white hover:border-forge-smoke px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] font-[family-name:var(--font-mono)] transition-colors"
          >
            <FileDown size={16} strokeWidth={2} aria-hidden="true" />
            Download as PDF
          </a>
        </header>

        {/* ── Key metrics ───────────────────────────────────────────────── */}
        <section className="mt-20">
          <CaseSectionHeader>KEY METRICS</CaseSectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KEY_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="bg-forge-steel/30 border border-forge-smoke/10 p-6"
              >
                <p className="text-3xl md:text-4xl font-medium text-forge-cyan font-[family-name:var(--font-mono)] tabular-nums">
                  {metric.value}
                </p>
                <p className="text-forge-smoke text-sm mt-2 leading-relaxed">{metric.label}</p>
              </div>
            ))}
          </div>

          <p className="text-forge-graphite text-xs mt-4">
            *Projected for the year ahead based on current pace. Not yet actualized.
          </p>
        </section>

        {/* ── About the client ──────────────────────────────────────────── */}
        <section className="mt-20">
          <CaseSectionHeader>ABOUT THE CLIENT</CaseSectionHeader>
          <p className="text-forge-ash text-base md:text-lg leading-relaxed max-w-2xl">
            Christian Harris runs a family-owned general contracting business
            specializing in residential remodeling. Harris &amp; Sons handles
            20–30 estimates a month across kitchens, baths, additions, and
            full remodels. They compete against larger regional contractors for
            every job.
          </p>
        </section>

        {/* ── The problem ───────────────────────────────────────────────── */}
        <section className="mt-20">
          <CaseSectionHeader>THE PROBLEM</CaseSectionHeader>
          <div className="flex flex-col gap-5 max-w-2xl">
            <p className="text-forge-ash text-base md:text-lg leading-relaxed">
              Before Forge, Harris &amp; Sons had the field expertise. What they
              didn&rsquo;t have was a back office that could keep up. Job-walk notes
              were scattered across tools. Estimates took up to two weeks to
              deliver. Details got lost between the site visit and the project
              manager&rsquo;s desk. Every time.
            </p>
            <p className="text-forge-ash text-base md:text-lg leading-relaxed">
              At 20–30 estimates a month, that administrative drag cost
              $75–$100 per deal. That&rsquo;s $2,000–$3,000 a month in time nobody
              was getting back.
            </p>
          </div>
        </section>

        {/* ── Before vs. after ──────────────────────────────────────────── */}
        <section className="mt-20">
          <CaseSectionHeader>BEFORE VS. AFTER</CaseSectionHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-forge-smoke/10">
              <thead>
                <tr className="border-b border-forge-smoke/10">
                  <th scope="col" className="p-4 text-[10px] font-mono uppercase tracking-[0.15em] text-forge-smoke font-medium" />
                  <th scope="col" className="p-4 text-[10px] font-mono uppercase tracking-[0.15em] text-forge-smoke font-medium">
                    BEFORE FORGE
                  </th>
                  <th scope="col" className="p-4 text-[10px] font-mono uppercase tracking-[0.15em] text-forge-cyan font-medium">
                    AFTER FORGE
                  </th>
                </tr>
              </thead>
              <tbody>
                {BEFORE_AFTER.map((row) => (
                  <tr key={row.dimension} className="border-b border-forge-smoke/10 last:border-b-0">
                    <th scope="row" className="p-4 text-forge-white text-sm font-medium whitespace-nowrap">
                      {row.dimension}
                    </th>
                    <td className="p-4 text-forge-smoke text-sm">{row.before}</td>
                    <td className="p-4 text-forge-ash text-sm">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── What changed ──────────────────────────────────────────────── */}
        <section className="mt-20">
          <CaseSectionHeader>WHAT CHANGED</CaseSectionHeader>
          <div className="flex flex-col gap-6 max-w-2xl">
            {WHAT_CHANGED.map((item) => (
              <p key={item.lead} className="text-forge-ash text-base md:text-lg leading-relaxed">
                <span className="text-forge-white font-semibold">{item.lead}</span>{" "}
                {item.rest}
              </p>
            ))}
          </div>
        </section>

        {/* ── Quote ─────────────────────────────────────────────────────── */}
        <section className="mt-20">
          <blockquote className="border-l-2 border-forge-cyan pl-6 max-w-2xl">
            <p className="text-forge-white text-xl md:text-2xl font-medium leading-relaxed tracking-[-0.01em]">
              &ldquo;Our estimates are more detailed than our competitors&rsquo; now. We&rsquo;re
              closing faster, and we have the documentation to back up every
              decision made on the walk.&rdquo;
            </p>
            <footer className="text-forge-smoke text-base mt-4">
              Christian Harris, Harris &amp; Sons Construction, Bend, Oregon
            </footer>
          </blockquote>
        </section>

        {/* ── CTAs ──────────────────────────────────────────────────────── */}
        <section className="mt-20 print-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button href={trialSignupUrl()} variant="primary" size="lg">
              Start Free Trial
            </Button>
            <Button
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              Talk to Sales
            </Button>
          </div>
          <p className="text-forge-smoke text-sm mt-4">
            14-day free trial. No credit card required. Cancel anytime.
          </p>
        </section>
      </main>

      <div className="print-hidden">
        <Footer />
      </div>
    </div>
  );
}
