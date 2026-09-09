'use client'

// Renders nothing; emits a page_view event on mount (see app/lib/track.ts).

import { useEffect } from 'react'
import { trackEvent } from '@/app/lib/track'

export default function TrackPageView({ page }: { page: string }) {
  useEffect(() => {
    trackEvent('page_view', { page })
  }, [page])

  return null
}
