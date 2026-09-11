// Minimal footer (prd8): product name, copyright, and placeholder legal
// links only. The earlier link-column + newsletter footer was removed in the
// LP slim-down.

import Link from 'next/link'
import { FooterProps } from './types'
import styles from './Footer.module.css'
import Container from '@/app/components/ui/Container'

export default function Footer({ productName, copyright, legalLinks }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerInner}>
          <p className={styles.productName}>{productName}</p>
          <p className={styles.copyright}>{copyright}</p>
          <div className={styles.legalLinks}>
            {legalLinks.map(link => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
