'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"

const columns = [
  {
    accessorKey: "from_who",
    header: "From",
  },
  {
    accessorKey: "user_group", 
    header: "Group",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const message = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/messages/${message.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log('Fetching messages from Supabase...')
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('date', { ascending: false })

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }

        console.log('Messages data received:', data)
        setMessages(data || [])
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-6 pb-8 px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Manage your messages.</p>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Manage your messages.</p>
      </div>

      <div className="flex justify-between">
        <Button asChild>
          <Link href="/messages/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Message
          </Link>
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={messages} 
        searchKey="title" 
        searchPlaceholder="Search by title..." 
      />
    </div>
  )
}
