# Parked landing-page sections

Removed from LP on 2026-09-10 for the painted door test. Retained
intentionally for future reuse. **Do not delete.**

| Component | What it does |
|---|---|
| `ComparisonTableSection/` | Dark comparison table: Testkiki vs Alternative A / B, per-feature yes/partial/no icons |
| `TrustedByLogos/` | "Trusted by teams like yours" logo bar (renders text placeholders when logo `src` is empty) |
| `ValuePropCards/` | Capabilities three-card grid with a highlighted third (badges) card |
| `StatsGrid/` | Three number tiles ("RESULTS" stats, one featured) |
| `FAQSectionDark/` | "Your questions, answered" dark accordion |

Their section data still lives in `app/data/homeData.ts`
(`comparisonData`, `logoStripData`, `featureCardsData`, `statsGridData`,
`faqData`) — unused but kept so re-mounting is a pure `page.tsx` change.

**FAQ note:** `FAQSectionDark` shipped together with FAQ JSON-LD structured
data in `app/page.tsx` (built via `generateFAQSchema` from
`app/lib/generateSchema.ts`). That schema was removed along with the
section — Google requires FAQ structured data to match visible page
content. If this section returns, restore the schema **in the same change**,
never separately.
