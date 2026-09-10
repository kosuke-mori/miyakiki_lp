# /thanks Step — Copy & UX PRD

**Scope:** This document covers the single screen shown immediately after a successful email submission ("Join the Beta"). Copy and user experience only — no implementation or visual design direction. It supersedes Section 6 of the main Painted Door Test PRD.

**Purpose of this screen (two jobs, in priority order):**
1. Confirm, unmistakably, that the signup is complete. Nothing on this screen may make the user doubt that.
2. Keep the user taking action by presenting the first optional post-signup question directly, rather than describing that questions exist.

**Design principle:** Confirmation is a reassurance, not a destination. It should be seen at a glance and then step aside. The visual and attentional weight of the screen belongs to the first question.

---

## 1. Preconditions

- The user's email is already saved the moment they tap "Join the Beta." This screen must never render before that save has succeeded. The confirmation banner states a fact; the fact must be true when it appears.
- Every answer collected on this screen is saved independently and immediately when tapped, associated with the same session/email and with the ad/value prop the user originally arrived on. Leaving at any point loses nothing already answered.
- All questions on this screen are optional. None of them gate, delay, or affect the signup.

---

## 2. Screen structure (top to bottom)

```
[ Confirmation banner — persistent, never changes ]
[ Question card — replaces its own contents in place as the user answers ]
```

There is no page navigation. The user stays on this one screen throughout. Only the contents of the question card change.

---

## 3. Confirmation banner

Compact. Sits above the question card and remains visible and unchanged for the entire time the user is on this screen.

**Copy:**
> ✓ **You're in.** We'll email you when early access opens.

**Copy rules:**
- Past tense / completed state only ("You're in," not "You're almost in" or "Confirming…"). The user must not read any pending or conditional state into it.
- No call to action inside the banner. It does nothing and asks for nothing.

---

## 4. Question card

The card is the primary element on the screen. It shows exactly one question at a time. Answering advances to the next question in place; the banner above does not move or change.

### 4.1 Card anatomy (identical for every question)

**Eyebrow (small, above the question):**
> ONE MORE THING · OPTIONAL

**Counter (muted, beside or below the eyebrow):**
> 1 of 6

The counter updates with each question. The total shown should reflect the number of questions this specific user will actually see (see conditional logic in 4.2) — e.g., a solo user who will not see PQ3 sees "1 of 5."

**The question is the headline of the card.** No separate title above it.

**Answer options** are presented as tappable rows/choices. A single tap both records the answer and advances to the next question. No separate "Next" or "Submit" action.

**Skip affordance (below the options):**
> Skip →

This is a quiet text link, not a button. It must not visually compete with the answer options. Tapping it advances to the next question without recording an answer. It is present on every question, including the last.

### 4.2 The questions, in order

Order is deliberate: the most valuable questions come first (response rates decline through the block even when everything is optional), the open-text question is second-to-last after the user has warmed up on easy taps, and the biggest ask is last.

---

**PQ1 — What did you picture** *(single-select)*
> When you read that headline, what did you picture this being?
> - A chat I just text things to, and it organizes them for me
> - A to-do app with smarter features
> - A shared family calendar or organizer
> - An AI assistant that remembers everything about my family
> - Honestly not sure — the headline just hit

Shown to everyone. Always first.

---

**PQ2 — Last time it actually happened** *(single-select)*
> Think of the last time this was a real problem for you. What did you actually do?
> - Figured it out myself, eventually
> - Asked my partner, a family member, or a friend
> - Tried an app or tool to help
> - Honestly, it just fell through the cracks

Shown to everyone.

---

**PQ3 — Who else has to use it** *(single-select; conditional)*
> For this to actually work for you, would it need to…
> - Work just for me — I'm the one organizing everyone anyway
> - Be something my partner uses too
> - Be something the whole family uses, kids included

**Condition:** shown only if the user's answer to Q1 in the pre-signup flow was anything other than "Just me." Solo users skip this question entirely and never see it (and their counter total is reduced accordingly).

---

**PQ4 — Why nothing has stuck** *(single-select)*
> What's the main reason things you've tried haven't stuck?
> - Too much setup or upkeep
> - I forget to actually use it
> - Other people in my household wouldn't use it
> - It didn't fit how I actually think
> - I haven't really tried anything

Shown to everyone.

---

**PQ5 — Open text**
> In your own words — what do you hope this does for you?

Free text. No minimum length. No placeholder text beyond a neutral field. Because there is no single-tap answer, this question needs an explicit submit action:

**Submit button copy:**
> Send

The Skip link remains available below it.

---

**PQ6 — Interview opt-in** *(single-select; always last)*
> Would you be open to a 20-minute chat with our team as we build this? Beta members who chat with us get first access.
> - Yes, happy to
> - Maybe later
> - No thanks

Shown to everyone. Always the final question.

---

## 5. Closing state

Reached when the user answers or skips the final question. The banner remains. The question card's contents are replaced with:

> **That's everything — thank you.**
> Keep an eye on your inbox.

No further action is offered or required. If the existing scaffolding expects a dismiss/close affordance here, a quiet one is acceptable, but nothing on this final state should look like a next step.

---

## 6. Behavioral rules (summary for the agent)

- One question visible at a time; answering or skipping replaces the card contents in place. No page changes.
- Confirmation banner is persistent and unchanging for the whole screen.
- Every answer saves on tap. Skipping records no answer and advances. Closing the tab at any point is a valid exit; the signup is unaffected.
- The counter shows the real number of questions this user will see, accounting for the PQ3 condition.
- The Skip affordance is a text link on every question. It is never a primary button.
- Nothing on this screen — no copy, no control, no state — may imply that answering is required to complete the signup.

---

## 7. What changed versus the previous /thanks design

For context, so the intent is clear:

- **Removed** the "Done — skip the questions" label and "Continue" button. The pairing was ambiguous (Continue could mean "go to the questions" or "leave"), and it required the user to make a decision before seeing any question.
- **Removed** the large "You're in!" headline as the dominant element. It is now a compact banner.
- **Removed** the standalone framing line ("While you're here — a few optional questions…"). Its job is now done by the eyebrow ("ONE MORE THING · OPTIONAL") and by the question itself being visible.
- **Added** a per-user counter. The previous PRD said "no progress bar"; in an in-place design with no visible end, the absence of a count is what makes the block feel like a trap. A muted counter makes the end visible and lowers the perceived cost of starting.
- **PQ1 now appears directly on the screen** rather than behind a button. The action the user takes is answering the question, not choosing whether to start.