/**
 * useScrollSpy.ts
 * Custom hook that observes multiple sections via IntersectionObserver
 * and returns the ID of the currently visible/active section.
 *
 * Validates: Requirements 11.5
 */

import { useState, useEffect } from 'react'

/**
 * Accepts an array of section IDs (without the leading `#`).
 * Returns the ID of the section that is currently most visible in the viewport.
 * Gracefully returns `null` when IntersectionObserver is unavailable.
 */
export function useScrollSpy(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    // Graceful degradation: if IntersectionObserver is not available, do nothing
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    if (sectionIds.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find entries that are currently intersecting
        const visible = entries.filter((entry) => entry.isIntersecting)

        if (visible.length > 0) {
          // Pick the entry with the highest intersection ratio (most visible)
          const mostVisible = visible.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          )
          setActiveId(mostVisible.target.id)
        }
      },
      {
        // A section is considered "active" when 20–100% of it is visible
        threshold: [0.2, 0.4, 0.6, 0.8, 1.0],
        // Shrink the bottom of the detection zone so the topmost visible section wins
        rootMargin: '-10% 0px -60% 0px',
      }
    )

    // Observe each section element
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [sectionIds])

  return activeId
}
