'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import FunnelLayout from '@/app/components/survey/FunnelLayout'
import TrackPageView from '@/app/components/TrackPageView'
import { Input } from '@/app/components/ui/input'
import { hasAnswers } from '@/app/lib/funnelState'
import { submitWaitlist, isWaitlistConfigured } from '@/app/lib/submitWaitlist'

export default function Waitlist() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Deep-link guard: no survey answers means they skipped the funnel
  useEffect(() => {
    if (!hasAnswers()) router.replace('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    if (loading || !email.trim()) return
    if (!isWaitlistConfigured()) {
      console.warn('[testkiki] NEXT_PUBLIC_FORMSPREE_FORM_ID is not set — waitlist submissions are disabled')
      setError('Waitlist is not configured yet.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await submitWaitlist(email)
      router.replace('/thanks')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed — please try again.')
      setLoading(false)
    }
  }

  return (
    <>
    <TrackPageView page="waitlist" />
    <FunnelLayout
      title="Join the waitlist"
      description="TODO: one sentence on what joining the waitlist gets them."
      onSubmit={handleSubmit}
      submitText="Notify Me When It's Ready"
      submitLoadingText="Submitting..."
      isLoading={loading}
      isDisabled={!email.trim()}
    >
      <div className="space-y-2">
        <label htmlFor="waitlist-email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          placeholder="you@example.com"
          className="h-12"
        />
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    </FunnelLayout>
    </>
  )
}
