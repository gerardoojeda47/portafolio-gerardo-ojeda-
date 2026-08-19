/**
 * experience.ts — Professional experience data for the portfolio.
 *
 * Entries are stored in reverse chronological order (most recent first).
 * Validates: Requirements 1.3, 9.1, 9.2
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  period: string
  duration: string
  type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance'
  responsibilities: string[]
  highlight?: string  // nota especial visible en la card
  startYear: number   // para ordenamiento cronológico
  startMonth: number  // 1-12 para ordenamiento
}

// ─── Data ─────────────────────────────────────────────────────────────────────

/**
 * Professional experience entries in descending chronological order
 * (most recent first). startYear + startMonth drive the sort key.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'defytek-support-engineer',
    company: 'Defytek SAS',
    role: 'Support Engineer',
    period: 'Nov 2025 – May 2026',
    duration: '7 meses',
    type: 'internship',
    startYear: 2025,
    startMonth: 11,
    responsibilities: [
      'Soporte técnico a plataformas empresariales',
      'Monitoreo y gestión de incidentes',
      'Escalamiento y coordinación con equipos de desarrollo',
      'Documentación técnica de procedimientos',
      'Análisis de logs y diagnóstico de errores',
    ],
    highlight: 'Práctica profesional SENA — Tecnólogo en ADSO',
  },
  {
    id: 'cari-ai-support-developer',
    company: 'Cari AI',
    role: 'Support Developer',
    period: '2024 – 2025',
    duration: '1 año',
    type: 'contract',
    startYear: 2024,
    startMonth: 1,
    responsibilities: [
      'Desarrollo de bot AI para asistencia a domiciliarios',
      'Diseño de prompts especializados y variables dinámicas',
      'Construcción de bases de conocimiento y flujos de automatización',
      'QA funcional: testing manual y validación de CRUD',
      'Documentación de incidencias y reportes de inconsistencias',
      'Coordinación con el equipo de producto',
    ],
  },
  {
    id: 'dsmax-asesor-comercial',
    company: 'DS Máx. Digital',
    role: 'Asesor Comercial Online',
    period: 'Jun 2023 – May 2026',
    duration: '3 años',
    type: 'part-time',
    startYear: 2023,
    startMonth: 6,
    responsibilities: [
      'Asesoría comercial de productos y servicios digitales',
      'Gestión de clientes y seguimiento de ventas',
      'Apoyo en estrategias de marketing digital',
    ],
    highlight:
      'Experiencia comercial que aporta visión de usuario y negocio al desarrollo de producto',
  },
  {
    id: 'inspira-asesor-externo',
    company: 'Inspira Colombia / Leader Tribe',
    role: 'Asesor Comercial Externo',
    period: 'Nov 2021 – May 2024',
    duration: '2 años 6 meses',
    type: 'contract',
    startYear: 2021,
    startMonth: 11,
    responsibilities: [
      'Venta directa y asesoría comercial externa',
      'Gestión de cartera de clientes',
      'Negociación y cierre de acuerdos comerciales',
    ],
    highlight:
      'Comprensión profunda de flujos comerciales aplicada al diseño del Marketplace de Servicios',
  },
  {
    id: 'freelance-domiciliario',
    company: 'Freelance / Independiente',
    role: 'Domiciliario y Mensajero',
    period: '2021',
    duration: '6 meses',
    type: 'freelance',
    startYear: 2021,
    startMonth: 1,
    responsibilities: [
      'Gestión de entregas y rutas de mensajería',
      'Coordinación con clientes y negocios',
      'Resolución de incidencias en tiempo real',
    ],
    highlight:
      'Experiencia directa en el sector delivery que inspiró el proyecto Marketplace de Servicios',
  },
]

// ─── Validation utilities ─────────────────────────────────────────────────────

/**
 * Validates that the required string fields of an ExperienceEntry are
 * non-empty.  Returns true when the entry is valid, false otherwise.
 */
export function validateExperienceEntry(entry: ExperienceEntry): boolean {
  return (
    typeof entry.company === 'string' && entry.company.trim().length > 0 &&
    typeof entry.role === 'string' && entry.role.trim().length > 0 &&
    typeof entry.period === 'string' && entry.period.trim().length > 0
  )
}

/**
 * Returns the numeric sort key for an entry: YYYYMM as an integer.
 * Higher values represent more recent dates.
 */
function sortKey(entry: ExperienceEntry): number {
  return entry.startYear * 100 + entry.startMonth
}

/**
 * Validates that an array of ExperienceEntry is in strictly descending
 * chronological order (most recent first).
 *
 * Returns true when every consecutive pair (a, b) satisfies
 * sortKey(a) >= sortKey(b).
 *
 * Note: equal sort keys (same YYYYMM) are allowed, since two roles can
 * legitimately start in the same month.
 */
export function isDescendingChronological(entries: ExperienceEntry[]): boolean {
  for (let i = 0; i < entries.length - 1; i++) {
    if (sortKey(entries[i]) < sortKey(entries[i + 1])) {
      return false
    }
  }
  return true
}
