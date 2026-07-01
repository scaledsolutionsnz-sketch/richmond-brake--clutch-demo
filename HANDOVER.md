# Handover Log

Running log of what has been done, phase by phase. Newest at top.

## Adjustment (post Phase 4, client request)
Date: 2026-07-01
- Santa hat put BACK on the dog (assets/img/dog.png restored from dog-santa.png). The
  no-hat version is no longer used; keep dog-santa.png as the working hatted asset.
- Chooser landing (index.html) confirmed as the front door: you pick a site on entry.
- Replaced the segmented switcher (two segments + home icon) with a single "Switch to the
  other site" pill button in each nav (themed via var(--accent): red on brake, green on RVTS).
  brake-clutch.html shows "Switch to Testing Station" -> rvts.html; rvts.html shows
  "Switch to Brake & Clutch" -> brake-clutch.html.
- Nav and footer brand/logo now link to index.html (the chooser), so you can always get
  back to re-choose. (Was pointing at each site's own home.)

## Phase 4 — Dog mascot (DONE, approved; hat re-added by request)
Date: 2026-07-01

Santa hat: CUT (per client instruction). The hatted original is kept at
assets/img/dog-santa.png (reversible). The Santa hat was removed from assets/img/dog.png
by keying out the red/white/tan hat pixels, then reconstructing the crown of the head as
smooth black fur (a matched dark dome, softened) so the top of the head reads naturally.
At mascot display size (~120px, ~84px mobile) it looks like a normal black dog head.

Component (shared, DRY):
- dog.js at repo root (next to main.js). Reads window.DOG_CONFIG = { img, bubble, threshold }.
- Builds a fixed bottom-left mascot, hidden at the top of the page, revealed once scrolled
  past ~70% of the hero (capped 620px, fallback 420px): fade + slide up, then pinned.
- Speech bubble (default ON) top-right of the dog with a dismiss x. Dismiss hides the dog
  for the rest of that page view (in-memory only, no storage, so the every-visit rule holds).
- z-index 40 (below the nav at 60), pointer-events off until revealed.
- prefers-reduced-motion: plain fade, no slide. Mobile: shrinks to 84px; bubble hidden
  under 420px so it never covers a button.

Per-page config:
- brake-clutch.html: bubble "Car making a noise? Book it in."
- rvts.html: bubble "WOF due? We can fit you in."
- NOT included on the chooser (index.html), as specified.

CSS added to styles.css (shared) so both sites inherit.
Dog name (DOG_NAME placeholder in the plan) is not used anywhere in the current copy,
so no name was needed. Supply one later if you want it in the bubble or alt text.

Next: Phase 5 (polish and QA: brand-aware review.html, cross-linked footers, Lighthouse,
responsive checks). STOP for approval first.
Still needed for Phase 5: both Google review links (Brake & Clutch and RVTS).

## Phase 3 — Nav switcher (DONE, approved)
Date: 2026-07-01

What changed:
- Added a segmented switcher to both nav bars: "Brake & Clutch" and "Testing Station",
  plus a small house icon that returns to the chooser (index.html).
- Real anchor links. Active segment marked with aria-current="page" and highlighted in the
  current side's accent (red on brake, green on RVTS, via var(--accent), no extra CSS).
- Switcher lives as the first child of .nav-links, so on desktop it sits inline and on
  mobile it drops into the existing slide-in menu at the top.
- Shared CSS added to styles.css (so both sites inherit; RVTS gets green automatically).
- Moved the mobile menu collapse breakpoint from 680px up to 920px so the switcher has
  room inline on desktop and tucks into the hamburger on tablet/mobile. The 680px block
  keeps the finer mobile rules (grid stacks, section padding, etc.). This applies to both
  sites and does not change the brake look above 920px.

Verification:
- Switcher present on brake-clutch.html and rvts.html; cross-links resolve both ways;
  home icon returns to the chooser. Active state correct per side.

Next: Phase 4 (dog mascot on both sites, not the chooser). STOP for approval first.
CONFIRM at Phase 4: keep the Santa hat on the supplied dog, or cut it.

## Phase 2 — RVTS site (DONE, approved)
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
