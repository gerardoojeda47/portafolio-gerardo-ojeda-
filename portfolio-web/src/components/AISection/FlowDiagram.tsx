/**
 * FlowDiagram.tsx
 * Animated sequential flow diagram: USER → PROMPT → AI → CODE → REVIEW → TEST → DEPLOY
 *
 * - 7 nodes revealed one-by-one via Framer Motion stagger when the section
 *   enters the viewport (whileInView).
 * - Arrow connectors rendered between each pair of adjacent nodes.
 * - Styled with CSS custom properties from global.css (Dark Tech palette).
 *
 * Validates: Requirements 6.2, 6.5
 */

import { motion, type Variants } from 'framer-motion'
import './FlowDiagram.css'

// ─── Node definitions ─────────────────────────────────────────────────────────

export const FLOW_NODES = [
  { id: 'USER',   label: 'USER',   color: 'blue' },
  { id: 'PROMPT', label: 'PROMPT', color: 'cyan' },
  { id: 'AI',     label: 'AI',     color: 'violet' },
  { id: 'CODE',   label: 'CODE',   color: 'blue' },
  { id: 'REVIEW', label: 'REVIEW', color: 'cyan' },
  { id: 'TEST',   label: 'TEST',   color: 'violet' },
  { id: 'DEPLOY', label: 'DEPLOY', color: 'blue' },
] as const

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      // Each node appears 0.18s after the previous one
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
}

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: 'easeOut',
    },
  },
}

const arrowVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
}

// ─── FlowDiagram ─────────────────────────────────────────────────────────────

export function FlowDiagram() {
  return (
    <motion.div
      className="flow-diagram"
      role="img"
      aria-label="Flujo de trabajo con IA: USER → PROMPT → AI → CODE → REVIEW → TEST → DEPLOY"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {FLOW_NODES.map((node, index) => (
        <div key={node.id} className="flow-diagram__step">
          {/* Node */}
          <motion.div
            className={`flow-diagram__node flow-diagram__node--${node.color}`}
            variants={nodeVariants}
            data-testid={`flow-node-${node.id}`}
            aria-label={`Nodo ${index + 1}: ${node.label}`}
          >
            <span className="flow-diagram__node-label">{node.label}</span>
          </motion.div>

          {/* Arrow connector — rendered after every node except the last */}
          {index < FLOW_NODES.length - 1 && (
            <motion.div
              className="flow-diagram__arrow"
              variants={arrowVariants}
              aria-hidden="true"
            >
              <span className="flow-diagram__arrow-line" />
              <span className="flow-diagram__arrow-head">›</span>
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  )
}

export default FlowDiagram
