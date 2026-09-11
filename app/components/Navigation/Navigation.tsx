'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { NavigationProps, NavigationLink } from './types'
import styles from './Navigation.module.css'
import Button from '@/app/components/ui/Button'
import Container from '@/app/components/ui/Container'

// Desktop: logo + links + primary button, position:sticky. Mobile: logo +
// primary button only (hamburger removed per prd7), position:fixed with a
// measured spacer holding its place in the flow.
export default function Navigation({ logo, links, buttons, hideMobileCta = false }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null)
  const [navHeight, setNavHeight] = useState(0)

  // Measure for the mobile spacer (fixed nav leaves the document flow)
  useEffect(() => {
    const measure = () => setNavHeight(navRef.current?.offsetHeight ?? 0)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const renderNavLink = (link: NavigationLink) => {
    if (link.children && link.children.length > 0) {
      return (
        <li key={link.id} className={styles.dropdownWrapper}>
          <button
            className={styles.dropdownTrigger}
            aria-expanded="false"
            aria-haspopup="true"
          >
            {link.label}
            <svg
              className={styles.dropdownIcon}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <ul className={styles.dropdownMenu}>
            {link.children.map(child => (
              <li key={child.id}>
                {child.url?.startsWith('http') ? (
                  <a
                    href={child.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={child.ariaLabel || child.label}
                  >
                    {child.label}
                  </a>
                ) : (
                  <Link
                    href={child.url || '#'}
                    aria-label={child.ariaLabel || child.label}
                  >
                    {child.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </li>
      )
    }

    return (
      <li key={link.id}>
        {link.url?.startsWith('http') ? (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel || link.label}
          >
            {link.label}
          </a>
        ) : (
          <Link
            href={link.url || '#'}
            aria-label={link.ariaLabel || link.label}
          >
            {link.label}
          </Link>
        )}
      </li>
    )
  }

  return (
    <>
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        className={styles.nav}
      >
        <Container className={styles.navContainer}>
          <Link
            href={logo.url}
            className={styles.logo}
            aria-label={`${logo.text} home`}
          >
            {logo.text}
          </Link>

          <div className={styles.navRight}>
            {links.length > 0 && (
              <ul className={styles.navLinks}>
                {links.map(link => renderNavLink(link))}
              </ul>
            )}

            <div
              className={`${styles.navButtons} ${hideMobileCta ? styles.navButtonsMobileHidden : ''}`}
            >
              {buttons.map(button => (
                <Button
                  key={button.id}
                  variant="primary"
                  size="sm"
                  asChild
                >
                  <Link href={button.url} aria-label={button.ariaLabel}>
                    {button.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </nav>
      <div className={styles.navSpacer} style={{ height: navHeight }} aria-hidden="true" />
    </>
  )
}
