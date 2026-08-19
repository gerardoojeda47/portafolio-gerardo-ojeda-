# Design Document — Portfolio Web Profesional

## Overview

Portafolio web personal para Gerardo Ojeda Riascos, construido como una Single Page Application (SPA) con React 18 + TypeScript + Vite. El sitio presenta experiencia profesional, proyectos, habilidades técnicas y uso de IA de forma visual e impactante, orientado a reclutadores y clientes.

El stack de construcción del portafolio es:
- **React 18 + TypeScript** — UI y lógica de componentes
- **Vite** — bundler rápido con HMR
- **Framer Motion** — animaciones declarativas
- **Lucide React** — iconos SVG
- **CSS Custom Properties + CSS Modules o clases utilitarias** — sistema de estilos sin dependencia de Tailwind

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                  Browser                    │
│  ┌──────────────────────────────────────┐   │
│  │           App.tsx (SPA Shell)        │   │
│  │  ┌──────────────────────────────┐    │   │
│  │  │  Navbar (sticky, scroll spy) │    │   │
│  │  └──────────────────────────────┘    │   │
│  │  ┌──────────────────────────────┐    │   │
│  │  │  Section Components (12)     │    │   │
│  │  │  ← consume src/data/*.ts     │    │   │
│  │  └──────────────────────────────┘    │   │
│  │  ┌──────────────────────────────┐    │   │
│  │  │  BackToTop (sticky button)   │    │   │
│  │  └──────────────────────────────┘    │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘

Data Layer (static, no API calls):
  src/data/
    skills.ts       → tecnologías por categoría y tier
    projects.ts     → proyectos con estado y stack
    experience.ts   → historial laboral
    certifications.ts → certificaciones y educación
    strengths.ts    → fortalezas personales
```

El flujo de datos es unidireccional: los archivos en `src/data/` exportan arrays de objetos TypeScript tipados, los componentes los importan y renderizan. No hay estado global ni fetching de red (salvo la integración opcional de GitHub API).

---

## Components and Interfaces

### Navbar
- Sticky, fondo con `backdrop-blur` al hacer scroll
- Links: Hero, About, Stack, AI, Projects, Experience, Contact
- Scroll spy: resalta la sección activa usando `IntersectionObserver`
- Menú hamburguesa en mobile (< 768px)

### Hero
- Nombre, título y subtítulo animados con Framer Motion (stagger)
- Terminal interactiva: componente `TerminalWindow` con typewriter effect
- Cuatro CTAs: Ver proyectos, Descargar CV, GitHub, Contactarme
- Fondo: gradiente animado + partículas/código flotante muy sutil

### About
- Bio text
- Grid de 6 strength cards con icono + título + descripción
- Sin barras de porcentaje

### TechStack
- Tecnologías agrupadas por categoría en tabs o grid
- Badge de tier: `PRIMARY STACK` | `WORKING KNOWLEDGE` | `SELF-LEARNING`
- Tooltip en hover con categoría y tier

### AISection
- Flow diagram animado: `USER → PROMPT → AI → CODE → REVIEW → TEST → DEPLOY`
- Lista de herramientas con descripción
- Lista de aplicaciones prácticas
- Frase destacada con tipografía grande

### Projects
- Cards con glassmorphism
- Badge de estado honesto ("En desarrollo · 2026")
- Diagrama de arquitectura del Marketplace (texto/ASCII estilizado o SVG)
- Hover lift effect

### EngineeringSection
- Tres tarjetas: Debugging & Analysis, QA & Testing, Support Engineering
- Items de habilidades como chips o listas

### Experience
- Timeline vertical con conector animado
- Alternancia izquierda/derecha en desktop
- Stack en mobile
- Nota visual en entradas comerciales

### Education + Certifications
- Dos entradas de educación
- Exactamente 5 tarjetas de certificación con emisor, fecha y horas

### Contact
- Headline "Let's build something."
- Tres botones de contacto con iconos
- Fondo diferenciado del resto del sitio

### Footer
- Nombre, título, stack, copyright

### BackToTop
- Botón sticky bottom-right, visible después de 400px de scroll

---

## Data Models

```typescript
// src/data/skills.ts
export type SkillTier = 'primary' | 'working' | 'self-learning'
export type SkillCategory =
  | 'Languages' | 'Mobile' | 'Frontend' | 'Backend'
  | 'Databases' | 'Cloud/DevOps' | 'Tools' | 'Methodologies' | 'Security'

export interface Skill {
  name: string
  category: SkillCategory
  tier: SkillTier
  icon?: string  // nombre de icono o ruta de SVG
}

// src/data/projects.ts
export type ProjectStatus = 'in-progress' | 'completed' | 'professional-experience'

export interface Project {
  id: string
  title: string
  status: ProjectStatus
  statusLabel: string        // texto visible: "En desarrollo · 2026"
  year: string
  description: string
  technologies: string[]
  features: string[]
  context?: string           // e.g., "Cari AI — Experiencia profesional"
  githubUrl?: string
  liveUrl?: string
  architectureDiagram?: string  // texto ASCII o identificador de diagrama
}

// src/data/experience.ts
export interface ExperienceEntry {
  id: string
  company: string
  role: string
  period: string
  duration: string
  type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance'
  responsibilities: string[]
  highlight?: string  // nota especial visible en la card
}

// src/data/certifications.ts
export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  hours: number
  icon?: string
}

export interface Education {
  degree: string
  institution: string
  location: string
  graduationDate: string
}

// src/data/strengths.ts
export interface Strength {
  id: string
  icon: string       // nombre de icono Lucide
  title: string
  description: string
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

---

**Property 1: Completitud de datos de skills**
*Para cualquier* array de `Skill` exportado desde `skills.ts`, cada elemento SHALL tener `name`, `category` y `tier` definidos y no vacíos, y `tier` SHALL ser uno de los tres valores permitidos (`primary`, `working`, `self-learning`).
**Validates: Requirements 5.2**

---

**Property 2: Integridad de certificaciones**
*Para cualquier* array de `Certification` exportado desde `certifications.ts`, el array SHALL contener exactamente 5 elementos, y cada elemento SHALL tener `title`, `issuer`, `date` y `hours > 0`.
**Validates: Requirements 10.2, 10.3**

---

**Property 3: Estado honesto de proyectos**
*Para cualquier* proyecto en el array de `Project`, si `status === 'in-progress'`, entonces `statusLabel` SHALL contener la palabra "desarrollo" o "progress", y NO SHALL contener la palabra "completed" ni "terminado".
**Validates: Requirements 7.3**

---

**Property 4: Scroll-to-section navigation consistency**
*Para cualquier* link de navegación en el Navbar, el `href` o el id de sección al que apunta SHALL corresponder a un elemento existente en el DOM al momento del render.
**Validates: Requirements 11.5**

---

**Property 5: Datos de experiencia cronológicamente ordenados**
*Para cualquier* array de `ExperienceEntry`, los elementos SHALL estar ordenados de forma que el entry con la fecha de inicio más reciente aparezca primero (orden descendente), y ningún entry SHALL tener `company`, `role` o `period` vacíos.
**Validates: Requirements 9.1, 9.2**

---

**Property 6: Datos de contacto presentes y correctos**
*Para cualquier* renderizado del componente Contact, SHALL existir exactamente tres botones de contacto, y cada botón SHALL tener un atributo `href` no vacío que comience con `mailto:`, `https://wa.me/`, o `https://github.com/`.
**Validates: Requirements 11.2**

---

**Property 7: Tech Stack sin porcentajes**
*Para cualquier* renderizado del componente TechStack, el DOM resultante NO SHALL contener ningún elemento que muestre valores numéricos con símbolo `%` asociados a una tecnología individual.
**Validates: Requirements 5.3**

---

**Property 8: AI flow diagram completo**
*Para cualquier* renderizado del componente AISection, el diagrama de flujo SHALL contener exactamente los 7 nodos en orden: USER, PROMPT, AI, CODE, REVIEW, TEST, DEPLOY — sin omitir ninguno.
**Validates: Requirements 6.2**

---

## Error Handling

- **Datos faltantes en `src/data/`**: Si un campo opcional (como `icon` o `githubUrl`) es `undefined`, el componente SHALL renderizar sin ese elemento en lugar de lanzar un error.
- **Links externos**: Todos los `<a>` con `target="_blank"` SHALL incluir `rel="noopener noreferrer"` para prevenir vulnerabilidades de tabnapping.
- **Imágenes**: Si una imagen no carga, SHALL mostrarse un placeholder o el componente degradará elegantemente.
- **Scroll spy**: Si `IntersectionObserver` no está disponible (entorno muy antiguo), la navegación funciona sin resaltado activo.
- **Download CV**: Si el archivo no existe en `public/`, el botón redirige a una URL de descarga o muestra un mensaje; nunca falla silenciosamente.

---

## Testing Strategy

### Unit Testing

Framework: **Vitest** + **@testing-library/react**

Los unit tests verifican:
- Que los componentes renderizan sin errores con datos válidos del `src/data/`
- Que los botones de CTA tienen los `href` correctos
- Que el componente `BackToTop` aparece solo después de scroll > 400px
- Que el componente `Navbar` resalta la sección activa

### Property-Based Testing

Framework: **fast-check** (librería PBT para TypeScript/JavaScript)

Cada property-based test correrá un mínimo de 100 iteraciones.

Cada test estará anotado con el siguiente formato exacto:
`**Feature: portfolio-web-profesional, Property {N}: {texto de la propiedad}**`

#### Tests de propiedades:

- **PBT-1** — `skills.ts` data integrity: genera arrays aleatorios de `Skill` y valida que ninguno con tier inválido pase la validación del schema. *(Validates: Requirements 5.2)*
- **PBT-2** — `certifications.ts` count: genera variaciones del array y valida que la función de validación rechaza arrays con != 5 elementos. *(Validates: Requirements 10.2, 10.3)*
- **PBT-3** — Project status label consistency: para proyectos generados aleatoriamente con `status: 'in-progress'`, valida que `statusLabel` no contiene palabras prohibidas. *(Validates: Requirements 7.3)*
- **PBT-4** — Navigation links exist in DOM: genera listas de sección IDs y valida que todos los links del Navbar apuntan a IDs que existen. *(Validates: Requirements 11.5)*
- **PBT-5** — Experience order: genera arrays desordenados de `ExperienceEntry` y valida que la función de ordenamiento produce orden descendente por fecha. *(Validates: Requirements 9.1)*
- **PBT-6** — Contact buttons format: valida que cualquier conjunto de datos de contacto produce exactamente 3 botones con URIs bien formadas. *(Validates: Requirements 11.2)*
- **PBT-7** — No percentage rendering: genera arrays de skills y valida que el output del componente TechStack no contiene strings con `%`. *(Validates: Requirements 5.3)*
- **PBT-8** — AI flow completeness: valida que cualquier renderizado del AISection siempre contiene los 7 nodos del flujo en el orden correcto. *(Validates: Requirements 6.2)*

### Dual Approach Summary

| Tipo de test | Framework | Propósito |
|---|---|---|
| Unit tests | Vitest + Testing Library | Casos concretos, integración de componentes, edge cases |
| Property-based tests | fast-check | Propiedades universales sobre datos y renderizado |
