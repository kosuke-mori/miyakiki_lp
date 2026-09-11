// Minimal footer (prd8): product name, copyright, and placeholder legal
// links. The old link-column/newsletter footer was removed with the LP slim-
// down; hrefs become real routes when privacy/terms pages exist.
export const footerData = {
  copyright: `Copyright © ${new Date().getFullYear()} Testkiki, Inc.`,
  legalLinks: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' }
  ]
}
