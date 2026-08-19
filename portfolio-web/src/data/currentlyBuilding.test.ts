/**
 * currentlyBuilding.test.ts — Data integrity tests for currentlyBuilding.ts
 *
 * **Feature: portfolio-enhancements, Property 1: Currently Building items count = exactly 4**
 * Validates: Requirements 1.1
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import {
  buildingItems,
  validateBuildingItems,
  validateBuildingItem,
  BUILDING_ITEM_COUNT,
  type BuildingItem,
  type BuildingColor,
} from '@/data/currentlyBuilding'

const VALID_COLORS: BuildingColor[] = ['blue', 'violet', 'cyan']

// ─── Unit: real data ──────────────────────────────────────────────────────────

describe('buildingItems real data', () => {
  it('exports exactly 4 items', () => {
    expect(buildingItems).toHaveLength(BUILDING_ITEM_COUNT)
  })

  it('passes validateBuildingItems', () => {
    expect(validateBuildingItems(buildingItems)).toBe(true)
  })

  it('contains the four required labels', () => {
    const labels = buildingItems.map((i) => i.label)
    expect(labels).toContain('Marketplace de Servicios')
    expect(labels).toContain('AI Automation')
    expect(labels).toContain('Flutter Applications')
    expect(labels).toContain('Fullstack Web Applications')
  })
})

// ─── Property-based tests ─────────────────────────────────────────────────────

/**
 * **Feature: portfolio-enhancements, Property 1: Currently Building items count = exactly 4**
 * Validates: Requirements 1.1
 */
describe('PBT-1 — validateBuildingItems count property (fast-check)', () => {
  // Arbitrary for a valid BuildingItem
  const validColorArb = fc.constantFrom<BuildingColor>(...VALID_COLORS)
  const nonBlankArb = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)

  const validItemArb: fc.Arbitrary<BuildingItem> = fc.record({
    id: nonBlankArb,
    icon: nonBlankArb,
    label: nonBlankArb,
    description: nonBlankArb,
    color: validColorArb,
  })

  it('rejects arrays with fewer than 4 valid items', () => {
    // Arrays of 0..3 items
    fc.assert(
      fc.property(
        fc.array(validItemArb, { minLength: 0, maxLength: 3 }),
        (items) => validateBuildingItems(items) === false,
      ),
      { numRuns: 100 },
    )
  })

  it('rejects arrays with more than 4 valid items', () => {
    // Arrays of 5..10 items
    fc.assert(
      fc.property(
        fc.array(validItemArb, { minLength: 5, maxLength: 10 }),
        (items) => validateBuildingItems(items) === false,
      ),
      { numRuns: 100 },
    )
  })

  it('accepts arrays of exactly 4 valid items', () => {
    fc.assert(
      fc.property(
        fc.array(validItemArb, { minLength: 4, maxLength: 4 }),
        (items) => validateBuildingItems(items) === true,
      ),
      { numRuns: 100 },
    )
  })

  it('rejects items with an invalid color', () => {
    const invalidColorArb = fc
      .string({ minLength: 1 })
      .filter((s) => !(VALID_COLORS as string[]).includes(s))

    fc.assert(
      fc.property(
        nonBlankArb,
        nonBlankArb,
        nonBlankArb,
        nonBlankArb,
        invalidColorArb,
        (id, icon, label, description, badColor) => {
          const item = { id, icon, label, description, color: badColor as BuildingColor }
          return validateBuildingItem(item) === false
        },
      ),
      { numRuns: 100 },
    )
  })
})
