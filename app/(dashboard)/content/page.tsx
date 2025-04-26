import Link from "next/link"
import { FileText, Calendar, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContentPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground">Create and manage content for users.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>News</CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Create and manage building news articles</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Share important updates and announcements with users about building-related matters.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/content/news">
                Manage News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Resources</CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Create and manage wellness resources</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Provide helpful resources and information to support users' wellbeing and personal development.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/content/resources">
                Manage Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Events</CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Create and manage events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Organize and promote upcoming events, workshops, and activities for users to participate in.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/content/events">
                Manage Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

