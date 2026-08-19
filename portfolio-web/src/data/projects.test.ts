/**
 * projects.test.ts — Project status label consistency tests for projects.ts
 *
 * **Feature: portfolio-web-profesional, Property 3: Project status label consistency**
 * Validates: Requirements 7.3
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { projects, validateProject, type Project, type ProjectStatus } from '@/data/projects'

// ─── Constants ────────────────────────────────────────────────────────────────

const FORBIDDEN_WORDS = ['completed', 'terminado']

// ─── Real data tests ──────────────────────────────────────────────────────────

describe('projects real data — status label integrity', () => {
  it('should have at least one project entry', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('no in-progress project has a forbidden statusLabel', () => {
    const inProgressProjects = projects.filter((p) => p.status === 'in-progress')
    for (const project of inProgressProjects) {
      const label = project.statusLabel.toLowerCase()
      for (const forbidden of FORBIDDEN_WORDS) {
        expect(
          label.includes(forbidden),
          `Project "${project.title}" is in-progress but statusLabel contains forbidden word "${forbidden}"`,
        ).toBe(false)
      }
    }
  })

  it('all real projects pass validateProject', () => {
    for (const project of projects) {
      expect(
        validateProject(project),
        `Project "${project.title}" failed validateProject()`,
      ).toBe(true)
    }
  })
})

// ─── Property-based tests ─────────────────────────────────────────────────────

/**
 * **Feature: portfolio-web-profesional, Property 3: Project status label consistency**
 * Validates: Requirements 7.3
 */
describe('PBT-3 — project status label consistency (fast-check)', () => {
  // Base arbitrary for a valid non-empty technology/feature list
  const nonEmptyStringArrayArb = fc.array(fc.string({ minLength: 1 }), { minLength: 1 })

  // Arbitrary for a base valid project (shared fields)
  const baseProjectArb = fc.record({
    id: fc.string({ minLength: 1 }),
    title: fc.string({ minLength: 1 }),
    year: fc.string({ minLength: 1 }),
    description: fc.string({ minLength: 1 }),
    technologies: nonEmptyStringArrayArb,
    features: nonEmptyStringArrayArb,
  })

  it('rejects in-progress projects whose statusLabel contains forbidden word "completed"', () => {
    // Generate statusLabels that include "completed"
    const labelWithCompletedArb = fc
      .tuple(fc.string(), fc.string())
      .map(([prefix, suffix]) => `${prefix}completed${suffix}`)

    fc.assert(
      fc.property(baseProjectArb, labelWithCompletedArb, (base, statusLabel) => {
        const project: Project = {
          ...base,
          status: 'in-progress' as ProjectStatus,
          statusLabel,
        }
        return validateProject(project) === false
      }),
      { numRuns: 100 },
    )
  })

  it('rejects in-progress projects whose statusLabel contains forbidden word "terminado"', () => {
    // Generate statusLabels that include "terminado"
    const labelWithTerminadoArb = fc
      .tuple(fc.string(), fc.string())
      .map(([prefix, suffix]) => `${prefix}terminado${suffix}`)

    fc.assert(
      fc.property(baseProjectArb, labelWithTerminadoArb, (base, statusLabel) => {
        const project: Project = {
          ...base,
          status: 'in-progress' as ProjectStatus,
          statusLabel,
        }
        return validateProject(project) === false
      }),
      { numRuns: 100 },
    )
  })

  it('accepts in-progress projects whose statusLabel contains "desarrollo"', () => {
    // Generate statusLabels that include "desarrollo" but NOT any forbidden word
    const labelWithDesarrolloArb = fc
      .tuple(fc.string(), fc.string())
      .map(([prefix, suffix]) => `${prefix}desarrollo${suffix}`)
      .filter((label) => {
        const lower = label.toLowerCase()
        return !FORBIDDEN_WORDS.some((w) => lower.includes(w))
      })

    fc.assert(
      fc.property(baseProjectArb, labelWithDesarrolloArb, (base, statusLabel) => {
        const project: Project = {
          ...base,
          status: 'in-progress' as ProjectStatus,
          statusLabel,
        }
        return validateProject(project) === true
      }),
      { numRuns: 100 },
    )
  })
})
