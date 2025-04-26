"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, MessageSquare, FileText, HelpCircle, UserPlus, FileBarChart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
    title: "Support Tickets",
    href: "/support-tickets",
    icon: HelpCircle,
  },
  {
    title: "Stipends",
    href: "/stipends",
    icon: FileText,
  },
  {
    title: "Bus Schedule",
    href: "/bus-schedule",
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
    title: "Reports",
    href: "/reports",
    icon: FileBarChart,
  },
]

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
        const Icon = item.icon

        return (
          <div key={item.href}>
            <Button
              asChild
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              className={cn("w-full justify-start", isActive ? "text-secondary-foreground" : "text-muted-foreground")}
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>

            {item.submenu && isActive && (
              <div className="ml-6 mt-1 space-y-1">
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
  )
}
