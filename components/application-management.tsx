"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, MailIcon, PhoneIcon, UserIcon, MapPinIcon } from "lucide-react"
import { updateApplicationStatus } from "@/app/actions/applications"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Application {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  date_of_birth?: string
  address?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  emergency_contact_relation?: string
  parent_guardian_name?: string
  parent_guardian_email?: string
  previous_experience?: string
  interests?: string
  medical_info?: string
  status: string
  admin_notes?: string
  submitted_at: string
}

interface ApplicationsManagementProps {
  applications: Application[]
}

export function ApplicationsManagement({ applications }: ApplicationsManagementProps) {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [newStatus, setNewStatus] = useState("")
  const [adminNotes, setAdminNotes] = useState("")
  const [updating, setUpdating] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "contacted":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusUpdate = async () => {
    if (!selectedApp || !newStatus) return

    setUpdating(true)
    try {
      await updateApplicationStatus(selectedApp.id, newStatus, adminNotes)
      setSelectedApp(null)
      setNewStatus("")
      setAdminNotes("")
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setUpdating(false)
    }
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">No applications submitted yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <Card key={app.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  {app.first_name} {app.last_name}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1">
                    <MailIcon className="h-3 w-3" />
                    {app.email}
                  </span>
                  {app.phone && (
                    <span className="flex items-center gap-1">
                      <PhoneIcon className="h-3 w-3" />
                      {app.phone}
                    </span>
                  )}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {app.date_of_birth && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Born: {new Date(app.date_of_birth).toLocaleDateString()}</span>
                </div>
              )}
              {app.address && (
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{app.address}</span>
                </div>
              )}
              {app.previous_experience && (
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Experience: {app.previous_experience}</span>
                </div>
              )}
              <div className="text-muted-foreground">Submitted: {new Date(app.submitted_at).toLocaleDateString()}</div>
            </div>

            <div className="flex gap-2 mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedApp(app)
                      setNewStatus(app.status)
                      setAdminNotes(app.admin_notes || "")
                    }}
                  >
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      Application Details - {app.first_name} {app.last_name}
                    </DialogTitle>
                    <DialogDescription>Review and update application status</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="font-semibold mb-2">Personal Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Name:</strong> {app.first_name} {app.last_name}
                        </div>
                        <div>
                          <strong>Email:</strong> {app.email}
                        </div>
                        <div>
                          <strong>Phone:</strong> {app.phone || "Not provided"}
                        </div>
                        <div>
                          <strong>Date of Birth:</strong>{" "}
                          {app.date_of_birth ? new Date(app.date_of_birth).toLocaleDateString() : "Not provided"}
                        </div>
                        <div className="col-span-2">
                          <strong>Address:</strong> {app.address || "Not provided"}
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    {(app.emergency_contact_name || app.emergency_contact_phone) && (
                      <div>
                        <h4 className="font-semibold mb-2">Emergency Contact</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Name:</strong> {app.emergency_contact_name || "Not provided"}
                          </div>
                          <div>
                            <strong>Phone:</strong> {app.emergency_contact_phone || "Not provided"}
                          </div>
                          <div>
                            <strong>Relationship:</strong> {app.emergency_contact_relation || "Not provided"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Parent/Guardian */}
                    {(app.parent_guardian_name || app.parent_guardian_email) && (
                      <div>
                        <h4 className="font-semibold mb-2">Parent/Guardian</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Name:</strong> {app.parent_guardian_name || "Not provided"}
                          </div>
                          <div>
                            <strong>Email:</strong> {app.parent_guardian_email || "Not provided"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Scouting Information */}
                    <div>
                      <h4 className="font-semibold mb-2">Scouting Information</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Previous Experience:</strong> {app.previous_experience || "Not provided"}
                        </div>
                        {app.interests && (
                          <div>
                            <strong>Interests:</strong>
                            <p className="mt-1 text-muted-foreground">{app.interests}</p>
                          </div>
                        )}
                        {app.medical_info && (
                          <div>
                            <strong>Medical Information:</strong>
                            <p className="mt-1 text-muted-foreground">{app.medical_info}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status Update */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Update Status</h4>
                      <div className="space-y-4">
                        <Select value={newStatus} onValueChange={setNewStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea
                          placeholder="Admin notes..."
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          rows={3}
                        />
                        <Button onClick={handleStatusUpdate} disabled={updating} className="w-full">
                          {updating ? "Updating..." : "Update Status"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
