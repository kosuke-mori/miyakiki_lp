// Builds the waitlist payload (email + all survey answers + UTM attribution)
// and POSTs it to Formspree. Extracted from the waitlist page so a future
// inline-email info card can reuse it unchanged.

import { SURVEY_QUESTIONS } from '@/app/data/surveyData'
import { getAnswers, clearAnswers, getSessionId } from '@/app/lib/funnelState'
import { getUtmParams } from '@/app/lib/utm'
import { setSignupSnapshot } from '@/app/lib/signupSnapshot'
import { trackEvent } from '@/app/lib/track'
import type { FollowUpQuestion, SurveyQuestion } from '@/app/components/survey/types'

// TODO(testkiki): create a Formspree form at https://formspree.io and set
// NEXT_PUBLIC_FORMSPREE_FORM_ID in .env.local (restart the dev server after).
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID

export function isWaitlistConfigured(): boolean {
  return Boolean(FORMSPREE_ID)
}

// Convert stored answer values into human-readable text for the Formspree email
function formatAnswer(
  question: SurveyQuestion | FollowUpQuestion,
  values: string[]
): string {
  return values
    .map(v => question.options.find(o => o.value === v)?.label ?? v)
    .join(', ')
}

export async function submitWaitlist(email: string): Promise<void> {
  if (!FORMSPREE_ID) {
    if (process.env.NODE_ENV === 'development') {
      // Dev-only: simulate a successful signup so the post-submission flow
      // (confirmation + post-signup questions) is testable without Formspree.
      console.warn('[testkiki] dev mode: no Formspree ID — simulating a successful signup')
      trackEvent('waitlist_submitted')
      setSignupSnapshot(email.trim(), getAnswers())
      clearAnswers()
      return
    }
    throw new Error('Waitlist is not configured yet.')
  }

  const answers = getAnswers()
  // session_id joins this signup to the session's event trail once
  // server-side tracking exists (see README Roadmap)
  const payload: Record<string, string> = {
    email: email.trim(),
    session_id: getSessionId()
  }
  // Every question AND its follow-up gets a column, empty when unanswered
  // (skipped conditional questions included), so Formspree columns stay
  // stable across submissions.
  for (const q of SURVEY_QUESTIONS) {
    payload[`survey_${q.id}`] = formatAnswer(q, answers[q.id] ?? [])
    if (q.followUp) {
      payload[`survey_${q.followUp.id}`] = formatAnswer(
        q.followUp,
        answers[q.followUp.id] ?? []
      )
    }
  }
  // Raw value(s) for the segmentation question (e.g. "vp3") so analysis
  // doesn't have to map labels back to value-prop codes
  payload['survey_core-pain_value'] = (answers['core-pain'] ?? []).join(', ')
  Object.assign(payload, getUtmParams())

  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status}) — please try again.`)
  trackEvent('waitlist_submitted')
  // Snapshot before clearing: the confirmation page's post-signup questions
  // need the email and the survey answers (PQ3 visibility, association)
  setSignupSnapshot(email.trim(), answers)
  clearAnswers()
}
