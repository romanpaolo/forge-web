export const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/support" },
];

export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Forge and how does ScopeSnap work?",
    answer: "Forge is an AI powered field intelligence platform built for general contractors. ScopeSnap, our flagship tool, captures audio, photos, and voice tags during your job walk, then uses AI to structure them into organized scope by area, tasks sorted by trade, open questions, and export ready packets. One walk in, structured data out.",
  },
  {
    question: "Do I need special hardware or an app download?",
    answer: "No special hardware required. ScopeSnap works on any smartphone or tablet through a mobile web app. No app store downloads needed. If you use AR enabled devices like Meta Glasses, Forge is designed to support spatial capture as that technology matures.",
  },
  {
    question: "How accurate is the AI structuring?",
    answer: "Forge's AI is built to structure, never assume. Every uncertain item is flagged for your review. It will never silently guess on scope details that affect your bid. You review and approve the full output before exporting. Our target accuracy is 99.2% on structured field data.",
  },
  {
    question: "What tools does Forge integrate with?",
    answer: "The current version supports one tap formatted copy for Buildertrend, PDF packet downloads with photos, and PM handoff emails. Direct API integrations with Buildertrend, Procore, and CoConstruct are on the roadmap. Forge is designed to fit into your existing workflow, not replace it.",
  },
  {
    question: "What does the Founders Council beta include?",
    answer: "Founders Council members get full ScopeSnap access, unlimited job walks, a direct line to the dev team, and locked-in founding member pricing, all free during the entire beta period. No credit card, no contracts, cancel anytime. We're hand picking 20 contractors to shape Forge from day one.",
  },
  {
    question: "How long is the beta and what happens after?",
    answer: "The beta runs approximately 90 days. During that time, you use every feature for free while we collect your feedback to refine the product. After beta, Founders Council members lock in special pricing that won't be available to later users. You'll never pay more than your founding rate.",
  },
  {
    question: "What makes Forge different from Buildertrend or Procore?",
    answer: "Buildertrend and Procore are project management platforms. They're great at organizing data once it's entered. Forge solves the step before: capturing and structuring field data so it's ready for those tools. Instead of spending 20 to 40 minutes after every walk typing notes into Buildertrend, Forge gets it done in one tap with zero typing.",
  },
  {
    question: "Is my job walk data secure?",
    answer: "Your data is encrypted in transit and at rest. Forge processes your audio and photos through secure AI pipelines. Nothing is shared, sold, or used to train models. Contractors stake their reputation on accurate data, and we take that trust seriously. Your field intelligence stays yours.",
  },
];

// Support-page subset — help/account/data questions, distinct from the home FAQ.
export const SUPPORT_FAQ: FaqItem[] = [
  {
    question: "How do I get help or report a problem?",
    answer: "The fastest way to reach us is email (team@forge.equipment) or the contact form below. Tell us what you were doing, what you expected, and what happened instead. Screenshots help. During the beta you also have a direct line to the dev team through your Founders Council channel.",
  },
  {
    question: "How quickly will I hear back?",
    answer: "We aim to respond to every message within one business day. Beta members and active job walk issues are prioritized. If something is blocking you in the field, say so in the subject line and we'll jump on it.",
  },
  {
    question: "I found a bug. What should I do?",
    answer: "Send it to team@forge.equipment with the word \"Bug\" in the subject. Include your device and browser, the project or walk where it happened, and the steps to reproduce it. Bug reports from Founders Council members shape our weekly fixes, so the more detail the better.",
  },
  {
    question: "Can I cancel, pause, or delete my account?",
    answer: "Yes. There are no contracts during the beta. Cancel anytime and you keep access through the current period. To delete your account and personal data, email us and we'll remove it within 30 days, except where retention is required by law. See our Privacy Policy for details.",
  },
  {
    question: "Is my job walk data secure?",
    answer: "Your data is encrypted in transit and at rest. Forge processes your audio and photos through secure AI pipelines. Nothing is shared, sold, or used to train models. Your field intelligence stays yours.",
  },
  {
    question: "How do I join the Founders Council?",
    answer: "Book a quick call with the team and we'll get you set up. We're hand picking contractors to shape Forge from day one: full ScopeSnap access, unlimited job walks, and locked-in founding pricing, free during the entire beta.",
  },
];

export const FEATURES = [
  {
    label: "CAPTURE",
    title: "Walk the Job. We'll Handle the Notes.",
    description: "Start a job walk and Forge records audio up to 90 minutes and photos you can voice tag on the fly. Say \"Photo: kitchen sink wall\" and it's indexed automatically.",
    bullets: [
      "Audio recording up to 90 min",
      "Voice tagged photo capture",
      "All media stored under one project",
    ],
  },
  {
    label: "AI ENGINE",
    title: "Raw Walk → Structured Scope in Seconds",
    description: "Forge's AI doesn't guess. It organizes your walk into confirmed decisions, open questions, risks, and atomic tasks sorted by trade: demo, framing, plumbing, electrical, and more.",
    bullets: [
      "Scope + questions organized by area",
      "Tasks broken down by trade",
      "Uncertainties flagged, never assumed",
    ],
  },
  {
    label: "EXPORT",
    title: "One Tap to Buildertrend Ready",
    description: "Review the AI output, make edits inline, then export. Copy formatted notes directly to Buildertrend, download a PDF packet with photos, or send a PM handoff email.",
    bullets: [
      "Inline editing: add, delete, reorder",
      "One tap copy to Buildertrend",
      "PDF + photo packet download",
      "PM handoff email template",
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote: "I used to spend my drive home just organizing notes from the walk. Now I hit export before I leave the job site.",
    name: "Mike R.",
    title: "GC, Austin TX",
  },
  {
    quote: "We were wasting 30 minutes after every walk just getting notes into Buildertrend. That's gone now.",
    name: "Christian",
    title: "General Contractor",
  },
  {
    quote: "My PM used to call me three times after every walk asking for details. Now she gets everything in one clean packet.",
    name: "Sarah K.",
    title: "GC, Denver CO",
  },
];

export const STEPS = [
  {
    number: "01",
    title: "Create Your Project",
    description: "Name, address, project type. 30 seconds.",
  },
  {
    number: "02",
    title: "Walk and Capture",
    description: "Hit record, walk the job, snap photos, voice tag as you go.",
  },
  {
    number: "03",
    title: "AI Does the Heavy Lifting",
    description: "Forge transcribes, structures scope by area, breaks tasks by trade, flags open questions.",
  },
  {
    number: "04",
    title: "Review, Approve, Export",
    description: "Edit anything inline. One tap to copy into Buildertrend, download PDF, or email your PM.",
  },
];

export const METRICS = [
  { value: 20, suffix: "+", unit: "", label: "Minutes saved per walk" },
  { value: 1, suffix: "", unit: "", label: "Workflow, not four" },
  { value: 0, suffix: "", unit: "Zero", label: "Typing required" },
];

export const MARKET_DATA = [
  { value: "$39B+", label: "Total Addressable Market" },
  { value: "$3.1B", label: "US Serviceable Market" },
  { value: "$62M", label: "5-Year SOM" },
];
