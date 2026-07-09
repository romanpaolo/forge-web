"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// No-backend contact form. Mirrors the existing mailto pattern across the site:
// validate client-side, then compose a mailto:team@forge.equipment URL and open
// the user's mail client. Nothing is sent server-side.
//
// TODO(upgrade path): for real inbound submission, replace handleSubmit's mailto
// with either
//   (a) a "use server" action in this file's parent server component, or
//   (b) an app/api/contact/route.ts handler,
// posting to a transactional email provider such as Resend. That adds a new
// dependency (`resend`) and a RESEND_API_KEY in .env — intentionally omitted here
// to keep this route dependency- and config-free.
// ─────────────────────────────────────────────────────────────────────────────

const SUPPORT_EMAIL = "team@forge.equipment";

const TOPICS = [
  "General question",
  "Bug report",
  "Billing & account",
  "Sales & trials",
  "Feature request",
  "Data & privacy",
] as const;

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-none bg-forge-iron/60 border border-white/10 px-4 py-3 text-sm text-forge-white placeholder:text-forge-graphite transition-colors focus:outline-none focus:border-forge-cyan focus:ring-1 focus:ring-forge-cyan";

const labelClass =
  "block text-[10px] font-mono uppercase tracking-[0.15em] text-forge-smoke mb-2";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Please enter a valid email.";
    if (!message.trim()) next.message = "Please enter a message.";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = `[Support — ${topic}] from ${name.trim()}`;
    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Topic: ${topic}`,
      "",
      message.trim(),
    ].join("\n");

    const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Contractor"
          className={inputClass}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1.5 text-xs text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputClass}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1.5 text-xs text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      {/* Topic */}
      <div>
        <label htmlFor="contact-topic" className={labelClass}>
          Topic
        </label>
        <select
          id="contact-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={inputClass}
        >
          {TOPICS.map((t) => (
            <option key={t} value={t} className="bg-forge-iron text-forge-white">
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you need help with…"
          rows={5}
          className={`${inputClass} resize-y`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="self-start rounded-none bg-forge-white text-forge-iron hover:bg-forge-ash active:bg-forge-smoke uppercase tracking-[0.1em] font-[family-name:var(--font-mono)] font-semibold px-8 py-4 text-sm transition-all"
      >
        Open Email Draft
      </button>

      {sent && (
        <p className="text-xs text-forge-smoke" role="status">
          Your email draft should have opened. If it didn&rsquo;t, write us directly at{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-forge-cyan hover:text-forge-cyan-light transition-colors"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
