'use client'
import { useEffect, useState } from "react"
import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

interface Query {
  reference: string;
  first_name: string;
  surname: string;
  email: string;
  location: string;
  building: string;
  room_number: string;
  type: string;
  priority: string;
  details: string;
  status: string;
  notes: string;
  id: string;
}

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"


const columns = [
  {
    accessorKey: "reference",
    header: "Reference",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "surname",
    header: "Surname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "building",
    header: "Building",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "room_number",
    header: "Room Number",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "details",
    header: "Details",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const query = row.original;
      const [status, setStatus] = useState(query.status || "");
      const [note, setNote] = useState(query.notes || "");

      const handleStatusChange = async (e: any) => {
        setStatus(e.target.value);
      };

      const handleStatusSave = async () => {
        const { supabase } = await import('@/lib/supabase/client')

        // Get current date and format it
        const currentDate = new Date().toLocaleString();

        // Check if notes are empty
        if (!note || note.trim() === "") {
          alert("Please add or update notes before changing the status.");
          setStatus(query.status); // Revert to original status
          return;
        }

        // Add date to notes
        const updatedNotes = `${note}\nStatus updated on: ${currentDate}`;

        const { data, error } = await supabase
          .from('queries')
          .update({ status: status, notes: updatedNotes })
          .eq('id', query.id);

        if (error) {
          console.error('Error updating status:', error);
          setStatus(query.status); // Revert to original status
        }
      };

      return (
        <div>
          <select value={status} onChange={handleStatusChange} onBlur={handleStatusSave}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }: any) => {
      const query = row.original;
      const [note, setNote] = useState(query.notes || "");

      const handleNoteChange = async (e: any) => {
        setNote(e.target.value);
      };

      const handleNoteSave = async () => {
        const { supabase } = await import('@/lib/supabase/client')

        // Get current date and format it
        const currentDate = new Date().toLocaleString();

        // Add date to notes
        const updatedNotes = `${note}\nNote added on: ${currentDate}`;

        const { data, error } = await supabase
          .from('queries')
          .update({ notes: updatedNotes })
          .eq('id', query.id);

        if (error) {
          console.error('Error updating notes:', error);
        }
      };

      return (
        <div>
          <textarea
            placeholder="Add a note..."
            value={note}
            onChange={handleNoteChange}
          />
          <Button size="sm" onClick={handleNoteSave}>Add Note</Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const query = row.original;

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/queries/${query.id}`}>View</Link>
          </Button>
        </div>
      );
    },
  },
];

function QueriesTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="rounded-md border">
        <div className="h-12 border-b px-4 bg-muted/50" />
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center h-16 px-4 border-b last:border-0">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-64 ml-4" />
              <Skeleton className="h-4 w-32 ml-4" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
      const fetchQueries = async () => {
        const { supabase } = await import('@/lib/supabase/client')

        const { data, error } = await supabase
          .from('queries')
          .select('id, reference, first_name, surname, email, location, building, room_number, type, priority, details, status, notes');

        if (error) {
          console.error('Error fetching queries:', error);
          return;
        }

        console.log('Fetched queries:', data);
        setQueries(data || []);
      };

    fetchQueries();
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Queries</h1>
        <p className="text-muted-foreground">Manage queries and feedback.</p>
      </div>

      <Suspense fallback={<QueriesTableSkeleton />}>
        <DataTable columns={columns} data={queries} searchPlaceholder="Search by title..." />
      </Suspense>
    </div>
  )
}
