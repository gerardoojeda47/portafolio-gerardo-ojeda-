# Requirements Document

## Introduction

Portafolio web profesional para Gerardo Ojeda Riascos, Software Developer Jr. especializado en Mobile, Web, Backend e Inteligencia Artificial. El sitio debe reflejar experiencia real en desarrollo, soporte técnico, QA y automatización con IA, con una estética Dark Tech moderna que genere credibilidad ante reclutadores y clientes. Construido con React + TypeScript + Vite, con contenido organizado en archivos de datos separados para facilitar su mantenimiento.

## Glossary

- **Portfolio**: Sitio web personal que presenta experiencia, proyectos y habilidades de un profesional.
- **Hero**: Sección principal visible al cargar el sitio, con nombre, cargo y llamadas a la acción.
- **Terminal Interactiva**: Componente visual que simula una terminal de comandos con texto animado.
- **Glassmorphism**: Efecto visual de fondo con desenfoque (backdrop-blur) y transparencia.
- **Tech Stack**: Conjunto de tecnologías que domina el desarrollador, organizadas por categorías.
- **Dark Tech**: Estética visual de fondo oscuro, acentos en azul eléctrico, cyan y violeta.
- **Scroll Reveal**: Animaciones que se activan cuando el usuario hace scroll hacia una sección.
- **PBT**: Property-Based Testing, técnica de pruebas automatizadas con generación aleatoria de datos.
- **CTA**: Call To Action, botón o enlace que invita al usuario a realizar una acción.
- **Open Graph**: Metadatos HTML para previsualización en redes sociales.
- **Framer Motion**: Librería de animaciones para React.
- **Lucide React**: Librería de iconos SVG para React.
- **Primary Stack**: Tecnologías con experiencia práctica directa en proyectos reales o laborales.
- **Working Knowledge**: Tecnologías con conocimiento funcional y proyectos personales.
- **Self-Learning**: Tecnologías estudiadas de forma autodidacta, aún en proceso de profundización.
- **Marketplace**: Plataforma digital que conecta oferta y demanda de servicios o productos.
- **Supabase**: Backend-as-a-Service con base de datos PostgreSQL, autenticación y APIs.
- **AI Agent**: Sistema de inteligencia artificial que ejecuta flujos automatizados con capacidad de decisión.

---

## Requirements

### Requirement 1 — Configuración del proyecto y estructura base

**User Story:** As a developer maintaining the portfolio, I want a well-structured React + TypeScript project so that I can update content easily without touching UI components.

#### Acceptance Criteria

1. THE Portfolio System SHALL be scaffolded using Vite with the React + TypeScript template, including configuration for path aliases and production build output.
2. THE Portfolio System SHALL organize source code under `src/` with subdirectories: `components/`, `data/`, `assets/`, `hooks/`, and `styles/`.
3. THE Portfolio System SHALL store all content (projects, skills, experience, certifications) in typed TypeScript files under `src/data/` so that visual components only consume data without embedding raw strings.
4. THE Portfolio System SHALL include a `README.md` with setup instructions: install, run dev server, build, and deploy to Vercel/Netlify.
5. WHEN a developer runs `npm run build`, THE Portfolio System SHALL produce a production-ready bundle without TypeScript or lint errors.

---

### Requirement 2 — Diseño visual Dark Tech y sistema de estilos

**User Story:** As a recruiter or client visiting the portfolio, I want a visually impressive dark-themed interface so that the developer's technical profile stands out professionally.

#### Acceptance Criteria

1. THE Portfolio System SHALL apply a dark background palette (base: `#0a0a0f`, surface: `#0f0f1a`) with accent colors electric blue (`#00d4ff`), cyan and violet as CSS custom properties.
2. THE Portfolio System SHALL implement glassmorphism cards using `backdrop-filter: blur()`, semi-transparent backgrounds, and subtle luminous borders on interactive elements.
3. THE Portfolio System SHALL include scroll-reveal entrance animations on all major sections using Framer Motion, with a minimum duration of 400ms and ease-out curve.
4. WHEN a user hovers over a card or button, THE Portfolio System SHALL apply a smooth CSS transition (max 300ms) showing visual feedback without abrupt changes.
5. THE Portfolio System SHALL be fully responsive using a mobile-first approach, rendering correctly at 320px, 768px, and 1280px+ viewport widths.
6. THE Portfolio System SHALL use a modern sans-serif typeface for body text and a monospaced typeface (e.g., `JetBrains Mono` or `Fira Code`) exclusively for code-like elements such as the terminal and tech badges.

---

### Requirement 3 — Sección Hero con terminal interactiva

**User Story:** As a recruiter landing on the portfolio, I want a memorable first impression with animated content so that I immediately understand who Gerardo is and what he does.

#### Acceptance Criteria

