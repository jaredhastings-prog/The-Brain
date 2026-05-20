create extension if not exists pgcrypto;

create table if not exists public.captures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  body text not null,
  capture_type text not null default 'Uncategorised',
  life_domain text not null default 'Uncategorised',
  sub_domain text,
  priority text,
  tags text[] not null default '{}'::text[],
  status text not null default 'Unprocessed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_capture_id uuid references public.captures(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'Open',
  priority text,
  life_domain text,
  sub_domain text,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_capture_id uuid references public.captures(id) on delete set null,
  title text,
  body text not null,
  life_domain text,
  sub_domain text,
  tags text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_capture_id uuid references public.captures(id) on delete set null,
  name text not null,
  description text,
  status text not null default 'Active',
  life_domain text,
  sub_domain text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source_capture_id uuid references public.captures(id) on delete set null,
  title text,
  body text not null,
  life_domain text,
  sub_domain text,
  emotional_tone text,
  importance text,
  tags text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists captures_user_created_at_idx
  on public.captures (user_id, created_at desc);

create index if not exists tasks_user_created_at_idx
  on public.tasks (user_id, created_at desc);

create index if not exists notes_user_created_at_idx
  on public.notes (user_id, created_at desc);

create index if not exists projects_user_created_at_idx
  on public.projects (user_id, created_at desc);

create index if not exists memories_user_created_at_idx
  on public.memories (user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_captures_updated_at on public.captures;
create trigger set_captures_updated_at
  before update on public.captures
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_tasks_updated_at on public.tasks;
create trigger set_tasks_updated_at
  before update on public.tasks
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_notes_updated_at on public.notes;
create trigger set_notes_updated_at
  before update on public.notes
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_memories_updated_at on public.memories;
create trigger set_memories_updated_at
  before update on public.memories
  for each row
  execute function public.set_updated_at();

alter table public.captures enable row level security;
alter table public.tasks enable row level security;
alter table public.notes enable row level security;
alter table public.projects enable row level security;
alter table public.memories enable row level security;

drop policy if exists captures_select_own on public.captures;
create policy captures_select_own
  on public.captures for select
  using (auth.uid() = user_id);

drop policy if exists captures_insert_own on public.captures;
create policy captures_insert_own
  on public.captures for insert
  with check (auth.uid() = user_id);

drop policy if exists captures_update_own on public.captures;
create policy captures_update_own
  on public.captures for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists captures_delete_own on public.captures;
create policy captures_delete_own
  on public.captures for delete
  using (auth.uid() = user_id);

drop policy if exists tasks_select_own on public.tasks;
create policy tasks_select_own
  on public.tasks for select
  using (auth.uid() = user_id);

drop policy if exists tasks_insert_own on public.tasks;
create policy tasks_insert_own
  on public.tasks for insert
  with check (auth.uid() = user_id);

drop policy if exists tasks_update_own on public.tasks;
create policy tasks_update_own
  on public.tasks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists tasks_delete_own on public.tasks;
create policy tasks_delete_own
  on public.tasks for delete
  using (auth.uid() = user_id);

drop policy if exists notes_select_own on public.notes;
create policy notes_select_own
  on public.notes for select
  using (auth.uid() = user_id);

drop policy if exists notes_insert_own on public.notes;
create policy notes_insert_own
  on public.notes for insert
  with check (auth.uid() = user_id);

drop policy if exists notes_update_own on public.notes;
create policy notes_update_own
  on public.notes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists notes_delete_own on public.notes;
create policy notes_delete_own
  on public.notes for delete
  using (auth.uid() = user_id);

drop policy if exists projects_select_own on public.projects;
create policy projects_select_own
  on public.projects for select
  using (auth.uid() = user_id);

drop policy if exists projects_insert_own on public.projects;
create policy projects_insert_own
  on public.projects for insert
  with check (auth.uid() = user_id);

drop policy if exists projects_update_own on public.projects;
create policy projects_update_own
  on public.projects for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists projects_delete_own on public.projects;
create policy projects_delete_own
  on public.projects for delete
  using (auth.uid() = user_id);

drop policy if exists memories_select_own on public.memories;
create policy memories_select_own
  on public.memories for select
  using (auth.uid() = user_id);

drop policy if exists memories_insert_own on public.memories;
create policy memories_insert_own
  on public.memories for insert
  with check (auth.uid() = user_id);

drop policy if exists memories_update_own on public.memories;
create policy memories_update_own
  on public.memories for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists memories_delete_own on public.memories;
create policy memories_delete_own
  on public.memories for delete
  using (auth.uid() = user_id);
