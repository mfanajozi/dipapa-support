'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for visitors
const mockVisitors = [
  {
    id: "v1",
    name: "John Doe",
    purpose: "Meeting",
    date: "2025-03-28",
  },
  {
    id: "v2",
    name: "Jane Smith",
    purpose: "Delivery",
    date: "2025-03-27",
  },
  {
    id: "v3",
    name: "Michael Brown",
    purpose: "Interview",
    date: "2025-03-26",
  },
  {
    id: "v4",
    name: "Sarah Johnson",
    purpose: "Consultation",
    date: "2025-03-25",
  },
  {
    id: "v5",
    name: "David Wilson",
    purpose: "Event",
    date: "2025-03-24",
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Visitor Name",
  },
  {
    accessorKey: "purpose",
    header: "Purpose of Visit",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const visitor = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/visitors/${visitor.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

export default function VisitorsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Visitors</h1>
        <p className="text-muted-foreground">Manage visitor records.</p>
      </div>

      <div className="flex justify-between">
        <Button asChild>
          <Link href="/visitors/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Visitor
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={mockVisitors} searchKey="name" searchPlaceholder="Search by name..." />
    </div>
  )
}
