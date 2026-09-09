import Link from 'next/link'
import { FooterProps } from './types'
import styles from './Footer.module.css'
import Container from '@/app/components/ui/Container'
import { footerData } from '@/app/data/footerData'

export default function Footer({ columns, copyright }: FooterProps) {
  return (
    <footer role="contentinfo" aria-label="Site footer" className={styles.footer}>
      <Container>
        <div className={styles.footerGrid}>
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <Link href="/" className={styles.footerLogo}>
              {footerData.company.name}
            </Link>
            <p className={styles.copyright}>{copyright}</p>
            {footerData.social.length > 0 && (
              <div className={styles.socialLinks}>
                {footerData.social.map(social => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.platform}`}
                    className={styles.socialLink}
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {columns.map(column => (
            <nav
              key={column.id}
              className={styles.footerColumn}
              aria-labelledby={`footer-${column.id}`}
            >
              <h4 id={`footer-${column.id}`}>{column.title}</h4>
              <ul>
                {column.links.map(link => (
                  <li key={link.id}>
                    {link.url.startsWith('http') ? (
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.url}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter Signup */}
          {/* TODO: wire up a real form endpoint (e.g. Formspree) before launch */}
          <div className={styles.newsletterSection}>
            <h4>Sign up for the latest news from {footerData.company.name}.</h4>
            <form
              action="#"
              method="POST"
              className={styles.newsletterForm}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </Container>
    </footer>
  )
}
