'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'
import { getSupabase } from '@/lib/supabase'

type Profile = { id: string; email: string | null; full_name: string | null; is_admin: boolean }
type Ctx = { user: User | null; profile: Profile | null; loading: boolean; signOut: () => Promise<void>; refresh: () => Promise<void> }

const AuthCtx = createContext<Ctx>({ user: null, profile: null, loading: true, signOut: async () => {}, refresh: async () => {} })
export const useAuth = () => useContext(AuthCtx)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (u: User | null) => {
    const sb = getSupabase()
    if (!sb || !u) { setProfile(null); return }
    const { data } = await sb.from('profiles').select('id,email,full_name,is_admin').eq('id', u.id).maybeSingle()
    setProfile((data as Profile) ?? { id: u.id, email: u.email ?? null, full_name: null, is_admin: false })
  }, [])

  const refresh = useCallback(async () => {
    const sb = getSupabase()
    if (!sb) { setLoading(false); return }
    const { data } = await sb.auth.getUser()
    setUser(data.user)
    await loadProfile(data.user)
    setLoading(false)
  }, [loadProfile])

  useEffect(() => {
    const sb = getSupabase()
    if (!sb) { setLoading(false); return }
    refresh()
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
      loadProfile(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [refresh, loadProfile])

  const signOut = async () => {
    await getSupabase()?.auth.signOut()
    setUser(null); setProfile(null)
  }

  return <AuthCtx.Provider value={{ user, profile, loading, signOut, refresh }}>{children}</AuthCtx.Provider>
}
