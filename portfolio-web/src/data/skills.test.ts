/**
 * skills.test.ts — Data integrity tests for skills.ts
 *
 * **Feature: portfolio-web-profesional, Property 1: Data integrity — all data items have required non-empty fields and valid enum values**
 * Validates: Requirements 5.2
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { skills, type SkillTier, type SkillCategory } from '@/data/skills'

// ─── Valid enum values ────────────────────────────────────────────────────────

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

// ─── Schema validation helper ─────────────────────────────────────────────────

interface SkillLike {
  name: unknown
  category: unknown
  tier: unknown
}

function validateSkill(skill: SkillLike): boolean {
  if (typeof skill.name !== 'string' || skill.name.trim().length === 0) return false
  if (!VALID_CATEGORIES.includes(skill.category as SkillCategory)) return false
  if (!VALID_TIERS.includes(skill.tier as SkillTier)) return false
  return true
}

// ─── Real data tests ──────────────────────────────────────────────────────────

describe('skills real data integrity', () => {
  it('should have at least one skill entry', () => {
    expect(skills.length).toBeGreaterThan(0)
  })

  it('every skill has a non-empty name', () => {
    for (const skill of skills) {
      expect(skill.name, `skill name should not be empty`).toBeTruthy()
      expect(skill.name.trim().length, `skill "${skill.name}" name is blank`).toBeGreaterThan(0)
    }
  })

  it('every skill has a valid category', () => {
    for (const skill of skills) {
      expect(
        VALID_CATEGORIES,
        `skill "${skill.name}" has invalid category "${skill.category}"`,
      ).toContain(skill.category)
    }
  })

  it('every skill has a valid tier', () => {
    for (const skill of skills) {
      expect(
        VALID_TIERS,
        `skill "${skill.name}" has invalid tier "${skill.tier}"`,
      ).toContain(skill.tier)
    }
  })
})

// ─── Property-based tests ─────────────────────────────────────────────────────

/**
 * **Feature: portfolio-web-profesional, Property 1: Data integrity — all data items have required non-empty fields and valid enum values**
 * Validates: Requirements 5.2
 */
describe('PBT-1 — skills data integrity (fast-check)', () => {
  // Arbitrary for valid tiers
  const validTierArb = fc.constantFrom<SkillTier>(...VALID_TIERS)
  const validCategoryArb = fc.constantFrom<SkillCategory>(...VALID_CATEGORIES)

  it('rejects skill objects with an invalid tier', () => {
    // Arbitrary for strings that are NOT valid tiers
    const invalidTierArb = fc
      .string({ minLength: 1 })
      .filter((s) => !(VALID_TIERS as string[]).includes(s))

    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),   // non-empty name
        validCategoryArb,
        invalidTierArb,
        (name, category, invalidTier) => {
          const skill: SkillLike = { name, category, tier: invalidTier }
          return validateSkill(skill) === false
        },
      ),
      { numRuns: 100 },
    )
  })

  it('rejects skill objects with an empty name', () => {
    fc.assert(
      fc.property(
        validCategoryArb,
        validTierArb,
        (category, tier) => {
          const skillWithEmptyName: SkillLike = { name: '', category, tier }
          return validateSkill(skillWithEmptyName) === false
        },
      ),
      { numRuns: 100 },
    )
  })

  it('accepts skill objects with all valid fields', () => {
    // Generate names that are non-empty after trimming (at least one visible char)
    const nonBlankNameArb = fc
      .string({ minLength: 1 })
      .filter((s) => s.trim().length > 0)

    fc.assert(
      fc.property(
        nonBlankNameArb,
        validCategoryArb,
        validTierArb,
        (name, category, tier) => {
          const skill: SkillLike = { name, category, tier }
          return validateSkill(skill) === true
        },
      ),
      { numRuns: 100 },
    )
  })
})
