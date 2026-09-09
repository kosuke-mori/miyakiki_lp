import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Text colors
        'text-primary': '#050505',
        'text-secondary': 'rgba(0, 0, 0, 0.61)',
        'text-muted': 'rgba(0, 0, 0, 0.49)',
        'text-subtle': 'rgba(0, 0, 0, 0.45)',
        'text-disabled': 'rgba(0, 0, 0, 0.3)',
        'text-inverse': '#fff',
        'text-inverse-muted': 'rgba(255, 255, 255, 0.6)',

        // Background colors
        'bg-base': '#f9f9f9',
        'bg-surface': '#fff',
        'bg-surface-alt': '#F5F5F5',
        'bg-hover': 'rgba(0, 0, 0, 0.03)',
        'bg-inverse': '#050505',

        // Border colors
        'border-subtle':'rgba(0, 0, 0, 0.23)',
        'border-default': 'rgba(0, 0, 0, 0.23)',
        'border-strong': 'rgba(0, 0, 0, 0.45)',
        'border-light': 'rgba(0, 0, 0, 0.05)',
        'border-inverse': 'rgba(255, 255, 255, 0.1)',

        // Brand colors
        'primary': '#4288A2',
        'primary-hover': '#3a7a91',
        'primary-light': '#e8f2f6',

        // Accent colors
        'accent-teal': '#0d9488',
        'accent-sky': '#0ea5e9',
        'accent-indigo': '#6366f1',
      },
      spacing: {
        15: '45px',
        25: '75px',
        30: '90px',
      },
      borderRadius: {
        'lg': '15px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 16px -8px rgba(0, 0, 0, 0.1), 0 3px 12px -4px rgba(0, 0, 0, 0.1), 0 2px 3px -2px rgba(0, 0, 0, 0.09), 0 0 0 0.75px rgba(0, 0, 0, 0.09)',
        'hero': '0 16px 36px -20px rgba(0, 0, 0, 0.3), 0 16px 64px rgba(0, 0, 0, 0.05), 0 12px 60px rgba(0, 0, 0, 0.26), 0 0 0 0.75px rgba(0, 0, 0, 0.09)',
      },
      fontFamily: {
        sans: ['"Poppins"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Roboto"', 'sans-serif'],
        heading: ['"Poppins"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['monospace'],
      },
      fontSize: {
        'hero': '48px',
        'section': '42px',
        'heading': '18px',
      },
      lineHeight: {
        'tight': '1.2',
        'normal': '1.7',
      },
      letterSpacing: {
        'tight': '-0.03em',
      },
      transitionDuration: {
        'fast': '200ms',
      },
      screens: {
        'mobile': '810px',
        'tablet': '1200px',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
