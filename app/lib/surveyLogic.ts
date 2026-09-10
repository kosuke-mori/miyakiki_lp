// Pure helpers for the survey flow: conditional question visibility,
// follow-up modal triggering, and cleanup of answers whose condition
// no longer holds after an earlier answer changes.

import type { FollowUpQuestion, SurveyQuestion } from '@/app/components/survey/types'
import { SURVEY_QUESTIONS } from '@/app/data/surveyData'
import { getAnswers, removeAnswer } from '@/app/lib/funnelState'

export function isQuestionVisible(
  question: SurveyQuestion,
  answers: Record<string, string[]>
): boolean {
  if (!question.showIf) return true
  const stored = answers[question.showIf.questionId] ?? []
  return stored.some(v => question.showIf!.values.includes(v))
}

// Index of the next visible question after `from`, or -1 when the survey is done
export function nextVisibleIndex(
  from: number,
  answers: Record<string, string[]>
): number {
  for (let i = from + 1; i < SURVEY_QUESTIONS.length; i++) {
    if (isQuestionVisible(SURVEY_QUESTIONS[i], answers)) return i
  }
  return -1
}

// Index of the previous visible question before `from`, or -1 if `from` is
// the first visible question
export function prevVisibleIndex(
  from: number,
  answers: Record<string, string[]>
): number {
  for (let i = from - 1; i >= 0; i--) {
    if (isQuestionVisible(SURVEY_QUESTIONS[i], answers)) return i
  }
  return -1
}

// Number of top-level questions currently visible given the answers so far.
// Follow-up modals aren't counted — they're sub-steps of their parent.
export function visibleQuestionTotal(answers: Record<string, string[]>): number {
  return SURVEY_QUESTIONS.filter(q => isQuestionVisible(q, answers)).length
}

export function isFollowUpTriggered(
  followUp: FollowUpQuestion | undefined,
  selectedValue: string | undefined
): boolean {
  if (!followUp || selectedValue === undefined) return false
  return !followUp.showIf || followUp.showIf.includes(selectedValue)
}

// After the answer to `changedId` is committed, purge answers to any question
// whose showIf condition no longer holds (and that question's follow-up).
export function invalidateDependentAnswers(changedId: string): void {
  const answers = getAnswers()
  for (const q of SURVEY_QUESTIONS) {
    if (q.showIf?.questionId !== changedId) continue
    if (isQuestionVisible(q, answers)) continue
    removeAnswer(q.id)
    if (q.followUp) removeAnswer(q.followUp.id)
  }
}
