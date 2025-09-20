"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_PASSWORD = "admin123" // In a real app, this would be hashed and stored securely
const ADMIN_SESSION_COOKIE = "admin_session"
const SESSION_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export async function adminLogin(prevState: any, formData: FormData) {
  const password = formData.get("password") as string

  if (!password) {
    return { message: "Password is required." }
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (password === ADMIN_PASSWORD) {
    // Create admin session
    const expiresAt = Date.now() + SESSION_DURATION
    const cookieStore = await cookies()
    cookieStore.set(
      ADMIN_SESSION_COOKIE,
      JSON.stringify({
        isAuthenticated: true,
        expiresAt,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_DURATION / 1000,
        path: "/",
      },
    )

    redirect("/admin/dashboard")
  } else {
    return { message: "Invalid password." }
  }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
  redirect("/admin")
}

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)

  if (!sessionCookie) {
    return false
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    return session.isAuthenticated && Date.now() < session.expiresAt
  } catch {
    return false
  }
}
