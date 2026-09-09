'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Typewriter from 'typewriter-effect'
import styles from './TypewriterInput.module.css'

interface TypewriterInputProps {
  queries: string[]
  onSubmit?: (query: string) => void
  ctaHref?: string
  ctaText?: string
}

export default function TypewriterInput({
  queries,
  ctaHref = '/contact-us',
  ctaText = 'Try It Free'
}: TypewriterInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Preload the CTA route so the click-through is a seamless client-side transition
  useEffect(() => {
    if (ctaHref?.startsWith('/')) {
      router.prefetch(ctaHref)
    }
  }, [ctaHref, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ctaHref) return
    if (ctaHref.startsWith('/')) {
      router.push(ctaHref)
    } else {
      window.location.href = ctaHref
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!inputValue) setIsFocused(false)
          }}
          placeholder={isFocused ? "What do you want to run?" : ""}
        />
        {!isFocused && !inputValue && (
          <div className={styles.placeholder}>
            <Typewriter
              options={{
                strings: queries,
                autoStart: true,
                loop: true,
                delay: 33,
                deleteSpeed: 15,
              }}
            />
          </div>
        )}
        <button type="submit" className={styles.submitButton} aria-label={ctaText}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </form>
  )
}
