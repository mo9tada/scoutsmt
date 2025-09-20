"use client"

import { useActionState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface AuthFormProps {
  type: "login" | "signup"
  action: (prevState: any, formData: FormData) => Promise<{ message: string } | void>
}

export function AuthForm({ type, action }: AuthFormProps) {
  const registerUser = async (prevState: any, formData: FormData) => {
    const payload = {
      last_name: formData.get("last_name")?.toString() || "",
      first_name: formData.get("first_name")?.toString() || "",
      father_name: formData.get("father_name")?.toString() || "",
      mother_name: formData.get("mother_name")?.toString() || "",
      cnss: formData.get("cnss")?.toString() === "Oui",
      family_status: formData.get("family_status")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      father_phone: formData.get("father_phone")?.toString() || "",
      gender: formData.get("gender")?.toString() || "",
      date_de_naissance: formData.get("date_de_naissance")?.toString() || "",
      first_time_scout: formData.get("first_time_scout")?.toString() === "Oui",
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    return { message: data.message }
  }

  const [state, formAction, isPending] = useActionState(registerUser, null)

  const title = "Formulaire"
  const description = "Entrer les données pour s'inscrire"
  const submitButtonText = "S'inscrire"

  return (
    <div className="w-full h-full relative flex items-center justify-center p-4 bg-gray-300">
      {/* Background */}
      <div
        className="absolute inset-0 top-0 bottom-0 bg-no-repeat opacity-70 z-0"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />
      {/* Form Card */}
      <div className="w-full relative z-20">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-red-800">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>

          <form action={formAction}>
            <CardContent className="grid gap-4">

              <div className="grid gap-2 p-2">
                <Label htmlFor="last_name">Nom:</Label>
                <Input id="last_name" name="last_name" type="text" placeholder="Nom" className="border-red-800" required />
              </div>

              <div className="grid gap-2 p-2">
                <Label htmlFor="first_name">Prénom:</Label>
                <Input id="first_name" name="first_name" type="text" placeholder="Prénom" className="border-red-800" required />
              </div>

              <div className="grid gap-2 p-2">
                <Label htmlFor="father_name">Nom du Père:</Label>
                <Input id="father_name" name="father_name" type="text" placeholder="Nom du Père" className="border-red-800" required />
              </div>

              <div className="grid gap-2 p-2">
                <Label htmlFor="mother_name">Nom de la Mère:</Label>
                <Input id="mother_name" name="mother_name" type="text" placeholder="Nom de la Mère" className="border-red-800" required />
              </div>

              <div className="grid gap-2 p-2">
                <Label>Avez-vous le CNSS:</Label>
                <div className="flex gap-2">
                  <input id="cnssOui" name="cnss" type="radio" value="Oui" className="border-red-800" />
                  <Label htmlFor="cnssOui">Oui</Label>

                  <input id="cnssNon" name="cnss" type="radio" value="Non" className="border-red-800" />
                  <Label htmlFor="cnssNon">Non</Label>
                </div>
              </div>

              <div className="grid gap-2 p-2">
                <Label>Situation Familiale:</Label>
                <div className="flex gap-2">
                  <input id="maried" name="family_status" type="radio" value="maried" className="border-red-800" />
                  <Label htmlFor="maried">Mariés</Label>

                  <input id="divorced" name="family_status" type="radio" value="divorced" className="border-red-800" />
                  <Label htmlFor="divorced">Divorcés</Label>

                  <input id="dead" name="family_status" type="radio" value="dead" className="border-red-800" />
                  <Label htmlFor="dead">Décédés</Label>
                </div>
              </div>

              <div className="grid gap-2 p-2">
                <Label htmlFor="email">Email:</Label>
                <Input id="email" name="email" placeholder="Tapez votre Email" type="email" className="border-red-800" required />
              </div>

              <div className="grid gap-2 p-2">
                <Label htmlFor="phone">Numéro de votre Téléphone:</Label>
                <Input id="phone" name="phone" placeholder="Tapez votre Numéro" type="text" className="border-red-800" required />
              </div>

              <div className="grid gap-2 p-2">
                <Label htmlFor="father_phone">Numéro de Téléphone du Parent:</Label>
                <Input id="father_phone" name="father_phone" placeholder="Tapez le Numéro du Parent" type="text" className="border-red-800" required />
              </div>

              <div className="grid gap-2 p-2">
                <Label>Genre:</Label>
                <div className="flex gap-2">
                  <input id="Homme" name="gender" type="radio" value="Homme" className="border-red-800" />
                  <Label htmlFor="Homme">Homme</Label>

                  <input id="Femme" name="gender" type="radio" value="Femme" className="border-red-800" />
                  <Label htmlFor="Femme">Femme</Label>
                </div>
              </div>

              <div className="grid gap-2 p-2">
                <Label htmlFor="date_de_naissance">Date De Naissance:</Label>
                <Input id="date_de_naissance" name="date_de_naissance" type="date" required />
              </div>

              <div className="grid gap-2 p-2">
                <Label>Première Fois Chez Les Scouts:</Label>
                <div className="flex gap-2">
                  <input id="firstTimeOui" name="first_time_scout" type="radio" value="Oui" className="border-red-800" />
                  <Label htmlFor="firstTimeOui">Oui</Label>

                  <input id="firstTimeNon" name="first_time_scout" type="radio" value="Non" className="border-red-800" />
                  <Label htmlFor="firstTimeNon">Non</Label>
                </div>
              </div>

              {state?.message && (
                <p className="text-sm font-medium text-destructive">{state.message}</p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-red-800" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Attendez...
                  </>
                ) : (
                  submitButtonText
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
