import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/utils"

// Mock data - would normally be fetched from your database
const mockStipend = {
  id: "s1",
  first_name: "John",
  surname: "Smith",
  email: "john.smith@example.com",
  id_number: "9001015012087",
  query:
    "Request for stipend payment for March. I haven't received my stipend for this month yet and it's already the 15th. Please advise on when I can expect the payment.",
  status: "Pending",
  notes: "",
  updated_at: "2023-03-15T10:30:00Z",
}

// Mock activity logs
const mockActivityLogs = [
  {
    id: "a1",
    action: "Query Created",
    user_email: "john.smith@example.com",
    details: "Stipend query submitted by user",
    timestamp: "2023-03-15T10:30:00Z",
  },
]

export default function StipendDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the stipend data based on the ID
  const stipend = mockStipend
  const fullName = `${stipend.first_name} ${stipend.surname}`

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/stipends">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to stipends</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stipend Query</h1>
          <p className="text-muted-foreground">
            Submitted by {fullName} on {formatDate(stipend.updated_at)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Query Details</CardTitle>
              <CardDescription>Information about the stipend query</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{fullName}</p>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
              <CardDescription>Change the status of this stipend query and add notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Status</p>
                <Select defaultValue={stipend.status}>
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
                  <p className="font-medium">{fullName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{stipend.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">ID Number</p>
                  <p className="font-medium">{stipend.id_number}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Find User Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent activities for this stipend query</CardDescription>
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

