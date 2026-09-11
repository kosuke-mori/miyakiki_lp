'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './ValuePropCards.module.css'
import Container from '@/app/components/ui/Container'
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  scrollViewport
} from '@/app/lib/animations'

interface Badge {
  label: string
}

interface ValuePropCard {
  type: 'image' | 'illustration' | 'badges'
  title: string
  description: string
  image?: string
  badges?: Badge[]
}

interface ValuePropCardsProps {
  headline: string
  subheadline?: string
  cards: [ValuePropCard, ValuePropCard, ValuePropCard]
}

const cardVariants = [
  slideFromLeft,   // Left card slides from left
  fadeUp,          // Center card fades up
  slideFromRight   // Right card slides from right
]

export default function ValuePropCards({ headline, subheadline, cards }: ValuePropCardsProps) {
  return (
    <section className={styles.section}>
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
          <motion.h2 className={styles.headline} variants={fadeUp}>{headline}</motion.h2>
          {subheadline && <motion.p className={styles.subheadline} variants={fadeUp}>{subheadline}</motion.p>}
        </motion.div>
        <div className={styles.grid}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`${styles.card} ${styles[card.type]}`}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={cardVariants[index]}
              transition={{ delay: index * 0.1 }}
            >
              {card.type === 'image' && card.image && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className={styles.cardImage}
                  />
                  <div className={styles.imageOverlay} />
                </div>
              )}

              {card.type === 'illustration' && (
                <div className={styles.illustrationArea}>
                  <motion.div
                    className={styles.mockup}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={scrollViewport}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className={styles.mockupHeader}>
                      <span className={styles.mockupTime}>9:41</span>
                      <span className={styles.mockupIcons}>...</span>
                    </div>
                    <div className={styles.mockupContent}>
                      <div className={styles.mockupLine} />
                      <div className={styles.mockupLine} />
                    </div>
                  </motion.div>
                </div>
              )}

              {card.type === 'badges' && card.badges && (
                <div className={styles.badgesArea}>
                  <div className={styles.badgesWrapper}>
                    {card.badges.map((badge, i) => (
                      <motion.span
                        key={i}
                        className={styles.badge}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + i * 0.08,
                          type: 'spring',
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        {badge.label}
                      </motion.span>
                    ))}
                    <motion.div
                      className={styles.centerIcon}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 11c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
                        <path d="M18 11c0 1.66-1.34 3-3 3" />
                        <path d="M21 11c0 1.66-1.34 3-3 3" />
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              )}

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
