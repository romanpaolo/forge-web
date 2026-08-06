"use client";

import { FormEvent, useState } from "react";
import { Smartphone } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { ANDROID_WAITLIST_ENABLED } from "@/lib/constants";

/* ────────────────────────────────────────────────────────────────────────────
 * Android waitlist — PRD 7.7 / Open Item #10.
 *
 * GATED OFF BY DEFAULT. This entire block renders ONLY when the site is built
 * with NEXT_PUBLIC_ANDROID_WAITLIST=true. It ships dark because the consent
 * language below is a PLACEHOLDER — cold-text/cold-call opt-in needs real
 * TCPA-compliant language and an opt-out mechanism reviewed by compliance
 * counsel before this goes live. Everywhere else Android stays "coming soon"
 * text only.
 *
 * Captures phone (REQUIRED — the follow-up motion is cold-calling; email
 * reach rates aren't good enough) + optional email.
 *
 * TODO(wiring): no backend endpoint exists yet. Submissions POST to the
 * constant below and fall through to a graceful confirmation either way —
 * wire a real collector (backend route or form service) before enabling.
 * ──────────────────────────────────────────────────────────────────────────── */

// TODO(wiring): replace with the real collection endpoint before enabling the flag.
const ANDROID_WAITLIST_ENDPOINT = "/api/android-waitlist";

// PLACEHOLDER CONSENT LANGUAGE — NOT TCPA-REVIEWED. Do not ship the flag
// enabled until compliance counsel replaces this copy (PRD Open Item #10).
const PLACEHOLDER_CONSENT_COPY =
  "I agree that Forge may call or text me at the number provided about Android availability. Message and data rates may apply. Reply STOP to opt out. [PLACEHOLDER, pending TCPA compliance review]";

const PHONE_RE = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-none bg-forge-iron/60 border border-white/10 px-4 py-3 text-sm text-forge-white placeholder:text-forge-graphite transition-colors focus:outline-none focus:border-forge-cyan focus:ring-1 focus:ring-forge-cyan";
const labelClass =
  "block text-[10px] font-mono uppercase tracking-[0.15em] text-forge-smoke mb-2";

export default function AndroidWaitlist() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string; consent?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // TCPA review pending — the block simply does not exist until the flag is on.
  if (!ANDROID_WAITLIST_ENABLED) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!phone.trim()) nextErrors.phone = "Phone number is required. We'll call you the day it's live.";
    else if (!PHONE_RE.test(phone.trim())) nextErrors.phone = "Enter a valid US phone number.";
    if (email.trim() && !EMAIL_RE.test(email.trim())) nextErrors.email = "Enter a valid email (or leave it blank).";
    if (!consent) nextErrors.consent = "We need your OK to contact you.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO(wiring): stub — endpoint does not exist yet. Failures are
    // swallowed on purpose so the visitor still gets the graceful state;
    // replace with real error handling when the collector is wired.
    try {
      await fetch(ANDROID_WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), email: email.trim() || undefined, consent, source: "marketing-site" }),
      });
    } catch {
      // Swallowed — see TODO(wiring) above.
    }
    setSubmitted(true);
  };

  return (
    <section id="android-waitlist" className="relative py-24 md:py-32 bg-transparent section-depth-b overflow-hidden">
      <div className="relative max-w-xl mx-auto px-6 text-center">
        <SectionLabel>ANDROID</SectionLabel>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-[-0.01em] text-forge-white mt-6">
          Android is coming to the Play Store.
        </h2>

        <p className="text-forge-smoke text-base mt-4">
          Leave your number and we&rsquo;ll call you the day it&rsquo;s live.
        </p>

        {submitted ? (
          <div className="mt-10 border border-forge-teal/40 bg-forge-teal/5 p-6">
            <p className="text-forge-white font-medium">You&rsquo;re on the list.</p>
            <p className="text-forge-smoke text-sm mt-2">
              We&rsquo;ll be in touch the day Forge lands on the Play Store.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-5 text-left">
            <div>
              <label htmlFor="waitlist-phone" className={labelClass}>
                Phone number *
              </label>
              <input
                id="waitlist-phone"
                type="tel"
                autoComplete="tel"
                placeholder="(555) 555-0134"
                className={inputClass}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="waitlist-email" className={labelClass}>
                Email (optional)
              </label>
              <input
                id="waitlist-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-[#0EA5E9]"
                aria-invalid={!!errors.consent}
              />
              {/* PLACEHOLDER consent copy — see header comment. NOT TCPA-reviewed. */}
              <span className="text-forge-smoke text-xs leading-relaxed">{PLACEHOLDER_CONSENT_COPY}</span>
            </label>
            {errors.consent && <p className="text-red-400 text-xs -mt-3">{errors.consent}</p>}

            <Button type="submit" variant="primary" size="md" className="w-full">
              <Smartphone size={18} strokeWidth={2} aria-hidden="true" />
              Join the Android waitlist
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
