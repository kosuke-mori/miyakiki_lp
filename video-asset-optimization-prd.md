# PRD: Optimized Video Assets for Survey Landing/Info Pages

## Problem
The three UI-animation clips used on the landing page and info page are exported at 1.3–1.6 MB each (~4.4 MB total), with unnecessary silent audio tracks and bitrates far higher than the content needs (flat-gradient backgrounds, simple text-bubble fade-ins). On mobile connections this delays or blocks first paint of the animation, hurting funnel conversion.

## Goal
Replace the current MP4 assets with re-encoded, audio-stripped versions in both WebM and MP4, served with proper fallback and lazy-loading, so each clip loads near-instantly without visible quality loss.

## Non-goals
- Re-designing or re-animating the content itself.
- Migrating to CSS/Lottie animation (noted as a future option, not in scope here).

## Assets
Optimized files already produced and ready to drop in (replace the current uploads):

| Clip (new filename) | Content | Old size | New size (mp4/webm) |
|---|---|---|---|
| `task-added-to-timeline` | "Gotta call mom next" → "Added it to your timeline!" | 1.6 MB | 68 KB / 57 KB |
| `upcoming-reminder-cards` | "Drinks with friends" + "Dentist appointment" cards | 1.3 MB | 92 KB / 110 KB |
| `vitamin-reminder-alarm-setup` | "I forget my vitamins every day" → alarm set for 08:00 | 1.6 MB | 79 KB / 76 KB |

If source files change in the future, re-encode with:
```
ffmpeg -i input.mp4 -an -c:v libx264 -crf 28 -preset slow -movflags +faststart -pix_fmt yuv420p output.mp4
ffmpeg -i input.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0 output.webm
```
(`-an` strips audio — confirmed silent/unused in current assets. Bump CRF down a few points if any visible softness is spotted; do not exceed ~1.5 Mbps effective bitrate for this content type.)

## Implementation requirements

1. **Markup**: use native `<video>`, not `<img>`/gif, with WebM first and MP4 fallback:
   ```html
   <video autoplay muted loop playsinline preload="auto" width="800" height="730">
     <source src="/assets/task-added-to-timeline.webm" type="video/webm">
     <source src="/assets/task-added-to-timeline.mp4" type="video/mp4">
   </video>
   ```
   - No `controls` attribute.
   - `muted` is required for autoplay to work cross-browser.
   - `playsinline` required for iOS Safari (prevents forced fullscreen).
   - Set explicit `width`/`height` (or `aspect-ratio` in CSS) to avoid layout shift while loading.

2. **Loading behavior**:
   - Above-the-fold clip (landing page hero): `preload="auto"`, load eagerly.
   - Any clip below the fold (info page sections): lazy-load — only attach `src`/start fetch when the element enters viewport (e.g. `IntersectionObserver`). Use a `poster` frame (static image, <20 KB) as placeholder until then.

3. **Fallback**: if a browser supports neither source (very old browsers), fall back to the poster image only — no broken player UI.

4. **Hosting**: serve from CDN/static asset host with proper cache headers (`Cache-Control: public, max-age=31536000, immutable`) since these are static, versioned assets.

## Acceptance criteria
- [ ] All three clips replaced with the optimized WebM + MP4 pair, audio-free.
- [ ] Total combined payload for visible clips on first paint stays under ~300 KB.
- [ ] No autoplay failures in Chrome, Safari (incl. iOS), Firefox, Edge — verify manually on at least one real iOS device.
- [ ] No layout shift (CLS) caused by video load — verify via Lighthouse.
- [ ] Below-fold clips confirmed to not fetch until scrolled into view (check network tab).
- [ ] Lighthouse mobile performance score on landing page does not regress vs. current baseline; ideally improves given ~95% asset size reduction.

## Open question for follow-up
Longer-term, consider replacing these with CSS/Lottie animations instead of video, since the content is simple UI text fades — would cut payload further and make copy/color changes trivial for A/B testing. Not required for this pass.
