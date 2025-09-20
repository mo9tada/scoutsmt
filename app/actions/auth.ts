"use server"

import { redirect } from "next/navigation"

export async function signup(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Basic validation
  if (!name || !email || !password) {
    return { message: "All fields are required." }
  }

  if (password.length < 6) {
    return { message: "Password must be at least 6 characters." }
  }

  console.log("Signup attempt:", { name, email, password })

  // In a real application, you would:
  // 1. Hash the password
  // 2. Store the user in a database
  // 3. Create a session (e.g., using cookies or an auth library)

  // Simulate successful signup
  console.log("User signed up successfully!")
  redirect("/dashboard") // Redirect to dashboard on success
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Basic validation
  if (!email || !password) {
    return { message: "Email and password are required." }
  }

  console.log("Login attempt:", { email, password })

  // In a real application, you would:
  // 1. Verify user credentials against a database
  // 2. Create a session (e.g., using cookies or an auth library)

  // Simulate successful login for 'user@example.com' with 'password123'
  if (email === "user@example.com" && password === "password123") {
    console.log("User logged in successfully!")
    redirect("/dashboard") // Redirect to dashboard on success
  } else {
    return { message: "Invalid email or password." }
  }
}
