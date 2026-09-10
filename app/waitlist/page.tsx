'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import FunnelLayout from '@/app/components/survey/FunnelLayout'
import OptimizedVideo from '@/app/components/OptimizedVideo'
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
    // Client-side format check — the button click bypasses native form validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That doesn't look like a valid email — mind double-checking?")
      return
    }
    // In development, submitWaitlist simulates success without a Formspree ID
    // so the post-submission flow stays testable
    if (!isWaitlistConfigured() && process.env.NODE_ENV !== 'development') {
      console.warn('[testkiki] NEXT_PUBLIC_FORMSPREE_FORM_ID is not set — waitlist submissions are disabled')
      setError('Waitlist is not configured yet.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await submitWaitlist(email)
      router.replace('/thanks')
    } catch {
      setError('Something went wrong on our end. Please try again in a moment.')
      setLoading(false)
    }
  }

  return (
    <>
    <TrackPageView page="waitlist" />
    <FunnelLayout
      title="Join the waitlist"
      description="Stop holding every unfinished task inside your head."
      aboveTitle={
        // Plays once and holds the last frame (videoplacement.md §3)
        <OptimizedVideo
          name="upcoming-reminder-cards"
          eager
          loop={false}
          className="mx-auto max-w-[280px]"
          ariaLabel="Demo: upcoming reminder cards for the week"
        />
      }
      onSubmit={handleSubmit}
      submitText="Join the Beta Waitlist"
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
          onChange={(e) => {
            setEmail(e.target.value)
            setError(null)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          placeholder="you@email.com"
          className="h-12"
        />
        <p className="text-xs text-muted-foreground">
          We&apos;ll only email you about early access — no spam, unsubscribe anytime.
        </p>
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
