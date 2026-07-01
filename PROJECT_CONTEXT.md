# Richmond Brake & Clutch + RVTS — Project Context

## Overview
One operation, two front doors, run by Barry Andrews out of 13 McGlashen Ave, Richmond 7020.
This repo (richmond-brake-clutch-demo, Vercel static HTML) is being turned into two themed
micro-sites behind a chooser landing, with a nav switcher on each side and a scroll-triggered
dog mascot in the bottom-left of both.

## The two businesses
| | Brake & Clutch (repairs) | RVTS (testing) |
|---|---|---|
| Focus | Brakes, clutches, hydraulics, disc machining, diagnostics, WOF | WOF, prechecks, inspections, brakes & suspension, tyres & steering, lights & mechanical |
| Phone | 03 544 1660 | 03 544 9111 |
| Look | Dark / steel (existing) | Green + black metal |
| Reviews | 4.8, 22 Google reviews | 4.8, 43 Google reviews |
| Tagline | "Brakes & clutches done right, the first time." | "Safe vehicles. Safe roads. Peace of mind." |
| Email | office@richmondvts.co.nz (shared) | office@richmondvts.co.nz (shared) |

## Target file structure
```
/index.html            chooser landing (shown every visit)      [Phase 1]
/brake-clutch.html     current site content, moved here          [Phase 0 DONE]
/rvts.html             new RVTS site                             [Phase 2]
/review.html           existing funnel, made brand-aware         [Phase 5]
/terms.html /privacy.html   shared
/assets/css/base.css   shared tokens, layout, dog, switcher      [as needed]
/assets/css/brake.css  dark / steel theme
/assets/css/rvts.css   green / black theme
/assets/js/chooser.js  panel hover + navigation
/assets/js/switcher.js nav toggle behaviour
/assets/js/dog.js      scroll-triggered mascot
/assets/img/dog.png    transparent cutout of the mascot
/assets/img/rvts-logo  from signage
```
NOTE: current CSS is a single external styles.css (not inline). Split into base/brake/rvts
deferred until RVTS theme is built (Phase 2), per Phase 0 rule ("if external, just reference").

## Standing rules
- No em dashes anywhere. Use commas, periods or parentheses.
- Never delete index. Backup kept at index.backup.html. No irreversible actions without approval.
- Match existing CSS token/class patterns. Do not reinvent the design system.
- Reuse StaticForms key sf_768da8d33927e7f4f241d0a6 for RVTS enquiry form.
- Mobile first, test 375px and 390px. Chooser and dog must behave on small screens.
- Respect prefers-reduced-motion for chooser hover, switcher, dog animation.
- Chooser shows on every visit. No localStorage, no remembered choice.
- Update HANDOVER.md and PROJECT_CONTEXT.md after each approved phase.

## Items still to confirm (defaults in use so build can run)
- Dog name: placeholder DOG_NAME.
- Dog speech bubble copy: default ON, dismissible. Brake: "Car making a noise? Book it in."
  RVTS: "WOF due? We can fit you in."
- Santa hat: default is to remove it (year round mascot).
- RVTS opening hours: placeholder Mon to Fri 8am to 5pm.
- RVTS Google review link: placeholder in funnel.
- Brake & Clutch Google review link: confirm for Phase 5.
- Dog mascot source image: not yet supplied (blocks Phase 4 asset).
- RVTS logo asset: not yet supplied (text logo fallback until then).
- Stack stays static HTML (confirm if moving to Next later).

## Deploy
Vercel project richmond-brake--clutch-demo (scope scaled-solutions), static.
Deploy via: vercel build --prod --yes && vercel deploy --prebuilt --prod
Live: https://richmond-brake-clutch-demo.vercel.app
