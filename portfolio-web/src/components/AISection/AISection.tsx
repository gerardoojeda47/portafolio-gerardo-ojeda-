/**
 * AISection.tsx
 * AI & Automation section of the portfolio.
 *
 * Features:
 * - Animated flow diagram: USER → PROMPT → AI → CODE → REVIEW → TEST → DEPLOY
 * - List of AI tools with brief descriptions (Req 6.1)
 * - Prominent featured quote (Req 6.3)
 * - List of practical AI applications (Req 6.4)
 * - Scroll-reveal entrance animation via Framer Motion (Req 6.5)
 *
 * Validates: Requirements 6.1, 6.3, 6.4, 6.5
 */

import { motion, type Variants, type Easing } from 'framer-motion'
import { Bot, Zap, Code2, FileSearch, MessageSquare, Workflow } from 'lucide-react'
import { FlowDiagram } from './FlowDiagram'
import './AISection.css'

// ─── AI Tools data (Req 6.1) ──────────────────────────────────────────────────

interface AITool {
  name: string
  description: string
  icon: React.ReactNode
}

const AI_TOOLS: AITool[] = [
  {
    name: 'ChatGPT',
    description:
      'Asistencia en arquitectura, resolución de dudas técnicas, generación de documentación y análisis de errores complejos.',
    icon: <Bot size={20} aria-hidden="true" />,
  },
  {
    name: 'GitHub Copilot',
    description:
      'Autocompletado inteligente en el editor, sugerencias de código en contexto y aceleración de tareas repetitivas.',
    icon: <Code2 size={20} aria-hidden="true" />,
  },
  {
    name: 'Cursor',
    description:
      'IDE con IA integrada para refactoring, generación de funciones completas y navegación inteligente del codebase.',
    icon: <FileSearch size={20} aria-hidden="true" />,
  },
  {
    name: 'Antigravity',
    description:
      'Plataforma de automatización y flujos con bots para procesos de negocio, integración de canales y manejo de conocimiento.',
    icon: <Workflow size={20} aria-hidden="true" />,
  },
  {
    name: 'Kiro AI',
    description:
      'Entorno de desarrollo asistido por IA para spec-driven development, generación de tests y ejecución autónoma de tareas.',
    icon: <MessageSquare size={20} aria-hidden="true" />,
  },
]

// ─── Practical AI applications (Req 6.4) ─────────────────────────────────────

const AI_APPLICATIONS: string[] = [
  'Generación de código',
  'Refactoring',
  'Debugging',
  'Documentación',
  'Análisis de errores',
  'Prompt engineering',
  'Creación de chatbots',
  'Creación de agentes',
  'Automatización de procesos',
  'Bases de conocimiento',
  'Flujos inteligentes',
]

// ─── Animation variants ───────────────────────────────────────────────────────

const EASE_OUT: Easing = 'easeOut'

const sectionVariants: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.10,
      delayChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
}

const quoteVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AIToolCard({ tool }: { tool: AITool }) {
  return (
    <motion.article
      className="ai-tool-card glass-card"
      variants={itemVariants}
      aria-label={`Herramienta: ${tool.name}`}
    >
      <div className="ai-tool-card__header">
        <span className="ai-tool-card__icon">{tool.icon}</span>
        <h3 className="ai-tool-card__name">{tool.name}</h3>
      </div>
      <p className="ai-tool-card__description">{tool.description}</p>
    </motion.article>
  )
}

function ApplicationChip({ label }: { label: string }) {
  return (
    <motion.li
      className="ai-app-chip"
      variants={itemVariants}
      role="listitem"
    >
      <Zap size={12} aria-hidden="true" className="ai-app-chip__icon" />
      {label}
    </motion.li>
  )
}

// ─── AISection ────────────────────────────────────────────────────────────────

export function AISection() {
  return (
    <section
      id="ai"
      className="section aisection"
      aria-labelledby="ai-title"
    >
      <div className="container">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.header
          className="aisection__header"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">AI &amp; Automation</p>
          <h2 id="ai-title" className="section-title">
            Inteligencia Artificial en mi flujo de trabajo
          </h2>
          <p className="section-subtitle">
            Herramientas, aplicaciones prácticas y la filosofía detrás de cómo integro la IA
            en el desarrollo diario.
          </p>
        </motion.header>

        {/* ── Flow Diagram (Req 6.2, 6.5) ────────────────────────────── */}
        <motion.div
          className="aisection__diagram-wrapper"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <p className="aisection__diagram-label section-label" aria-hidden="true">
            Flujo de desarrollo asistido por IA
          </p>
          <FlowDiagram />
        </motion.div>

        {/* ── Featured quote (Req 6.3) ────────────────────────────────── */}
        <motion.blockquote
          className="aisection__quote"
          variants={quoteVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          aria-label="Filosofía de trabajo con IA"
        >
          <span className="aisection__quote-mark" aria-hidden="true">"</span>
          Uso AI para acelerar el desarrollo, no para reemplazar el criterio técnico.
          <span className="aisection__quote-mark" aria-hidden="true">"</span>
        </motion.blockquote>

        {/* ── Two-column body ─────────────────────────────────────────── */}
        <div className="aisection__body">

          {/* Left — AI Tools (Req 6.1) */}
          <div className="aisection__tools">
            <motion.h3
              className="aisection__sub-title"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              Herramientas de IA
            </motion.h3>

            <motion.div
              className="aisection__tools-grid"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              role="list"
              aria-label="Lista de herramientas de IA"
            >
              {AI_TOOLS.map((tool) => (
                <AIToolCard key={tool.name} tool={tool} />
              ))}
            </motion.div>
          </div>

          {/* Right — Practical Applications (Req 6.4) */}
          <div className="aisection__applications">
            <motion.h3
              className="aisection__sub-title"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              Aplicaciones prácticas
            </motion.h3>

            <motion.ul
              className="aisection__app-list"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              aria-label="Aplicaciones prácticas de IA"
            >
              {AI_APPLICATIONS.map((app) => (
                <ApplicationChip key={app} label={app} />
              ))}
            </motion.ul>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AISection
