# Handover Log

Running log of what has been done, phase by phase. Newest at top.

## Phase 2 — RVTS site (DONE, awaiting approval)
Date: 2026-07-01

Assets received from client and added:
- `assets/img/dog.png` (mascot, black lab, WITH Santa hat) optimised to 519x620, ~341KB.
  NOTE: plan default was to remove the hat for a year round mascot. Client supplied it
  WITH the hat. CONFIRM at Phase 4 whether to keep or cut the hat.
- `assets/img/rvts-logo.png` (metal oval RVTS badge, transparent) optimised to 1000x395, ~430KB.

CSS architecture (the deferred split, done now):
- Kept `styles.css` as the Brake & Clutch stylesheet, untouched (brake stays identical).
- Added `rvts.css` = `@import url('styles.css')` + green token overrides only
  (--accent #7DB61C, --accent-d #63920f, --accent-soft), plus .brand-logo sizing and a
  green hero wash. This keeps the two themes separate: tweaking RVTS green never touches
  brake. The accent is fully tokenised in styles.css, so one override reskins buttons,
  eyebrows, service numbers, highlights, etc. red -> green.

rvts.html (replaced the Phase 1 placeholder) mirrors brake-clutch.html structure:
- Nav uses the metal RVTS logo image (not the text lockup), phone 03 544 9111.
- Hero: "Safe vehicles. Safe roads. Peace of mind." CTAs Book a WOF + Call the station.
  Trust stats 4.8 / 43 reviews / Richmond.
- Six services from the signage: WOF, Prechecks, Vehicle Inspections, Brakes & Suspension,
  Tyres & Steering, Lights & Mechanical.
- About: same owner (Barry Andrews, managing director), same address (13 McGlashen Ave),
  same premises as the brake workshop.
- Crew, reviews (RVTS voice, 4.8 from 43, green Google marks), review funnel.
- Contact: phone 9111, office@richmondvts.co.nz, 13 McGlashen Ave Richmond 7020,
  hours placeholder "Mon to Fri, 8am to 5pm" (CONFIRM real hours).
- Footer: RVTS branding, shared terms/privacy.

FORM DECISION (deviation from the plan, flagged):
- Plan said reuse StaticForms key sf_768da8d33927e7f4f241d0a6. That key is actually the
  KCR Performance site's, and the brake form here uses formsubmit.co -> office@richmondvts.co.nz.
  Using the KCR key would misroute RVTS enquiries. So the RVTS form mirrors the brake form:
  formsubmit.co -> office@richmondvts.co.nz. Confirm if a different endpoint is wanted.

Copy rule: no em dashes in any new RVTS copy or meta (verified 0). Existing brake copy
still contains its original em/en dashes; left as is per "do not touch the brake site".

Next: Phase 3 (nav switcher on both sites). STOP for approval first.

## Phase 1 — Chooser landing (DONE, approved)
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
