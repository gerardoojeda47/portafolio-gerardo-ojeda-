/**
 * Footer.tsx
 * Site footer with name, title, stack and copyright.
 *
 * Validates: Requirements 11.3
 */

import './Footer.css'

export function Footer() {
  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">GERARDO OJEDA RIASCOS</p>
          <p className="footer__title">Software Developer</p>
          <p className="footer__stack mono">Flutter · React · Node.js · AI</p>
        </div>
        <p className="footer__copyright">
          © 2026 Gerardo Ojeda
        </p>
      </div>
    </footer>
  )
}

export default Footer