1. THE Hero Component SHALL display the full name "GERARDO OJEDA RIASCOS", the title "Software Developer", and the subtitle "Mobile · Web · Backend · AI" as the primary visible text on page load.
2. THE Hero Component SHALL render a visual animated terminal that displays, in sequence: `whoami`, `stack`, and `status` commands with their corresponding outputs using a typewriter animation effect.
3. THE Hero Component SHALL include four CTA buttons: "Ver proyectos" (scroll to Projects), "Descargar CV" (file download link), "GitHub" (external link to `github.com/gerardoojeda47`), and "Contactarme" (scroll to Contact).
4. WHEN the page loads, THE Hero Component SHALL animate the headline and subtitle into view within 800ms using a staggered fade-in effect.
5. THE Hero Component SHALL include a subtle animated background element (e.g., floating code fragments, gradient mesh, or particle effect) that does not reduce text readability or page performance.

---

### Requirement 4 — Sección About Me

**User Story:** As a potential employer, I want to read a concise and honest professional profile so that I can assess Gerardo's background and working approach.

#### Acceptance Criteria

1. THE About Component SHALL display the professional bio text describing Gerardo's focus on web, mobile, and AI automation, without inventing experience, metrics, or client names.
2. THE About Component SHALL present six strength cards: Autodidacta, Pensamiento técnico, Atención al detalle, AI Mindset, Business Mindset, and Comunicación — each with an icon and a one-sentence description.
3. THE About Component SHALL visually distinguish professional experience from self-learning in any skill context, using labels such as "Primary Stack", "Working Knowledge", and "Self-Learning".
4. WHEN the About section enters the viewport, THE About Component SHALL trigger a staggered card entrance animation using Framer Motion.

---

### Requirement 5 — Sección Tech Stack

**User Story:** As a technical recruiter, I want to see all of Gerardo's technologies organized by category so that I can quickly assess his fit for a role.

#### Acceptance Criteria

1. THE TechStack Component SHALL display technologies organized into the following categories: Languages, Mobile, Frontend, Backend, Databases, Cloud/DevOps, Tools, Methodologies, and Security.
2. THE TechStack Component SHALL classify each technology into one of three tiers — "Primary Stack", "Working Knowledge", or "Self-Learning" — and render a visible tier label or badge on each item.
3. THE TechStack Component SHALL NOT display skill percentage bars or numeric proficiency scores, as these would be invented data.
4. WHEN a technology badge is hovered, THE TechStack Component SHALL display a tooltip or visual highlight showing the category and tier of that technology.
5. THE TechStack Component SHALL render technology icons (SVG or from a standard icon set) alongside each technology name.

---

### Requirement 6 — Sección AI & Automation

**User Story:** As a recruiter or technical lead, I want to understand how Gerardo uses AI in his workflow so that I can evaluate his relevance in AI-augmented development roles.

#### Acceptance Criteria

1. THE AISection Component SHALL list the AI tools used: ChatGPT, GitHub Copilot, Cursor, Antigravity, and Kiro AI, each with a brief description of their use in Gerardo's workflow.
2. THE AISection Component SHALL display an animated flow diagram showing the sequence: USER → PROMPT → AI → CODE → REVIEW → TEST → DEPLOY.
3. THE AISection Component SHALL prominently feature the phrase: "Uso AI para acelerar el desarrollo, no para reemplazar el criterio técnico."
4. THE AISection Component SHALL list practical AI applications: code generation, refactoring, debugging, documentation, error analysis, prompt engineering, chatbot creation, agent creation, process automation, knowledge bases, and intelligent flows.
5. WHEN the AI section enters the viewport, THE AISection Component SHALL animate the flow diagram nodes sequentially with a delay between each step.

---

### Requirement 7 — Sección de Proyectos

**User Story:** As a client or recruiter, I want to see real projects with honest status labels so that I can evaluate the developer's practical output.

#### Acceptance Criteria

1. THE Projects Component SHALL display the "Marketplace de Servicios" project with status "En desarrollo · 2026", technologies React, Supabase, PostgreSQL, Figma, and a description of its three user roles: Admin, Usuario, and Trabajador.
2. THE Projects Component SHALL display the "AI Delivery Assistant" project framed as professional experience from Cari AI, describing the development of an AI-powered delivery bot with dynamic variables, specialized prompts, knowledge base, and order automation.
3. THE Projects Component SHALL NOT label any in-progress project as completed, and MUST display an honest status badge on each project card.
4. THE Projects Component SHALL render an architecture diagram for the Marketplace project showing the three panels (Admin, Usuario, Trabajador) connected to API/Backend and Supabase/PostgreSQL.
5. WHEN a project card is hovered, THE Projects Component SHALL apply a glassmorphism lift effect with border glow, without opening a modal or navigating away.

---

### Requirement 8 — Sección Engineering & Problem Solving

**User Story:** As a technical recruiter, I want to see evidence of Gerardo's debugging, QA, and support skills so that I understand he is more than just a code writer.

#### Acceptance Criteria

