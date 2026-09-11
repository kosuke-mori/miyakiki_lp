// =============================================================================
// HOME PAGE DATA — placeholder content for Testkiki
// TODO: replace every field below with real Testkiki copy before launch
// =============================================================================

export const heroData = {
  eyebrow: "Chaos, coordinated.",
  // Static placeholder headline (prd4 leaves this blank pending a future
  // per-ad dynamic-headline PRD)
  headline: "Stop holding every unfinished task inside your head.",
  subheadline: "It reminders, plans, things people asked you to do. I'll hold onto it and surface it at a right time.",
  primaryCTA: {
    text: "Continue",
    href: "/survey"
  },
  secondaryCTA: {
    text: "See How It Works",
    href: "#how-it-works"
  },
  // Example queries shown in the typewriter input, aligned to vp1
  // (brain dump → to-do list). Review before launching ads.
  exampleQueries: [
    "sign Mia's school form by Friday",
    "milk, coffee, and something for Saturday's potluck",
    "rebook the dentist and remind Alex about soccer"
  ]
}

// The two "mechanic lines" shown with the typewriter input, directly below
// the testimonials (prd7; originally prd4's below-fold block)
export const mechanicLinesData = {
  line1: "Just type the way you'd text a friend. No right way to say it.",
  line2: "You say it. I keep track. Nothing slips."
}

export const howItWorksData = {
  label: 'HOW IT WORKS',
  headline: "Everyone's counting on you to remember. I'll take it from here.",
  subheadline: "Anything you tell me, I'll keep track of.",
  image: {
    src: '',
    alt: 'TODO: image description'
  },
  features: [
    {
      title: "Say it. I'll sort it.",
      description: 'Half a thought is enough. I turn it into a list.'
    },
    {
      title: "I'll bring it back.",
      description: "When it matters, to whoever it's for."
    },
    {
      title: "I'll be the coordinator.",
      description: 'Mom, daughter, partner — one memory for every hat.'
    }
  ]
}

// prd7 testimonials — three person cards, verbatim copy
export const testimonialCardsData = {
  headline: 'What early families tell us',
  cards: [
    {
      type: 'person' as const,
      name: 'Dana',
      title: 'Working mom, caring for her mother',
      quote:
        "My mom's appointments, my daughter's school stuff, my own job — three lives in one head. I told it all of it, in no order, and it just kept up."
    },
    {
      type: 'person' as const,
      name: 'Priya',
      title: 'Working mom, three kids',
      quote:
        'It used to be my Notes app, my calendar, and about forty percent of my brain. Now I just talk to it on the drive home and it puts everything where it goes.'
    },
    {
      type: 'person' as const,
      name: 'Alex',
      title: 'Single parent, works full time',
      quote:
        "I stopped waking up at 3am trying to remember what I forgot. I just say it when I think of it, and it's handled."
    }
  ]
}

export const logoStripData = {
  headline: 'Trusted by teams like yours',
  // Leave `src` empty to render a text placeholder until real logo assets exist
  logos: [
    { name: 'TODO: customer 1', src: '' },
    { name: 'TODO: customer 2', src: '' },
    { name: 'TODO: customer 3', src: '' },
    { name: 'TODO: customer 4', src: '' }
  ]
}

export const featureCardsData = {
  headline: 'TODO: capabilities headline',
  subheadline: 'TODO: capabilities subheadline.',
  cards: [
    {
      type: 'illustration' as const,
      title: 'TODO: capability 1',
      description: 'TODO: capability 1 description.'
    },
    {
      type: 'illustration' as const,
      title: 'TODO: capability 2',
      description: 'TODO: capability 2 description.'
    },
    {
      type: 'badges' as const,
      title: 'TODO: capability 3',
      description: 'TODO: capability 3 description.',
      badges: [
        { label: 'TODO' },
        { label: 'TODO' },
        { label: 'TODO' }
      ]
    }
  ]
}

export const statsGridData = {
  label: 'RESULTS',
  headline: 'TODO: stats headline',
  subheadline: 'TODO: stats subheadline.',
  stats: [
    { value: '0%', title: 'TODO: stat 1', description: 'TODO: description' },
    { value: '0%', title: 'TODO: stat 2', description: 'TODO: description' },
    { value: '0x', title: 'TODO: stat 3', description: 'TODO: description', featured: true }
  ]
}

export const comparisonData = {
  headline: "TODO: comparison headline",
  columnTitles: { highlight: 'Testkiki', second: 'Alternative A', third: 'Alternative B' },
  rows: [
    {
      feature: 'TODO: feature to compare',
      primary: { status: 'yes' as const, text: '' },
      second: { status: 'partial' as const, text: '' },
      third: { status: 'no' as const, text: '' }
    }
  ]
}

export const faqData = [
  {
    question: 'TODO: question 1',
    answer: 'TODO: answer 1.'
  },
  {
    question: 'TODO: question 2',
    answer: 'TODO: answer 2.'
  }
]
