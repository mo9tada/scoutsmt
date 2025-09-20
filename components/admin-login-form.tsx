"use client"

import { useActionState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, ShieldIcon } from "lucide-react"
import { adminLogin } from "../app/actions/admin"

export function AdminLoginForm() {
    const [state, formAction, isPending] = useActionState(adminLogin, null)

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-2">
                    <ShieldIcon className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Compte Admin</CardTitle>
                <CardDescription>Entrer Le Mot De Passe Admin</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot De Passe Admin</Label>
                        <Input id="password" name="password" type="password" className="border-red-800" required />
                    </div>
                    {state?.message && <p className="text-sm font-medium text-destructive">{state.message}</p>}
                </CardContent>
                <CardFooter className="p-4">
                    <Button type="submit" className="w-full bg-red-800" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Authentication...
                            </>
                        ) : (
                            "Acceder Au Dashboard"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
