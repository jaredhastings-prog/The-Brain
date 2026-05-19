# Agents Guide

This repository is prepared for future AI-assisted development and AI agent orchestration, but no live agent execution exists yet.

## Current Agent Boundary

The current app contains:

- Agent blueprint types
- Planned agent definitions
- UI placeholders for agent readiness
- Documentation for future orchestration

The current app does not contain:

- Model calls
- Tool execution
- Background jobs
- Vector database queries
- Autonomous workflows
- User data persistence

## Planned Agent Classes

- Executive Chief of Staff: cross-domain briefing, synthesis, and priority surfacing.
- Capture Router: classification and routing for text, links, files, and voice captures.
- Learning Synthesizer: study support, concept extraction, and revision planning.
- Business Analyst: venture-level dashboards, risks, opportunities, and follow-ups.
- Memory Curator: timeline organization, relationship between events, and retrieval hygiene.

## Development Rules

- Keep agents human-review-first.
- Do not add backend orchestration inside React components.
- Do not introduce model providers without a dedicated architecture decision.
- Keep prompt, memory, tool, and data boundaries explicit.
- Prefer typed contracts before implementations.
- Preserve the dashboard-first UX.

## Future Orchestration Shape

Recommended future layers:

```text
UI request
  -> agent intent
  -> memory retrieval
  -> tool selection
  -> model execution
  -> human review
  -> saved insight or action
```

Each step should be independently testable and observable.
