/**
 * Certifications.tsx
 * Education entries and exactly 5 certification cards.
 *
 * Validates: Requirements 10.1, 10.2, 10.3, 10.4
 */

import { motion, type Variants, type Easing } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { certifications, education } from '@/data/certifications'
import './Certifications.css'

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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
}

export function Certifications() {
  return (
    <section
      id="education"
      className="section certifications"
      aria-labelledby="education-title"
    >
      <div className="container">
        <motion.header
          className="certifications__header"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">Education</p>
          <h2 id="education-title" className="section-title">
            Formación &amp; Certificaciones
          </h2>
          <p className="section-subtitle">
            Educación formal y certificaciones verificables — sin inventar credenciales.
          </p>
        </motion.header>

        {/* Education */}
        <motion.div
          className="certifications__education"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          role="list"
          aria-label="Formación académica"
        >
          {education.map((entry) => (
            <motion.article
              key={entry.id}
              className="education-card glass-card"
              variants={cardVariants}
              role="listitem"
            >
              <div className="education-card__icon" aria-hidden="true">
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="education-card__degree">{entry.degree}</h3>
                <p className="education-card__institution">
                  {entry.institution} · {entry.location}
                </p>
                <p className="education-card__date mono">
                  Graduado: {entry.graduationDate}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.h3
          className="certifications__sub-title"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          Certificaciones
        </motion.h3>

        <motion.div
          className="certifications__grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          role="list"
          aria-label="Certificaciones"
        >
          {certifications.map((cert) => (
            <motion.article
              key={cert.id}
              className="cert-card glass-card"
              variants={cardVariants}
              role="listitem"
              aria-label={`Certificación: ${cert.title}`}
            >
              <div className="cert-card__icon" aria-hidden="true">
                <Award size={20} />
              </div>
              <h4 className="cert-card__title">{cert.title}</h4>
              <p className="cert-card__issuer">{cert.issuer}</p>
              <div className="cert-card__meta mono">
                <span>{cert.date}</span>
                <span aria-hidden="true">·</span>
                <span>{cert.hours}h</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
