# Testkiki Landing Page — Experiment Sandbox

A standalone painted-door test site for Testkiki: a landing page plus a
profiling-survey → waitlist funnel that measures interest before the product
exists. There is no backend — waitlist submissions go to Formspree, and all
funnel state lives in the visitor's browser (sessionStorage).

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS v4 + CSS Modules · framer-motion

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build (all routes prerender statically)
```

> ⚠️ Don't run `npm run build` while the dev server is running — they share
> the `.next` directory and the build clobbers the dev server's assets
> (see Troubleshooting).

## How the funnel works

```
/  (landing page: headline + typewriter CTA; placeholder sections below the fold)
└─ /survey    profiling questions with conditional logic:
   │          Q1 household   [follow-up modal: kids count — only for kids/family answers]
   │          Q2 core pain   [option order randomized per session; "something else" pinned last]
   │          Q3 workaround  [follow-up modal: satisfaction 1–5 — always shown]
   │          Q4 household dynamic  [only shown if Q1 = partner/family]
   └─ /info   value-prop info card with the signup CTA
      └─ /waitlist  email capture (validated); POSTs email + all answers + UTM to Formspree
         └─ /thanks persistent "You're in" confirmation banner + one optional
                    post-signup question at a time (PQ1–PQ6) replacing itself in
                    place, with a counter and a quiet "Skip →" link; PQ3 only if
                    Q1 ≠ "Just me"
