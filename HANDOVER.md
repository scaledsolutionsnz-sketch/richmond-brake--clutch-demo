# Handover Log

Running log of what has been done, phase by phase. Newest at top.

## Phase 1 — Chooser landing (DONE, awaiting approval)
Date: 2026-07-01

What changed:
- Replaced `index.html` with the chooser landing (full-viewport split screen).
  The old index content is safe in `brake-clutch.html` (Phase 0) and `index.backup.html`.
- Left panel (dark/steel, red accent): "Brakes, Clutches & Repairs" -> brake-clutch.html,
  workshop phone 03 544 1660.
- Right panel (green/black, #7DB61C accent): "WOF & Vehicle Testing" -> rvts.html,
  station phone 03 544 9111.
- Top strip: "Two workshops, one address in Richmond" + 13 McGlashen Ave, Richmond 7020.
- Desktop: panels expand to ~55/45 on hover with the other dimmed (CSS only).
  Mobile (<=860px): stacks vertically, full width, no hover. prefers-reduced-motion honoured.
- Navigation is real anchor links (whole panel is a link), so it works without JS.
  No chooser.js needed; noted for the record (structure lists one but CSS+links cover it).
- Chooser styles are self-contained inline in index.html (standalone splash, no shared nav).
  The assets/css base/brake/rvts split is still deferred to Phase 2.
- Added `rvts.html` as a small green-themed PLACEHOLDER (noindex) so the RVTS button does
  not 404 between phases. Phase 2 replaces it with the full site.

Verification:
- index.html (chooser), brake-clutch.html, rvts.html all return 200.
- Chooser links resolve to both sides.

Next: Phase 2 (full RVTS site). STOP for approval first.
RVTS logo asset still to come from client (text/placeholder until then).

## Phase 0 — Restructure (DONE, approved)
Date: 2026-07-01

What changed:
- Backed up the original site to `index.backup.html` (untouched copy of the pre-build index).
- Copied `index.html` verbatim to `brake-clutch.html`.
- Repointed the two internal "home"/brand links inside `brake-clutch.html` from
  `index.html` to `brake-clutch.html` (lines 33 and 306). No other content changed
  (verified by diff: only those two lines differ).
- `index.html` left unchanged (still the current live site until Phase 1 replaces it
  with the chooser).
- CSS/JS untouched: styles are already external (`styles.css`, `main.js`), so per the
  Phase 0 rule they are just referenced, not split. The base/brake/rvts split is deferred
  to Phase 2 when the RVTS theme is added.
- Added PROJECT_CONTEXT.md and this HANDOVER.md.

Verification:
- `diff index.html brake-clutch.html` shows only the 2 expected link-line changes.
- brake-clutch.html renders identically to the current site.

Next: Phase 1 (chooser landing at index.html). STOP for approval first.

Open confirms carried forward: dog name, bubble copy, santa hat, RVTS hours,
both Google review links, dog image asset, RVTS logo asset. See PROJECT_CONTEXT.md.
