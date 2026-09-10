'use client'

import Link from 'next/link'
import TypewriterInput from '@/app/components/TypewriterInput'
import OptimizedVideo from '@/app/components/OptimizedVideo'
import UtmCapture from '@/app/components/UtmCapture'
import TrackPageView from '@/app/components/TrackPageView'
import { motion } from 'framer-motion'
import { fadeUpBlur, scaleIn } from '@/app/lib/animations'
import ImageWithThreeSteps from '@/app/components/ImageWithThreeSteps'
import Button from '@/app/components/ui/Button'
import ComparisonTableSection from '@/app/components/ComparisonTableSection'
import FAQSectionDark from '@/app/components/FAQSectionDark'
import StatsGrid from '@/app/components/StatsGrid'
import TestimonialCards from '@/app/components/TestimonialCards'
import TrustedByLogos from '@/app/components/TrustedByLogos'
import ValuePropCards from '@/app/components/ValuePropCards'
import Navigation from '@/app/components/Navigation/Navigation'
import Footer from '@/app/components/Footer/Footer'
import Container from '@/app/components/ui/Container'

import {
  heroData,
  belowFoldData,
  howItWorksData,
  testimonialCardsData,
  logoStripData,
  featureCardsData,
  statsGridData,
  comparisonData,
  faqData
} from '@/app/data/homeData'
import { generateFAQSchema } from '@/app/lib/generateSchema'
import { navigationData } from '@/app/data/navigationData'
import { footerData } from '@/app/data/footerData'

// Painted-door test LP (prd1): the hero carries the vp1 headline; the
// sections below the fold are placeholder structure (TODO copy) kept
// visible until real content lands.
export default function Home() {
  // Transform FAQ data to include IDs
  const faqItems = faqData.map((item, index) => ({
    id: `faq-${index + 1}`,
    question: item.question,
    answer: item.answer
  }))

  // Generate FAQ schema for SEO
  const faqSchema = generateFAQSchema(faqData)

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

  // Transform footer data
  const footerColumns = footerData.links.map((section, index) => ({
    id: `footer-${index}`,
    title: section.title,
    links: section.items.map((item, i) => ({
      id: `footer-${index}-${i}`,
      label: item.text,
      url: item.href
    }))
  }))

  return (
    <>
      <UtmCapture />
      <TrackPageView page="landing" />
      <Navigation
        logo={{ text: navigationData.logo.text, subtitle: navigationData.logo.subtitle, url: navigationData.logo.href }}
        links={navLinks}
        buttons={navButtons}
      />

      <main>
        {/* 1. Hero Section */}
        <section style={{
          position: 'relative',
          padding: '120px 0 100px',
          background: '#fff',
          overflow: 'hidden',
          textAlign: 'center'
        }}>
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

            {/* Typewriter Input CTA */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              transition={{ delay: 0.4 }}
              style={{ marginBottom: '40px' }}
            >
              <TypewriterInput
                queries={heroData.exampleQueries}
                ctaHref={heroData.primaryCTA.href}
                ctaText={heroData.primaryCTA.text}
              />
            </motion.div>
          </Container>
        </section>

        {/* Below-fold intro (prd4 §3.1) */}
        <section style={{ padding: '60px 0', background: '#fff', textAlign: 'center' }}>
          <Container size="narrow">
            <p style={{ fontSize: '18px', color: 'rgba(0, 0, 0, 0.8)', marginBottom: '16px' }}>
              {belowFoldData.line1}
            </p>
            <p style={{ fontSize: '18px', fontWeight: 500, color: '#1a2e4a', marginBottom: '32px' }}>
              {belowFoldData.line2}
            </p>
            {/* h-12 matches the waitlist button height (prd6) */}
            <Button asChild size="lg" className="h-12 inline-flex items-center">
              <Link href={belowFoldData.ctaHref}>{belowFoldData.ctaText}</Link>
            </Button>
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

        {/* 3. Comparison Table */}
        <ComparisonTableSection
          label="COMPARISON"
          headline={comparisonData.headline}
          rows={comparisonData.rows}
          columnTitles={comparisonData.columnTitles}
        />

        {/* 4. TrustedByLogos - Social Proof */}
        <TrustedByLogos
          headline={logoStripData.headline}
          logos={logoStripData.logos}
        />

        {/* 5. ValuePropCards */}
        <ValuePropCards
          headline={featureCardsData.headline}
          subheadline={featureCardsData.subheadline}
          cards={featureCardsData.cards as [typeof featureCardsData.cards[0], typeof featureCardsData.cards[1], typeof featureCardsData.cards[2]]}
        />

        {/* 6. Stats Grid */}
        <StatsGrid
          label={statsGridData.label}
          headline={statsGridData.headline}
          subheadline={statsGridData.subheadline}
          stats={statsGridData.stats}
        />

        {/* 7. Testimonial Cards */}
        <TestimonialCards
          headline={testimonialCardsData.headline}
          cards={testimonialCardsData.cards as [typeof testimonialCardsData.cards[0], typeof testimonialCardsData.cards[1]]}
        />

        {/* 8. FAQ */}
        <FAQSectionDark
          label="FAQ"
          headline="Your questions, answered"
          items={faqItems}
        />

      </main>

      <Footer
        columns={footerColumns}
        copyright={footerData.copyright}
      />

      {/* FAQ Schema for SEO */}
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
    </>
  )
}
