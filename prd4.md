# PRD — Painted Door Test: Funnel Copy & Flow

**Scope:** Copy and flow only. No implementation detail, no visual design direction. Existing LP and survey scaffolding is used as-is. Where a screen or element does not exist in the scaffolding, it is called out under *New components* with guidance.

---

## 1. Test goal

Validate demand for a chat-based assistant that remembers household tasks and reduces the "mental load" carried by one person in a family, before a full product exists.

**Conversion event:** email submitted on the waitlist step.
**Primary learning:** which value proposition (vp1–vp5) drives conversion, and whether the pain a user *states* (Q2) matches the pain the *ad* promised.

---

## 2. Funnel

```
Paid ad (vp1–vp5)
  → Landing page (shared)
  → Q1  Who are you keeping track of?
  → Q2  Which of these is hardest to stay on top of right now?
  → Q3  How are you managing this today?
  → Info page (dynamic on Q2; optional slots on Q1, Q3)
  → Email capture
```

Every CTA button in the flow reads **Continue**.

---

## 3. Screen copy

### 3.1 Landing page (existing scaffolding)

| Slot | Copy | Behavior |
|---|---|---|
| Eyebrow | Chaos, coordinated. | Fixed |
| Headline | 
| Subhead | Say it however it comes out. Reminders, plans, things people asked you to do — I'll hold onto it. | Fixed |
| CTA | Continue | Fixed |
| Below fold — line 1 | Just type the way you'd text a friend. No right way to say it. | Fixed |
| Below fold — line 2 | You say it. I keep track. Nothing slips. | Fixed |
| Below fold — CTA | Continue | Fixed |

Note: On the next prd, we'll work on implimeinting Dynamic headline per ad: Headline uses the ad line verbatim for 
message match. It is out of scope for this PRD.

### 3.2 Q1 — Who are you keeping track of? (existing scaffolding)

| Slot | Copy |
|---|---|
| Subtext | Be a mom, a daughter, a partner. I'll be the coordinator. |
| Tooltip (new component, see §4) | You can add/remove people anytime. |

Options unchanged: 

### 3.3 Q2 — Which of these is hardest to stay on top of right now? (existing scaffolding)

| Slot | Copy |
|---|---|
| Subtext | Pick the one that stings most right now. |

Options unchanged. 

### 3.4 Q3 — How are you managing this today? (existing scaffolding)

| Slot | Copy |
|---|---|
| Subtext | No judgment. Sticky notes count. |

Options TBD by team. Each option should map to one contrast line for the optional info-page slot (see §3.5).

### 3.5 Info page (maybe new component, see §4)

One screen. Headline and close line vary by Q2. Middle is fixed, with two optional dynamic slots.

**Dynamic by Q2:**

| Q2 answer | Headline | Close line |
|---|---|---|
| Everyone else's stuff, not just my own | Everyone's counting on you to remember. I'll take it from here. | Spend less time managing their lives and more time living yours. |
| All the little details | Remembering everything is a full-time job you didn't apply for. | It remembers your son's egg allergy when you ask for a restaurant recommendation. |
| Scattered thoughts into a to-do list | Stop holding every unfinished task inside your head. | Say it however it comes out. I'll hold onto it. |
| What my partner is already handling | Understand what your partner is carrying before they have to ask. | Not your calendar. Your chief of staff for the life together. |
| What actually matters most today | Stop starting each morning unsure what matters most. | Wake up knowing exactly what you need to do today. |
| Honestly, something else | Chaos, coordinated. | Stop holding the world together in your head. I'll hold it for you. |

**Fixed middle, in order:**

1. Example block — one messy message in, one grouped list out. *Optional Q1 slot:* scope the example to the household selected (a "Just me" user does not see kids or a parent).
2. Caption: Reminders, plans, things people asked you to do.
3. *Optional Q3 slot:* one contrast line against the user's current method.

| Q3 answer (indicative) | Contrast line |
|---|---|
| Calendar / shared calendar | Not your calendar. Your chief of staff for the life together. |
| Planner / notes app | Traditional planners were made for people who aren't like you. |
| My head / I just remember | Stop holding every unfinished task inside your head. |
| Partner reminds me | Understand what your partner is carrying before they have to ask. |

4. Close line (from table above)
5. CTA: Sign Up as Early Beta Member

**Fallback if the info page cannot vary:** Headline *Chaos, coordinated.* — body *Stop holding every unfinished task inside your head.* — fixed middle — no close line — Continue.

### Email capture (maybe new component? i don't no, if so see §4)

| Slot | Copy |
|---|---|
| Heading | Join the waitlist |
| sub | Stop holding every unfinished task inside your head. | 
| Field | Email |
| Supporting line | We'll only email you about early access - no spam, unsubscribe anytime. |
| CTA | Join the Beta Waitlist |

---

## 4. New components (not in scaffolding)

Guidance is limited to what the component must do; visual treatment is the design team's call.

**Q1 tooltip**
Purpose: answer the practical hesitation a "who" question creates (do I have to decide the whole household now?) without adding a disclaimer under the question.
Requirements: an info affordance next to the question text; reveals one line on tap/hover; dismisses on tap-away; does not block option selection; mobile-first.

**Info page**
Purpose: pay off the thin LP. This is the only screen that explains the product concretely before asking for an email.
Requirements: single screen, no scroll dependency for the CTA on mobile; supports one dynamic headline and one dynamic close line keyed on Q2; example block with room for 3–4 grouped items; two optional dynamic text slots (Q1-scoped example, Q3 contrast line). If dynamic slots are out of scope, ship the fallback in §3.5.

**Email capture**
Purpose: the conversion event.
Requirements: single email field; inline validation; one supporting line below the field; success state confirms the email was received (copy TBD, first-person voice); no additional fields.

---

---