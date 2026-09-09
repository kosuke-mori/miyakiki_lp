'use client'

// Renders nothing; captures utm_*/variant query params into sessionStorage on
// mount. Mounted on every page ad traffic can land on (LP, /survey).
// window.location.search is read in an effect instead of useSearchParams() to
// avoid Next's Suspense-boundary requirement for that hook.

import { useEffect } from 'react'
import { captureUtmParams } from '@/app/lib/utm'

export default function UtmCapture() {
  useEffect(() => {
    captureUtmParams()
  }, [])

  return null
}
