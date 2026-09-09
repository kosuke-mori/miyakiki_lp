import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { generateOrganizationSchema, generateWebSiteSchema } from './lib/generateSchema'
import './globals.css'
import './styles/animations.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// TODO: fill in real copy, keywords, and OG image before launch
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com'),
  title: {
    default: 'Testkiki',
    template: '%s | Testkiki'
  },
  description: 'TODO: one or two sentence description of Testkiki.',
  keywords: [
    // TODO: add real keywords
  ],
  authors: [{ name: 'Testkiki' }],
  creator: 'Testkiki, Inc.',
  publisher: 'Testkiki',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Testkiki',
    title: 'Testkiki',
    description: 'TODO: one or two sentence description of Testkiki.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Testkiki',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testkiki',
    description: 'TODO: one or two sentence description of Testkiki.',
    images: ['/og-image.jpg'],
  },
  category: 'TODO',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  const webSiteSchema = generateWebSiteSchema()

  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Google Fonts - Poppins */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Fonts - Source Serif 4 (survey funnel headings) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap"
          rel="stylesheet"
        />

      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />

        {/* Global Schema - Organization + WebSite (persistent across all pages) */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
          strategy="afterInteractive"
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema)
          }}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
