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
    id: 'core-pain',
    title: "What's hardest to stay on top of right now?",
    type: 'single-select',
    required: true,
    options: [
      {
        id: 'conversations-to-todos',
        label: 'Turning conversations/messages into an actual to-do list',
        value: 'conversations-to-todos'
      },
      {
        id: 'what-matters-today',
        label: 'Knowing what actually matters today',
        value: 'what-matters-today'
      },
      {
        id: 'everyone-elses-stuff',
        label: "Remembering everyone else's stuff, not just my own",
        value: 'everyone-elses-stuff'
      },
      {
        id: 'context-for-decisions',
        label: 'Having the right context when I need to make a decision',
        value: 'context-for-decisions'
      },
      {
        id: 'partner-visibility',
        label: "Knowing what my partner's already handling",
        value: 'partner-visibility'
      }
    ]
  },
  {
    id: 'workaround',
    title: 'How are you managing this today?',
    type: 'single-select',
    required: true,
    options: [
      { id: 'notes-app', label: 'Notes app / sticky notes', value: 'notes-app' },
      { id: 'shared-calendar', label: 'Shared calendar or app', value: 'shared-calendar' },
      { id: 'memory', label: 'Mostly just my memory', value: 'memory' },
      { id: 'chaos-mix', label: "A mix of everything, and it's chaos", value: 'chaos-mix' }
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

// Info card shown after the last survey question (see prd1 §4)
export const INFO_CARD = {
  headline: 'Stop holding every unfinished task inside your head.',
  subhead: 'Turn a messy chat into a clear to-do list — no organizing required.',
  proofLine: 'Say school forms, groceries, appointments — and watch them get organized.',
  ctaText: 'Sign Up as Early Beta Member'
}
