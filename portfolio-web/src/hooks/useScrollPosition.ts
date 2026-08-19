/**
 * useScrollPosition.ts
 * Returns the current vertical scroll position of the window.
 *
 * Validates: Requirements 11.4
 */

import { useState, useEffect } from 'react'

export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
