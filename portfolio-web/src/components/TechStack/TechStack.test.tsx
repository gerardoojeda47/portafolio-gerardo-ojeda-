/**
 * TechStack.test.tsx
 *
 * **Feature: portfolio-web-profesional, Property 7: TechStack has no % values in rendered output**
 *
 * Property-based test (PBT-7) that verifies: for any array of Skill objects
 * supplied to the TechStack component, the rendered DOM output contains no
 * strings with the `%` character associated to individual technologies.
 *
 * **Validates: Requirements 5.3**
 */

import { describe, it, afterEach, vi } from 'vitest'
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import * as fc from 'fast-check'
import type { Skill, SkillTier, SkillCategory } from '@/data/skills'

// ── Framer Motion mock ────────────────────────────────────────────────────────
// Framer Motion doesn't work well in jsdom — mock it to render children directly

vi.mock('framer-motion', async () => {
  const React = await import('react')

  type MotionProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
    initial?: unknown
    animate?: unknown
    exit?: unknown
    variants?: unknown
    transition?: unknown
    whileInView?: unknown
    viewport?: unknown
    style?: React.CSSProperties
    key?: React.Key
  }

  const forwardAs = (Tag: keyof React.JSX.IntrinsicElements) =>
    React.forwardRef(
      (
        { children, className, style, id, role, 'aria-label': ariaLabel }: MotionProps,
        ref: React.Ref<HTMLElement>
      ) =>
        React.createElement(
          Tag as string,
          { ref, className, style, id, role, 'aria-label': ariaLabel },
          children
        )
    )

  return {
    motion: {
      div:     forwardAs('div'),
      section: forwardAs('section'),
      header:  forwardAs('header'),
      li:      forwardAs('li'),
      p:       forwardAs('p'),
      span:    forwardAs('span'),
      h1:      forwardAs('h1'),
      h2:      forwardAs('h2'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

// ── Mock @/data/skills ────────────────────────────────────────────────────────
// We override the module so tests can inject arbitrary skill arrays.
// The factory returns a stable reference that each test iteration replaces.

const mockSkillsHolder: { skills: Skill[] } = { skills: [] }

vi.mock('@/data/skills', () => {
  return {
    get skills() {
      return mockSkillsHolder.skills
    },
    // Re-export type helpers (values not needed at runtime, but keeps the mock
    // consistent with how the component imports the module)
    getSkillsByTier: () => [],
    getSkillsByCategory: () => [],
    getCategories: () => [],
  }
})

// ── Import component AFTER mocks are in place ─────────────────────────────────
import { TechStack } from './TechStack'

// ── Helpers ───────────────────────────────────────────────────────────────────

afterEach(() => {
  cleanup()
  mockSkillsHolder.skills = []
})

// ── Arbitraries ───────────────────────────────────────────────────────────────

const VALID_TIERS: SkillTier[] = ['primary', 'working', 'self-learning']
const VALID_CATEGORIES: SkillCategory[] = [
  'Languages',
  'Mobile',
  'Frontend',
  'Backend',
  'Databases',
  'Cloud/DevOps',
  'Tools',
  'Methodologies',
  'Security',
]

/**
 * Generates a single valid Skill object with an arbitrary name.
 * Names are intentionally kept free of '%' to avoid false positives:
 * the property being tested is that the COMPONENT does not ADD percentage
 * proficiency values — not that skill names can't contain arbitrary chars.
 */
const skillArb: fc.Arbitrary<Skill> = fc.record({
  // Exclude '%' from generated names so the assertion can cleanly verify
  // that no percentage values are introduced by the component itself.
  name: fc.stringMatching(/^[^%]{1,40}$/).filter((s) => s.trim().length > 0),
  category: fc.constantFrom<SkillCategory>(...VALID_CATEGORIES),
  tier: fc.constantFrom<SkillTier>(...VALID_TIERS),
  icon: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
})

/**
 * Generates a non-empty array of skills (1–20 items) covering at least one
 * valid category so that the component has something to render.
 */
const skillArrayArb: fc.Arbitrary<Skill[]> = fc.array(skillArb, {
  minLength: 1,
  maxLength: 20,
})

// ── Unit tests ────────────────────────────────────────────────────────────────

describe('TechStack — unit: no percentage values in output', () => {
  it('renders without throwing when the real skills data is used', () => {
    // Use real data from the module (the mock returns whatever is in the holder;
    // here we just set a minimal valid skill set)
    mockSkillsHolder.skills = [
      { name: 'TypeScript', category: 'Languages', tier: 'primary', icon: 'typescript' },
      { name: 'React',      category: 'Frontend',  tier: 'primary', icon: 'react' },
    ]

    expect(() => render(<TechStack />)).not.toThrow()
  })

  it('renders no element whose text content contains "%" for a basic skill list', () => {
    mockSkillsHolder.skills = [
      { name: 'TypeScript', category: 'Languages', tier: 'primary', icon: 'typescript' },
      { name: 'Flutter',    category: 'Mobile',    tier: 'primary', icon: 'flutter' },
      { name: 'React',      category: 'Frontend',  tier: 'primary', icon: 'react' },
    ]

    const { container } = render(<TechStack />)

    // Walk every text node; none should contain '%'
    const allTextContent = container.textContent ?? ''
    expect(allTextContent).not.toMatch(/%\s*$/)

    // More precise: no element's own textContent should end with a digit + '%'
    const allElements = container.querySelectorAll('*')
    allElements.forEach((el) => {
      // Only leaf-level text to avoid false positives from concatenated parent text
      if (el.children.length === 0) {
        const text = el.textContent ?? ''
        expect(text).not.toMatch(/\d+%/)
      }
    })
  })
})

// ── PBT-7: TechStack has no % values in rendered output ──────────────────────

describe('TechStack — PBT-7: no percentage values for any skill array (Property 7)', () => {
  /**
   * **Feature: portfolio-web-profesional, Property 7: TechStack has no % values in rendered output**
   *
   * For ANY array of Skill objects supplied to the TechStack component,
   * the rendered DOM output SHALL NOT contain numeric percentage values
   * (i.e., strings matching /\d+%/) associated to individual technologies.
   *
   * **Validates: Requirements 5.3**
   */
  it('never renders a numeric percentage value regardless of the skill array', () => {
    fc.assert(
      fc.property(skillArrayArb, (skills) => {
        // Inject arbitrary skills into the component via the mock
        mockSkillsHolder.skills = skills
        cleanup()

        const { container } = render(<TechStack />)

        // Collect all leaf-level text nodes (elements with no child elements)
        const allLeafElements = container.querySelectorAll('*')
        allLeafElements.forEach((el) => {
          if (el.children.length === 0) {
            const text = el.textContent ?? ''
            // No leaf should contain a pattern like "85%" or "100 %"
            expect(text).not.toMatch(/\d+\s*%/)
          }
        })

        // Additionally check the full serialised text content of the section
        const fullText = container.textContent ?? ''
        expect(fullText).not.toMatch(/\d+\s*%/)
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Feature: portfolio-web-profesional, Property 7: TechStack has no % values in rendered output**
   *
   * Even when skill names themselves contain '%' (adversarial input),
   * the component must not produce numeric proficiency patterns like "85%".
   *
   * **Validates: Requirements 5.3**
   */
  it('does not render numeric proficiency percentages even with adversarial skill names', () => {
    // Adversarial: skill names that contain '%' or numeric strings
    const adversarialSkills: Skill[] = [
      { name: '85% TypeScript', category: 'Languages', tier: 'primary' },
      { name: 'React 90%',      category: 'Frontend',  tier: 'working' },
      { name: '100% Python',    category: 'Languages', tier: 'self-learning' },
    ]

    mockSkillsHolder.skills = adversarialSkills

    const { container } = render(<TechStack />)

    // The raw skill name "85% TypeScript" will appear in the DOM, so we look
    // specifically for standalone percentage patterns that would indicate
    // a proficiency bar or score (i.e., a number followed by '%' NOT immediately
    // preceded by the skill name itself as part of a badge label).
    //
    // The key assertion: the component must not ADD any new percentage values
    // beyond what was in the raw skill name.  We check this by ensuring the
    // component renders NO elements with ONLY a percentage value as their text.
    const allLeafElements = container.querySelectorAll('*')
    allLeafElements.forEach((el) => {
      if (el.children.length === 0) {
        const text = (el.textContent ?? '').trim()
        // A standalone percentage value (e.g. "85%") should never appear as
        // the sole content of any element — that would indicate a progress bar.
        expect(text).not.toMatch(/^\d+\s*%$/)
      }
    })
  })
})
