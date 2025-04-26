import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// Client-safe version of formatTime
export function formatTimeClient(time: string) {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

export function getStatusColor(status: string) {
  const statusMap: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    closed: "bg-gray-100 text-gray-800",
    generated: "bg-purple-100 text-purple-800",
    used: "bg-green-100 text-green-800",
    expired: "bg-gray-100 text-gray-800",
  }

  return statusMap[status.toLowerCase()] || "bg-gray-100 text-gray-800"
}

export function getInitials(name: string) {
  if (!name) return ""
  const names = name.split(" ")
  if (names.length === 1) return names[0].charAt(0).toUpperCase()
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

