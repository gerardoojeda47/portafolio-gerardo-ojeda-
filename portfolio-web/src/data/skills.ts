/**
 * skills.ts — Tech Stack data for Gerardo Ojeda Riascos
 * Validates: Requirements 1.3, 5.1, 5.2
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type SkillTier = 'primary' | 'working' | 'self-learning'

export type SkillCategory =
  | 'Languages'
  | 'Mobile'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Cloud/DevOps'
  | 'Tools'
  | 'Methodologies'
  | 'Security'

export interface Skill {
  name: string
  category: SkillCategory
  tier: SkillTier
  icon?: string // nombre de icono Lucide o ruta SVG
}

// ─── Skills Array ─────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // ── PRIMARY STACK ────────────────────────────────────────────────────────

  // Languages
  { name: 'TypeScript', category: 'Languages', tier: 'primary', icon: 'typescript' },
  { name: 'JavaScript', category: 'Languages', tier: 'primary', icon: 'javascript' },
  { name: 'Dart', category: 'Languages', tier: 'primary', icon: 'dart' },
  { name: 'Python', category: 'Languages', tier: 'primary', icon: 'python' },

  // Mobile
  { name: 'Flutter', category: 'Mobile', tier: 'primary', icon: 'flutter' },

  // Frontend
  { name: 'React', category: 'Frontend', tier: 'primary', icon: 'react' },
  { name: 'HTML5', category: 'Frontend', tier: 'primary', icon: 'html5' },
  { name: 'CSS3', category: 'Frontend', tier: 'primary', icon: 'css3' },

  // Backend
  { name: 'Node.js', category: 'Backend', tier: 'primary', icon: 'nodejs' },
  { name: 'Express', category: 'Backend', tier: 'primary', icon: 'express' },

  // Databases
  { name: 'PostgreSQL', category: 'Databases', tier: 'primary', icon: 'postgresql' },
  { name: 'Supabase', category: 'Databases', tier: 'primary', icon: 'supabase' },

  // Tools
  { name: 'Git', category: 'Tools', tier: 'primary', icon: 'git' },
  { name: 'GitHub', category: 'Tools', tier: 'primary', icon: 'github' },
  { name: 'VS Code', category: 'Tools', tier: 'primary', icon: 'vscode' },
  { name: 'Figma', category: 'Tools', tier: 'primary', icon: 'figma' },
  { name: 'Postman', category: 'Tools', tier: 'primary', icon: 'postman' },

  // Methodologies
  { name: 'Scrum', category: 'Methodologies', tier: 'primary', icon: 'scrum' },
  { name: 'Git Flow', category: 'Methodologies', tier: 'primary', icon: 'gitflow' },

  // ── WORKING KNOWLEDGE ────────────────────────────────────────────────────

  // Frontend
  { name: 'Vite', category: 'Frontend', tier: 'working', icon: 'vite' },

  // Backend
  { name: 'REST APIs', category: 'Backend', tier: 'working', icon: 'api' },

  // Databases
  { name: 'SQLite', category: 'Databases', tier: 'working', icon: 'sqlite' },

  // Cloud/DevOps
  { name: 'Vercel', category: 'Cloud/DevOps', tier: 'working', icon: 'vercel' },
  { name: 'Netlify', category: 'Cloud/DevOps', tier: 'working', icon: 'netlify' },
  { name: 'GitHub Actions', category: 'Cloud/DevOps', tier: 'working', icon: 'githubactions' },

  // Tools
  { name: 'Cursor', category: 'Tools', tier: 'working', icon: 'cursor' },
  { name: 'GitHub Copilot', category: 'Tools', tier: 'working', icon: 'copilot' },
  { name: 'Kiro AI', category: 'Tools', tier: 'working', icon: 'kiro' },
  { name: 'ChatGPT', category: 'Tools', tier: 'working', icon: 'chatgpt' },
  { name: 'Antigravity', category: 'Tools', tier: 'working', icon: 'antigravity' },

  // Methodologies
  { name: 'Clean Code', category: 'Methodologies', tier: 'working', icon: 'cleancode' },
  { name: 'SOLID', category: 'Methodologies', tier: 'working', icon: 'solid' },

  // ── SELF-LEARNING ─────────────────────────────────────────────────────────

  // Backend
  { name: 'FastAPI', category: 'Backend', tier: 'self-learning', icon: 'fastapi' },
  { name: 'NestJS', category: 'Backend', tier: 'self-learning', icon: 'nestjs' },

  // Databases
  { name: 'MongoDB', category: 'Databases', tier: 'self-learning', icon: 'mongodb' },
  { name: 'Firebase', category: 'Databases', tier: 'self-learning', icon: 'firebase' },

  // Cloud/DevOps
  { name: 'Docker', category: 'Cloud/DevOps', tier: 'self-learning', icon: 'docker' },
  { name: 'AWS', category: 'Cloud/DevOps', tier: 'self-learning', icon: 'aws' },

  // Security
  { name: 'OWASP Top 10', category: 'Security', tier: 'self-learning', icon: 'owasp' },
  { name: 'Secure Coding', category: 'Security', tier: 'self-learning', icon: 'security' },

  // Methodologies
  { name: 'CI/CD', category: 'Methodologies', tier: 'self-learning', icon: 'cicd' },
  { name: 'TDD', category: 'Methodologies', tier: 'self-learning', icon: 'tdd' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Filtra skills por tier */
export const getSkillsByTier = (tier: SkillTier): Skill[] =>
  skills.filter((s) => s.tier === tier)

/** Filtra skills por categoría */
export const getSkillsByCategory = (category: SkillCategory): Skill[] =>
  skills.filter((s) => s.category === category)

/** Retorna las categorías únicas presentes en el array */
export const getCategories = (): SkillCategory[] =>
  [...new Set(skills.map((s) => s.category))]
