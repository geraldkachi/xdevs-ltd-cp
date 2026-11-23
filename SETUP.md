# XDEVS website — setup

## Run locally
```bash
npm install
cp .env.example .env.local   # then paste your Supabase keys
npm run dev                  # http://localhost:3000
```
The site works without keys — sign-in, applications, academy sign-ups and the
contact form just show a "backend not connected" note (contact falls back to email).

## Turn on sign-in, open roles and applications (Supabase, ~10 minutes)
1. Create a free project at https://supabase.com.
2. **SQL Editor → New query** → paste all of `supabase/schema.sql` → **Run**.
   This creates the tables, security rules, the private `cvs` bucket for CV uploads,
   and two starter roles.
3. **Project Settings → API** → copy the *Project URL* and *anon public* key into
   `.env.local` and into Vercel (Settings → Environment Variables). Redeploy.
4. **Authentication → URL Configuration** → set *Site URL* to your live domain
   (e.g. `https://xdevs.io`) and add `https://xdevs.io/**` and
   `http://localhost:3000/**` to *Redirect URLs* (for confirmation & reset emails).
5. Sign up on your site at `/login`, then make yourself admin in the SQL Editor:
   ```sql
   update public.profiles set is_admin = true where email = 'you@example.com';
   ```
   Do the same for Cynthia's account if she should manage roles too.

## Day to day
- **Post a role:** sign in → `/admin` → *Roles* → **+ New role** → Publish. It appears on
  `/careers` and the home page immediately. Untick *Open* to hide it without deleting.
- **Review applicants:** `/admin` → *Applications* → open details, download CV, set status.
  Applicants see the status in `/account`.
- **Academy sign-ups & contact messages:** `/admin` tabs, with CSV export.

## Where to edit content
| What | File |
|---|---|
| Team bios, photos, focus areas | `lib/team.ts` (photos in `public/team/`) |
| Courses, prices, pre-order tracks, career paths | `lib/academy.ts` |
| Our Story timeline, Process, Case studies, Blog posts | `lib/content.ts` |
| Favicon | `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `public/favicon.svg` |
