"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatCard } from "@/components/ui/stat-card"

// This would be replaced with actual data from your database
const mockSupportStats = {
  totalTickets: 324,
  openTickets: 18,
  closedTickets: 306,
  averageResolutionTime: "1.8 days",
  ticketsByCategory: {
    "Password Reset": 142,
    Building: 98,
    General: 84,
  },
  ticketsByStatus: {
    Pending: 8,
    Processing: 10,
    Closed: 306,
  },
  resolutionTimeByCategory: {
    "Password Reset": 0.7,
    Building: 2.5,
    General: 1.9,
  },
  satisfactionRating: {
    average: 4.2,
    distribution: {
      "5 stars": 156,
      "4 stars": 98,
      "3 stars": 42,
      "2 stars": 18,
      "1 star": 10,
    },
  },
  ticketTrends: [
    { month: "Jan", count: 22 },
    { month: "Feb", count: 28 },
    { month: "Mar", count: 25 },
    { month: "Apr", count: 31 },
    { month: "May", count: 27 },
    { month: "Jun", count: 29 },
    { month: "Jul", count: 24 },
    { month: "Aug", count: 26 },
    { month: "Sep", count: 32 },
    { month: "Oct", count: 35 },
    { month: "Nov", count: 30 },
    { month: "Dec", count: 15 },
  ],
}

export default function SupportReportsPage() {
  const [timeframe, setTimeframe] = useState("year")

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/reports">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to reports</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Support Reports</h1>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="text-muted-foreground">
          Detailed analytics and statistics about support tickets and customer satisfaction.
        </p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground whitespace-nowrap">Time Period:</p>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Tickets"
          value={mockSupportStats.totalTickets}
          description="Total support tickets"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Open Tickets"
          value={mockSupportStats.openTickets}
          description="Tickets awaiting resolution"
          trend={{ value: 3, isPositive: false }}
        />
        <StatCard
          title="Closed Tickets"
          value={mockSupportStats.closedTickets}
          description="Tickets that have been resolved"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Avg. Resolution Time"
          value={mockSupportStats.averageResolutionTime}
          description="Average time to resolve tickets"
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Categories</CardTitle>
                <CardDescription>Breakdown of tickets by category</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      {Object.entries(mockSupportStats.ticketsByCategory).map(([category, count], index) => {
                        const colors = ["bg-primary", "bg-secondary", "bg-blue-500"]
                        const percentage = Math.round(((count as number) / mockSupportStats.totalTickets) * 100)

                        return (
                          <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`h-4 w-4 rounded-full ${colors[index % colors.length]}`}></div>
                                <span>{category}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{count}</span>
                                <span className="text-muted-foreground">({percentage}%)</span>
                              </div>
                            </div>
                            <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full ${colors[index % colors.length]}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ticket Status</CardTitle>
                <CardDescription>Breakdown of tickets by status</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      {Object.entries(mockSupportStats.ticketsByStatus).map(([status, count], index) => {
                        const colors = {
                          Pending: "bg-yellow-500",
                          Processing: "bg-blue-500",
                          Closed: "bg-green-500",
                        }
                        const percentage = Math.round(((count as number) / mockSupportStats.totalTickets) * 100)

                        return (
                          <div key={status} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`h-4 w-4 rounded-full ${colors[status as keyof typeof colors]}`}></div>
                                <span>{status}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{count}</span>
                                <span className="text-muted-foreground">({percentage}%)</span>
                              </div>
                            </div>
                            <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full ${colors[status as keyof typeof colors]}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Time by Category</CardTitle>
                <CardDescription>Average resolution time by ticket category (in days)</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      {Object.entries(mockSupportStats.resolutionTimeByCategory).map(([category, days], index) => {
                        const colors = ["bg-primary", "bg-secondary", "bg-blue-500"]
                        // Calculate percentage for visualization (assuming max is 5 days)
                        const percentage = Math.min(Math.round(((days as number) / 5) * 100), 100)

                        return (
                          <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`h-4 w-4 rounded-full ${colors[index % colors.length]}`}></div>
                                <span>{category}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{days} days</span>
                              </div>
                            </div>
                            <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full ${colors[index % colors.length]}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>
                  Average satisfaction rating: {mockSupportStats.satisfactionRating.average} / 5
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      {Object.entries(mockSupportStats.satisfactionRating.distribution).map(
                        ([rating, count], index) => {
                          const colors = [
                            "bg-green-500",
                            "bg-green-400",
                            "bg-yellow-400",
                            "bg-orange-400",
                            "bg-red-500",
                          ]
                          const totalRatings = Object.values(mockSupportStats.satisfactionRating.distribution).reduce(
                            (a, b) => (a as number) + (b as number),
                            0,
                          )
                          const percentage = Math.round(((count as number) / totalRatings) * 100)

                          return (
                            <div key={rating} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={`h-4 w-4 rounded-full ${colors[index]}`}></div>
                                  <span>{rating}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{count}</span>
                                  <span className="text-muted-foreground">({percentage}%)</span>
                                </div>
                              </div>
                              <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                                <div className={`h-full ${colors[index]}`} style={{ width: `${percentage}%` }}></div>
                              </div>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Satisfaction Score</CardTitle>
                <CardDescription>Customer satisfaction rating</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center rounded-full border-8 border-muted p-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold">{mockSupportStats.satisfactionRating.average}</div>
                      <div className="text-sm text-muted-foreground mt-1">out of 5</div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-8 w-8 ${star <= Math.round(mockSupportStats.satisfactionRating.average) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Based on{" "}
                    {Object.values(mockSupportStats.satisfactionRating.distribution).reduce(
                      (a, b) => (a as number) + (b as number),
                      0,
                    )}{" "}
                    ratings
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Ticket Trends</CardTitle>
              <CardDescription>Monthly support ticket submission trends</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full">
                <div className="flex h-full flex-col">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-12 items-end gap-2 h-[300px]">
                      {mockSupportStats.ticketTrends.map((item) => {
                        // Calculate height percentage (max height is 90% of container)
                        const maxCount = Math.max(...mockSupportStats.ticketTrends.map((i) => i.count))
                        const heightPercentage = (item.count / maxCount) * 90

                        return (
                          <div key={item.month} className="flex flex-col items-center gap-2">
                            <div
                              className="w-full bg-primary rounded-t-md"
                              style={{ height: `${heightPercentage}%` }}
                            ></div>
                            <span className="text-xs text-muted-foreground">{item.month}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="pt-6 text-center">
                    <p className="text-sm text-muted-foreground">Number of support tickets submitted per month</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

