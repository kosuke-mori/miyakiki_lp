**Landing page — remove five sections, preserve components**

Remove the following sections from the rendered landing page, in both mobile and desktop views:

1. Comparison (dark table: Testkiki vs Alternative A / B)
2. Trusted by ("Trusted by teams like yours" logo bar)
3. Capabilities (three-card grid with highlighted third card)
4. Stats (three number tiles)
5. FAQ ("Your questions, answered" accordion)
6. Minimize the footer. only product name, copyright sentence, and placeholder link to privacy policy and terms and gondition.

Do not delete the components. They are being retained intentionally for future reuse. Use one of the two approaches below — pick whichever fits how the project is already structured, and tell me which you chose.

Option A — feature flag (preferred if a flag/config pattern already exists)
Keep the five sections in the page but behind a flag that is off by default. They should remain part of the build so they don't break as shared components and tokens change. Re-enabling any section should be a single toggle.

Option B — parked folder (if no flag pattern exists)
Unmount the five components from the page and move their files, unmodified, into a clearly named folder alongside the active sections (e.g. parked/). Add a README in that folder listing each component with one line on what it does and this note:
Removed from LP on [date] for the painted door test. Retained intentionally for future reuse. Do not delete.

In either case:

Remove any nav links or in-page anchors that pointed to the removed sections (e.g. the "FAQ" nav item).
Confirm the page renders cleanly with the remaining sections in this order: Nav → Hero → How It Works → Testimonials → mechanic lines + typewriter field → Footer.
No changes to the retained sections or their content.
- Add a short README in that folder listing each component, one line on what it does, and the note: *Removed from LP on [date] for the painted door test. Retained intentionally for future reuse. Do not delete.*
- Remove any nav links or in-page anchors that pointed to these sections (e.g. the "FAQ" nav item).
- Confirm the page still renders cleanly with the remaining sections in this order: Nav → Hero → How It Works → Testimonials → mechanic lines + typewriter field → Footer.

No changes to the retained sections or their content.