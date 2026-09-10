'use client'

// FunnelLayout - Shared layout for the survey funnel pages, using the funnel
// design system (scoped via .funnel-theme).
// Three branches: desktop two-column hero, mobile sticky-CTA (surveys),
// mobile centered (forms). Adds a slim Testkiki logo header for navigation
// back to the LP.

import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/shadcn-button'
import { Card, CardContent } from '@/app/components/ui/card'
import { navigationData } from '@/app/data/navigationData'

interface FunnelLayoutProps {
  title: string
  description?: string
  additionalContent?: ReactNode
  children: ReactNode

  // CTA configuration
  onSubmit?: () => void
  submitText?: string
  submitLoadingText?: string
  isLoading?: boolean
  isDisabled?: boolean

  // Optional step indicator, rendered above the title (e.g. a progress bar)
  progress?: ReactNode
  // Optional media/content rendered directly above the title (e.g. a video)
  aboveTitle?: ReactNode
  // Optional muted supporting line rendered below the submit button
  belowSubmit?: ReactNode
  // Optional back arrow, left-aligned, rendered below the title/description
  onBack?: () => void

  // Layout customization
  showHeroSection?: boolean
  formMaxWidth?: string
  // Override the page background (e.g. to color-match a video clip)
  backgroundColor?: string

  // Mobile-specific
  useStickyMobile?: boolean
  // Mobile (non-sticky) only: no white card around the form, content
  // top-aligned starting near the header (prd5 waitlist revision)
  mobilePlain?: boolean
}

// Block + text-left so the arrow sits at the left edge regardless of the
// surrounding layout's text-center/text-left alignment.
const BackLink = ({ onBack }: { onBack: () => void }) => (
  <button
    type="button"
    onClick={onBack}
    aria-label="Back"
    className="mb-3 block w-full text-left text-lg text-muted-foreground hover:text-foreground"
  >
    ←
  </button>
)

export const FunnelHeader = () => (
  <header className="px-5 py-4 lg:px-8">
    <Link
      href="/"
      className="text-lg font-semibold text-foreground"
      aria-label={`${navigationData.logo.text} home`}
    >
      {navigationData.logo.text}
    </Link>
  </header>
)

export default function FunnelLayout({
  title,
  description,
  additionalContent,
  children,
  onSubmit,
  submitText = 'Continue',
  submitLoadingText = 'Loading...',
  isLoading = false,
  isDisabled = false,
  progress,
  aboveTitle,
  belowSubmit,
  onBack,
  showHeroSection = true,
  formMaxWidth = 'max-w-sm',
  backgroundColor,
  useStickyMobile = false,
  mobilePlain = false
}: FunnelLayoutProps) {
  const shouldDisable = isDisabled || isLoading

  return (
    <div
      className="funnel-theme min-h-screen bg-background flex flex-col"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <FunnelHeader />

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:flex-1">
        {/* Hero Section - Left */}
        {showHeroSection && (
          <div className="flex items-center justify-center px-8 py-12">
            <div className="max-w-md text-center lg:text-left">
              {progress}
              {onBack && <BackLink onBack={onBack} />}
              {aboveTitle && <div className="mb-6">{aboveTitle}</div>}
              <h1 className="mb-4">{title}</h1>
              {description && (
                <p className="text-xl text-muted-foreground mb-2">
                  {description}
                </p>
              )}
              {additionalContent && (
                <div className="text-muted-foreground">
                  {additionalContent}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form Section - Right */}
        <div className="flex items-center justify-center px-8 py-12 bg-card">
          <Card className={`w-full ${formMaxWidth} border-0 shadow-none bg-transparent`}>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {children}

                {onSubmit && (
                  <Button
                    onClick={onSubmit}
                    className="w-full h-12 text-base"
                    disabled={shouldDisable}
                  >
                    {isLoading ? submitLoadingText : submitText}
                  </Button>
                )}
                {belowSubmit}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 flex flex-col">
        {useStickyMobile ? (
          // Sticky mobile layout (for survey pages)
          <>
            <div className="flex-1 px-4 py-8 pb-20">
              <div className="text-center mb-8">
                {progress}
                {onBack && <BackLink onBack={onBack} />}
                {aboveTitle && <div className="mb-6">{aboveTitle}</div>}
                <h1 className="mb-4">{title}</h1>
                {description && (
                  <p className="text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>

              <div className={`${formMaxWidth} mx-auto`}>
                {children}
              </div>
            </div>

            {onSubmit && (
              <div
                className="p-4 bg-background border-t"
                style={backgroundColor ? { backgroundColor } : undefined}
              >
                <Button
                  onClick={onSubmit}
                  className="w-full h-12 text-base"
                  disabled={shouldDisable}
                >
                  {isLoading ? submitLoadingText : submitText}
                </Button>
                {belowSubmit}
              </div>
            )}
          </>
        ) : (
          // Centered mobile layout (for form pages); `mobilePlain` variant is
          // top-aligned with no card around the form (prd5)
          <div
            className={`flex-1 flex flex-col px-4 ${
              mobilePlain ? 'justify-start pt-2 pb-8' : 'justify-center py-8'
            }`}
          >
            <div className={`text-center ${mobilePlain ? 'mb-6' : 'mb-8'}`}>
              {progress}
              {onBack && <BackLink onBack={onBack} />}
              {aboveTitle && <div className={mobilePlain ? 'mb-4' : 'mb-6'}>{aboveTitle}</div>}
              <h1 className="mb-4">{title}</h1>
              {description && (
                <p className="text-muted-foreground">
                  {description}
                </p>
              )}
              {additionalContent && (
                <div className="mt-2 text-muted-foreground text-sm">
                  {additionalContent}
                </div>
              )}
            </div>

            {mobilePlain ? (
              <div className={`w-full ${formMaxWidth} mx-auto space-y-4`}>
                {children}

                {onSubmit && (
                  <Button
                    onClick={onSubmit}
                    className="w-full h-12 text-base"
                    disabled={shouldDisable}
                  >
                    {isLoading ? submitLoadingText : submitText}
                  </Button>
                )}
                {belowSubmit}
              </div>
            ) : (
              <Card className={`w-full ${formMaxWidth} mx-auto`}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {children}

                    {onSubmit && (
                      <Button
                        onClick={onSubmit}
                        className="w-full h-12 text-base"
                        disabled={shouldDisable}
                      >
                        {isLoading ? submitLoadingText : submitText}
                      </Button>
                    )}
                    {belowSubmit}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
