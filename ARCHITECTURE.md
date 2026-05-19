# Architecture

Jared Brain is structured as a modular frontend foundation. The app favors thin routes, reusable shell components, typed domain contracts, and feature-level ownership.

## Principles

- Dashboard first: every major area should eventually roll up into a calm executive view.
- Frontend foundation first: backend and database decisions stay out of this initial PR.
- Feature ownership: domain code lives under `src/features/*`.
- Thin routes: App Router pages should compose feature components rather than hold logic.
- Contract-ready: future systems can attach to typed interfaces without reshaping the UI.
- ADHD-friendly: pages should prioritize clear status, next action, and low visual noise.

## Folder Map

```text
src/
  app/
    (brain)/
      dashboard/
      business/
      study-learning/
      health-performance/
      liam/
      finance/
      relationships/
      personal-projects/
      memory-timeline/
      ai-agents/
      capture-inbox/
      settings/
    globals.css
    layout.tsx
    page.tsx
  components/
    dashboard/
    layout/
    ui/
  config/
    site.ts
  features/
    ai-agents/
    analytics/
    capture-inbox/
    dashboard/
    data-integration/
    memory/
    navigation/
    proactive-insights/
    sections/
    voice-capture/
  lib/
    utils.ts
```

## UI Architecture

`src/components/ui` contains shadcn/ui-style primitives. These should stay small and reusable.

`src/components/layout` owns the application shell:

- `AppShell`
- `Sidebar`
- `TopCommandBar`

`src/components/dashboard` owns dashboard composition primitives:

- `DashboardCard`
- `MetricCard`
- `WidgetGrid`

## Navigation

Navigation is centralized in `src/features/navigation/navigation.config.ts`.

Adding a section should usually mean:

1. Add a route under `src/app/(brain)`.
2. Add or reuse a `SectionDefinition`.
3. Add the nav item to `primaryNavigation`.

## Section Pages

Most placeholder routes use `SectionPage` and `sectionRegistry`. This keeps early pages consistent while leaving room for each domain to become more specialized later.

## Future System Lanes

The following lanes are intentionally represented as types only:

- AI agent orchestration: `src/features/ai-agents`
- Vector memory: `src/features/memory`
- Voice capture: `src/features/voice-capture`
- Dashboard analytics: `src/features/analytics`
- Database integration: `src/features/data-integration`
- Proactive insights: `src/features/proactive-insights`
- Global capture inbox: `src/features/capture-inbox`

When backend work begins, prefer introducing service boundaries behind these contracts instead of coupling database logic directly to pages or UI components.
