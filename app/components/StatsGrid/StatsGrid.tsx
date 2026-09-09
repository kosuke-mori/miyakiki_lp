'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './StatsGrid.module.css'
import Container from '@/app/components/ui/Container'
import { fadeUp, scaleIn, scrollViewport } from '@/app/lib/animations'

interface StatCard {
  value: string
  title: string
  description: string
  featured?: boolean
}

interface StatsGridProps {
  label?: string
  headline: string
  subheadline?: string
  stats: StatCard[]
}

// Count-up animation hook
function useCountUp(endValue: string, duration: number = 2, isInView: boolean) {
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!isInView) return

    // Extract numeric value and suffix (e.g., "92%" -> 92, "%")
    const match = endValue.match(/^([\d.]+)(.*)$/)
    if (!match) {
      setDisplayValue(endValue)
      return
    }

    const numericValue = parseFloat(match[1])
    const suffix = match[2]
    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (endTime - startTime), 1)
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = numericValue * easeProgress

      if (Number.isInteger(numericValue)) {
        setDisplayValue(`${Math.round(currentValue)}${suffix}`)
      } else {
        setDisplayValue(`${currentValue.toFixed(1)}${suffix}`)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [endValue, duration, isInView])

  return displayValue
}

function StatValue({ value, isInView }: { value: string; isInView: boolean }) {
  const displayValue = useCountUp(value, 1.5, isInView)
  return <span className={styles.value}>{displayValue}</span>
}

function FeaturedStatValue({ value, isInView }: { value: string; isInView: boolean }) {
  const displayValue = useCountUp(value, 1.5, isInView)
  return <span className={styles.featuredValue}>{displayValue}</span>
}

export default function StatsGrid({
  label = 'RESULTS',
  headline,
  subheadline,
  stats
}: StatsGridProps) {
  const regularStats = stats.filter(s => !s.featured)
  const featuredStat = stats.find(s => s.featured)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className={styles.section} ref={ref}>
      <Container>
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={{
            hidden: { opacity: 1 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.span className={styles.label} variants={fadeUp}>{label}</motion.span>
          <motion.h2 className={styles.headline} variants={fadeUp}>{headline}</motion.h2>
          {subheadline && <motion.p className={styles.subheadline} variants={fadeUp}>{subheadline}</motion.p>}
        </motion.div>

        <div className={styles.grid}>
          {/* Regular stats - 2x2 grid */}
          <motion.div
            className={styles.regularGrid}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
          >
            {regularStats.map((stat, index) => (
              <motion.div
                key={index}
                className={styles.card}
                variants={scaleIn}
              >
                <StatValue value={stat.value} isInView={isInView} />
                <span className={styles.title}>{stat.title}</span>
                <span className={styles.description}>{stat.description}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured stat - tall card on right */}
          {featuredStat && (
            <motion.div
              className={styles.featuredCard}
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <FeaturedStatValue value={featuredStat.value} isInView={isInView} />
              <span className={styles.featuredTitle}>{featuredStat.title}</span>
              <span className={styles.featuredDescription}>{featuredStat.description}</span>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  )
}
