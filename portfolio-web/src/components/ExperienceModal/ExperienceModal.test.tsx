/**
 * ExperienceModal.test.tsx
 *
 * Unit tests: modal closes on Escape, closes on outside click, does not render when entry=null
 * PBT: modal displays complete data for any valid ExperienceEntry
 *
 * **Feature: portfolio-enhancements, Property 2: ExperienceModal muestra datos completos**
 * **Validates: Requirements 2.1**
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import * as fc from 'fast-check'
import { ExperienceModal } from './ExperienceModal'
import { type ExperienceEntry } from '@/data/experience'

// ── Framer Motion mock ────────────────────────────────────────────────────────
vi.mock('framer-motion', async () => {
  const React = await import('react')

  type MotionProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
    initial?: unknown
    animate?: unknown
    exit?: unknown
    transition?: unknown
    variants?: unknown
    whileInView?: unknown
    viewport?: unknown
  }

  const stripMotion = (props: MotionProps) => {
    const { initial: _i, animate: _a, exit: _e, transition: _t, variants: _v, whileInView: _w, viewport: _vp, ...rest } = props
    return rest
  }

  const forwardAs = (Tag: keyof React.JSX.IntrinsicElements) =>
    React.forwardRef((props: MotionProps, ref: React.Ref<HTMLElement>) =>
      React.createElement(Tag as string, { ref, ...stripMotion(props) }),
    )

  return {
    motion: {
      div: forwardAs('div'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

afterEach(() => cleanup())

// ── Sample entry ──────────────────────────────────────────────────────────────

const sampleEntry: ExperienceEntry = {
  id: 'test-entry',
  company: 'Acme Corp',
  role: 'Senior Developer',
  period: 'Jan 2023 – Dec 2023',
  duration: '1 año',
  type: 'full-time',
  startYear: 2023,
  startMonth: 1,
  responsibilities: ['Built features', 'Reviewed PRs', 'Mentored juniors'],
  highlight: 'Led the platform migration project',
}

// ── Unit tests ────────────────────────────────────────────────────────────────

describe('ExperienceModal — unit tests', () => {
  it('does not render content when entry is null', () => {
    render(<ExperienceModal entry={null} onClose={() => {}} />)
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })

  it('renders the modal with company, role, period, and responsibilities when entry is provided', () => {
    render(<ExperienceModal entry={sampleEntry} onClose={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    expect(screen.getByText('Senior Developer')).toBeInTheDocument()
    expect(screen.getByText('Jan 2023 – Dec 2023')).toBeInTheDocument()
    expect(screen.getByText('Built features')).toBeInTheDocument()
  })

  it('renders the highlight when present', () => {
    render(<ExperienceModal entry={sampleEntry} onClose={() => {}} />)
    expect(screen.getByText('Led the platform migration project')).toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    render(<ExperienceModal entry={sampleEntry} onClose={onClose} />)
    const backdrop = document.querySelector('.experience-modal-backdrop') as HTMLElement
    fireEvent.keyDown(backdrop, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when clicking the backdrop (outside the modal)', () => {
    const onClose = vi.fn()
    render(<ExperienceModal entry={sampleEntry} onClose={onClose} />)
    const backdrop = document.querySelector('.experience-modal-backdrop') as HTMLElement
    // simulate click directly on the backdrop element (not on the modal itself)
    fireEvent.click(backdrop, { target: backdrop })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when clicking the close button', () => {
    const onClose = vi.fn()
    render(<ExperienceModal entry={sampleEntry} onClose={onClose} />)
    const closeBtn = screen.getByRole('button', { name: /cerrar modal/i })
    fireEvent.click(closeBtn)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('sets aria-modal and role="dialog" for accessibility', () => {
    render(<ExperienceModal entry={sampleEntry} onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'experience-modal-title')
  })
})

// ── Property-based test ───────────────────────────────────────────────────────

/**
 * **Feature: portfolio-enhancements, Property 2: ExperienceModal muestra datos completos**
 * **Validates: Requirements 2.1**
 *
 * For any valid ExperienceEntry, when the modal is rendered with that entry,
 * the DOM SHALL contain the company name, role title, period, and at least
 * one responsibility.
 */
describe('ExperienceModal — PBT Property 2', () => {
  // Generates strings that are non-empty and contain at least one visible character
  const visibleString = (max = 60) =>
    fc.string({ minLength: 1, maxLength: max }).filter((s) => s.trim().length > 0 && /\S/.test(s[0]))

  const entryArbitrary = fc.record<ExperienceEntry>({
    id: visibleString(30),
    company: visibleString(60),
    role: visibleString(60),
    period: visibleString(40),
    duration: visibleString(20),
    type: fc.constantFrom('full-time', 'part-time', 'internship', 'contract', 'freelance') as fc.Arbitrary<ExperienceEntry['type']>,
    startYear: fc.integer({ min: 2000, max: 2030 }),
    startMonth: fc.integer({ min: 1, max: 12 }),
    responsibilities: fc.array(visibleString(100), { minLength: 1, maxLength: 8 }),
    highlight: fc.option(visibleString(120), { nil: undefined }),
  })

  it('property: modal always shows company, role, period, and at least one responsibility', () => {
    fc.assert(
      fc.property(entryArbitrary, (entry) => {
        const { unmount } = render(
          <ExperienceModal entry={entry} onClose={() => {}} />,
        )

        const dialog = document.body.querySelector('[role="dialog"]')
        if (!dialog) { unmount(); return false }

        const text = dialog.textContent ?? ''

        const hasCompany = text.includes(entry.company)
        const hasRole = text.includes(entry.role)
        const hasPeriod = text.includes(entry.period)
        const hasResponsibility = entry.responsibilities.some((r) => text.includes(r))

        unmount()
        return hasCompany && hasRole && hasPeriod && hasResponsibility
      }),
      { numRuns: 100 },
    )
  })
})