```

- **Answers** are stored in sessionStorage (`app/lib/funnelState.ts`) and
  cleared after a successful submission. Conditional question visibility and
  follow-up modal logic live in `app/lib/surveyLogic.ts`. Changing an earlier
  answer automatically purges any dependent answers that no longer apply.
- **Attribution:** `utm_source/medium/campaign/content/term` + `variant`
  query params are captured on the landing page and `/survey`
  (`app/lib/utm.ts`) and submitted with the answers, so responses can be
  cross-referenced with the ad/copy variant that brought the visitor in.
- **Guards:** `/info` and `/waitlist` redirect to `/` when deep-linked
  without survey answers; `/thanks` redirects to `/` when there's no signup
  snapshot, since its confirmation banner must never render without proof of
  a real signup.
- **Measurement:** funnel conversion can be read from Vercel Analytics page
  views per step (`/` → `/survey` → `/info` → `/waitlist` → `/thanks`).
  Event emission points (`trackEvent()` calls) are already wired throughout
  the funnel but currently no-op — server-side collection is the next build.
  See the Roadmap section below.

## Roadmap: server-side event tracking (not yet implemented)

**The need:** every page transition and every survey answer should be
recorded by a backend we control — not only in the visitor's browser.

**Why this matters:** the whole point of this test is learning, and the
current setup has a blind spot. Client-only analytics (Mixpanel's JS SDK,
Vercel Analytics, GA…) silently lose events when visitors reject cookies or
run ad/tracker blockers — exactly the kind of systematic data loss that
biases a test. And today, answers live only in sessionStorage until one
Formspree POST at the very end, so we only ever see **completers**; drop-off
between steps is invisible except through page views that suffer the same
client-side blind spots.

**Intended direction (sketch — decisions still open):** a first-party API
route (e.g. `/api/track`) called from the funnel pages, persisting each
event server-side — into our own database and/or forwarded to an analytics
tool's server-side ingestion API. Same-origin requests to our own domain are
not blocked the way third-party tracker scripts and cookies are. Open
decisions before building: storage backend, whether the waitlist submission
also moves through this route (so signups join to their event trail), and
the consent/anonymization posture.

If you're picking up this repo: please don't invest in additional
client-only tracking — this server-side path is the priority.

**Groundwork already in place** so the build is a one-file change:

- `app/lib/track.ts` exposes `trackEvent(name, props)` — currently a
  deliberate no-op (console.debug in dev). Every call site already exists
  (`grep trackEvent`); implementing the backend means replacing that one
  function body plus adding an ingestion route/store.
- Every event automatically carries an anonymous `session_id`
  (`getSessionId()` in `app/lib/funnelState.ts`, one per tab session) and
  the captured `utm_*`/`variant` params. The `session_id` is **already
  included in waitlist submissions**, so signups will join to their event
  trail from day one.

Event taxonomy:

| Event | Fires when | Properties (besides `session_id` + utm) |
|---|---|---|
| `page_view` | each funnel page mounts | `page` (`landing`/`survey`/`info`/`waitlist`/`thanks`) |
| `question_answered` | an answer is committed on Continue (follow-ups emit their own event) | `question_id`, `value` |
| `waitlist_submitted` | the Formspree POST succeeds | — |
| `post_signup_answered` | an optional PQ answer is saved on the confirmation page | `question_id`, `value` |
| `post_signup_skipped` | the user taps "Skip →" on a confirmation-page question | `question_id` |
| `post_signup_done` | the confirmation page's question block is completed (answered or skipped through) | — |

**Post-signup answers (PQ1–PQ6) are currently client-side only**: they live in
sessionStorage and flow through the no-op `trackEvent()` seam. The email
signup is the only server-persisted record today — wiring PQ answers to
storage is part of this backend build. (Formspree was deliberately not used
for them: it's append-only and quota-limited, and the backend will own this.)

## Repo map

```
app/
├── page.tsx                  Landing page
├── layout.tsx                Root layout: SEO metadata, fonts, analytics, JSON-LD
├── survey/ info/ waitlist/ thanks/  The funnel routes
├── components/
│   ├── <Section>/            One folder per LP section (tsx + CSS module)
│   ├── survey/               Funnel UI (SurveyPage, FunnelLayout, FollowUpModal…)
│   ├── ui/                   Primitives — LP: Button, Container · funnel: shadcn/ui ports
│   ├── UtmCapture.tsx        Captures utm_*/variant params into sessionStorage
│   ├── TrackPageView.tsx     Emits a page_view event on mount (see Roadmap)
│   └── OptimizedVideo.tsx    Autoplaying WebM+MP4 clip (eager/lazy, loop/play-once)
├── data/                     ★ ALL editable content lives here
│   ├── homeData.ts           LP copy (hero is live; sections below the fold are TODO)
│   ├── surveyData.ts         Survey questions, follow-up modals, info card copy
│   ├── navigationData.ts / footerData.ts
│   └── schema/               schema.org data (organization, product)
├── lib/
│   ├── funnelState.ts        sessionStorage answer store + anonymous session id
│   ├── surveyLogic.ts        Conditional visibility + follow-up trigger rules
│   ├── utm.ts                Attribution param capture
│   ├── track.ts              Event-emission seam — no-op until the backend exists (see Roadmap)
│   ├── submitWaitlist.ts     Builds the Formspree payload and POSTs it
│   └── generateSchema.ts     JSON-LD generators
├── hooks/ styles/
└── globals.css               Design tokens + the .funnel-theme scope (see Styling)
public/
└── assets/                   Optimized video clips (WebM + MP4 pairs, audio-free)
```

## Video clips

Three square (800×800) UI-animation clips live in `public/assets/` and are
rendered via `OptimizedVideo` (autoplay/muted/inline, WebM first with MP4
fallback, immutable cache headers via `next.config.js`). **Placement is
specced in `videoplacement.md`** — currently: LP hero (loop), info page
example slot (loop), waitlist above the heading (play once, hold last
frame). Re-encode recipe for future source changes
(see `video-asset-optimization-prd.md`):

```bash
ffmpeg -i input.mp4 -an -c:v libx264 -crf 28 -preset slow -movflags +faststart -pix_fmt yuv420p output.mp4
ffmpeg -i input.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0 output.webm
```

No poster frames are used (specs require no poster flash; the clips open
near-white so the neutral placeholder box is visually identical). If a
poster is ever wanted: `ffmpeg -i clip.mp4 -vframes 1 -q:v 8 poster.jpg`.

## Where to edit what

**Copy** — everything user-visible is in `app/data/*.ts` (remaining
placeholders are marked `TODO`). No component changes needed for text edits.

**Survey questions** — `app/data/surveyData.ts`. Add/remove entries in the
`SURVEY_QUESTIONS` array; the survey derives the flow automatically.
Per question:

- `showIf: { questionId, values }` shows the question only when an earlier
  answer matches — how Q4 is limited to partner/family households.
- `followUp: { id, title, options, showIf?: values }` opens a modal (drawer
  on mobile, dialog on desktop) when a triggering option is tapped; omit
  `showIf` to trigger on every option, like Q3's satisfaction scale. The
  follow-up answer is stored and submitted under its own id.
- `randomizeOptions: true` shuffles the option order once per session
  (`app/lib/optionOrder.ts`; stable across refresh/back); options with
  `pinned: true` keep their authored position — how Q2 avoids first-position
  bias while keeping "Honestly, something else" last.
- `tooltip: string` shows a tap-to-reveal info icon next to the question
  title (`QuestionTooltip`) — used on Q1 for a one-line aside that doesn't
  fit as a disclaimer.

The info page (`app/info/page.tsx`) is dynamic on the survey answers: its
headline/close line vary by the core-pain (Q2) answer
(`INFO_PAGE_BY_VP` in `surveyData.ts`, with `INFO_PAGE_FALLBACK` for an
unrecognized value), an optional contrast line varies by the workaround
(Q3) answer (`INFO_PAGE_CONTRAST_BY_WORKAROUND` — some answers intentionally
have none), and the example block is scoped to the household (Q1) answer.

**Post-signup questions** — `app/data/postSignupData.ts` (same option shape,
plus a `free-text` type). Shown on `/thanks` after a real signup; answers
save independently to sessionStorage (`app/lib/postSignupState.ts`) as
they're given and never block the confirmation.

The info card copy (headline, subhead, proof line, CTA) is the `INFO_CARD`
export in the same file.

**Submission payload** — built in `app/lib/submitWaitlist.ts`: one
`survey_<id>` field per question and per follow-up, containing the option
**label** (not the value). Every field is always present — empty string when
a question was skipped — so Formspree columns stay stable. Captured
`utm_*`/`variant` params are appended.

**SEO** — `app/layout.tsx` (title/description/OG/Twitter, still TODO) and
`app/data/schema/*.ts` (JSON-LD).

## Styling: two design systems

1. **Landing page** — tokens in `globals.css` + per-component CSS Modules.
   Poppins, brand blue `#4288A2`.
2. **Funnel** — scoped under the `.funnel-theme` class (defined in
   `globals.css`, applied by `FunnelLayout` and by portaled drawer/dialog
   content). Source Serif 4 headings, dark teal primary. Keeping the scope
   class on portaled content matters — drawers/dialogs render outside the
   page tree and lose the theme without it.

The cascade between the two is deliberate and commented in `globals.css`;
read those comments before moving rules in or out of `@layer base`.

## Configuration

`.env.local`:

- `NEXT_PUBLIC_FORMSPREE_FORM_ID` — **required for the waitlist to work in
  production.** Create a form at https://formspree.io and paste the ID (the
  part after `formspree.io/f/`). Restart the dev server after changing it —
  the value is inlined at build/dev-server start. In `npm run dev` without an
  ID, submissions simulate success (nothing is sent anywhere) so the whole
  flow — including the post-signup questions — is testable locally.

Vercel project settings:

- `NEXT_PUBLIC_BASE_URL` — the production domain; metadata and JSON-LD fall
  back to `https://example.com` without it.

## Before launching a live test

- [ ] Set `NEXT_PUBLIC_FORMSPREE_FORM_ID` (waitlist is disabled without it)
- [ ] Review the hero's typewriter example queries (`app/data/homeData.ts`)
- [ ] Replace the remaining `TODO` copy: below-the-fold LP sections,
      waitlist description, SEO metadata in `app/layout.tsx`
- [ ] Add `public/og-image.jpg` (1200×630) — referenced by OG/Twitter/schema
- [ ] Wire or remove the footer newsletter form (`Footer.tsx`, posts to `#`)
- [ ] Set `NEXT_PUBLIC_BASE_URL` in Vercel project settings
- [ ] Decide on indexing: for a quiet ad-only test, consider `noindex`

## Troubleshooting

**Page renders as unstyled HTML** (server 404s its own CSS/JS under
`/_next/static/`) — the dev server's compiled assets are gone. Two causes:

1. Running `npm run build` while `npm run dev` is serving — both use the
   same `.next` directory, and the build clobbers the dev assets. Don't
   build while the dev server is running.
2. A stale dev server holding port 3000 from a previous session.

Either way the fix is: kill whatever holds port 3000
(`lsof -nP -iTCP:3000 -sTCP:LISTEN`), `rm -rf .next`, restart `npm run dev`,
and hard-refresh the browser.
