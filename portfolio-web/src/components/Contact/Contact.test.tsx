/**
 * Contact.test.tsx
 *
 * **Feature: portfolio-web-profesional, Property 6: Contact buttons = exactly 3 with valid URI prefixes**
 *
 * Validates: Requirements 11.2
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import * as fc from 'fast-check'
import { Contact } from './Contact'
import {
  contactLinks,
  validateContactLinks,
  type ContactLink,
  REQUIRED_CONTACT_COUNT,
} from '@/data/contact'

vi.mock('framer-motion', async () => {
  const React = await import('react')

  type MotionProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
    href?: string
    target?: string
    rel?: string
    'aria-label'?: string
  }

  const forwardAs = (Tag: keyof React.JSX.IntrinsicElements) =>
    React.forwardRef(
      ({ children, className, href, target, rel, 'aria-label': ariaLabel }: MotionProps, ref: React.Ref<HTMLElement>) =>
        React.createElement(
          Tag as string,
          { ref, className, href, target, rel, 'aria-label': ariaLabel },
          children,
        ),
    )

  return {
    motion: {
      div: forwardAs('div'),
      section: forwardAs('section'),
      header: forwardAs('header'),
      nav: forwardAs('nav'),
      a: forwardAs('a'),
      p: forwardAs('p'),
      span: forwardAs('span'),
      ul: forwardAs('ul'),
      li: forwardAs('li'),
    },
  }
})

afterEach(() => cleanup())

const VALID_PREFIXES = ['mailto:', 'https://wa.me/', 'https://github.com/'] as const

const contactLinkArb = fc.record({
  id: fc.string({ minLength: 1 }),
  label: fc.string({ minLength: 1 }),
  display: fc.string({ minLength: 1 }),
  href: fc.oneof(
    fc.constant('mailto:test@example.com'),
    fc.constant('https://wa.me/573001234567'),
    fc.constant('https://github.com/testuser'),
    fc.string({ minLength: 1 }),
  ),
  external: fc.boolean(),
})

describe('Contact — data validation (Property 6)', () => {
  it('canonical contactLinks pass validation', () => {
    expect(validateContactLinks(contactLinks)).toBe(true)
    expect(contactLinks).toHaveLength(REQUIRED_CONTACT_COUNT)
  })

  /**
   * **Feature: portfolio-web-profesional, Property 6: Contact buttons = exactly 3 with valid URI prefixes**
   * **Validates: Requirements 11.2**
   */
  it('rejects arrays that do not have exactly 3 links', () => {
    fc.assert(
      fc.property(
        fc.array(contactLinkArb, { minLength: 0, maxLength: 10 }).filter((arr) => arr.length !== 3),
        (links) => {
          expect(validateContactLinks(links)).toBe(false)
        },
      ),
      { numRuns: 100 },
    )
  })

  /**
   * **Feature: portfolio-web-profesional, Property 6: Contact buttons = exactly 3 with valid URI prefixes**
   * **Validates: Requirements 11.2**
   */
  it('accepts exactly 3 links when all hrefs use valid prefixes', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.emailAddress(),
          fc.integer({ min: 1000000000, max: 9999999999 }),
          fc.stringMatching(/^[a-z0-9_-]{1,20}$/),
        ),
        ([email, phone, username]) => {
          const links: ContactLink[] = [
            {
              id: 'email',
              label: 'Email',
              display: email,
              href: `mailto:${email}`,
              external: false,
            },
            {
              id: 'whatsapp',
              label: 'WhatsApp',
              display: String(phone),
              href: `https://wa.me/${phone}`,
              external: true,
            },
            {
              id: 'github',
              label: 'GitHub',
              display: username,
              href: `https://github.com/${username}`,
              external: true,
            },
          ]
          expect(validateContactLinks(links)).toBe(true)
        },
      ),
      { numRuns: 100 },
    )
  })
})

describe('Contact — rendered output (Requirement 11.2)', () => {
  it('renders exactly 3 contact buttons with non-empty hrefs', () => {
    const { container } = render(<Contact />)
    const links = container.querySelectorAll('.contact-btn')
    expect(links).toHaveLength(3)

    links.forEach((link) => {
      const href = link.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href!.length).toBeGreaterThan(0)
      expect(VALID_PREFIXES.some((prefix) => href!.startsWith(prefix))).toBe(true)
    })
  })

  it('external links use rel="noopener noreferrer"', () => {
    const { container } = render(<Contact />)
    const externalLinks = container.querySelectorAll('a[target="_blank"]')
    expect(externalLinks.length).toBeGreaterThan(0)

    externalLinks.forEach((link) => {
      const rel = link.getAttribute('rel') ?? ''
      expect(rel).toContain('noopener')
      expect(rel).toContain('noreferrer')
    })
  })
})
