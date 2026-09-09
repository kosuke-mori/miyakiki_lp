'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './ImageWithThreeSteps.module.css'
import Container from '@/app/components/ui/Container'
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  scrollViewport
} from '@/app/lib/animations'

interface Feature {
  title: string
  description: string
}

interface ImageWithThreeStepsProps {
  label?: string
  headline: string
  subheadline: string
  image: {
    src: string
    alt: string
  }
  features: Feature[]
}

export default function ImageWithThreeSteps({
  label = 'HOW IT WORKS',
  headline,
  subheadline,
  image,
  features
}: ImageWithThreeStepsProps) {
  return (
    <section className={styles.section}>
      <Container>
        {/* Image Block with Text Overlay */}
        <motion.div
          className={styles.imageBlock}
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollViewport}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {image.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true" />
          )}
          <div className={styles.imageOverlay} />
          <motion.div
            className={styles.imageContent}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={staggerContainer}
          >
            <motion.span className={styles.label} variants={fadeUp}>{label}</motion.span>
            <motion.h2 className={styles.headline} variants={fadeUp}>{headline}</motion.h2>
            <motion.p className={styles.subheadline} variants={fadeUp}>{subheadline}</motion.p>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className={styles.featuresGrid}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              variants={fadeUp}
            >
              <span className={styles.featureNumber}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
