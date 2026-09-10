'use client'

// SurveyPage - Main container component for survey pages

import { SurveyPageProps } from './types'
import SurveyOptionList from './SurveyOptionList'
import FunnelLayout from './FunnelLayout'

export default function SurveyPage({
  question,
  selectedValues,
  onSelectionChange,
  onSubmit,
  showHeroSection = true,
  heroContent,
  ctaText = 'Continue',
  ctaLoadingText = 'Saving...',
  isLoading = false,
  isDisabled = false,
  progress,
  onBack
}: SurveyPageProps) {
  // Determine if form is valid based on question requirements
  const isValid = question.required ? selectedValues.length > 0 : true
  const shouldDisable = isDisabled || !isValid

  // Use heroContent if provided, otherwise use question data
  const displayTitle = heroContent?.title || question.title
  const displayDescription = heroContent?.description || question.description

  return (
    <FunnelLayout
      title={displayTitle}
      description={displayDescription}
      additionalContent={heroContent?.additionalContent}
      onSubmit={onSubmit}
      submitText={ctaText}
      submitLoadingText={ctaLoadingText}
      isLoading={isLoading}
      isDisabled={shouldDisable}
      progress={progress}
      onBack={onBack}
      showHeroSection={showHeroSection}
      useStickyMobile={true}
    >
      <SurveyOptionList
        question={question}
        selectedValues={selectedValues}
        onSelectionChange={onSelectionChange}
      />
    </FunnelLayout>
  )
}
