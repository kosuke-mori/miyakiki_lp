// =============================================================================
// HOME PAGE DATA — placeholder content for Testkiki
// TODO: replace every field below with real Testkiki copy before launch
// =============================================================================

export const heroData = {
  eyebrow: "Chaos, coordinated.",
  // Static placeholder headline (prd4 leaves this blank pending a future
  // per-ad dynamic-headline PRD)
  headline: "Stop holding every unfinished task inside your head.",
  subheadline: "Say it however it comes out. Reminders, plans, things people asked you to do — I'll hold onto it.",
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

// prd4 §3.1 below-fold block — sits above the existing placeholder sections
export const belowFoldData = {
  line1: "Just type the way you'd text a friend. No right way to say it.",
  line2: "You say it. I keep track. Nothing slips.",
  ctaText: "Continue",
  ctaHref: "/survey"
}

export const howItWorksData = {
  label: 'HOW IT WORKS',
  headline: "TODO: How It Works headline",
  subheadline: "TODO: supporting subheadline.",
  image: {
    src: '',
    alt: 'TODO: image description'
  },
  features: [
    {
      title: 'TODO: feature 1 title',
      description: 'TODO: feature 1 description.'
    },
    {
      title: 'TODO: feature 2 title',
      description: 'TODO: feature 2 description.'
    },
    {
      title: 'TODO: feature 3 title',
      description: 'TODO: feature 3 description.'
    }
  ]
}

export const testimonialCardsData = {
  headline: 'TODO: testimonials headline',
  cards: [
    {
      type: 'person' as const,
      name: 'TODO: name',
      title: 'TODO: title / company',
      quote: 'TODO: testimonial quote.'
    },
    {
      type: 'person' as const,
      name: 'TODO: name',
      title: 'TODO: title / company',
      quote: 'TODO: testimonial quote.'
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
