import { type ReactNode } from 'react';
import { cn } from '@/app/lib/cn';

interface ContainerProps {
  /**
   * Max-width preset
   * - default: 1400px (standard sections)
   * - wide: 1400px (wide layouts)
   * - narrow: 900px (focused content)
   */
  size?: 'default' | 'wide' | 'narrow';

  className?: string;
  children: ReactNode;
}

/**
 * Container Component
 *
 * Centered content wrapper with responsive horizontal padding
 * and configurable max-width. Unifies layout containers across
 * Hero, Features, Pricing, Stats, and other sections.
 *
 * @example
 * <Container size="default">
 *   <h2>Section Title</h2>
 *   <p>Content...</p>
 * </Container>
 */
export default function Container({
  size = 'default',
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        // Base container class from globals.css (includes padding & centering)
        'container',

        // Size variants - override max-width from base container class
        size === 'default' && 'max-w-[1500px]',
        size === 'wide' && 'max-w-[1500px]',
        size === 'narrow' && 'max-w-[900px]',

        className
      )}
    >
      {children}
    </div>
  );
}
