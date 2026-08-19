/**
 * EngineeringSection.tsx
 * Debugging, QA and Support Engineering skills.
 *
 * Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5
 */

import { motion, type Variants, type Easing } from 'framer-motion'
import { Bug, ClipboardCheck, Headphones } from 'lucide-react'
import { engineeringCategories } from '@/data/engineering'
import './EngineeringSection.css'

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
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
}

const ICON_MAP: Record<string, React.ReactNode> = {
  debugging: <Bug size={24} aria-hidden="true" />,
  qa: <ClipboardCheck size={24} aria-hidden="true" />,
  support: <Headphones size={24} aria-hidden="true" />,
}

export function EngineeringSection() {
  return (
    <section
      id="engineering"
      className="section engineering"
      aria-labelledby="engineering-title"
    >
      <div className="container">
        <motion.header
          className="engineering__header"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">Engineering</p>
          <h2 id="engineering-title" className="section-title">
            Problem Solving &amp; QA
          </h2>
          <p className="section-subtitle">
            Más allá de escribir código: debugging, testing y soporte técnico
            en entornos reales.
          </p>
        </motion.header>

        <motion.div
          className="engineering__grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          role="list"
          aria-label="Categorías de ingeniería"
        >
          {engineeringCategories.map((category) => (
            <motion.article
              key={category.id}
              className="engineering-card glass-card"
              variants={cardVariants}
              role="listitem"
              aria-label={category.title}
            >
              <div className="engineering-card__icon">
                {ICON_MAP[category.id]}
              </div>
              <h3 className="engineering-card__title">{category.title}</h3>
              <ul className="engineering-card__skills" aria-label={`Habilidades de ${category.title}`}>
                {category.skills.map((skill) => (
                  <li key={skill} className="engineering-card__skill mono">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default EngineeringSection
