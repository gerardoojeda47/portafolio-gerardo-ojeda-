# Gerardo Ojeda Riascos — Portfolio Web

Portafolio web profesional construido con **React 18 + TypeScript + Vite**.  
Diseño Dark Tech con animaciones Framer Motion, iconos Lucide React y testing con Vitest + fast-check.

---

## Tech Stack

| Herramienta | Versión | Propósito |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | ~6 | Type safety |
| Vite | ^8 | Bundler + HMR |
| Framer Motion | ^13 | Animaciones |
| Lucide React | ^1 | Iconos SVG |
| Vitest | ^4 | Unit + PBT testing |
| fast-check | ^4 | Property-based testing |

---

## Requisitos previos

- **Node.js** v20 o superior
- **npm** v10 o superior

---

## Setup

```bash
# 1. Clona el repositorio
git clone https://github.com/gerardoojeda47/portfolio-web.git
cd portfolio-web

# 2. Instala las dependencias
npm install
```

---

## Comandos

### Servidor de desarrollo

```bash
npm run dev
```

Inicia el servidor en `http://localhost:5173` con Hot Module Replacement (HMR).

### Build de producción

```bash
npm run build
```

Compila TypeScript y genera el bundle optimizado en la carpeta `dist/`.

### Preview del build

```bash
npm run preview
```

Sirve el build de producción localmente para verificarlo antes de desplegar.

### Ejecutar tests

```bash
# Modo interactivo (watch)
npm run test

# Una sola ejecución
npm run test:run

# Con cobertura
npm run test:coverage
```

---

## Estructura del proyecto

```
portfolio-web/
├── public/
│   ├── favicon.svg
│   └── cv-gerardo-ojeda.pdf      ← CV descargable
├── src/
│   ├── assets/                   ← Imágenes y recursos estáticos
│   ├── components/               ← Componentes React por sección
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── TechStack/
│   │   ├── AISection/
│   │   ├── Projects/
│   │   ├── Engineering/
│   │   ├── Experience/
│   │   ├── Education/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   └── BackToTop/
│   ├── data/                     ← Contenido tipado (sin strings en componentes)
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── certifications.ts
│   │   └── strengths.ts
│   ├── hooks/                    ← Custom hooks (useScrollSpy, useBackToTop…)
│   ├── styles/                   ← CSS global y variables
│   │   └── global.css
│   ├── test/                     ← Configuración de tests
│   │   └── setup.ts
│   ├── App.tsx                   ← Shell principal de la SPA
│   └── main.tsx                  ← Entry point React
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Path aliases

El proyecto usa `@/` como alias de `src/`:

```ts
import { skills } from '@/data/skills'
import { Hero } from '@/components/Hero/Hero'
```

---

## Deploy

### Vercel (recomendado)

1. Importa el repositorio en [vercel.com](https://vercel.com)
2. Vercel detecta Vite automáticamente. Configuración:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Haz clic en **Deploy**. Listo.

### Netlify

1. Importa el repositorio en [netlify.com](https://netlify.com)
2. Configuración de build:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
3. Agrega el archivo `public/_redirects` con el contenido:
   ```
   /*  /index.html  200
   ```
   (necesario para que el routing SPA funcione en Netlify)

---

## Actualizar contenido

Todo el contenido del portafolio está en `src/data/`. Edita los archivos TypeScript correspondientes:

- **Habilidades y tecnologías** → `src/data/skills.ts`
- **Proyectos** → `src/data/projects.ts`
- **Experiencia laboral** → `src/data/experience.ts`
- **Certificaciones y educación** → `src/data/certifications.ts`
- **Fortalezas** → `src/data/strengths.ts`

Los componentes consumen estos datos automáticamente. No es necesario tocar el código de los componentes para actualizar texto.

---

## Licencia

MIT © 2026 Gerardo Ojeda Riascos
