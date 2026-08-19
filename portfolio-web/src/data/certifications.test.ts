/**
 * **Feature: portfolio-web-profesional, Property 2: Certifications count = exactly 5**
 * Validates: Requirements 1.3, 10.1, 10.2, 10.3
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import {
  certifications,
  education,
  validateCertification,
  REQUIRED_CERTIFICATION_COUNT,
  type Certification,
} from './certifications'

// ---------------------------------------------------------------------------
// Unit tests — real data
// ---------------------------------------------------------------------------

describe('certifications data — real data', () => {
  it('exports exactly 5 certification entries', () => {
    expect(certifications).toHaveLength(REQUIRED_CERTIFICATION_COUNT)
    expect(certifications).toHaveLength(5)
  })

  it('exports exactly 2 education entries', () => {
    expect(education).toHaveLength(2)
  })

  it('every certification passes validateCertification', () => {
    certifications.forEach((cert) => {
      expect(validateCertification(cert)).toBe(true)
    })
  })

  it('REQUIRED_CERTIFICATION_COUNT constant equals 5', () => {
    expect(REQUIRED_CERTIFICATION_COUNT).toBe(5)
  })
})

// ---------------------------------------------------------------------------
// Helper: arbitrary for a valid Certification
// Non-blank string: guaranteed to have at least one non-whitespace character.
// fast-check v4 dropped fc.char() — we use fc.string() and append a
// visible ASCII character so the trimmed result is never empty.
// ---------------------------------------------------------------------------

/** Produces strings that are non-empty after trimming (at least one printable char). */
const nonBlankString = (maxLength = 80) =>
  fc.tuple(
    // A single visible ASCII letter (codes 33–126 — no whitespace)
    fc.integer({ min: 33, max: 126 }).map((code) => String.fromCharCode(code)),
    fc.string({ maxLength: maxLength - 1 }),
  ).map(([visible, rest]) => visible + rest)

const validCertificationArb = fc.record<Certification>({
  id: nonBlankString(40),
  title: nonBlankString(80),
  issuer: nonBlankString(80),
  date: nonBlankString(30),
  hours: fc.integer({ min: 1, max: 1000 }),
})

/** Returns true only when the array has exactly REQUIRED_CERTIFICATION_COUNT valid entries. */
function validateCertificationCount(arr: Certification[]): boolean {
  return arr.length === REQUIRED_CERTIFICATION_COUNT && arr.every(validateCertification)
}

// ---------------------------------------------------------------------------
// PBT-2 — Property tests
// ---------------------------------------------------------------------------

describe('PBT-2 — certifications count validation', () => {
  /**
   * **Feature: portfolio-web-profesional, Property 2: Certifications count = exactly 5**
   * Validates: Requirements 10.2, 10.3
   *
   * Property: an array whose length is NOT 5 MUST always be rejected
   * (even if every individual certification entry is otherwise valid).
   */
  it('rejects any array with length !== 5 (100 iterations)', () => {
    fc.assert(
      fc.property(
        // Flat-map: pick a length != 5, then generate exactly that many valid certs
        fc.integer({ min: 0, max: 20 })
          .filter((n) => n !== REQUIRED_CERTIFICATION_COUNT)
          .chain((len) =>
            fc.array(validCertificationArb, { minLength: len, maxLength: len }),
          ),
        (arr) => validateCertificationCount(arr) === false,
      ),
      { numRuns: 100 },
    )
  })

  /**
   * **Feature: portfolio-web-profesional, Property 2: Certifications count = exactly 5**
   * Validates: Requirements 10.2, 10.3
   *
   * Property: an array with exactly 5 valid certifications MUST always pass the count validation.
   */
  it('accepts any array with exactly 5 valid certifications (100 iterations)', () => {
    fc.assert(
      fc.property(
        fc.array(validCertificationArb, { minLength: 5, maxLength: 5 }),
        (arr) => validateCertificationCount(arr) === true,
      ),
      { numRuns: 100 },
    )
  })
})
