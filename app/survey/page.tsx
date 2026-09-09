'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SurveyPage from '@/app/components/survey/SurveyPage'
import FollowUpModal from '@/app/components/survey/FollowUpModal'
import UtmCapture from '@/app/components/UtmCapture'
import TrackPageView from '@/app/components/TrackPageView'
import { SURVEY_QUESTIONS } from '@/app/data/surveyData'
import { getAnswers, setAnswer, removeAnswer } from '@/app/lib/funnelState'
import {
  isFollowUpTriggered,
  invalidateDependentAnswers,
  nextVisibleIndex
} from '@/app/lib/surveyLogic'
import { trackEvent } from '@/app/lib/track'

export default function Survey() {
  const router = useRouter()
  const questions = SURVEY_QUESTIONS
  const [stepIndex, setStepIndex] = useState(0)
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [followUpValues, setFollowUpValues] = useState<string[]>([])
  const [followUpOpen, setFollowUpOpen] = useState(false)

  const question = questions[stepIndex]
  const followUpRequired = isFollowUpTriggered(question.followUp, selectedValues[0])

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
        question={question}
        selectedValues={selectedValues}
        onSelectionChange={handleSelectionChange}
        onSubmit={handleSubmit}
        ctaText="Continue"
        ctaLoadingText="Saving..."
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
