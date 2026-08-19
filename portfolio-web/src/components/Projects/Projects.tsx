/**
 * Projects.tsx
 * Project cards with honest status badges and architecture diagram.
 *
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5
 */

import { motion, type Variants, type Easing } from 'framer-motion'
import { ExternalLink, Layers } from 'lucide-react'
import { projects, type Project } from '@/data/projects'
import './Projects.css'

const EASE_OUT: Easing = 'easeOut'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
}

function statusBadgeClass(status: Project['status']): string {
  switch (status) {
    case 'in-progress':
      return 'badge--working'
    case 'professional-experience':
      return 'badge--primary'
    case 'completed':
      return 'badge--primary'
    default:
      return 'badge--self-learning'
  }
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="project-card glass-card glass-card--lift"
      variants={cardVariants}
      aria-label={`Proyecto: ${project.title}`}
    >
      <header className="project-card__header">
        <div className="project-card__title-row">
          <h3 className="project-card__title">{project.title}</h3>
          <span className={`badge project-card__status ${statusBadgeClass(project.status)}`}>
            {project.statusLabel}
          </span>
        </div>
        {project.context && (
          <p className="project-card__context">{project.context}</p>
        )}
      </header>

      <p className="project-card__description">{project.description}</p>

      <div className="project-card__tech" aria-label="Tecnologías del proyecto">
        {project.technologies.map((tech) => (
          <span key={tech} className="project-card__tech-chip mono">
            {tech}
          </span>
        ))}
      </div>

      <ul className="project-card__features" aria-label="Características del proyecto">
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      {project.architectureDiagram && (
        <div className="project-card__diagram">
          <div className="project-card__diagram-header">
            <Layers size={16} aria-hidden="true" />
            <span>Arquitectura</span>
          </div>
          <pre className="project-card__diagram-code mono" aria-label="Diagrama de arquitectura">
            {project.architectureDiagram}
          </pre>
        </div>
      )}

      {(project.githubUrl || project.liveUrl) && (
        <footer className="project-card__links">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost project-card__link"
              aria-label={`Ver código de ${project.title} en GitHub`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost project-card__link"
              aria-label={`Ver demo de ${project.title}`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              Demo
            </a>
          )}
        </footer>
      )}
    </motion.article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <motion.header
          className="projects__header"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">Projects</p>
          <h2 id="projects-title" className="section-title">
            Proyectos reales
          </h2>
          <p className="section-subtitle">
            Proyectos con estado honesto — sin inflar logros ni marcar como completados
            lo que aún está en desarrollo.
          </p>
        </motion.header>

        <motion.div
          className="projects__grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          role="list"
          aria-label="Lista de proyectos"
        >
          {projects.map((project) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
