
"use client"

import { useEffect, useState, ChangeEvent } from "react"
import { Dialog } from "@headlessui/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase/client"

interface Ticket {
  id: string
  first_name: string
  surname: string
  email: string
  training_centre: string
  type: string
  status: string
  date: string
  notes: string | null
  support_email: string | null
}

export default function TrainingCentresPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [note, setNote] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const fetchUserEmail = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserEmail(user?.email || "")
    }
    fetchUserEmail()
  }, [])

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("training_centres")
        .select("id, first_name, surname, email, training_centre, type, status, date, notes, support_email")
        .not("email", "is", null)
        .neq("email", "")

      if (error) {
        console.error("Error fetching training centre tickets:", error)
      } else {
        setTickets(data || [])
      }
      setLoading(false)
    }
    fetchTickets()
  }, [])

  const openModal = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setNote(ticket.notes || "")
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedTicket(null)
    setNote("")
  }

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value)
  }

  const handleUpdate = async () => {
    if (!selectedTicket) return

    const updatedNotes = note.trim()
    if (updatedNotes.length === 0) {
      alert("Please enter a note before updating.")
      return
    }

    // Enforce note entry if status changed compared to original ticket status
    const originalTicket = tickets.find(t => t.id === selectedTicket.id)
    if (originalTicket && selectedTicket.status !== originalTicket.status) {
      if (updatedNotes.length === 0) {
        alert("Please add a note when changing the status.")
        return
      }
    }

    // Append new note with timestamp to existing notes
    const timestamp = new Date().toLocaleString()
    const combinedNotes = selectedTicket.notes
      ? `${selectedTicket.notes}\n[${timestamp}] ${updatedNotes}`
      : `[${timestamp}] ${updatedNotes}`

    // Ensure status is updated from the latest selectedTicket state
    const updatedStatus = selectedTicket.status

    const { data, error } = await supabase
      .from("training_centres")
      .update({ notes: combinedNotes, support_email: userEmail, status: updatedStatus })
      .eq("id", selectedTicket.id)

    if (error) {
      console.error("Error updating ticket:", error)
      alert("Failed to update ticket. Please try again.")
    } else {
      // Update local state
      setTickets((prev) =>
        prev.map((t) =>
          t.id === selectedTicket.id
            ? { ...t, notes: combinedNotes, support_email: userEmail, status: updatedStatus }
            : t
        )
      )
      closeModal()
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Training Centres - Queries Reported</h1>

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No queries reported.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Surname</th>
              <th className="border border-gray-300 p-2 text-left">Student Email</th>
              <th className="border border-gray-300 p-2 text-left">Centre</th>
              <th className="border border-gray-300 p-2 text-left">Type of Query</th>
              <th className="border border-gray-300 p-2 text-left">Query Status</th>
              <th className="border border-gray-300 p-2 text-left">Date Submitted</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{ticket.first_name}</td>
                <td className="border border-gray-300 p-2">{ticket.surname}</td>
                <td className="border border-gray-300 p-2">{ticket.email}</td>
                <td className="border border-gray-300 p-2">{ticket.training_centre}</td>
                <td className="border border-gray-300 p-2">{ticket.type}</td>
                <td className="border border-gray-300 p-2">{ticket.status}</td>
                <td className="border border-gray-300 p-2">{ticket.date}</td>
                <td className="border border-gray-300 p-2">
                  <Button size="sm" onClick={() => openModal(ticket)}>
                    Update Ticket
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Dialog open={modalOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Dialog.Panel className="bg-white rounded-md p-6 w-full max-w-lg max-h-[90vh] overflow-auto mx-2 sm:mx-auto">
          <Dialog.Title className="text-xl font-semibold mb-4">Update Ticket</Dialog.Title>
          {selectedTicket && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdate()
              }}
              className="space-y-4"
            >
              <div>
                <label className="block font-medium">Name</label>
                <Input value={selectedTicket.first_name} readOnly />
              </div>
              <div>
                <label className="block font-medium">Surname</label>
                <Input value={selectedTicket.surname} readOnly />
              </div>
              <div>
                <label className="block font-medium">Student Email</label>
                <Input value={selectedTicket.email} readOnly />
              </div>
              <div>
                <label className="block font-medium">Centre</label>
                <Input value={selectedTicket.training_centre} readOnly />
              </div>
              <div>
                <label className="block font-medium">Type of Query</label>
                <select
                  value={selectedTicket.type}
                  onChange={(e) => {
                    if (selectedTicket) {
                      setSelectedTicket({ ...selectedTicket, type: e.target.value })
                    }
                  }}
                  className="w-full rounded-md border border-gray-300 px-2 py-1"
                >
                  <option value="Lectures">Lectures</option>
                  <option value="Centre Maintenance">Centre Maintenance</option>
                  <option value="General">General</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Query Status</label>
                <select
                  value={selectedTicket.status}
                  onChange={(e) => {
                    if (selectedTicket) {
                      setSelectedTicket({ ...selectedTicket, status: e.target.value })
                    }
                  }}
                  className="w-full rounded-md border border-gray-300 px-2 py-1"
                >
                  <option value="NEW">NEW</option>
                  <option value="PENDING">PENDING</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Date Submitted</label>
                <Input value={selectedTicket.date} readOnly />
              </div>
              <div>
                <label className="block font-medium">Note</label>
                <Textarea
                  value={note}
                  onChange={handleNoteChange}
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
