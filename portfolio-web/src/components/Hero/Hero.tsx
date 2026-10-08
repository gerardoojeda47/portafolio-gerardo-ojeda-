/**
 * Hero.tsx
 * Primary landing section for Gerardo Ojeda Riascos' portfolio.
 *
 * Features:
 * - Animated name, title, and subtitle using Framer Motion stagger (≤800ms)
 * - Four CTA buttons: Ver proyectos, Descargar CV, GitHub, Contactarme
 * - Embedded TerminalWindow component
 * - Subtle animated background with gradient mesh and floating code particles
 *
 * Validates: Requirements 3.1, 3.3, 3.4, 3.5
 */

import { useCallback } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ArrowDown, Download, GitBranch, Mail } from 'lucide-react'
import { TerminalWindow } from './TerminalWindow'
import profilePhoto from '@/assets/profile.jpg'
import './Hero.css'

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      // ease-out-expo approximation within 800ms total
      ease: 'circOut' as const,
    },
  },
}

const ctaContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
}

const ctaItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

// ─── Floating code particles data ─────────────────────────────────────────────

const CODE_SNIPPETS = [
  'const dev = new Gerardo()',
  'await deploy()',
  'git commit -m "feat"',
  'npm run build',
  '> flutter run',
  'SELECT * FROM projects',
  'export default Hero',
  'import AI from "future"',
  '.then(ship => ship())',
  'fn main() {}',
  '<Component />',
  '{ ...spread }',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FloatingParticles() {
  return (
    <div className="hero__particles" aria-hidden="true">
      {CODE_SNIPPETS.map((snippet, i) => (
        <span
          key={i}
          className="hero__particle"
          style={{
            // Spread particles across full width
            left: `${(i * 8.5 + 3) % 95}%`,
            // Stagger starting vertical position so they aren't all at top
            top: `${(i * 13 + 5) % 90}%`,
            // Vary animation duration and delay per particle
            animationDuration: `${18 + (i % 7) * 4}s`,
            animationDelay: `${(i * 1.7) % 10}s`,
          }}
        >
          {snippet}
        </span>
      ))}
    </div>
  )
}

// ─── Decorative code fragments (Req 5.3) ──────────────────────────────────────

const CODE_FRAGMENTS = [
  `const engineer = {\n  skills: ['Flutter','React','Node'],\n  passion: 'building'\n}`,
  `async function deploy() {\n  await build()\n  return ship()\n}`,
  `type Stack = {\n  mobile: 'Flutter'\n  web: 'React'\n  ai: 'Python'\n}`,
  `SELECT *\nFROM projects\nWHERE shipped = true`,
]

const FRAGMENT_POSITIONS = [
  'hero__fragment--top-left',
  'hero__fragment--top-right',
  'hero__fragment--bottom-left',
  'hero__fragment--bottom-right',
] as const

function CodeFragments() {
  return (
    <div className="hero__fragments" aria-hidden="true">
      {CODE_FRAGMENTS.map((fragment, i) => (
        <pre key={i} className={`hero__fragment ${FRAGMENT_POSITIONS[i]}`}>
          {fragment}
        </pre>
      ))}
    </div>
  )
}

function GradientMesh() {
  return (
    <div className="hero__gradient-mesh" aria-hidden="true">
      <div className="hero__gradient-orb hero__gradient-orb--blue" />
      <div className="hero__gradient-orb hero__gradient-orb--violet" />
      <div className="hero__gradient-orb hero__gradient-orb--cyan" />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Hero() {
  const handleScrollToProjects = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      scrollToSection('projects')
    },
    []
  )

  const handleScrollToContact = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      scrollToSection('contact')
    },
    []
  )

  return (
    <section
      id="hero"
      className="hero section"
      aria-label="Hero — Gerardo Ojeda Riascos"
    >
      {/* ── Animated background ─────────────────────────────────────── */}
      <GradientMesh />
      <FloatingParticles />
      <CodeFragments />

      {/* ── Content grid ────────────────────────────────────────────── */}
      <div className="hero__inner container">

        {/* Left column — text + CTAs */}
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow label */}
          <motion.p
            className="hero__eyebrow section-label"
            variants={itemVariants}
          >
            {'<'}Software Developer{' />'}
          </motion.p>

          {/* Profile photo */}
          <motion.div
            className="hero__avatar-wrapper"
            variants={itemVariants}
          >
            <img
              src={profilePhoto}
              alt="Foto de perfil de Gerardo Ojeda Riascos"
              className="hero__avatar"
              width={96}
              height={96}
            />
          </motion.div>

          {/* Full name — Req 3.1 */}
          <motion.h1
            className="hero__name"
            variants={itemVariants}
          >
            GERARDO
            <br />
            <span className="hero__name-accent">OJEDA</span>
            {' '}RIASCOS
          </motion.h1>

          {/* Title — Req 3.1 */}
          <motion.p
            className="hero__title"
            variants={itemVariants}
          >
            Software Developer
          </motion.p>

          {/* Subtitle — Req 3.1 */}
          <motion.p
            className="hero__subtitle mono"
            variants={itemVariants}
          >
            Mobile&nbsp;·&nbsp;Web&nbsp;·&nbsp;Backend&nbsp;·&nbsp;AI
          </motion.p>

          {/* CTA buttons — Req 3.3 */}
          <motion.div
            className="hero__ctas"
            variants={ctaContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Ver proyectos — scroll to #projects */}
            <motion.a
              href="#projects"
              className="btn btn-primary hero__cta"
              onClick={handleScrollToProjects}
              variants={ctaItemVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Ver proyectos"
            >
              <ArrowDown size={16} aria-hidden="true" />
              Ver proyectos
            </motion.a>

            {/* Descargar CV — file download */}
            <motion.a
              href="/cv-gerardo-ojeda.pdf"
              className="btn btn-secondary hero__cta"
              download
              variants={ctaItemVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Descargar CV de Gerardo Ojeda"
            >
              <Download size={16} aria-hidden="true" />
              Descargar CV
            </motion.a>

            {/* GitHub — external link */}
            <motion.a
              href="https://github.com/gerardoojeda47"
              className="btn btn-secondary hero__cta"
              target="_blank"
              rel="noopener noreferrer"
              variants={ctaItemVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Ver perfil de GitHub de Gerardo Ojeda"
            >
              <GitBranch size={16} aria-hidden="true" />
              GitHub
            </motion.a>

            {/* Contactarme — scroll to #contact */}
            <motion.a
              href="#contact"
              className="btn btn-ghost hero__cta"
              onClick={handleScrollToContact}
              variants={ctaItemVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Contactar a Gerardo Ojeda"
            >
              <Mail size={16} aria-hidden="true" />
              Contactarme
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="hero__scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            aria-hidden="true"
          >
            <span className="hero__scroll-line" />
          </motion.div>
        </motion.div>

        {/* Right column — Terminal */}
        <motion.div
          className="hero__terminal-wrapper"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
        >
          <TerminalWindow />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
