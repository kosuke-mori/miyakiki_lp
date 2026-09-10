'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SurveyPage from '@/app/components/survey/SurveyPage'
import FollowUpModal from '@/app/components/survey/FollowUpModal'
import ProgressBar from '@/app/components/survey/ProgressBar'
import UtmCapture from '@/app/components/UtmCapture'
import TrackPageView from '@/app/components/TrackPageView'
import { SURVEY_QUESTIONS } from '@/app/data/surveyData'
import { getAnswers, setAnswer, removeAnswer } from '@/app/lib/funnelState'
import {
  isFollowUpTriggered,
  invalidateDependentAnswers,
  nextVisibleIndex,
  prevVisibleIndex,
  visibleQuestionTotal
} from '@/app/lib/surveyLogic'
import { getStableOptionOrder } from '@/app/lib/optionOrder'
import { trackEvent } from '@/app/lib/track'
import type { SurveyOption } from '@/app/components/survey/types'

export default function Survey() {
  const router = useRouter()
  const questions = SURVEY_QUESTIONS
  const [stepIndex, setStepIndex] = useState(0)
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [followUpValues, setFollowUpValues] = useState<string[]>([])
  const [followUpOpen, setFollowUpOpen] = useState(false)

  const question = questions[stepIndex]
  const followUpRequired = isFollowUpTriggered(question.followUp, selectedValues[0])
  // household-dynamic (the only conditional top-level question) is last in
  // the array, so a raw step index is also its position among visible
  // questions — no separate mapping needed.
  const total = visibleQuestionTotal(getAnswers())

  // Per-session stable shuffle for randomized questions (Q2). Applied in an
  // effect so server render and first client render agree (fixed order),
  // then the stored order swaps in after hydration.
  const [orderedOptions, setOrderedOptions] = useState<SurveyOption[] | null>(null)
  useEffect(() => {
    setOrderedOptions(
      question.randomizeOptions
        ? getStableOptionOrder(question.id, question.options)
        : null
    )
  }, [question])
  const displayQuestion = orderedOptions
    ? { ...question, options: orderedOptions }
    : question

  // Restore any previous answers for the first question after hydration
  // (sessionStorage is unavailable during server render). Restoration never
  // auto-opens the follow-up modal.
  useEffect(() => {
    const answers = getAnswers()
    const saved = answers[questions[0].id]
    if (saved?.length) setSelectedValues(saved)
    const savedFollowUp = questions[0].followUp && answers[questions[0].followUp.id]
    if (savedFollowUp?.length) setFollowUpValues(savedFollowUp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Preload the next funnel step so the transition is instant
  useEffect(() => {
    router.prefetch('/info')
  }, [router])

  const handleSelectionChange = (values: string[]) => {
    setSelectedValues(values)
    // Opening on selection (not on Continue) matches the drawer-picker UX:
    // a re-tap of the same option also lands here, reopening the modal so the
    // follow-up answer can be changed.
    if (isFollowUpTriggered(question.followUp, values[0])) {
      setFollowUpOpen(true)
    }
  }

  const handleFollowUpSelect = (value: string) => {
    setFollowUpValues([value])
    setFollowUpOpen(false)
  }

  const handleBack = () => {
    const answers = getAnswers()
    const prev = prevVisibleIndex(stepIndex, answers)
    if (prev === -1) return

    const prevQuestion = questions[prev]
    setSelectedValues(answers[prevQuestion.id] ?? [])
    setFollowUpValues(
      (prevQuestion.followUp && answers[prevQuestion.followUp.id]) ?? []
    )
    setFollowUpOpen(false)
    setStepIndex(prev)
  }

  const handleSubmit = () => {
    // Continue stays clickable once a main option is chosen; if a required
    // follow-up was dismissed unanswered, pressing it reopens the modal
    // instead of silently doing nothing.
    if (followUpRequired && followUpValues.length === 0) {
      setFollowUpOpen(true)
      return
    }

    setAnswer(question.id, selectedValues)
    trackEvent('question_answered', {
      question_id: question.id,
      value: selectedValues.join(', ')
    })
    if (question.followUp) {
      if (followUpRequired) {
        setAnswer(question.followUp.id, followUpValues)
        trackEvent('question_answered', {
          question_id: question.followUp.id,
          value: followUpValues.join(', ')
        })
      } else {
        // e.g. Q1 changed from "Me + kids" to "Just me" — drop the stale kids count
        removeAnswer(question.followUp.id)
      }
    }
    invalidateDependentAnswers(question.id)

    const answers = getAnswers()
    const next = nextVisibleIndex(stepIndex, answers)
    if (next === -1) {
      router.push('/info')
      return
    }

    const nextQuestion = questions[next]
    setSelectedValues(answers[nextQuestion.id] ?? [])
    setFollowUpValues(
      (nextQuestion.followUp && answers[nextQuestion.followUp.id]) ?? []
    )
    setFollowUpOpen(false)
    setStepIndex(next)
  }

  return (
    <>
      <UtmCapture />
      <TrackPageView page="survey" />
      <SurveyPage
        question={displayQuestion}
        selectedValues={selectedValues}
        onSelectionChange={handleSelectionChange}
        onSubmit={handleSubmit}
        ctaText="Continue"
        ctaLoadingText="Saving..."
        progress={<ProgressBar current={stepIndex + 1} total={total} />}
        onBack={stepIndex > 0 && !followUpOpen ? handleBack : undefined}
      />
      {question.followUp && (
        <FollowUpModal
          followUp={question.followUp}
          open={followUpOpen}
          selectedValue={followUpValues[0]}
          onSelect={handleFollowUpSelect}
          onClose={() => setFollowUpOpen(false)}
        />
      )}
    </>
  )
}
