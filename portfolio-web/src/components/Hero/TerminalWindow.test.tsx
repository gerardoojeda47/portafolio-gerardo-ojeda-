/**
 * TerminalWindow.test.tsx
 *
 * Unit and property-based tests for the TerminalWindow component.
 *
 * Validates: Requirements 3.2
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import * as fc from 'fast-check'
import { TerminalWindow, TERMINAL_COMMANDS, type TerminalCommand } from './TerminalWindow'

// ── Mocks ─────────────────────────────────────────────────────────────────────

// Framer Motion doesn't work well in jsdom — mock it to render children directly
vi.mock('framer-motion', async () => {
  const React = await import('react')
  return {
    motion: {
      div: React.forwardRef(
        (
          { children, className, role, 'aria-label': ariaLabel }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode },
          ref: React.Ref<HTMLDivElement>
        ) => (
          <div ref={ref} className={className} role={role} aria-label={ariaLabel}>
            {children}
          </div>
        )
      ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

afterEach(() => cleanup())

// ── Unit tests ────────────────────────────────────────────────────────────────

describe('TerminalWindow — unit', () => {
  it('renders the title bar with the correct prompt text', () => {
    const { container } = render(<TerminalWindow />)
    const titlebar = container.querySelector('.terminal-window__titlebar')
    expect(titlebar).not.toBeNull()
    expect(titlebar?.textContent).toContain('gerardo@portfolio:~')
  })

  it('renders three traffic-light dots', () => {
    const { container } = render(<TerminalWindow />)
    const dots = container.querySelectorAll('.terminal-window__dot')
    expect(dots).toHaveLength(3)
  })

  it('has role="region" with accessible label', () => {
    const { container } = render(<TerminalWindow />)
    const region = container.querySelector('[role="region"]')
    expect(region).not.toBeNull()
    expect(region?.getAttribute('aria-label')).toBe('Interactive terminal')
  })

  it('has a log region with aria-live="polite"', () => {
    const { container } = render(<TerminalWindow />)
    const log = container.querySelector('[role="log"][aria-live="polite"]')
    expect(log).not.toBeNull()
  })

  it('renders the terminal-window CSS class and glass-card class', () => {
    const { container } = render(<TerminalWindow />)
    const el = container.firstElementChild
    expect(el?.classList.contains('terminal-window')).toBe(true)
    expect(el?.classList.contains('glass-card')).toBe(true)
  })

  it('accepts custom commands prop without throwing', () => {
    const customCmds: TerminalCommand[] = [
      { command: 'hello', output: ['world'] },
    ]
    expect(() => render(<TerminalWindow commands={customCmds} />)).not.toThrow()
  })

  it('accepts an additional className prop', () => {
    const { container } = render(<TerminalWindow className="my-custom-class" />)
    expect(container.firstElementChild?.classList.contains('my-custom-class')).toBe(true)
  })
})

// ── Data integrity tests ──────────────────────────────────────────────────────

describe('TERMINAL_COMMANDS — data integrity', () => {
  it('contains exactly three commands: whoami, stack, status', () => {
    expect(TERMINAL_COMMANDS).toHaveLength(3)
    expect(TERMINAL_COMMANDS[0].command).toBe('whoami')
    expect(TERMINAL_COMMANDS[1].command).toBe('stack')
    expect(TERMINAL_COMMANDS[2].command).toBe('status')
  })

  it('whoami output contains name, title, and specialties', () => {
    const whoami = TERMINAL_COMMANDS[0]
    const combined = whoami.output.join('\n')
    expect(combined).toContain('Gerardo Ojeda Riascos')
    expect(combined).toContain('Software Developer Jr.')
    expect(combined).toContain('Mobile')
  })

  it('stack output contains key technologies', () => {
    const stack = TERMINAL_COMMANDS[1]
    const combined = stack.output.join('\n')
    expect(combined).toContain('Flutter')
    expect(combined).toContain('React')
    expect(combined).toContain('Node.js')
    expect(combined).toContain('TypeScript')
    expect(combined).toContain('Supabase')
    expect(combined).toContain('PostgreSQL')
  })

  it('status output lines start with ">"', () => {
    const status = TERMINAL_COMMANDS[2]
    status.output.forEach((line) => {
      expect(line.trim().startsWith('>')).toBe(true)
    })
  })

  it('every command has a non-empty command string and at least one output line', () => {
    TERMINAL_COMMANDS.forEach((cmd) => {
      expect(cmd.command.trim().length).toBeGreaterThan(0)
      expect(cmd.output.length).toBeGreaterThan(0)
      cmd.output.forEach((line) => {
        expect(line.trim().length).toBeGreaterThan(0)
      })
    })
  })
})

// ── PBT: TerminalCommand structure ────────────────────────────────────────────

describe('TerminalWindow — PBT: command structure (Requirement 3.2)', () => {
  /**
   * **Feature: portfolio-web-profesional, Property 3.2: Terminal commands are valid**
   *
   * For any array of TerminalCommand objects, every command must have a
   * non-empty command string and at least one non-empty output line.
   *
   * **Validates: Requirements 3.2**
   */
  it('any valid TerminalCommand array has non-empty commands and outputs', () => {
    const commandArb = fc.record({
      command: fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0),
      output: fc.array(
        fc.string({ minLength: 1, maxLength: 80 }).filter((s) => s.trim().length > 0),
        { minLength: 1, maxLength: 10 }
      ),
    })

    const commandsArb = fc.array(commandArb, { minLength: 1, maxLength: 5 })

    fc.assert(
      fc.property(commandsArb, (commands) => {
        // Each command must have a non-empty command string
        commands.forEach((cmd) => {
          expect(cmd.command.trim().length).toBeGreaterThan(0)
          // Each must have at least one output line
          expect(cmd.output.length).toBeGreaterThan(0)
          // Each output line must be non-empty
          cmd.output.forEach((line) => {
            expect(line.trim().length).toBeGreaterThan(0)
          })
        })

        // The component must not throw when rendered with these commands
        expect(() => {
          const { unmount } = render(<TerminalWindow commands={commands} />)
          unmount()
        }).not.toThrow()
      }),
      { numRuns: 100 }
    )
  })

  /**
   * **Feature: portfolio-web-profesional, Property 3.2: Terminal displays correct commands**
   *
   * The canonical TERMINAL_COMMANDS array always contains the three required
   * commands in the correct sequence: whoami → stack → status.
   *
   * **Validates: Requirements 3.2**
   */
  it('canonical commands always appear in the required order', () => {
    const requiredOrder = ['whoami', 'stack', 'status']

    // Property: any permutation check — the real data should always be in order
    fc.assert(
      fc.property(fc.constant(TERMINAL_COMMANDS), (cmds) => {
        requiredOrder.forEach((name, idx) => {
          expect(cmds[idx].command).toBe(name)
        })
      }),
      { numRuns: 10 }
    )
  })
})
