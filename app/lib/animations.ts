// Animation variants for Framer Motion
// Used across landing page components

// Cubic bezier easing curve for smooth animations
const smoothEase = [0.25, 0.46, 0.45, 0.94] as const

// Dramatic easing curve for exaggerated animations
const dramaticEase = [0.16, 1, 0.3, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase }
  }
}

export const fadeUpBlur = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: smoothEase }
  }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: smoothEase }
  }
}

export const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: smoothEase }
  }
}

export const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: smoothEase }
  }
}

export const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
}

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerContainerSlow = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

export const tableRowReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const }
  }
}

// For counting up numbers
export const countUpConfig = {
  duration: 2,
  ease: smoothEase
}

// Viewport settings for scroll-triggered animations
export const scrollViewport = {
  once: true,
  margin: '-100px',
  amount: 0.3
}

export const scrollViewportEager = {
  once: true,
  margin: '-50px',
  amount: 0.2
}

// ============================================
// Dramatic Animation Variants
// Exaggerated effects for visual impact
// ============================================

// Dramatic fade up with blur effect
export const dramaticFadeUp = {
  hidden: { opacity: 0, y: 80, filter: 'blur(15px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: dramaticEase }
  }
}

// Dramatic scale in with spring physics
export const dramaticScaleIn = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 20
    }
  }
}

// Dramatic slide from left
export const dramaticSlideLeft = {
  hidden: { opacity: 0, x: -100, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: dramaticEase }
  }
}

// Dramatic slide from right
export const dramaticSlideRight = {
  hidden: { opacity: 0, x: 100, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: dramaticEase }
  }
}

// Stagger container with longer delays for dramatic reveal
export const dramaticStagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

// Hero-specific dramatic animation
export const dramaticHero = {
  hidden: { opacity: 0, y: 60, scale: 0.95, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: dramaticEase }
  }
}

// Dramatic viewport settings (trigger earlier for longer animations)
export const dramaticViewport = {
  once: true,
  margin: '-80px',
  amount: 0.2
}
