export interface NavigationProps {
  logo: {
    text: string
    subtitle?: string
    url: string
  }
  links: NavigationLink[]
  buttons: NavigationButton[]
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
