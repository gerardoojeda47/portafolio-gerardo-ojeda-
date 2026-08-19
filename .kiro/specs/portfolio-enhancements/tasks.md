# Implementation Plan — Portfolio Enhancements

- [x] 1. Actualizar SEO en index.html





  - Actualizar `<title>` a "Gerardo Ojeda | Software Developer · Flutter · React · Node.js · AI"
  - Actualizar `<meta name="description">` con el texto optimizado del spec
  - _Requirements: 6.1, 6.2_

- [x] 2. Implementar datos y componente CurrentlyBuilding





  - [x] 2.1 Crear `src/data/currentlyBuilding.ts` con interfaz `BuildingItem`, constante `BUILDING_ITEM_COUNT = 4`, array de 4 items y función `validateBuildingItems`


    - _Requirements: 1.1_

  - [x] 2.2 Escribir property test para conteo de CurrentlyBuilding items


    - **Feature: portfolio-enhancements, Property 1: Currently Building items count = exactly 4**
    - **Validates: Requirements 1.1**

  - [x] 2.3 Crear `src/components/CurrentlyBuilding/CurrentlyBuilding.tsx` con grid de 4 cards glassmorphism, stagger entrance con Framer Motion whileInView, cada card con emoji icon + label + descripción + color de glow


    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 2.4 Crear `src/components/CurrentlyBuilding/CurrentlyBuilding.css` con grid 2×2 desktop / 1×4 mobile, glassmorphism, glow de color por card


    - _Requirements: 1.2_

- [x] 3. Implementar GitHubSection





  - [x] 3.1 Crear `src/components/GitHubSection/GitHubSection.tsx` con glassmorphism card, ícono `GitBranch`, texto `github.com/gerardoojeda47` en mono, botón "View my GitHub" con href `https://github.com/gerardoojeda47` target `_blank` rel `noopener noreferrer`, animación whileInView


    - _Requirements: 3.1, 3.2_

  - [x] 3.2 Crear `src/components/GitHubSection/GitHubSection.css`


    - _Requirements: 3.2_

  - [x] 3.3 Escribir unit test para GitHubSection


    - Verificar que el CTA tiene `href`, `target="_blank"` y `rel="noopener noreferrer"` correctos
    - **Feature: portfolio-enhancements, Property 3: GitHub CTA href correcto**
    - **Validates: Requirements 3.1**

- [x] 4. Implementar ExperienceModal





  - [x] 4.1 Crear `src/components/ExperienceModal/ExperienceModal.tsx` como React portal en `document.body`, con backdrop blur, animación scale+fade, display de company/role/period/duration/type/responsibilities/highlight, cerrar con Escape y click fuera, trap de foco, `aria-modal`, `role="dialog"`, `aria-labelledby`


    - _Requirements: 2.1, 2.2, 2.3, 2.4, 6.3, 6.4_

  - [x] 4.2 Crear `src/components/ExperienceModal/ExperienceModal.css` con backdrop blur, modal centrado, scroll interno si contenido excede viewport


    - _Requirements: 2.2_

  - [x] 4.3 Modificar `src/components/Experience/Experience.tsx` para que `TimelineEntry` sea clickeable y abra el modal con la entrada correspondiente usando `useState` para el entry seleccionado


    - _Requirements: 2.1_

  - [x] 4.4 Escribir unit + property tests para ExperienceModal


    - Unit: modal cierra con Escape, modal cierra con click fuera, modal no renderiza con entry=null
    - **Feature: portfolio-enhancements, Property 2: ExperienceModal muestra datos completos**
    - **Validates: Requirements 2.1**

- [x] 5. Checkpoint — Asegurar que todos los tests pasan





  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implementar CustomCursor





  - [x] 6.1 Crear `src/components/CustomCursor/CustomCursor.tsx` con un `<div>` que sigue el mouse via `mousemove`, cambia escala/color al hover sobre elementos interactivos (`a`, `button`, `[data-cursor-hover]`), oculto con `@media (pointer: coarse)`, sin animaciones si `prefers-reduced-motion`


    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 6.2 Crear `src/components/CustomCursor/CustomCursor.css` con estilos del cursor, `pointer-events: none`, `@media (pointer: coarse) { display: none }`


    - _Requirements: 4.4_

- [x] 7. Mejoras visuales CSS





  - [x] 7.1 Agregar fragmentos de código decorativos al Hero — sub-componente `CodeFragments` en `Hero.tsx` con 4 snippets TypeScript posicionados en esquinas, `opacity: 0.04`, `aria-hidden="true"`, ocultos en mobile


    - _Requirements: 5.3_

  - [x] 7.2 Agregar conectores de sección en `global.css` — pseudo-elementos entre secciones para transiciones suaves sin cortes, usando gradientes


    - _Requirements: 5.1_

  - [x] 7.3 Agregar regla global `prefers-reduced-motion` en `global.css` que desactiva animaciones CSS keyframe y fuerza `transition: none`


    - _Requirements: 5.4_

- [x] 8. Integrar nuevos componentes en App.tsx





  - Agregar `<CustomCursor />` al root del App (fuera de `<main>`)
  - Agregar `<GitHubSection />` entre `EngineeringSection` y `Certifications`
  - Agregar `<CurrentlyBuilding />` entre `GitHubSection` y `Certifications`
  - _Requirements: 1.1, 3.1, 4.1_

- [x] 9. Checkpoint final — Asegurar que todos los tests pasan





  - Ensure all tests pass, ask the user if questions arise.
