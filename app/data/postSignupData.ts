import type { PostSignupQuestion } from '@/app/components/survey/types'

// Optional post-signup questions shown on the confirmation page (prd3).
// Every question is individually skippable (a quiet "Skip →" link, never a
// button); answers save the instant they're given and never block or delay
// confirmation. Order is deliberate: the most valuable questions first,
// open text second-to-last, the biggest ask (interview) last.
export const POST_SIGNUP_QUESTIONS: PostSignupQuestion[] = [
  {
    id: 'pq1',
    title: 'When you read that headline, what did you picture this being?',
    type: 'single-select',
    options: [
      {
        id: 'chat-organizer',
        label: 'A chat I just text things to, and it organizes them for me',
        value: 'chat-organizer'
      },
      {
        id: 'smarter-todo',
        label: 'A to-do app with smarter features',
        value: 'smarter-todo'
      },
      {
        id: 'family-calendar',
        label: 'A shared family calendar or organizer',
        value: 'family-calendar'
      },
      {
        id: 'ai-assistant',
        label: 'An AI assistant that remembers everything about my family',
        value: 'ai-assistant'
      },
      {
        id: 'not-sure',
        label: 'Honestly not sure — the headline just hit',
        value: 'not-sure'
      }
    ]
  },
  {
    id: 'pq2',
    title: 'Think of the last time this was a real problem for you. What did you actually do?',
    type: 'single-select',
    options: [
      {
        id: 'figured-it-out',
        label: 'Figured it out myself, eventually',
        value: 'figured-it-out'
      },
      {
        id: 'asked-someone',
        label: 'Asked my partner, a family member, or a friend',
        value: 'asked-someone'
      },
      {
        id: 'tried-app',
        label: 'Tried an app or tool to help',
        value: 'tried-app'
      },
      {
        id: 'fell-through-cracks',
        label: 'Honestly, it just fell through the cracks',
        value: 'fell-through-cracks'
      }
    ]
  },
  {
    // Shown only if the survey's household answer was anything other than
    // "Just me" (prd3): household has exactly 4 values, so this allow-list
    // of the other three is exactly that condition.
    id: 'pq3',
    title: 'For this to actually work for you, would it need to…',
    type: 'single-select',
    showIf: {
      questionId: 'household',
      values: ['me-partner', 'me-kids', 'whole-family']
    },
    options: [
      {
        id: 'just-me',
        label: "Work just for me — I'm the one organizing everyone anyway",
        value: 'just-me'
      },
      {
        id: 'partner-too',
        label: 'Be something my partner uses too',
        value: 'partner-too'
      },
      {
        id: 'whole-family',
        label: 'Be something the whole family uses, kids included',
        value: 'whole-family'
      }
    ]
  },
  {
    id: 'pq4',
    title: "What's the main reason things you've tried haven't stuck?",
    type: 'single-select',
    options: [
      {
        id: 'too-much-setup',
        label: 'Too much setup or upkeep',
        value: 'too-much-setup'
      },
      {
        id: 'forget-to-use',
        label: 'I forget to actually use it',
        value: 'forget-to-use'
      },
      {
        id: 'household-wont-use',
        label: "Other people in my household wouldn't use it",
        value: 'household-wont-use'
      },
      {
        id: 'didnt-fit',
        label: "It didn't fit how I actually think",
        value: 'didnt-fit'
      },
      {
        id: 'havent-tried',
        label: "I haven't really tried anything",
        value: 'havent-tried'
      }
    ]
  },
  {
    id: 'pq5',
    title: 'In your own words — what do you hope this does for you?',
    type: 'free-text'
  },
  {
    id: 'pq6',
    title: 'Would you be open to a 20-minute chat with our team as we build this? Beta members who chat with us get first access.',
    type: 'single-select',
    options: [
      { id: 'yes', label: 'Yes, happy to', value: 'yes' },
      { id: 'maybe-later', label: 'Maybe later', value: 'maybe-later' },
      { id: 'no-thanks', label: 'No thanks', value: 'no-thanks' }
    ]
  }
]
