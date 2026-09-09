export const footerData = {
  company: {
    name: "Testkiki",
    tagline: "TODO: tagline" // TODO
  },
  links: [
    {
      title: "Company",
      items: [
        { text: "Home", href: "/" },
        { text: "Contact", href: "#contact" }
      ]
    }
  ],
  social: [] as Array<{ platform: string; href: string; icon: string }>,
  // TODO: add real social links, e.g. { platform: "LinkedIn", href: "https://linkedin.com/company/...", icon: "linkedin" }
  copyright: `Copyright © ${new Date().getFullYear()} Testkiki, Inc.`
}
