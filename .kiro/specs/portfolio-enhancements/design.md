# Design Document — Portfolio Enhancements

## Overview

Este documento cubre las mejoras al portafolio existente. La base ya está construida (React 18 + TypeScript + Vite + Framer Motion + Lucide React). Las mejoras se integran como nuevos componentes y refinamientos CSS sobre la arquitectura existente, sin romper los 89 tests actuales.

---

## Architecture

```
Existing App.tsx
  ├── Navbar (existing)
  ├── Hero (existing + code fragments enhancement)
  ├── About (existing)
  ├── TechStack (existing)
  ├── AISection (existing)
  ├── Projects (existing)
  ├── EngineeringSection (existing)
  ├── Experience (existing → click opens ExperienceModal)
  ├── CurrentlyBuilding ← NEW
  ├── GitHubSection ← NEW
  ├── Certifications (existing)
  ├── Contact (existing)
  ├── Footer (existing)
  ├── BackToTop (existing)
  └── CustomCursor ← NEW (rendered at App root, outside sections)

ExperienceModal ← NEW (rendered via portal at document.body)
```

**Data flow:** Los nuevos componentes consumen datos de `src/data/` existentes. `CurrentlyBuilding` usa datos hardcodeados (4 items estáticos). `GitHubSection` usa la URL del perfil hardcodeada.

---

## Components and Interfaces

### CustomCursor
- Renderizado en `App.tsx` fuera del flujo de secciones
- Un `<div>` absolutamente posicionado que sigue el mouse via `mousemove`
- Detección de hover sobre `a`, `button`, `[role="button"]` para cambiar apariencia
- Oculto en `@media (pointer: coarse)` — dispositivos touch
- Sin render si `prefers-reduced-motion: reduce`
- Usa `pointer-events: none` para no interferir con clicks

```typescript
// src/components/CustomCursor/CustomCursor.tsx
export function CustomCursor()
```

### ExperienceModal
- Portal renderizado en `document.body` via `ReactDOM.createPortal`
- Recibe `entry: ExperienceEntry | null` y `onClose: () => void`
- Muestra todos los campos del `ExperienceEntry`: company, role, period, duration, type, responsibilities, highlight
- Backdrop con `backdrop-filter: blur(8px)`
- Animación: `AnimatePresence` + `motion.div` con `scale: 0.95 → 1` + `opacity: 0 → 1`
- Focus trap: `useRef` sobre primer y último elemento focusable, cicla con Tab/Shift+Tab
- Cierra con click fuera o tecla Escape
- Previene scroll del body con `document.body.style.overflow = 'hidden'`
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` apunta al `<h2>` con el company name

```typescript
interface ExperienceModalProps {
  entry: ExperienceEntry | null
  onClose: () => void
}
export function ExperienceModal({ entry, onClose }: ExperienceModalProps)
```

**Experience component change:** `TimelineEntry` recibe `onClick: () => void` prop adicional. El card completo es clickeable (cursor pointer, hover highlight).

### CurrentlyBuilding
- Sección nueva entre `GitHubSection` y `Certifications`
- 4 items estáticos con icono emoji + label + descripción corta
- Grid de 2×2 en desktop, 1×4 en mobile
- Cada item: glassmorphism card con glow de color diferente (blue, violet, cyan, blue)
- Animación: stagger entrance con Framer Motion `whileInView`

```typescript
// src/data/currentlyBuilding.ts
export interface BuildingItem {
  id: string
  icon: string       // emoji
  label: string
  description: string
  color: 'blue' | 'violet' | 'cyan'
}

export const buildingItems: BuildingItem[] = [
  { id: 'marketplace', icon: '🚧', label: 'Marketplace de Servicios', ... },
  { id: 'ai-automation', icon: '🤖', label: 'AI Automation', ... },
  { id: 'flutter', icon: '📱', label: 'Flutter Applications', ... },
  { id: 'fullstack', icon: '🌐', label: 'Fullstack Web Applications', ... },
]
```

### GitHubSection
- Sección entre `EngineeringSection` y `CurrentlyBuilding`
- Una tarjeta grande glassmorphism centrada con:
  - Ícono `GitBranch` grande con glow
  - Texto `github.com/gerardoojeda47` en mono
  - Botón "View my GitHub" → `https://github.com/gerardoojeda47` target `_blank`
  - Descripción breve del perfil
