/**
 * ExperienceModal.tsx
 * React portal modal for displaying full ExperienceEntry details.
 *
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 6.3, 6.4
 */

import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Building2, Briefcase } from 'lucide-react'
import { type ExperienceEntry } from '@/data/experience'
import './ExperienceModal.css'

interface ExperienceModalProps {
  entry: ExperienceEntry | null
  onClose: () => void
  triggerRef?: React.RefObject<HTMLElement | null>
}

const TYPE_LABELS: Record<ExperienceEntry['type'], string> = {
  'full-time': 'Tiempo completo',
  'part-time': 'Medio tiempo',
  internship: 'Práctica / Pasantía',
  contract: 'Contrato',
  freelance: 'Freelance',
}

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function ExperienceModal({ entry, onClose, triggerRef }: ExperienceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const titleId = 'experience-modal-title'

  // Lock body scroll while open
  useEffect(() => {
    if (!entry) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [entry])

  // Focus first focusable element when modal opens
  useEffect(() => {
    if (!entry) return
    const frame = requestAnimationFrame(() => {
      const el = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTORS)
      el?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [entry])

  // Return focus to trigger on close
  const handleClose = useCallback(() => {
    onClose()
    requestAnimationFrame(() => {
      triggerRef?.current?.focus()
    })
  }, [onClose, triggerRef])

  // Keyboard: Escape closes, Tab traps focus
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
      ).filter((el) => !el.closest('[aria-hidden]'))

      if (focusable.length === 0) {
        e.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [handleClose],
  )

  // Click outside closes
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) handleClose()
    },
    [handleClose],
  )

  const modal = (
    <AnimatePresence>
      {entry && (
        <motion.div
          className="experience-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            ref={modalRef}
            className="experience-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="experience-modal__header">
              <div className="experience-modal__company-row">
                <Building2 size={18} aria-hidden="true" />
                <h2 id={titleId} className="experience-modal__company">
                  {entry.company}
                </h2>
              </div>
              <button
                className="experience-modal__close"
                onClick={handleClose}
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="experience-modal__body">
              <div className="experience-modal__role-row">
                <Briefcase size={16} aria-hidden="true" />
                <p className="experience-modal__role">{entry.role}</p>
              </div>

              <div className="experience-modal__meta mono">
                <span>{entry.period}</span>
                <span aria-hidden="true"> · </span>
                <span>{entry.duration}</span>
                <span aria-hidden="true"> · </span>
                <span>{TYPE_LABELS[entry.type]}</span>
              </div>

              {entry.highlight && (
                <aside className="experience-modal__highlight" role="note">
                  {entry.highlight}
                </aside>
              )}

              <ul
                className="experience-modal__responsibilities"
                aria-label="Responsabilidades"
              >
                {entry.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modal, document.body)
}

export default ExperienceModal
