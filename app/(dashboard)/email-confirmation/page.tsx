'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

export default function EmailConfirmationPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendConfirmationEmail = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Success!',
          description: data.message || 'Confirmation email sent successfully.',
        })
      } else {
        toast({
          title: 'Error!',
          description: data.error || 'Failed to send confirmation email.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      toast({
        title: 'Error!',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Email Confirmation</h1>
        <p className="text-muted-foreground">Send a confirmation email to a user.</p>
      </div>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Send Confirmation Email</CardTitle>
          <CardDescription>Enter the user's email address to send a new confirmation link.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button
            onClick={handleSendConfirmationEmail}
            disabled={loading || !email}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Send Confirmation Email'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 