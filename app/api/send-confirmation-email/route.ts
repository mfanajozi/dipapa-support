import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    })

    if (error) {
      console.error('Supabase resend confirmation error:', error)
      // Check for specific error messages from Supabase that indicate user not found
      if (error.message.includes('user not found') || error.message.includes('User already confirmed')) {
        return NextResponse.json({ message: 'If the user exists, a confirmation email will be sent.' }, { status: 200 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'If the user exists, a confirmation email will be sent.' }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error sending confirmation email:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
} 