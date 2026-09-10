// Snapshot of a successful signup (email + survey answers), taken just before
// clearAnswers() wipes the funnel state. The confirmation page's post-signup
// question block needs it: PQ3's visibility depends on the survey's household
// answer, and every post-signup answer is associated with the signup email.
// sessionStorage, so it clears with the tab like the rest of the funnel state.

const STORAGE_KEY = 'testkiki_signup_snapshot'

export interface SignupSnapshot {
  email: string
  answers: Record<string, string[]>
}

export function setSignupSnapshot(
  email: string,
  answers: Record<string, string[]>
): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ email, answers }))
  } catch {
    // storage unavailable — the PQ block just won't render
  }
}

export function getSignupSnapshot(): SignupSnapshot | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
