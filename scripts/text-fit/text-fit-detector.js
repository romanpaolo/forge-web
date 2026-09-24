// F-631 TWIN COPY: the text-fit detector for the marketing site
// (romanpaolo/forge-web, scripts/text-fit/). Its twin audits the web app:
// Forge-Solutions-Corp/Forge_Web, Forge/dashboard/scripts/text-fit/text-fit-detector.js.
// A change to one is a change to both: reconcile the other copy in the same
// ticket and name any divergence here.
//
// Everything below the "BODY" line is byte-identical to the F-631 audit tools
// copy that measured production (sha256 of the body:
// 73d27f67af8e03298e9f1b55faaf737fe79c4d682e6520530cda796971f536ce). Check:
//   sed '1,/^\/\/ ---- BODY/d' scripts/text-fit/text-fit-detector.js | shasum -a 256
// Known divergence, 2026-09-24: the Forge_Web twin's header lists two rule
// changes this copy does not carry (overlap/touching measured on the visible,
// clip-bounded part of a line; wrapped-control counted per stacking block).
// Neither is needed for this site's seven routes, which audit clean without
// them; they are for the root session to reconcile under F-631.
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
//   text-overlap      two different elements' text boxes intersect on screen
//   text-clipped      text cut off by an overflow:hidden/clip box with no ellipsis
//   page-overflow     the page scrolls sideways; names the elements past the right edge
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
    const n = lineCount(rects);
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

  // 2. text-overlap ------------------------------------------------------------
  // Sort by top; compare each line against later lines until they are below it.
  const sorted = lines.slice().sort((a, b) => a.top - b.top);
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
    defects.push({ kind: 'page-overflow', docWidth: docW, viewport: vw, culprits: culprits.slice(0, 8).map(({ node, ...c }) => c) });
  }

  return { url: location.pathname + location.search, viewport: [window.innerWidth, window.innerHeight], defects, truncated };
})
