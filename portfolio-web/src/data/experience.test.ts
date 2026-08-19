/**
 * experience.test.ts
 *
 * Unit tests + Property-Based Tests for src/data/experience.ts
 *
 * Unit tests: specific examples and edge cases.
 * PBT-5: validates descending chronological order property.
 *
 * **Feature: portfolio-web-profesional, Property 5: Datos de experiencia
 *   cronológicamente ordenados**
 *
 * Validates: Requirements 9.1, 9.2
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import {
  experience,
  validateExperienceEntry,
  isDescendingChronological,
  type ExperienceEntry,
} from './experience'

// ─── Unit Tests ───────────────────────────────────────────────────────────────

describe('experience data', () => {
  it('exports exactly 5 entries', () => {
    expect(experience).toHaveLength(5)
  })

  it('all entries pass validateExperienceEntry', () => {
    for (const entry of experience) {
      expect(validateExperienceEntry(entry)).toBe(true)
    }
  })

  it('entries are in descending chronological order', () => {
    expect(isDescendingChronological(experience)).toBe(true)
  })

  it('most recent entry is Defytek SAS (2025-11)', () => {
    const first = experience[0]
    expect(first.id).toBe('defytek-support-engineer')
    expect(first.startYear).toBe(2025)
    expect(first.startMonth).toBe(11)
  })

  it('oldest entry is Freelance/Independiente (2021-01)', () => {
    const last = experience[experience.length - 1]
    expect(last.id).toBe('freelance-domiciliario')
    expect(last.startYear).toBe(2021)
    expect(last.startMonth).toBe(1)
  })

  it('every entry has at least one responsibility', () => {
    for (const entry of experience) {
      expect(entry.responsibilities.length).toBeGreaterThan(0)
    }
  })

  it('employment types are only valid enum values', () => {
    const validTypes = new Set(['full-time', 'part-time', 'internship', 'contract', 'freelance'])
    for (const entry of experience) {
      expect(validTypes.has(entry.type)).toBe(true)
    }
  })

  it('startMonth is in 1-12 range for all entries', () => {
    for (const entry of experience) {
      expect(entry.startMonth).toBeGreaterThanOrEqual(1)
      expect(entry.startMonth).toBeLessThanOrEqual(12)
    }
  })
})

describe('validateExperienceEntry', () => {
  it('returns true for a complete entry', () => {
    const entry: ExperienceEntry = {
      id: 'test',
      company: 'ACME',
      role: 'Engineer',
      period: '2024 – 2025',
      duration: '1 año',
      type: 'full-time',
      responsibilities: ['Task 1'],
      startYear: 2024,
      startMonth: 1,
    }
    expect(validateExperienceEntry(entry)).toBe(true)
  })

  it('returns false when company is empty', () => {
    const entry: ExperienceEntry = {
      id: 'test',
      company: '',
      role: 'Engineer',
      period: '2024 – 2025',
      duration: '1 año',
      type: 'full-time',
      responsibilities: [],
      startYear: 2024,
      startMonth: 1,
    }
    expect(validateExperienceEntry(entry)).toBe(false)
  })

  it('returns false when role is whitespace only', () => {
    const entry: ExperienceEntry = {
      id: 'test',
      company: 'ACME',
      role: '   ',
      period: '2024',
      duration: '1 mes',
      type: 'contract',
      responsibilities: [],
      startYear: 2024,
      startMonth: 3,
    }
    expect(validateExperienceEntry(entry)).toBe(false)
  })

  it('returns false when period is empty', () => {
    const entry: ExperienceEntry = {
      id: 'test',
      company: 'ACME',
      role: 'Dev',
      period: '',
      duration: '1 mes',
      type: 'freelance',
      responsibilities: [],
      startYear: 2023,
      startMonth: 5,
    }
    expect(validateExperienceEntry(entry)).toBe(false)
  })
})

describe('isDescendingChronological', () => {
  it('returns true for an empty array', () => {
    expect(isDescendingChronological([])).toBe(true)
  })

  it('returns true for a single entry', () => {
    expect(isDescendingChronological([experience[0]])).toBe(true)
  })

  it('returns false when two consecutive entries are out of order', () => {
    const older: ExperienceEntry = { ...experience[1], startYear: 2020, startMonth: 1 }
    const newer: ExperienceEntry = { ...experience[0], startYear: 2023, startMonth: 6 }
    // Putting older before newer → NOT descending
    expect(isDescendingChronological([older, newer])).toBe(false)
  })

  it('returns true when entries have equal sort keys (same YYYYMM)', () => {
    const a: ExperienceEntry = { ...experience[0], startYear: 2024, startMonth: 6 }
    const b: ExperienceEntry = { ...experience[1], startYear: 2024, startMonth: 6 }
    expect(isDescendingChronological([a, b])).toBe(true)
  })
})

// ─── Property-Based Tests ─────────────────────────────────────────────────────

/**
 * **Feature: portfolio-web-profesional, Property 5: Datos de experiencia
 * cronológicamente ordenados**
 *
 * For any array of ExperienceEntry sorted in descending order by
 * (startYear, startMonth), isDescendingChronological SHALL return true.
 *
 * Validates: Requirements 9.1
 */
