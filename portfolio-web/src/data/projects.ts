/**
 * projects.ts — Projects data for Gerardo Ojeda Riascos
 * Validates: Requirements 1.3, 7.1, 7.2, 7.3
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProjectStatus = 'in-progress' | 'completed' | 'professional-experience'

export interface Project {
  id: string
  title: string
  status: ProjectStatus
  statusLabel: string          // texto visible: "En desarrollo · 2026"
  year: string
  description: string
  technologies: string[]
  features: string[]
  context?: string             // e.g., "Cari AI — Experiencia profesional"
  githubUrl?: string
  liveUrl?: string
  architectureDiagram?: string // texto ASCII o identificador de diagrama
}

// ─── Validation helpers ───────────────────────────────────────────────────────

const FORBIDDEN_STATUS_LABELS = ['completed', 'terminado']

/**
 * Valida que un proyecto cumple con las reglas de integridad de datos.
 * - statusLabel de proyectos 'in-progress' NO puede contener palabras prohibidas.
 * Validates: Requirement 7.3
 */
export function validateProject(project: Project): boolean {
  if (!project.id || !project.title || !project.status || !project.statusLabel) {
    return false
  }
  if (project.technologies.length === 0 || project.features.length === 0) {
    return false
  }
  if (project.status === 'in-progress') {
    const label = project.statusLabel.toLowerCase()
    for (const forbidden of FORBIDDEN_STATUS_LABELS) {
      if (label.includes(forbidden)) {
        return false
      }
    }
  }
  return true
}

/**
 * Valida todos los proyectos del array.
 * Retorna true si todos son válidos, false si alguno falla.
 */
export function validateProjects(projectList: Project[]): boolean {
  return projectList.every(validateProject)
}

// ─── Projects Array ───────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ── Proyecto 1: Marketplace de Servicios ─────────────────────────────────
  {
    id: 'marketplace-servicios',
    title: 'Marketplace de Servicios',
    status: 'in-progress',
    statusLabel: 'En desarrollo · 2026',
    year: '2026',
    description:
      'Plataforma que conecta clientes con trabajadores independientes para servicios del hogar y oficina. Incluye tres roles diferenciados: Admin (gestión de usuarios y categorías), Usuario (búsqueda y solicitud de servicios), y Trabajador (gestión de disponibilidad y trabajos).',
    technologies: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Figma', 'Node.js'],
    features: [
      'Sistema de roles: Admin, Usuario, Trabajador',
      'Autenticación y autorización con Supabase Auth',
      'Panel de Admin para gestión de usuarios y categorías',
      'Búsqueda y filtrado de servicios',
      'Sistema de solicitudes y asignaciones',
      'Dashboard de trabajador con disponibilidad',
      'Diseño responsive mobile-first',
    ],
    architectureDiagram: `
┌─────────────┐   ┌─────────────┐   ┌─────────────────┐
│  Panel      │   │  Panel      │   │  Panel          │
│  Admin      │   │  Usuario    │   │  Trabajador     │
│             │   │             │   │                 │
│ • Usuarios  │   │ • Búsqueda  │   │ • Disponib.     │
│ • Categorías│   │ • Solicitar │   │ • Mis trabajos  │
│ • Reportes  │   │ • Historial │   │ • Perfil        │
└──────┬──────┘   └──────┬──────┘   └────────┬────────┘
       │                 │                    │
       └─────────────────┼────────────────────┘
                         │
              ┌──────────▼──────────┐
              │   API / Backend     │
              │      Node.js        │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │  Supabase           │
              │  PostgreSQL + Auth  │
              └─────────────────────┘
    `.trim(),
    githubUrl: undefined,
  },

  // ── Proyecto 2: AI Delivery Assistant ────────────────────────────────────
  {
    id: 'ai-delivery-assistant',
    title: 'AI Delivery Assistant',
    status: 'professional-experience',
    statusLabel: 'Experiencia profesional · Cari AI',
    year: '2024–2025',
    context: 'Cari AI — Experiencia profesional (1 año)',
    description:
      'Bot de asistencia a domiciliarios desarrollado como parte de mi rol en Cari AI. Sistema de IA conversacional especializado para el sector delivery, con variables dinámicas, prompts especializados, base de conocimiento y automatización de flujos de pedidos.',
    technologies: [
      'Cari AI Platform',
      'Prompt Engineering',
      'AI Flows',
      'Knowledge Base',
      'Dynamic Variables',
    ],
    features: [
      'Variables dinámicas para personalización de respuestas',
      'Prompts especializados para contexto delivery',
      'Base de conocimiento para FAQs y procedimientos',
      'Automatización de flujos: recepción, confirmación, seguimiento',
      'Integración con sistema de pedidos',
      'Manejo de casos edge y excepciones',
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Busca un proyecto por id. Retorna undefined si no existe. */
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

/** Filtra proyectos por status */
export const getProjectsByStatus = (status: ProjectStatus): Project[] =>
  projects.filter((p) => p.status === status)
