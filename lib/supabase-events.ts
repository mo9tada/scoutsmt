import { createServerClient } from "./supabaseClient"
import type { Event } from "./types"

export async function getAllEventsFromDB(): Promise<Event[]> {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })

    if (error) {
      console.error("Error fetching events:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

export async function addEventToDB(event: Omit<Event, "id" | "created_at">): Promise<Event | null> {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating event:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error creating event:", error)
    return null
  }
}

export async function deleteEventFromDB(eventId: string): Promise<boolean> {
  const supabase = createServerClient()

  try {
    const { error } = await supabase.from("events").delete().eq("id", eventId)

    if (error) {
      console.error("Error deleting event:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error deleting event:", error)
    return false
  }
}
