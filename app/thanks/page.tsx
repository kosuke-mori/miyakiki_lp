'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FunnelHeader } from '@/app/components/survey/FunnelLayout'
import { Card, CardContent } from '@/app/components/ui/card'
import ConfirmationBanner from '@/app/components/survey/ConfirmationBanner'
import PostSignupCard from '@/app/components/survey/PostSignupCard'
import PostSignupClosing from '@/app/components/survey/PostSignupClosing'
import TrackPageView from '@/app/components/TrackPageView'
import { POST_SIGNUP_QUESTIONS } from '@/app/data/postSignupData'
import { getSignupSnapshot, SignupSnapshot } from '@/app/lib/signupSnapshot'
import {
  getPostSignupAnswers,
  setPostSignupAnswer,
  isPostSignupDone,
  markPostSignupDone
} from '@/app/lib/postSignupState'
import { trackEvent } from '@/app/lib/track'
import type { PostSignupQuestion } from '@/app/components/survey/types'

// Confirmation screen (prd3): the signup is already banked when this
// renders — the banner states that as a fact and never changes. Below it,
// one optional question at a time replaces itself in place; nothing here
// may delay or gate the confirmation itself.

function isVisible(
  question: PostSignupQuestion,
  surveyAnswers: Record<string, string[]>
): boolean {
  if (!question.showIf) return true
  const stored = surveyAnswers[question.showIf.questionId] ?? []
  return stored.some(v => question.showIf!.values.includes(v))
}

export default function Thanks() {
  const router = useRouter()
  const [snapshot, setSnapshot] = useState<SignupSnapshot | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [step, setStep] = useState<number | 'closing'>(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})

  // sessionStorage is unavailable during server render. Render nothing until
  // this resolves — the banner must never appear without proof of a real
  // signup (prd3 §1).
  useEffect(() => {
    setSnapshot(getSignupSnapshot())
    setAnswers(getPostSignupAnswers())
    setStep(isPostSignupDone() ? 'closing' : 0)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated && snapshot === null) router.replace('/')
  }, [hydrated, snapshot, router])

  if (!hydrated || snapshot === null) {
    return <TrackPageView page="thanks" />
  }

  const visibleQuestions = POST_SIGNUP_QUESTIONS.filter(q =>
    isVisible(q, snapshot.answers)
  )
  const total = visibleQuestions.length

  const advance = (fromIndex: number) => {
    if (fromIndex + 1 >= total) {
      if (!isPostSignupDone()) {
        markPostSignupDone()
        trackEvent('post_signup_done')
      }
      setStep('closing')
    } else {
      setStep(fromIndex + 1)
    }
  }

  const handleAnswer = (question: PostSignupQuestion, index: number) => (
    values: string[]
  ) => {
    setPostSignupAnswer(question.id, values)
    setAnswers(prev => ({ ...prev, [question.id]: values }))
    trackEvent('post_signup_answered', {
      question_id: question.id,
      value: values.join(', ')
    })
    advance(index)
  }

  const handleSkip = (question: PostSignupQuestion, index: number) => () => {
    trackEvent('post_signup_skipped', { question_id: question.id })
    advance(index)
  }

  return (
    <div className="funnel-theme min-h-screen bg-background flex flex-col">
      <TrackPageView page="thanks" />
      <FunnelHeader />

      <div className="flex-1 flex flex-col items-center px-4 py-8 gap-6">
        <ConfirmationBanner />

        <Card className="w-full max-w-sm border-0 shadow-none bg-transparent">
          <CardContent className="pt-6">
            {step === 'closing' ? (
              <PostSignupClosing />
            ) : (
              <PostSignupCard
                key={visibleQuestions[step].id}
                question={visibleQuestions[step]}
                index={step}
                total={total}
                savedValues={answers[visibleQuestions[step].id] ?? []}
                onAnswer={handleAnswer(visibleQuestions[step], step)}
                onSkip={handleSkip(visibleQuestions[step], step)}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
