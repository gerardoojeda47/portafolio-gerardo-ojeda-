# Implementation Plan — Portfolio Web Profesional

- [x] 1. Inicializar proyecto Vite + React + TypeScript




  - Crear proyecto con `npm create vite@latest` usando template `react-ts`
  - Configurar path aliases en `vite.config.ts` y `tsconfig.json`
  - Instalar dependencias: `framer-motion`, `lucide-react`
  - Instalar dependencias de test: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `fast-check`, `jsdom`
  - Configurar Vitest en `vite.config.ts` con entorno `jsdom`
  - Crear estructura de carpetas: `src/components/`, `src/data/`, `src/assets/`, `src/hooks/`, `src/styles/`
  - Crear `README.md` con instrucciones de setup, dev, build y deploy a Vercel/Netlify
  - _Requirements: 1.1, 1.2, 1.4_

- [x] 2. Crear archivos de datos tipados
  - [x] 2.1 Crear `src/data/skills.ts` con tipos `Skill`, `SkillTier`, `SkillCategory` y array completo de tecnologías clasificadas por categoría y tier
    - Incluir todas las tecnologías del prompt en los 3 tiers: primary, working, self-learning
    - _Requirements: 1.3, 5.1, 5.2_

  - [x] 2.2 Escribir property test para integridad de datos de skills
    - **Feature: portfolio-web-profesional, Property 1: Data integrity — all data items have required non-empty fields and valid enum values**
    - **Validates: Requirements 5.2**

  - [x] 2.3 Crear `src/data/projects.ts` con tipos `Project`, `ProjectStatus` y exactamente 2 proyectos: Marketplace de Servicios y AI Delivery Assistant
    - _Requirements: 1.3, 7.1, 7.2, 7.3_

  - [x] 2.4 Escribir property test para estado honesto de proyectos
    - **Feature: portfolio-web-profesional, Property 3: Project status label consistency**
    - **Validates: Requirements 7.3**

  - [x] 2.5 Crear `src/data/experience.ts` con tipo `ExperienceEntry` y 5 entradas en orden cronológico descendente
    - _Requirements: 1.3, 9.1, 9.2_

  - [x] 2.6 Escribir property test para orden cronológico y completitud de experiencia
    - **Feature: portfolio-web-profesional, Property 5: Experience chronological ordering**
    - **Feature: portfolio-web-profesional, Property 1: Data integrity (ExperienceEntry fields)**
    - **Validates: Requirements 9.1, 9.2**

  - [x] 2.7 Crear `src/data/certifications.ts` con tipos `Certification`, `Education` y exactamente 5 certificaciones y 2 entradas de educación
    - _Requirements: 1.3, 10.1, 10.2, 10.3_

  - [x] 2.8 Escribir property test para conteo exacto de certificaciones
    - **Feature: portfolio-web-profesional, Property 2: Certifications count = exactly 5**
    - **Validates: Requirements 10.2, 10.3**

  - [x] 2.9 Crear `src/data/strengths.ts` con tipo `Strength` y 6 fortalezas
    - _Requirements: 1.3, 4.2_

- [x] 3. Implementar sistema de estilos global
  - Crear `src/styles/global.css` con CSS custom properties: colores dark tech (`--bg-base`, `--bg-surface`, `--accent-blue`, `--accent-cyan`, `--accent-violet`), tipografías, y utilidades base
  - Crear estilos de glassmorphism reutilizables (`.glass-card`)
  - Configurar `@font-face` o import de Google Fonts para tipografía monoespaciada (JetBrains Mono o similar)
  - Configurar responsive breakpoints como custom properties
  - _Requirements: 2.1, 2.2, 2.6_

- [x] 4. Implementar componente Navbar
  - [x] 4.1 Crear `src/components/Navbar/Navbar.tsx` con links de navegación, fondo con backdrop-blur al scroll, y menú hamburguesa para mobile
    - _Requirements: 11.5_

  - [x] 4.2 Crear hook `src/hooks/useScrollSpy.ts` que usa `IntersectionObserver` para detectar sección activa
    - _Requirements: 11.5_

  - [x] 4.3 Escribir property test para consistencia de IDs de navegación
    - **Feature: portfolio-web-profesional, Property 4: Nav section IDs exist in DOM**
    - **Validates: Requirements 11.5**

- [x] 5. Implementar componente Hero
  - [x] 5.1 Crear `src/components/Hero/TerminalWindow.tsx` con typewriter animation usando `framer-motion` o `setTimeout`, mostrando los comandos `whoami`, `stack`, `status` en secuencia
    - _Requirements: 3.2_

  - [x] 5.2 Crear `src/components/Hero/Hero.tsx` con nombre, título, subtítulo animados (stagger Framer Motion), 4 botones CTA y fondo con gradiente/partículas sutiles
    - _Requirements: 3.1, 3.3, 3.4, 3.5_

  - [x] 5.3 Escribir unit test para CTAs del Hero
    - Verificar que se renderizan exactamente 4 botones con hrefs correctos
    - _Requirements: 3.3_

