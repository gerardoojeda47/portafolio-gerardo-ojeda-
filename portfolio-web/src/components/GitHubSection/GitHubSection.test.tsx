/**
 * GitHubSection.test.tsx
 *
 * **Feature: portfolio-enhancements, Property 3: GitHub CTA href correcto**
 * **Validates: Requirements 3.1**
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import * as fc from 'fast-check'
import { GitHubSection } from './GitHubSection'

vi.mock('framer-motion', async () => {
  const React = await import('react')

  type MotionProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
    variants?: unknown
    initial?: unknown
    whileInView?: unknown
    viewport?: unknown
    transition?: unknown
  }

  const forwardAs = (Tag: keyof React.JSX.IntrinsicElements) =>
    React.forwardRef(({ children, className, ...rest }: MotionProps, ref: React.Ref<HTMLElement>) => {
      // Strip framer-motion-specific props before passing to DOM element
      const { variants: _v, initial: _i, whileInView: _w, viewport: _vp, transition: _t, ...domProps } = rest
      return React.createElement(Tag as string, { ref, className, ...domProps }, children)
    })

  return {
    motion: {
      div: forwardAs('div'),
      header: forwardAs('header'),
      section: forwardAs('section'),
    },
  }
})

afterEach(() => cleanup())

const EXPECTED_HREF = 'https://github.com/gerardoojeda47'

describe('GitHubSection — CTA link (Property 3)', () => {
  it('renders exactly one CTA link with the correct href', () => {
    const { container } = render(<GitHubSection />)
    const links = container.querySelectorAll(`a[href="${EXPECTED_HREF}"]`)
    expect(links).toHaveLength(1)
  })

  it('CTA link opens in a new tab with rel="noopener noreferrer"', () => {
    const { container } = render(<GitHubSection />)
    const link = container.querySelector(`a[href="${EXPECTED_HREF}"]`)
    expect(link).not.toBeNull()
    expect(link!.getAttribute('target')).toBe('_blank')
    expect(link!.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('displays the GitHub username in monospaced text', () => {
    const { container } = render(<GitHubSection />)
    const username = container.querySelector('.github-card__username')
    expect(username).not.toBeNull()
    expect(username!.textContent).toContain('github.com/gerardoojeda47')
  })

  /**
   * **Feature: portfolio-enhancements, Property 3: GitHub CTA href correcto**
   * **Validates: Requirements 3.1**
   *
   * For any rendering of GitHubSection, there SHALL exist exactly one link
   * with href="https://github.com/gerardoojeda47", target="_blank",
   * and rel="noopener noreferrer".
   */
  it('property: CTA href and security attrs are always correct across renders', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<GitHubSection />)
        const link = container.querySelector(`a[href="${EXPECTED_HREF}"]`)

        const result =
          link !== null &&
          link.getAttribute('target') === '_blank' &&
          link.getAttribute('rel') === 'noopener noreferrer'

        unmount()
        return result
      }),
      { numRuns: 100 },
    )
  })
})
