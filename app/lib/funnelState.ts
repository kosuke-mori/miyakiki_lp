// Session-scoped storage for painted-door funnel answers.
// sessionStorage (not localStorage) so the funnel resets when the tab closes.
// All access is SSR-guarded — these run inside client components that Next.js
// still pre-renders on the server.

const STORAGE_KEY = 'testkiki_funnel_answers'
const SESSION_ID_KEY = 'testkiki_funnel_session'

// Anonymous id for joining a session's events and its waitlist submission.
// Created once per tab session; deliberately NOT cleared by clearAnswers()
// (it identifies the session, not the answers).
export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
    let id = window.sessionStorage.getItem(SESSION_ID_KEY)
    if (!id) {
      id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
      window.sessionStorage.setItem(SESSION_ID_KEY, id)
    }
    return id
  } catch {
    return ''
  }
}

export function getAnswers(): Record<string, string[]> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function setAnswer(questionId: string, values: string[]): void {
  if (typeof window === 'undefined') return
  try {
    const answers = getAnswers()
    answers[questionId] = values
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  } catch {
    // storage unavailable (private mode quota etc.) — funnel still works in-memory per page
  }
}

export function removeAnswer(questionId: string): void {
  if (typeof window === 'undefined') return
  try {
    const answers = getAnswers()
    if (!(questionId in answers)) return
    delete answers[questionId]
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  } catch {
    // ignore
  }
}

export function hasAnswers(): boolean {
  return Object.keys(getAnswers()).length > 0
}

export function clearAnswers(): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
