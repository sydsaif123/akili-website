# LLM_CONTEXT.md -- akili-website
# Claude reads this first every session. Keep it updated.

## Quick context
- **Project:** akili-website
- **Type:** [SaaS app / AI agent / design-to-code / other]
- **Stack:** Next.js (App Router), TypeScript strict, Tailwind CSS only
- **Agents:** Python, async-first, Pydantic, LangGraph/Strands
- **Infra:** AWS CDK, Supabase, Vercel
- **Entry point:** [e.g. app/page.tsx or agents/main.py]

## Component patterns
- Functional components only, no class components
- Tailwind only -- no inline styles, no CSS modules
- Named exports for utilities, default exports for pages

## Anti-patterns -- never do these
- No inline styles
- No CSS modules
- No LLM for: arithmetic, validation, routing, DB queries
- No class components

## Current phase
[e.g. Phase 1 -- Infrastructure]

## Active spec
[Name of .claude/specs/in-progress/ file being worked]

## Definition of done
[What does shipped mean here?]

## Where things live
| What | Where |
|------|-------|
| App  |       |
| Tests|       |
| Docs |       |

## How to run locally
npm run dev
