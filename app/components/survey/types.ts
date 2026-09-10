// Survey component system types

import { ReactNode } from 'react'

export interface SurveyOption {
  id: string
  label: string
  value: string
  description?: string
  icon?: ReactNode
  // Excluded from option-order randomization; kept in authored position
  pinned?: boolean
}

// Lightweight follow-up question shown in a modal (drawer on mobile, dialog on
// desktop) after the user selects a triggering option on the parent question.
export interface FollowUpQuestion {
  id: string                 // answers stored under this key in funnelState
  title: string
  description?: string
  options: SurveyOption[]
  showIf?: string[]          // parent values that trigger it; omit = always triggered
}

export interface SurveyQuestion {
  id: string
  title: string
  description?: string
  type: 'single-select' | 'multi-select'
  required?: boolean
  options: SurveyOption[]
  // Question is only shown when the stored answer for `questionId` intersects `values`
  showIf?: { questionId: string; values: string[] }
  followUp?: FollowUpQuestion
  // Shuffle option order once per session (pinned options keep their position)
  randomizeOptions?: boolean
  // Small muted note rendered below the option list (e.g. "You can change later")
  optionsFootnote?: string
}

// Optional post-signup question shown on the confirmation page
export interface PostSignupQuestion {
  id: string
  title: string
  type: 'single-select' | 'free-text'
  options?: SurveyOption[]
  // Evaluated against the signup snapshot's survey answers
  showIf?: { questionId: string; values: string[] }
  placeholder?: string
}

export interface SurveyCallbacks {
  onSelectionChange: (values: string[]) => void
  onSubmit: () => void
}

export interface SurveyLayout {
  showHeroSection?: boolean
  heroContent?: {
    title?: string
    description?: string
    additionalContent?: ReactNode
  }
  ctaText?: string
  ctaLoadingText?: string
  isLoading?: boolean
  isDisabled?: boolean
  // Optional step indicator (e.g. a progress bar) and "← Back" control
  progress?: ReactNode
  onBack?: () => void
}

export interface SurveyPageProps extends SurveyCallbacks, SurveyLayout {
  question: SurveyQuestion
  selectedValues: string[]
}
