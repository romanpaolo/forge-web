/* Single source of truth for the Harris & Sons customer-story numbers.
 *
 * Why this file exists: these figures were previously hand-copied into three
 * places (the case-study page, the homepage teaser, and the pricing ROI line).
 * Nothing tied them together, so editing one surface silently put the site in
 * contradiction with itself. Every surface now derives from HARRIS_STATS.
 *
 * Rule: a number that appears on more than one surface lives HERE and nowhere
 * else. Numbers used by exactly one surface (the before/after table, the
 * revenue projection) stay local to that surface.
 *
 * All figures are self-reported from Harris & Sons' own books. The ownership
 * disclosure (PRD 10.3) is required wherever these appear.
 */

export const HARRIS_STATS = {
  /* Company naming. Rendered through JSX, so the raw ampersand is correct:
     React escapes it. Do NOT write &amp; here or it double-escapes. */
  companyFull: "Harris & Sons Construction",
  companyShort: "Harris & Sons",

  /* The five cross-surface figures. */
  estimatingTimeCut: "75%",
  attributedRevenue: "$330K",
  scopeLossPrevented: "$40K",
  scopeLossPreventedLong: "$40,000",
  revenueGrowth: "60%",
  window: "90 days",
} as const;

/* Derived prose. Each surface needs its own sentence shape (a meta
 * description reads differently from an ROI line), but every number in them
 * comes from HARRIS_STATS above, so the figures can never drift apart. */

const S = HARRIS_STATS;

/* The case-study page opens with one claim, used twice: as the <h1> subhead
 * and (with a trailing "on Forge") as the meta description. Shared stem so
 * the two cannot diverge. */
const HARRIS_SUMMARY_STEM =
  `How a family remodeling contractor cut estimating time ${S.estimatingTimeCut}, ` +
  `prevented a ${S.scopeLossPreventedLong} scope loss, and grew projected ` +
  `revenue ${S.revenueGrowth}. All in ${S.window}`;

/** Case-study page <h1> subhead. */
export const HARRIS_SUMMARY_LONG = `${HARRIS_SUMMARY_STEM}.`;

/** Case-study page meta description (search results). */
export const HARRIS_SUMMARY_META = `${HARRIS_SUMMARY_STEM} on Forge.`;

/** Case-study page OpenGraph description. */
export const HARRIS_SUMMARY_OG =
  `${S.estimatingTimeCut} less estimating time, ${S.attributedRevenue} in ` +
  `Forge-attributed revenue, a ${S.scopeLossPrevented} scope-dispute loss ` +
  `prevented. All in the first ${S.window}.`;

/** Homepage case-study teaser paragraph. */
export const HARRIS_SUMMARY_TEASER =
  `${S.companyFull} cut estimating time ${S.estimatingTimeCut}, prevented a ` +
  `${S.scopeLossPreventedLong} scope-dispute loss, and grew projected revenue ` +
  `${S.revenueGrowth}. All in their first ${S.window} on Forge.`;

/** Pricing-page ROI line. Revenue-led, not loss-led: different argument. */
export const HARRIS_SUMMARY_ROI =
  `${S.companyShort} cut estimating time ${S.estimatingTimeCut} and added ` +
  `${S.attributedRevenue} in Forge-attributed revenue in their first ${S.window}.`;

/** Homepage teaser stat grid. */
export const HARRIS_TEASER_STATS = [
  { value: S.estimatingTimeCut, label: "less time estimating" },
  { value: S.attributedRevenue, label: "Forge-attributed revenue" },
  { value: S.scopeLossPrevented, label: "scope-dispute loss prevented" },
];