- [x] 6. Implementar componente About
  - Crear `src/components/About/About.tsx` con bio text, 6 strength cards con iconos Lucide y descripciones, y animación de entrada staggered con Framer Motion
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 7. Implementar componente TechStack
  - [x] 7.1 Crear `src/components/TechStack/TechStack.tsx` con grid de tecnologías organizadas por categoría y badge de tier (PRIMARY STACK / WORKING KNOWLEDGE / SELF-LEARNING) — sin barras de porcentaje
    - _Requirements: 5.1, 5.2, 5.3, 5.5_

  - [x] 7.2 Escribir property test para ausencia de porcentajes en TechStack
    - **Feature: portfolio-web-profesional, Property 7: TechStack has no % values in rendered output**
    - **Validates: Requirements 5.3**

- [x] 8. Implementar componente AISection
  - [x] 8.1 Crear `src/components/AISection/FlowDiagram.tsx` con los 7 nodos animados secuencialmente: USER → PROMPT → AI → CODE → REVIEW → TEST → DEPLOY
    - _Requirements: 6.2_

  - [x] 8.2 Crear `src/components/AISection/AISection.tsx` con lista de herramientas, aplicaciones prácticas, frase destacada y el FlowDiagram
    - _Requirements: 6.1, 6.3, 6.4_

  - [x] 8.3 Escribir property test para completitud del AI flow diagram
    - **Feature: portfolio-web-profesional, Property 8: AI flow diagram contains all 7 nodes in order**
    - **Validates: Requirements 6.2**

- [ ] 9. Checkpoint — Asegurar que todos los tests pasan hasta este punto
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Implementar componente Projects
  - Creado `src/components/Projects/Projects.tsx` con cards glassmorphism, badge de estado honesto, diagrama de arquitectura del Marketplace (ASCII estilizado), y hover lift effect
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 11. Implementar componente EngineeringSection
  - Creado `src/components/EngineeringSection/EngineeringSection.tsx` con 3 tarjetas (Debugging & Analysis, QA & Testing, Support Engineering) con sus skill items y animación staggered
  - Creado `src/data/engineering.ts` con datos tipados
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 12. Implementar componente Experience
  - Creado `src/components/Experience/Experience.tsx` con timeline vertical animada, 5 entradas en orden descendente, highlight en entradas comerciales, y conexión elegante de Domiciliario con el proyecto Marketplace
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 13. Implementar componentes Education y Certifications
  - Creado `src/components/Certifications/Certifications.tsx` con exactamente 5 tarjetas de certificación y 2 entradas de educación, con hover highlight
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 14. Implementar componente Contact y Footer
  - [x] 14.1 Crear `src/components/Contact/Contact.tsx` con headline, subtext y exactamente 3 botones (Email, WhatsApp, GitHub) con URIs correctas
    - _Requirements: 11.1, 11.2_

  - [x] 14.2 Escribir property test para botones de contacto
    - **Feature: portfolio-web-profesional, Property 6: Contact buttons = exactly 3 with valid URI prefixes**
    - **Validates: Requirements 11.2**

  - [x] 14.3 Crear `src/components/Footer/Footer.tsx` con nombre, título, stack y copyright
    - _Requirements: 11.3_

- [x] 15. Implementar utilidades transversales
  - Creado `src/components/BackToTop/BackToTop.tsx` con botón sticky visible después de 400px de scroll
  - Creado hook `src/hooks/useScrollPosition.ts`
  - Todos los `<a target="_blank">` tienen `rel="noopener noreferrer"`
  - _Requirements: 11.4_

- [x] 16. Configurar SEO, accesibilidad y metadatos
  - `index.html` incluye `<meta name="description">`, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`), favicon
  - `App.tsx` usa `<header>`, `<main>`, `<footer>` semánticos
  - Todas las imágenes tienen `alt`, todos los botones icon-only tienen `aria-label`
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [x] 17. Escribir property test de accesibilidad
  - **Feature: portfolio-web-profesional, Property: accesibilidad — alt text y aria-label presentes**
  - **Validates: Requirements 12.4**

- [x] 18. Integrar todos los componentes en App.tsx
  - Todos los componentes compuestos en el orden correcto dentro de `App.tsx`
  - Smooth scroll, scroll spy, y navegación completa implementados
  - `vercel.json` y `netlify.toml` configurados para SPA
  - _Requirements: 1.1, 11.4, 11.5_

- [x] 19. Checkpoint final — Todos los tests pasan
  - 89/89 tests pasando (12 test files)
