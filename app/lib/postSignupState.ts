// Session-scoped storage for post-signup optional answers, independent from
// the survey funnel state so refreshing the confirmation page restores them.
// NOTE: these answers are currently client-side only (plus no-op trackEvent
// emissions) — server-side persistence lands with the tracking backend (see
// README Roadmap).

const ANSWERS_KEY = 'testkiki_post_signup_answers'
const DONE_KEY = 'testkiki_post_signup_done'

export function getPostSignupAnswers(): Record<string, string[]> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(ANSWERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function setPostSignupAnswer(questionId: string, values: string[]): void {
  if (typeof window === 'undefined') return
  try {
    const answers = getPostSignupAnswers()
    answers[questionId] = values
    window.sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers))
  } catch {
    // storage unavailable — answers still work in-memory for this render
  }
}

export function isPostSignupDone(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.sessionStorage.getItem(DONE_KEY) === '1'
  } catch {
    return false
  }
}

export function markPostSignupDone(): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(DONE_KEY, '1')
  } catch {
    // ignore
  }
}
