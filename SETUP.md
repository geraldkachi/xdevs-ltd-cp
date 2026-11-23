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
| "What we do" video, social links | `lib/site.ts` |
| Courses, prices, pre-order tracks, career paths | `lib/academy.ts` |
| Our Story timeline, Process, Case studies, Blog posts | `lib/content.ts` |
| Favicon | `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `public/favicon.svg` |

## Adding Cynthia Caxton's photo
1. Save the photo as `public/team/cynthia-caxton.jpg` (portrait, ~1000×1250 px works best).
2. In `lib/team.ts`, change her `image: null` to `image: '/team/cynthia-caxton.jpg'`.
Until then her card shows "CC — Photo coming soon".

## Swapping the demo video
Open `lib/site.ts` and replace `VIDEO.src` with your own .mp4 URL (or put the file in
`public/video/` and use `'/video/your-file.mp4'`). For a YouTube/Vimeo video, set
`VIDEO.embed` to its embed URL — the popup will play that instead. The current clip is
free Mixkit stock footage, for demo only.

## Credits
The moving star background and planet are adapted from github.com/geraldkachi/3d.
Planet model: "Stylized planet" by cmzw (sketchfab.com/cmzw), CC-BY-4.0 — the credit is
on the Contact page; keep it if you keep the model.
