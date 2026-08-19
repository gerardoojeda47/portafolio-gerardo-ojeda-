/**
 * strengths.ts — Personal strengths data for Gerardo Ojeda Riascos
 * Validates: Requirements 1.3, 4.2
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Strength {
  id: string
  icon: string       // nombre de icono Lucide
  title: string
  description: string
}

// ─── Strengths Array ──────────────────────────────────────────────────────────

export const strengths: Strength[] = [
  {
    id: 'autodidacta',
    icon: 'BookOpen',
    title: 'Autodidacta',
    description: 'Aprendo nuevas tecnologías y herramientas de forma autónoma, adaptándome continuamente a los cambios del ecosistema de desarrollo.',
  },
  {
    id: 'pensamiento-tecnico',
    icon: 'Cpu',
    title: 'Pensamiento técnico',
    description: 'Analizo problemas complejos desde una perspectiva estructurada, evaluando soluciones con criterio de ingeniería antes de implementar.',
  },
  {
    id: 'atencion-al-detalle',
    icon: 'Search',
    title: 'Atención al detalle',
    description: 'Reviso cada componente del código y la UI con precisión, detectando inconsistencias y errores antes de que lleguen a producción.',
  },
  {
    id: 'ai-mindset',
    icon: 'Sparkles',
    title: 'AI Mindset',
    description: 'Integro herramientas de inteligencia artificial en el flujo de desarrollo para acelerar tareas sin sacrificar el criterio técnico.',
  },
  {
    id: 'business-mindset',
    icon: 'TrendingUp',
    title: 'Business Mindset',
    description: 'Entiendo el impacto de las decisiones técnicas en el negocio, orientando el desarrollo hacia soluciones que generan valor real.',
  },
  {
    id: 'comunicacion',
    icon: 'MessageSquare',
    title: 'Comunicación',
    description: 'Transmito ideas técnicas de forma clara y efectiva tanto a equipos de desarrollo como a stakeholders sin perfil tecnológico.',
  },
]
