import { AuthForm } from "../../components/auth-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="signup" />
    </div>
  )
}
