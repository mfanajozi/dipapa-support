'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

const columns = [
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "support_category",
    header: "Category",
  },
  {
    accessorKey: "support_details",
    header: "Details",
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const ticket = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/support-tickets/${ticket.id}`}>
              View
            </Link>
          </Button>
        </div>
      )
    },
  },
]

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data, error } = await supabase
          .from('support')
          .select('*');

        if (error) {
          throw new Error(error.message);
        }

        setTickets(data);
      } catch (error: any) {
        console.error("Error fetching support tickets:", error.message);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
        <p className="text-muted-foreground">Manage support tickets.</p>
      </div>
      <DataTable columns={columns} data={tickets} searchKey="full_name" searchPlaceholder="Search by Full Name..." />
    </div>
  )
}
