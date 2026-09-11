export const navigationData = {
  logo: {
    text: "Testkiki",
    subtitle: "",
    href: "/"
  },
  // No nav links: the nav is logo + Continue only (desktop links removed
  // per user request after prd8's FAQ-link removal)
  links: [] as Array<{ text: string; href: string }>,
  cta: {
    text: "Continue",
    href: "/survey"
  }
}
