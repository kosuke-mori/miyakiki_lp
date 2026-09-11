'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import TypewriterInput from '@/app/components/TypewriterInput'
import OptimizedVideo from '@/app/components/OptimizedVideo'
import UtmCapture from '@/app/components/UtmCapture'
import TrackPageView from '@/app/components/TrackPageView'
import { motion } from 'framer-motion'
import { fadeUpBlur, scaleIn } from '@/app/lib/animations'
import ImageWithThreeSteps from '@/app/components/ImageWithThreeSteps'
import Button from '@/app/components/ui/Button'
import TestimonialCards from '@/app/components/TestimonialCards'
import Navigation from '@/app/components/Navigation/Navigation'
import Footer from '@/app/components/Footer/Footer'
import Container from '@/app/components/ui/Container'

import {
  heroData,
  mechanicLinesData,
  howItWorksData,
  testimonialCardsData
} from '@/app/data/homeData'
import { navigationData } from '@/app/data/navigationData'
import { footerData } from '@/app/data/footerData'

// Painted-door test LP (prd8 section set): Nav → Hero → How It Works →
// Testimonials → mechanic lines + typewriter → Footer. Five earlier sections
// live in app/components/parked/ (see its README) for future reuse.
export default function Home() {
  // On mobile, the nav's Continue only appears once the hero's primary CTA
  // has scrolled out of view (never two CTAs stacked on screen)
  const heroCtaRef = useRef<HTMLDivElement>(null)
  const [heroCtaInView, setHeroCtaInView] = useState(true)

  useEffect(() => {
    const el = heroCtaRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      entries => setHeroCtaInView(entries.some(e => e.isIntersecting)),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Transform navigation data
  const navLinks = navigationData.links.map((link, index) => ({
    id: `nav-${index}`,
    label: link.text,
    url: link.href
  }))

  const navButtons: Array<{
    id: string
    label: string
    url: string
    variant: 'primary' | 'secondary'
    ariaLabel: string
  }> = [
    {
      id: 'nav-cta',
      label: navigationData.cta.text,
      url: navigationData.cta.href,
      variant: 'primary',
      ariaLabel: navigationData.cta.text
    }
  ]

  return (
    <>
      <UtmCapture />
      <TrackPageView page="landing" />
      <Navigation
        logo={{ text: navigationData.logo.text, subtitle: navigationData.logo.subtitle, url: navigationData.logo.href }}
        links={navLinks}
        buttons={navButtons}
        hideMobileCta={heroCtaInView}
      />

      <main>
        {/* 1. Hero Section — mobile top padding is 40% tighter (prd7) */}
        <section
          className="pt-[72px] lg:pt-[120px] pb-[100px]"
          style={{
            position: 'relative',
            background: '#fff',
            overflow: 'hidden',
            textAlign: 'center'
          }}
        >
          <Container className="relative z-[1]">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUpBlur}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#4288A2',
                margin: '0 0 16px'
              }}
            >
              {heroData.eyebrow}
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUpBlur}
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 400,
                color: '#1a2e4a',
                lineHeight: 1.2,
                margin: '0 auto 24px',
                maxWidth: '800px',
                letterSpacing: '-0.02em'
              }}
            >
              {heroData.headline}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUpBlur}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: 'clamp(16px, 2vw, 18px)',
                color: 'rgba(0, 0, 0, 0.7)',
                lineHeight: 1.6,
                margin: '0 auto 32px',
                maxWidth: '650px'
              }}
            >
              {heroData.subheadline}
            </motion.p>

            {/* Hero clip: messy message in → captured (videoplacement.md §1) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              transition={{ delay: 0.3 }}
              style={{ margin: '0 auto 32px', maxWidth: '340px' }}
            >
              <OptimizedVideo
                name="task-added-to-timeline"
                eager
                ariaLabel="Demo: a messy message gets added to your timeline"
              />
            </motion.div>

            {/* Hero CTA (prd7 — the typewriter moved below the testimonials).
                The primary conversion action: larger than other buttons;
                observed so the nav CTA can take over once it scrolls away. */}
            <motion.div
              ref={heroCtaRef}
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              transition={{ delay: 0.4 }}
              style={{ marginBottom: '40px' }}
            >
              <Button
                asChild
                size="lg"
                className="h-14 px-12 text-lg inline-flex items-center justify-center w-full max-w-[340px] lg:w-auto"
              >
                <Link href={heroData.primaryCTA.href}>{heroData.primaryCTA.text}</Link>
              </Button>
            </motion.div>
          </Container>
        </section>

        {/* 2. How It Works */}
        <ImageWithThreeSteps
          label={howItWorksData.label}
          headline={howItWorksData.headline}
          subheadline={howItWorksData.subheadline}
          image={howItWorksData.image}
          features={howItWorksData.features}
        />

        {/* 3. Testimonial Cards */}
        <TestimonialCards
          headline={testimonialCardsData.headline}
          cards={testimonialCardsData.cards}
        />

        {/* 4. Mechanic lines + typewriter (prd7 — moved from the hero) */}
        <section style={{ padding: '60px 0', background: '#fff', textAlign: 'center' }}>
          <Container size="narrow">
            <p style={{ fontSize: '18px', color: 'rgba(0, 0, 0, 0.8)', marginBottom: '16px' }}>
              {mechanicLinesData.line1}
            </p>
            <p style={{ fontSize: '18px', fontWeight: 500, color: '#1a2e4a', marginBottom: '32px' }}>
              {mechanicLinesData.line2}
            </p>
            {/* Chat intro explainer — below the fold, so it lazy-loads
                (video-asset-optimization-prd.md); portrait 674×850 clip */}
            <div style={{ margin: '0 auto 32px', maxWidth: '300px' }}>
              <OptimizedVideo
                name="onboarding-4-chat-intro-explainer"
                width={670}
                height={850}
                ariaLabel="Demo: how the chat intro works"
              />
            </div>
            <TypewriterInput
              queries={heroData.exampleQueries}
              ctaHref={heroData.primaryCTA.href}
              ctaText={heroData.primaryCTA.text}
            />
          </Container>
        </section>

      </main>

      <Footer
        productName={navigationData.logo.text}
        copyright={footerData.copyright}
        legalLinks={footerData.legalLinks}
      />
    </>
  )
}
