"use client"

import { useActionState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { createEvent } from "@/app/actions/events"
import { useEffect } from "react"

export function AddEventForm() {
    const [state, formAction, isPending] = useActionState(createEvent, null)

    // Reset form on successful submission
    useEffect(() => {
        if (state?.success) {
            const form = document.getElementById("add-event-form") as HTMLFormElement
            form?.reset()
        }
    }, [state?.success])

    return (
        <form id="add-event-form" action={formAction} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="title">Nom D'Evenement</Label>
                <Input id="title" name="title" placeholder="Entrer Le Nom De L'Evenement" className="border-red-800" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Entrer La Description De L'evenement" className="border-red-800" rows={3} required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="location">Localisation</Label>
                <Input id="location" name="location" placeholder="Entrer La Localisation De L'Evenement" className="border-red-800" required />
            </div>

            {state?.message && (
                <p className={`text-sm font-medium ${state.success ? "text-green-600" : "text-destructive"}`}>
                    {state.message}
                </p>
            )}

            <Button type="submit" className="w-full bg-red-800 hover:bg-white hover:text-black " disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creation D'Evenement...
                    </>
                ) : (
                    "Creer Evenement"
                )}
            </Button>
        </form>
    )
}
