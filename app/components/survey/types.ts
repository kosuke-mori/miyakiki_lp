// Survey component system types

import { ReactNode } from 'react'

export interface SurveyOption {
  id: string
  label: string
  value: string
  description?: string
  icon?: ReactNode
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
}

export interface SurveyPageProps extends SurveyCallbacks, SurveyLayout {
  question: SurveyQuestion
  selectedValues: string[]
}
