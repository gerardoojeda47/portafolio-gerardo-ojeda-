/**
 * Hero.test.tsx
 *
 * Unit tests for the Hero component CTAs.
 *
 * Verifies that exactly 4 CTA buttons are rendered with the correct hrefs.
 *
 * Validates: Requirements 3.3
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { Hero } from './Hero'

// ── Mocks ─────────────────────────────────────────────────────────────────────

// Framer Motion doesn't work well in jsdom — mock it to render children directly
vi.mock('framer-motion', async () => {
  const React = await import('react')

  type MotionProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
    href?: string
    download?: boolean | string
    target?: string
    rel?: string
    'aria-label'?: string
    whileHover?: unknown
    whileTap?: unknown
    variants?: unknown
    initial?: unknown
    animate?: unknown
    transition?: unknown
  }

  const forwardAs = (Tag: keyof React.JSX.IntrinsicElements) =>
    React.forwardRef(
      ({ children, className, href, download, target, rel, 'aria-label': ariaLabel }: MotionProps, ref: React.Ref<HTMLElement>) =>
        React.createElement(
          Tag as string,
          { ref, className, href, download, target, rel, 'aria-label': ariaLabel },
          children
        )
    )

  return {
    motion: {
      div: forwardAs('div'),
      section: forwardAs('section'),
      h1: forwardAs('h1'),
      p: forwardAs('p'),
      a: forwardAs('a'),
      span: forwardAs('span'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

// Mock TerminalWindow to avoid its own animation complexity in these tests
vi.mock('./TerminalWindow', () => ({
  TerminalWindow: () => <div data-testid="terminal-window" />,
}))

afterEach(() => cleanup())

// ── CTA definitions ───────────────────────────────────────────────────────────

/** The four CTAs required by Requirement 3.3, in order. */
const EXPECTED_CTAS = [
  { label: 'Ver proyectos', href: '#projects' },
  { label: 'Descargar CV', href: '/cv-gerardo-ojeda.pdf' },
  { label: 'GitHub', href: 'https://github.com/gerardoojeda47' },
  { label: 'Contactarme', href: '#contact' },
] as const

// ── Unit tests ────────────────────────────────────────────────────────────────

describe('Hero — CTAs (Requirement 3.3)', () => {
  it('renders exactly 4 CTA buttons inside .hero__ctas', () => {
    const { container } = render(<Hero />)
    const ctaContainer = container.querySelector('.hero__ctas')
    expect(ctaContainer).not.toBeNull()

    const links = ctaContainer!.querySelectorAll('a')
    expect(links).toHaveLength(4)
  })

  it('"Ver proyectos" button has href="#projects"', () => {
    const { container } = render(<Hero />)
    const link = container.querySelector('a[aria-label="Ver proyectos"]')
    expect(link).not.toBeNull()
    expect(link!.getAttribute('href')).toBe('#projects')
  })

  it('"Descargar CV" button has href="/cv-gerardo-ojeda.pdf" and download attribute', () => {
    const { container } = render(<Hero />)
    const link = container.querySelector('a[aria-label="Descargar CV de Gerardo Ojeda"]')
    expect(link).not.toBeNull()
    expect(link!.getAttribute('href')).toBe('/cv-gerardo-ojeda.pdf')
    expect(link!.hasAttribute('download')).toBe(true)
  })

  it('"GitHub" button has href="https://github.com/gerardoojeda47"', () => {
    const { container } = render(<Hero />)
    const link = container.querySelector('a[aria-label="Ver perfil de GitHub de Gerardo Ojeda"]')
    expect(link).not.toBeNull()
    expect(link!.getAttribute('href')).toBe('https://github.com/gerardoojeda47')
  })

  it('"Contactarme" button has href="#contact"', () => {
    const { container } = render(<Hero />)
    const link = container.querySelector('a[aria-label="Contactar a Gerardo Ojeda"]')
    expect(link).not.toBeNull()
    expect(link!.getAttribute('href')).toBe('#contact')
  })

  it('all CTA hrefs match the required values', () => {
    const { container } = render(<Hero />)
    const ctaContainer = container.querySelector('.hero__ctas')!
    const links = Array.from(ctaContainer.querySelectorAll('a'))

    const actualHrefs = links.map((l) => l.getAttribute('href'))

    EXPECTED_CTAS.forEach(({ href }) => {
      expect(actualHrefs).toContain(href)
    })
  })

  it('"GitHub" button opens in a new tab with rel="noopener noreferrer"', () => {
    const { container } = render(<Hero />)
    const githubLink = container.querySelector('a[href="https://github.com/gerardoojeda47"]')
    expect(githubLink).not.toBeNull()
    expect(githubLink!.getAttribute('target')).toBe('_blank')
    const rel = githubLink!.getAttribute('rel') ?? ''
    expect(rel).toContain('noopener')
    expect(rel).toContain('noreferrer')
  })
})
