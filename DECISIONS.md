# Decisions — chrisbrown-dev

## Visual identity: new palette, not Albatross AI's brand
Chris's Albatross AI business site uses electric blue (`#00aaff`) + dark grey. This portfolio deliberately uses a distinct palette (neutral charcoal ink/surface, warm paper text, amber/teal/red-orange accents) since no personal brand identity existed before this project and Chris chose to differentiate himself from the business brand rather than reuse it.

## Scroll mechanic: per-section independent Canvas, not one shared 3D scene
Considered a single continuous 3D environment with the camera moving through "stations" for all 5 projects. Rejected because it requires the whole camera-path/lighting/asset system built before *any* section is demoable — wrong fit for a project explicitly being built across multiple sessions.

Chose instead: each project section owns its own independent `<Canvas>`, lazy-mounted only when the section nears the viewport (via `IntersectionObserver`). This means each project's 3D element is a standalone component, buildable/demoable/deployable in total isolation from sections that don't exist yet. Perf cost of multiple WebGL contexts is mitigated by only ever having 1-2 canvases mounted at once.

## No smooth-scroll library
GSAP ScrollTrigger alone handles every scroll-linked need (text reveals, scroll-scrubbed 3D transforms). Deliberately not adding Lenis or react-scroll on top — stacking a second scroll-hijacking library is a common source of jank/conflicting-scroll bugs. Revisit only as an optional polish-milestone addition if needed.

## Content: RAG system + Omni Dashboard combined into one section
Both are AI-infrastructure-adjacent. Splitting them into two separate sections would make the page 6 project sections instead of the agreed 5, diluting the narrative. Combined as one "AI Infrastructure" section covering both.
