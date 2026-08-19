/**
 * BackToTop.test.tsx
 *
 * Verifies BackToTop appears only after scroll > 400px.
 *
 * Validates: Requirements 11.4
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, cleanup, act } from '@testing-library/react'
import { BackToTop } from './BackToTop'

let scrollY = 0

vi.mock('framer-motion', async () => {
  const React = await import('react')
  return {
    motion: {
      button: React.forwardRef<
        HTMLButtonElement,
        React.ButtonHTMLAttributes<HTMLButtonElement>
      >(({ children, ...props }, ref) => (
        <button ref={ref} {...props}>{children}</button>
      )),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

vi.mock('@/hooks/useScrollPosition', () => ({
  useScrollPosition: () => scrollY,
}))

afterEach(() => {
  cleanup()
  scrollY = 0
})

describe('BackToTop — Requirement 11.4', () => {
  it('is hidden when scroll is at or below 400px', () => {
    scrollY = 400
    const { container } = render(<BackToTop />)
    expect(container.querySelector('.back-to-top')).toBeNull()
  })

  it('is visible when scroll exceeds 400px', () => {
    scrollY = 401
    const { container } = render(<BackToTop />)
    expect(container.querySelector('.back-to-top')).not.toBeNull()
  })

  it('scrolls to top on click', () => {
    scrollY = 500
    const scrollTo = vi.fn()
    Object.defineProperty(window, 'scrollTo', { value: scrollTo, writable: true })

    const { container } = render(<BackToTop />)
    const button = container.querySelector('.back-to-top') as HTMLButtonElement

    act(() => {
      button.click()
    })

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('has accessible aria-label', () => {
    scrollY = 500
    const { container } = render(<BackToTop />)
    const button = container.querySelector('.back-to-top')
    expect(button?.getAttribute('aria-label')).toBe('Volver arriba')
  })
})
