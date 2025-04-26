import type React from "react"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/user-nav"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Mock user data - in a real app, this would come from your auth system
  const user = {
    id: "u1",
    name: "Admin User",
    email: "admin@dipapa.com",
    role: "Administrator",
    image: "",
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
      <Toaster />
    </div>
  )
}
