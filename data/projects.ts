export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  index: number;
  title: string;
  tagline: string;
  description: string;
  standout: string;
  tech: string[];
  status: string;
  accentColor: string;
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "skinstric",
    index: 1,
    title: "Skinstric",
    tagline: "Pixel-accurate frontend rebuild of an AI skin-analysis product",
    description:
      "A multi-step flow — name/location entry, gallery/camera photo capture, live demographics results with confidence rings — rebuilt frame-for-frame from a real Figma spec and wired to live backend APIs, not mocked data.",
    standout:
      "A /code-review xhigh multi-agent pass caught 5 real bugs in one session, including a camera feed that never attached to the <video> element due to a ref-timing bug, and a localStorage unwrap bug that crashed the results page on real uploaded photos — found, fixed, and verified against the live API.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "GSAP"],
    status: "Working, in progress — mobile pass pending",
    accentColor: "#3fa796",
    links: [{ label: "Live Demo", href: "https://skinstric-albatrossflyon-coder.vercel.app" }],
  },
  {
    id: "vuln-hunter",
    index: 2,
    title: "vuln-hunter",
    tagline: "Hybrid AI-assisted security scanner",
    description:
      "Semgrep performs real static-analysis detection as ground truth; Claude does the downstream triage — risk explanation, exploitability rating, fix suggestion — explicitly designed so Claude can never invent a finding Semgrep didn't flag.",
    standout:
      "Custom rules went from 1/4 to 4/4 detections on a planted-vulnerability fixture vs. community rule packs, zero false positives on the safe counterpart. A second 'AI reasoning' pass catches business-logic bugs invisible to rule-based scanning — run against its own code, it caught a real bug: the FastAPI server was bound to 0.0.0.0 instead of localhost.",
    tech: ["Python", "FastAPI", "Semgrep", "Next.js 16", "FastMCP"],
    status: "Live on Vercel + Render",
    accentColor: "#e1573a",
    links: [{ label: "Live Demo", href: "https://frontend-beta-eight-46.vercel.app" }],
  },
  {
    id: "rag-system",
    index: 3,
    title: "rag-system",
    tagline: "A self-evaluating RAG engine — not a chatbot with a search tool bolted on",
    description:
      "Hybrid BM25 + real semantic search, hierarchical + graph-boosted retrieval, and a persistent vector database. Answers questions, ranks live-scraped job leads, and drafts cover letters — all sourced only from a private corpus, with citations, never invented.",
    standout:
      "Detects when its own sources disagree or have gone stale, learns from queries it initially failed to answer, and asks for clarification instead of guessing when it genuinely doesn't know — a 5-state confidence model instead of a binary right/wrong.",
    tech: ["Python", "FastAPI", "LangGraph", "Hybrid Retrieval", "Vector DB"],
    status: "Live API + interactive Swagger docs",
    accentColor: "#e7a33e",
    links: [{ label: "Try It Live", href: "https://rag-system-backend.fly.dev/docs" }],
  },
  {
    id: "agentic-rust-mcp",
    index: 4,
    title: "agentic-rust-mcp",
    tagline: "Production Rust MCP server for agentic infrastructure",
    description:
      "Gives Claude Code live tools to check Render + Vercel deployment status, query Buffer content schedules, read Firestore leads, and send email via Gmail — a real JSON-RPC 2.0 MCP server over stdio.",
    standout:
      "An earlier version faked its tool responses with hardcoded data over a non-standard protocol. The current version is a genuine rebuild: real JSON-RPC 2.0, live API integration, a security-hardening pass moving API tokens to headers, and passing unit tests.",
    tech: ["Rust", "Tokio", "Serde", "JSON-RPC 2.0"],
    status: "Live demo on Render — real JSON-RPC 2.0 MCP server",
    accentColor: "#3fa796",
    links: [{ label: "Live Demo", href: "https://agentic-rust-mcp-demo.onrender.com" }],
  },
  {
    id: "nft-marketplace",
    index: 5,
    title: "NFT Marketplace",
    tagline: "Responsive NFT marketplace — Frontend Simplified internship",
    description:
      "A fully responsive marketplace with a Home page (Hot Collections carousel, New Items grid, Top Sellers), an Explore page with sort/filter controls, and an Item Details page with dynamic routing and a live countdown timer.",
    standout:
      "Built as part of Frontend Simplified's virtual internship, simulating a real team dev workflow — component architecture, live API data via Axios, scroll animations, and Git branching/merge-conflict/PR review practices, not just solo scaffolding.",
    tech: ["React 17", "React Router v6", "Firebase", "Axios", "AOS"],
    status: "Live on Vercel",
    accentColor: "#e7a33e",
    links: [{ label: "Live Demo", href: "https://nft-marketplace-starter.vercel.app" }],
  },
  {
    id: "summarist",
    index: 6,
    title: "Summarist",
    tagline: "Blinkist-style book summary app — Frontend Simplified internship",
    description:
      "A For You page with recommended and suggested books, book detail views with premium locking, an audio player with scrubbing and skip, debounced full-text search, and a library of saved books.",
    standout:
      "Real auth (register, login, guest via Firebase) and real Stripe subscription payments — monthly and annual plans with a 7-day free trial, not a mocked checkout flow.",
    tech: ["Next.js 16", "TypeScript", "Firebase", "Stripe", "Redux Toolkit"],
    status: "Live on Vercel",
    accentColor: "#e1573a",
    links: [{ label: "Live Demo", href: "https://summarist-alpha.vercel.app" }],
  },
];
