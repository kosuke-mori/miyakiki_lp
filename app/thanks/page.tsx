'use client'

import Link from 'next/link'
import FunnelLayout from '@/app/components/survey/FunnelLayout'
import TrackPageView from '@/app/components/TrackPageView'

export default function Thanks() {
  return (
    <>
      <TrackPageView page="thanks" />
      <FunnelLayout
        title="You're on the list!"
        description="TODO: thank-you copy — set expectations for what happens next."
      >
        <p className="text-center text-muted-foreground">
          We&apos;ll email you as soon as it&apos;s ready.
        </p>
        <Link
          href="/"
          className="block text-center text-primary font-medium hover:underline"
        >
          Back to home
        </Link>
      </FunnelLayout>
    </>
  )
}
