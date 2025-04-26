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
const mockQueryStats = {
  totalQueries: 487,
  pendingQueries: 42,
  resolvedQueries: 445,
  averageResolutionTime: "2.3 days",
  queryByType: {
    Building: 187,
    General: 156,
    "Password Reset": 144,
  },
  queryByPriority: {
    High: 98,
    Medium: 215,
    Low: 174,
  },
  queryByStatus: {
    Pending: 42,
    Processing: 65,
    Approved: 187,
    Rejected: 43,
    Closed: 150,
  },
  resolutionTimeByType: {
    Building: 3.2,
    General: 1.8,
    "Password Reset": 0.9,
  },
  queryTrends: [
    { month: "Jan", count: 32 },
    { month: "Feb", count: 41 },
    { month: "Mar", count: 37 },
    { month: "Apr", count: 45 },
    { month: "May", count: 39 },
    { month: "Jun", count: 42 },
    { month: "Jul", count: 36 },
    { month: "Aug", count: 40 },
    { month: "Sep", count: 48 },
    { month: "Oct", count: 52 },
    { month: "Nov", count: 43 },
    { month: "Dec", count: 32 },
  ],
  stipendStats: {
    totalRequests: 312,
    approved: 187,
    rejected: 43,
    pending: 82,
    averageProcessingTime: "3.5 days",
  },
}

export default function QueryReportsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Query Reports</h1>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="text-muted-foreground">Detailed analytics and statistics about queries and stipend requests.</p>
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
          title="Total Queries"
          value={mockQueryStats.totalQueries}
          description="Total submitted queries"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pending Queries"
          value={mockQueryStats.pendingQueries}
          description="Queries awaiting resolution"
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Resolved Queries"
          value={mockQueryStats.resolvedQueries}
          description="Queries that have been resolved"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Avg. Resolution Time"
          value={mockQueryStats.averageResolutionTime}
          description="Average time to resolve queries"
          trend={{ value: 10, isPositive: true }}
        />
      </div>

      <Tabs defaultValue="queries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="queries">Queries</TabsTrigger>
          <TabsTrigger value="stipends">Stipends</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="queries" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Query Types</CardTitle>
                <CardDescription>Breakdown of queries by type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      {Object.entries(mockQueryStats.queryByType).map(([type, count], index) => {
                        const colors = ["bg-primary", "bg-secondary", "bg-blue-500"]
                        const percentage = Math.round(((count as number) / mockQueryStats.totalQueries) * 100)

                        return (
                          <div key={type} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`h-4 w-4 rounded-full ${colors[index % colors.length]}`}></div>
                                <span>{type}</span>
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
                <CardTitle>Query Status</CardTitle>
                <CardDescription>Breakdown of queries by status</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      {Object.entries(mockQueryStats.queryByStatus).map(([status, count], index) => {
                        const colors = {
                          Pending: "bg-yellow-500",
                          Processing: "bg-blue-500",
                          Approved: "bg-green-500",
                          Rejected: "bg-red-500",
                          Closed: "bg-gray-500",
                        }
                        const percentage = Math.round(((count as number) / mockQueryStats.totalQueries) * 100)

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
                <CardTitle>Query Priority</CardTitle>
                <CardDescription>Breakdown of queries by priority</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      {Object.entries(mockQueryStats.queryByPriority).map(([priority, count], index) => {
                        const colors = {
                          High: "bg-red-500",
                          Medium: "bg-yellow-500",
                          Low: "bg-green-500",
                        }
                        const percentage = Math.round(((count as number) / mockQueryStats.totalQueries) * 100)

                        return (
                          <div key={priority} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-4 w-4 rounded-full ${colors[priority as keyof typeof colors]}`}
                                ></div>
                                <span>{priority}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{count}</span>
                                <span className="text-muted-foreground">({percentage}%)</span>
                              </div>
                            </div>
                            <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full ${colors[priority as keyof typeof colors]}`}
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
                <CardTitle>Resolution Time by Type</CardTitle>
                <CardDescription>Average resolution time by query type (in days)</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      {Object.entries(mockQueryStats.resolutionTimeByType).map(([type, days], index) => {
                        const colors = ["bg-primary", "bg-secondary", "bg-blue-500"]
                        // Calculate percentage for visualization (assuming max is 5 days)
                        const percentage = Math.min(Math.round(((days as number) / 5) * 100), 100)

                        return (
                          <div key={type} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`h-4 w-4 rounded-full ${colors[index % colors.length]}`}></div>
                                <span>{type}</span>
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

        <TabsContent value="stipends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Stipend Request Status</CardTitle>
                <CardDescription>Breakdown of stipend requests by status</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-green-500"></div>
                            <span>Approved</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{mockQueryStats.stipendStats.approved}</span>
                            <span className="text-muted-foreground">
                              (
                              {Math.round(
                                (mockQueryStats.stipendStats.approved / mockQueryStats.stipendStats.totalRequests) *
                                  100,
                              )}
                              %)
                            </span>
                          </div>
                        </div>
                        <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{
                              width: `${(mockQueryStats.stipendStats.approved / mockQueryStats.stipendStats.totalRequests) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                            <span>Pending</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{mockQueryStats.stipendStats.pending}</span>
                            <span className="text-muted-foreground">
                              (
                              {Math.round(
                                (mockQueryStats.stipendStats.pending / mockQueryStats.stipendStats.totalRequests) * 100,
                              )}
                              %)
                            </span>
                          </div>
                        </div>
                        <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-yellow-500"
                            style={{
                              width: `${(mockQueryStats.stipendStats.pending / mockQueryStats.stipendStats.totalRequests) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-red-500"></div>
                            <span>Rejected</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{mockQueryStats.stipendStats.rejected}</span>
                            <span className="text-muted-foreground">
                              (
                              {Math.round(
                                (mockQueryStats.stipendStats.rejected / mockQueryStats.stipendStats.totalRequests) *
                                  100,
                              )}
                              %)
                            </span>
                          </div>
                        </div>
                        <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-red-500"
                            style={{
                              width: `${(mockQueryStats.stipendStats.rejected / mockQueryStats.stipendStats.totalRequests) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stipend Processing Time</CardTitle>
                <CardDescription>Average time to process stipend requests</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center rounded-full border-8 border-muted p-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold">
                        {mockQueryStats.stipendStats.averageProcessingTime.split(" ")[0]}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">days average</div>
                    </div>
                  </div>
                  <div className="mt-8 text-sm text-muted-foreground">
                    <p>Average time from submission to final decision</p>
                    <p className="mt-2">Target processing time: 3 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Query Submission Trends</CardTitle>
              <CardDescription>Monthly query submission trends</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full">
                <div className="flex h-full flex-col">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-12 items-end gap-2 h-[300px]">
                      {mockQueryStats.queryTrends.map((item) => {
                        // Calculate height percentage (max height is 90% of container)
                        const maxCount = Math.max(...mockQueryStats.queryTrends.map((i) => i.count))
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
                    <p className="text-sm text-muted-foreground">Number of queries submitted per month</p>
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

