# akili-website

## What this project is
[One paragraph]

## Stack
- Frontend: Next.js (App Router), TypeScript strict, Tailwind CSS
- Agents: Python, async, Pydantic, LangGraph/Strands
- Infra: AWS CDK, Supabase, Vercel

## Coding rules
- Tailwind only, no inline styles, no CSS modules
- LLM only for: ambiguous input, reasoning, explanations
- Never LLM for: arithmetic, validation, routing, DB queries

## Definition of done
[What does shipped mean?]

## Stop and ask when
- About to change a core abstraction
- About to create/delete more than 3 files
- Any irreversible action

## Current phase
Phase 0 -- Foundation

## Active spec
None. See .claude/specs/plans/

## Autonomous execution
When given a high-level goal, break into subtasks and execute in parallel using the Task tool. No permission needed per step.

## Stop and ask me ONLY for:
- Any financial transaction above Rs.50,000
- Deploying to production (staging = fine autonomously)
- Permanently deleting anything
- Sharing documents externally

## After every autonomous task:
Write a summary to ~/logs/claude-actions.md -- what was done, what decisions were made, what you recommend next.
