import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useEffect(() => {
    if (typeof window === 'undefined') return

    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [role="button"], [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [role="button"], [data-cursor-hover]')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor${isHovering ? ' custom-cursor--hover' : ''}${reducedMotion ? ' custom-cursor--no-motion' : ''}`}
      aria-hidden="true"
    />
  )
}
