/**
 * Navbar.test.tsx
 *
 * **Feature: portfolio-web-profesional, Property 4: Nav section IDs exist in DOM**
 *
 * Property-based test that verifies: for any list of navigation section IDs
 * used by the Navbar, each ID that appears as an `href` in the nav links
 * corresponds to an element that actually exists in the DOM when those
 * sections are rendered alongside the Navbar.
 *
 * **Validates: Requirements 11.5**
 */

import { describe, it, afterEach } from 'vitest'
import { render, cleanup, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { Navbar, NAV_LINKS } from './Navbar'

// Clean up the DOM after each test
afterEach(() => {
  cleanup()
})

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Renders the Navbar together with mock `<section>` elements for each
 * provided subset of IDs.
 */
function renderWithSections(sectionIds: string[]) {
  const { container } = render(
    <>
      <Navbar />
      {sectionIds.map((id) => (
        <section key={id} id={id} data-testid={`section-${id}`} />
      ))}
    </>
  )
  return container
}

// ── Arbitraries ───────────────────────────────────────────────────────────────

/** The canonical set of section IDs that NAV_LINKS references. */
const ALL_SECTION_IDS = NAV_LINKS.map((l) => l.sectionId)

/**
 * Generates a non-empty subset of the canonical section IDs in arbitrary order.
 */
const sectionSubsetArb = fc
  .shuffledSubarray(ALL_SECTION_IDS, { minLength: 1 })
  .map((arr) => [...arr])

// ── Unit tests ────────────────────────────────────────────────────────────────

describe('Navbar — unit', () => {
  it('renders a nav link for every canonical section ID', () => {
    renderWithSections(ALL_SECTION_IDS)

    NAV_LINKS.forEach(({ href }) => {
      const links = document.querySelectorAll(`a[href="${href}"]`)
      expect(links.length).toBeGreaterThan(0)
    })
  })

  it('has no <a target="_blank"> without rel="noopener noreferrer"', () => {
    renderWithSections(ALL_SECTION_IDS)

    const externalLinks = document.querySelectorAll('a[target="_blank"]')
    externalLinks.forEach((link) => {
      const rel = link.getAttribute('rel') ?? ''
      expect(rel).toContain('noopener')
      expect(rel).toContain('noreferrer')
    })
  })
})

// ── PBT: nav href targets exist in DOM ────────────────────────────────────────

describe('Navbar — PBT: nav section IDs exist in DOM (Property 4)', () => {
  /**
   * **Feature: portfolio-web-profesional, Property 4: Nav section IDs exist in DOM**
   *
   * For any subset of section IDs rendered alongside the Navbar,
   * every `href` in the rendered nav links that references one of those IDs
   * must resolve to an actual DOM element.
   */
  it('every nav href resolves to a DOM element when sections are present', () => {
    fc.assert(
      fc.property(sectionSubsetArb, (sectionIds) => {
        // Clean DOM between iterations
        cleanup()

        const container = renderWithSections(sectionIds)

        // Collect all hrefs used inside the <nav> element
        const navLinks = container.querySelectorAll('nav a[href^="#"]')

        navLinks.forEach((link) => {
          const href = link.getAttribute('href')!
          const id = href.slice(1) // strip leading '#'

          if (sectionIds.includes(id)) {
            // A matching section was rendered — element MUST exist
            const el = document.getElementById(id)
            expect(el).not.toBeNull()
          }
        })

        // Every rendered section ID that is canonical must have a matching nav link
        sectionIds.forEach((id) => {
          if (ALL_SECTION_IDS.includes(id)) {
            const matchingNavLink = container.querySelector(`a[href="#${id}"]`)
            expect(matchingNavLink).not.toBeNull()
          }
        })
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Feature: portfolio-web-profesional, Property 4: Nav section IDs exist in DOM**
   *
   * Full render with ALL canonical section IDs in any order:
   * every single nav href must resolve to an existing DOM element.
   */
  it('all canonical nav hrefs resolve to DOM elements when all sections are present', () => {
    fc.assert(
      fc.property(
        fc.shuffledSubarray(ALL_SECTION_IDS, { minLength: ALL_SECTION_IDS.length }),
        (shuffledIds) => {
          cleanup()

          const container = renderWithSections(shuffledIds)

          const navLinks = container.querySelectorAll('nav a[href^="#"]')

          navLinks.forEach((link) => {
            const href = link.getAttribute('href')!
            const id = href.slice(1)
            if (ALL_SECTION_IDS.includes(id)) {
              const el = document.getElementById(id)
              expect(el).not.toBeNull()
            }
          })
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ── Accessibility checks ──────────────────────────────────────────────────────

describe('Navbar — accessibility', () => {
  it('hamburger button has aria-label', () => {
    renderWithSections(ALL_SECTION_IDS)
    const btn = screen.getByRole('button', { name: /open menu|close menu/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('aria-label')
  })

  it('nav has accessible role', () => {
    renderWithSections(ALL_SECTION_IDS)
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toBeInTheDocument()
  })
})
