/**
 * About.tsx
 * About Me section — professional bio and 6 strength cards.
 * Cards animate into view with staggered entrance using Framer Motion.
 *
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4
 */

import {
  BookOpen,
  Cpu,
  Search,
  Sparkles,
  TrendingUp,
  MessageSquare,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { strengths } from '@/data/strengths'
import type { Strength } from '@/data/strengths'
import './About.css'

// ─── Icon map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen:     <BookOpen size={24} aria-hidden="true" />,
  Cpu:          <Cpu size={24} aria-hidden="true" />,
  Search:       <Search size={24} aria-hidden="true" />,
  Sparkles:     <Sparkles size={24} aria-hidden="true" />,
  TrendingUp:   <TrendingUp size={24} aria-hidden="true" />,
  MessageSquare:<MessageSquare size={24} aria-hidden="true" />,
}

// ─── Animation variants ───────────────────────────────────────────────────────

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
}

// ─── Strength Card ────────────────────────────────────────────────────────────

interface StrengthCardProps {
  strength: Strength
}

function StrengthCard({ strength }: StrengthCardProps) {
  const icon = ICON_MAP[strength.icon] ?? null

  return (
    <motion.article
      className="about__strength-card glass-card"
      variants={cardVariants}
      aria-label={`Fortaleza: ${strength.title}`}
    >
      <div className="about__strength-icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="about__strength-title">{strength.title}</h3>
      <p className="about__strength-desc">{strength.description}</p>
    </motion.article>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function About() {
  return (
    <section id="about" className="about section" aria-labelledby="about-heading">
      <div className="container">

        {/* ── Section header ── */}
        <motion.div
          className="about__header"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="section-label">// about me</p>
          <h2 id="about-heading" className="section-title about__title">
            El desarrollador detrás del código
          </h2>
        </motion.div>

        {/* ── Bio + Tier legend layout ── */}
        <motion.div
          className="about__intro"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Bio text — Req 4.1 */}
          <div className="about__bio">
            <p className="about__bio-text">
              Soy desarrollador de software con enfoque en Mobile, Web, Backend e Inteligencia
              Artificial. Combino experiencia técnica en desarrollo con background en soporte, QA
              y análisis. Me especializo en construir soluciones completas usando React, Flutter y
              Node.js, y aplico herramientas de IA para acelerar flujos de trabajo sin sacrificar
              criterio técnico. Actualmente en formación continua hacia arquitecturas cloud y
              sistemas escalables.
            </p>
          </div>

          {/* Tier legend — Req 4.3 */}
          <aside className="about__tiers" aria-label="Niveles de experiencia técnica">
            <p className="about__tiers-label">Niveles de experiencia</p>
            <ul className="about__tiers-list" role="list">
              <li>
                <span className="badge badge--primary" aria-label="Nivel: Primary Stack">
                  Primary Stack
                </span>
                <span className="about__tier-desc">Experiencia profesional directa</span>
              </li>
              <li>
                <span className="badge badge--working" aria-label="Nivel: Working Knowledge">
                  Working Knowledge
                </span>
                <span className="about__tier-desc">Proyectos personales funcionales</span>
              </li>
              <li>
                <span className="badge badge--self-learning" aria-label="Nivel: Self-Learning">
                  Self-Learning
                </span>
                <span className="about__tier-desc">Aprendizaje autodidacta activo</span>
              </li>
            </ul>
          </aside>
        </motion.div>

        {/* ── Strengths heading ── */}
        <motion.div
          className="about__strengths-header"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="section-title about__strengths-title">Fortalezas</h2>
        </motion.div>

        {/* ── Strength cards grid — Req 4.2, 4.4 ── */}
        <motion.div
          className="about__strengths-grid"
          role="list"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          aria-label="Fortalezas profesionales"
        >
          {strengths.map((strength) => (
            <div key={strength.id} role="listitem">
              <StrengthCard strength={strength} />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default About
