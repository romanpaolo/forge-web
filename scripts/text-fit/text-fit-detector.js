// F-631 TWIN COPY: the text-fit detector for the marketing site
// (romanpaolo/forge-web, scripts/text-fit/). Its twin audits the web app:
// Forge-Solutions-Corp/Forge_Web, Forge/dashboard/scripts/text-fit/text-fit-detector.js.
// A change to one is a change to both: reconcile the other copy in the same
// ticket.
//
// Everything below the "BODY" line is byte-identical in both repos (reconciled
// 2026-09-25: the web copy's visible-rect, stacking-block, squeezed-text and
// closed-details rules plus the off-screen rule now live in both). sha256 of
// the body: cc351173f9e9f4c03e0d57762911fc9e474e238758c3deec45abbcdd79b69064
// Check:
//   sed '1,/^\/\/ ---- BODY/d' scripts/text-fit/text-fit-detector.js | shasum -a 256
//
// Run by scripts/text-fit/run-text-fit.mjs, which evaluates this file as an
// expression (`page.evaluate('(' + src + ')()')`), so a bare function
// expression statement is its whole point.
/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unused-vars */
// ---- BODY (do not edit below without editing the twin) ----
// F-631 text-fit detector. Injected into a rendered page; returns every text-fit
// defect visible at the current viewport. Pure DOM + layout reads, no dependencies,
// so the same bytes run from Playwright, the browser pane, or a CI script.
//
// Defect kinds (each one is a failure, not a warning):
//   wrapped-control   a short control label (button, nav link, tab, badge) broken over >1 line
//   squeezed-text     (web divergence 3) a short standalone value broken over >1 line
//   text-overlap      two different elements' text boxes intersect on screen
//   text-clipped      text cut off by an overflow:hidden/clip box with no ellipsis
//   page-overflow     the page scrolls sideways; names the elements past the right edge
//   text-offscreen    text laid out past the viewport edge where scrolling cannot reach it
// Reported but not failing:
//   truncated         text cut with an ellipsis (a deliberate truncation, listed for review)
(function textFitDetector(options) {
  const opts = Object.assign({ maxControlWords: 4, maxControlChars: 40, tolerance: 1 }, options || {});
  const vw = document.documentElement.clientWidth;
  const defects = [];
  const truncated = [];

  const describe = (el) => {
    if (!el || el.nodeType !== 1) return String(el);
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    const cls = (el.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 4);
    if (cls.length) s += '.' + cls.join('.');
    const testid = el.getAttribute('data-testid');
    if (testid) s += `[data-testid=${testid}]`;
    return s;
  };
  const path = (el) => {
    const parts = [];
    let cur = el;
    for (let i = 0; cur && cur.nodeType === 1 && i < 4; i++, cur = cur.parentElement) parts.unshift(describe(cur));
    return parts.join(' > ');
  };
  const textOf = (el) => (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();

  // An element is "shown" when it and every ancestor render with non-zero opacity and
  // visibility, and it has a box. Closed menus (opacity-0) and sr-only text are skipped.
  const shownCache = new WeakMap();
  const isShown = (el) => {
    if (!el || el.nodeType !== 1) return true;
    if (shownCache.has(el)) return shownCache.get(el);
    const cs = getComputedStyle(el);
    let shown = !(cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse' || parseFloat(cs.opacity) === 0);
    if (shown && cs.position !== 'static' && cs.clip === 'rect(0px, 0px, 0px, 0px)') shown = false;
    if (shown && (cs.clipPath === 'inset(50%)' || cs.clipPath === 'inset(100%)')) shown = false;
    if (shown && el.getAttribute('aria-hidden') === 'true' && el.closest('[inert]')) shown = false;
    // [F-631 web divergence 4: a closed <details> shows only its summary.]
    // Chrome still lays out a closed details' content (it reports boxes and
    // a computed display of block) but never paints it, so its text was
    // measured on top of whatever follows the collapsed section. Found by
    // the web audit's job hub (F-631): a collapsed "Tasks from this scope"
    // list "overlapped" the next card's rows at every width.
    if (shown && el.parentElement) {
      const closed = el.parentElement.closest('details:not([open])');
      if (closed) {
        const summary = el.closest('summary');
        if (!(summary && summary.parentElement === closed)) shown = false;
      }
    }
    if (shown && el.parentElement) shown = isShown(el.parentElement);
    shownCache.set(el, shown);
    return shown;
  };
  // sr-only pattern: 1x1 box with overflow hidden.
  const isSrOnly = (el) => {
    for (let cur = el; cur && cur.nodeType === 1; cur = cur.parentElement) {
      const r = cur.getBoundingClientRect();
      const cs = getComputedStyle(cur);
      if (r.width <= 1 && r.height <= 1 && cs.overflow !== 'visible') return true;
    }
    return false;
  };

  // Every visible text line on the page, as rects owned by the nearest element.
  const lines = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
  });
  const range = document.createRange();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const el = n.parentElement;
    if (!el || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'OPTION'].includes(el.tagName)) continue;
    if (el.closest('svg')) continue;
    if (!isShown(el) || isSrOnly(el)) continue;
    range.selectNodeContents(n);
    for (const r of range.getClientRects()) {
      if (r.width < 1 || r.height < 1) continue;
      lines.push({ el, node: n, left: r.left, right: r.right, top: r.top, bottom: r.bottom });
    }
  }

  // [F-631 web divergence 1: clip to what is visible.] A text node's client
  // rects are its UNCLIPPED layout: a `truncate` title's rect runs its full
  // length under the ellipsis, through the badge beside it and into the next
  // card, and a column scrolled out of a table's scroll box still has rects.
  // None of that text is on screen, so it cannot overlap or touch anything.
  // Overlap and touching compare the part of each line inside every ancestor
  // that clips overflow (a fixed-position layer starts a fresh clip chain,
  // since overflow clipping does not reach it). text-clipped and
  // wrapped-control keep reading the raw rects. Found by the web audit's
  // /jobs cards (Forge/dashboard/scripts/text-fit, F-631): 20 "overlaps"
  // between an ellipsized h3 and its own card's badges and neighbour card.
  const clipCache = new WeakMap();
  const clipBoxOf = (el) => {
    if (!el || el.nodeType !== 1 || el === document.documentElement) return null;
    if (clipCache.has(el)) return clipCache.get(el);
    const cs = getComputedStyle(el);
    let box = cs.position === 'fixed' ? null : clipBoxOf(el.parentElement);
    const cx = cs.overflowX !== 'visible', cy = cs.overflowY !== 'visible';
    if ((cx || cy) && el !== document.body) {
      const r = el.getBoundingClientRect();
      box = box ? Object.assign({}, box) : { left: -Infinity, right: Infinity, top: -Infinity, bottom: Infinity };
      if (cx) { box.left = Math.max(box.left, r.left); box.right = Math.min(box.right, r.right); }
      if (cy) { box.top = Math.max(box.top, r.top); box.bottom = Math.min(box.bottom, r.bottom); }
    }
    clipCache.set(el, box);
    return box;
  };
  const visibleLines = [];
  for (const l of lines) {
    const c = clipBoxOf(l.el);
    const v = c
      ? { el: l.el, node: l.node, left: Math.max(l.left, c.left), right: Math.min(l.right, c.right), top: Math.max(l.top, c.top), bottom: Math.min(l.bottom, c.bottom) }
      : l;
    if (v.right - v.left >= 1 && v.bottom - v.top >= 1) visibleLines.push(v);
  }

  // Distinct line count for an element's own text, from its text rects.
  const lineCount = (rects) => {
    const tops = [];
    for (const r of rects) {
      const mid = (r.top + r.bottom) / 2;
      if (!tops.some((t) => Math.abs(t - mid) < Math.max(2, (r.bottom - r.top) * 0.5))) tops.push(mid);
    }
    return tops.length;
  };

  // 1. wrapped-control ------------------------------------------------------
  const stackOwner = (node, ctl) => {
    let cur = node.parentElement;
    while (cur && cur !== ctl) {
      const d = getComputedStyle(cur).display;
      const p = cur.parentElement;
      const pcs = p ? getComputedStyle(p) : null;
      const inRowFlex = !!pcs && /flex/.test(pcs.display) && !/column/.test(pcs.flexDirection);
      if (!d.startsWith('inline') && d !== 'contents' && !inRowFlex) return cur;
      cur = p;
    }
    return ctl;
  };
  const CONTROL_SEL = [
    'button', 'a[href]', '[role=button]', '[role=tab]', '[role=menuitem]', '[role=link]',
    'summary', 'th', 'label', 'nav a', 'nav button',
    '[class*="badge" i]', '[class*="chip" i]', '[class*="pill" i]', '[class*="tag" i]',
    '[data-single-line]',
  ].join(',');
  const seen = new Set();
  for (const el of document.querySelectorAll(CONTROL_SEL)) {
    if (!isShown(el) || isSrOnly(el)) continue;
    if (el.closest('[data-text-fit-allow-wrap]')) continue;
    const text = textOf(el);
    if (!text) continue;
    const words = text.split(' ').length;
    if (words > opts.maxControlWords || text.length > opts.maxControlChars) continue;
    // An inline link inside running prose wraps with its sentence; that is correct.
    const cs = getComputedStyle(el);
    if (cs.display === 'inline' && el.tagName === 'A') {
      const parent = el.parentElement;
      const parentText = parent ? textOf(parent) : '';
      if (parentText.length > text.length + 10 && !el.closest('nav, header, footer [role=list], ul[class*="flex"]')) continue;
    }
    // Controls that are block-level rows of content (cards as links) are not labels.
    if (el.querySelector('p, h1, h2, h3, h4, img, svg + div, div div')) {
      // Keep it only when it is still clearly a short label wrapper.
      if (el.querySelectorAll('*').length > 6) continue;
    }
    const rects = lines.filter((l) => el.contains(l.node));
    if (!rects.length) continue;
    // [F-631 web divergence 2: a stack is not a wrap.] A control built from
    // STACKED blocks (a stat-card link: "OPEN TASKS" over its count, an icon
    // over a caption) is several one-line labels, not one label broken into
    // pieces. Lines are counted per stacking block: the nearest block-level
    // box that is not an item of a ROW flex (row-flex items of one label
    // share its line, so their wrap still counts). A single text run that
    // breaks is still one block with two lines. Found by the web audit's
    // owner dashboard (F-631): "RED FLAGS 0" and "OPEN TASKS 0" cards.
    const groups = new Map();
    for (const l of rects) {
      const owner = stackOwner(l.node, el);
      if (!groups.has(owner)) groups.set(owner, []);
      groups.get(owner).push(l);
    }
    let n = 0;
    for (const g of groups.values()) n = Math.max(n, lineCount(g));
    if (n > 1) {
      const key = el;
      if (seen.has(key)) continue;
      seen.add(key);
      // Report the innermost wrapped control only.
      defects.push({ kind: 'wrapped-control', text, lines: n, el: path(el), width: Math.round(el.getBoundingClientRect().width) });
    }
  }
  // Drop an outer control whose inner control is already reported.
  for (let i = defects.length - 1; i >= 0; i--) {
    const d = defects[i];
    if (d.kind !== 'wrapped-control') continue;
    if (defects.some((o, j) => j !== i && o.kind === 'wrapped-control' && o.el.length > d.el.length && o.el.startsWith(d.el))) defects.splice(i, 1);
  }

  // [F-631 web divergence 3: squeezed-text.] RZ's standard names "text
  // squeezing" and "wrapping into pieces", and wrapped-control only sees
  // controls. A short standalone value (a date, a money figure, a trade, a
  // status word, a name: at most maxControlWords words) that is the whole
  // text of its element and breaks across lines is squeezed into pieces,
  // control or not. Headings may wrap like prose and are left out, as are
  // fragments of a longer run (a word inside a sentence) and anything a
  // control already reported. Found by the web audit's /jobs cards (F-631):
  // "Jun / 10, / 8:00 / AM" stacked a word per line in a 60px column that
  // no control-only rule could see.
  const reported = new Set(defects.filter((d) => d.kind === 'wrapped-control').map((d) => d.el));
  const squeezed = new Map();
  for (const l of lines) {
    const el = l.el;
    if (squeezed.has(el)) { squeezed.get(el).push(l); continue; }
    if (el.closest('h1, h2, h3, h4, h5, h6, [data-text-fit-allow-wrap]')) continue;
    const own = textOf(el);
    const t = (l.node.nodeValue || '').replace(/\s+/g, ' ').trim();
    if (!own || own !== t) continue;
    if (own.split(' ').length > opts.maxControlWords || own.length > opts.maxControlChars) continue;
    // A phrase set inline inside running text (a link at the end of a
    // sentence) wraps with its sentence, exactly as wrapped-control allows.
    if (getComputedStyle(el).display === 'inline' && el.parentElement && textOf(el.parentElement).length > own.length + 10) continue;
    squeezed.set(el, [l]);
  }
  // "Into pieces" is measured, not assumed: a value is squeezed when it
  // breaks at all and it holds a figure (a date, money, a count or a code
  // never wraps), or when it breaks onto three or more lines, or when a
  // line is left holding a single word ("Deposits / Collected", "per
  // square / foot"). A four-word title that wraps two words over two
  // ("Renew certificate / of insurance") is ordinary wrapping, not pieces.
  const wordsPerLine = (node) => {
    const tops = [];
    const txt = node.nodeValue;
    const re = /\S+/g;
    for (let m = re.exec(txt); m; m = re.exec(txt)) {
      const r = document.createRange();
      r.setStart(node, m.index);
      r.setEnd(node, m.index + m[0].length);
      const b = r.getClientRects()[0];
      if (!b) continue;
      const mid = (b.top + b.bottom) / 2;
      const row = tops.find((t) => Math.abs(t.mid - mid) < Math.max(2, (b.bottom - b.top) * 0.5));
      if (row) row.words++;
      else tops.push({ mid, words: 1 });
    }
    return tops.map((t) => t.words);
  };
  for (const [el, rs] of squeezed) {
    const n = lineCount(rs);
    if (n < 2) continue;
    const perLine = wordsPerLine(rs[0].node);
    const pieces = /\d/.test(textOf(el)) || n >= 3 || perLine.some((w) => w === 1);
    if (!pieces) continue;
    const p = path(el);
    if ([...reported].some((r) => p.startsWith(r) || r.startsWith(p))) continue;
    // Inside a short LABEL control the control rule owns it (with its stack
    // rule). A control that is a whole card (a job card link) is not a
    // label, so the values inside it are checked here.
    const ctl = el.closest(CONTROL_SEL);
    if (ctl) {
      const ct = textOf(ctl);
      if (ct.split(' ').length <= opts.maxControlWords && ct.length <= opts.maxControlChars) continue;
    }
    defects.push({ kind: 'squeezed-text', text: textOf(el), lines: n, el: p, width: Math.round(el.getBoundingClientRect().width) });
  }

  // 2. text-overlap ------------------------------------------------------------
  // Sort by top; compare each line against later lines until they are below it.
  const sorted = visibleLines.slice().sort((a, b) => a.top - b.top);
  const overlapPairs = new Set();
  const t = opts.tolerance;
  for (let i = 0; i < sorted.length; i++) {
    const a = sorted[i];
    for (let j = i + 1; j < sorted.length; j++) {
      const b = sorted[j];
      if (b.top >= a.bottom - t) break;
      if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      // Line boxes of adjacent rows legitimately share a pixel or two of leading.
      if (ix > t && iy > Math.min(a.bottom - a.top, b.bottom - b.top) * 0.35) {
        // Is one element painted over the other on purpose (a stacked layer)?
        const key = [path(a.el), path(b.el)].sort().join(' | ');
        if (overlapPairs.has(key)) continue;
        overlapPairs.add(key);
        defects.push({ kind: 'text-overlap', a: textOf(a.el).slice(0, 60), b: textOf(b.el).slice(0, 60), elA: path(a.el), elB: path(b.el), overlapPx: [Math.round(ix), Math.round(iy)] });
      }
    }
  }
  // Text that touches: two different elements on the same line with < 2px between
  // their glyph boxes (the FORGE wordmark flush against "Product").
  const touchPairs = new Set();
  for (let i = 0; i < sorted.length; i++) {
    const a = sorted[i];
    for (let j = i + 1; j < sorted.length; j++) {
      const b = sorted[j];
      if (b.top >= a.bottom - t) break;
      if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const sameRow = Math.abs((a.top + a.bottom) / 2 - (b.top + b.bottom) / 2) < Math.min(a.bottom - a.top, b.bottom - b.top) * 0.5;
      if (!sameRow) continue;
      const gap = a.left < b.left ? b.left - a.right : a.left - b.right;
      if (gap >= -t && gap < 2) {
        // Only LAYOUT siblings can crowd each other: two items of one flex or grid row.
        // Pieces of one inline run (a <strong> in a sentence, a word split into
        // per-letter animation spans) share a line box by design.
        let common = a.el.parentElement;
        while (common && !common.contains(b.el)) common = common.parentElement;
        const cd = common ? getComputedStyle(common).display : '';
        if (!/flex|grid/.test(cd)) continue;
        const ca = getComputedStyle(a.el).display, cb = getComputedStyle(b.el).display;
        if (ca === 'inline' && cb === 'inline' && a.el.parentElement === b.el.parentElement) continue;
        const key = [path(a.el), path(b.el)].sort().join(' | ');
        if (touchPairs.has(key)) continue;
        touchPairs.add(key);
        defects.push({ kind: 'text-touching', a: textOf(a.el).slice(0, 60), b: textOf(b.el).slice(0, 60), elA: path(a.el), elB: path(b.el), gapPx: Math.round(gap * 10) / 10 });
      }
    }
  }

  // 3. text-clipped / truncated -------------------------------------------------
  for (const el of document.body.querySelectorAll('*')) {
    if (!isShown(el) || isSrOnly(el)) continue;
    const cs = getComputedStyle(el);
    const clipsX = ['hidden', 'clip'].includes(cs.overflowX);
    const clipsY = ['hidden', 'clip'].includes(cs.overflowY);
    if (!clipsX && !clipsY) continue;
    const text = textOf(el);
    if (!text) continue;
    // Only boxes that directly hold text (not layout wrappers that hide decoration).
    const ownText = [...el.childNodes].some((c) => c.nodeType === 3 && c.nodeValue.trim());
    const lineClamp = cs.webkitLineClamp && cs.webkitLineClamp !== 'none';
    const overX = clipsX && el.scrollWidth > el.clientWidth + 1;
    const overY = clipsY && el.scrollHeight > el.clientHeight + 2;
    if (!overX && !overY) continue;
    if (!ownText && !lineClamp) {
      // A wrapper clipping a child's text: check the child text lines against its box.
      const box = el.getBoundingClientRect();
      const cut = lines.some((l) => el.contains(l.node) && (l.right > box.right + 1 || l.left < box.left - 1 || l.bottom > box.bottom + 2 || l.top < box.top - 2) && l.bottom > 0);
      if (!cut) continue;
    }
    const entry = { text: text.slice(0, 80), el: path(el), box: [el.clientWidth, el.clientHeight], content: [el.scrollWidth, el.scrollHeight] };
    if (cs.textOverflow === 'ellipsis' || lineClamp) truncated.push(entry);
    else defects.push(Object.assign({ kind: 'text-clipped' }, entry));
  }

  // 4. page-overflow ----------------------------------------------------------------
  const docW = document.documentElement.scrollWidth;
  if (docW > vw + 1) {
    const culprits = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (!isShown(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.right <= vw + 1 || r.width === 0) continue;
      // Skip elements inside a container that scrolls or clips horizontally.
      let contained = false;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const pcs = getComputedStyle(p);
        if (['auto', 'scroll', 'hidden', 'clip'].includes(pcs.overflowX)) { contained = true; break; }
      }
      if (contained) continue;
      // Report the outermost culprit only.
      if (culprits.some((c) => c.node.contains(el))) continue;
      culprits.push({ node: el, el: path(el), right: Math.round(r.right), text: textOf(el).slice(0, 50) });
    }
    // [F-631 web divergence 5: name the text, too.] Text can run past the
    // viewport while every element box stays inside it (a long email with
    // no break opportunity overflows its <p>), which left the culprit list
    // empty and the report unactionable. Reporting only: the verdict is the
    // same. Found by the web audit's /profile at 320px (F-631).
    if (!culprits.length) {
      for (const l of visibleLines) {
        if (l.right <= vw + 1) continue;
        if (culprits.some((c) => c.node === l.el)) continue;
        culprits.push({ node: l.el, el: path(l.el), right: Math.round(l.right), text: textOf(l.el).slice(0, 50) });
      }
    }
    defects.push({ kind: 'page-overflow', docWidth: docW, viewport: vw, culprits: culprits.slice(0, 8).map(({ node, ...c }) => c) });
  }

  // 5. text-offscreen --------------------------------------------------------------
  // Text laid out past the left or right edge of the viewport where the reader cannot
  // scroll to it. page-overflow misses this when the text sits in a fixed or sticky
  // box (a header row pushed wider than the screen adds nothing to scrollWidth), so
  // the planted-red header at 768px showed START FREE TRIAL entirely off-screen and
  // nothing named it (F-631). Text inside a box that scrolls or clips horizontally
  // is that box's business: scrolling reaches it, and clipping is text-clipped.
  const offscreen = new Set();
  for (const l of lines) {
    if (l.right <= vw + 1 && l.left >= -1) continue;
    let inScroller = false;
    let fixed = false;
    for (let p = l.el; p && p !== document.body; p = p.parentElement) {
      const pcs = getComputedStyle(p);
      if (['auto', 'scroll', 'hidden', 'clip'].includes(pcs.overflowX)) { inScroller = true; break; }
      if (pcs.position === 'fixed' || pcs.position === 'sticky') fixed = true;
    }
    if (inScroller) continue;
    // In normal flow, text past the right edge is already reported by page-overflow.
    if (!fixed && l.left >= -1) continue;
    if (offscreen.has(l.el)) continue;
    offscreen.add(l.el);
    defects.push({ kind: 'text-offscreen', text: textOf(l.el).slice(0, 60), el: path(l.el), span: [Math.round(l.left), Math.round(l.right)], viewport: vw });
  }

  return { url: location.pathname + location.search, viewport: [window.innerWidth, window.innerHeight], defects, truncated };
})
