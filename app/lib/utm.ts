// Session-scoped capture of ad/campaign attribution so funnel submissions can
// be cross-referenced with which ad/copy variant brought the user in.
// Separate storage key from funnel answers so hasAnswers() semantics stay
// untouched (a UTM-only visitor is still bounced from /info and /waitlist).

const STORAGE_KEY = 'testkiki_funnel_utm'

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'variant'
] as const

export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

// Merge only the params present (and non-empty) in the current URL over the
// stored record: last-touch within the session, and internal navigation
// without query params never blanks out what was captured on landing.
export function captureUtmParams(): void {
  if (typeof window === 'undefined') return
  try {
    const params = new URLSearchParams(window.location.search)
    const incoming: Record<string, string> = {}
    for (const key of UTM_KEYS) {
      const value = params.get(key)
      if (value) incoming[key] = value
    }
    if (Object.keys(incoming).length === 0) return
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...getUtmParams(), ...incoming })
    )
  } catch {
    // storage unavailable — attribution is best-effort
  }
}
