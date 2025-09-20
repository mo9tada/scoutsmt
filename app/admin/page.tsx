import { AdminLoginForm } from "../../components/admin-login-form"
import { checkAdminAuth } from "../actions/admin"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const isAuthenticated = await checkAdminAuth()

  if (isAuthenticated) {
    redirect("/admin/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-gray-300 p-4">
      <AdminLoginForm />
    </div>
  )
}
