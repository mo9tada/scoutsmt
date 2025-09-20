"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, Trash2Icon } from "lucide-react"
import { removeEvent } from "@/app/actions/events"
import type { Event } from "@/lib/types"

interface EventsManagementProps {
  events: Event[]
}

export function EventsManagement({ events }: EventsManagementProps) {
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null)

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Etes Vous Sur De Supprimer Cet Evenement ?")) {
      return
    }

    setDeletingEventId(eventId)
    try {
      const result = await removeEvent(eventId)
      if (!result.success) {
        alert(result.message || "Failed to delete event")
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      alert("Failed to delete event")
    } finally {
      setDeletingEventId(null)
    }
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun Evenement Trouvé.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription className="mt-1">{event.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{new Date(event.date) > new Date() ? "à Venir" : "Réalisé"}</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                  disabled={deletingEventId === event.id}
                  className="text-red-600 hover:text-red-700"
                >
                  {deletingEventId === event.id ? (
                    "Deleting..."
                  ) : (
                    <>
                      <Trash2Icon className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
