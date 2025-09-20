"use server"

import { revalidatePath } from "next/cache"
import { getAllEventsFromDB, addEventToDB, deleteEventFromDB } from "@/lib/supabase-events"
import { checkAdminAuth } from "./admin"

export async function getEvents() {
  return getAllEventsFromDB()
}

export async function createEvent(prevState: any, formData: FormData) {
  // Check admin authentication
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    return { message: "Unauthorized. Please log in as admin." }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const date = formData.get("date") as string
  const location = formData.get("location") as string

  // Validation
  if (!title || !description || !date || !location) {
    return { message: "All fields are required." }
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) {
    return { message: "Please enter a valid date." }
  }

  try {
    const newEvent = await addEventToDB({ title, description, date, location })

    if (!newEvent) {
      return { message: "Erreur De Creation D'Evenement." }
    }

    // Revalidate both admin and user pages
    revalidatePath("/events")
    revalidatePath("/admin/dashboard")

    return { message: "Event created successfully!", success: true }
  } catch (error) {
    console.error("Error creating event:", error)
    return { message: "Failed to create event. Please try again." }
  }
}

export async function removeEvent(eventId: string) {
  // Check admin authentication
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    throw new Error("Unauthorized")
  }

  try {
    const success = await deleteEventFromDB(eventId)

    if (success) {
      // Revalidate both admin and user pages
      revalidatePath("/events")
      revalidatePath("/admin/dashboard")
      return { success: true }
    } else {
      return { success: false, message: "Event not found." }
    }
  } catch (error) {
    console.error("Error deleting event:", error)
    return { success: false, message: "Failed to delete event." }
  }
}
