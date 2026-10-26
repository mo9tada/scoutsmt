import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example)")
}

// Browser + server client using the public anon key; access is enforced by
// the Row Level Security policies in scripts/create-rls-policies.sql.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for server actions
export const createServerClient = () => createClient(supabaseUrl, supabaseAnonKey)
