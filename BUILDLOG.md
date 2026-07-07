# Build Log — chrisbrown-dev

A session-by-session record of how this portfolio was built.

---

## Session 1 — 2026-07-06 (Milestone 1: Scaffold + deploy skeleton)

**Goal:** Get a live, deployed skeleton with the real palette/fonts/headline before any 3D work starts.

**Built:**
- Scaffolded via `create-next-app` (Next.js App Router, TypeScript, Tailwind v4, ESLint, no `src/` dir)
- Installed `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@gsap/react` (not wired to any scene yet — just available for Milestone 3+)
- `app/globals.css`: Tailwind v4 `@theme` block with the 7-token palette (ink/surface/paper/muted/signal/circuit/alert)
- `app/layout.tsx`: Space Grotesk (display) + Inter (body) + IBM Plex Mono (nav/labels) via `next/font/google`, real metadata title/description
- `app/page.tsx`: placeholder hero with real headline ("Claude Code Specialist & Frontend Engineer") and section-numeral styling, no 3D yet

**Status:** placeholder page only — full hero content, bio, and 5 project sections are Milestones 2-3.

**Next session:** Milestone 2 — real hero copy/bio/contact links, `Footer.tsx`.
