import { Suspense } from "react"
import Link from "next/link"
import { Users, MessageSquare, FileText, HelpCircle, ArrowRight, ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge } from "@/components/ui/status-badge"

// This would normally be fetched from your database
const mockStats = {
  totalUsers: 1248,
  activeQueries: 42,
  resolvedQueries: 156,
  pendingStipends: 23,
  visitorCodes: {
    generated: 89,
    used: 67,
    expired: 12,
  },
  supportTickets: {
    open: 18,
    closed: 124,
  },
}

const mockRecentQueries = [
  {
    id: "q1",
    name: "John Smith",
    type: "Building",
    priority: "High",
    status: "Pending",
    created_at: "2023-03-15T10:30:00Z",
  },
  {
    id: "q2",
    name: "Sarah Johnson",
    type: "General",
    priority: "Medium",
    status: "Processing",
    created_at: "2023-03-14T14:45:00Z",
  },
  {
    id: "q3",
    name: "Michael Brown",
    type: "Password Reset",
    priority: "Low",
    status: "Closed",
    created_at: "2023-03-13T09:15:00Z",
  },
]

function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your CRM platform and recent activities.</p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={mockStats.totalUsers}
            description="Active registered users"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Queries"
            value={mockStats.activeQueries}
            description="Queries awaiting resolution"
            icon={<HelpCircle className="h-4 w-4" />}
            trend={{ value: 8, isPositive: false }}
          />
          <StatCard
            title="Pending Stipends"
            value={mockStats.pendingStipends}
            description="Stipend requests to process"
            icon={<FileText className="h-4 w-4" />}
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Support Tickets"
            value={mockStats.supportTickets.open}
            description="Open support tickets"
            icon={<MessageSquare className="h-4 w-4" />}
            trend={{ value: 3, isPositive: true }}
          />
        </div>
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Queries</CardTitle>
            <CardDescription>Latest queries submitted by users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentQueries.map((query) => (
                <div key={query.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{query.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">{query.type}</p>
                      <span className="text-muted-foreground">•</span>
                      <p className="text-sm text-muted-foreground">Priority: {query.priority}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={query.status} />
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/queries/${query.id}`}>
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">View query</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto" asChild>
              <Link href="/queries">
                View all queries
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Visitor Codes</CardTitle>
            <CardDescription>Overview of visitor code usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Generated</p>
                  <p className="text-sm text-muted-foreground">Total codes created</p>
                </div>
                <p className="text-2xl font-bold">{mockStats.visitorCodes.generated}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Used</p>
                  <p className="text-sm text-muted-foreground">Codes that have been used</p>
                </div>
                <p className="text-2xl font-bold">{mockStats.visitorCodes.used}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Expired</p>
                  <p className="text-sm text-muted-foreground">Codes that have expired</p>
                </div>
                <p className="text-2xl font-bold">{mockStats.visitorCodes.expired}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto" asChild>
              <Link href="/visitors">
                View all visitor codes
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
