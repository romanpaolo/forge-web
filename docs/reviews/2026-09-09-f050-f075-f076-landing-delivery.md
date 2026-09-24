# F-050 / F-075 / F-076 landing delivery

Canonical implementation claim e0cd279e preceded these changes. This candidate incorporates PR11 (4878cf64) and the PR12/13 marketing/calculator work, then applies the settled September8 seat ruling: the first three seats may be staff or Sub, allocated to staff first. Additional staff remain $39/month or $374/year; additional Subs remain $9.99/month or $95.90/year. The minimum one staff seat and annual default are retained. Sub marketing promises assigned-task access, not the staff estimate surfaces. The contract FAQ states the existing term facts without its contradictory opening “No.”

The approved MSA, September2 effective date, version1.0, permanent archive, parser and integrity guard are byte-identical to PR11. SHA256: 7ed7d22e05d8978c88491a3b342b079a51a698b33ddb653298e784d1870e7fdb. No legal clause was rewritten for this integration.

## Verification

- Updated shared-seat expectations on the old implementation: 12 passed,6 failed. Corrected implementation:18 passed. Existing integer-cent, large-roster and annual headline/billed-amount checks remain.
- Final `npm run ci`: copy guard,18 pricing tests,TypeScript and production Next build all passed.
- Actual Chrome interaction against the built local app:2 staff+1 Sub shows $249/month and $2,390/year;2 staff+2 Subs shows $258.99/month and $2,485.90/year. Included counts show2 staff+1 Sub, with only the fourth seat charged. Expanded contract FAQ shows month-to-month and annual-renewal terms. Desktop pricing and agreement render inspected.
- Actual HTTP HTML for `/legal` and `/legal/msa/v1.0` contains every one of the55 numbered approved clauses, with the effective date. `/legal/msa` returns200 and its actual archive link navigates to the permanent version. All three routes return200.

## Delivery boundary

This is a reviewable update to existing upstream PR13. PR11 and PR12 remain open until the maintainer reviews the superseding diff. On September9 the authenticated rz4life account had pull access but no push/admin access to romanpaolo/forge-web. Vercel linked production still served upstream main bdd1b06d, and fork protection required project authorization for previews. Normal maintainer merge and deployment confirmation remain necessary. No direct production deployment, permissions changes, customer messages or checkout actions were performed.

## 2026-09-23 update: MSA linked, not copied; seat copy current

Two commits on top of 6e92e2a, recorded here because two statements above are no longer true of this PR.

- **The MSA copy, its routes and its integrity guard are removed.** The 2026-09-22 integration PRD (ruling 11) makes the app the one published home for the legal text, and the MSA follows it: `/legal#msa` now links to `app.forge.equipment/legal/msa`, and `/legal/msa` and `/legal/msa/*` forward there. The copy this PR carried had already drifted: its clause 3.4 lacked the admin-swap sentence and "A Sub Seat added at the Sub Seat Fee keeps the access limits in Section 1.6 and cannot be changed to a full Seat", both in the app's `content/legal/msa/2026-09-v1.md`. The "byte-identical to PR11" and "55 numbered clauses render" checks above describe the removed copy.
- **Seat copy states Ethan's 2026-09-14 rule** (MSA 3.4): an admin can switch an included seat between staff and Sub, and a Sub seat added beyond the included 3 stays a Sub seat. A Sub seat is "not a team role", described with the app's own sentence (Forge_Web `lib/display.ts` SUB_ROLE_SCOPE_COPY).
- **Tests** (`npm run test:pricing`, 25): adds 3 staff + 1 Sub = $258.99/month, $2,485.90/year (live main returns $249 for it), source checks that no page lists "Full team roles", prices an "additional teammate" or lists Sub on a "Team roles:" line, the FAQ swap and allocation rules, and that no MSA body text or content file is in `src` and the legal page and old addresses point at the app.

Merging still needs the maintainer: the authenticated account has push to the fork only.