- Hover: lift + border glow intensificado

### Hero Code Fragments Enhancement
- `CodeFragments` sub-component dentro de `Hero`
- Array de 4 snippets de código TypeScript representativos
- Posicionados en esquinas del Hero con `position: absolute`
- `opacity: 0.04` (non-distracting)
- No animados (respeta performance)
- `aria-hidden="true"`
- Ocultos en mobile (`display: none` en viewport < 768px)

### Section Connectors (CSS only)
- Implementado como pseudo-elemento `::after` o `::before` en cada sección
- Gradiente que mezcla el color de fondo de la sección actual con el siguiente
- `height: 80px`, `pointer-events: none`
- No requiere componente nuevo — solo CSS en `global.css` y archivos CSS de sección

---

## Data Models

```typescript
// src/data/currentlyBuilding.ts
export interface BuildingItem {
  id: string
  icon: string         // emoji string
  label: string
  description: string
  color: 'blue' | 'violet' | 'cyan'
}

export const BUILDING_ITEM_COUNT = 4

export const buildingItems: BuildingItem[] = [ /* 4 items */ ]

export function validateBuildingItems(items: BuildingItem[]): boolean
```

No se modifican los data models existentes de `experience.ts`.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

---

**Property 1: Currently Building items count = exactly 4**
*Para cualquier* array de `BuildingItem` exportado desde `currentlyBuilding.ts`, el array SHALL contener exactamente 4 elementos, y cada elemento SHALL tener `id`, `icon`, `label`, y `description` no vacíos, con `color` siendo uno de `['blue', 'violet', 'cyan']`.
**Validates: Requirements 1.1**

---

**Property 2: ExperienceModal muestra datos completos**
*Para cualquier* `ExperienceEntry` válido, cuando el modal es renderizado con esa entrada, el DOM del modal SHALL contener el texto de `company`, `role`, `period`, y al menos una de las `responsibilities`.
**Validates: Requirements 2.1**

---

**Property 3: GitHub CTA tiene href correcto**
*Para cualquier* renderizado del componente `GitHubSection`, SHALL existir exactamente un enlace con `href="https://github.com/gerardoojeda47"` que tenga `target="_blank"` y `rel="noopener noreferrer"`.
**Validates: Requirements 3.1**

---

## Error Handling

- **ExperienceModal con `entry: null`**: El modal no renderiza nada (early return).
- **CustomCursor en SSR**: Guarda con `typeof window !== 'undefined'` aunque es CSR-only.
- **focus trap con 0 elementos focusables**: Fallback a cerrar con Escape sin ciclar.
- **Scroll lock**: Restaurar `document.body.style.overflow = ''` siempre en cleanup del `useEffect`, incluso si el componente se desmonta antes del cierre explícito.

---

## Testing Strategy

### Unit Testing
Framework: **Vitest** + **@testing-library/react**

- `ExperienceModal` renderiza con datos correctos
- `ExperienceModal` se cierra con click fuera y con Escape
- `GitHubSection` contiene el CTA con href correcto
- `CurrentlyBuilding` renderiza exactamente 4 items

### Property-Based Testing
Framework: **fast-check**

Cada test corre mínimo 100 iteraciones y está anotado con:
`**Feature: portfolio-enhancements, Property {N}: {texto}**`

- **PBT-1**: `currentlyBuilding.ts` count — para cualquier variación del array, valida que la función de validación rechaza arrays con != 4 elementos.
- **PBT-2**: ExperienceModal data completeness — para cualquier `ExperienceEntry` generado aleatoriamente, el modal renderizado contiene los campos requeridos.
- **PBT-3**: GitHub link correctness — para cualquier renderizado del `GitHubSection`, el CTA href es siempre `https://github.com/gerardoojeda47`.
