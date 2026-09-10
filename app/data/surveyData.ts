import type { SurveyQuestion } from '@/app/components/survey/types'

// Survey questions for the painted-door test funnel (see prd1).
// Adding/removing a question = editing this array; the survey page derives
// the flow from it, including per-question `showIf` visibility and modal
// `followUp` questions. Answers are keyed by question/follow-up id and sent
// to Formspree as `survey_<id>` fields alongside the waitlist email.
export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'household',
    title: 'Who are you keeping track of?',
    description: "Be a mom, a daughter, a partner. I'll be the coordinator.",
    optionsFootnote: 'You can change later',
    type: 'single-select',
    required: true,
    options: [
      { id: 'just-me', label: 'Just me', value: 'just-me' },
      { id: 'me-partner', label: 'Me + my partner', value: 'me-partner' },
      { id: 'me-kids', label: 'Me + kids', value: 'me-kids' },
      { id: 'whole-family', label: 'The whole family (partner + kids)', value: 'whole-family' }
    ],
    followUp: {
      id: 'kids-count',
      title: 'How many kids?',
      showIf: ['me-kids', 'whole-family'],
      options: [
        { id: 'kids-1', label: '1', value: '1' },
        { id: 'kids-2', label: '2', value: '2' },
        { id: 'kids-3', label: '3', value: '3' },
        { id: 'kids-4-plus', label: '4 or more', value: '4-plus' }
      ]
    }
  },
  {
    // Primary segmentation question: option order is randomized per session
    // (attraction-accuracy analysis; avoids first-position bias) with
    // "Honestly, something else" always pinned last. Values vp1–vp5 map to
    // the ad value props for cross-tabbing against the arrival `variant`.
    id: 'core-pain',
    title: 'Which of these is hardest to stay on top of right now?',
    description: 'Pick the one that stings most right now.',
    type: 'single-select',
    required: true,
    randomizeOptions: true,
    options: [
      {
        id: 'vp1',
        label: 'Turning scattered thoughts and messages into an actual to-do list',
        value: 'vp1'
      },
      {
        id: 'vp2',
        label: 'Knowing what actually matters most today',
        value: 'vp2'
      },
      {
        id: 'vp3',
        label: "Keeping track of everyone else's stuff, not just my own",
        value: 'vp3'
      },
      {
        id: 'vp4',
        label: 'Remembering all the little details — appointments, allergies, deadlines — when I need them',
        value: 'vp4'
      },
      {
        id: 'vp5',
        label: 'Knowing what my partner is already handling',
        value: 'vp5'
      },
      {
        id: 'something-else',
        label: 'Honestly, something else',
        value: 'something-else',
        pinned: true
      }
    ]
  },
  {
    id: 'workaround',
    title: 'How are you managing this today?',
    description: 'No judgment. Sticky notes count.',
    type: 'single-select',
    required: true,
    options: [
      { id: 'notes-app', label: 'Notes app / sticky notes', value: 'notes-app' },
      { id: 'shared-calendar', label: 'Shared calendar or app', value: 'shared-calendar' },
      { id: 'memory', label: 'Mostly just my memory', value: 'memory' },
      { id: 'chaos-mix', label: "A mix of everything, and it's chaos", value: 'chaos-mix' },
      { id: 'partner-reminds', label: 'Partner reminds me', value: 'partner-reminds' }
    ],
    // No showIf: the satisfaction modal is always shown after selecting
    followUp: {
      id: 'workaround-satisfaction',
      title: 'How satisfied are you with this approach?',
      options: [
        { id: 'sat-5', label: '5 – Very satisfied', value: '5' },
        { id: 'sat-4', label: '4', value: '4' },
        { id: 'sat-3', label: '3', value: '3' },
        { id: 'sat-2', label: '2', value: '2' },
        { id: 'sat-1', label: '1 – Not satisfied at all', value: '1' }
      ]
    }
  },
  {
    id: 'household-dynamic',
    title: 'Do you tend to be the one everyone relies on to remember things, or more backup?',
    type: 'single-select',
    required: true,
    showIf: { questionId: 'household', values: ['me-partner', 'whole-family'] },
    options: [
      { id: 'primary-tracker', label: "I'm usually the one tracking it", value: 'primary-tracker' },
      { id: 'split', label: 'Pretty split between us', value: 'split' },
      { id: 'partner-tracks', label: 'My partner tracks most of it', value: 'partner-tracks' }
    ]
  }
]

// Info page content, dynamic on the core-pain (Q2) answer (see prd4 §3.5).
// Keyed by Q2's option value (vp1–vp5, something-else).
export const INFO_PAGE_BY_VP: Record<string, { headline: string; closeLine: string }> = {
  vp1: {
    headline: 'Stop holding every unfinished task inside your head.',
    closeLine: "Say it however it comes out. I'll hold onto it."
  },
  vp2: {
    headline: 'Stop starting each morning unsure what matters most.',
    closeLine: 'Wake up knowing exactly what you need to do today.'
  },
  vp3: {
    headline: "Everyone's counting on you to remember. I'll take it from here.",
    closeLine: 'Spend less time managing their lives and more time living yours.'
  },
  vp4: {
    headline: "Remembering everything is a full-time job you didn't apply for.",
    closeLine: "It remembers your son's egg allergy when you ask for a restaurant recommendation."
  },
  vp5: {
    headline: 'Understand what your partner is carrying before they have to ask.',
    closeLine: 'Not your calendar. Your chief of staff for the life together.'
  },
  'something-else': {
    headline: 'Chaos, coordinated.',
    closeLine: "Stop holding the world together in your head. I'll hold it for you."
  }
}

// Defensive default for a missing/unrecognized core-pain value (prd4 §3.5
// "Fallback if the info page cannot vary") — no close line in the fallback.
export const INFO_PAGE_FALLBACK: { headline: string; closeLine?: string } = {
  headline: 'Chaos, coordinated.'
}

// Optional contrast line, dynamic on the workaround (Q3) answer. "chaos-mix"
// intentionally has no line — prd4 doesn't provide one for it either.
export const INFO_PAGE_CONTRAST_BY_WORKAROUND: Record<string, string> = {
  'shared-calendar': 'Not your calendar. Your chief of staff for the life together.',
  'notes-app': "Traditional planners were made for people who aren't like you.",
  memory: 'Stop holding every unfinished task inside your head.',
  'partner-reminds': 'Understand what your partner is carrying before they have to ask.'
}

export const INFO_PAGE_CAPTION = 'Reminders, plans, things people asked you to do.'
export const INFO_PAGE_CTA_TEXT = 'Sign Up as Early Beta Member'
