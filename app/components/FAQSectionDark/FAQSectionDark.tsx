'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './FAQSectionDark.module.css'
import Container from '@/app/components/ui/Container'
import { fadeUp, scrollViewport } from '@/app/lib/animations'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQSectionDarkProps {
  label?: string
  headline?: string
  items: FAQItem[]
}

export default function FAQSectionDark({
  label = 'FAQ',
  headline = 'Your questions, answered',
  items
}: FAQSectionDarkProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setActiveId(prev => prev === id ? null : id)
  }

  return (
    <section className={styles.section}>
      <Container>
        <motion.span
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUp}
        >
          {label}
        </motion.span>
        <motion.h2
          className={styles.headline}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          {headline}
        </motion.h2>

        <motion.div
          className={styles.faqList}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.2 }
            }
          }}
        >
          {items.map((item) => {
            const isActive = activeId === item.id

            return (
              <motion.div
                key={item.id}
                className={styles.faqItem}
                variants={fadeUp}
              >
                <button
                  className={styles.faqButton}
                  aria-expanded={isActive}
                  onClick={() => toggleFAQ(item.id)}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span className={`${styles.icon} ${isActive ? styles.iconActive : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div className={`${styles.answerWrapper} ${isActive ? styles.answerOpen : ''}`}>
                  <div className={styles.answer}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