describe('PBT-5 — Experience order property', () => {
  // Arbitrary for a single ExperienceEntry
  const entryArb = fc.record<ExperienceEntry>({
    id: fc.stringMatching(/^[a-f0-9]{4,12}$/),
    company: fc.stringMatching(/^[A-Za-z0-9 .,/&-]{1,60}$/),
    role: fc.stringMatching(/^[A-Za-z0-9 .,/-]{1,60}$/),
    period: fc.stringMatching(/^[A-Za-z0-9 –-]{1,40}$/),
    duration: fc.stringMatching(/^[A-Za-z0-9 ]{1,30}$/),
    type: fc.constantFrom('full-time', 'part-time', 'internship', 'contract', 'freelance'),
    responsibilities: fc.array(fc.stringMatching(/^[A-Za-z0-9 .,]{1,60}$/), { minLength: 1, maxLength: 8 }),
    highlight: fc.option(fc.stringMatching(/^[A-Za-z0-9 .,/-]{1,80}$/), { nil: undefined }),
    startYear: fc.integer({ min: 2000, max: 2030 }),
    startMonth: fc.integer({ min: 1, max: 12 }),
  })

  it('any array sorted descending passes isDescendingChronological', () => {
    fc.assert(
      fc.property(fc.array(entryArb, { minLength: 0, maxLength: 10 }), (entries) => {
        // Sort descending by YYYYMM
        const sorted = [...entries].sort(
          (a, b) => (b.startYear * 100 + b.startMonth) - (a.startYear * 100 + a.startMonth)
        )
        return isDescendingChronological(sorted) === true
      }),
      { numRuns: 200 }
    )
  })

  it('any unsorted array with at least 2 distinct dates fails isDescendingChronological when reversed', () => {
    fc.assert(
      fc.property(
        fc.array(entryArb, { minLength: 2, maxLength: 10 }),
        (entries) => {
          // Sort ascending (oldest first) — should NOT be descending if any two entries differ
          const ascending = [...entries].sort(
            (a, b) => (a.startYear * 100 + a.startMonth) - (b.startYear * 100 + b.startMonth)
          )
          // Only check if there are genuinely different sort keys
          const keys = ascending.map(e => e.startYear * 100 + e.startMonth)
          const hasDistinctKeys = keys[0] < keys[keys.length - 1]
          if (!hasDistinctKeys) return true // trivially ok: all same date
          return isDescendingChronological(ascending) === false
        }
      ),
      { numRuns: 200 }
    )
  })

  it('validateExperienceEntry returns false when any required field is empty', () => {
    const emptyCompany = entryArb.map(e => ({ ...e, company: '' }))
    const emptyRole = entryArb.map(e => ({ ...e, role: '' }))
    const emptyPeriod = entryArb.map(e => ({ ...e, period: '' }))

    fc.assert(
      fc.property(emptyCompany, (entry) => validateExperienceEntry(entry) === false),
      { numRuns: 100 }
    )
    fc.assert(
      fc.property(emptyRole, (entry) => validateExperienceEntry(entry) === false),
      { numRuns: 100 }
    )
    fc.assert(
      fc.property(emptyPeriod, (entry) => validateExperienceEntry(entry) === false),
      { numRuns: 100 }
    )
  })
})
