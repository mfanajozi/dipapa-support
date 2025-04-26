import Link from "next/link"
import { BarChart3, PieChart, LineChart, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Generate and view reports.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Reports</CardTitle>
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>User statistics and demographics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View reports on user demographics, registration trends, and user activity.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/reports/users">
                View Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Query Reports</CardTitle>
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Query and stipend statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View reports on query types, resolution times, and stipend request trends.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/reports/queries">
                View Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Support Reports</CardTitle>
              <LineChart className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Support ticket analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View reports on support ticket categories, resolution times, and satisfaction ratings.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/reports/support">
                View Reports
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

