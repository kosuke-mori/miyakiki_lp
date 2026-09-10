'use client'

// PostSignupCard - One optional post-signup question (prd3 §4). Purely
// presentational: no sessionStorage or trackEvent calls here — the parent
// owns all side effects. A single tap on an option both records the answer
// and advances (no separate submit button); free text is the one exception
// and needs an explicit Send. Skip is a quiet text link, never a button,
// present on every question including the last.

import { useState } from 'react'
import SurveyOptionList from './SurveyOptionList'
import ProgressBar from './ProgressBar'
import { Textarea } from '@/app/components/ui/textarea'
import { Button } from '@/app/components/ui/shadcn-button'
import type { PostSignupQuestion } from './types'

interface PostSignupCardProps {
  question: PostSignupQuestion
  index: number // 0-based
  total: number
  savedValues: string[]
  onAnswer: (values: string[]) => void
  onSkip: () => void
}

export default function PostSignupCard({
  question,
  index,
  total,
  savedValues,
  onAnswer,
  onSkip
}: PostSignupCardProps) {
  const [draft, setDraft] = useState(savedValues[0] ?? '')

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>One more thing · Optional</span>
        <span>
          {index + 1} of {total}
        </span>
      </div>

      <ProgressBar current={index + 1} total={total} />

      <h2 className="text-xl font-medium text-foreground">{question.title}</h2>

      {question.type === 'free-text' ? (
        <div className="space-y-3">
          <Textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder={question.placeholder}
            rows={4}
          />
          <Button
            onClick={() => onAnswer([draft.trim()])}
            disabled={draft.trim().length === 0}
            className="w-full h-12 text-base"
          >
            Send
          </Button>
        </div>
      ) : (
        <SurveyOptionList
          question={{ type: 'single-select', options: question.options ?? [] }}
          selectedValues={savedValues}
          onSelectionChange={onAnswer}
        />
      )}

      <button
        type="button"
        onClick={onSkip}
        className="block text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        Skip →
      </button>
    </div>
  )
}
