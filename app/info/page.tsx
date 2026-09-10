'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import FunnelLayout from '@/app/components/survey/FunnelLayout'
import OptimizedVideo from '@/app/components/OptimizedVideo'
import TrackPageView from '@/app/components/TrackPageView'
import {
  INFO_PAGE_BY_VP,
  INFO_PAGE_FALLBACK,
  INFO_PAGE_CONTRAST_BY_WORKAROUND,
  INFO_PAGE_CAPTION,
  INFO_PAGE_CTA_TEXT
} from '@/app/data/surveyData'
import { getAnswers, hasAnswers } from '@/app/lib/funnelState'

// Info page shown after the survey (prd4 §3.5): headline and close line vary
// on the core-pain (Q2) answer; the example block is scoped to household
// (Q1), and an optional contrast line varies on workaround (Q3).
export default function Info() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string[]>>({})

  // Deep-link guard: no survey answers means they skipped the funnel
  useEffect(() => {
    if (!hasAnswers()) {
      router.replace('/')
      return
    }
    setAnswers(getAnswers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Preload the next funnel step so the transition is instant
  useEffect(() => {
    router.prefetch('/waitlist')
  }, [router])

  const vp = answers['core-pain']?.[0]
  const { headline, closeLine } = INFO_PAGE_BY_VP[vp ?? ''] ?? INFO_PAGE_FALLBACK
  const contrastLine = INFO_PAGE_CONTRAST_BY_WORKAROUND[answers['workaround']?.[0] ?? '']

  return (
    <>
      <TrackPageView page="info" />
      <FunnelLayout
        title={headline}
        onSubmit={() => router.push('/waitlist')}
        submitText={INFO_PAGE_CTA_TEXT}
      >
        {/* Example clip in the example-block slot (videoplacement.md §2);
            same clip for every Q2 variant */}
        <OptimizedVideo
          name="vitamin-reminder-alarm-setup"
          eager
          ariaLabel="Demo: a forgotten daily task becomes a set reminder"
        />
        <p className="text-center text-sm text-muted-foreground">
          {INFO_PAGE_CAPTION}
        </p>
        {contrastLine && (
          <p className="text-center text-sm text-muted-foreground">
            {contrastLine}
          </p>
        )}
        {closeLine && (
          <p className="text-center text-muted-foreground">{closeLine}</p>
        )}
      </FunnelLayout>
    </>
  )
}
