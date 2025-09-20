"use client"

import { useActionState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, UserPlus, CheckCircle } from "lucide-react"

interface SignupFormProps {
  action: (prevState: any, formData: FormData) => Promise<{ message: string; success?: boolean } | void>
}

export function SignupForm({ action }: SignupFormProps) {
  const [state, formAction, isPending] = useActionState(action, null)

  // If successfully submitted, show success message
  if (state?.success) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-600" />
          <h2 className="text-2xl font-bold text-green-800">Application Submitted!</h2>
          <p className="text-muted-foreground max-w-md">
            Thank you for your interest in joining our scouting program. We've received your application and will
            contact you soon with next steps.
          </p>
          <Button asChild className="mt-4">
            <a href="/">Return to Home</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <UserPlus className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold">Join Our Scouting Program</CardTitle>
        <CardDescription className="text-lg">
          Fill out this application to start your scouting journey with us
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" name="firstName" placeholder="John" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" name="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" name="dateOfBirth" type="date" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" placeholder="123 Main St, City, State, ZIP" />
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="emergencyContactName">Contact Name</Label>
                <Input id="emergencyContactName" name="emergencyContactName" placeholder="Jane Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  type="tel"
                  placeholder="(555) 987-6543"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emergencyContactRelation">Relationship</Label>
              <Select name="emergencyContactRelation">
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="guardian">Guardian</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Parent/Guardian Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Parent/Guardian Information (if under 18)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="parentGuardianName">Parent/Guardian Name</Label>
                <Input id="parentGuardianName" name="parentGuardianName" placeholder="Parent or Guardian Name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="parentGuardianEmail">Parent/Guardian Email</Label>
                <Input
                  id="parentGuardianEmail"
                  name="parentGuardianEmail"
                  type="email"
                  placeholder="parent@example.com"
                />
              </div>
            </div>
          </div>

          {/* Scouting Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Scouting Information</h3>
            <div className="grid gap-2">
              <Label htmlFor="previousExperience">Previous Scouting Experience</Label>
              <Select name="previousExperience">
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No previous experience</SelectItem>
                  <SelectItem value="cub-scout">Cub Scout</SelectItem>
                  <SelectItem value="boy-scout">Boy Scout</SelectItem>
                  <SelectItem value="girl-scout">Girl Scout</SelectItem>
                  <SelectItem value="venture-scout">Venture Scout</SelectItem>
                  <SelectItem value="other">Other scouting organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interests">Areas of Interest</Label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="Tell us about your interests (camping, hiking, community service, leadership, etc.)"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="medicalInfo">Medical Information / Allergies</Label>
              <Textarea
                id="medicalInfo"
                name="medicalInfo"
                placeholder="Please list any medical conditions, allergies, or medications we should be aware of"
                rows={3}
              />
            </div>
          </div>

          {state?.message && !state?.success && (
            <div className="p-4 rounded-md bg-red-50 text-red-800 border border-red-200">
              <p className="text-sm font-medium">{state.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Submit Application
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By submitting this application, you agree to our terms of service and privacy policy.
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
