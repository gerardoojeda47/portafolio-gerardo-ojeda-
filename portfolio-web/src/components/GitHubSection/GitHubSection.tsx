/**
 * GitHubSection.tsx
 * Premium GitHub profile card with CTA.
 * Validates: Requirements 3.1, 3.2
 */

import { motion } from 'framer-motion'
import { GitBranch, ExternalLink } from 'lucide-react'
import './GitHubSection.css'

const GITHUB_URL = 'https://github.com/gerardoojeda47'
const GITHUB_USERNAME = 'github.com/gerardoojeda47'

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="section-label">Open Source</p>
          <h2 id="github-title" className="section-title">
            Código en GitHub
          </h2>
        </motion.header>

        <motion.div
          className="github-card glass-card glass-card--accent"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="github-card__icon" aria-hidden="true">
            <GitBranch size={40} />
          </div>

          <div className="github-card__body">
            <p className="github-card__username mono" aria-label={`GitHub username: ${GITHUB_USERNAME}`}>
              {GITHUB_USERNAME}
            </p>
            <p className="github-card__description">
              Proyectos personales, experimentos con IA, apps Flutter y herramientas web.
            </p>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary github-card__cta"
            aria-label="Ver perfil de GitHub de Gerardo Ojeda (abre en pestaña nueva)"
          >
            <ExternalLink size={16} aria-hidden="true" />
            View my GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubSection
