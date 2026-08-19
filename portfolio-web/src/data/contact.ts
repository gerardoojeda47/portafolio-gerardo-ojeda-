/**
 * contact.ts — Contact links data
 * Validates: Requirements 11.2
 */

export interface ContactLink {
  id: string
  label: string
  display: string
  href: string
  external: boolean
}

/** Exactly 3 contact buttons — Requirements 11.2 */
export const REQUIRED_CONTACT_COUNT = 3

export const contactLinks: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    display: 'gerardozapatos@gmail.com',
    href: 'mailto:gerardozapatos@gmail.com',
    external: false,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    display: '312 769 5456',
    href: 'https://wa.me/573127695456',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    display: 'github.com/gerardoojeda47',
    href: 'https://github.com/gerardoojeda47',
    external: true,
  },
]

const VALID_HREF_PREFIXES = ['mailto:', 'https://wa.me/', 'https://github.com/'] as const

/**
 * Validates contact links: exactly 3 items with correct URI prefixes.
 * Validates: Property 6, Requirements 11.2
 */
export function validateContactLinks(links: ContactLink[]): boolean {
  if (links.length !== REQUIRED_CONTACT_COUNT) return false

  return links.every((link) => {
    if (!link.href || link.href.trim().length === 0) return false
    return VALID_HREF_PREFIXES.some((prefix) => link.href.startsWith(prefix))
  })
}
