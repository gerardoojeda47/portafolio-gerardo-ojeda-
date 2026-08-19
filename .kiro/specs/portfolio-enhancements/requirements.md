# Requirements Document — Portfolio Enhancements

## Introduction

Mejoras visuales e interactivas para el portafolio existente de Gerardo Ojeda Riascos. El sitio ya tiene la estructura base funcional con todos los componentes principales. Este spec cubre las funcionalidades que faltan y los refinamientos visuales para llevar la experiencia al nivel "premium software engineer portfolio".

## Glossary

- **Currently Building**: Sección que muestra proyectos/áreas en desarrollo activo actualmente.
- **Experience Modal**: Componente overlay que muestra el detalle completo de una entrada de experiencia laboral al hacer click.
- **Custom Cursor**: Cursor del mouse personalizado visible solo en dispositivos desktop con pointer.
- **Glassmorphism**: Efecto visual de fondo desenfocado con transparencia y bordes luminosos.
- **GitHub Section**: Sección que presenta el perfil de GitHub con enlace y métricas visuales.
- **Glow Effect**: Efecto de brillo luminoso mediante `box-shadow` con colores de acento.
- **Section Connector**: Elemento visual decorativo (gradiente, línea, blob) entre secciones para evitar cortes bruscos.
- **Reduced Motion**: Preferencia de accesibilidad del sistema operativo para reducir animaciones.

---

## Requirements

### Requirement 1 — Sección "Currently Building"

**User Story:** As a recruiter visiting the portfolio, I want to see what Gerardo is actively building right now so that I understand he is continuously developing.

#### Acceptance Criteria

1. THE CurrentlyBuilding Component SHALL display exactly four items: "Marketplace de Servicios", "AI Automation", "Flutter Applications", and "Fullstack Web Applications", each with a distinct icon and label.
2. WHEN the CurrentlyBuilding section enters the viewport, THE CurrentlyBuilding Component SHALL animate each item with a staggered entrance using Framer Motion.
3. THE CurrentlyBuilding Component SHALL use visual indicators (emoji or icon) that communicate active development status without implying completion.

---

### Requirement 2 — Modal de Experiencia

**User Story:** As a recruiter, I want to click on an experience entry and see the full details in a modal so that I can review responsibilities without leaving the page flow.

#### Acceptance Criteria

1. WHEN a user clicks on an experience timeline entry, THE ExperienceModal Component SHALL open an overlay displaying: company name, role title, date range, duration, employment type, all responsibilities, and the highlight note if present.
2. WHEN the ExperienceModal is open, THE ExperienceModal Component SHALL display a backdrop with blur effect and the modal SHALL animate in using scale + fade.
3. WHEN a user clicks outside the modal or presses Escape, THE ExperienceModal Component SHALL close and restore focus to the triggering element.
4. THE ExperienceModal Component SHALL trap keyboard focus within the modal while it is open, cycling through interactive elements.
5. WHILE the ExperienceModal is open, THE Portfolio System SHALL prevent background page scrolling.

---

### Requirement 3 — Sección GitHub

**User Story:** As a recruiter, I want to see a direct link to Gerardo's GitHub profile presented in a premium visual format so that I can review his public code.

#### Acceptance Criteria

1. THE GitHubSection Component SHALL display a premium card with the text "github.com/gerardoojeda47", a "View my GitHub" CTA button that opens `https://github.com/gerardoojeda47` in a new tab with `rel="noopener noreferrer"`, and a visual representation of the GitHub username.
2. WHEN a user hovers over the GitHub card, THE GitHubSection Component SHALL apply a glow border and lift effect consistent with the glassmorphism design system.

---

### Requirement 4 — Cursor personalizado (desktop)

**User Story:** As a desktop user, I want a subtle custom cursor so that the portfolio feels more polished and premium.

#### Acceptance Criteria

1. WHERE the device has a pointer (non-touch), THE CustomCursor Component SHALL render a small custom cursor element that follows mouse movement.
2. WHEN the custom cursor hovers over interactive elements (buttons, links, cards), THE CustomCursor Component SHALL change its appearance (scale, color, or shape) to indicate interactivity.
3. IF the user has `prefers-reduced-motion: reduce` set, THEN THE CustomCursor Component SHALL render without transition animations.
4. WHERE the device is touch-based, THE CustomCursor Component SHALL not render.

---

### Requirement 5 — Mejoras visuales de secciones existentes

**User Story:** As a visitor, I want visually polished section transitions and enhanced glass effects so that the portfolio feels premium and professional.

#### Acceptance Criteria

1. THE Portfolio System SHALL render a visual connector between each pair of adjacent sections using a gradient, glow line, or decorative element to avoid abrupt transitions.
2. WHEN a `.glass-card` is hovered, THE Portfolio System SHALL enhance the glow effect with a brighter border color transition of maximum 300ms.
3. THE Hero Component SHALL display decorative code fragment text in the background at low opacity (max 0.06) that does not reduce text readability.
4. THE Portfolio System SHALL respect `prefers-reduced-motion: reduce` by disabling all Framer Motion animations and CSS keyframe animations.

---

### Requirement 6 — Mejoras de accesibilidad y SEO

**User Story:** As a developer sharing the portfolio link, I want the SEO title and meta description optimized so that the link preview on LinkedIn and Google is professional.

#### Acceptance Criteria

1. THE Portfolio System SHALL set the HTML `<title>` to "Gerardo Ojeda | Software Developer · Flutter · React · Node.js · AI".
2. THE Portfolio System SHALL set `<meta name="description">` to "Portfolio profesional de Gerardo Ojeda, Software Developer especializado en desarrollo web, mobile, backend, APIs, bases de datos, QA e inteligencia artificial."
3. THE ExperienceModal Component SHALL set `aria-modal="true"`, `role="dialog"`, and `aria-labelledby` pointing to the modal's title element.
4. WHEN the ExperienceModal closes, THE ExperienceModal Component SHALL return focus to the element that triggered the modal opening.
