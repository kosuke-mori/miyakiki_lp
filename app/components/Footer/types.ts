export interface FooterColumn {
  id: string
  title: string
  links: FooterLink[]
}

export interface FooterLink {
  id: string
  label: string
  url: string
}

export interface FooterProps {
  columns: FooterColumn[]
  copyright: string
  legalLinks?: FooterLink[]
}
