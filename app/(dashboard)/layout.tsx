"use client"
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { MobileNav } from '@/components/mobile-nav';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { MainNav } from '@/components/main-nav';
import { Toast } from '@/components/ui/toast';
import { Session } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getSessionAndSet() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
      }
      setSession(session);
    }
    getSessionAndSet();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      router.push('/(auth)/login');
    }
  }, [session, router]);

  const user = {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@dipapa.com',
    role: 'Administrator',
    image: '',
  };

  if (!session) {
    return null; // Or a loading indicator
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center justify-between py-4 px-6">
          <div className="flex items-center gap-4">
            <MobileNav />
            <Logo />
          </div>
          <UserNav user={user} />
        </div>
      </header>
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 px-6">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block bg-primary pl-4 text-white">
          <div className="py-6 pr-6">
            <MainNav />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden pt-6">{children}</main>
      </div>
      <Toast />
    </div>
  );
}
