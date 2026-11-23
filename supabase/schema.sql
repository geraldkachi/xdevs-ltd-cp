-- ============================================================================
-- XDEVS — Supabase schema
-- Run this once in Supabase → SQL Editor → New query → Run.
-- Creates: profiles, roles (open positions), applications, enrollments,
-- contact_messages, newsletter, the private "cvs" storage bucket, and the
-- row-level-security rules that keep everything locked down.
-- ============================================================================

-- ---------- Profiles (one per signed-up user) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Create a profile automatically when someone signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper used by the policies below
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- ---------- Open roles ----------
create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  team text not null default 'Engineering',
  location text not null default 'Remote',
  type text not null default 'Full-time',
  level text,
  salary text,
  summary text,
  responsibilities text,   -- one item per line
  requirements text,       -- one item per line
  is_open boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- Applications ----------
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references public.roles(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  full_name text not null,
  email text not null,
  phone text,
  linkedin text,
  portfolio text,
  cover_letter text,
  cv_path text,
  status text not null default 'received'
    check (status in ('received','reviewing','interview','offer','rejected')),
  created_at timestamptz not null default now(),
  unique (role_id, user_id)
);

-- ---------- Academy enrolments & pre-orders ----------
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  course text not null,
  kind text not null default 'diploma' check (kind in ('diploma','preorder','mentorship')),
  full_name text not null,
  email text not null,
  phone text,
  experience text,
  message text,
  created_at timestamptz not null default now()
);

-- ---------- Contact form ----------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  service text,
  budget text,
  message text not null,
  created_at timestamptz not null default now()
);

-- ---------- Newsletter ----------
create table if not exists public.newsletter (
  email text primary key,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- Row level security
-- ============================================================================
alter table public.profiles         enable row level security;
alter table public.roles            enable row level security;
alter table public.applications     enable row level security;
alter table public.enrollments      enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter       enable row level security;

-- profiles: you can read your own; admins can read all. Nobody can make
-- themselves admin from the website (no update policy).
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

-- roles: everyone sees open roles; admins see and manage all
drop policy if exists "roles public read" on public.roles;
create policy "roles public read" on public.roles
  for select using (is_open or public.is_admin());
drop policy if exists "roles admin write" on public.roles;
create policy "roles admin write" on public.roles
  for all using (public.is_admin()) with check (public.is_admin());

-- applications: signed-in users apply for themselves and see their own;
-- admins see all and can change status
drop policy if exists "apps insert own" on public.applications;
create policy "apps insert own" on public.applications
  for insert with check (auth.uid() = user_id);
drop policy if exists "apps read own or admin" on public.applications;
create policy "apps read own or admin" on public.applications
  for select using (auth.uid() = user_id or public.is_admin());
drop policy if exists "apps admin update" on public.applications;
create policy "apps admin update" on public.applications
  for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "apps admin delete" on public.applications;
create policy "apps admin delete" on public.applications
  for delete using (public.is_admin());

-- public forms: anyone can submit, only admins can read
drop policy if exists "enrol insert" on public.enrollments;
create policy "enrol insert" on public.enrollments for insert with check (true);
drop policy if exists "enrol admin read" on public.enrollments;
create policy "enrol admin read" on public.enrollments for select using (public.is_admin());
drop policy if exists "enrol admin delete" on public.enrollments;
create policy "enrol admin delete" on public.enrollments for delete using (public.is_admin());

drop policy if exists "contact insert" on public.contact_messages;
create policy "contact insert" on public.contact_messages for insert with check (true);
drop policy if exists "contact admin read" on public.contact_messages;
create policy "contact admin read" on public.contact_messages for select using (public.is_admin());
drop policy if exists "contact admin delete" on public.contact_messages;
create policy "contact admin delete" on public.contact_messages for delete using (public.is_admin());

drop policy if exists "news insert" on public.newsletter;
create policy "news insert" on public.newsletter for insert with check (true);
drop policy if exists "news admin read" on public.newsletter;
create policy "news admin read" on public.newsletter for select using (public.is_admin());

-- ============================================================================
-- CV uploads: private bucket. Each user uploads into a folder named after
-- their user id; only they and admins can read the files.
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', false)
on conflict (id) do nothing;

drop policy if exists "cv upload own folder" on storage.objects;
create policy "cv upload own folder" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'cvs' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "cv read own or admin" on storage.objects;
create policy "cv read own or admin" on storage.objects
  for select to authenticated
  using (bucket_id = 'cvs' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

-- ============================================================================
-- Starter roles (edit or delete them from /admin afterwards)
-- ============================================================================
insert into public.roles (title, team, location, type, level, summary, responsibilities, requirements)
select * from (values
  ('Full-Stack Engineer', 'Software', 'Remote / Lagos', 'Full-time', 'Mid–Senior',
   'Build and ship product features end to end across our React/Next.js front ends and Node.js services.',
   E'Design, build and test features across the stack\nReview code and keep quality high\nWork directly with clients on requirements',
   E'3+ years building production web apps\nStrong TypeScript, React and Node.js\nComfortable with PostgreSQL and REST/GraphQL APIs'),
  ('DevOps Engineer', 'Cloud & DevOps', 'Remote', 'Full-time', 'Mid',
   'Own CI/CD, infrastructure as code and observability for client platforms on AWS.',
   E'Build and maintain CI/CD pipelines\nManage infrastructure with Terraform\nSet up monitoring, alerting and on-call runbooks',
   E'2+ years in a DevOps/SRE role\nHands-on AWS, Docker and Kubernetes\nTerraform or similar IaC tooling')
) as v(title, team, location, type, level, summary, responsibilities, requirements)
where not exists (select 1 from public.roles);

-- ============================================================================
-- MAKE YOURSELF ADMIN — after you sign up on the website, run:
--   update public.profiles set is_admin = true where email = 'you@example.com';
-- ============================================================================
