import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kbkgthyiepfuzulpkcwi.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtia2d0aHlpZXBmdXp1bHBrY3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMTYyODUsImV4cCI6MjA3Mzc5MjI4NX0.sORZOkkDrGeyg88dw2qIlsnD8hhFC27Q5K6-vRzaz8U"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Authentication functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}