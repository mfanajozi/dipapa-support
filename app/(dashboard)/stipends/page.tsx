'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

const columns = [
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
    accessorKey: "id_number",
    header: "ID Number",
  },
  {
    accessorKey: "query",
    header: "Query",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const stipend = row.original;
      const [status, setStatus] = useState(stipend.status);

      const handleStatusChange = async (newStatus: string) => {
        try {
          const now = new Date().toLocaleString();
          const newNotes = `Status updated to ${newStatus} on ${now}\n\n`;

          const { data, error } = await supabase
            .from('stipend')
            .update({ status: newStatus, notes: newNotes + (stipend.notes || "") })
            .eq('id', stipend.id);

          if (error) {
            throw new Error(error.message);
          }

          setStatus(newStatus);
          toast({
            title: "Status updated.",
            description: "The status has been updated successfully.",
          });
        } catch (error: any) {
          console.error("Error updating status:", error.message);
          toast({
            title: "Error updating status.",
            description: "Something went wrong while updating the status.",
          });
        }
      };

      return (
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "notes",
    header: "Notes",
    cell: ({ row }: any) => {
      const stipend = row.original;
      const [open, setOpen] = useState(false);
      const [notes, setNotes] = useState(stipend.notes || "");
      const stipendId = stipend.id;

      const handleSaveNotes = async () => {
        try {
          const { data, error } = await supabase
            .from('stipend')
            .update({ notes: notes })
            .eq('id', stipendId);

          if (error) {
            throw new Error(error.message);
          }

          setOpen(false);
          toast({
            title: "Notes saved.",
            description: "Your notes have been saved successfully.",
          });
        } catch (error: any) {
          console.error("Error saving notes:", error.message);
          toast({
            title: "Error saving notes.",
            description: "Something went wrong while saving your notes.",
          });
        }
      };

      return (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              View Notes
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Notes</AlertDialogTitle>
              <AlertDialogDescription>
                Add or view notes for this stipend.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type your notes here."
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSaveNotes}>Save</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const stipend = row.original

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/stipends/${stipend.id}`}>View</Link>
          </Button>
        </div>
      )
    },
  },
]

export default function StipendPage() {
  const [stipends, setStipends] = useState<any[]>([]);

  useEffect(() => {
    const fetchStipends = async () => {
      try {
        const { data, error } = await supabase
          .from('stipend')
          .select('*');

        if (error) {
          throw new Error(error.message);
        }

        setStipends(data);
      } catch (error: any) {
        console.error("Error fetching stipends:", error.message);
      }
    };

    fetchStipends();
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Stipend</h1>
        <p className="text-muted-foreground">Manage stipend records.</p>
      </div>
      <DataTable columns={columns} data={stipends} searchKey="id_number" searchPlaceholder="Search by ID Number..." />
    </div>
  )
}
