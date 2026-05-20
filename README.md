# Jared Brain

Jared Brain is a dashboard-first AI personal brain application designed for executive clarity, low cognitive clutter, and long-term expansion.

The current version establishes the Next.js App Router foundation, hybrid executive dashboard shell, reusable UI system, navigation model, authenticated app access, and a persistent Global Capture Inbox backed by Supabase.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style component primitives
- lucide-react icons
- Supabase Auth and database persistence

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Add these values to `.env.local` before using authentication or capture persistence:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Apply the database migration in `supabase/migrations/20260520000000_create_core_brain_tables.sql` to your Supabase project. With the Supabase CLI, that can be done with:

```bash
supabase db push
```

If using the Supabase dashboard instead, open the SQL editor and run the migration SQL. Do not add service role keys to the app or to Netlify.

For Netlify, add the same two public Supabase environment variables to the site environment settings and redeploy.

## Current Scope

- Responsive sidebar navigation
- Top command/search bar placeholder
- Dashboard-first home experience
- Reusable dashboard card and widget primitives
- Email/password sign-up, login, and logout
- Protected app routes with `/login` as the public entry point
- Supabase-backed Global Capture Inbox persistence
- Placeholder pages for all major life and business sections
- Feature-based folder architecture
- Documentation for future expansion

## Non-Goals For This Foundation

- No deployment
- No custom business backend beyond the Supabase auth callback
- No live AI orchestration
- No vector store implementation
- No voice recording implementation

Those systems are represented as clean frontend contracts and architecture lanes only.

## Core Sections

- Dashboard
- Business
- Evolve Lab
- Frontier SQ
- Frontier Wear
- The Coaching Room
- Study & Learning
- Master of Business Psychology
- NLP
- Health & Performance
- Liam
- Finance
- Relationships
- Personal Projects
- Memory Timeline
- AI Agents
- Global Capture Inbox
- Settings

<!-- Deploy preview trigger: no functional change. -->
