import type { Event } from "./types"

// In-memory storage for events (in a real app, this would be a database)
let events: Event[] = [
  
]

export function getAllEvents(): Event[] {
  return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function addEvent(event: Omit<Event, "id" | "createdAt">): Event {
  const newEvent: Event = {
    ...event,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  events.push(newEvent)
  return newEvent
}

export function deleteEvent(id: string): boolean {
  const initialLength = events.length
  events = events.filter((event) => event.id !== id)
  return events.length < initialLength
}
