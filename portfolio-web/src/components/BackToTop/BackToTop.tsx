/**
 * BackToTop.tsx
 * Sticky button visible after 400px scroll.
 *
 * Validates: Requirements 11.4
 */

import { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import './BackToTop.css'

const SCROLL_THRESHOLD = 400

export function BackToTop() {
  const scrollY = useScrollPosition()
  const isVisible = scrollY > SCROLL_THRESHOLD

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25 }}
          aria-label="Volver arriba"
          title="Volver arriba"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
