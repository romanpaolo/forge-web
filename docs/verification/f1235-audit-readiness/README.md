# F-1235 audit readiness candidate

Verification tooling only. No product page, internal-page gate, route discovery,
viewport inventory or detector changes. No tests or browser runs by the author.

`route-readiness.mjs` records the seven existing static routes' current content
contracts. Heading text alone is insufficient: each route also needs its own
section IDs, form fields, price controls or case-study disclosure. The source
paths are carried in each report row. A new route without a contract fails the
audit rather than being silently omitted. Intentional copy/structure changes
must update the corresponding qualification contract in review.

Error-screen detection uses one shared browser snapshot predicate for waiting
and evidence; ordinary body prose mentioning application errors is not an error screen.

The driver qualifies HTTP status, exact final route/origin, expected content,
settled document/fonts, visible standard error-screen headings and unhandled page exceptions before calling
the unchanged detector. It repeats qualification after resize/lazy rendering and
after measurement to catch errors arising during that interval. HTTP navigation
history, final URL, title, bounded rendered body excerpt, matched/missing markers,
console warnings/errors and page exceptions are additive JSON evidence. A failed
navigation/settle keeps any HTTP response actually received.

The JSON remains an array. Healthy rows retain route/w/h/textLines/defects and
truncated fields plus measured:true/readiness. Invalid rows have measured:false,
textLines:null, no fabricated layout defects, and explicit refusal evidence.
Initial qualification failures label each requested matrix entry as unattempted,
with phase and actual observed viewport, rather than claiming viewport renders.
Console errors remain evidence without a blanket zero-console-error gate.
Invalid rows contribute to failures but never to measured-render totals. Harmless
console errors alone do not fail qualification. A private
/brand or /design 404 remains a failure under the existing policy and is labelled
as gated-private-404-chrome-not-intended-content; no private content is claimed.
No route, viewport or internal-policy skip was added.

## Required real-browser control, run by root under normal admission

Reuse existing matching Playwright dependencies and browsers. No npm install is
needed for this candidate. The test starts only its own loopback fixture HTTP
server, copies the selected exact canonical driver bytes and unchanged detector
into a temporary repo-shaped directory, and links the existing dependencies.
It does not start/build the landing app, upload or call a provider.

Preserve `git show d433a056d02a376b1c8eb4671288838af1bb13eb:scripts/text-fit/run-text-fit.mjs`
as a separate file outside product paths. Verify its SHA-256 is
`95b75515e55f11276fc453782913063e075efb24396e4f7d974916201ca5d071`.
For a focused expected RED, run:

```
F1235_EVIDENCE_DIR=/absolute/evidence/RED F1235_DRIVER=/absolute/preserved-old-driver.mjs node --test --test-name-pattern='HTTP200 Application error' scripts/text-fit/readiness.browser.test.mjs
```

The old exact driver should return PASS/zero defects for the HTTP200 rendered
Application-error page with visible text, causing the regression assertion to
FAIL. Archive the actual command, old hash, exit, stdout and stderr; an inability
to launch Chromium is infrastructure failure, not the expected regression RED.
The test assertion includes the old actual driver stdout so the false PASS is
retained. Do not change assertions or synthetic input between RED and GREEN.

Then run the candidate's full control:

```
F1235_EVIDENCE_DIR=/absolute/evidence/GREEN npm run test:audit-readiness
```

Twelve tests cover the error page, a healthy zero-defect route, nonempty generic
chrome, a wrong-route redirect, unhandled page exceptions despite expected content, a healthy console-error control, healthy prose mentioning application errors,
error replacement on resize, an unregistered route and private404 chrome. The
normal CI text-fit step runs this control after its existing Chromium install
and before its already-existing build; no extra build was added.

Actual current production audit and exact-source required CI remain owed after
source review. Synthetic healthy content proves the driver/control contract,
not the real site's availability, route text, layout or F-631 closure. Errors
and all historical false-success evidence remain preserved.

Opt-in `F1235_EVIDENCE_DIR` preserves each actual child report, stdout, stderr,
exit/signal and driver SHA before assertions, with sequential case filenames.
Use distinct empty RED/GREEN destinations; existing files are refused, not overwritten.

Settling uses the actual `contentSnapshot` function reference with explicit boolean
wait mode. Added delayed hydration (1500ms, after networkidle) and permanent missing
content (actual 10000ms qualification timeout) controls. The prior normal2082 old
RED remains applicable unchanged; only the new candidate needs another run.
