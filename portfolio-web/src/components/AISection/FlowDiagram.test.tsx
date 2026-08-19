/**
 * FlowDiagram.test.tsx
 *
 * **Feature: portfolio-web-profesional, Property 8: AI flow diagram contains all 7 nodes in order**
 *
 * Property-based test (PBT-8) that verifies: for any rendering of the
 * FlowDiagram component, the rendered DOM SHALL contain exactly 7 nodes in
 * the order: USER, PROMPT, AI, CODE, REVIEW, TEST, DEPLOY — without omitting
 * any node.
 *
 * **Validates: Requirements 6.2**
 */

import { describe, it, afterEach, vi } from 'vitest'
import { expect } from 'vitest'
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import * as fc from 'fast-check'

// ── Framer Motion mock ────────────────────────────────────────────────────────
// Framer Motion's animation hooks don't work in jsdom — render children directly.

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
  }

  const forwardAs = (Tag: keyof React.JSX.IntrinsicElements) =>
    React.forwardRef(
      (
        {
          children,
          className,
          style,
          id,
          role,
          'aria-label': ariaLabel,
          'data-testid': testId,
        }: MotionProps & { 'data-testid'?: string },
        ref: React.Ref<HTMLElement>
      ) =>
        React.createElement(
          Tag as string,
          {
            ref,
            className,
            style,
            id,
            role,
            'aria-label': ariaLabel,
            'data-testid': testId,
          },
          children
        )
    )

  return {
    motion: {
      div:     forwardAs('div'),
      section: forwardAs('section'),
      article: forwardAs('article'),
      header:  forwardAs('header'),
      li:      forwardAs('li'),
      ul:      forwardAs('ul'),
      p:       forwardAs('p'),
      span:    forwardAs('span'),
      h1:      forwardAs('h1'),
      h2:      forwardAs('h2'),
      h3:      forwardAs('h3'),
      blockquote: forwardAs('blockquote'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

// ── Import component and constants AFTER mocks ────────────────────────────────
import { FlowDiagram, FLOW_NODES } from './FlowDiagram'

// ── Cleanup ───────────────────────────────────────────────────────────────────

afterEach(() => cleanup())

// ── Expected node sequence ────────────────────────────────────────────────────

const EXPECTED_NODES = ['USER', 'PROMPT', 'AI', 'CODE', 'REVIEW', 'TEST', 'DEPLOY'] as const

// ─── Unit tests ───────────────────────────────────────────────────────────────

describe('FlowDiagram — unit: static correctness', () => {
  it('FLOW_NODES constant exports exactly 7 nodes', () => {
    expect(FLOW_NODES).toHaveLength(7)
  })

  it('FLOW_NODES constant contains exactly the 7 expected node IDs in order', () => {
    const ids = FLOW_NODES.map((n) => n.id)
    expect(ids).toEqual(EXPECTED_NODES)
  })

  it('renders without throwing', () => {
    expect(() => render(<FlowDiagram />)).not.toThrow()
  })

  it('renders all 7 node labels in the DOM', () => {
    const { container } = render(<FlowDiagram />)

    for (const nodeLabel of EXPECTED_NODES) {
      // Each node carries a data-testid="flow-node-{LABEL}"
      const el = container.querySelector(`[data-testid="flow-node-${nodeLabel}"]`)
      expect(el, `Node "${nodeLabel}" should be in the DOM`).not.toBeNull()
    }
  })

  it('renders nodes in the correct visual order', () => {
    const { container } = render(<FlowDiagram />)

    const nodeElements = EXPECTED_NODES.map((label) =>
      container.querySelector(`[data-testid="flow-node-${label}"]`)
    )

    // All nodes must be present
    nodeElements.forEach((el, i) => {
      expect(el, `Node at index ${i} (${EXPECTED_NODES[i]}) must exist`).not.toBeNull()
    })

    // Verify DOM order: each node must appear after the previous one
    for (let i = 1; i < nodeElements.length; i++) {
      const prev = nodeElements[i - 1]!
      const curr = nodeElements[i]!
      // Node.compareDocumentPosition: DOCUMENT_POSITION_FOLLOWING = 4
      const position = prev.compareDocumentPosition(curr)
      expect(
        position & Node.DOCUMENT_POSITION_FOLLOWING,
        `Node "${EXPECTED_NODES[i]}" must appear after "${EXPECTED_NODES[i - 1]}" in the DOM`
      ).toBeTruthy()
    }
  })

  it('renders exactly 6 arrow connectors (one between each adjacent pair)', () => {
    const { container } = render(<FlowDiagram />)
    const arrows = container.querySelectorAll('.flow-diagram__arrow')
    // 7 nodes → 6 connectors
    expect(arrows).toHaveLength(6)
  })
})

// ─── PBT-8: AI flow diagram contains all 7 nodes in order ────────────────────

describe('FlowDiagram — PBT-8: all 7 nodes present and in order for any render (Property 8)', () => {
  /**
   * **Feature: portfolio-web-profesional, Property 8: AI flow diagram contains all 7 nodes in order**
   *
   * For ANY rendering of the FlowDiagram component, the flow diagram SHALL
   * contain exactly the 7 nodes in order: USER, PROMPT, AI, CODE, REVIEW,
   * TEST, DEPLOY — without omitting any node.
   *
   * The property is verified over 100 independent render/cleanup cycles to
   * confirm the component is deterministic and never partially renders.
   *
   * **Validates: Requirements 6.2**
   */
  it(
    'always renders all 7 nodes (USER, PROMPT, AI, CODE, REVIEW, TEST, DEPLOY) in the correct order',
    () => {
      // Arbitrary: a simple unit value — we just need to run the test 100 times
      // since FlowDiagram takes no props. fast-check still drives the iteration.
      fc.assert(
        fc.property(fc.constant(null), (_) => {
          cleanup()
          const { container } = render(<FlowDiagram />)

          // 1. Exactly 7 node elements must exist
          const allNodes = container.querySelectorAll('[data-testid^="flow-node-"]')
          expect(allNodes).toHaveLength(7)

          // 2. Each expected node must be present
          const renderedIds = Array.from(allNodes).map(
            (el) => el.getAttribute('data-testid')!.replace('flow-node-', '')
          )

          for (const expected of EXPECTED_NODES) {
            expect(
              renderedIds,
              `Node "${expected}" must be present in every render`
            ).toContain(expected)
          }

          // 3. Nodes must appear in the exact prescribed order
          expect(renderedIds).toEqual([...EXPECTED_NODES])

          // 4. DOM order must match logical order
          const nodeEls = EXPECTED_NODES.map((label) =>
            container.querySelector(`[data-testid="flow-node-${label}"]`)!
          )

          for (let i = 1; i < nodeEls.length; i++) {
            const position = nodeEls[i - 1].compareDocumentPosition(nodeEls[i])
            expect(
              position & Node.DOCUMENT_POSITION_FOLLOWING,
              `"${EXPECTED_NODES[i]}" must follow "${EXPECTED_NODES[i - 1]}" in the DOM`
            ).toBeTruthy()
          }
        }),
        { numRuns: 100 }
      )
    }
  )

  /**
   * **Feature: portfolio-web-profesional, Property 8: AI flow diagram contains all 7 nodes in order**
   *
   * The set of rendered node labels is invariant under repeated renders —
   * no node is added, removed, or duplicated across iterations.
   *
   * **Validates: Requirements 6.2**
   */
  it('never renders more or fewer than exactly 7 nodes across repeated renders', () => {
    fc.assert(
      fc.property(fc.constant(null), (_) => {
        cleanup()
        const { container } = render(<FlowDiagram />)

        const allNodes = container.querySelectorAll('[data-testid^="flow-node-"]')
        expect(allNodes).toHaveLength(7)

        // No duplicates
        const ids = Array.from(allNodes).map(
          (el) => el.getAttribute('data-testid')!.replace('flow-node-', '')
        )
        const unique = new Set(ids)
        expect(unique.size).toBe(7)
      }),
      { numRuns: 100 }
    )
  })
})
