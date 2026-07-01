# Handover Log

Running log of what has been done, phase by phase. Newest at top.

## Phase 0 — Restructure (DONE, awaiting approval)
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
