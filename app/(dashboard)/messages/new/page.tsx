"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function NewMessagePage() {
  const [loading, setLoading] = useState(false)
  const [messageText, setMessageText] = useState("")
  const maxLength = 300

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // Redirect would happen here
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/messages">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to messages</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Message</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
            <CardDescription>Create a new message for users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter message title" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user_group">User Group</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Students">All Students</SelectItem>
                    <SelectItem value="Location">Location</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="message">Message</Label>
                <span className="text-xs text-muted-foreground">
                  {messageText.length}/{maxLength} characters
                </span>
              </div>
              <Textarea
                id="message"
                placeholder="Enter message content"
                className="min-h-[100px]"
                maxLength={maxLength}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/messages">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

