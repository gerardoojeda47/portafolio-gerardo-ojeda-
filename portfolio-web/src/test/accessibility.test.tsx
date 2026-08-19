/**
 * accessibility.test.tsx
 *
 * **Feature: portfolio-web-profesional, Property: accesibilidad — alt text y aria-label presentes**
 *
 * Validates: Requirements 12.4
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import App from '@/App'

vi.mock('framer-motion', async () => {
  const React = await import('react')

  type MotionProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
    href?: string
    download?: boolean | string
    target?: string
    rel?: string
    'aria-label'?: string
    role?: string
    whileInView?: unknown
    initial?: unknown
    variants?: unknown
    viewport?: unknown
    animate?: unknown
    exit?: unknown
    transition?: unknown
  }

  const forwardAs = (Tag: keyof React.JSX.IntrinsicElements) =>
    React.forwardRef(
      ({ children, className, href, download, target, rel, 'aria-label': ariaLabel, role }: MotionProps, ref: React.Ref<HTMLElement>) =>
        React.createElement(
          Tag as string,
          { ref, className, href, download, target, rel, 'aria-label': ariaLabel, role },
          children,
        ),
    )

  return {
    motion: {
      div: forwardAs('div'),
      section: forwardAs('section'),
      header: forwardAs('header'),
      nav: forwardAs('nav'),
      h1: forwardAs('h1'),
      h2: forwardAs('h2'),
      h3: forwardAs('h3'),
      h4: forwardAs('h4'),
      p: forwardAs('p'),
      a: forwardAs('a'),
      span: forwardAs('span'),
      article: forwardAs('article'),
      blockquote: forwardAs('blockquote'),
      ul: forwardAs('ul'),
      li: forwardAs('li'),
      button: forwardAs('button'),
      aside: forwardAs('aside'),
      footer: forwardAs('footer'),
      img: forwardAs('img'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

afterEach(() => cleanup())

describe('Accessibility — Requirement 12.4', () => {
  it('all images have alt text', () => {
    const { container } = render(<App />)
    const images = container.querySelectorAll('img')

    images.forEach((img) => {
      const alt = img.getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt!.trim().length).toBeGreaterThan(0)
    })
  })

  it('icon-only interactive elements have aria-label', () => {
    const { container } = render(<App />)

    const iconOnlyButtons = Array.from(container.querySelectorAll('button')).filter((btn) => {
      const text = btn.textContent?.trim() ?? ''
      return text.length === 0
    })

    iconOnlyButtons.forEach((btn) => {
      expect(btn.getAttribute('aria-label')).toBeTruthy()
    })
  })

  it('uses semantic HTML landmarks', () => {
    const { container } = render(<App />)

    expect(container.querySelector('header')).not.toBeNull()
    expect(container.querySelector('main')).not.toBeNull()
    expect(container.querySelector('footer')).not.toBeNull()
    expect(container.querySelector('nav')).not.toBeNull()
    expect(container.querySelectorAll('section').length).toBeGreaterThan(0)
  })
})
