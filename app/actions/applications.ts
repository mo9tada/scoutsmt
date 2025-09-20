"use server"

import { createServerClient } from "../../lib/supabaseClient"
import { revalidatePath } from "next/cache"

export async function submitApplication(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const dateOfBirth = formData.get("dateOfBirth") as string
  const address = formData.get("address") as string
  const emergencyContactName = formData.get("emergencyContactName") as string
  const emergencyContactPhone = formData.get("emergencyContactPhone") as string
  const emergencyContactRelation = formData.get("emergencyContactRelation") as string
  const parentGuardianName = formData.get("parentGuardianName") as string
  const parentGuardianEmail = formData.get("parentGuardianEmail") as string
  const previousExperience = formData.get("previousExperience") as string
  const interests = formData.get("interests") as string
  const medicalInfo = formData.get("medicalInfo") as string

  // Basic validation
  if (!firstName || !lastName || !email) {
    return { message: "First name, last name, and email are required." }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { message: "Please enter a valid email address." }
  }

  const supabase = createServerClient()

  try {
    // Check if email already exists
    const { data: existingApplication } = await supabase.from("applications").select("id").eq("email", email).single()

    if (existingApplication) {
      return { message: "An application with this email address already exists." }
    }

    // Insert the application
    const { error } = await supabase.from("applications").insert({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone || null,
      date_of_birth: dateOfBirth || null,
      address: address || null,
      emergency_contact_name: emergencyContactName || null,
      emergency_contact_phone: emergencyContactPhone || null,
      emergency_contact_relation: emergencyContactRelation || null,
      parent_guardian_name: parentGuardianName || null,
      parent_guardian_email: parentGuardianEmail || null,
      previous_experience: previousExperience || null,
      interests: interests || null,
      medical_info: medicalInfo || null,
      status: "pending",
    })

    if (error) {
      console.error("Application submission error:", error)
      return { message: "Failed to submit application. Please try again." }
    }

    // Revalidate admin dashboard to show new application
    revalidatePath("/admin/dashboard")

    return {
      message: "Application submitted successfully!",
      success: true,
    }
  } catch (error) {
    console.error("Application submission error:", error)
    return { message: "An unexpected error occurred. Please try again." }
  }
}

export async function getApplications() {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("applications").select("*").order("submitted_at", { ascending: false })

    if (error) {
      console.error("Error fetching applications:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching applications:", error)
    return []
  }
}

export async function updateApplicationStatus(applicationId: string, status: string, adminNotes?: string) {
  const supabase = createServerClient()

  try {
    const { error } = await supabase
      .from("applications")
      .update({
        status,
        admin_notes: adminNotes || null,
        reviewed_at: new Date().toISOString(),
        // In a real app, you'd get the current admin user ID
        // reviewed_by: getCurrentAdminId()
      })
      .eq("id", applicationId)

    if (error) {
      console.error("Error updating application:", error)
      return { success: false, message: "Failed to update application status." }
    }

    revalidatePath("/admin/dashboard")
    return { success: true, message: "Application status updated successfully." }
  } catch (error) {
    console.error("Error updating application:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
