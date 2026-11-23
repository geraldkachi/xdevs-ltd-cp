import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/** True when the Supabase keys are present (set them in .env.local and on Vercel). */
export const supabaseReady = Boolean(url && anon)

let client: SupabaseClient | null = null

/** Browser Supabase client, or null when the keys are not configured yet. */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseReady) return null
  if (!client) client = createClient(url!, anon!, { auth: { persistSession: true, autoRefreshToken: true } })
  return client
}

export type Role = {
  id: string
  title: string
  team: string
  location: string
  type: string
  level: string | null
  salary: string | null
  summary: string | null
  responsibilities: string | null
  requirements: string | null
  is_open: boolean
  created_at: string
}

export type Application = {
  id: string
  role_id: string
  user_id: string
  full_name: string
  email: string
  phone: string | null
  linkedin: string | null
  portfolio: string | null
  cover_letter: string | null
  cv_path: string | null
  status: 'received' | 'reviewing' | 'interview' | 'offer' | 'rejected'
  created_at: string
  roles?: { title: string } | null
}

export const STATUSES: Application['status'][] = ['received', 'reviewing', 'interview', 'offer', 'rejected']
