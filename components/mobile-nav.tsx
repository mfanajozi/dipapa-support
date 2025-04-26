"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, MessageSquare, FileText, HelpCircle, UserPlus, FileBarChart, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Queries",
    href: "/queries",
    icon: HelpCircle,
  },
  {
    title: "Stipends",
    href: "/stipends",
    icon: FileText,
  },
  {
    title: "Content",
    href: "/content",
    icon: FileText,
    submenu: [
      {
        title: "News",
        href: "/content/news",
      },
      {
        title: "Resources",
        href: "/content/resources",
      },
      {
        title: "Events",
        href: "/content/events",
      },
    ],
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Visitors",
    href: "/visitors",
    icon: UserPlus,
  },
  {
    title: "Support",
    href: "/support",
    icon: HelpCircle,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileBarChart,
  },
]

interface MobileNavProps {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] pr-0">
        <div className="px-2 py-6 flex items-center">
          <Logo />
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <nav className="flex flex-col space-y-3 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <div key={item.href}>
                <Button
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start",
                    isActive ? "text-secondary-foreground" : "text-muted-foreground",
                  )}
                  onClick={() => {
                    if (!item.submenu) setOpen(false)
                  }}
                >
                  <Link href={item.href}>
                    <Icon className="mr-2 h-5 w-5" />
                    {item.title}
                  </Link>
                </Button>

                {item.submenu && isActive && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.submenu.map((subitem) => {
                      const isSubActive = pathname === subitem.href

                      return (
                        <Button
                          key={subitem.href}
                          asChild
                          variant={isSubActive ? "secondary" : "ghost"}
                          size="sm"
                          className={cn(
                            "w-full justify-start",
                            isSubActive ? "text-secondary-foreground" : "text-muted-foreground",
                          )}
                          onClick={() => setOpen(false)}
                        >
                          <Link href={subitem.href}>{subitem.title}</Link>
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

