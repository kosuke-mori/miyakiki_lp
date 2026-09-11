'use client'

// OptimizedVideo - Autoplaying, muted, inline UI-animation clip served as
// WebM with MP4 fallback (see video-asset-optimization-prd.md; placement per
// videoplacement.md). Clips are square (800×800) and audio-free.
//
// - `eager`: sources render immediately with preload="auto" — for clips
//   above the fold on their screen.
// - Default (lazy): nothing is fetched until the element nears the viewport
//   (IntersectionObserver), then sources mount and playback starts.
// - No poster (the specs require no poster flash before play); the neutral
//   background box behind the video reserves space (zero CLS) and doubles as
//   the fallback for browsers that support neither source — no broken
//   player UI.
// - `loop={false}` plays once and holds the last frame.

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/app/lib/cn'

interface OptimizedVideoProps {
  // Base filename under /public/assets (no extension)
  name: string
  loop?: boolean
  eager?: boolean
  // Intrinsic clip dimensions (defaults fit the square 800×800 clips);
  // drive the reserved aspect-ratio so non-square clips don't distort
  width?: number
  height?: number
  className?: string
  ariaLabel?: string
}

export default function OptimizedVideo({
  name,
  loop = true,
  eager = false,
  width = 800,
  height = 800,
  className,
  ariaLabel
}: OptimizedVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activated, setActivated] = useState(eager)

  // Lazy activation: mount the sources only when near the viewport
  useEffect(() => {
    if (eager || activated) return
    const el = containerRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setActivated(true)
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setActivated(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [eager, activated])

  // Once sources are mounted, make sure playback starts; a blocked autoplay
  // degrades silently to a still frame
  useEffect(() => {
    if (!activated) return
    const video = videoRef.current
    if (!video) return
    video.load()
    const tryPlay = () => video.play().catch(() => {})
    tryPlay()
    video.addEventListener('canplay', tryPlay, { once: true })
    return () => video.removeEventListener('canplay', tryPlay)
  }, [activated])

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden rounded-lg bg-card', className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop={loop}
        playsInline
        preload={eager ? 'auto' : 'none'}
        width={width}
        height={height}
        aria-label={ariaLabel}
        className="h-full w-full object-cover"
      >
        {activated && (
          <>
            <source src={`/assets/${name}.webm`} type="video/webm" />
            <source src={`/assets/${name}.mp4`} type="video/mp4" />
          </>
        )}
      </video>
    </div>
  )
}
