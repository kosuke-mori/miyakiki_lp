export const organizationData = {
  name: "Testkiki",
  legalName: "Testkiki, Inc.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://example.com",
  logo: {
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"}/og-image.jpg`,
    width: 1200,
    height: 630
  },
  // TODO: replace with real Testkiki product description
  description: "TODO: one or two sentences describing what Testkiki does.",
  foundingDate: "2026",
  areaServed: "United States",
  priceRange: "$$",
  contactPoint: {
    contactType: "sales",
    email: "contact@example.com", // TODO: replace with real contact email
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"}/#contact`,
    availableLanguage: ["English"]
  },
  sameAs: [
    // TODO: add real social links (LinkedIn, etc.)
  ]
}
