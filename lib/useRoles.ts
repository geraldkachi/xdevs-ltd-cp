'use client'
import { useEffect, useState } from 'react'
import { getSupabase, type Role } from '@/lib/supabase'

/** Loads open roles from Supabase (newest first). */
export function useOpenRoles() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sb = getSupabase()
    if (!sb) { setLoading(false); return }
    sb.from('roles').select('*').eq('is_open', true).order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        setRoles((data as Role[]) ?? [])
        setLoading(false)
      })
  }, [])

  return { roles, loading, error }
}

export const lines = (s: string | null | undefined) => (s ?? '').split('\n').map((l) => l.replace(/^[-•*]\s*/, '').trim()).filter(Boolean)
