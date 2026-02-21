# Portfolio Website (Next.js + TypeScript + Tailwind)

A modern, responsive portfolio site with:
- Sticky section-aware navbar
- Hero, About, Skills, Projects, Experience, Contact sections
- Project cards with accessible modal sub-windows
- Search + category + tech filters for projects
- Shareable dedicated project pages (`/project/[id]`)
- Light/dark mode with `next-themes`

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- next-themes

## Run Locally
1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Production Build
```bash
npm run build
npm run start
```

## Lint
```bash
npm run lint
```

## Deployment (Vercel)
1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Framework preset: `Next.js` (auto-detected).
4. Build command: `npm run build`.
5. Output: default Next.js output.

No special environment variables are required for this portfolio template.

## Content Editing
- Projects: `data/projects.ts`
- Experience timeline: `data/experience.ts`
- Skills groups: `data/skills.ts`

Update these files to personalize the portfolio without touching component logic.
