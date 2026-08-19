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
  id: string
  degree: string
  institution: string
  location: string
  graduationDate: string
}

/** Exactly 5 certifications — Requirements 10.2, 10.3 */
export const REQUIRED_CERTIFICATION_COUNT = 5

export const certifications: Certification[] = [
  {
    id: 'bot-flows',
    title: 'Desarrollo de Flujos con Bots',
    issuer: 'Cari AI',
    date: 'Abril 2026',
    hours: 48,
  },
  {
    id: 'secure-dev',
    title: 'Desarrollo Seguro',
    issuer: 'Cari AI',
    date: 'Febrero 2026',
    hours: 48,
  },
  {
    id: 'frontend-html-css-js',
    title: 'Diseño y Desarrollo Front-End con HTML5, CSS y JavaScript',
    issuer: 'SENA',
    date: 'Diciembre 2024',
    hours: 96,
  },
  {
    id: 'software-stages',
    title: 'Aplicación de las Etapas del Desarrollo de Software',
    issuer: 'SENA',
    date: 'Octubre 2024',
    hours: 144,
  },
  {
    id: 'english-level1',
    title: 'English Does Word Level I',
    issuer: 'SENA',
    date: 'Marzo 2026',
    hours: 48,
  },
]

export const education: Education[] = [
  {
    id: 'adso-sena',
    degree: 'Tecnólogo en Análisis y Desarrollo de Software',
    institution: 'SENA',
    location: 'Colombia',
    graduationDate: 'Mayo 2026',
  },
  {
    id: 'bachiller',
    degree: 'Bachiller Académico',
    institution: 'I.E. Carlos M. Simmonds',
    location: 'Colombia',
    graduationDate: 'Diciembre 2022',
  },
]

/**
 * Validates a single certification:
 * - title, issuer, date must be non-empty strings
 * - hours must be greater than 0
 */
export function validateCertification(cert: Certification): boolean {
  return (
    typeof cert.title === 'string' && cert.title.trim().length > 0 &&
    typeof cert.issuer === 'string' && cert.issuer.trim().length > 0 &&
    typeof cert.date === 'string' && cert.date.trim().length > 0 &&
    typeof cert.hours === 'number' && cert.hours > 0
  )
}
