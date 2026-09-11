export interface NavigationProps {
  logo: {
    text: string
    subtitle?: string
    url: string
  }
  links: NavigationLink[]
  buttons: NavigationButton[]
  // Mobile only: hide the CTA button (used while the page's own primary CTA
  // is on screen, so two CTAs never stack). Desktop always shows it.
  hideMobileCta?: boolean
}

export interface NavigationLink {
  id: string
  label: string
  url?: string
  ariaLabel?: string
  children?: NavigationLink[]
}

export interface NavigationButton {
  id: string
  label: string
  url: string
  variant: 'primary' | 'secondary'
  ariaLabel: string
}
