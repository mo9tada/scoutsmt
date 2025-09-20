import { checkAdminAuth, adminLogout } from "@/app/actions/admin"
import { getEvents } from "@/app/actions/events"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AddEventForm } from "@/components/add-event-form"
import { EventsManagement } from "@/components/events-managements"

export default async function AdminDashboard() {
  const isAuthenticated = await checkAdminAuth()

  if (!isAuthenticated) {
    redirect("/admin")
  }

  const events = await getEvents()

  return (
    <div className=" px-4 py-8 bg-gray-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Interface Admin</h1>
          <p className="text-muted-foreground text-lg">Interface Evenements </p>
        </div>
        <form action={adminLogout}>
          <Button variant="outline" type="submit">
            Logout
          </Button>
        </form>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ajouter Un Evenement</CardTitle>
            <CardDescription>Creer Un Evenement</CardDescription>
          </CardHeader>
          <CardContent>
            <AddEventForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evenements En Cours</CardTitle>
            <CardDescription>Evenements Totale: {events.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                à Venir: {events.filter((e) => new Date(e.date) > new Date()).length}
              </p>
              <p className="text-sm text-muted-foreground">
                Realisé: {events.filter((e) => new Date(e.date) <= new Date()).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Management Des Evenements</CardTitle>
          </CardHeader>
          <CardContent>
            <EventsManagement events={events} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
