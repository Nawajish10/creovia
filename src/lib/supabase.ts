import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function getServiceRoleClient() {
  if (!supabaseServiceKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY — cannot perform privileged operations.")
  if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
  return createClient(supabaseUrl, supabaseServiceKey)
}