1. THE EngineeringSection Component SHALL present three categories: Debugging & Analysis, QA & Testing, and Support Engineering — each as a visual card with associated skill items.
2. THE EngineeringSection Component SHALL list under Debugging: log analysis, error identification, flow analysis, incident resolution, and root cause investigation.
3. THE EngineeringSection Component SHALL list under QA: functional testing, manual testing, CRUD validation, inconsistency reporting, and incident documentation.
4. THE EngineeringSection Component SHALL list under Support Engineering: enterprise platform support, monitoring, incident management, escalation, developer coordination, and technical documentation.
5. WHEN the Engineering section enters the viewport, THE EngineeringSection Component SHALL animate each category card with a staggered delay.

---

### Requirement 9 — Sección de Experiencia Profesional

**User Story:** As a recruiter, I want to see a clear professional timeline so that I can evaluate Gerardo's career progression and relevant experience.

#### Acceptance Criteria

1. THE Experience Component SHALL render a vertical timeline with the following entries in reverse chronological order: Support Engineer at Defytek SAS (Nov 2025 – May 2026, 7 months, Internship), Support Developer at Cari AI (2024–2025, 1 year), Asesor Comercial Online at DS Máx. Digital (Jun 2023 – May 2026), Asesor Comercial Externo at Inspira Colombia / Leader Tribe (Nov 2021 – May 2024), and Domiciliario/Mensajero (6 months).
2. THE Experience Component SHALL display for each entry: company name, role title, date range, duration, employment type, and a bullet list of responsibilities.
3. THE Experience Component SHALL visually highlight the commercial experience entries with a note explaining how business experience contributes to product and user understanding.
4. THE Experience Component SHALL link the Domiciliario experience elegantly to the Marketplace de Servicios project without inventing additional context.
5. WHEN an experience card enters the viewport, THE Experience Component SHALL animate it sliding in from the left or right alternately.

---

### Requirement 10 — Formación y Certificaciones

**User Story:** As a recruiter, I want to verify Gerardo's formal education and certifications so that I can confirm his credentials.

#### Acceptance Criteria

1. THE Education Component SHALL display exactly two education entries: "Tecnólogo en Análisis y Desarrollo de Software — SENA, Graduated May 2026" and "Bachiller Académico — I.E. Carlos M. Simmonds, December 2022".
2. THE Certifications Component SHALL display exactly five certification cards: "Desarrollo de Flujos con Bots" (Cari AI, April 2026, 48h), "Desarrollo Seguro" (Cari AI, February 2026, 48h), "Diseño y Desarrollo Front-End con HTML5, CSS y JavaScript" (SENA, December 2024, 96h), "Aplicación de las Etapas del Desarrollo de Software" (SENA, October 2024, 144h), and "English Does Word Level I" (SENA, March 2026, 48h).
3. THE Certifications Component SHALL NOT invent or add any certification beyond the five listed in requirement 10.2.
4. WHEN a certification card is hovered, THE Certifications Component SHALL display a subtle highlight effect with the issuing institution and hours prominently visible.

---

### Requirement 11 — Sección de Contacto y Footer

**User Story:** As a recruiter or client, I want an easy way to contact Gerardo so that I can reach out for opportunities.

#### Acceptance Criteria

1. THE Contact Component SHALL display the headline "Let's build something." and the subtext "¿Tienes una idea, proyecto o reto tecnológico? Hablemos."
2. THE Contact Component SHALL provide three contact buttons: Email (`gerardozapatos@gmail.com`), WhatsApp (`312 769 5456`), and GitHub (`github.com/gerardoojeda47`), each opening the correct external link or mailto/tel URI.
3. THE Footer Component SHALL display the name "GERARDO OJEDA RIASCOS", the title "Software Developer", the stack labels "Flutter · React · Node.js · AI", and the copyright "© 2026 Gerardo Ojeda".
4. THE Portfolio System SHALL include a "Back to Top" sticky button that becomes visible after the user scrolls past 400px and smoothly scrolls to the top on click.
5. THE Portfolio System SHALL implement a sticky navigation bar that highlights the active section as the user scrolls.

---

### Requirement 12 — SEO, accesibilidad y rendimiento

**User Story:** As a developer sharing the portfolio link, I want proper metadata and accessibility so that the link previews correctly on LinkedIn and the site is usable by all visitors.

#### Acceptance Criteria

1. THE Portfolio System SHALL include Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`) in the HTML `<head>` so that link previews render correctly on LinkedIn and WhatsApp.
2. THE Portfolio System SHALL include a `<meta name="description">` tag with a concise professional description of Gerardo's profile.
3. THE Portfolio System SHALL use semantic HTML elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`) to ensure screen reader compatibility.
4. THE Portfolio System SHALL provide `alt` text for all images and `aria-label` attributes for all icon-only interactive elements.
5. WHEN the portfolio is built for production, THE Portfolio System SHALL achieve a Lighthouse Performance score of 80 or above on desktop.
