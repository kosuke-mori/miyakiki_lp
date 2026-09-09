'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/app/lib/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * - primary: Solid brand blue background (#4288A2)
   * - secondary: Transparent with border
   */
  variant?: 'primary' | 'secondary';

  /**
   * Size preset
   * - sm: Compact (navigation)
   * - md: Default (most CTAs)
   * - lg: Hero CTAs
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Merge props and styles with child element (for Link integration)
   */
  asChild?: boolean;

  children: ReactNode;
}

/**
 * Button Component
 *
 * Pure Tailwind button with two variants and three sizes.
 * No CSS Modules. All styling via utility classes.
 *
 * @example
 * <Button variant="primary" size="lg">Get Started</Button>
 * <Button variant="secondary">Learn More</Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className,
  children,
  type = 'button',
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      className={cn(
        // Base styles - brand
        'inline-block rounded-md',
        'font-sans font-medium',
        'transition-all duration-200',
        'hover:-translate-y-0.5 active:translate-y-0',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',

        // Variant styles
        variant === 'primary' && [
          'bg-primary text-white',
          'hover:bg-primary-hover',
        ],
        variant === 'secondary' && [
          'bg-white text-gray-900',
          'border border-gray-300',
          'hover:bg-gray-50',
        ],

        // Size styles
        size === 'sm' && 'px-5 py-2.5 text-sm',
        size === 'md' && 'px-6 py-3 text-sm',
        size === 'lg' && 'px-8 py-3.5 text-base',

        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = 'Button';

export default Button;
