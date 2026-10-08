/**
 * GitHubSection.tsx
 * Repositorios reales de GitHub con cards individuales + CTA al perfil.
 * Validates: Requirements 3.1, 3.2
 */

import { motion, type Variants } from 'framer-motion'
import { GitBranch, ExternalLink, Smartphone, Globe, MapPin } from 'lucide-react'
import './GitHubSection.css'

// ─── Datos de los repositorios ────────────────────────────────────────────────

interface Repo {
  id: string
  title: string
  description: string
  url: string
  technologies: string[]
  icon: React.ReactNode
  type: 'mobile' | 'web'
}

const REPOS: Repo[] = [
  {
    id: 'rutasapp',
    title: 'RutasApp',
    description:
      'Aplicación móvil para gestión y consulta de rutas de transporte. Permite a los usuarios explorar rutas disponibles, ver paradas y obtener información de recorridos.',
    url: 'https://github.com/gerardoojeda47/rutasapp',
    technologies: ['Flutter', 'Dart', 'Mobile'],
    icon: <MapPin size={22} aria-hidden="true" />,
    type: 'mobile',
  },
  {
    id: 'appmovilautos',
    title: 'App Móvil Autos',
    description:
      'Aplicación móvil para exploración y catálogo de automóviles. Incluye listado de vehículos, filtros y visualización de detalles.',
    url: 'https://github.com/gerardoojeda47/appmovilautos',
    technologies: ['Flutter', 'Dart', 'Mobile'],
    icon: <Smartphone size={22} aria-hidden="true" />,
    type: 'mobile',
  },
  {
    id: 'paginawedrutas',
    title: 'Página Web Rutas',
    description:
      'Versión web del sistema de rutas de transporte. Interfaz responsive para consulta de rutas y paradas desde el navegador.',
    url: 'https://github.com/gerardoojeda47/paginawedrutas',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Web'],
    icon: <Globe size={22} aria-hidden="true" />,
    type: 'web',
  },
]

const GITHUB_PROFILE_URL = 'https://github.com/gerardoojeda47'

// ─── Animation variants ───────────────────────────────────────────────────────

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

// ─── Repo Card ────────────────────────────────────────────────────────────────

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <motion.article
      className="repo-card glass-card glass-card--lift"
      variants={cardVariants}
      aria-label={`Repositorio: ${repo.title}`}
    >
      <div className="repo-card__header">
        <div className={`repo-card__icon repo-card__icon--${repo.type}`}>
          {repo.icon}
        </div>
        <h3 className="repo-card__title">{repo.title}</h3>
      </div>

      <p className="repo-card__description">{repo.description}</p>

      <div className="repo-card__tech" aria-label="Tecnologías">
        {repo.technologies.map((tech) => (
          <span key={tech} className="repo-card__tech-chip mono">
            {tech}
          </span>
        ))}
      </div>

      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost repo-card__link"
        aria-label={`Ver ${repo.title} en GitHub`}
      >
        <ExternalLink size={14} aria-hidden="true" />
        Ver repositorio
      </a>
    </motion.article>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function GitHubSection() {
  return (
    <section
      id="github"
      className="section github-section"
      aria-labelledby="github-title"
    >
      <div className="container">
        <motion.header
          className="github-section__header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">Open Source</p>
          <h2 id="github-title" className="section-title">
            Código en GitHub
          </h2>
          <p className="section-subtitle">
            Repositorios públicos — proyectos reales con código disponible.
          </p>
        </motion.header>

        {/* Repo cards grid */}
        <motion.div
          className="github-section__grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          role="list"
          aria-label="Repositorios de GitHub"
        >
          {REPOS.map((repo) => (
            <div key={repo.id} role="listitem">
              <RepoCard repo={repo} />
            </div>
          ))}
        </motion.div>

        {/* CTA al perfil completo */}
        <motion.div
          className="github-section__cta"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            aria-label="Ver perfil completo de GitHub de Gerardo Ojeda (abre en pestaña nueva)"
          >
            <GitBranch size={16} aria-hidden="true" />
            Ver perfil en GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubSection
