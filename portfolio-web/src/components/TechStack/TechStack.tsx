/**
 * TechStack.tsx
 * Displays technologies grouped by category with tier badges.
 * NO percentage bars, NO numeric proficiency scores.
 *
 * Validates: Requirements 5.1, 5.2, 5.3, 5.5
 */

import { useState } from 'react'
import { motion, AnimatePresence, type Variants, type Easing } from 'framer-motion'
import {
  Code2,
  Smartphone,
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
  GitBranch,
  Shield,
  ChevronDown,
} from 'lucide-react'
import {
  skills,
  type Skill,
  type SkillCategory,
  type SkillTier,
} from '@/data/skills'
import './TechStack.css'

// ─── Category meta ────────────────────────────────────────────────────────────

interface CategoryMeta {
  label: string
  icon: React.ReactNode
}

const CATEGORY_META: Record<SkillCategory, CategoryMeta> = {
  Languages:    { label: 'Languages',     icon: <Code2    size={18} aria-hidden="true" /> },
  Mobile:       { label: 'Mobile',        icon: <Smartphone size={18} aria-hidden="true" /> },
  Frontend:     { label: 'Frontend',      icon: <Layout   size={18} aria-hidden="true" /> },
  Backend:      { label: 'Backend',       icon: <Server   size={18} aria-hidden="true" /> },
  Databases:    { label: 'Databases',     icon: <Database size={18} aria-hidden="true" /> },
  'Cloud/DevOps': { label: 'Cloud / DevOps', icon: <Cloud size={18} aria-hidden="true" /> },
  Tools:        { label: 'Tools',         icon: <Wrench   size={18} aria-hidden="true" /> },
  Methodologies:{ label: 'Methodologies', icon: <GitBranch size={18} aria-hidden="true" /> },
  Security:     { label: 'Security',      icon: <Shield   size={18} aria-hidden="true" /> },
}

// Ordered list of categories to show
const CATEGORY_ORDER: SkillCategory[] = [
  'Languages',
  'Mobile',
  'Frontend',
  'Backend',
  'Databases',
  'Cloud/DevOps',
  'Tools',
  'Methodologies',
  'Security',
]

// ─── Tier meta ────────────────────────────────────────────────────────────────

interface TierMeta {
  label: string
  className: string
}

const TIER_META: Record<SkillTier, TierMeta> = {
  'primary':       { label: 'Primary Stack',     className: 'badge--primary' },
  'working':       { label: 'Working Knowledge', className: 'badge--working' },
  'self-learning': { label: 'Self-Learning',      className: 'badge--self-learning' },
}

// ─── Tech icon mapping ────────────────────────────────────────────────────────
// Maps the `icon` field in skills.ts to a SimpleIcons / devicon CDN URL.
// Falls back to a letter avatar if the slug is not mapped.

const ICON_CDN_MAP: Record<string, string> = {
  typescript:    'https://cdn.simpleicons.org/typescript',
  javascript:    'https://cdn.simpleicons.org/javascript',
  dart:          'https://cdn.simpleicons.org/dart',
  python:        'https://cdn.simpleicons.org/python',
  flutter:       'https://cdn.simpleicons.org/flutter',
  react:         'https://cdn.simpleicons.org/react',
  html5:         'https://cdn.simpleicons.org/html5',
  css3:          'https://cdn.simpleicons.org/css3',
  nodejs:        'https://cdn.simpleicons.org/nodedotjs',
  express:       'https://cdn.simpleicons.org/express',
  postgresql:    'https://cdn.simpleicons.org/postgresql',
  supabase:      'https://cdn.simpleicons.org/supabase',
  git:           'https://cdn.simpleicons.org/git',
  github:        'https://cdn.simpleicons.org/github',
  vscode:        'https://cdn.simpleicons.org/visualstudiocode',
  figma:         'https://cdn.simpleicons.org/figma',
  postman:       'https://cdn.simpleicons.org/postman',
  vite:          'https://cdn.simpleicons.org/vite',
  sqlite:        'https://cdn.simpleicons.org/sqlite',
  vercel:        'https://cdn.simpleicons.org/vercel',
  netlify:       'https://cdn.simpleicons.org/netlify',
  githubactions: 'https://cdn.simpleicons.org/githubactions',
  fastapi:       'https://cdn.simpleicons.org/fastapi',
  nestjs:        'https://cdn.simpleicons.org/nestjs',
  mongodb:       'https://cdn.simpleicons.org/mongodb',
  firebase:      'https://cdn.simpleicons.org/firebase',
  docker:        'https://cdn.simpleicons.org/docker',
  aws:           'https://cdn.simpleicons.org/amazonwebservices',
  chatgpt:       'https://cdn.simpleicons.org/openai',
}

function TechIcon({ skill }: { skill: Skill }) {
  const cdnUrl = skill.icon ? ICON_CDN_MAP[skill.icon] : undefined

  if (cdnUrl) {
    return (
      <img
        src={cdnUrl}
        alt={`${skill.name} logo`}
        className="tech-item__icon"
        width={24}
        height={24}
        loading="lazy"
        onError={(e) => {
          // Graceful fallback: hide the broken image
          ;(e.currentTarget as HTMLImageElement).style.display = 'none'
        }}
      />
    )
  }

  // Letter avatar fallback
  return (
    <span
      className="tech-item__icon-letter"
      aria-hidden="true"
    >
      {skill.name.charAt(0).toUpperCase()}
    </span>
  )
}

// ─── TechItem ─────────────────────────────────────────────────────────────────

interface TechItemProps {
  skill: Skill
}

function TechItem({ skill }: TechItemProps) {
  const tier = TIER_META[skill.tier]
  const category = CATEGORY_META[skill.category]

  const tooltipText = `${category.label} · ${tier.label}`

  return (
    <div
      className="tech-item glass-card"
      title={tooltipText}
      aria-label={`${skill.name} — ${tooltipText}`}
    >
      <TechIcon skill={skill} />
      <span className="tech-item__name">{skill.name}</span>
      <span className={`badge tech-item__badge ${tier.className}`}>
        {tier.label}
      </span>
    </div>
  )
}

// ─── CategoryGroup ────────────────────────────────────────────────────────────

interface CategoryGroupProps {
  category: SkillCategory
  items: Skill[]
  isOpen: boolean
  onToggle: () => void
}

function CategoryGroup({ category, items, isOpen, onToggle }: CategoryGroupProps) {
  const meta = CATEGORY_META[category]

  return (
    <div className="category-group">
      <button
        className="category-group__header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`category-${category}`}
      >
        <span className="category-group__icon">{meta.icon}</span>
        <span className="category-group__label">{meta.label}</span>
        <span className="category-group__count">{items.length}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`category-group__chevron${isOpen ? ' category-group__chevron--open' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`category-${category}`}
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <ul
              className="category-group__grid"
              aria-label={`${meta.label} technologies`}
              role="list"
            >
              {items.map((skill) => (
                <motion.li
                  key={skill.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ listStyle: 'none' }}
                >
                  <TechItem skill={skill} />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── TechStack ────────────────────────────────────────────────────────────────

// Group skills by category in a stable order
function groupByCategory(skillList: Skill[]): Map<SkillCategory, Skill[]> {
  const map = new Map<SkillCategory, Skill[]>()
  for (const cat of CATEGORY_ORDER) {
    const items = skillList.filter((s) => s.category === cat)
    if (items.length > 0) {
      map.set(cat, items)
    }
  }
  return map
}

// Container animation variants
const EASE_OUT: Easing = 'easeOut'

const sectionVariants: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

export function TechStack() {
  const grouped = groupByCategory(skills)
  const categories = Array.from(grouped.keys())

  // All categories open by default
  const [openCategories, setOpenCategories] = useState<Set<SkillCategory>>(
    new Set(categories),
  )

  const toggleCategory = (cat: SkillCategory) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) {
        next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  const expandAll  = () => setOpenCategories(new Set(categories))
  const collapseAll = () => setOpenCategories(new Set())

  return (
    <section id="stack" className="section techstack" aria-labelledby="stack-title">
      <div className="container">
        {/* ── Header ── */}
        <motion.header
          className="techstack__header"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-label">Tech Stack</p>
          <h2 id="stack-title" className="section-title">
            Tecnologías &amp; Herramientas
          </h2>
          <p className="section-subtitle">
            Organizado por categoría. Cada tecnología incluye su nivel de experiencia
            — sin barras de porcentaje inventadas.
          </p>

          {/* Tier legend */}
          <div className="techstack__legend" role="list" aria-label="Tier legend">
            {(Object.entries(TIER_META) as [SkillTier, TierMeta][]).map(([, meta]) => (
              <span key={meta.label} className={`badge ${meta.className}`} role="listitem">
                {meta.label}
              </span>
            ))}
          </div>
        </motion.header>

        {/* ── Controls ── */}
        <div className="techstack__controls" role="group" aria-label="Category controls">
          <button className="btn btn-ghost techstack__ctrl-btn" onClick={expandAll}>
            Expand all
          </button>
          <button className="btn btn-ghost techstack__ctrl-btn" onClick={collapseAll}>
            Collapse all
          </button>
        </div>

        {/* ── Category accordion ── */}
        <motion.div
          className="techstack__grid"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {categories.map((cat) => (
            <CategoryGroup
              key={cat}
              category={cat}
              items={grouped.get(cat)!}
              isOpen={openCategories.has(cat)}
              onToggle={() => toggleCategory(cat)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack
