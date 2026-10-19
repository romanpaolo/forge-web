// F-1235: route-specific evidence, derived from the current page/component sources.
// A new static route must add an explicit contract; nonempty site chrome is not coverage.
export const ROUTE_CONTENT = Object.freeze({
  "/": { source: "src/app/page.tsx; sections/Hero3D,Features,SampleWalkDemo", markers: [
    ["main h1", "Walk the job."], ["main h1", "Leave with the estimate."],
    ["main #product", null], ["main #demo", null],
  ] },
  "/pricing": { source: "src/app/pricing/page.tsx; pricing/PlanConfigurator", markers: [
    ["header h1", "Your first three seats included."], ["[aria-label='Billing period']", null], ["[aria-label='Plan price']", null],
  ] },
  "/support": { source: "src/app/support/page.tsx; support/ContactForm", markers: [
    ["main h1", "How can we help?"], ["main form #contact-email", null], ["main form #contact-message", null],
  ] },
  "/legal": { source: "src/app/legal/page.tsx", markers: [
    ["main h1", "Legal"], ["main #terms h2", "Terms of Service"], ["main #privacy h2", "Privacy Policy"],
  ] },
  "/customers/harris-and-sons": { source: "src/app/customers/harris-and-sons/page.tsx", markers: [
    ["main h1", "Two weeks to three days."], ["main h1", "A $4M year ahead."],
    ["main p", "Harris & Sons Construction is owned by Forge cofounder Christian"],
  ] },
  "/brand": { source: "src/app/brand/page.tsx (internal gate unchanged)", markers: [
    ["main h1", "Design System"], ["main #colors h2", "Color Palette"], ["main #typography h2", "Typography"],
  ] },
  "/design": { source: "src/app/design/page.tsx (internal gate unchanged)", markers: [
    ["main h1", "Brand Design Guideline"], ["main #brand-foundation", null], ["main #mission-vision", null],
  ] },
});

// Runs in the browser. No layout detector runs until this qualification succeeds.
export function contentSnapshot(contract) {
  const normalized = (text) => (text || "").replace(/\s+/g, " ").trim();
  const visible = (el) => el.checkVisibility({ visibilityProperty: true });
  const body = normalized(document.body?.innerText);
  // Standard rendered error headings, not ordinary route prose mentioning errors.
  const errorScreen = [...document.querySelectorAll("h1,h2,[role='heading']")].some((el) => {
    if (!visible(el)) return false;
    const heading = normalized(el.textContent);
    return /^application error(?:\s*:|$)/i.test(heading) ||
      /^(?:a client-side|a server-side) exception has occurred\b/i.test(heading) ||
      /^this page could not be found\.?$/i.test(heading);
  });
  const markers = (contract?.markers || []).map(([selector, text]) => ({
    selector, expectedText: text,
    matched: [...document.querySelectorAll(selector)].some((el) => visible(el) && (text === null || normalized(el.textContent).includes(text))),
  }));
  return { evidenceViewport: { width: window.innerWidth, height: window.innerHeight }, title: document.title, bodyTextExcerpt: body.slice(0, 4096), errorScreen, markers,
    readyState: document.readyState, fontsStatus: document.fonts?.status || "unavailable" };
}

export async function qualifyRoute(page, { route, base, status, events, responseHistory = [], navigationError = null, timeout = 10000 }) {
  const contract = ROUTE_CONTENT[route];
  const reasons = [];
  if (!contract) reasons.push("unregistered-route-content-contract");
  if (navigationError) reasons.push("navigation-or-settling-failed");
  if (status < 200 || status > 299) reasons.push("unsuccessful-http-status");
  const expected = new URL(route, base);
  let final;
  try { final = new URL(page.url()); } catch { reasons.push("invalid-final-url"); }
  const clean = (p) => p === "/" ? p : p.replace(/\/$/, "");
  if (final && (final.origin !== expected.origin || clean(final.pathname) !== clean(expected.pathname))) reasons.push("wrong-route");
  // Do not wait through a terminal HTTP/route failure. Still capture what actually rendered.
  if (!reasons.length) {
    try {
      // Reuse the exact browser snapshot predicate for waiting and evidence.
      await page.waitForFunction(`(contract) => {
        const snapshot = (${contentSnapshot.toString()})(contract);
        return snapshot.errorScreen || (snapshot.readyState === "complete" && snapshot.fontsStatus === "loaded" && snapshot.markers.every((m) => m.matched));
      }`, contract, { timeout });
    } catch { reasons.push("expected-content-or-settling-timeout"); }
  }
  let content;
  try { content = await page.evaluate(contentSnapshot, contract || null); }
  catch { content = null; reasons.push("content-evidence-unavailable"); }
  if (content?.errorScreen) reasons.push("application-or-not-found-screen");
  if (contract && content?.markers.some((m) => !m.matched)) reasons.push("missing-expected-route-content");
  if (content && (content.readyState !== "complete" || content.fontsStatus !== "loaded")) reasons.push("document-or-fonts-not-ready");
  // Console diagnostics remain evidence; an unhandled exception is a refusal.
  if (events.some((e) => e.kind === "pageerror")) reasons.push("unhandled-page-exception");
  return { qualified: reasons.length === 0, reasons: [...new Set(reasons)], status, requestedURL: expected.href,
    finalURL: page.url(), contractSource: contract?.source || null, content, navigationError,
    browserEvents: [...events], responseHistory: [...responseHistory], coverage: status === 404 && ["/brand", "/design"].includes(route)
      ? "gated-private-404-chrome-not-intended-content" : reasons.length ? "unqualified-not-measured" : "intended-route-content" };
}
