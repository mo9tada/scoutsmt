"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createHmac, timingSafeEqual } from "crypto"

// Credentials live in environment variables, never in source control.
// See .env.example.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET
const ADMIN_SESSION_COOKIE = "admin_session"
const SESSION_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export async function adminLogin(prevState: any, formData: FormData) {
  const password = formData.get("password") as string

  if (!password) {
    return { message: "Password is required." }
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!ADMIN_PASSWORD || !SESSION_SECRET) {
    console.error("ADMIN_PASSWORD and ADMIN_SESSION_SECRET must be set")
    return { message: "Admin login is not configured." }
  }

  if (safeEqual(password, ADMIN_PASSWORD)) {
    // Create admin session
    const expiresAt = Date.now() + SESSION_DURATION
    const cookieStore = await cookies()
    cookieStore.set(
      ADMIN_SESSION_COOKIE,
      signSession(expiresAt),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
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

  return verifySession(sessionCookie.value)
}

// The session cookie is "<expiresAt>.<HMAC-SHA256 signature>", so it cannot be
// forged or extended without knowing ADMIN_SESSION_SECRET.
function sign(value: string): string {
  return createHmac("sha256", SESSION_SECRET as string).update(value).digest("base64url")
}

function signSession(expiresAt: number): string {
  const payload = String(expiresAt)
  return `${payload}.${sign(payload)}`
}

function verifySession(cookieValue: string): boolean {
  if (!SESSION_SECRET) return false
  const [payload, signature] = cookieValue.split(".")
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false
  return Date.now() < Number(payload)
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}
