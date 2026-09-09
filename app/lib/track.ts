// Event-emission seam for future server-side tracking (see README Roadmap).
//
// Currently a deliberate NO-OP (plus a console.debug in development): replace
// the body of trackEvent() to wire a backend — every call site is already in
// place (grep trackEvent). Event names and properties are documented in the
// README's Roadmap section.

import { getSessionId } from '@/app/lib/funnelState'
import { getUtmParams } from '@/app/lib/utm'

export type TrackEventName = 'page_view' | 'question_answered' | 'waitlist_submitted'

export function trackEvent(name: TrackEventName, props?: Record<string, string>): void {
  const event = {
    session_id: getSessionId(),
    ...getUtmParams(),
    ...props
  }

  if (process.env.NODE_ENV === 'development') {
    console.debug('[track]', name, event)
  }
  // Future backend: send { name, ...event } to a first-party ingestion
  // endpoint here. Keep it fire-and-forget — never block the UI on tracking.
}
