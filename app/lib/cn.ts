import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts
 *
 * @example
 * cn('px-2 py-1', condition && 'bg-blue-500', 'bg-red-500')
 * // Result: 'px-2 py-1 bg-red-500' (bg-red-500 overrides bg-blue-500)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
