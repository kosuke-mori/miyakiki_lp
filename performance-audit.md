# Performance & UX Inspection Report — Landing Page + Waitlist Funnel

**Date:** 2026-09-10
**Scope:** Full repo — LP (`/`) and funnel (`/survey` → `/info` → `/waitlist` → `/thanks`)
**Traffic assumption:** Paid social, predominantly mobile, low intent / low
attention. First paint speed and interaction smoothness are conversion-critical.
**Method:** Static analysis of the codebase + production build output +
inspection of the actual server-rendered HTML and network behavior on a
running instance. No Lighthouse run yet (see "Recommended follow-up
measurements").

---

## Verdict

The architecture is well-suited to this traffic profile — static pages,
small bundles, exceptionally well-optimized video, funnel prefetching —
**with one serious defect that undermines all of it: the entire
above-the-fold hero is server-rendered invisible and only appears after
JavaScript hydrates.** Fixing that one issue (P1, ~1 hour) plus two smaller
ones (P2 fonts, P3 metadata) makes this site genuinely good for paid
traffic. Without P1, expect measurably elevated bounce on slower mobile
connections.

---

## What is already good (no action needed)

| Area | Evidence |
|---|---|
| Delivery | All routes prerender statically (`○ Static` in build output) and serve from Vercel's CDN — fast TTFB globally. |
| JS weight | First Load JS: `/` ≈ 170 KB, funnel steps 108–135 KB. Moderate, not bloated. |
| Video | Clips are 50–135 KB (WebM + MP4, audio-stripped); only the hero clip loads eagerly; below-fold and funnel clips lazy-load via IntersectionObserver (verified: zero network activity until scroll); `aspect-ratio` boxes prevent CLS; assets get `Cache-Control: public, max-age=31536000, immutable`. |
| Funnel | Session state is client-side (sessionStorage); each step is a tiny static page; the next route is prefetched (`router.prefetch`) so transitions are instant; the only third-party network call in the entire funnel is the final Formspree POST. |
| Page weight | prd8 removed five below-fold sections; the LP renders Nav → Hero → How It Works → Testimonials → mechanic block → minimal footer. |
| Third parties | Only Vercel Analytics + Speed Insights (lightweight, same vendor as hosting). No tag managers, no chat widgets. |

---

## Findings, prioritized

### P1 (serious) — Above-the-fold content is invisible until JS hydrates

**Evidence** (from the served HTML of `/`):

```html
<h1 style="...;opacity:0;filter:blur(10px);transform:translateY(30px)">
```

The eyebrow, headline, subhead, hero video block, and the primary Continue
CTA are all wrapped in framer-motion components with `initial="hidden"`,
which server-renders them at `opacity: 0` + blur. Nothing above the fold is
visible until the full JS bundle (~170 KB) downloads, parses, hydrates, and
the entrance animation plays. On a mid-range Android over 4G this is
realistically **1.5–3 s of blank hero** — the exact window in which a
low-intent paid visitor bounces. It also destroys the LCP metric (the LCP
element is JS-gated) and means the page is blank with JS disabled/failed.

**Fix (recommended):** Replace the hero's framer-motion wrappers
(`app/page.tsx`, the four `motion.*` elements in the hero section) with
plain elements animated by a small CSS keyframe (e.g. `heroFadeUp`,
0.4–0.5 s, staggered via `animation-delay`, defined once in `globals.css`).
CSS animations start on first paint with **zero JS**, so content is visible
immediately while keeping the entrance polish. Wrap in
`@media (prefers-reduced-motion: reduce)` to disable. Keep framer-motion for
the below-fold `whileInView` reveals (TestimonialCards, ImageWithThreeSteps)
— by scroll time JS is loaded, so those are fine as-is.

**Effort:** ~1 hour. **Acceptance:** served HTML for `/` contains no
`opacity:0` on hero elements; hero text is readable with JS disabled
(`curl` the page and check, or DevTools → disable JS).

### P2 (moderate) — Render-blocking third-party fonts, oversized font payload

**Evidence:** `app/layout.tsx` loads two Google Fonts stylesheets via
`<link rel="stylesheet">` (render-blocking, two extra origins —
`fonts.googleapis.com` + `fonts.gstatic.com` — on the critical path):
- Poppins at weights 300/400/500/600/700 — **the code uses only
  400/500/600** (grep of `font-weight` across `app/`); 300 and 700 are
  dead weight.
- Source Serif 4 with the full variable range
  (`ital,opsz,wght@0,8..60,200..900;1,...`) — used only for funnel headings
  and a few `.funnel-theme` styles; italics never used.

**Fix:** Switch to `next/font/google` (Poppins `['400','500','600']`,
Source Serif 4 `400..600` upright only, `display: 'swap'`), expose as CSS
variables, and reference those variables where `"Poppins"` /
`"Source Serif 4"` appear in `globals.css` / `typography.css`. Fonts then
self-host from the same origin with automatic preloading — typically
100–300 ms faster first render on mobile, and no third-party font origins.

**Effort:** ~1–2 hours (mostly find/replace of font-family references).
**Acceptance:** no `fonts.googleapis.com` in the served HTML; font files
load same-origin; Poppins 300/700 absent from the network tab.

### P3 (small) — Meta description is a TODO

**Evidence:** served HTML: `<meta name="description" content="TODO: one or
two sentence description of Testkiki.">` (same in openGraph and twitter
blocks). Ad platforms and social shares scrape this.

**Fix:** `app/layout.tsx` — set all three description fields to the live
positioning copy (e.g. derived from the hero headline + subhead). Pure copy
change. **Effort:** minutes.

### P4 (small, needs an asset) — OG image referenced but missing

**Evidence:** metadata points OG/Twitter images at `/og-image.jpg`;
`public/og-image.jpg` **does not exist** → link shares render a broken/blank
preview.

**Fix:** either drop a real 1200×630 image into `public/og-image.jpg`, or
remove the image entries from metadata until one exists. Needs a design
asset; not something engineering can conjure.

### Informational (no action recommended now)

- Below-fold sections also SSR at `opacity: 0` (`whileInView` reveals).
  Acceptable: JS has loaded by the time anyone scrolls there. Revisit only
  if SEO of below-fold content starts to matter.
- framer-motion (~30 KB gz) stays in the LP bundle even after P1 because the
  below-fold reveals use it. Removing it entirely is possible (CSS +
  IntersectionObserver) but is medium effort for a small win — not
  low-hanging.
- `/thanks` and the survey pages are lean and fine as-is.
- Known dev-only quirks (do not "fix" in prod code): React StrictMode
  double-fires tracking `console.debug`s in dev; the dev server 404s its own
  assets if `next build` runs while it's serving (documented in README
  troubleshooting).

---

## Recommended follow-up measurements (post-fix)

1. Lighthouse mobile run on the production URL, before/after P1+P2 —
   expect LCP to move from "poor" (JS-gated) to sub-2.5 s.
2. One real-device pass on iOS Safari (video autoplay + the fixed mobile
   nav + font swap behavior).
3. Vercel Speed Insights (already integrated) will trend real-user LCP/CLS
   once traffic flows — watch LCP on `/` specifically.

## Context for prioritization

The funnel converts only if the first screen renders instantly for a
skeptical, thumb-scrolling visitor. P1 is the only finding that directly
threatens that; P2 compounds it on slow connections; P3/P4 affect the ad
click-through side rather than on-site speed. Everything else measured is
already in good shape.
