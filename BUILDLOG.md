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

**Deployed:** GitHub repo created (`albatrossflyon-coder/chrisbrown-dev`, public), pushed to `master`. Vercel import completed by Chris via dashboard (vercel.com/new) — live at `chrisbrown-dev.vercel.app`, Status: Ready on commit `80fcb17`. Note: landed in Chris's personal Hobby-plan Vercel scope, not the `albatrossflyon1-3105's projects` team the MCP connector is authenticated against — so future deploys can't be auto-verified via `get_deployment_build_logs`/`get_runtime_errors` unless the connector is re-scoped or the project moved into that team.

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

---

## Session 1 (cont.) — 2026-07-06 (Milestone 3: 5 project sections, real copy)

**Goal:** Real copy for all 5 featured projects, a shared section shell, and the lazy-mount-per-section-canvas mechanism proven working across all of them before investing in bespoke geometry for each.

**Built:**
- `data/projects.ts`: real copy for all 5 projects (Skinstric, vuln-hunter, AI Infrastructure [RAG + Omni combined], agentic-rust-mcp, job-lead-discovery) — title/tagline/description/standout-fact/tech/status/accentColor, per the plan's real research (no generic filler copy)
- `hooks/useInViewport.ts`: `IntersectionObserver`-based hook, mounts/unmounts state as a section enters/leaves the viewport (not one-shot — canvases genuinely unmount when scrolled past, keeping WebGL context count low)
- `components/scenes/PlaceholderScene.tsx`: simple rotating wireframe cube, colored per-project via `accentColor` — stands in for each project's bespoke scene until Milestones 4-7
- `components/sections/ProjectSection.tsx`: shared shell every project section renders from — alternates text/canvas sides by parity of `project.index`, renders `PlaceholderScene` only when `useInViewport` reports `inView`
- `app/page.tsx`: now renders Hero → 5x `ProjectSection` → Footer

**Fixed:** a benign console warning (`THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed`) from `HeroScene.tsx` — `IcosahedronGeometry` is already non-indexed by construction, so the `.toNonIndexed()` call was redundant; removed it.

**Verified:** `npm run build` clean twice (before and after the toNonIndexed fix); dev server hot-reload clean.

**Deferred (intentionally):** Skinstric's bespoke scene (textured screenshot + confidence-ring tori) needs a real screenshot exported from `skinstric-albatrossflyon-coder` first — not captured yet, so Skinstric currently uses the same placeholder cube as sections 2-5. Pick this up in Milestone 4 alongside vuln-hunter's scanline scene.

**Next session:** Milestone 4 — vuln-hunter's scanline/shield scene (and grab the Skinstric screenshot while there).

---

## Session 1 (cont.) — 2026-07-06 (Hero centering fix + explode-on-facing cube effect)

**Fixed:** `components/sections/Hero.tsx` — the hero section relied on `flex-1` alone to fill viewport height, which collapsed to content height rather than 100vh, pushing the name up against the top of the page instead of vertically centering it. Changed to `min-h-screen` so it always reserves a full viewport regardless of ancestor flex context. Confirmed via screenshot from Chris that the name was rendering flush against the nav area before this fix.

**Added — view-facing explode effect (Hero icosahedron):** extended the existing global explode/implode breathing loop with a per-face check — each frame, each of the 20 faces computes its current world-space normal (`direction.applyQuaternion(group.quaternion)`) and compares its Z component against a threshold (`0.82`) to detect whether it's currently oriented toward the camera. Faces crossing that threshold launch further outward (`LAUNCH_DISTANCE`) and fade toward transparent; faces rotating away retract and fade back in. Confirmed working by Chris ("the top ones fine where my name is").

**Rebuilt — `components/scenes/PlaceholderScene.tsx`:** Chris asked for the same view-facing-explode behavior on the per-project placeholder cubes, while explicitly keeping the color-cycling look. Rebuilt the single `BoxGeometry` mesh as 6 independent `PlaneGeometry` faces (one per cube face, positioned/rotated to reconstruct the cube), each running the identical facing-detection + launch/fade logic as the hero. All 6 faces still share one continuously hue-cycling `MeshStandardMaterial` color (updated once per frame, applied to all), and the original dark wireframe box cage is kept as a separate non-exploding sibling mesh so the "Rubik's cube" edge look is preserved.

**Known follow-up (not yet done):** Chris flagged the spacing/divider lines between the 5 project sections need tightening — waiting on a screenshot to pin down exactly what to change before touching it.

**Verified:** `npm run build` clean. Dev server was restarted (not just hot-reloaded) both times before Chris re-checked, after discovering Fast Refresh was silently serving a stale bundle for R3F-scene changes earlier in the session — full restart + hard browser refresh is now the standard verification step for any change to a `components/scenes/*` file.

**Next session:** Milestone 4 — vuln-hunter's scanline/shield scene (and grab the Skinstric screenshot while there), plus the section-spacing fix once Chris sends the screenshot.

**Ideas to revisit (flagged 2026-07-06, end of session — just thoughts, not committed to):**
- Re-review the wording/copy on the 5 project sections in `data/projects.ts` — Chris wants to reconsider some of it but wasn't sure which section(s) specifically; revisit with him at the start of next session.
- Consider wrapping each project section's content in a card/flexbox container (a contained "modern" box around the text+scene) instead of the current full-bleed layout — untested idea, see how it looks before committing either way.
