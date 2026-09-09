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

  // Layout customization
  showHeroSection?: boolean
  formMaxWidth?: string

  // Mobile-specific
  useStickyMobile?: boolean
}

const FunnelHeader = () => (
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
  showHeroSection = true,
  formMaxWidth = 'max-w-sm',
  useStickyMobile = false
}: FunnelLayoutProps) {
  const shouldDisable = isDisabled || isLoading

  return (
    <div className="funnel-theme min-h-screen bg-background flex flex-col">
      <FunnelHeader />

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:flex-1">
        {/* Hero Section - Left */}
        {showHeroSection && (
          <div className="flex items-center justify-center px-8 py-12">
            <div className="max-w-md text-center lg:text-left">
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
              <div className="p-4 bg-background border-t">
                <Button
                  onClick={onSubmit}
                  className="w-full h-12 text-base"
                  disabled={shouldDisable}
                >
                  {isLoading ? submitLoadingText : submitText}
                </Button>
              </div>
            )}
          </>
        ) : (
          // Centered mobile layout (for form pages)
          <div className="flex-1 flex flex-col justify-center px-4 py-8">
            <div className="text-center mb-8">
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
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
