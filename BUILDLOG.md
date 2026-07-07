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

**Deployed:** GitHub repo created (`albatrossflyon-coder/chrisbrown-dev`, public), pushed to `master`. Vercel import still pending (manual dashboard step — MCP connector has no create-project tool, and CLI login is non-interactive-blocked, so Chris does this one click himself).

---

## Session 1 (cont.) — 2026-07-06 (Milestone 2: Hero complete)

**Goal:** Real hero content and footer before building out the 5 project sections.

**Built:**
- `data/bio.ts`: name, headline, real trimmed bio paragraph (sourced from `job-hunter/resumes/resume-claude-code-specialist.md`, reordered to lead with Claude Code framing), GitHub + email links
- `lib/gsap.ts`: registers ScrollTrigger plugin, client-guarded — foundation for later scroll-driven scenes, not used yet
- `components/scenes/HeroScene.tsx`: first real R3F scene — a slowly rotating wireframe icosahedron (`Float` + manual `useFrame` rotation), teal (`#3fa796`), ambient-only motion
- `components/sections/Hero.tsx`: real headline/bio/links, `HeroScene` lazy-loaded via `next/dynamic` with `ssr: false` (R3F/WebGL can't run server-side)
- `components/sections/Footer.tsx`: name/headline + GitHub/email links
- `app/page.tsx`: now renders `Hero` + `Footer`

**Verified:** `npm run build` (prod build, confirms the `ssr:false` dynamic import pattern works correctly for R3F), then `npm run dev` hot-reload — both clean, no console errors.

**Status:** hero is genuinely complete. Next up: Milestone 3 — `data/projects.ts` with all 5 sections' real copy, `ProjectSection.tsx` shell, `useInViewport.ts`, and Skinstric's real scene.

---

## Session 1 (cont.) — 2026-07-06 (Hero scene: explode/reassemble effect)

**Changed:** `components/scenes/HeroScene.tsx` — replaced the single solid wireframe icosahedron with 20 independent triangular face meshes (via `IcosahedronGeometry(...).toNonIndexed()`, one `BufferGeometry` per face). Each face's outward direction is its own centroid-normalized vector from origin. A GSAP tween drives a shared `progress.t` value (0 → 1 → 0, `yoyo: true, repeat: -1`) that `useFrame` reads every frame to offset each face's position along its own direction — so the whole shape continuously blows apart into its 20 pieces and reassembles, on top of the existing slow rotation/float.

**Verified:** `npm run build` clean; confirmed visually in browser (Chris: "that was a good i[dea]... separated and then came back together").

**Next session:** Milestone 3.
