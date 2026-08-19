/**
 * Navbar.tsx
 * Sticky navigation bar with scroll-spy active highlighting,
 * backdrop-blur background on scroll, and mobile hamburger menu.
 *
 * Validates: Requirements 11.5, 12.3
 */

import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import './Navbar.css'

// ─── Nav links definition ────────────────────────────────────────────────────

interface NavLink {
  label: string
  href: string
  sectionId: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Hero',       href: '#hero',       sectionId: 'hero' },
  { label: 'About',      href: '#about',      sectionId: 'about' },
  { label: 'Stack',      href: '#stack',      sectionId: 'stack' },
  { label: 'AI',         href: '#ai',         sectionId: 'ai' },
  { label: 'Projects',   href: '#projects',   sectionId: 'projects' },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Contact',    href: '#contact',    sectionId: 'contact' },
]

const SECTION_IDS = NAV_LINKS.map((link) => link.sectionId)

// ─── Component ───────────────────────────────────────────────────────────────

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const activeId = useScrollSpy(SECTION_IDS)

  // Track whether user has scrolled past threshold to activate frosted bg
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount to pick up initial position
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu when viewport widens past mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMobileMenuOpen(false)
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.slice(1) // strip leading '#'
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <div
      className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}
    >
      <nav className="navbar__inner container" aria-label="Main navigation">
        {/* Logo / brand */}
        <a
          href="#hero"
          className="navbar__brand mono"
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="Go to top"
        >
          <span className="navbar__brand-name">GO</span>
          <span className="navbar__brand-dot">.</span>
        </a>

        {/* Desktop nav links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.sectionId}>
              <a
                href={link.href}
                className={`navbar__link${activeId === link.sectionId ? ' navbar__link--active' : ''}`}
                aria-current={activeId === link.sectionId ? 'page' : undefined}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button (mobile only) */}
        <button
          className="navbar__hamburger"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile${isMobileMenuOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <ul className="navbar__mobile-links container" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.sectionId}>
              <a
                href={link.href}
                className={`navbar__mobile-link${activeId === link.sectionId ? ' navbar__mobile-link--active' : ''}`}
                aria-current={activeId === link.sectionId ? 'page' : undefined}
                onClick={(e) => handleNavClick(e, link.href)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
