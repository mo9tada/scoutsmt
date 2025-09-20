
export async function registerUser(prevState: any, formData: FormData) {
    try {
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
            age: formData.get("age")?.toString() || "",
            first_time_scout: formData.get("first_time_scout")?.toString() === "Oui",
        }

        const res = await fetch("../app/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const data = await res.json()

        if (!res.ok) {
            return { message: data.message || "Erreur lors de l'inscription." }
        }

        return { message: data.message }
    } catch (error) {
        console.error(error)
        return { message: "Erreur serveur." }
    }
}
