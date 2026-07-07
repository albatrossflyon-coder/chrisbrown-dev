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
    status: "Verified end-to-end locally via real HTTP calls and MCP round-trips; not yet deployed",
    accentColor: "#e1573a",
  },
  {
    id: "ai-infrastructure",
    index: 3,
    title: "AI Infrastructure",
    tagline: "RAG job copilot + a 26-panel live infrastructure dashboard",
    description:
      "An AI Job-Hunter Copilot (LangGraph agent, hybrid BM25 + TF-IDF retrieval) that ranks leads and drafts cover letters, paired with Omni Dashboard — a live monitor surfacing real-time health across every service in the stack, plus a multi-platform social posting panel.",
    standout:
      "Caught and fixed a real retrieval bug live: vague queries like 'rank my top 3 leads' shared no vocabulary with the lead documents, so lexical retrieval missed them — fixed by bypassing similarity search for that intent. Omni Dashboard uses an honest three-state status model (green/orange/red) instead of binary healthy/broken, so free-tier API limits stay visible rather than hidden.",
    tech: ["Python", "FastAPI", "LangGraph", "Next.js 14", "Tailwind"],
    status: "Omni Dashboard is live; RAG system verified locally",
    accentColor: "#e7a33e",
    links: [{ label: "Live Dashboard", href: "https://omni-console-eight.vercel.app" }],
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
    status: "Working, real local stdio MCP server — the automation backbone for job-lead-discovery",
    accentColor: "#3fa796",
  },
  {
    id: "job-lead-discovery",
    index: 5,
    title: "job-lead-discovery",
    tagline: "Automated YC Jobs board scraper and lead digest",
    description:
      "Scrapes the YC Jobs board, parses each listing, filters to US-only roles, and scores leads by keyword match against a target-role persona — then emails a ranked digest.",
    standout:
      "Scoring is an honest additive keyword-count heuristic, not ML-scored — deliberately simple and legible rather than oversold. The email step calls into agentic-rust-mcp's send_gmail tool, though that cross-repo path is currently stale from a repo reorg and needs a fix to run end-to-end.",
    tech: ["Python", "asyncio", "crawl4ai"],
    status: "Scraper/parser/filter pipeline verified against the live YC Jobs page; email integration needs a path fix",
    accentColor: "#e7a33e",
  },
];
