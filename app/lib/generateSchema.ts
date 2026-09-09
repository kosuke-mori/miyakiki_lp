import { organizationData } from '../data/schema/organizationData'
import { productData } from '../data/schema/productData'

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${organizationData.url}/#organization`,
    "name": organizationData.name,
    "url": organizationData.url,
    "logo": {
      "@type": "ImageObject",
      "url": organizationData.logo.url,
      "width": organizationData.logo.width,
      "height": organizationData.logo.height
    },
    "description": organizationData.description,
    "foundingDate": organizationData.foundingDate,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": organizationData.contactPoint.contactType,
      "email": organizationData.contactPoint.email,
      "availableLanguage": organizationData.contactPoint.availableLanguage
    },
    "sameAs": organizationData.sameAs
  }
}

export function generateProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${organizationData.url}/#product`,
    "name": productData.name,
    "description": productData.description,
    "applicationCategory": productData.applicationCategory,
    "operatingSystem": productData.operatingSystem,
    "offers": {
      "@type": "Offer",
      "price": productData.offers.price,
      "priceCurrency": productData.offers.priceCurrency,
      "description": productData.offers.description
    },
    "featureList": productData.features
  }
}

export function generateWebPageSchema(url: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    "url": url,
    "name": name,
    "description": description,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${organizationData.url}/#website`
    },
    "about": {
      "@id": `${organizationData.url}/#product`
    },
    "publisher": {
      "@id": `${organizationData.url}/#organization`
    }
  }
}

/**
 * Generates FAQ schema markup for Google Rich Results
 *
 * This creates FAQPage structured data that enables:
 * - FAQ rich snippets in Google search results
 * - Voice search optimization via SpeakableSpecification
 * - Enhanced visibility in search with expandable Q&A
 *
 * @param faqData Array of FAQ items with question and answer
 * @returns FAQPage schema object following schema.org specification
 *
 * Google Guidelines:
 * - Each question must have only one answer
 * - Answer text should be complete (not just a link)
 * - FAQs must be visible on the page
 * - Minimum 2 questions required for rich results
 */
export function generateFAQSchema(faqData: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage", // Tells Google this page contains FAQ content
    "@id": `${organizationData.url}/#faq`, // Unique identifier for this FAQ entity

    // Voice search optimization: tells voice assistants which parts to read aloud
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".answer-definition", ".answer-specifics"]
    },

    // Array of Question entities - maps each FAQ item to schema.org Question format
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question, // The question text
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer // The answer text (must be complete, not truncated)
      }
    }))
  }
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${organizationData.url}/#website`,
    "url": organizationData.url,
    "name": organizationData.name,
    "publisher": {
      "@id": `${organizationData.url}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${organizationData.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }
}

/**
 * Generates Service schema for B2B service pages
 *
 * This creates Service structured data for service and product pages.
 * Helps search engines and AI understand the business services offered.
 */
export function generateServiceSchema(service: {
  name: string
  description: string
  url: string
  serviceType: string
  areaServed?: string
  provider?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${service.url}/#service`,
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "serviceType": service.serviceType,
    "provider": {
      "@id": `${organizationData.url}/#organization`
    },
    "areaServed": service.areaServed || "Worldwide"
  }
}

/**
 * Generates BreadcrumbList schema for navigation hierarchy
 *
 * Helps search engines understand page hierarchy and display breadcrumbs in results.
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}
