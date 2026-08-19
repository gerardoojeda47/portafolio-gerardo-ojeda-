/**
 * Contact.tsx
 * Contact section with exactly 3 contact buttons.
 *
 * Validates: Requirements 11.1, 11.2
 */

import { motion, type Variants, type Easing } from 'framer-motion'
import { Mail, MessageCircle, GitBranch } from 'lucide-react'
import { contactLinks } from '@/data/contact'
import './Contact.css'

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
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
}

const ICON_MAP: Record<string, React.ReactNode> = {
  email: <Mail size={22} aria-hidden="true" />,
  whatsapp: <MessageCircle size={22} aria-hidden="true" />,
  github: <GitBranch size={22} aria-hidden="true" />,
}

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <motion.header
          className="contact__header"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">Contact</p>
          <h2 id="contact-title" className="contact__headline">
            Let&apos;s build something.
          </h2>
          <p className="contact__subtext">
            ¿Tienes una idea, proyecto o reto tecnológico? Hablemos.
          </p>
        </motion.header>

        <motion.nav
          className="contact__buttons"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          aria-label="Opciones de contacto"
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              className="contact-btn glass-card"
              variants={itemVariants}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              aria-label={`${link.label}: ${link.display}`}
            >
              <span className="contact-btn__icon">{ICON_MAP[link.id]}</span>
              <span className="contact-btn__label">{link.label}</span>
              <span className="contact-btn__display mono">{link.display}</span>
            </motion.a>
          ))}
        </motion.nav>
      </div>
    </section>
  )
}

export default Contact
