import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/utils"
import { supabase } from "@/lib/supabase/client"

export default function QueryDetailPage({ params }: { params: { id: string } }) {
  const [query, setQuery] = useState<any>(null)
  const [stipend, setStipend] = useState<any>(null)
  const [activityLogs, setActivityLogs] = useState<any[]>([])
  const [status, setStatus] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      // Fetch query data by id
      const { data: queryData, error: queryError } = await supabase
        .from("queries")
        .select("*")
        .eq("id", params.id)
        .single()

      if (queryError) {
        console.error("Error fetching query:", queryError)
        return
      }
      setQuery(queryData)
      setStatus(queryData.status || "")
      setNotes("")

      // Fetch stipend data related to this query
      // Assuming stipend table has a query_id or user_id to link
      const { data: stipendData, error: stipendError } = await supabase
        .from("stipend")
        .select("*")
        .eq("query_id", params.id)
        .single()

      if (stipendError) {
        console.error("Error fetching stipend:", stipendError)
        // It's okay if no stipend found, so no return here
      } else {
        setStipend(stipendData)
        setStatus(stipendData.status || status)
        setNotes("")
      }

      // Fetch activity logs for the query
      const { data: logsData, error: logsError } = await supabase
        .from("activity_logs")
        .select("*")
        .eq("query_id", params.id)
        .order("timestamp", { ascending: false })

      if (logsError) {
        console.error("Error fetching activity logs:", logsError)
      } else {
        setActivityLogs(logsData)
      }
    }

    fetchData()
  }, [params.id])

  if (!query) {
    return <div>Loading...</div>
  }

  const fullName = `${query.first_name} ${query.surname}`

  const handleUpdateStatus = async () => {
    if (!stipend) {
      console.error("No stipend data to update")
      return
    }

    // Prepare new activity log entry
    const currentDate = new Date().toLocaleString()
    const newLogEntry = `Status updated to ${status} on ${currentDate}\nNotes: ${notes}\n`

    // Append new log entry to existing stipend_activity_log
    const updatedActivityLog = (stipend.stipend_activity_log || "") + newLogEntry

    // Update stipend table with new status, notes, and appended activity log
    const { error } = await supabase
      .from("stipend")
      .update({
        status: status,
        notes: notes,
        stipend_activity_log: updatedActivityLog,
      })
      .eq("id", stipend.id)

    if (error) {
      console.error("Error updating stipend:", error)
      return
    }

    // Update local state
    setStipend({
      ...stipend,
      status: status,
      notes: notes,
      stipend_activity_log: updatedActivityLog,
    })

    // Also update activityLogs state to include new log entry
    setActivityLogs([
      {
        id: `new-${Date.now()}`,
        action: "Status Update",
        user_email: "current.user@example.com", // Replace with actual user email if available
        details: newLogEntry,
        timestamp: new Date().toISOString(),
      },
      ...activityLogs,
    ])

    // Clear notes input
    setNotes("")
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/queries">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to queries</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Query {query.reference}</h1>
          <p className="text-muted-foreground">
            Submitted by {fullName} on {formatDate(query.created_at)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Query Details</CardTitle>
              <CardDescription>Information about the query</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Reference</p>
                  <p className="font-medium">{query.reference}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{query.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Building</p>
                  <p className="font-medium">{query.building}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Room</p>
                  <p className="font-medium">{query.room_number}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <p className="font-medium">{query.priority}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={query.status} />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Details</p>
                <div className="p-3 bg-muted rounded-md">
                  <p>{query.details}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
          <CardHeader>
            <CardTitle>Update Status</CardTitle>
            <CardDescription>Change the status of this query and add notes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <Select value={status} onValueChange={(value) => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Notes</p>
              <Textarea
                placeholder="Add notes about this status update..."
                className="min-h-[100px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" onClick={handleUpdateStatus}>Update Status</Button>
          </CardFooter>
        </Card>

        {stipend && (
          <Card>
            <CardHeader>
              <CardTitle>Stipend Information</CardTitle>
              <CardDescription>Details from the stipend table</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{stipend.first_name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Surname</p>
                  <p className="font-medium">{stipend.surname}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{stipend.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">ID Number</p>
                  <p className="font-medium">{stipend.id_number}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={stipend.status} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Query</p>
                  <div className="p-3 bg-muted rounded-md">
                    <p>{stipend.query}</p>
                  </div>
                </div>
                {stipend.notes && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <div className="p-3 bg-muted rounded-md">
                      <p>{stipend.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{query.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Building</p>
                  <p className="font-medium">{query.building}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Room</p>
                  <p className="font-medium">{query.room_number}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/users/${query.user_id}`}>View User Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent activities for this query</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex flex-col space-y-1 border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{log.action}</p>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <p className="text-xs">{new Date(log.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                    <p className="text-xs text-muted-foreground">By: {log.user_email}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
