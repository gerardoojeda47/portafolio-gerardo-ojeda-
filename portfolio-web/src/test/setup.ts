import '@testing-library/jest-dom'

// ── window.matchMedia mock (not available in jsdom) ────────────────────────
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// ── IntersectionObserver mock (not available in jsdom) ─────────────────────
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})

// ── scrollTo mock ──────────────────────────────────────────────────────────
window.scrollTo = () => {}
