// PostSignupClosing - Final state of the question card (prd3 §5). Nothing
// here should read as a next step; the "Back to home" link is a quiet exit,
// not a call to action.

import Link from 'next/link'

export default function PostSignupClosing() {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-medium text-foreground">
        That&apos;s everything — thank you.
      </h2>
      <p className="text-muted-foreground">Keep an eye on your inbox.</p>
      <Link
        href="/"
        className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
      >
        Back to home
      </Link>
    </div>
  )
}
