/**
 * engineering.ts — Engineering & Problem Solving data
 * Validates: Requirements 8.1, 8.2, 8.3, 8.4
 */

export interface EngineeringCategory {
  id: string
  title: string
  skills: string[]
}

export const engineeringCategories: EngineeringCategory[] = [
  {
    id: 'debugging',
    title: 'Debugging & Analysis',
    skills: [
      'Análisis de logs',
      'Identificación de errores',
      'Análisis de flujos',
      'Resolución de incidentes',
      'Investigación de causa raíz',
    ],
  },
  {
    id: 'qa',
    title: 'QA & Testing',
    skills: [
      'Testing funcional',
      'Testing manual',
      'Validación CRUD',
      'Reporte de inconsistencias',
      'Documentación de incidentes',
    ],
  },
  {
    id: 'support',
    title: 'Support Engineering',
    skills: [
      'Soporte a plataformas empresariales',
      'Monitoreo',
      'Gestión de incidentes',
      'Escalamiento',
      'Coordinación con desarrolladores',
      'Documentación técnica',
    ],
  },
]
