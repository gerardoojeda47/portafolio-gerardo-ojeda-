/**
 * Experience.tsx
 * Vertical timeline with professional experience entries.
 * Clicking a card opens ExperienceModal with full details.
 *
 * Validates: Requirements 2.1, 9.1, 9.2, 9.3, 9.4, 9.5
 */

import { useState, useRef } from 'react'
import { motion, type Variants, type Easing } from 'framer-motion'
import { Briefcase, Building2 } from 'lucide-react'
import { experience, type ExperienceEntry } from '@/data/experience'
import { ExperienceModal } from '@/components/ExperienceModal/ExperienceModal'
import './Experience.css'

const EASE_OUT: Easing = 'easeOut'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

const TYPE_LABELS: Record<ExperienceEntry['type'], string> = {
  'full-time': 'Tiempo completo',
  'part-time': 'Medio tiempo',
  internship: 'Práctica / Pasantía',
  contract: 'Contrato',
  freelance: 'Freelance',
}

function TimelineEntry({
  entry,
  index,
  onClick,
}: {
  entry: ExperienceEntry
  index: number
  onClick: (e: React.MouseEvent | React.KeyboardEvent) => void
}) {
  const fromLeft = index % 2 === 0

  return (
    <motion.article
      className={`timeline-entry timeline-entry--${fromLeft ? 'left' : 'right'} timeline-entry--clickable`}
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      aria-label={`${entry.role} en ${entry.company} — click para ver detalles`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(e)
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="timeline-entry__marker" aria-hidden="true">
        <Briefcase size={16} />
      </div>

      <div className="timeline-entry__card glass-card">
        <header className="timeline-entry__header">
          <div className="timeline-entry__company-row">
            <Building2 size={16} aria-hidden="true" />
            <h3 className="timeline-entry__company">{entry.company}</h3>
          </div>
          <p className="timeline-entry__role">{entry.role}</p>
          <div className="timeline-entry__meta mono">
            <span>{entry.period}</span>
            <span className="timeline-entry__dot" aria-hidden="true">·</span>
            <span>{entry.duration}</span>
            <span className="timeline-entry__dot" aria-hidden="true">·</span>
            <span>{TYPE_LABELS[entry.type]}</span>
          </div>
        </header>

        {entry.highlight && (
          <aside className="timeline-entry__highlight" role="note">
            {entry.highlight}
          </aside>
        )}

        <ul className="timeline-entry__responsibilities" aria-label="Responsabilidades">
          {entry.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="timeline-entry__cta" aria-hidden="true">Ver detalles →</p>
      </div>
    </motion.article>
  )
}

export function Experience() {
  const [selectedEntry, setSelectedEntry] = useState<ExperienceEntry | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  function handleEntryClick(entry: ExperienceEntry, el: HTMLElement) {
    triggerRef.current = el
    setSelectedEntry(entry)
  }

  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <motion.header
          className="experience__header"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">Experience</p>
          <h2 id="experience-title" className="section-title">
            Trayectoria profesional
          </h2>
          <p className="section-subtitle">
            Desde soporte técnico y desarrollo con IA hasta experiencia comercial
            que aporta visión de producto y usuario.
          </p>
        </motion.header>

        <div className="timeline" role="list" aria-label="Línea de tiempo profesional">
          {experience.map((entry, index) => (
            <div key={entry.id} role="listitem">
              <TimelineEntry
                entry={entry}
                index={index}
                onClick={(e) => {
                  const el = (e.currentTarget as HTMLElement)
                  handleEntryClick(entry, el)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <ExperienceModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        triggerRef={triggerRef}
      />
    </section>
  )
}

export default Experience
