"use server"

// Server-side utility functions
export async function formatTimeServer(time: string) {
  // In Next.js 14, server actions should return a value or throw an error
  try {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch (error) {
    console.error("Error formatting time:", error)
    return time // Return original time if formatting fails
  }
}

