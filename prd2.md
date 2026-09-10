Painted Door Test — Copy & UX PRD

Scope: This document covers copy and user experience/flow only. No implementation or visual design direction included — existing LP/survey scaffolding should be used as-is.

1. Flow overview
Ad Click → Landing Page → Q1 → (Modal: kids count, conditional) → Q2 → Q3 → (Modal: satisfaction, always) → Q4 (conditional) → Info Card → CTA → Email Capture → Confirmation

2. Landing Page

Headline:

Stop holding every unfinished task inside your head.

No further LP copy specified at this stage — headline stands alone. Primary action leads into Q1.

3. Profiling Questions
Q1 — Household situation

Prompt: "Who are you keeping track of?"

Options (single-select):

Just me
Me + my partner
Me + kids
The whole family (partner + kids)

Conditional follow-up modal: Triggered only if the user selects "Me + kids" or "The whole family (partner + kids)."

Modal prompt: "How many kids?" Options (single-select): 1 / 2 / 3 / 4 or more

After modal selection (or immediately, if no modal triggered), proceed to Q2.

Q2 — Core pain

Prompt: "Which of these is hardest to stay on top of right now?"

Options (single-select, randomize order except the last option, which is always pinned last):

Turning scattered thoughts and messages into an actual to-do list (maps to vp1)
Knowing what actually matters most today (vp2)
Keeping track of everyone else's stuff, not just my own (vp3)
Remembering all the little details — appointments, allergies, deadlines — when I need them (vp4)
Knowing what my partner is already handling (vp5)
Honestly, something else (always shown last; a high rate on this option is itself a key finding — it signals the value-prop set is missing the market)

Note: This is the primary segmentation question for the whole test (attraction-accuracy analysis: does the clicker's real pain match the ad's value prop?). Option order randomization matters here to avoid first-position bias inflating any one value prop.

Q2 option order must be randomized per session (with "Honestly, something else" always pinned last). All other questions keep fixed option order.

No follow-up modal. Proceed directly to Q3.

Q3 — Current workaround

Prompt: "How are you managing this today?"

Options (single-select):

Notes app / sticky notes
Shared calendar or app
Mostly just my memory
A mix of everything, and it's chaos

Follow-up modal (always shown, regardless of answer):

Modal prompt: "How satisfied are you with this approach?" Scale (single-select, 5 points): 5 – Very satisfied / 4 / 3 / 2 / 1 – Not satisfied at all

After modal, proceed to Q4 if condition met, otherwise skip to Info Card.

Q4 — Household dynamic (conditional)

Shown only if Q1 = "Me + partner" or "The whole family (partner + kids)." Skipped entirely for "Just me" or "Me + kids."

Prompt: "Do you tend to be the one everyone relies on to remember things, or more backup?"

Options (single-select):

I'm usually the one tracking it
Pretty split between us
My partner tracks most of it

