'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './TestimonialCards.module.css'
import Container from '@/app/components/ui/Container'
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  scrollViewport
} from '@/app/lib/animations'

interface TeamCard {
  type: 'team'
  icon?: string
  name: string
  description: string
}

interface PersonCard {
  type: 'person'
  image?: string
  name: string
  title: string
  quote: string
}

interface TestimonialCardsProps {
  headline?: string
  cards: (TeamCard | PersonCard)[]
}

export default function TestimonialCards({ headline, cards }: TestimonialCardsProps) {
  return (
    <section className={styles.section}>
      <Container>
        {headline && (
          <motion.h2
            className={styles.headline}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeUp}
          >
            {headline}
          </motion.h2>
        )}
        <div className={styles.grid}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={
                index === 0
                  ? slideFromLeft
                  : index === cards.length - 1
                    ? slideFromRight
                    : fadeUp
              }
              transition={{ delay: index * 0.15 }}
            >
              {card.type === 'team' ? (
                <>
                  <div className={styles.teamHeader}>
                    <div className={styles.iconWrapper}>
                      {card.icon ? (
                        <Image src={card.icon} alt="" width={48} height={48} />
                      ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                      )}
                    </div>
                    <span className={styles.teamName}>{card.name}</span>
                  </div>
                  <p className={styles.teamDescription}>{card.description}</p>
                </>
              ) : (
                <>
                  <div className={styles.personHeader}>
                    {card.image ? (
                      <div className={styles.avatarWrapper}>
                        <Image
                          src={card.image}
                          alt={card.name}
                          width={56}
                          height={56}
                          className={styles.avatar}
                        />
                      </div>
                    ) : (
                      <div className={styles.iconWrapper}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    )}
                    <div className={styles.personInfo}>
                      <span className={styles.personName}>{card.name}</span>
                      {card.title && <span className={styles.personTitle}>{card.title}</span>}
                    </div>
                  </div>
                  <p className={styles.quote}>{card.quote}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
