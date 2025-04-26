import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockQuery = {
  id: "q1",
  user_id: "u1",
  unique_id: "QRY-001",
  name: "John Smith",
  building: "North Tower",
  room_number: "A101",
  priority: "High",
  type: "Building",
  details:
    "Water leak in bathroom. The sink pipe appears to be leaking and water is pooling on the floor. I've placed a bucket under it for now, but it needs to be fixed as soon as possible.",
  status: "Pending",
  created_at: "2023-03-15T10:30:00Z",
  updated_at: "2023-03-15T10:30:00Z",
  reference: "REF-001",
}

// Mock activity logs
const mockActivityLogs = [
  {
    id: "a1",
    action: "Query Created",
    user_email: "john.smith@example.com",
    details: "Query submitted by user",
    timestamp: "2023-03-15T10:30:00Z",
  },
  {
    id: "a2",
    action: "Status Update",
    user_email: "support@dipapa.com",
    details: "Status changed from 'New' to 'Pending'",
    timestamp: "2023-03-15T11:45:00Z",
  },
]

export default function QueryDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the query data based on the ID
  const query = mockQuery

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
          <h1 className="text-3xl font-bold tracking-tight">Query {query.unique_id}</h1>
          <p className="text-muted-foreground">
            Submitted by {query.name} on {formatDate(query.created_at)}
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
                <Select defaultValue={query.status}>
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
                <Textarea placeholder="Add notes about this status update..." className="min-h-[100px]" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Update Status</Button>
            </CardFooter>
          </Card>
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
                {mockActivityLogs.map((log) => (
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

