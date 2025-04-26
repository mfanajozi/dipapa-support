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

export default function NewNewsPage() {
  const [loading, setLoading] = useState(false)

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
          <Link href="/content/news">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to news</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add News Article</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>News Article Details</CardTitle>
            <CardDescription>Create a new building news article</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter article title" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="Building News">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Building News">Building News</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
            </div>

            <div className="space-y-2">
              <Label htmlFor="article">Article Content</Label>
              <Textarea id="article" placeholder="Enter article content" className="min-h-[200px]" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/content/news">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Publishing..." : "Publish Article"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

