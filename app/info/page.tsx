'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import FunnelLayout from '@/app/components/survey/FunnelLayout'
import TrackPageView from '@/app/components/TrackPageView'
import { INFO_CARD } from '@/app/data/surveyData'
import { hasAnswers } from '@/app/lib/funnelState'

// Info card shown after the survey (prd1 §4): value-prop pitch + the
// painted-door CTA leading to email capture.
export default function Info() {
  const router = useRouter()

  // Deep-link guard: no survey answers means they skipped the funnel
  useEffect(() => {
    if (!hasAnswers()) router.replace('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Preload the next funnel step so the transition is instant
  useEffect(() => {
    router.prefetch('/waitlist')
  }, [router])

  return (
    <>
      <TrackPageView page="info" />
      <FunnelLayout
        title={INFO_CARD.headline}
        description={INFO_CARD.subhead}
        onSubmit={() => router.push('/waitlist')}
        submitText={INFO_CARD.ctaText}
      >
        <p className="text-center text-muted-foreground">
          {INFO_CARD.proofLine}
        </p>
      </FunnelLayout>
    </>
  )
}
