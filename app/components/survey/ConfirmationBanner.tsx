// ConfirmationBanner - Persistent, unchanging signup confirmation (prd3 §3).
// Purely presentational: no button, no link, nothing interactive — it states
// a fact and stays visible above the question card for the whole screen.

import { Check } from 'lucide-react'

export default function ConfirmationBanner() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">
      <Check className="h-4 w-4 shrink-0 text-primary" />
      <span>
        <span className="font-semibold">You&apos;re in.</span> We&apos;ll
        email you when early access opens.
      </span>
    </div>
  )
}
