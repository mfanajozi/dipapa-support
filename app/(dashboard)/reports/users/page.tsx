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
const mockUserStats = {
  totalUsers: 1248,
  activeUsers: 1156,
  inactiveUsers: 92,
  newUsersThisMonth: 78,
  usersByGender: {
    male: 723,
    female: 525,
  },
  usersByLocation: {
    "Main Campus": 645,
    "Downtown Campus": 412,
    "West Campus": 191,
  },
  usersByBuilding: {
    "North Tower": 312,
    "South Tower": 298,
    "East Tower": 287,
    "West Tower": 351,
  },
  registrationTrends: [
    { month: "Jan", count: 42 },
    { month: "Feb", count: 56 },
    { month: "Mar", count: 78 },
    { month: "Apr", count: 63 },
    { month: "May", count: 47 },
    { month: "Jun", count: 39 },
    { month: "Jul", count: 28 },
    { month: "Aug", count: 54 },
    { month: "Sep", count: 89 },
    { month: "Oct", count: 76 },
    { month: "Nov", count: 65 },
    { month: "Dec", count: 51 },
  ],
}

export default function UserReportsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">User Reports</h1>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="text-muted-foreground">Detailed analytics and statistics about user demographics and activity.</p>
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
          title="Total Users"
          value={mockUserStats.totalUsers}
          description="Total registered users"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value={mockUserStats.activeUsers}
          description="Users active in last 30 days"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="New Users"
          value={mockUserStats.newUsersThisMonth}
          description="New registrations this month"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Inactive Users"
          value={mockUserStats.inactiveUsers}
          description="Users inactive for 30+ days"
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Breakdown of users by gender</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-primary"></div>
                          <span>Male</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{mockUserStats.usersByGender.male}</span>
                          <span className="text-muted-foreground">
                            ({Math.round((mockUserStats.usersByGender.male / mockUserStats.totalUsers) * 100)}%)
                          </span>
                        </div>
                      </div>
                      <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(mockUserStats.usersByGender.male / mockUserStats.totalUsers) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-secondary"></div>
                          <span>Female</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{mockUserStats.usersByGender.female}</span>
                          <span className="text-muted-foreground">
                            ({Math.round((mockUserStats.usersByGender.female / mockUserStats.totalUsers) * 100)}%)
                          </span>
                        </div>
                      </div>
                      <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-secondary"
                          style={{ width: `${(mockUserStats.usersByGender.female / mockUserStats.totalUsers) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>Breakdown of users by age group</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                          <span>18-24</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">587</span>
                          <span className="text-muted-foreground">(47%)</span>
                        </div>
                      </div>
                      <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "47%" }}></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          <span>25-34</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">412</span>
                          <span className="text-muted-foreground">(33%)</span>
                        </div>
                      </div>
                      <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "33%" }}></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                          <span>35-44</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">187</span>
                          <span className="text-muted-foreground">(15%)</span>
                        </div>
                      </div>
                      <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: "15%" }}></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-red-500"></div>
                          <span>45+</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">62</span>
                          <span className="text-muted-foreground">(5%)</span>
                        </div>
                      </div>
                      <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: "5%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campus Distribution</CardTitle>
                <CardDescription>Breakdown of users by campus location</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      {Object.entries(mockUserStats.usersByLocation).map(([location, count], index) => {
                        const colors = ["bg-primary", "bg-secondary", "bg-blue-500"]
                        const percentage = Math.round(((count as number) / mockUserStats.totalUsers) * 100)

                        return (
                          <div key={location} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`h-4 w-4 rounded-full ${colors[index % colors.length]}`}></div>
                                <span>{location}</span>
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
                <CardTitle>Building Distribution</CardTitle>
                <CardDescription>Breakdown of users by building</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      {Object.entries(mockUserStats.usersByBuilding).map(([building, count], index) => {
                        const colors = ["bg-primary", "bg-secondary", "bg-blue-500", "bg-green-500"]
                        const percentage = Math.round(((count as number) / mockUserStats.totalUsers) * 100)

                        return (
                          <div key={building} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`h-4 w-4 rounded-full ${colors[index % colors.length]}`}></div>
                                <span>{building}</span>
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
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registration Trends</CardTitle>
              <CardDescription>Monthly user registration trends</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full">
                <div className="flex h-full flex-col">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-12 items-end gap-2 h-[300px]">
                      {mockUserStats.registrationTrends.map((item) => {
                        // Calculate height percentage (max height is 90% of container)
                        const maxCount = Math.max(...mockUserStats.registrationTrends.map((i) => i.count))
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
                    <p className="text-sm text-muted-foreground">Number of new user registrations per month</p>
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

