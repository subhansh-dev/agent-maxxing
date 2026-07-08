<div align="center">

# ⚡ Agent Maxxing

> **95+ production-ready skills, 19 UI components, and 7 system prompts extracted from the world's best AI agents.** Drop them into any agent — Claude Code, Codex, Cursor, OpenCode — and it instantly becomes elite.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-95+-orange.svg)](#-skills-roster)
[![Components](https://img.shields.io/badge/Components-19-blue.svg)](#-ui-components)
[![System Prompts](https://img.shields.io/badge/System%20Prompts-7-purple.svg)](#-system-prompts)
[![Format](https://img.shields.io/badge/Format-Markdown-white.svg)](#-skills-roster)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

---

**Think of it as:** Giving your AI agent a brain transplant — it inherits the engineering judgment of GPT-5.5, the reasoning of Claude Fable 5, the frontend taste of Claude Design, and the tool orchestration of Gemini CLI.

</div>

---

## ⚡ Quick Start

### Option 1: Install via npx (Recommended)

```bash
npx skills add https://github.com/subhansh-dev/agent-maxxing
```

### Option 2: Manual Install

```bash
# Clone the repo
git clone https://github.com/subhansh-dev/agent-maxxing.git

# Copy to your agent's skill directory
cp -r agent-maxxing/* ~/.claude/skills/   # Claude Code
cp -r agent-maxxing/* ~/.codex/skills/    # Codex CLI
cp -r agent-maxxing/* ~/.opencode/skills/ # OpenCode
cp -r agent-maxxing/* .cursor/skills/     # Cursor
```

### Option 3: Fine-Tune Your Agent

Start with [`FINE-TUNE-AGENT.md`](FINE-TUNE-AGENT.md) — the master instruction file that tells your agent how to read and apply everything in this repo.

### Option 4: Browse & Copy

Each skill is a standalone `.md` file. Browse the roster below, find what you need, and copy it into your project.

---

## 🔥 What Makes This Different

| | Agent Maxxing | Generic Skill Packs |
|---|---|---|
| **Source** | Extracted from Claude Fable 5, GPT-5.5, Gemini CLI, Claude Code | Community-written prompts |
| **Depth** | 95+ skills covering engineering, design, writing, security | 5-10 surface-level tips |
| **Components** | 19 production-ready UI patterns with CSS | None |
| **System Prompts** | 7 fine-tuned personality modules | None |
| **Anti-Slop** | Dedicated anti-patterns + writing style guide | "Be helpful" |
| **Compatibility** | Works with 60+ agents via Agent Skills spec | Vendor-locked |

---

## 🛠️ Skills Roster

### 💻 Engineering Division

Building things that work.

| Skill | Description |
|-------|-------------|
| [Execution Protocol](engineering/execution-protocol.md) | Solve it don't ask about it — the problem-solving chain |
| [Anti-Patterns](engineering/anti-patterns.md) | Code, design, writing anti-patterns to avoid |
| [Code Review Checklist](engineering/code-review-checklist.md) | Ship-ready review: correctness, security, performance |
| [Deep Code Review](engineering/deep-code-review.md) | 8-angle methodology from Claude Code bundled skills |
| [Security Review](engineering/security-review.md) | Senior security engineer review with false-positive filtering |
| [Code Simplify](engineering/code-simplify.md) | 4-angle cleanup: reuse, simplify, efficiency, altitude |
| [Runtime Verify](engineering/runtime-verify.md) | Run the app don't test it — observation is evidence |
| [Debugging Patterns](engineering/debugging-patterns.md) | Systematic methodology, common bug categories |
| [Testing Patterns](engineering/testing-patterns.md) | What to test, test structure, test pyramid |
| [API Design](engineering/api-design.md) | REST patterns, naming, status codes, pagination |
| [Database Patterns](engineering/database-patterns.md) | Schema design, indexing, migrations, query optimization |
| [Performance Patterns](engineering/performance-patterns.md) | Lazy loading, caching, memoization, optimization |
| [Code Generator](engineering/05-CODE-GENERATOR.md) | Generate code with best practices |
| [Distill](engineering/06-DISTILL.md) | Strip to essence by removing complexity |
| [Extract](engineering/07-EXTRACT.md) | Extract reusable components and tokens |
| [Harden](engineering/10-HARDEN.md) | Error handling, edge cases, resilience |
| [Normalize](engineering/12-NORMALIZE.md) | Match your design system |
| [Optimize](engineering/14-OPTIMIZE.md) | Loading, rendering, bundle size |
| [Overdrive](engineering/15-OVERDRIVE.md) | Push past conventional limits |
| [Quieter](engineering/16-QUIETER.md) | Tone down overly bold designs |
| [Node Debugger](engineering/25-NODE-INSPECT-DEBUGGER.md) | Node.js debugging with inspect protocol |
| [Python Debugger](engineering/26-PYTHON-DEBUGPY.md) | Python remote debugging with debugpy |

### 🎨 Frontend & Design Division

Making it beautiful, usable, and distinctly human.

| Skill | Description |
|-------|-------------|
| [Frontend Design](frontend-design/01-FRONTEND-DESIGN.md) | Premium UI patterns, glassmorphism, anti-slop rules |
| [Animate](frontend-design/02-ANIMATE.md) | Motion design, micro-interactions, timing |
| [Colorize](frontend-design/03-COLORIZE.md) | Color theory, palettes, strategic color |
| [Typeset](frontend-design/04-TYPESET.md) | Typography systems, font pairing, hierarchy |
| [Bolder](frontend-design/05-BOLDER.md) | Amplify safe designs to make them interesting |
| [Delight](frontend-design/06-DELIGHT.md) | Moments of joy and personality |
| [Polish](frontend-design/07-POLISH.md) | Final quality pass — alignment, spacing |
| [Critique](frontend-design/08-CRITIQUE.md) | Evaluate design from UX perspective |
| [Onboard](frontend-design/13-ONBOARD.md) | Onboarding flows and first-time experiences |
| [Artifact Design](frontend-design/artifact-design.md) | Deliberate design choices, avoid AI-generated looks |
| [Typography](frontend-design/typography.md) | Font pairing, scale, typographic systems |
| [Color & Contrast](frontend-design/color-and-contrast.md) | Color theory and accessibility |
| [Interaction Design](frontend-design/interaction-design.md) | Micro-interactions, hover states |
| [Motion Design](frontend-design/motion-design.md) | Timing, easing, enter/exit patterns |
| [Responsive Design](frontend-design/responsive-design.md) | Breakpoints, fluid layouts, mobile-first |
| [Spatial Design](frontend-design/spatial-design.md) | Layout, spacing, visual rhythm |

### 📝 Content & Writing Division

Sound human, not like a press release.

| Skill | Description |
|-------|-------------|
| [Humanizer](content/09-HUMANIZER.md) | Strip AI-isms, add real voice |
| [Clarify](content/04-CLARIFY.md) | Improve unclear UX copy and errors |
| [Writing Style](content/writing-style.md) | How to sound human — voice, rhythm, what to avoid |
| [UX Writing](frontend-design/ux-writing.md) | Microcopy, error messages, clear interface text |

### 🖼️ Visual Division

Diagrams, memes, and canvas art.

| Skill | Description |
|-------|-------------|
| [Diagram Maker](visual/10-DIAGRAM-MAKER.md) | SVG, HTML, or Excalidraw diagrams |
| [Meme Maker](visual/11-MEME-MAKER.md) | Generate memes from curated templates |
| [Canvas](visual/12-CANVAS.md) | Canvas-based visual creation |
| [Excalidraw Patterns](visual/excalidraw-patterns.md) | Hand-drawn diagram patterns |
| [SVG Template](visual/svg-template.md) | SVG generation templates |

### 🧠 Agent Meta & Self-Improvement

Make your agent better over time.

| Skill | Description |
|-------|-------------|
| [Self-Improvement](agent-meta/17-SELF-IMPROVEMENT.md) | Agent learning loops and evolution |
| [Skill Creator](agent-meta/18-SKILL-CREATOR.md) | Create new agent skills from scratch |
| [Skill Vetter](agent-meta/19-SKILL-VETTER.md) | Validate and review skills |
| [Find Skills](agent-meta/08-FIND-SKILLS.md) | Search and discover available skills |
| [GitHub](agent-meta/09-GITHUB.md) | GitHub integration and repo management |
| [Teach Impeccable](agent-meta/24-TEACH-IMPECCABLE.md) | Persistent design guidelines setup |
| [Init Project](agent-meta/init-project.md) | Create CLAUDE.md by analyzing codebase |

### ⚙️ Workflows & Orchestration

How to manage complex tasks.

| Skill | Description |
|-------|-------------|
| [Batch Orchestration](workflows/batch-orchestration.md) | Parallel work with isolated worktrees |
| [Git Workflow](workflows/git-workflow.md) | Commits, branching, PRs, conflict resolution |
| [Taskflow](workflows/22-TASKFLOW.md) | Structured task management |
| [Taskflow Inbox Triage](workflows/23-TASKFLOW-INBOX-TRIAGE.md) | Inbox triage and priority |
| [Spike](workflows/21-SPIKE.md) | Quick prototyping and exploration |
| [Healthcheck](workflows/11-HEALTHCHECK.md) | System health monitoring |

### 🔄 Adaptation & Learning

Cross-platform and responsive patterns.

| Skill | Description |
|-------|-------------|
| [Adapt](adaptation/01-ADAPT.md) | Cross-screen, cross-device adaptation |
| [Arrange](adaptation/02-ARRANGE.md) | Layout, spacing, visual rhythm |
| [Audit](adaptation/03-AUDIT.md) | Accessibility, performance, theming audit |

---

## 🧩 UI Components

19 production-ready component patterns with CSS. Drop into any project.

| Component | Description |
|-----------|-------------|
| [Glass Card](components/glass-card.md) | Glassmorphism with backdrop blur and specular tracking |
| [Gradient Button](components/gradient-button.md) | Buttons with hover glow and press feedback |
| [Animated Input](components/animated-input.md) | Floating labels and focus animations |
| [Modal Dialog](components/modal-dialog.md) | Backdrop blur, spring animation, focus trap |
| [Loading Skeleton](components/loading-skeleton.md) | Shimmer placeholders for content |
| [Toast Notification](components/toast-notification.md) | Slide-in, auto-dismiss, stacking |
| [Navbar](components/navbar.md) | Glass effect, scroll-aware styling |
| [Data Table](components/data-table.md) | Sorting, striped rows, hover states |
| [Tooltip](components/tooltip.md) | Arrow, delays, smart positioning |
| [Tabs](components/tabs.md) | Animated indicator, keyboard nav |
| [Dropdown](components/dropdown.md) | Glass styling, keyboard navigation |
| [Avatar](components/avatar.md) | Status indicators, initials fallback |
| [Progress Bar](components/progress-bar.md) | Animated, gradient, multi-step |
| [Badge & Tag](components/badge-tag.md) | Multiple color variants |
| [Toggle Switch](components/toggle-switch.md) | Smooth animation, accessible |
| [Accordion](components/accordion.md) | Expandable sections, smooth height |
| [Breadcrumb](components/breadcrumb.md) | Navigation with separators |
| [Pagination](components/pagination.md) | Page numbers, prev/next |

---

## 🧠 System Prompts

Extracted from the leaked system prompts of Claude Fable 5, GPT-5.5 Codex, Gemini CLI, Claude Code, and Cursor. Intelligently curated — not dumped.

| File | Source | What It Improves |
|------|--------|------------------|
| [Fine-Tune](system-prompts/00-FINE-TUNE.md) | Master guide | How to use all prompts |
| [Fable 5 Base](system-prompts/01-fable-5-base.md) | Claude Fable 5 | Personality, memory, tone, refusal handling |
| [Coding Excellence](system-prompts/02-coding-excellence.md) | Codex GPT-5.5 + Claude Code | Engineering judgment, code quality |
| [Reasoning & Planning](system-prompts/03-reasoning-planning.md) | Codex Plan Mode | 3-phase planning, decision-making |
| [Frontend Mastery](system-prompts/04-frontend-mastery.md) | Codex GPT-5.5 + Claude Design | UI/UX rules, anti-AI-slop |
| [Agent Orchestration](system-prompts/05-agent-orchestration.md) | Claude Code + Gemini CLI | Tool usage, sub-agents, delegation |
| [Tone & Communication](system-prompts/06-tone-communication.md) | Fable 5 + Codex + Cursor | How to talk and present |

---

## 📂 File Structure

```
agent-maxxing/
├── FINE-TUNE-AGENT.md          ← Start here — master instruction file
├── README.md                   ← You are here
├── LICENSE                     ← MIT
│
├── frontend-design/       (16) ← UI, CSS, motion, typography
├── content/               (3)  ← Writing, humanization
├── visual/                (6)  ← Diagrams, memes, canvas
├── engineering/           (22) ← Code, security, testing, debugging
├── agent-meta/            (8)  ← Self-improvement, skill creation
├── workflows/             (6)  ← Task management, git, orchestration
├── adaptation/            (3)  ← Cross-platform, responsive
├── components/            (19) ← Reusable UI patterns
└── system-prompts/        (7)  ← Extracted from top AI agents
```

**9 folders. 95+ files. Zero dependencies. Just markdown.**

---

## 🤖 Compatible Agents

Works with **any agent supporting the [Agent Skills specification](https://agentskills.io/specification)**:

| Agent | Install Path |
|-------|-------------|
| **Claude Code** | `~/.claude/skills/` |
| **Codex CLI** | `~/.codex/skills/` |
| **OpenCode** | `~/.opencode/skills/` |
| **Cursor** | `.cursor/skills/` |
| **Continue** | `.continue/skills/` |
| **Kilo** | `.kilocode/skills/` |
| **OpenClaw** | `.openclaw/skills/` |
| **Pi Agent** | `.pi/skills/` |
| **Hermes** | `~/.hermes/skills/` |
| **60+ more** | Any SKILL.md-compatible agent |

---

## 🏆 The Golden Rules

These patterns come from every top agent in this collection:

1. **Search before answering** — Never guess when you can check
2. **Read the codebase first** — Don't assume, investigate
3. **Parallel tool calls** — Independent ops run simultaneously
4. **Match existing patterns** — Follow the repo's conventions
5. **Show, don't tell** — Demonstrate with examples
6. **Be concise** — Short paragraphs, flat lists, no filler
7. **Take ownership** — Fix mistakes, don't deflect
8. **Respect the user's time** — Don't ask what you can figure out
9. **Ship working code** — Not skeletons, not "you'll need to add..."
10. **Sound human** — Not like a press release or corporate blog

---

## 🤝 Contributing

Skills are just markdown files. To add one:

1. Create `category/your-skill.md` with YAML frontmatter
2. Follow the [Agent Skills spec](https://agentskills.io/specification)
3. Include: name, description, trigger conditions, structured instructions
4. Test with Claude Code, Codex, or any compatible agent
5. Open a PR

### Skill Template

```markdown
---
name: your-skill
description: One-line description of what this skill does
---

# Your Skill Name

## When to Use
- Trigger condition 1
- Trigger condition 2

## Instructions
1. Step one
2. Step two

## Rules
- Rule 1
- Rule 2
```

---

## 📜 License

MIT License — use these skills anywhere, no restrictions.

---

<div align="center">

**Built for agents, by someone who got tired of generic AI output.**

[![GitHub](https://img.shields.io/badge/GitHub-subhansh--dev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/subhansh-dev)

</div>
