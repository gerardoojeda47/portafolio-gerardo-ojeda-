/**
 * CurrentlyBuilding.tsx
 * Displays the 4 things Gerardo is actively building right now.
 * Validates: Requirements 1.1, 1.2, 1.3
 */

import { motion, type Variants } from 'framer-motion'
import { buildingItems, type BuildingItem } from '@/data/currentlyBuilding'
import './CurrentlyBuilding.css'

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

// ─── BuildingCard ─────────────────────────────────────────────────────────────

interface BuildingCardProps {
  item: BuildingItem
}

function BuildingCard({ item }: BuildingCardProps) {
  return (
    <motion.article
      className={`building-card glass-card building-card--${item.color}`}
      variants={cardVariants}
      aria-label={item.label}
    >
      <span className="building-card__icon" aria-hidden="true">
        {item.icon}
      </span>
      <h3 className="building-card__label">{item.label}</h3>
      <p className="building-card__description">{item.description}</p>
      <span className="building-card__status" aria-label="En desarrollo activo">
        <span className="building-card__dot" aria-hidden="true" />
        En desarrollo
      </span>
    </motion.article>
  )
}

// ─── CurrentlyBuilding ────────────────────────────────────────────────────────

export function CurrentlyBuilding() {
  return (
    <section
      id="currently-building"
      className="section currently-building"
      aria-labelledby="building-title"
    >
      <div className="container">
        <motion.header
          className="currently-building__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="section-label">Currently Building</p>
          <h2 id="building-title" className="section-title">
            En qué estoy trabajando
          </h2>
          <p className="section-subtitle">
            Proyectos y áreas en desarrollo activo ahora mismo.
          </p>
        </motion.header>

        <motion.div
          className="building-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          role="list"
          aria-label="Proyectos en desarrollo"
        >
          {buildingItems.map((item) => (
            <div key={item.id} role="listitem">
              <BuildingCard item={item} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CurrentlyBuilding
