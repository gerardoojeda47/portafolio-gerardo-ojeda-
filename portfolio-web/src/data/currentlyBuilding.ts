/**
 * currentlyBuilding.ts — "Currently Building" section data
 * Validates: Requirements 1.1
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type BuildingColor = 'blue' | 'violet' | 'cyan'

export interface BuildingItem {
  id: string
  icon: string         // emoji
  label: string
  description: string
  color: BuildingColor
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const BUILDING_ITEM_COUNT = 4

// ─── Data ─────────────────────────────────────────────────────────────────────

export const buildingItems: BuildingItem[] = [
  {
    id: 'marketplace',
    icon: '🚧',
    label: 'Marketplace de Servicios',
    description: 'Plataforma que conecta clientes con trabajadores independientes para servicios del hogar y oficina con tres roles diferenciados.',
    color: 'blue',
  },
  {
    id: 'ai-automation',
    icon: '🤖',
    label: 'AI Automation',
    description: 'Flujos de automatización con inteligencia artificial para optimizar procesos repetitivos y mejorar la productividad.',
    color: 'violet',
  },
  {
    id: 'flutter',
    icon: '📱',
    label: 'Flutter Applications',
    description: 'Aplicaciones móviles multiplataforma con Flutter y Dart, diseño nativo para iOS y Android.',
    color: 'cyan',
  },
  {
    id: 'fullstack',
    icon: '🌐',
    label: 'Fullstack Web Applications',
    description: 'Aplicaciones web completas con React, Node.js y bases de datos relacionales enfocadas en rendimiento y escalabilidad.',
    color: 'blue',
  },
]

// ─── Validation ───────────────────────────────────────────────────────────────

const VALID_COLORS: BuildingColor[] = ['blue', 'violet', 'cyan']

/**
 * Validates a single BuildingItem has all required non-empty fields
 * and a valid color value.
 */
export function validateBuildingItem(item: BuildingItem): boolean {
  if (!item.id || item.id.trim().length === 0) return false
  if (!item.icon || item.icon.trim().length === 0) return false
  if (!item.label || item.label.trim().length === 0) return false
  if (!item.description || item.description.trim().length === 0) return false
  if (!VALID_COLORS.includes(item.color)) return false
  return true
}

/**
 * Validates the full buildingItems array:
 * - Must contain exactly BUILDING_ITEM_COUNT items
 * - Every item must pass validateBuildingItem
 * Validates: Requirements 1.1
 */
export function validateBuildingItems(items: BuildingItem[]): boolean {
  if (items.length !== BUILDING_ITEM_COUNT) return false
  return items.every(validateBuildingItem)
}
