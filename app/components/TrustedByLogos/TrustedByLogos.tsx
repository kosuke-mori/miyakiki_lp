'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './TrustedByLogos.module.css'
import Container from '@/app/components/ui/Container'
import { dramaticFadeUp, dramaticStagger, dramaticViewport } from '@/app/lib/animations'

interface Logo {
  name: string
  src: string
}

interface TrustedByLogosProps {
  headline?: string
  logos: Logo[]
  backgroundColor?: string
  grayscale?: boolean
}

export default function TrustedByLogos({
  headline,
  logos,
  backgroundColor = '#f5f5f0',
  grayscale = true
}: TrustedByLogosProps) {
  return (
    <section className={styles.section} style={{ background: backgroundColor }}>
      <Container>
        {headline && (
          <motion.p
            className={styles.headline}
            initial="hidden"
            whileInView="visible"
            viewport={dramaticViewport}
            variants={dramaticFadeUp}
          >
            {headline}
          </motion.p>
        )}
        <motion.div
          className={styles.logos}
          initial="hidden"
          whileInView="visible"
          viewport={dramaticViewport}
          variants={dramaticStagger}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className={styles.logoWrapper}
              variants={{
                hidden: { opacity: 0, x: -60, filter: 'blur(10px)' },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                }
              }}
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className={grayscale ? styles.logo : styles.logoColor}
                />
              ) : (
                <span className={styles.placeholder}>{logo.name}</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
