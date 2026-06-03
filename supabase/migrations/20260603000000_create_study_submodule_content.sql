create table if not exists public.study_submodule_content (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  unit_slug text not null,
  week_slug text not null,
  submodule_slug text not null,
  field_name text not null,
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint study_submodule_content_unique_field
    unique (user_id, unit_slug, week_slug, submodule_slug, field_name)
);

create index if not exists study_submodule_content_lookup_idx
  on public.study_submodule_content (
    user_id,
    unit_slug,
    week_slug,
    submodule_slug
  );

drop trigger if exists set_study_submodule_content_updated_at on public.study_submodule_content;
create trigger set_study_submodule_content_updated_at
  before update on public.study_submodule_content
  for each row
  execute function public.set_updated_at();

alter table public.study_submodule_content enable row level security;

drop policy if exists study_submodule_content_select_own on public.study_submodule_content;
create policy study_submodule_content_select_own
  on public.study_submodule_content for select
  using (auth.uid() = user_id);

drop policy if exists study_submodule_content_insert_own on public.study_submodule_content;
create policy study_submodule_content_insert_own
  on public.study_submodule_content for insert
  with check (auth.uid() = user_id);

drop policy if exists study_submodule_content_update_own on public.study_submodule_content;
create policy study_submodule_content_update_own
  on public.study_submodule_content for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists study_submodule_content_delete_own on public.study_submodule_content;
create policy study_submodule_content_delete_own
  on public.study_submodule_content for delete
  using (auth.uid() = user_id);
