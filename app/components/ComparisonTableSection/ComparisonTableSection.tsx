'use client'

import { motion } from 'framer-motion'
import styles from './ComparisonTableSection.module.css'
import Container from '@/app/components/ui/Container'
import {
  fadeUp,
  tableRowReveal,
  scrollViewport
} from '@/app/lib/animations'

interface ComparisonRow {
  feature: string
  primary: { status: 'yes' | 'partial' | 'no'; text: string }
  second: { status: 'yes' | 'partial' | 'no'; text: string }
  third: { status: 'yes' | 'partial' | 'no'; text: string }
}

interface ComparisonTableSectionProps {
  label?: string
  headline: string
  subheadline?: string
  rows: ComparisonRow[]
  columnTitles?: { highlight: string; second: string; third: string }
}

function StatusIcon({ status, delay = 0 }: { status: 'yes' | 'partial' | 'no'; delay?: number }) {
  if (status === 'yes') {
    return (
      <motion.svg
        className={styles.iconYes}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay }}
      >
        <circle cx="12" cy="12" r="10" fill="#22c55e" />
        <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    )
  }
  if (status === 'partial') {
    return (
      <motion.svg
        className={styles.iconPartial}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay }}
      >
        <rect x="4" y="4" width="16" height="16" rx="2" fill="#ffcc80" />
        <path d="M8 12h8" stroke="#e65100" strokeWidth="2" strokeLinecap="round" />
      </motion.svg>
    )
  }
  return (
    <motion.svg
      className={styles.iconNo}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, delay }}
    >
      <path d="M6 6l12 12M6 18L18 6" stroke="#ef5350" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  )
}

export default function ComparisonTableSection({
  label = 'COMPARISON',
  headline,
  subheadline,
  rows,
  columnTitles = { highlight: 'Us', second: 'Alternative A', third: 'Alternative B' }
}: ComparisonTableSectionProps) {
  return (
    <section className={styles.section}>
      <Container>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Left side - Headline */}
          <motion.div
            className={styles.headlineArea}
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

          {/* Right side - Table */}
          <div className={styles.tableArea}>
            {/* Table Header */}
            <motion.div
              className={styles.tableHeader}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={scrollViewport}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.featureCol}></div>
              <div className={`${styles.dataCol} ${styles.highlight}`}>
                <span className={styles.colTitle}>{columnTitles.highlight}</span>
              </div>
              <div className={styles.dataCol}>
                <span className={styles.colTitle}>{columnTitles.second}</span>
              </div>
              <div className={styles.dataCol}>
                <span className={styles.colTitle}>{columnTitles.third}</span>
              </div>
            </motion.div>

            {/* Table Rows */}
            {rows.map((row, index) => (
              <motion.div
                key={index}
                className={styles.tableRow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={tableRowReveal}
                transition={{ delay: index * 0.08 }}
              >
                <div className={styles.featureCol}>
                  <span className={styles.featureText}>{row.feature}</span>
                </div>
                <div className={`${styles.dataCol} ${styles.highlight}`}>
                  <StatusIcon status={row.primary.status} delay={0.3 + index * 0.15} />
                  {row.primary.text && <span className={styles.cellText}>{row.primary.text}</span>}
                </div>
                <div className={styles.dataCol}>
                  <StatusIcon status={row.second.status} delay={0.4 + index * 0.15} />
                  {row.second.text && <span className={styles.cellText}>{row.second.text}</span>}
                </div>
                <div className={styles.dataCol}>
                  <StatusIcon status={row.third.status} delay={0.5 + index * 0.15} />
                  {row.third.text && <span className={styles.cellText}>{row.third.text}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