After Q4 (or after Q3's modal, if Q4 is skipped), proceed to Info Card.

4. Info Card

Shown to all users regardless of profiling answers (single value prop for this test).

Headline (pain):

Stop holding every unfinished task inside your head.

Subhead (functional):

Turn a messy chat into a clear to-do list — no organizing required.

Proof line (emotional/example):

Say school forms, groceries, appointments — and watch them get organized.

CTA button:

Sign Up as Early Beta Member

5. Email Capture Step

Appears when the user taps the Info Card CTA. This is a real signup — copy should read as genuine, not as a placeholder or dead end.

Field label:

Email address

Field placeholder:

you@email.com

Trust/consent microcopy (shown below the field):

We'll only email you about early access — no spam, unsubscribe anytime.

Submit button:

Join the Beta Waitlist

Error state — invalid email format:

That doesn't look like a valid email — mind double-checking?

Error state — generic/network failure:

Something went wrong on our end. Please try again in a moment.

6. Confirmation State + Post-Signup Optional Questions

Shown immediately after successful email submission. The conversion is already banked at this point — everything below is optional bonus data collection. Drop-off here costs nothing.

Headline:

You're in!

Framing line (important — explicitly label the block as optional):

While you're here — a few optional questions to help us build this right. Skip any of them.

Block behavior (UX rules):

Every question is individually skippable; each answer saves independently, so leaving mid-block loses nothing already answered.
No progress bar, no gating between questions.
A persistent "Done" affordance is available at all times so the block never feels like a trap.
Order below is deliberate: easiest single-tap questions first, open text second-to-last, the biggest ask (interview) last.

PQ1 — What did you picture? (multi-select; most important question in the block, so it goes first)

"When you read that headline, what did you picture this being?"

A chat I just text things to, and it organizes them for me
A to-do app with smarter features
A shared family calendar or organizer
An AI assistant that remembers everything about my family
Honestly not sure — the headline just hit

Feeds: expectation-gap analysis. Cross-tab against the value prop the user arrived on to detect signups for a product we aren't building.

PQ2 — Last time it actually happened (single-select)

"Think of the last time this was a real problem for you. What did you actually do?"

Figured it out myself, eventually
Asked my partner, a family member, or a friend
Tried an app or tool to help
Honestly, it just fell through the cracks

Feeds: three things at once — (1) the real competitive set (a person, an app, or nothing), (2) consequence severity ("fell through the cracks" signals a stronger unmet need than "figured it out myself"), and (3), cross-tabbed against value prop, which segment has the least existing coping mechanism — typically the best early-adopter target. This question asks about a real past instance rather than a hypothetical, deliberately avoiding self-reported prediction, same reasoning that ruled out willingness-to-pay.

PQ3 — Who else has to use it? (single-select; shown only if Q1 ≠ "Just me")

"For this to actually work for you, would it need to…"

Work just for me — I'm the one organizing everyone anyway
Be something my partner uses too
Be something the whole family uses, kids included

Feeds: single-player vs. multiplayer product decision. Especially load-bearing for vp3 and vp5 signups.

PQ4 — Why nothing has stuck (multi-select)

"What's the main reason things you've tried haven't stuck?"

Too much setup or upkeep
I forget to actually use it
Other people in my household wouldn't use it
It didn't fit how I actually think
I haven't really tried anything

Feeds: product requirements and anti-patterns (e.g., proactive nudging vs. zero-input capture).

PQ5 — Open text

"In your own words — what do you hope this does for you?" (Free text, optional, no minimum length.)

Feeds: next-round ad copy in the audience's own vocabulary.

PQ6 — Interview opt-in (single-select; always the final question)

"Would you be open to a 20-minute chat with our team as we build this? Beta members who chat with us get first access."

Yes, happy to
Maybe later
No thanks

Feeds: discovery-interview pipeline. Requires a named owner to follow up within ~1–2 weeks of signup.

Closing state (after the block, or whenever the user taps Done):

Thank you! You're on the list — we'll email you as soon as early access opens.

7. Notes for the agent
All questions are single-select unless stated otherwise.
Modals interrupt the flow only where specified (Q1 kids-count, Q3 satisfaction) — both are lightweight, single-tap follow-ups.
Every profiling answer should be captured and associated with the session, so responses can later be cross-referenced with which ad/copy variant brought the user in.
No other LP copy, profiling copy, or info card copy is in scope for this version — only what's listed above.
The product name shown in current mockups is a placeholder and will change before launch. Nothing in this PRD's copy references it directly, so no copy changes are needed when the rename happens — only the logo/wordmark asset.
Profiling questions are mandatory; there is no "skip" path from the survey directly to the info card or signup. This is intentional: the test's purpose is learning about segments, not maximizing signup volume, so every conversion needs to carry segment data.
Email capture is real — submissions should be stored and are expected to receive an actual follow-up communication later, not just logged silently.

Post-signup questions (PQ1–PQ6) are strictly optional and must never block or delay the confirmation of a successful signup. Each answer should be saved as it's given, associated with the same session/email and with the ad/value prop the user arrived on.
PQ3 is shown only when Q1 ≠ "Just me" (same condition logic as Q4).