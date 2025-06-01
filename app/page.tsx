import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'

export default async function HomePage() {
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  } else {
    redirect("/login")
  }
}

