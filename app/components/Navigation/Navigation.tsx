'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NavigationProps, NavigationLink } from './types'
import styles from './Navigation.module.css'
import Button from '@/app/components/ui/Button'
import Container from '@/app/components/ui/Container'

export default function Navigation({ logo, links, buttons }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)

  const toggleMobileDropdown = (id: string) => {
    setOpenMobileDropdown(openMobileDropdown === id ? null : id)
  }

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

  const renderMobileNavLink = (link: NavigationLink) => {
    if (link.children && link.children.length > 0) {
      const isOpen = openMobileDropdown === link.id
      return (
        <li key={link.id} className={styles.mobileDropdownWrapper}>
          <button
            className={styles.mobileDropdownTrigger}
            onClick={() => toggleMobileDropdown(link.id)}
            aria-expanded={isOpen}
          >
            {link.label}
            <svg
              className={`${styles.dropdownIcon} ${isOpen ? styles.dropdownIconOpen : ''}`}
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
          {isOpen && (
            <ul className={styles.mobileDropdownMenu}>
              {link.children.map(child => (
                <li key={child.id}>
                  {child.url?.startsWith('http') ? (
                    <a
                      href={child.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label={child.ariaLabel || child.label}
                    >
                      {child.label}
                    </a>
                  ) : (
                    <Link
                      href={child.url || '#'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label={child.ariaLabel || child.label}
                    >
                      {child.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
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
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label={link.ariaLabel || link.label}
          >
            {link.label}
          </a>
        ) : (
          <Link
            href={link.url || '#'}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label={link.ariaLabel || link.label}
          >
            {link.label}
          </Link>
        )}
      </li>
    )
  }

  return (
    <nav
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
          <ul className={styles.navLinks}>
            {links.map(link => renderNavLink(link))}
          </ul>

          <div className={styles.navButtons}>
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

        <button
          className={styles.mobileMenuToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={styles.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </Container>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul>
            {links.map(link => renderMobileNavLink(link))}
          </ul>
          <div className={styles.mobileButtons}>
            {buttons.map(button => (
              <Button
                key={button.id}
                variant="primary"
                size="sm"
                asChild
              >
                <Link
                  href={button.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={button.ariaLabel}
                >
                  {button.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
