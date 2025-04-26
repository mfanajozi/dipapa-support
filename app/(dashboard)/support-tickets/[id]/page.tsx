'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

interface SupportTicket {
  full_name: string;
  email: string;
  id_number?: string;
  status: string;
  support_details: string;
}

export default function SupportTicketDetailsPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [status, setStatus] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const { data, error } = await supabase
          .from('support')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setTicket(data);
        setStatus(data.status);
        setNotes(data.notes || "");
      } catch (error: any) {
        console.error("Error fetching support ticket:", error.message);
      }
    };

    fetchTicket();
  }, [params.id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const { data, error } = await supabase
        .from('support')
        .update({ status: newStatus })
        .eq('id', params.id);

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

  const handleSaveNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('support')
        .update({ notes: notes })
        .eq('id', params.id);

      if (error) {
        throw new Error(error.message);
      }

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

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Query Details</h1>
        <p className="text-muted-foreground">Information about the stipend query</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <p className="font-medium">{ticket.full_name}</p>
        </div>
        <div>
          <Label>Email</Label>
          <p className="font-medium">{ticket.email}</p>
        </div>
        <div>
          <Label>ID Number</Label>
          <p className="font-medium">{ticket.id_number || "N/A"}</p>
        </div>
        <div>
          <Label>Status</Label>
          <p className="font-medium">{ticket.status}</p>
        </div>
      </div>

      <div>
        <Label>Query</Label>
        <p className="font-medium">{ticket.support_details}</p>
      </div>

      <div>
        <h2>Update Status</h2>
        <p className="text-muted-foreground">Change the status of this stipend query and add notes</p>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
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
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this status update..."
            />
          </div>
        </div>

        <Button onClick={handleSaveNotes}>Update Status</Button>
      </div>
    </div>
  );
}
